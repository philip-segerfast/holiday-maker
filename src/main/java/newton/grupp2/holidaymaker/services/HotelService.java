package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.entities.Hotel;
import newton.grupp2.holidaymaker.repositories.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @PostConstruct
    public void generateTestData() {
        /*
        Hotel hotel = new Hotel();

        hotel.setName("test hotel 1");

        hotelRepository.save(hotel);
        */
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public List<Hotel> getHotelsBySearch(Hotel hotelSearch) {
        System.out.println("Id of searched hotel is: " + hotelSearch.getId());
        List<Hotel> listOfHotels = new ArrayList<>();

        return hotelRepository.findAll();
    }

    public Hotel getHotelById(long id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);

        if (hotel.isPresent()) {
            return hotel.get();
        }
        return null;
    }
}
