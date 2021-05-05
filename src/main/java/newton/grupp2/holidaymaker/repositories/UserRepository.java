package newton.grupp2.holidaymaker.repositories;

import newton.grupp2.holidaymaker.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}