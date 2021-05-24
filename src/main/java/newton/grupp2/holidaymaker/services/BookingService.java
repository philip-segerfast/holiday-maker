package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.entities.Booking;
import newton.grupp2.holidaymaker.entities.User;
import newton.grupp2.holidaymaker.repositories.BookingRepository;
import newton.grupp2.holidaymaker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserService userService;

    public boolean addBooking(Booking booking) throws Exception {
        // Connects the children to this booking. This is not done automatically.
        booking.getChildren().forEach(child -> child.setBooking(booking));
        Booking savedBooking = bookingRepository.save(booking);
        return true;
    }

    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getUserBookings() {
        User user = userService.whoAmI();
        List<Booking> bookings = new ArrayList<>();
        if (user != null) {
            bookings = user.getBookings();
        }
        return bookings; // Returns empty list of bookings if no user is logged in
    }

    public void deleteBookingById(long id) {
        bookingRepository.deleteById(id);
    }
}
