package lt.quotes.quo.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {

	Quote findByAuthorAndTitle(String author, String title);

	Quote findByText(String text);

	void deleteByText(String text);

}
