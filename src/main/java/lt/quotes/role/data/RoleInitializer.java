package lt.quotes.role.data;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lt.quotes.role.service.RoleService;


@Component
public class RoleInitializer implements InitializingBean {
	
	@Autowired
	private RoleService roleService;

	@Override
	public void afterPropertiesSet() throws Exception {
		roleService.sukurtiRole("Administrator");

	}

	public RoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

}
