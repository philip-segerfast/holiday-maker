package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.Booking;
import newton.grupp2.holidaymaker.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping(value = "/rest/bookings/add")
    public boolean addBooking(@RequestBody Booking booking) throws Exception {
        return bookingService.addBooking(booking);
    }

    @GetMapping("/rest/bookings")
    public List<Booking> getBookings() {
        return bookingService.getBookings();
    }

}
