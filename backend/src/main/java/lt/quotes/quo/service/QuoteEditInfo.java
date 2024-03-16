package lt.quotes.quo.service;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.quotes.quo.data.Quote;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuoteEditInfo {

	private String text;
	private LocalDateTime date;
	private int page;
	private Boolean favourite;

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

}
