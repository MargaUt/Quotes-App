package lt.quotes.user.data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.quotes.role.data.Role;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "User")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank
	@Column(unique = true)
	private String username;

	@NotBlank
	private String password;

	@Email
	@Size(min = 6)
	@Column(unique = true)
	private String email;

	@ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE })
	@JoinColumn(name = "ROLE_ID")
	private Role role;

	public User(Role role) {
		super();
		this.role = role;
	}

	public User(String username, String email) {
		this.username = username;
		this.email = email;
	}

}
