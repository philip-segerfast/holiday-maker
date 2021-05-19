package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;
import java.util.List;

@Table(name = "HOTEL_TAGS")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class HotelTag {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;

    @ManyToMany
    @JoinTable(
            name="hotels_hotel_tags",
            joinColumns = @JoinColumn(name="TAG_ID"),
            inverseJoinColumns = @JoinColumn(name="HOTEL_ID")
    )
    private List<Hotel> hotels;

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }

}


















