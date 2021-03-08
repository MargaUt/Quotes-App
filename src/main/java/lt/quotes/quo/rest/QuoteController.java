package lt.quotes.quo.rest;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.quotes.book.service.BookService;
import lt.quotes.quo.service.QuoteInfo;
import lt.quotes.quo.service.QuoteService;

@RestController
@RequestMapping(value = "/api/quote")
public class QuoteController {
	private final QuoteService quoService; // pridedame servisa
	private final BookService bookService;

//	 private static Logger logger = LoggerFactory.getLogger(QuoteController.class);

	@Autowired
	public QuoteController(QuoteService quoService, BookService bookService ) {
		this.quoService = quoService;
		this.bookService = bookService;
	}


	@RequestMapping(method = RequestMethod.GET)
	public List<QuoteInfo> getQuotes() {
		return quoService.getQuotes();
	}

	@RequestMapping(path = "/{date}/", method = RequestMethod.GET)
	public QuoteInfo getQuote(@PathVariable @DateTimeFormat(iso = ISO.DATE_TIME) final Date date) {
		return quoService.getQuote(date);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createQuote(@RequestBody @Valid QuoteInfo quote) {
		if (bookService.getBook(quote.getTitle(), quote.getAuthor()) == null ) {
			throw new IllegalArgumentException("You cannot create a quote without the author and title of the book.");
		}
		quoService.createQuote(quote);

	}

	@RequestMapping(path = "/{date}/", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateQuote(@RequestBody @Valid final QuoteInfo quote, @PathVariable final String text,
			@PathVariable final Date date, @PathVariable final int page) {
		quoService.updateQuote(quote, text, date, page);
	}

	@RequestMapping(path = "/{date}/", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteQuote(@PathVariable final Date date) {
		quoService.deleteQuote(date);

	}

}
