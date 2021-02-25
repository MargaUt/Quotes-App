package lt.quotes.quo.data;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
	Quote findByDate(Date date);

	void deleteByDate(Date date);

}
