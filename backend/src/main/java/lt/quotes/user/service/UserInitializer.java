package lt.quotes.user.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserInitializer {

	@Autowired
	private UserService userService;

	@PostConstruct
	public void initUser() {
		if (userService.findByEmail("user@email.com") == null) {
			userService.createUser(new ServiceUser("user", "user@email.com", "Administratorius", "user"));
		}
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
