package newton.grupp2.holidaymaker.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import newton.grupp2.holidaymaker.entities.Payment;
import newton.grupp2.holidaymaker.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public Payment addPayment(Payment payment) {
       return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Map createCheckoutSession(Map bookingPayment) {
        Stripe.apiKey =
                "sk_test_51IxU9qEuj6pxFvwiOS428d9MjBBYL6ARPqjr2v8SH8dOvzIXpw4B3GnuOYFyrrc3AdPC3QokZI5mrpG6UXr85mib00nxzfmfaj";

        Integer cost = (Integer) bookingPayment.get("totalCost");
        Long totalCost = Long.valueOf(cost.longValue());

        String hotelName = (String) bookingPayment.get("hotelName");

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:3000/successfullpayment")
                        .setCancelUrl("http://localhost:3000")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("eur")
                                                        .setUnitAmount(totalCost*100) //converts from euro to cent
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName(hotelName)
                                                                        .build())
                                                        .build())
                                        .build())
                        .build();

        Session session = null;
        try {
            session = Session.create(params);
        } catch (StripeException e) {
            e.printStackTrace();
        }

        Map<String, String> responseData = new HashMap();
        responseData.put("id", session.getId());

        return responseData;
    }
}
