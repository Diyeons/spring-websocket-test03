/**
 * 
 */
var stompClient=null;

function sendMessage(){
	//var sendMessage=document.getElementById("message").value;
	var sendMessage=$.trim($("#message").val());
	if(sendMessage==""){
		alert("메시지가 입력되지 않았어요");$("#message").val("");return;
	}
	var data={
		name: $("#name").val(),
		content: sendMessage
	};
	//메세지 전달 
	stompClient.send("/app/sendMsg",{}, JSON.stringify(data))
}

function connect(){
	//socket 접속
	var socket=new SockJS("/my-ws");
	stompClient=Stomp.over(socket);
	
	//접속
	stompClient.connect({},function(frame){
		console.log("Connected:"+frame);
		var data={
			name: "hello",
			content: $("#name").val()+"님! 입장하였습니다."
		}
		stompClient.send("/app/hello",{}, JSON.stringify(data));
		
		//메세지 수신을위한 구독 설정 구독할브로커
		stompClient.subscribe('/topic/msg',function(msgData){
			//자바의 메세지 객체-> JSON(name:value)
			var msg=JSON.parse(msgData.body);
			var msgText=`
				<tr>
					<td class="msg-left">
						${msg.name !="hello" ?`<div>${msg.name}</div>`:``} 
					
						<div>${msg.content}</div>
					</td>
					
				</tr>`
			$("#greetings").append(msgText);
		});
	});
	
	connectMode(true);
}
function disconnect(){
	//socket close
	if(stompClient!=null){
		stompClient.disconnect();
	}
	console.log(">>>>Disconnected!!!");
	connectMode(false);
}
//버튼조작
function connectMode(isTrue){
	
	$("#connect").prop("disabled", isTrue);
	$("#disconnect").prop("disabled", !isTrue);
	if(isTrue){
		$("#name").prop("disabled", isTrue);
	}else{
		$("#name").prop("disabled", !isTrue);
	}
}


$(function(){
	/*
	$("form").on('submit',function(e){
		e.preventDefault();
	})
	//*/
	//*
	$("form").submit(function(e){
		e.preventDefault();
	})
	//*/
	
	$("#connect").click(connect);
	$("#disconnect").click(disconnect);
	$("#send").click(sendMessage);
});