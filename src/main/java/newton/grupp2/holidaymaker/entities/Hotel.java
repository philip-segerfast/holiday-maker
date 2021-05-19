package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "HOTELS")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Hotel {
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String name;
    private String description;
    private String city;
    private String address;
    private double extraBedPrice;
    private String coordinates;
    private double beachDistance;
    private double centerDistance;
    private double allInclusivePrice;
    private double fullBoardPrice;
    private double selfCateringPrice;
    private double halfPensionPrice;

    @OneToMany(cascade = CascadeType.ALL)
    private List<HotelImage> images = new ArrayList<>();

    @ManyToMany(mappedBy = "hotels")
    private List<HotelTag> hotelTags = new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "hotel")
    private List<HotelRoom> hotelRooms = new ArrayList<>();

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }
}









