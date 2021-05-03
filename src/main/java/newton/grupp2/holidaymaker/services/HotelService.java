package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.entities.Hotel;
import newton.grupp2.holidaymaker.repositories.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

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

}
