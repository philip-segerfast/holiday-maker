package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.configurations.MyUserDetailsService;
import newton.grupp2.holidaymaker.entities.User;
import newton.grupp2.holidaymaker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MyUserDetailsService detailsService;

    //for registering a user C 1.3
    public User register(User user){
        return detailsService.registerUser(user);
    }

}
