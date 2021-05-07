package lt.quotes.quo.data;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuoteRepository extends JpaRepository<Quote, Long> {

	Quote findByDate(LocalDateTime date);

	default List<Quote> findFavouriteQuote() {
		return findByFavourite(true);
	}

	List<Quote> findByFavourite(boolean favourite);

	List<Quote> findTop3ByOrderByDateDesc();

	void deleteByDate(LocalDateTime date);

}
