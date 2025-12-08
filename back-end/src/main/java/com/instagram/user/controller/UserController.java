package com.instagram.user.controller;


import com.instagram.common.util.JwtUtil;
import com.instagram.user.model.dto.LoginRequest;
import com.instagram.user.model.dto.LoginResponse;
import com.instagram.user.model.dto.User;
import com.instagram.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public void signUp(@RequestBody User user) {
        userService.signUp(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        User user = userService.login(request.getUserEmail(), request.getUserPassword());
        if(user == null) {
            return ResponseEntity.status(401).body(null);
        }

        String token = jwtUtil.generateToken(user.getUserId(), user.getUserEmail());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setUser(user);
        log.info("로그인 성공 - 이메일 : {}",user.getUserEmail());
        // ok == 200
        return ResponseEntity.ok(loginResponse);
    }
}
