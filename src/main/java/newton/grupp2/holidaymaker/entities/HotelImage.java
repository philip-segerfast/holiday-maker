package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import newton.grupp2.holidaymaker.utils.HmUtils;

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
    private String thumbnailFileName;

    public HotelImage(String fileName) {
        this(fileName, null);
    }

    public HotelImage(String fileName, String thumbnailFileName) {
        this.fileName = fileName;
        this.thumbnailFileName = thumbnailFileName;
    }

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }
}