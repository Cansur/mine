package com.example.mine.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.mine.entity.User;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
	private final User user;
    
    // Constructor
    public CustomUserDetails(User user) {
    	this.user = user;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole().name()));
    }
    
    // ---------------------------------
    public Long getId() {
    	return user.getId();
    }
    
    public String getAccount() {
    	return user.getAccount();
    }
    
    @Override
    public String getUsername() {
        return user.getUsername();
    }
    
    @Override
    public String getPassword() {
        return user.getPassword();
    }
    
    // ---------------------------------
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}