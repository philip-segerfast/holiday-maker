package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;

@Table(name = "HOTEL_TAGS")
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class HotelTag {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }

}