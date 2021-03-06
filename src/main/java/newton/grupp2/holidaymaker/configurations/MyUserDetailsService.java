package newton.grupp2.holidaymaker.configurations;

import newton.grupp2.holidaymaker.entities.User;
import newton.grupp2.holidaymaker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;

@Configuration
public class MyUserDetailsService implements UserDetailsService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public BCryptPasswordEncoder getEncoder() { return encoder; }

    @Autowired
    private UserRepository userRepo;

    @PostConstruct
    private void createDefaultUsers(){
        if (userRepo.findByEmail("lasse74@example.com") == null) {
            registerUser(new User("lasse74@example.com", "abc123", "Lasse", "Larsson"));
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found by name: " + email);
        }
        return toUserDetails(user);
    }

    public User registerUser(User user){
        System.out.println(user);
        // abc123 -> 1239e78hf23ewffjf293478hf2doi321u9c27gt39c2uh3w
        user.setPassword(encoder.encode(user.getPassword()));
        try {
            return userRepo.save(user);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    private UserDetails toUserDetails(User user) {
        // If you have a User entity you have to
        // use the userdetails User for this to work
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER").build();
    }
}
