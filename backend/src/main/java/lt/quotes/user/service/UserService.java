package lt.quotes.user.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.Getter;
import lombok.Setter;
import lt.quotes.role.service.RoleService;
import lt.quotes.user.data.User;
import lt.quotes.user.data.UserRepository;

@Service
public class UserService implements UserDetailsService {

	private static String USER_EXCEPTION_MESSAGE = "The user with this name was not found.";

	private static String NOT_FOUND = " not found.";

	private static String ROLE = " ROLE_";

	@Getter
	@Setter
	@Autowired
	private RoleService roleService;

	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public List<ServiceUser> getUsers() {
		return userRepository.findAll().stream().map(dbUser -> new ServiceUser(dbUser.getUsername(), dbUser.getEmail(),
				"********", dbUser.getRole().getName())).collect(Collectors.toList());
	}

	@Transactional
	public void createUser(ServiceUser user) {
		User newUser = new User(user.getUsername(), user.getEmail());
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		newUser.setPassword(encoder.encode(user.getPassword()));
		var role = roleService.getOneRole(user.getRole());
		newUser.setRole(role);
		userRepository.save(newUser);
	}

	@Transactional(readOnly = true)
	public ServiceUser getUser(String username) {
		var dbUser = userRepository.findByUsername(username);
		if (dbUser == null) {
			throw new IllegalArgumentException(USER_EXCEPTION_MESSAGE);
		}
		return new ServiceUser(dbUser.getUsername(), dbUser.getEmail(), "********", dbUser.getRole().getName());
	}

	@Transactional
	public void deleteUser(String username) {
		userRepository.deleteByUsername(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = findByEmail(username);
		if (user == null)
			throw new UsernameNotFoundException(username + NOT_FOUND);
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				AuthorityUtils.createAuthorityList(new String[] { ROLE + user.getRole().getName() }));
	}

	@Transactional(readOnly = true)
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public String getUsernameFromEmail(String currentUserEmail) {
		return userRepository.findByEmail(currentUserEmail).getUsername();

	}

}
