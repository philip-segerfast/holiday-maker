package newton.grupp2.holidaymaker.repositories;

import newton.grupp2.holidaymaker.entities.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> { }