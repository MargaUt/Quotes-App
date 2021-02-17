package lt.quotes.institution.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.quotes.institution.service.InstitutionInfo;
import lt.quotes.institution.service.InstitutionService;
import lt.quotes.institution.service.InstitutionUpdateInfo;
import lt.quotes.row.service.RowInfo;

@RestController
@RequestMapping(value = "/api/institution")
public class InstitutionController {
	private final InstitutionService instService;

	@Autowired
	public InstitutionController(InstitutionService instService) {
		this.instService = instService;
	}

	@RequestMapping(method = RequestMethod.GET)
	 @PreAuthorize("hasRole('Švietimo specialistas')") 
	public List<InstitutionInfo> getInstitutions() {
		return instService.getInstitutions();
	}

	@RequestMapping(path = "/{title}/", method = RequestMethod.GET)
	 @PreAuthorize("hasRole('Švietimo specialistas')") 
	public InstitutionInfo getInstitution(@PathVariable final String title) {
		return instService.getInstitution(title);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	 @PreAuthorize("hasRole('Švietimo specialistas')")
	public void createInst(@RequestBody @Valid final InstitutionInfo inst) {
		instService.createInst(inst);

	}
	
	@RequestMapping(path = "/{title}/",method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	 @PreAuthorize("hasRole('Švietimo specialistas')")
	public void updateRow(@RequestBody @Valid final InstitutionUpdateInfo ins, 
			@PathVariable final String title) {
//		logger.error("pavadinimas ir metai: " + title + year);
		instService.updateInst(title, ins);	
	}
	

	@RequestMapping(path = "/{title}/", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	 @PreAuthorize("hasRole('Švietimo specialistas')")
	public void deleteInst(@PathVariable final String title) {
		instService.deleteInst(title);

	}

}
