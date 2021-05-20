package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "USERS")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique=true)                    private String email;
    @Column(nullable = false)               private String password;
    @Column(nullable = false)               private String first_name;
    @Column(nullable = false)               private String last_name;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<Booking> bookings;

    @OneToMany(mappedBy = "author")
    // Vi kommer ändå antagligen aldrig hämta reviews
    // direkt från en användare, utan snarare via hotellet.
    // Bli så stor JSON annars.
    @JsonIgnore
    private List<HotelReview> reviews;

    public User(String email, String password, String firstName, String lastName) {
        this(email, password, firstName, lastName, new ArrayList<>());
    }

    public User(String email, String password, String first_name, String last_name, List<Booking> bookings) {
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
}