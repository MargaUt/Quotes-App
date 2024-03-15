package lt.quotes.quo.data;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lt.quotes.book.data.Book;

@Entity
@Table(name = "Quote", indexes = { @Index(name = "idx_date", columnList = "date", unique = true), })
public class Quote {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank
	private String text;
	private LocalDateTime date;
	private Boolean favourite;
	private int page;
	@ManyToOne
	@JoinColumn(name = "BOOK_ID")
	private Book book;

	public Quote() {
	}

	public Quote(String text, LocalDateTime date, int page, Boolean favourite) {
		this.text = text;
		this.date = date;
		this.page = page;
		this.favourite = favourite;

	}

	public Quote(String text, LocalDateTime date, int page, Boolean favourite, Book book) {
		this.text = text;
		this.date = date;
		this.page = page;
		this.favourite = favourite;
		this.book = book;

	}

	// TODO change to Lombok

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Boolean getFavourite() {
		return favourite;
	}

	public void setFavourite(Boolean favourite) {
		this.favourite = favourite;
	}

}
