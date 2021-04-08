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

import lt.quotes.quo.data.Quote;

@Entity
@Table(name = "Book", indexes = { @Index(name = "idx_title_author", columnList = "title, author", unique = true), })
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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

	public Book() {
		super();
	}

	public Book(String title, String author, int releasedYear, int bookPages, 
			Boolean bookIsFinished, String picture) {
		this.title = title;
		this.author = author;
		this.releasedYear = releasedYear;
		this.booksPages = bookPages;
		this.bookIsFinished = bookIsFinished;
		this.picture = picture;
	}

	public Book(String title, String author, int releasedYear,
			int bookPages, Boolean bookIsFinished, String picture, List<Quote> quotes) {
		this.title = title;
		this.author = author;
		this.releasedYear = releasedYear;
		this.booksPages = bookPages;
		this.bookIsFinished = bookIsFinished;
		this.picture = picture;
		this.quotes = quotes;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public int getReleasedYear() {
		return releasedYear;
	}

	public int getBooksPages() {
		return booksPages;
	}

	public Boolean getBookIsFinished() {
		return bookIsFinished;
	}

	public List<Quote> getQuotes() {
		return quotes;
	}

	public void setQuotes(List<Quote> quotes) {
		this.quotes = quotes;
	}

	public void setReleasedYear(int releasedYear) {
		this.releasedYear = releasedYear;
	}

	public void setBooksPages(int booksPages) {
		this.booksPages = booksPages;
	}

	public void setBookIsFinished(Boolean bookIsFinished) {
		this.bookIsFinished = bookIsFinished;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}
}
