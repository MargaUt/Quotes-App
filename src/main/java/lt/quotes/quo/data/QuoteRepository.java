package lt.quotes.quo.data;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuoteRepository extends JpaRepository<Quote, Long> {

	Quote findByDate(LocalDateTime date);

	default Quote findFavouriteQuote() {
		return findByFavourite(true);
	}

	Quote findByFavourite(boolean favourite);

//	
//	@Query(value = "select * from persons limit 50", nativeQuery = true)
//	List<Quote> findAllByOrderByDateDesc();

	List<Quote> findTop3ByOrderByDateDesc();

	void deleteByDate(LocalDateTime date);

}
