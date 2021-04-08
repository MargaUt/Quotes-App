package lt.quotes.quo.service;

import java.time.LocalDateTime;

import lt.quotes.book.data.Book;
import lt.quotes.quo.data.Quote;

public class QuoteEditInfo {

	private String text;
	private LocalDateTime date;
	private int page;
	private Boolean favourite;

	public QuoteEditInfo() {
	}

	public QuoteEditInfo(String text, LocalDateTime date, int page, Boolean favourite) {
		this.text = text;
		this.date = date;
		this.page = page;
		this.favourite = favourite;
	}

	public QuoteEditInfo(Quote quote) {
		this.text = quote.getText();
		this.date = quote.getDate();
		this.page = quote.getPage();
		this.favourite = quote.getFavourite();
	}

	/**
	 * Create RowInfo from quote
	 * 
	 * @param quote
	 * @return
	 */
	public static QuoteEditInfo from(Quote quote) {
		return new QuoteEditInfo(quote);
	}

	/**
	 * Convert to Quote
	 * 
	 * @return
	 */
	public Quote toQuote() {
		return new Quote(text, date, page, favourite);
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

	public Boolean getFavourite() {
		return favourite;
	}

	public void setFavourite(Boolean favourite) {
		this.favourite = favourite;
	}

}
