package newton.grupp2.holidaymaker.entities;

import javax.persistence.*;

/**
 * Just contains an image URL.
 */
@Table(name = "HOTEL_PICTURES")
@Entity
public class HotelPicture {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;

    public HotelPicture() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}