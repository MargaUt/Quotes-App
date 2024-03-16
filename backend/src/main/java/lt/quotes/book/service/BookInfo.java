package lt.quotes.book.service;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.quotes.book.data.Book;

@Getter
@Setter
@NoArgsConstructor
public class BookInfo {

	public String title;
	public String author;
	public int releasedYear;
	public int booksPages;
	public Boolean bookIsFinished;
	public String picture;

	// TODO research about Lombok annotations for constructors
	public BookInfo(String title, String author, int releasedYear, int booksPages, String picture,
			Boolean bookIsFinished) {
		this.title = title;
		this.author = author;
		this.releasedYear = releasedYear;
		this.booksPages = booksPages;
		this.bookIsFinished = bookIsFinished;
		this.setPicture(picture);
	}

	public BookInfo(Book book) {
		this.title = book.getTitle();
		this.author = book.getAuthor();
		this.releasedYear = book.getReleasedYear();
		this.booksPages = book.getBooksPages();
		this.bookIsFinished = book.getBookIsFinished();
		this.picture = book.getPicture();

	}

	/**
	 * Create BookInfo from book
	 * 
	 * @param book
	 * @return
	 */

	public static BookInfo from(Book book) {
		return new BookInfo(book);
	}

	/**
	 * Convert to Book
	 * 
	 * @return
	 */
	public Book toBook() {
		return new Book(title, author, releasedYear, booksPages, bookIsFinished, picture);
	}

}
