package lt.quotes.quo.rest;

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

import lt.quotes.quo.service.QuoteInfo;
import lt.quotes.quo.service.QuoteService;

@RestController
@RequestMapping(value = "/api/quote")
public class QuoteController {
	private final QuoteService quoService; // pridedame servisa

//	 private static Logger logger = LoggerFactory.getLogger(QuoteController.class);

	@Autowired
	public QuoteController(QuoteService quoService) {
		this.quoService = quoService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<QuoteInfo> getQuotes() {
		return quoService.getQuotes();
	}

	@RequestMapping(path = "/{text}/", method = RequestMethod.GET)
	public QuoteInfo getQuote(@PathVariable final String text){
		return quoService.getQuote(text);
	}
	

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createQuote(@RequestBody @Valid QuoteInfo quote) {
		quoService.createQuote(quote);

	}
	@RequestMapping(path = "/{text}/",method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateQuote(@RequestBody @Valid final QuoteInfo quote, @PathVariable final String text, 
			@PathVariable final int date, @PathVariable final int page ) {
//		logger.error("pavadinimas ir metai: " + title + year);
		quoService.updateQuote(quote, text, date, page);	
	}
	
	@RequestMapping(path = "/{text}/", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteQuote(@PathVariable final String text) {
		quoService.deleteQuote(text);

	}

}
