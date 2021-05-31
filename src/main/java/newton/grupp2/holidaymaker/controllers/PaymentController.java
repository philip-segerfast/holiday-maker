package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

}
