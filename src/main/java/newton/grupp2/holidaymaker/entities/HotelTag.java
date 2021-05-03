package newton.grupp2.holidaymaker.entities;

import javax.persistence.*;

@Table(name = "HOTEL_TAG")
@Entity
public class HotelTag {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}