package newton.grupp2.holidaymaker.entities;

import lombok.*;

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

    @OneToMany
    private List<HotelTag> hotelTags = new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "hotel")
    private List<HotelRoom> hotelRooms = new ArrayList<>();

    @Override
    public String toString() {
        return "Hotel{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                ", extraBedPrice=" + extraBedPrice +
                ", coordinates='" + coordinates + '\'' +
                ", beachDistance=" + beachDistance +
                ", centerDistance=" + centerDistance +
                ", allInclusivePrice=" + allInclusivePrice +
                ", fullBoardPrice=" + fullBoardPrice +
                ", selfCateringPrice=" + selfCateringPrice +
                ", halfPensionPrice=" + halfPensionPrice +
                ", images=" + images +
                ", hotelTags=" + hotelTags +
                ", hotelRooms=" + hotelRooms +
                '}';
    }
}