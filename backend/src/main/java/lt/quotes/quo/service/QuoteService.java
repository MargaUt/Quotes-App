package lt.quotes.quo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.quotes.book.data.BookRepository;
import lt.quotes.quo.data.Quote;
import lt.quotes.quo.data.QuoteRepository;

@Service
public class QuoteService {
	@Autowired
	private QuoteRepository quoRepo;
	@Autowired
	private BookRepository bookRepo;

	@Transactional(readOnly = true)
	public List<QuoteInfo> getQuotes() {
		return quoRepo.findAll().stream().map(QuoteInfo::from).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<QuoteInfo> getLatestQuotes() {
		return quoRepo.findTop3ByOrderByDateDesc().stream().map(QuoteInfo::from).collect(Collectors.toList());
	}

	@Transactional
	public void createQuote(QuoteInfo quoInfo) {
		quoRepo.save(quoInfo.toQuote(bookRepo.findByTitleAndAuthor(quoInfo.getTitle(), quoInfo.getAuthor())));
	}

	@Transactional(readOnly = true)
	public QuoteInfo getQuote(LocalDateTime date) {
		if (quoRepo.findByDate(date) == null) {
			throw new IllegalArgumentException("There is no quote with this date.");
		}
		return QuoteInfo.from(quoRepo.findByDate(date));
	}

	@Transactional
	public void deleteQuote(LocalDateTime date) {
		quoRepo.deleteByDate(date);
	}

	@Transactional
	public Quote updateQuote(QuoteEditInfo quoEditInfo, LocalDateTime date) {
		Quote quoToUpdate = quoRepo.findByDate(date);
		if (quoToUpdate == null) {
			throw new IllegalArgumentException("Didin't find quote");

		}
		quoToUpdate.setText(quoEditInfo.getText());
		quoToUpdate.setDate(quoEditInfo.getDate());
		quoToUpdate.setPage(quoEditInfo.getPage());
		quoToUpdate.setFavourite(quoEditInfo.getFavourite());
		return quoRepo.save(quoToUpdate);
	}

	@Transactional(readOnly = true)
	public List<QuoteEditInfo> getFavouriteQuotes() {
		return quoRepo.findFavouriteQuote().stream().map(QuoteEditInfo::from).collect(Collectors.toList());
	}

	public QuoteRepository getQuoteRepo() {
		return quoRepo;
	}

	public void setQuoteRepo(QuoteRepository quoRepo) {
		this.quoRepo = quoRepo;
	}

	public BookRepository getBookRepo() {
		return bookRepo;
	}

	public void setBookRepo(BookRepository bookRepo) {
		this.bookRepo = bookRepo;
	}

}
