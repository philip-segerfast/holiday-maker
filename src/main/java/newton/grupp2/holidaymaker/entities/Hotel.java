package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "HOTELS")
@Entity
@Getter
@Setter
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
    @OneToMany
    private List<HotelImage> images;
    @OneToMany
    private List<HotelTag> hotelTags;
    @OneToMany
    private List<HotelRoom> hotelRooms;

    public Hotel() {}
}