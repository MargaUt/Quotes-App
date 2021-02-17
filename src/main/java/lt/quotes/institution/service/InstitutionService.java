package lt.quotes.institution.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.quotes.institution.data.Institution;
import lt.quotes.institution.data.InstitutionRepository;

@Service
public class InstitutionService {
	@Autowired
	private InstitutionRepository insRepo;

	@Transactional(readOnly = true)
	public List<InstitutionInfo> getInstitutions() {
		return insRepo.findAll().stream().map(InstitutionInfo::from).collect(Collectors.toList());
	}

	@Transactional
	public void createInst(InstitutionInfo institutionInfo) { 
		insRepo.save(institutionInfo.toInstitution()); 
	}

	@Transactional(readOnly = true)
	public InstitutionInfo getInstitution(String title) {
		if(insRepo.findByTitle(title) == null) {
			throw new IllegalArgumentException("Institucijos tokiu pavadinimu nėra.");
		}
		return InstitutionInfo.from(insRepo.findByTitle(title));
	}

	
	@Transactional
	public Institution updateInst(String title, InstitutionUpdateInfo ins) {
		Institution insToUpdate = insRepo.findByTitle(title);
		if(insToUpdate == null) {
			throw new IllegalArgumentException("Instuticijos tokiu pavadinimu nėra.");	
		}
		insToUpdate.setAddress(ins.getAddress());
		return insRepo.save(insToUpdate);
	}
	
	
	@Transactional
	public void deleteInst(String title) {
		insRepo.deleteByTitle(title); 
	}


	public InstitutionRepository getInsRepo() {
		return insRepo;
	}

	public void setInsRepo(InstitutionRepository insRepo) {
		this.insRepo = insRepo;
	}


}
