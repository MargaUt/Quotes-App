package lt.quotes;


import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

/**
 * TODO: remove if not used
 * 
 * @author adfec
 *
 */
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class PagingData {
	private int limit;
	private int page;
	
	
	public PagingData() {
		this.limit = 10;
		this.page = 0;
	}
	
// getters and setters

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}


}