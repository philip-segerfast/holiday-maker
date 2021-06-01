package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.HotelTag;
import newton.grupp2.holidaymaker.repositories.HotelTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HotelTagController {

    @Autowired
    private HotelTagRepository hotelTagRepository;

    @GetMapping("/rest/tags")
    public List<HotelTag> getAllHotelTags() {
        return hotelTagRepository.findAll();
    }
}
