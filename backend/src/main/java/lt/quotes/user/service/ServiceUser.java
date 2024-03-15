package lt.quotes.user.service;

public class ServiceUser {

	private String username;
	private String email;
	private String password;
	private String role;

	public ServiceUser() {
	}

	public ServiceUser(String username, String email, String role, String password) {
		this.username = username;
		this.email = email;
		this.role = role;
		this.password = password;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
