package newton.grupp2.holidaymaker.controllers;

import newton.grupp2.holidaymaker.entities.User;
import newton.grupp2.holidaymaker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public User register(@RequestBody User user) {return userService.register(user);}

}

