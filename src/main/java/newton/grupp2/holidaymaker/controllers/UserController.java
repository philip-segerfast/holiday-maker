package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.User;
import newton.grupp2.holidaymaker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public User register(@RequestBody User user) {
        System.out.println("REGISTER");
        return userService.register(user);
    }
    //get logged in user (C2)
    @GetMapping("/auth/whoami")
    public User whoAmI(){
        return userService.whoAmI();
    }
    //getting all users (C2)
    @GetMapping("/rest/users")
    public List<User> getUsers(){
        return userService.getAll();
    }
    //getting user by id
    @GetMapping("/rest/users/{id}")
    public User getUserById( long id){
        return userService.getById(id);
    }



}
