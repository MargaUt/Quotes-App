package lt.quotes.quo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import lt.quotes.book.data.BookRepository;
import lt.quotes.quo.data.Quote;
import lt.quotes.quo.data.QuoteRepository;

public class QuoteServiceTest {

	private QuoteService quoteService;
	private QuoteRepository quoteRepository;
	private BookRepository bookRepository;

	@BeforeEach
	public void setUp() {
		quoteRepository = mock(QuoteRepository.class);
		bookRepository = mock(BookRepository.class);
		quoteService = new QuoteService(); // Initialize quoteService with a new QuoteService object
		quoteService.setQuoRepo(quoteRepository);
		quoteService.setBookRepo(bookRepository);
	}

	@Test
	public void testCreateQuote() {
		QuoteInfo quoteInfo = new QuoteInfo();
		quoteService.createQuote(quoteInfo);

		verify(quoteRepository, times(1)).save(any());
	}

	@Test
	public void testGetQuote_ThrowsException() {
		LocalDateTime date = LocalDateTime.now();
		when(quoteRepository.findByDate(date)).thenReturn(null);

		assertThrows(IllegalArgumentException.class, () -> quoteService.getQuote(date));
	}

	@Test
	public void testDeleteQuote() {
		LocalDateTime date = LocalDateTime.now();
		quoteService.deleteQuote(date);

		verify(quoteRepository, times(1)).deleteByDate(date);
	}

	@Test
	public void testUpdateQuote() {
		LocalDateTime date = LocalDateTime.now();
		QuoteEditInfo quoteEditInfo = new QuoteEditInfo();
		Quote quote = new Quote();
		when(quoteRepository.findByDate(date)).thenReturn(quote);

		assertDoesNotThrow(() -> quoteService.updateQuote(quoteEditInfo, date));
	}

	@Test
	public void testGetFavouriteQuotes() {
		List<Quote> quotes = new ArrayList<>();
		quotes.add(new Quote());
		when(quoteRepository.findFavouriteQuote()).thenReturn(quotes);

		List<QuoteEditInfo> result = quoteService.getFavouriteQuotes();

		assertEquals(1, result.size());
	}
}
