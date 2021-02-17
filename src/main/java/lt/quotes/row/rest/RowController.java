package lt.quotes.row.rest;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.quotes.row.service.RowInfo;
import lt.quotes.row.service.RowService;

@RestController
@RequestMapping(value = "/api/row")
public class RowController {
	private final RowService rowService; // pridedame useriu servisa

	 private static Logger logger = LoggerFactory.getLogger(RowController.class);

	@Autowired
	public RowController(RowService rowService) {
		this.rowService = rowService;
	}

	@RequestMapping(method = RequestMethod.GET)
	 @PreAuthorize("hasRole('Švietimo specialistas')")
	public List<RowInfo> getRows() {
		return rowService.getRows();
	}

	@RequestMapping(path = "/{title}/{year}", method = RequestMethod.GET)
	 @PreAuthorize("hasRole('Švietimo specialistas')") 
	public RowInfo getRow(@PathVariable final String title, @PathVariable final int year) {
		return rowService.getRow(title, year);
	}
	
	@RequestMapping(path = "/active", method = RequestMethod.GET)
	 @PreAuthorize("hasRole('Švietimo specialistas')")
	public RowInfo getActiveRow() {
		return rowService.getActiveRow();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	 @PreAuthorize("hasRole('Švietimo specialistas')")
	public void createRow(@RequestBody @Valid final RowInfo row) {
		rowService.createRow(row);

	}
	@RequestMapping(path = "/{title}/{year}",method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	 @PreAuthorize("hasRole('Švietimo specialistas')")
	public void updateRow(@RequestBody @Valid final RowInfo row, @PathVariable final String title, 
			@PathVariable final int year) {
		logger.error("pavadinimas ir metai: " + title + year);
		rowService.updateRow(row, title, year);	
	}
	
	@RequestMapping(path = "/{title}/{year}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	 @PreAuthorize("hasRole('Švietimo specialistas')")
	public void deleteRow(@PathVariable final String title, @PathVariable final int year) {
		rowService.deleteRow(title, year);

	}

}
