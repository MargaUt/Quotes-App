package lt.quotes.quo.service;

import java.util.Date;

import lt.quotes.quo.data.Quote;

public class QuoteInfo {

	private String text;
	private Date date;
	private int page;

	public QuoteInfo() {
	}

	public QuoteInfo(String text, Date date, int page) {
		this.text = text;
		this.date = date;
		this.page = page;
	}


	public QuoteInfo(Quote quote) {
		this.text = quote.getText();
		this.date = quote.getDate();
		this.page = quote.getPage();
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

	// Getters and setters

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}


}
