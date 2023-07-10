package com.green.nowon.websocket;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // 메시지 브로거가 지원하는 WebSocket메세지 처리를 활성화 
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
//메모리 기반 메시지 브로커가 접두사가 붙은 목적지에서 클라이언트에게 인사말 메시지를 
	//다시 전달 할 수 있도록 호출 하는것 

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
	// 서버-> 클라이언트로 보내는 메시지 
	config.enableSimpleBroker("/topic");
	
    //클라이언트(웹) -> 서버에 전송 시 
    config.setApplicationDestinationPrefixes("/app"); 
    //ws://localhost:8080/app/uri ---> app으로 들어오는 것을 맵핑  
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
	  //js: new SoKJS('/my-ws') 
    registry.addEndpoint("/my-ws").withSockJS();
    // security : uri 
  }

}