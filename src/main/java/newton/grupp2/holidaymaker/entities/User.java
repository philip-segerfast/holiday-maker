package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "USERS")
@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User() {}
}