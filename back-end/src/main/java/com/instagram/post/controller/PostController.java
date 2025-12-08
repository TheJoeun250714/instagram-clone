package com.instagram.post.controller;


import com.instagram.common.util.JwtUtil;
import com.instagram.post.model.dto.Post;
import com.instagram.post.model.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody Post post,
                                             @RequestHeader("Authorization") String authHeader) {

        // 현재 로그인한 사용자 id 가져오기
        // import org.springframework.security.core.Authentication;
        /*
        백엔드 인증 기반
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int currentUserId = Integer.parseInt(authentication.getName());
        */
        String token = authHeader.substring(7); // 맨 앞 "Bearer "만 제거 하고 추출
        int currentUserId = jwtUtil.getUserIdFromToken(token); // token 에서 userId 추출
        post.setUserId(currentUserId);
        boolean success = postService.createPost(post);
        // log 사용하여 token 과 currentUserId post 데이터 확인

        if(success) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
