package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Just contains an image URL.
 */
@Table(name = "HOTEL_IMAGES")
@Entity
@Getter
@Setter
public class HotelImage {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;

    public HotelImage() {}

    public HotelImage(String url) {
        this.url = url;
    }
}