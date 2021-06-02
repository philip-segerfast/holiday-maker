package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.Payment;import newton.grupp2.holidaymaker.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/rest/payments")
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }

    @GetMapping("/rest/payments")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }



}
