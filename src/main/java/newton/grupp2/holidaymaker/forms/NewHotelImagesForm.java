package newton.grupp2.holidaymaker.forms;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class NewHotelImagesForm {

    private MultipartFile[] images;

    public NewHotelImagesForm() {}

}
