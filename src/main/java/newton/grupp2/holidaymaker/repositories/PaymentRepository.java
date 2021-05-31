package newton.grupp2.holidaymaker.repositories;

import newton.grupp2.holidaymaker.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
