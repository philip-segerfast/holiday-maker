package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    @JsonIgnoreProperties("bookings")
    // @JsonIgnore
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

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }
}