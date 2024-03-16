package lt.quotes.role.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.Getter;
import lombok.Setter;
import lt.quotes.role.data.Role;
import lt.quotes.role.data.RoleRepository;

@Getter
@Setter
@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepo;

	@Transactional
	public void initRole(String name) {
		var role = roleRepo.findByName(name);
		if (role == null) {
			Role roleNew = new Role(name);
			roleRepo.save(roleNew);
		}
	}

	@Transactional(readOnly = true)
	public Role getOneRole(String name) {
		return roleRepo.findByName(name);
	}

}
