package newton.grupp2.holidaymaker.repositories;

import newton.grupp2.holidaymaker.entities.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findAllByNameContainingOrderByNameAsc(String name);
    List<Hotel> findAllByCityContainingOrderByNameAsc(String city);
}