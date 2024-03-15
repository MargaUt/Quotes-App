package lt.quotes.user.rest;


public class RestUser {

	private String username;
	private String email;
	private String role;

	public RestUser() {
	}

	public RestUser(String username, String email, String role) {
		this.username = username;
		this.email = email;
		this.role = role;
	}
	
	// TODO change to Lombok

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
