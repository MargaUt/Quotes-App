package lt.quotes.user.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

import static lt.quotes.role.data.RoleInitializer.ADMIN;

@Getter
@Setter
@Component
public class UserInitializer {

	private static String EMAIL = "user@email.com";

	private static String USER = "user";

	@Autowired
	private UserService userService;

	@PostConstruct
	public void initUser() {
		if (userService.findByEmail(EMAIL) == null) {
			userService.createUser(new ServiceUser(USER, EMAIL, USER, ADMIN));
		}
	}

}
