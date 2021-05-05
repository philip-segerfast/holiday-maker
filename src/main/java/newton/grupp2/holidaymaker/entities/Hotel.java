package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "HOTELS")
@Entity
@Getter
@Setter
@ToString
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

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<HotelImage> images = new ArrayList<>();

    @OneToMany
    private List<HotelTag> hotelTags = new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "hotel")
    private List<HotelRoom> hotelRooms = new ArrayList<>();

    public Hotel() {}
}