package lt.quotes.book.service;

import java.util.List;
import java.util.stream.Collectors;

//import org.apache.commons.lang3.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.quotes.book.data.Book;
import lt.quotes.book.data.BookRepository;
import lt.quotes.quo.data.Quote;

@Service
public class BookService {
	@Autowired
	private BookRepository bookRepo;

	@Transactional(readOnly = true)
	public List<BookInfo> getBooks() {
		return bookRepo.findAll().stream().map(BookInfo::from).collect(Collectors.toList());

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
	public BookInfo getBook(String title, String author) {
		if (bookRepo.findByTitleAndAuthor(title, author) == null) {
			throw new IllegalArgumentException("There is no such book.");
		}
		return BookInfo.from(bookRepo.findByTitleAndAuthor(title, author));
	}

	@Transactional
	public void deleteBook(String title, String author) {
		if (countQuotes(title, author) != 0) {
			throw new IllegalArgumentException("You cannot delete a book with existing quote.");
		}

		bookRepo.deleteByTitleAndAuthor(title, author);
	}

	@Transactional(readOnly = true)
	public BookInfo getReadBook() {
		if (bookRepo.findFinishedBook() == null) {
			return null;
		}
		return BookInfo.from(bookRepo.findFinishedBook());
	}

	@Transactional
	public Book updateBook(BookInfo bookInfo, String title, String author) {
		Book bookToUpdate = bookRepo.findByTitleAndAuthor(title, author);
		if (bookToUpdate == null) {
			throw new IllegalArgumentException("Didin't find book");

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
