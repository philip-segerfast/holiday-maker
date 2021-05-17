package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "USERS")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique=true)        private String email;
    @Column(nullable = false)   private String password;
    @Column(nullable = false)   private String first_name;
    @Column(nullable = false)   private String last_name;

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.first_name = firstName;
        this.last_name = lastName;
    }
}