package com.wheely.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity 
public class SecurityConfiguration {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomJWTAuthenticationFilter customJWTAuthenticationFilter;
	
	
		@Bean
		public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
		{
			
			http.csrf(customizer -> customizer.disable())
			
	        .authorizeHttpRequests
	        (request -> 
	        request.requestMatchers("/products/view",
	        		"/users/register","/users/login",
					"/v*/api-doc*/**","/swagger-ui/**").permitAll() 
	    
	        .requestMatchers(HttpMethod.OPTIONS).permitAll()
	        	
	       .requestMatchers("/users/**")
	       .hasRole("CUSTOMER")
	       .requestMatchers("/admin/**")
	       .hasRole("ADMIN")        	
	       .requestMatchers("/mechanic/**")
	       .hasRole("MECHANIC") 
	        .anyRequest().authenticated())  
	  //      .httpBasic(Customizer.withDefaults()) - replacing it by custom JWT filter
	        .sessionManagement(session 
	        		-> session.sessionCreationPolicy(
	        				SessionCreationPolicy.STATELESS));
			//adding custom JWT fi;lter before any auth filter
			http.addFilterBefore(customJWTAuthenticationFilter, 
					UsernamePasswordAuthenticationFilter.class);
	        return http.build();
		}
		//to supply Auth Mgr , configure it as a spring bean
		@Bean
		public AuthenticationManager authenticationManager
		(AuthenticationConfiguration config) throws Exception
		{
			return config.getAuthenticationManager();
		}

}
