package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.entities.*;
import newton.grupp2.holidaymaker.forms.NewHotelForm;
import newton.grupp2.holidaymaker.forms.NewHotelImagesForm;
import newton.grupp2.holidaymaker.repositories.HotelRepository;
import newton.grupp2.holidaymaker.repositories.HotelReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private HotelImageService hotelImageService;

    @Autowired
    private HotelReviewRepository hotelReviewRepository;

    @Autowired
    private UserService userService;

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

    public List<HotelRoom> getRoomsForHotel(long id) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if(hotel != null) {
            return hotel.getHotelRooms();
        }
        return null;
    }

    public List<Hotel> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        for(Hotel hotel : hotels) {
            List<HotelRoom> rooms = hotel.getHotelRooms();
            double cheapestRoomPrice = Double.MAX_VALUE;
            for(HotelRoom room : rooms) {
                double roomPrice = room.getBaseNightPrice();
                if(roomPrice <= cheapestRoomPrice) {
                    cheapestRoomPrice = roomPrice;
                }
            }
            hotel.setMinRoomPrice(cheapestRoomPrice);
        }
        return hotels;
    }

    public Hotel getHotelById(long id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);

        if (hotel.isPresent()) {
            return hotel.get();
        }
        return null;
    }

    public Hotel saveImages(long hotelId, NewHotelImagesForm hotelImages) throws Exception {
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        MultipartFile[] imageFiles = hotelImages.getImages();
        if(hotel != null) {
            if(imageFiles != null) {
                for(MultipartFile imageFile : imageFiles) {
                    HotelImage savedImage = hotelImageService.saveImageToFileSystem(imageFile);
                    hotel.getImages().add(savedImage);
                }
                return hotelRepository.save(hotel);
            }
        }
        return null;
    }

    public HotelReview postReview(HotelReview review) {
        User author = userService.getById(review.getAuthor().getId());
        System.out.println("============================================");
        System.out.println("AUTHOR");
        System.out.println(author);
        System.out.println("============================================");
        return hotelReviewRepository.save(review);
    }

    public void createThumbnails() {
        hotelImageService.createThumbnails();
    }
}



















