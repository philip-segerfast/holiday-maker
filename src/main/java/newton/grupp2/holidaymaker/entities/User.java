package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Table(name = "USER")
@Entity
@Setter
@ToString
@Table(name = "user")
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String password;
    private String first_name;
    private String last_name;



    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.first_name = firstName;
        this.last_name = lastName;
    }

    public User() {}
}

