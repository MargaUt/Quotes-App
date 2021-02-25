package lt.quotes.book.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.quotes.book.data.Book;
import lt.quotes.book.data.BookRepository;

@Service
public class BookService {
	@Autowired
	private BookRepository bookRepo;

	@Transactional(readOnly = true)
	public List<BookInfo> getBooks() {
		return bookRepo.findAll().stream().map(BookInfo::from).collect(Collectors.toList());

	}

	@Transactional
	public void createBook(BookInfo bookInfo) {
		bookRepo.save(bookInfo.toBook());
	}

	@Transactional(readOnly = true)
	public BookInfo getBook(String title, String author) {
		if (bookRepo.findByAuthorAndTitle(title, author) == null) {
			throw new IllegalArgumentException("There is no such book.");
		}
		return BookInfo.from(bookRepo.findByAuthorAndTitle(title, author));
	}

	@Transactional
	public void deleteBook(String title, String author) {
//		Jei randa tai knygai priskirta citata, 
//		neleidzia istrinti, meta klaida ir sako, kad negalima trinti knygos turincios citatu.
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
	public Book updateBook(BookInfo bookInfo, String title, String author, int releasedYear, int booksPages,
			Boolean bookIsFinished) {
		Book bookToUpdate = bookRepo.findByAuthorAndTitle(title, author);
		if (bookToUpdate == null) {
			throw new IllegalArgumentException("Didin't find book");

		}
		bookToUpdate.setTitle(bookInfo.getTitle());
		bookToUpdate.setAuthor(bookInfo.getAuthor());
		bookToUpdate.setReleasedYear(bookInfo.getReleasedYear());
		bookToUpdate.setBooksPages(bookInfo.getBooksPages());
		bookToUpdate.setBookIsFinished(bookInfo.getBookIsFinished());
		return bookRepo.save(bookToUpdate);
	}

}
