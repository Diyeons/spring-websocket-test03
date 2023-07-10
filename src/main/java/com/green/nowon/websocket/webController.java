package com.green.nowon.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class webController {
	
	@MessageMapping("/sendMsg") // /app/sendMsg
	@SendTo("/topic/msg")//js : 구독하는 하는 클라이언트에 이벤트가 발생
	public MyMessage sendMsg(MyMessage message) {
		System.out.println(">>>>:"+message);
		return message;
		
	}
	
	@MessageMapping("/hello") // /app/hello
	@SendTo("/topic/msg")
	public MyMessage helloMsg(MyMessage message) {
		return message;
	}

}