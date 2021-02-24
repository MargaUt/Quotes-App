package lt.quotes.book.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
	Book findByAuthorAndTitle(String title, String author);

	Book findByTitle(String title);

	Book findByAuthor(String author);

	Book findByReleasedYear(int releasedYear);

	default Book findFinishedBook() {
		return findByBookIsFinished(true);
	}

	Book findByBookIsFinished(boolean bookIsFinished);

	void deleteByTitle(String title);

}
