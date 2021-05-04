package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "HOTEL_ROOMS")
@Entity
@Getter
@Setter
public class HotelRoom {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int size; // Change datatype?
    private int singleBedsAmount;
    private int doubleBedsAmount;
    private double baseNightPrice;
    private int maxAmountOfExtraBeds;

    public HotelRoom() { }

}