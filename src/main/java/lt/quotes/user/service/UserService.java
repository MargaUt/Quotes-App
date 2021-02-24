package lt.quotes.user.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.quotes.role.service.RoleService;
import lt.quotes.user.data.User;
import lt.quotes.user.data.UserRepository;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	private RoleService roleService;
	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public List<ServisoSluoksnioUser> getUsers() {
		return userRepository.findAll().stream().map(dbUser -> new ServisoSluoksnioUser(dbUser.getUsername(),
				dbUser.getEmail(), dbUser.getRole().getName(), "********")).collect(Collectors.toList());
	}

	@Transactional
//	 @PreAuthorize("hasRole('Administratorius')") 
	public void createUser(ServisoSluoksnioUser user ) {
		if(user.getRole() == "Administratorius") {
			throw new IllegalArgumentException("Draudžiama kurti Administratorius naudototojus");
		}
		User newUser = new User(user.getUsername(), user.getEmail());
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		newUser.setPassword(encoder.encode(user.getPassword()));
		var role = roleService.getOneRole(user.getRole());
		newUser.setRole(role);
		User saved = userRepository.save(newUser);
		
//		var dbUser = new User(user.getUsername(), user.getEmail());
//		userRepository.save(dbUser);
	}

	@Transactional(readOnly = true)
	public ServisoSluoksnioUser getUser(String username) {
		var dbUser = userRepository.findByUsername(username);
			if(dbUser == null) {
				throw new IllegalArgumentException("Naudotojo tokiu vardu nėra.");	
			}
		var servisoUser = new ServisoSluoksnioUser(dbUser.getUsername(), dbUser.getEmail(),
				dbUser.getRole().getName(), "********");
		return servisoUser;
	}

	@Transactional
	public void deleteUser(String username) {
		userRepository.deleteByUsername(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = findByEmail(username);
		if (user == null)
			throw new UsernameNotFoundException(username + " not found.");
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				AuthorityUtils.createAuthorityList(new String[] { "ROLE_" + user.getRole().getName() }));
	} // <..>

	@Transactional(readOnly = true)
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public String getUsernameFromEmail(String currentUserEmail) {
		return userRepository.findByEmail(currentUserEmail).getUsername();
		
	}

	public RoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

}
