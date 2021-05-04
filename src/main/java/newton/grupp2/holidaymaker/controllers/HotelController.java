package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.Hotel;
import newton.grupp2.holidaymaker.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HotelController {
    @Autowired
    private HotelService hotelService;

    //Get list of all hotels in database
    @GetMapping("/rest/allhotels")
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/rest/hotels/id/{id}")
        public Hotel getHotelById(@PathVariable long id) {
            return hotelService.getHotelById(id);
        }

    @PostMapping("/rest/search")
        public List<Hotel> getHotelsBySearch(@RequestBody Hotel hotelSearch) {
            return hotelService.getHotelsBySearch(hotelSearch);
    }


}
