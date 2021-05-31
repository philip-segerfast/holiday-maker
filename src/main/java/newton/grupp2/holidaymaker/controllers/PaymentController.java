package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.Payment;
import newton.grupp2.holidaymaker.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/rest/payments")
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }


}
