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

    @GetMapping("/rest/bookings/userbookings")
    public List<Booking> getUserBookings() {
        return bookingService.getUserBookings();
    }

    @GetMapping("/rest/bookings/id/{id}")
    public Booking getBookingById(@PathVariable long id) {
        return bookingService.getBookingById(id);
    }

    @DeleteMapping("/rest/bookings/{id}")
    public void deleteBookingById(@PathVariable long id) {
        bookingService.deleteBookingById(id);
    }

    @PutMapping("/rest/bookings/{id}")
    public void updateBookingById(@PathVariable long id, @RequestBody Booking booking) {
        bookingService.updateBookingById(id, booking);
    }
    @PostMapping("/rest/bookings/stripe/{hotelname}")
    public void createStripeProduct(@PathVariable String hotelname) {
        bookingService.createStripeProduct(hotelname);
    }

    @PostMapping("/rest/bookings/stripe/update/{hotelname}")
    public void updateStripeProduct(@PathVariable String hotelname) {
        bookingService.updateStripeProduct(hotelname);
    }

    @PostMapping("/rest/bookings/stripe/createprice/{paymentcost}")
    public void createStripePrice(@PathVariable int paymentcost) {
        bookingService.createStripePrice(paymentcost);
    }


}
