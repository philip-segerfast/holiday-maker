package newton.grupp2.holidaymaker.entities;

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

    public double getAllInclusivePrice() {
        return allInclusivePrice;
    }

    public void setAllInclusivePrice(double allInclusivePrice) {
        this.allInclusivePrice = allInclusivePrice;
    }

    public double getFullBoardPrice() {
        return fullBoardPrice;
    }

    public void setFullBoardPrice(double fullBoardPrice) {
        this.fullBoardPrice = fullBoardPrice;
    }

    public double getSelfCateringPrice() {
        return selfCateringPrice;
    }

    public void setSelfCateringPrice(double selfCateringPrice) {
        this.selfCateringPrice = selfCateringPrice;
    }

    public double getHalfPensionPrice() {
        return halfPensionPrice;
    }

    public void setHalfPensionPrice(double halfPensionPrice) {
        this.halfPensionPrice = halfPensionPrice;
    }

    public List<HotelImage> getImages() {
        return images;
    }

    public void setImages(List<HotelImage> pictures) {
        this.images = pictures;
    }

    public List<HotelTag> getHotelTags() {
        return hotelTags;
    }

    public void setHotelTags(List<HotelTag> hotelTags) {
        this.hotelTags = hotelTags;
    }

    public List<HotelRoom> getHotelRooms() {
        return hotelRooms;
    }

    public void setHotelRooms(List<HotelRoom> hotelRooms) {
        this.hotelRooms = hotelRooms;
    }
}