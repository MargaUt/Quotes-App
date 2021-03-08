package lt.quotes.quo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lt.quotes.book.data.Book;
import lt.quotes.quo.data.Quote;

public class QuoteInfo {

	private String text;
	private LocalDateTime date;
	private int page;
	private String title;
	private String author;

	public QuoteInfo() {
	}

	public QuoteInfo(String text, LocalDateTime date, int page) {
		this.text = text;
		this.date = date;
		this.page = page;
	}

	public QuoteInfo(Quote quote) {
		this.text = quote.getText();
		this.date = quote.getDate();
		this.page = quote.getPage();
		this.title = quote.getBook().getTitle();
		this.author = quote.getBook().getAuthor();
	}

	/**
	 * Create RowInfo from quote
	 * 
	 * @param quote
	 * @return
	 */
	public static QuoteInfo from(Quote quote) {
		return new QuoteInfo(quote);
	}

	/**
	 * Convert to Quote
	 * 
	 * @return
	 */
	public Quote toQuote() {
		return new Quote(text, date, page);
	}

	public Quote toQuote(Book book) {
		return new Quote(text, date, page, book);
	}
	// Getters and setters

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

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

}
