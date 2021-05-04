package newton.grupp2.holidaymaker.repositories;

import newton.grupp2.holidaymaker.entities.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    /*
    @Query(nativeQuery = true, value =
            "SELECT * FROM hotels WHERE hotels.name=? AND " +
                    "hotels.city=?1 AND" +
                    "hotels.asdf=?2 AND" +
                    )
    List<Hotel> findHotelsFilter(String name, );*/

    @Query(nativeQuery = true, value =
            "SELECT * FROM hotels WHERE hotels.city LIKE %?1% AND hotels.name LIKE %?2%"
    )
    List<Hotel> findHotelstest(String city, String name);

    List<Hotel> findAllByNameContainingOrderByNameAsc(String name);
    List<Hotel> findAllByCityContainingOrderByNameAsc(String city);
}