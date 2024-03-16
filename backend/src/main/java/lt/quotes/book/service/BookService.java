package lt.quotes.book.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.Getter;
import lombok.Setter;
import lt.quotes.PagingData;
import lt.quotes.book.data.Book;
import lt.quotes.book.data.BookRepository;

@Service
public class BookService {

	private static String BOOK_EXCEPTION = "Didin't find book.";

	private static String DELETE_BOOK = "You cannot delete a book with existing quote.";

	@Autowired
	private BookRepository bookRepo;

	@Getter
	@Setter
	@Autowired
	private PagingData paging;

	@Transactional(readOnly = true)
	public Page<BookInfo> getAllSearchBooks(String title, String author) {
		// TODO fix multiple if
		if (title == null) {
			if (author == null) {
				return bookRepo.findAll(PageRequest.of(paging.getPage(), paging.getLimit())).map(BookInfo::from);

			} else {
				return bookRepo.findByAuthorContaining(author, PageRequest.of(paging.getPage(), paging.getLimit()))
						.map(BookInfo::from);
			}
		} else {
			if (author == null) {
				return bookRepo.findByTitleContaining(title, PageRequest.of(paging.getPage(), paging.getLimit()))
						.map(BookInfo::from);
			} else {
				return bookRepo.findAllByTitleContainingOrAuthorContaining(title, author,
						PageRequest.of(paging.getPage(), paging.getLimit())).map(BookInfo::from);

			}
		}

	}

	@Transactional(readOnly = true)
	public List<BookInfo> getBooks() {
		return bookRepo.findAll().stream().map(BookInfo::from).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Page<BookInfo> getAllBooks() {
		return bookRepo.findAll(PageRequest.of(paging.getPage(), paging.getLimit())).map(BookInfo::from);

	}

	@Transactional(readOnly = true)
	public long countQuotes(String title, String author) {
		return bookRepo.countQuotes(title, author);

	}

	@Transactional
	public void createBook(BookInfo bookInfo) {

		bookRepo.save(bookInfo.toBook());
	}

	@Transactional(readOnly = true)
	public BookInfoWithQuotes getBook(String title, String author) {
		if (bookRepo.findByTitleAndAuthor(title, author) == null) {
			throw new IllegalArgumentException(BOOK_EXCEPTION);
		}
		return BookInfoWithQuotes.from(bookRepo.findByTitleAndAuthor(title, author));
	}

	@Transactional
	public void deleteBook(String title, String author) {
		if (countQuotes(title, author) != 0) {
			throw new IllegalArgumentException(DELETE_BOOK);
		}

		bookRepo.deleteByTitleAndAuthor(title, author);
	}

	@Transactional(readOnly = true)
	public BookInfo getReadBook() {
		if (bookRepo.findFinishedBook() == null) {
			throw new IllegalArgumentException(BOOK_EXCEPTION);
		}
		return BookInfo.from(bookRepo.findFinishedBook());
	}

	@Transactional
	public Book updateBook(BookInfo bookInfo, String title, String author) {
		Book bookToUpdate = bookRepo.findByTitleAndAuthor(title, author);
		if (bookToUpdate == null) {
			throw new IllegalArgumentException(BOOK_EXCEPTION);

		}
		bookToUpdate.setTitle(bookInfo.getTitle());
		bookToUpdate.setAuthor(bookInfo.getAuthor());
		bookToUpdate.setReleasedYear(bookInfo.getReleasedYear());
		bookToUpdate.setBooksPages(bookInfo.getBooksPages());
		bookToUpdate.setBookIsFinished(bookInfo.getBookIsFinished());
		bookToUpdate.setPicture(bookInfo.getPicture());
		return bookRepo.save(bookToUpdate);
	}

}
