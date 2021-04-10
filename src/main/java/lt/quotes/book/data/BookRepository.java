package lt.quotes.book.data;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lt.quotes.quo.data.Quote;

public interface BookRepository extends JpaRepository<Book, Long> {
	
	
	Page<Book> findAll(Pageable pageable);
	
	Book findByTitleAndAuthor(String title, String author);

	Book findByReleasedYear(int releasedYear);

	default Book findFinishedBook() {
		return findByBookIsFinished(true);
	}

	Book findByBookIsFinished(boolean bookIsFinished);

	void deleteByTitleAndAuthor(String title, String author);
	
	@Query("select count(q) from Book b join b.quotes q where b.title = ?1 and b.author = ?2")
	Long countQuotes(String title, String author);

	
	
}
