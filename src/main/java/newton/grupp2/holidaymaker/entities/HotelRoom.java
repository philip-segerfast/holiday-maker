package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Table(name = "HOTEL_ROOMS")
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class HotelRoom {
    @Id
    @Column(name = "ID", nullable = false)
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

}