package lt.quotes.quo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.quotes.book.data.Book;
import lt.quotes.book.data.BookRepository;
import lt.quotes.quo.data.Quote;
import lt.quotes.quo.data.QuoteRepository;

@Service
public class QuoteService {
	@Autowired
	private QuoteRepository quoRepo;


	@Transactional(readOnly = true)
	public List<QuoteInfo> getQuotes() {
		return quoRepo.findAll().stream().map(QuoteInfo::from).collect(Collectors.toList());
	}

	@Transactional
	public void createQuote(QuoteInfo quoInfo) {
		quoRepo.save(quoInfo.toQuote());
	}

	@Transactional(readOnly = true)
	public QuoteInfo getQuote(String text) {
		if (quoRepo.findByText(text) == null) {
			throw new IllegalArgumentException("There is no quote with this text.");
		}
		return QuoteInfo.from(quoRepo.findByText(text));
	}

	@Transactional
	public void deleteQuote(String text) {
		quoRepo.deleteByText(text);
	}

	@Transactional
	public Quote updateQuote(QuoteInfo quoInfo, String text, int date, int page) {
		Quote quoToUpdate = quoRepo.findByText(text);
		if (quoToUpdate == null) {
			throw new IllegalArgumentException("Didin't find quote");

		}
		quoToUpdate.setText(quoInfo.getText());
		quoToUpdate.setDate(quoInfo.getDate());
		quoToUpdate.setPage(quoInfo.getPage());
		return quoRepo.save(quoToUpdate);
	}

	public QuoteRepository getQuoteRepo() {
		return quoRepo;
	}

	public void setQuoteRepo(QuoteRepository quoRepo) {
		this.quoRepo = quoRepo;
	}

}
