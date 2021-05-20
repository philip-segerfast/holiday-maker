package newton.grupp2.holidaymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import newton.grupp2.holidaymaker.utils.HmUtils;

import javax.persistence.*;

@Table(name = "CHILDREN_AGES")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Child {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int age;

    @ManyToOne
    @JsonIgnore
    private Booking booking;

    @Override
    public String toString() {
        return HmUtils.getPrettyToString(this);
    }
}