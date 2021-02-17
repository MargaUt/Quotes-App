package lt.quotes.user.rest;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lt.quotes.role.data.Role;

public final class CreateUserCommand {


	@NotNull
	@Length(min = 1, max = 50)
	private String username;
	@NotNull
	@Length(min = 1, max = 100)
	private String email;
	private String password;
	
	private String role;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}