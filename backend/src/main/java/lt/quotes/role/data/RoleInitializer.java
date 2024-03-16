package lt.quotes.role.data;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;
import lt.quotes.role.service.RoleService;

@Getter
@Setter
@Component
public class RoleInitializer implements InitializingBean {

	public static String ADMIN = "Administrator";

	@Autowired
	private RoleService roleService;

	@PostConstruct
	public void afterPropertiesSet() throws Exception {
		roleService.initRole(ADMIN);
	}

}
