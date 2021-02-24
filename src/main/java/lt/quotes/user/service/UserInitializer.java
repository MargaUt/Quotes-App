package lt.quotes.user.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserInitializer {

	@Autowired
	private UserService userService;

	@PostConstruct
	public void sukurtiUser() {
//		1. Jeigu neranda vartotojo su emailu citatos@gmail.com
// 		2. Tada sukuria vartotoja su emailu citatos@gmail.com, vardu citata, slaptazodis neTavoPrograma112@

		if (userService.findByEmail("citatos@gmail.com") == null) {
			userService.createUser(new ServisoSluoksnioUser("citata", "citatos@gmail.com", "Administrator", "neTavoPrograma112@"));
		}
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
