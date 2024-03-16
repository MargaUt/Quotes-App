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
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
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

}
