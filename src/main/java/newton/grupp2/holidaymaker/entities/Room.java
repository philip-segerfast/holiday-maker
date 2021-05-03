package newton.grupp2.holidaymaker.entities;

import javax.persistence.*;

@Table(name = "ROOMS")
@Entity
public class Room {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int maxPeople;
    private int size; // Change datatype?
    private int singleBedsAmount;
    private int doubleBedsAmount;
    private double baseNightPrice;
    private int maxAmountOfExtraBeds;
    private int roomNumber;
    @ManyToOne
    private Hotel hotel;

    public Room() { }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(int maxPeople) {
        this.maxPeople = maxPeople;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getSingleBedsAmount() {
        return singleBedsAmount;
    }

    public void setSingleBedsAmount(int singleBedsAmount) {
        this.singleBedsAmount = singleBedsAmount;
    }

    public int getDoubleBedsAmount() {
        return doubleBedsAmount;
    }

    public void setDoubleBedsAmount(int doubleBedsAmount) {
        this.doubleBedsAmount = doubleBedsAmount;
    }

    public double getBaseNightPrice() {
        return baseNightPrice;
    }

    public void setBaseNightPrice(double baseNightPrice) {
        this.baseNightPrice = baseNightPrice;
    }

    public int getMaxAmountOfExtraBeds() {
        return maxAmountOfExtraBeds;
    }

    public void setMaxAmountOfExtraBeds(int maxAmountOfExtraBeds) {
        this.maxAmountOfExtraBeds = maxAmountOfExtraBeds;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }
}