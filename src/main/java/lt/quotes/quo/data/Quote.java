package lt.quotes.quo.data;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lt.quotes.book.data.Book;

@Entity

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

	private String author;
	private String title;

	public Quote() {
	}

	public Quote(String text, Date date, int page, String author, String title) {
		this.text = text;
		this.date = date;
		this.page = page;
		this.author = book.getAuthor();
		this.title = book.getTitle();

	}

	public Quote(String text, Date date, int page) {
		this.text = text;
		this.date = date;
		this.page = page;

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

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
