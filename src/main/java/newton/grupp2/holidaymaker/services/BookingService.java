package newton.grupp2.holidaymaker.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import newton.grupp2.holidaymaker.entities.Booking;
import newton.grupp2.holidaymaker.entities.User;
import newton.grupp2.holidaymaker.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserService userService;

    public boolean addBooking(Booking booking) throws Exception {
        // Connects the children to this booking. This is not done automatically.
        booking.getChildren().forEach(child -> child.setBooking(booking));
        Booking savedBooking = bookingRepository.save(booking);
        return true;
    }

    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getUserBookings() {
        User user = userService.whoAmI();
        List<Booking> bookings = new ArrayList<>();
        if (user != null) {
            bookings = user.getBookings();
        }
        return bookings; // Returns empty list of bookings if no user is logged in
    }

    public Booking getBookingById(long id) {
        Optional<Booking> booking = bookingRepository.findById(id);

        if (booking.isPresent()) {
            return booking.get();
        }
        return null;
    }

    public void deleteBookingById(long id) {
        bookingRepository.deleteById(id);
    }

    public void updateBookingById(long id, Booking booking) {
        if(bookingRepository.existsById(id)) {
            booking.setId(id);
            bookingRepository.save(booking);
        }
    }

    public void createStripeProduct(String hotelname) {
        Stripe.apiKey = "sk_test_51IxU9qEuj6pxFvwiOS428d9MjBBYL6ARPqjr2v8SH8dOvzIXpw4B3GnuOYFyrrc3AdPC3QokZI5mrpG6UXr85mib00nxzfmfaj";

        Map<String, Object> params = new HashMap<>();
        params.put("name", hotelname);

        try {
            Product product = Product.create(params);
        } catch (StripeException e) {
            e.printStackTrace();
        }
    }

    public void updateStripeProduct(String hotelname) {
        Stripe.apiKey = "sk_test_51IxU9qEuj6pxFvwiOS428d9MjBBYL6ARPqjr2v8SH8dOvzIXpw4B3GnuOYFyrrc3AdPC3QokZI5mrpG6UXr85mib00nxzfmfaj";

        Product product =
                null;
        try {
            product = Product.retrieve("prod_JbMyv5sOOIslfp");
        } catch (StripeException e) {
            e.printStackTrace();
        }

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("order_id", "6735");
        Map<String, Object> params = new HashMap<>();
        params.put("metadata", metadata);
        params.put("name", hotelname);

        try {
            Product updatedProduct = product.update(params);
        } catch (StripeException e) {
            e.printStackTrace();
        }

        }

    public void createStripePrice(int paymentcost) {
        Stripe.apiKey = "sk_test_51IxU9qEuj6pxFvwiOS428d9MjBBYL6ARPqjr2v8SH8dOvzIXpw4B3GnuOYFyrrc3AdPC3QokZI5mrpG6UXr85mib00nxzfmfaj";

        Map<String, Object> params = new HashMap<>();
        params.put("unit_amount", paymentcost);
        params.put("currency", "eur");
        params.put("product", "prod_JbMyv5sOOIslfp");

        try {
            Price price = Price.create(params);
        } catch (StripeException e) {
            e.printStackTrace();
        }
    }

    public Map createSession(Map bookingPayment) {
        Stripe.apiKey =
                "sk_test_51IxU9qEuj6pxFvwiOS428d9MjBBYL6ARPqjr2v8SH8dOvzIXpw4B3GnuOYFyrrc3AdPC3QokZI5mrpG6UXr85mib00nxzfmfaj";

        Integer cost = (Integer) bookingPayment.get("totalCost");
        Long totalCost = Long.valueOf(cost.longValue());

        String hotelName = (String) bookingPayment.get("hotelName");
        System.out.println(hotelName);

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:3000")
                        .setCancelUrl("http://localhost:3000/about")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("eur")
                                                        .setUnitAmount(totalCost)
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
