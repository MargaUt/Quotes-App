package lt.quotes.quo.rest;

import java.time.LocalDateTime;
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
import lt.quotes.quo.service.QuoteEditInfo;
import lt.quotes.quo.service.QuoteInfo;
import lt.quotes.quo.service.QuoteService;

@RestController
@RequestMapping(value = "/api/quote")
public class QuoteController {

	private static String QUOTE_EXCEPTION = "You cannot create a quote without the author and title of the book.";

	private final QuoteService quoService;

	private final BookService bookService;

	@Autowired
	public QuoteController(QuoteService quoService, BookService bookService) {
		this.quoService = quoService;
		this.bookService = bookService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<QuoteInfo> getQuotes() {
		return quoService.getQuotes();
	}

	@RequestMapping(path = "/latest", method = RequestMethod.GET)
	public List<QuoteInfo> getLatestQuotes() {
		return quoService.getLatestQuotes();
	}

	@RequestMapping(path = "/{date}", method = RequestMethod.GET)
	public QuoteInfo getQuote(@PathVariable @DateTimeFormat(iso = ISO.DATE_TIME) final LocalDateTime date) {
		return quoService.getQuote(date);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createQuote(@RequestBody @Valid QuoteInfo quote) {
		if (bookService.getBook(quote.getTitle(), quote.getAuthor()) == null) {
			throw new IllegalArgumentException(QUOTE_EXCEPTION);
		}
		quoService.createQuote(quote);

	}

	@RequestMapping(path = "/favourites", method = RequestMethod.GET)
	public List<QuoteEditInfo> getFavouriteQuotes() {
		return quoService.getFavouriteQuotes();
	}

	@RequestMapping(path = "/{date}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateQuote(@RequestBody @Valid final QuoteEditInfo quoteEdit,
			@PathVariable @DateTimeFormat(iso = ISO.DATE_TIME) final LocalDateTime date) {
		quoService.updateQuote(quoteEdit, date);
	}

	@RequestMapping(path = "/{date}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteQuote(@PathVariable @DateTimeFormat(iso = ISO.DATE_TIME) final LocalDateTime date) {
		quoService.deleteQuote(date);
	}

}
