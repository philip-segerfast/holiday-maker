package newton.grupp2.holidaymaker.entities;

import javax.persistence.*;

@Table(name = "USER")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String password;
    private String firstName;
    private String lastname;



    public User(String email, String password, String firstName, String lastname) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastname = lastname;
    }

    public User() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return email;
    }

    public void setUsername(String username) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}