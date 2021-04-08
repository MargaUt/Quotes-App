package lt.quotes.quo.data;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.quotes.book.data.Book;

public interface QuoteRepository extends JpaRepository<Quote, Long> {

	Quote findByDate(LocalDateTime date);

	default Quote findFavouriteQuote() {
		return findByFavourite(true);
	}

	Quote findByFavourite(boolean favourite);

	void deleteByDate(LocalDateTime date);

}
