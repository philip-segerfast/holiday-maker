package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static newton.grupp2.holidaymaker.utils.colors.PrintUtils.printError;

@Table(name = "BOOKINGS")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Booking {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "ROOM_BOOKINGS",
            joinColumns = @JoinColumn(name = "BOOKING_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROOM_ID")
    )
    @JsonIgnoreProperties("bookings")
    private List<HotelRoom> hotelRooms;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "booking")
    private List<Child> children = new ArrayList<>();


    @ManyToOne
    @JsonIgnoreProperties({"bookings", "reviews"})
    private User user;


    // Date and time stored as Unix time (google it)
    @Column(nullable = false)   private long fromTime;
    @Column(nullable = false)   private long toTime;
    @Column(nullable = false)   private int adults;
    @Column(nullable = false)   private int extraBeds;
    /* 1 = self catering, 2 = half pension, 3 = full board, 4 = all inclusive */
    @Column(nullable = false)   private int luxuryClass;
    @Column(nullable = false, insertable = false, columnDefinition = "boolean default false")
    private boolean isPaid;


    @Transient
    @JsonIgnoreProperties({"hotelRooms", "reviews"})
    // There will be no setter.
    @Setter(AccessLevel.NONE)
    private Hotel hotel;


    @JsonProperty
    /*
        Det går även att använda en annotation istället för getter.
        https://stackoverflow.com/questions/2986318/how-to-map-calculated-properties-with-jpa-and-hibernate
        @Formula("(select min(o.creation_date) from Orders o where o.customer_id = id)")
        private Date firstOrderDate;
    */
    public Hotel getHotel() {
        // Returns the first hotel room in the hotels list.
        HotelRoom aHotelRoom = hotelRooms.stream().findFirst().orElse(null);
        if(aHotelRoom != null) {
            Hotel hotel = aHotelRoom.getHotel();
            if(hotel != null) {
                return aHotelRoom.getHotel();
            } else {
                System.out.println("NO HOTEL FOUND FOR ROOM WITH ID " + aHotelRoom.getId());
                return null;
            }
        } else {
            printError(String.format("BOOKING WITH ID %d DIDN'T HAVE ANY ROOMS SPECIFIED.", getId()));
            return null;
        }
    }


    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }
}