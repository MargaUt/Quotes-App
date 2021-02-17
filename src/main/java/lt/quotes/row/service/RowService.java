package lt.quotes.row.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.quotes.role.data.Role;
import lt.quotes.row.data.Row;
import lt.quotes.row.data.RowRepository;
import lt.quotes.user.data.User;

@Service
public class RowService {
	@Autowired
	private RowRepository rowRepo;

	@Transactional(readOnly = true)
	public List<RowInfo> getRows() {
		return rowRepo.findAll().stream().map(RowInfo::from).collect(Collectors.toList());
		// return rowRepo.findAll().stream()
		// .map(dbRow -> RowInfo.from(dbRow))
		// .collect(Collectors.toList());
	}

	@Transactional
	public void createRow(RowInfo rowInfo) {
		//jei bandai kurti nauja aktyve
		if (rowInfo.getActive()) {
			// jei yra aktyvi, tai naujos kurti neleidzia
			if (getActiveRow() != null) {
				throw new IllegalArgumentException("Kurti aktyvios eilės negalima, nes kita eilė jau yra aktyvuota.");
			}
			
		}
		// Row newRow = new Row(rowInfo.getTitle(), rowInfo.getYear(),
		// rowInfo.getActive());
		// Row newRow = rowInfo.toRow();
		// rowRepo.save(newRow);
		rowRepo.save(rowInfo.toRow());
	}

	@Transactional(readOnly = true)
	public RowInfo getRow(String title, int year) {
		if (rowRepo.findByTitleAndYear(title, year) == null) {
			throw new IllegalArgumentException("Eilės tokiu pavadinimu nėra.");
		}
		// var dbRow = rowRepo.findByTitleAndYear(title, year);
		// return new RowInfo(dbRow);
		return RowInfo.from(rowRepo.findByTitleAndYear(title, year));
	}

	@Transactional
	public void deleteRow(String title, int year) {
		rowRepo.deleteByTitleAndYear(title, year);
		;
	}

	@Transactional(readOnly = true)
	public RowInfo getActiveRow() {
		//jei db neras aktyvios eiles, tai ir metodas neturi rasti
		if(rowRepo.findActiveRow() == null) {
			return null;
		}
		return RowInfo.from(rowRepo.findActiveRow());// fixme nulus kai duombazen bus null
		// return new RowInfo(rowRepo.findActiveRow());
	}

	@Transactional
	public Row updateRow(RowInfo rowInfo, String title, int year) {
		Row rowToUpdate = rowRepo.findByTitleAndYear(title, year);
		if (rowToUpdate == null) {
			throw new IllegalArgumentException("Nerado eiles");
		}

		// jei active false, tai leidi updatinti
		if (!rowInfo.getActive()) {
			rowToUpdate.setActive(rowInfo.getActive());
		} else { // jei active true, tai tikrinti ar yra dar kas nors aktyvuota:
			// jei niekas nera aktyvuota, tai leidi update
			if (getActiveRow() == null) {
				rowToUpdate.setActive(rowInfo.getActive());
			} else { // jei yra kas nors aktyvuota:
				 var pavIrTitle = getActiveRow();
				// jei title ir year surastos aktyvuotos ir norimos updatint sutampa tada leidi updatint
				if (pavIrTitle.getTitle().equals(rowToUpdate.getTitle()) 
						&& pavIrTitle.getYear() == rowToUpdate.getYear() ) {
					rowToUpdate.setActive(rowInfo.getActive());
				} else { // jei title ir year surastos aktyvuotos ir norimos updatint nesutampa tada neleidi
					throw new IllegalArgumentException("Aktyvuoti norimos eilės negalima, nes kita eilė jau yra aktyvuota.");
					// jei nori suaktyvuoti, jei yra kas nors aktyvuota
					//    ir jei jei title ir year surastos aktyvuotos ir norimos updatint nesutampa
				}
				
			}
		}
		
		rowToUpdate.setTitle(rowInfo.getTitle());
		rowToUpdate.setYear(rowInfo.getYear());
		return rowRepo.save(rowToUpdate);
	}

	public RowRepository getRowRepo() {
		return rowRepo;
	}

	public void setRowRepo(RowRepository rowRepo) {
		this.rowRepo = rowRepo;
	}

}
