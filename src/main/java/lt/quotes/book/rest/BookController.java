package lt.quotes.book.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.quotes.PagingData;
import lt.quotes.book.service.BookInfo;
import lt.quotes.book.service.BookService;

@RestController
@RequestMapping(value = "/api/book")
public class BookController {

	@Autowired
	private PagingData pagingData;
	private final BookService bookService; // pridedame servisa

	@Autowired
	public BookController(BookService bookService) {
		this.bookService = bookService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<BookInfo> getBooks() {
		return bookService.getBooks();
	}

	@RequestMapping(path = "/{title}/{author}/", method = RequestMethod.GET)
	public BookInfo getBook(@PathVariable final String title, @PathVariable final String author) {
		return bookService.getBook(title, author);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createBook(@RequestBody @Valid final BookInfo book) {
		bookService.createBook(book);

	}
	
	@RequestMapping(path = "/finished", method = RequestMethod.GET)
	public BookInfo getActiveRow() {
		return bookService.getReadBook();
	}

	@RequestMapping(path = "/{title}/{author}/", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateBook(@RequestBody @Valid final BookInfo book, @PathVariable final String title, 
			@PathVariable final String author, @PathVariable final int releasedYear, 
			@PathVariable final int booksPages, @PathVariable final boolean bookIsFinished) {
//		logger.error("pavadinimas ir metai: " + title + year);
		bookService.updateBook(book, title, author, releasedYear, booksPages, bookIsFinished);
	}

	@RequestMapping(path = "/{title}/", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteBook(@PathVariable final String title, @PathVariable final String author ) {
		bookService.deleteBook(title, author);

	}

	public PagingData getPagingData() {
		return pagingData;
	}

	public void setPagingData(PagingData pagingData) {
		this.pagingData = pagingData;
	}

}
