package lt.quotes.book.service;

import java.util.List;
import java.util.stream.Collectors;

import lt.quotes.book.data.Book;
import lt.quotes.quo.service.QuoteInfo;

public class BookInfoWithQuotes extends BookInfo {

	private List<QuoteInfo> quotes;

	public BookInfoWithQuotes() {
	}

	public BookInfoWithQuotes(Book book) {
		super(book);
		this.quotes = book.getQuotes().stream().map(QuoteInfo::from).collect(Collectors.toList());
	}

	public static BookInfoWithQuotes from(Book book) {
		return new BookInfoWithQuotes(book);
	}

	public List<QuoteInfo> getQuotes() {
		return quotes;
	}

	public void setQuotes(List<QuoteInfo> quotes) {
		this.quotes = quotes;
	}

}
