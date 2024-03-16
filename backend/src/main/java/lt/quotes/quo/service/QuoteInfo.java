package lt.quotes.quo.service;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.quotes.book.data.Book;
import lt.quotes.quo.data.Quote;

@Getter
@Setter
@NoArgsConstructor
public class QuoteInfo {

	private String text;
	private LocalDateTime date;
	private int page;
	private String title;
	private String author;
	private Boolean favourite;

	public QuoteInfo(String text, LocalDateTime date, int page, Boolean favourite) {
		this.text = text;
		this.date = date;
		this.page = page;
		this.favourite = favourite;
	}

	public QuoteInfo(Quote quote) {
		this.text = quote.getText();
		this.date = quote.getDate();
		this.page = quote.getPage();
		this.favourite = quote.getFavourite();
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
		return new Quote(text, date, page, favourite);
	}

	public Quote toQuote(Book book) {
		return new Quote(text, date, page, favourite, book);
	}

}
