package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.Hotel;
import newton.grupp2.holidaymaker.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
