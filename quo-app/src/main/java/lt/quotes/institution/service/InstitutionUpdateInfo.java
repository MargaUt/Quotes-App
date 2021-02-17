package lt.quotes.institution.service;

import lt.quotes.institution.data.Institution;

public class InstitutionUpdateInfo {

	private String address;


	public InstitutionUpdateInfo() {
	}

	public InstitutionUpdateInfo(String address) {
		this.address = address;
	}
	
	public InstitutionUpdateInfo(Institution institution) {
		this.address = institution.getAddress();
	}
	
	/**
	 * Create InstitutionInfo from institution
	 * @param institution
	 * @return
	 */
	public static InstitutionUpdateInfo from(Institution institution) {
		return new InstitutionUpdateInfo(institution);
	}
	
	/**
	 * Convert to Institution
	 * @return
	 */
	public Institution toInstitution() {
		return new Institution(null, address);
	}

	// Getters and setters
	

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

}
