package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;

@Table(name = "PAYMENTS")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment {

    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String cardHolderName;
    private Long cardNumber;
    private Long cardEndDate;
    private int cardCvc;
    private double totalCost;

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }
}
