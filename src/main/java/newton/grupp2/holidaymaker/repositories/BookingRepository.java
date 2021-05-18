package newton.grupp2.holidaymaker.repositories;

import newton.grupp2.holidaymaker.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> { }