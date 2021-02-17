package lt.quotes.row.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RowRepository extends JpaRepository<Row, Long> {
	default Row findActiveRow() {
		return findByActive(true);
	}
	Row findByActive(boolean active);
	Row findByTitleAndYear(String title, int year);
	void deleteByTitleAndYear(String title, int year);

}
