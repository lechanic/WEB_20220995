function login()
{
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check=document.querySelector("#idSaveCheck");
	if(check.checked == true) 
	{ // 아이디 체크 o
		alert("쿠키를 저장합니다.");
		setCookie("id", id.value, 1); // 1일 저장
		alert("쿠키 값 :" + id.value);
	} 
    else 
	{ // 아이디 체크 x
		setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }
    if(id.value.length === 0 || password.value.length === 0)
	{
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }
	else
	{
		session_set();//세션 생성
		login_check(id.value, password.value);
    }
}
function init()
{ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    if(get_id) 
	{ 
		id.value = get_id; 
		check.checked = true; 
    }
	session_check();//세션 유무 검사
}
function login_check(idcheck, passwordcheck)
{
	let form = document.querySelector("#form_main");
	form.action = "../index_login.html";
	form.method = "get";//비밀번호 및 이메일 주소 드러냄
	//form.method = "post";//비밀번호 및 이메일 주소 숨김
	if((/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i).test(idcheck))
	{
		if((/^[A-Za-z0-9]{6,12}$/).test(passwordcheck))
		{
			form.submit();
		}
		else
		{
			alert("빠,빡대가리야! 비밀번호 형식도 까,까먹었냐?\n(--숫자와 문자 포함 형태의 6~12자리 이내--)");
		}
	}
	else
	{
		alert("저,적어도 아,아이디 형식은 알고 이,있으라고. \n너, 너의 이메일 말이야.");
	}
}
function logout()
{
	alert("로그, 삼진 아웃");
	session_del(); //세션 삭제
	location.href="../index.html";
}
function get_id()
{
	if(true)
	{
        decrypt_text();
    }
    else
	{
		var getParameters = function(paramName)
		{ // 변수 = 함수(이름)
			var returnValue; // 리턴값을 위한 변수 선언
			var url = location.href; // 현재 접속 중인 주소 정보 저장
			var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
			for(var i = 0; i < parameters.length; i++) 
			{ 
				var varName = parameters[i].split('=')[0];
				if (varName.toUpperCase() == paramName.toUpperCase()) 
				{
					returnValue = parameters[i].split('=')[1];
					return decodeURIComponent(returnValue);
					// 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
				}
			} // 2중 for문 끝
		}; // 함수 끝
		alert('환영합니다,'+getParameters('id') + '님.'); // 메시지 창 출력
	}
	setTimeout("logout()",300000);//5분 후 로그아웃 함수 불러옴
}
function addJavascript(jsname) 
{ // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수