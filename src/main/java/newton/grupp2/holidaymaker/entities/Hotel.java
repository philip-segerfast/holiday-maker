package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;
import java.text.DecimalFormat;
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
    @Transient
    private double minRoomPrice;
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<HotelImage> images = new ArrayList<>();

    @ManyToMany(mappedBy = "hotels")
    @JsonIgnoreProperties("hotels")
    private List<HotelTag> hotelTags = new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "hotel")
    @JsonIgnoreProperties({"hotel"})
    private List<HotelRoom> hotelRooms = new ArrayList<>();

    @OneToMany(mappedBy = "hotel")
    @JsonIgnoreProperties("hotel")
    private List<HotelReview> reviews = new ArrayList<>();

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }

    public void setMinRoomPrice(double minRoomPrice) {
        this.minRoomPrice = minRoomPrice;
    }

    @JsonProperty
    public String getAverageRating() {
        double totalRating = 0;
        double amountOfRatings = 0;
        for(HotelReview review : reviews) {
            totalRating += review.getRating();
            amountOfRatings++;
        }
        return new DecimalFormat("#.#").format(totalRating / amountOfRatings);
    }
}









