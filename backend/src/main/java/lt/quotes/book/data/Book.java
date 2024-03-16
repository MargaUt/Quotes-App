package lt.quotes.book.data;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.quotes.quo.data.Quote;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Book", indexes = { @Index(name = "idx_title_author", columnList = "title, author", unique = true), })
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank
	@Column(unique = true)
	private String title;

	@NotBlank
	private String author;

	@Min(1000)
	@Max(3000)
	private int releasedYear;
	private int booksPages;
	@NotNull

	private Boolean bookIsFinished;
	@Lob
	private String picture;

	@OneToMany(mappedBy = "book", cascade = { CascadeType.DETACH, CascadeType.MERGE })
	private List<Quote> quotes;

	// TODO research about Lombok annotations for constructors
	public Book(String title, String author, int releasedYear, int bookPages, Boolean bookIsFinished, String picture) {
		this.title = title;
		this.author = author;
		this.releasedYear = releasedYear;
		this.booksPages = bookPages;
		this.bookIsFinished = bookIsFinished;
		this.picture = picture;
	}

	public Book(String title, String author, int releasedYear, int bookPages, Boolean bookIsFinished, String picture,
			List<Quote> quotes) {
		this.title = title;
		this.author = author;
		this.releasedYear = releasedYear;
		this.booksPages = bookPages;
		this.bookIsFinished = bookIsFinished;
		this.picture = picture;
		this.quotes = quotes;
	}

}
