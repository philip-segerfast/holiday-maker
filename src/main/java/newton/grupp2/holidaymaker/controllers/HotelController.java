package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.Hotel;
import newton.grupp2.holidaymaker.entities.HotelReview;
import newton.grupp2.holidaymaker.entities.HotelRoom;
import newton.grupp2.holidaymaker.forms.NewHotelForm;
import newton.grupp2.holidaymaker.forms.NewHotelImagesForm;
import newton.grupp2.holidaymaker.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static newton.grupp2.holidaymaker.utils.colors.PrintUtils.printDebug;
import static newton.grupp2.holidaymaker.utils.colors.PrintUtils.printInfo;

@RestController
public class HotelController {

    @Autowired
    private HotelService hotelService;

    //Get list of all hotels in database
    @GetMapping("/rest/hotels/all-hotels")
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/rest/hotels/id/{id}")
    public Hotel getHotelById(@PathVariable long id) {
        return hotelService.getHotelById(id);
    }

    @PostMapping("/rest/hotels/save")
    public Hotel saveHotel(@ModelAttribute NewHotelForm newHotelForm) {
        try {
            return hotelService.saveHotelWithForm(newHotelForm);
        } catch (Exception e) {
            System.err.println("Could not save hotel.");
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/rest/hotels/add-images/{hotelId}")
    public Hotel saveHotelImages(@ModelAttribute NewHotelImagesForm hotelImages, @PathVariable long hotelId) {
        try {
            return hotelService.saveImages(hotelId, hotelImages);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/rest/hotels/get-rooms/{id}")
    public List<HotelRoom> getRoomsForHotel(@PathVariable long id) {
        return hotelService.getRoomsForHotel(id);
    }

    @PostMapping("/rest/hotels/reviews/add")
    public HotelReview postReview(@RequestBody HotelReview review) {
        printInfo("Review: ");
        printDebug(review.toString());
        return hotelService.postReview(review);
    }

}






















