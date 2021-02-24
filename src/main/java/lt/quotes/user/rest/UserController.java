package lt.quotes.user.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.quotes.PagingData;
import lt.quotes.user.service.ServisoSluoksnioUser;
import lt.quotes.user.service.UserService;


@RestController
@RequestMapping(value = "/api/user")
public class UserController {
	
	@Autowired
	private PagingData pagingData;
	private final UserService userService; // pridedame useriu servisa

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	public PagingData getPagingData() {
		return pagingData;
	}

	public void setPagingData(PagingData pagingData) {
		this.pagingData = pagingData;
	}

	@RequestMapping(path = "/loggedUsername", method = RequestMethod.GET)
	public String getLoggedInUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			String currentUserEmail = authentication.getName();
			var currentUserName = userService.getUsernameFromEmail(currentUserEmail);
			
			return currentUserName;
		}
		return "not logged";
	}

	/* Apdoros užklausas: GET /api/sventes */
	@RequestMapping(method = RequestMethod.GET)
//	@PreAuthorize("hasRole('Administratorius')") 
	public List<RestUser> getUsers() {
		pagingData.setLimit(10);
		return userService.getUsers()
				.stream()
				.map(servisoUser -> new RestUser(servisoUser.getUsername(), servisoUser.getEmail(), servisoUser.getRole()))
				.collect(Collectors.toList()); 
																										
	}

	/* Apdoros užklausas: GET /api/svente */
	@RequestMapping(path = "/{username}/", method = RequestMethod.GET)
	public RestUser getRestUser(@PathVariable final String username) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			String currentUserEmail = authentication.getName();
			var currentUserName = userService.getUsernameFromEmail(currentUserEmail);
			if(!username.equals(currentUserName)) {
				
//				if (AuthorityUtils.createAuthorityList
//						(new String[] { "ROLE_" + User.getRole().getName("Administratorius") }) != null) {
//				
//				}
				throw new IllegalArgumentException("Draudžiama pasiekti ne savo duomenis");
			}
		}
		// TODO: leisti tik adminui
		var servisoUser = userService.getUser(username);
		var restUser = new RestUser(servisoUser.getUsername(), servisoUser.getEmail(), servisoUser.getRole());
		return restUser;
	}

	/* Sukurs šventę ir grąžins atsakymą su HTTP statusu 201 */
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createUser(
			@RequestBody
			@Valid final CreateUserCommand cmd) {	
		userService.createUser(new ServisoSluoksnioUser(cmd.getUsername(), cmd.getEmail(), cmd.getRole(), cmd.getPassword()));

	}

	/* Apdoros užklausas: DELETE /api/svente/<pavadinimas> */
	@RequestMapping(path = "/{username}/", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
//	@PreAuthorize("hasRole('Administratorius')")
	public void deleteUser(
			@PathVariable final String username) {
		userService.deleteUser(username);

	}

}
