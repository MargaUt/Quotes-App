package lt.quotes.role.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.quotes.role.data.Role;
import lt.quotes.role.data.RoleRepository;


@Service
public class RoleService {
	@Autowired
	private RoleRepository roleRepo;

	@Transactional
	public void initRole(String name) {
		var roleAdmin = roleRepo.findByName(name);
		if (roleAdmin == null) {
			Role roleAdminNew = new Role(name);
			roleRepo.save(roleAdminNew);
		}
	}
	
	@Transactional(readOnly = true)
	public Role getOneRole(String name) {
		return roleRepo.findByName(name);
	}
	

	public RoleRepository getRoleRepo() {
		return roleRepo;
	}

	public void setRoleRepo(RoleRepository roleRepo) {
		this.roleRepo = roleRepo;
	}

}
