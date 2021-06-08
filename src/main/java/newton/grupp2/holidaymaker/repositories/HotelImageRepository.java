package newton.grupp2.holidaymaker.repositories;

import newton.grupp2.holidaymaker.entities.HotelImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelImageRepository extends JpaRepository<HotelImage, Long> {
}