package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.Hotel;
import newton.grupp2.holidaymaker.forms.NewHotelForm;
import newton.grupp2.holidaymaker.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HotelController {

    @Autowired
    HotelService hotelService;

    @PostMapping("/rest/save-hotel")
    public Hotel saveHotel(@ModelAttribute NewHotelForm newHotelForm) {

        try {
            return hotelService.saveHotelWithForm(newHotelForm);
        } catch (Exception e) {
            System.err.println("Could not save hotel.");
            e.printStackTrace();
            return null;
        }

    }

}
