package newton.grupp2.holidaymaker.forms;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import newton.grupp2.holidaymaker.entities.HotelRoom;
import newton.grupp2.holidaymaker.entities.HotelTag;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class NewHotelForm {

    private String name;
    private String description;
    private String city;
    private String address;
    private String coordinates;
    private double extraBedPrice;
    private double beachDistance;
    private double centerDistance;
    private double allInclusivePrice;
    private double fullBoardPrice;
    private double selfCateringPrice;
    private double halfPensionPrice;
    private MultipartFile[] images;
    private HotelTag[] hotelTags;
    private HotelRoom[] hotelRooms;

    public NewHotelForm() {}

}
