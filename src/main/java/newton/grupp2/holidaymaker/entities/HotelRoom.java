package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "HOTEL_ROOMS")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class HotelRoom {
    @Id
    @Column(name = "ROOM_ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int size; // Change datatype?
    private int singleBedsAmount;
    private int doubleBedsAmount;
    private double baseNightPrice;
    private int maxAmountOfExtraBeds;

    @ManyToOne
    @JsonIgnore
    private Hotel hotel;

    @ManyToMany(mappedBy = "hotelRooms")
    @JsonIgnore
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }
}