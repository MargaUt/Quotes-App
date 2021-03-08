package lt.quotes.quo.data;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
	Quote findByDate(LocalDateTime date);

	void deleteByDate(LocalDateTime date);

}
