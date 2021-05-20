package newton.grupp2.holidaymaker.repositories;

import newton.grupp2.holidaymaker.entities.HotelReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelReviewRepository extends JpaRepository<HotelReview, Long> {
}