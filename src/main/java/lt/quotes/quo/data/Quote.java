package lt.quotes.quo.data;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

import lt.quotes.book.data.Book;

@Entity
@Table(name = "Quote", indexes = {
		@Index(name = "idx_date", columnList="date", unique = true),	
	}
)
public class Quote {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank
	private String text;
	@DateTimeFormat
	private Date date;

	private int page;
	@ManyToOne
	@JoinColumn(name = "BOOK_ID")
	private Book book;

	public Quote() {
	}

	public Quote(String text, Date date, int page) {
		this.text = text;
		this.date = date;
		this.page = page;

	}

	public Quote(String text, Date date, int page, Book book) {
		this.text = text;
		this.date = date;
		this.page = page;
		this.book = book;

	}

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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
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

}
