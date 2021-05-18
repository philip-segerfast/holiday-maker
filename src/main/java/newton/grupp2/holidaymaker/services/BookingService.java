package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.entities.Booking;
import newton.grupp2.holidaymaker.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public boolean addBooking(Booking booking) throws Exception {
        // Connects the children to this booking. This is not done automatically.
        booking.getChildren().forEach(child -> child.setBooking(booking));
        Booking savedBooking = bookingRepository.save(booking);
        return true;
    }

    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }

}
