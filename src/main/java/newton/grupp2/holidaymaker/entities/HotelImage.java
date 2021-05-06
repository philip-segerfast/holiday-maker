package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Just contains an image URL that is stored on disc.
 */
@Table(name = "HOTEL_IMAGES")
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class HotelImage {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;

    public HotelImage(String url) {
        this.fileName = url;
    }
}