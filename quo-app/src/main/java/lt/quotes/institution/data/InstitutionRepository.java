package lt.quotes.institution.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
	Institution findByTitle(String title);
	void deleteByTitle(String title);

}
