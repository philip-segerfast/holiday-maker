package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.entities.Hotel;
import newton.grupp2.holidaymaker.entities.HotelImage;
import newton.grupp2.holidaymaker.forms.NewHotelForm;
import newton.grupp2.holidaymaker.repositories.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private HotelImageService hotelImageService;

    public Hotel saveHotelWithForm(NewHotelForm form) throws Exception {
        Hotel hotel = new Hotel();
        hotel.setName(form.getName());
        hotel.setDescription(form.getDescription());
        hotel.setCity(form.getCity());
        hotel.setAddress(form.getAddress());
        hotel.setExtraBedPrice(form.getExtraBedPrice());
        hotel.setCoordinates(form.getCoordinates());
        hotel.setBeachDistance(form.getBeachDistance());
        hotel.setCenterDistance(form.getCenterDistance());
        hotel.setAllInclusivePrice(form.getAllInclusivePrice());
        hotel.setFullBoardPrice(form.getFullBoardPrice());
        hotel.setSelfCateringPrice(form.getSelfCateringPrice());
        hotel.setHalfPensionPrice(form.getHalfPensionPrice());

        MultipartFile[] imageFiles = form.getImages();
        if(imageFiles != null) {
            for(MultipartFile imageFile : imageFiles) {
                HotelImage savedImage = hotelImageService.saveImageToFileSystem(imageFile);
                hotel.getImages().add(savedImage);
            }
        }
        return hotelRepository.save(hotel);
    }

}




















