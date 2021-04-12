package lt.quotes.book.service;



import lt.quotes.book.data.Book;


public class BookInfo {

	public String title;
	public String author;
	public int releasedYear;
	public int booksPages;
	public Boolean bookIsFinished;
	public String picture;

	public BookInfo() {
		super();
	}

	public BookInfo(String title, String author, int releasedYear, int booksPages, 
		String picture,	Boolean bookIsFinished) {
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

// toliau - get ir set metodai

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public int getReleasedYear() {
		return releasedYear;
	}

	public void setReleasedYear(int releasedYear) {
		this.releasedYear = releasedYear;
	}

	public int getBooksPages() {
		return booksPages;
	}

	public void setBooksPages(int booksPages) {
		this.booksPages = booksPages;
	}

	public Boolean getBookIsFinished() {
		return bookIsFinished;
	}

	public void setBookIsFinished(Boolean bookIsFinished) {
		this.bookIsFinished = bookIsFinished;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

}
