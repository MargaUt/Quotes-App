package lt.quotes.book.service;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.quotes.book.data.Book;
import lt.quotes.quo.service.QuoteInfo;

@NoArgsConstructor
public class BookInfoWithQuotes extends BookInfo {

	@Getter
	@Setter
	private List<QuoteInfo> quotes;

	public BookInfoWithQuotes(Book book) {
		super(book);
		this.quotes = book.getQuotes().stream().map(QuoteInfo::from).collect(Collectors.toList());
	}

	public static BookInfoWithQuotes from(Book book) {
		return new BookInfoWithQuotes(book);
	}

}
