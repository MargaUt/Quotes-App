package lt.quotes.book.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.Getter;
import lombok.Setter;
import lt.quotes.PagingData;
import lt.quotes.book.service.BookInfo;
import lt.quotes.book.service.BookInfoWithQuotes;
import lt.quotes.book.service.BookService;
import lt.quotes.quo.service.QuoteService;

@RestController
@RequestMapping(value = "/api/book")
public class BookController {

	private final BookService bookService;

	@Getter
	@Setter
	@Autowired
	private PagingData paging;

	@Autowired
	public BookController(BookService bookService, QuoteService quoService) {
		this.bookService = bookService;
	}

	@RequestMapping(path = "/allBooks", method = RequestMethod.GET)
	public List<BookInfo> getAllBooks() {
		return bookService.getBooks();
	}

	@RequestMapping(method = RequestMethod.GET)
	public Page<BookInfo> getBooks(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int limit, @RequestParam(required = false) String title,
			@RequestParam(required = false) String author) {
		paging.setPage(page);
		paging.setLimit(limit);
		return bookService.getAllSearchBooks(title, author);
	}

	@RequestMapping(path = "/{title}/{author}", method = RequestMethod.GET)
	public BookInfoWithQuotes getBook(@PathVariable final String title, @PathVariable final String author) {
		return bookService.getBook(title, author);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createBook(@RequestBody @Valid final BookInfo book) {
		bookService.createBook(book);
	}

	@RequestMapping(path = "/finished", method = RequestMethod.GET)
	public BookInfo getReadBook() {
		return bookService.getReadBook();
	}

	@RequestMapping(path = "/{title}/{author}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateBook(@RequestBody @Valid final BookInfo book, @PathVariable final String title,
			@PathVariable final String author) {
		bookService.updateBook(book, title, author);
	}

	@RequestMapping(path = "/{title}/{author}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteBook(@PathVariable final String title, @PathVariable final String author) {
		bookService.deleteBook(title, author);
	}

}
