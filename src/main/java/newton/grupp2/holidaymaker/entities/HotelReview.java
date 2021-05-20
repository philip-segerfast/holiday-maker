package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Table(name = "HOTEL_REVIEWS")
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class HotelReview {
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @Column(nullable = false) private int rating;
    @Column(nullable = false) private String comment;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties({"reviews", "bookings"})
    private User author;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties({"bookings", "hotelRooms"})
    private Hotel hotel;
}