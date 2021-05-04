package newton.grupp2.holidaymaker.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "HOTEL_TAGS")
@Entity
@Getter
@Setter
public class HotelTag {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;

}