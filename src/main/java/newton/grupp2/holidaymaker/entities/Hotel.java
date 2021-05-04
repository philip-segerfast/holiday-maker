package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Table(name = "HOTELS")
@Entity
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
    @OneToMany
    private List<HotelPicture> pictures;
    @JsonIgnoreProperties("hotel")      //To stop loop when using getAllHotels in postman /Peter
    @ManyToOne
    private HotelLuxuryClass luxuryClass;
    @OneToMany
    private List<HotelTag> hotelTags;
    @OneToMany
    private List<HotelRoom> hotelRooms;

    public Hotel() {}

    public List<HotelRoom> getRooms() {
        return hotelRooms;
    }

    public void setRooms(List<HotelRoom> hotelRooms) {
        this.hotelRooms = hotelRooms;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getExtraBedPrice() {
        return extraBedPrice;
    }

    public void setExtraBedPrice(double extraBedPrice) {
        this.extraBedPrice = extraBedPrice;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public double getBeachDistance() {
        return beachDistance;
    }

    public void setBeachDistance(double beachDistance) {
        this.beachDistance = beachDistance;
    }

    public double getCenterDistance() {
        return centerDistance;
    }

    public void setCenterDistance(double centerDistance) {
        this.centerDistance = centerDistance;
    }

    public List<HotelPicture> getPictures() {
        return pictures;
    }

    public void setPictures(List<HotelPicture> pictures) {
        this.pictures = pictures;
    }

    public HotelLuxuryClass getLuxuryClass() {
        return luxuryClass;
    }

    public void setLuxuryClass(HotelLuxuryClass luxuryClass) {
        this.luxuryClass = luxuryClass;
    }

    public List<HotelTag> getHotelTags() {
        return hotelTags;
    }

    public void setHotelTags(List<HotelTag> hotelTags) {
        this.hotelTags = hotelTags;
    }
}