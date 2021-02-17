package lt.quotes.row.service;

import lt.quotes.row.data.Row;

public class RowInfo {

	private String title;
	private int year;
	private Boolean active;

	public RowInfo() {
	}

	public RowInfo(String title, int year, Boolean active) {
		this.title = title;
		this.year = year;
		this.active = active;
	}
	public RowInfo(String title, int year) {
		this.title = title;
		this.year = year;
	}
	
	public RowInfo(Row row) {
		this.title = row.getTitle();
		this.year = row.getYear();
		this.active = row.getActive();
	}
	
	/**
	 * Create RowInfo from row
	 * @param row
	 * @return
	 */
	public static RowInfo from(Row row) {
		return new RowInfo(row);
	}
	
	/**
	 * Convert to Row
	 * @return
	 */
	public Row toRow() {
		return new Row(title, year, active);
	}

	// Getters and setters
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}


}
