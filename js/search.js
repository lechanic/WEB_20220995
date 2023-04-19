document.getElementById("search_btn").addEventListener('click', search_message);
let F1="해병문학";
let F2="빡대가리";
let F3="기둥속";

var search_array = []; // 빈 배열 – 전역 변수

function search_message()
{
	let search_str = document.querySelector("#search_txt"); // 변수에 저장
	if(search_str.value.length === 0){ // 문자 길이, 엄격한 비교
		alert("이 빠,빽대가리야! 거,검색어가, 비,비었잖아!");
    }
	else{
		if(search_str.value===F1||search_str.value===F2||search_str.value===F3)
			{
				alert("너,너희들, 비, 비속어는 조심하라고.");
			}
		else
		{
			alert("거,검색을 수,수행합니다.");
			search_array.push(search_str.value); // 배열에 검색어 추가
			if(search_array.length>10)
				{
					search_array.shift();
				}
			let text = document.getElementById("search_message").innerHTML = search_array.toString(); // 값 변환
			document.querySelector("#form_main").submit();
		}
	}
}
