package lt.quotes.institution.service;

import lt.quotes.institution.data.Institution;

public class InstitutionInfo {

	private String title;
	private String address;


	public InstitutionInfo() {
	}

	public InstitutionInfo(String title, String address) {
		this.title = title;
		this.address = address;
	}
	
	public InstitutionInfo(Institution institution) {
		this.title = institution.getTitle();
		this.address = institution.getAddress();
	}
	
	/**
	 * Create InstitutionInfo from institution
	 * @param institution
	 * @return
	 */
	public static InstitutionInfo from(Institution institution) {
		return new InstitutionInfo(institution);
	}
	
	/**
	 * Convert to Institution
	 * @return
	 */
	public Institution toInstitution() {
		return new Institution(title, address);
	}

	// Getters and setters
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

}
