package lt.quotes.user.rest;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class CreateUserCommand {

	@NotNull
	@Length(min = 1, max = 50)
	private String username;

	@NotNull
	@Length(min = 1, max = 100)
	private String email;

	private String password;

	private String role;

	public void setUsername(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
}