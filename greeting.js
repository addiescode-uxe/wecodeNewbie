/*
DOM manipulation 공식 문서: https://developer.mozilla.org/en-US/docs/Web/API/Document

document.querySelector("엘리먼트이름")
document.querySelector(".클래스이름")
document.querySelector("#아이디이름")

하면 해당 엘리먼트 레퍼런스 데이터가 조회된다.

예시) 

input = document.querySelector(".names");
input.value = name이라는 클래스이름을 가진 엘리먼트(form안의 input속성을 가지고 name이라는 클래스이름을 가진 엘리먼트의 value)


*/

const form = document.querySelector(".js-form"),
    input = document.querySelector('.names'),
    greeting = document.querySelector('.js-greeting'),
    nameQ = document.querySelector('.name-question');

const USER_NAME = "currentUserName", CLASS_ADD = "showing";

// askForName : local storage에 이름이 'USER_NAME' 데이터가 조회되지않을때 실행

function askForName() {
    form.classList.add(CLASS_ADD);
    form.addEventListener("submit", handleSubmission);
}


//handleSubmission : form태그 안에서 submit이벤트가 일어났을때 실행

function handleSubmission(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

// paintGreeting : Hello, 데이터 출력

function paintGreeting(inputValue) {
    /* form 엘리먼트를 삭제 */
    //form.classList.remove(CLASS_ADD);
    form.parentNode.removeChild(form);
    nameQ.parentNode.removeChild(nameQ);

    /* greeting 엘리먼트를 추가 */
    greeting.classList.add(CLASS_ADD);
    greeting.innerText = `Hello, ${inputValue}`;
    console.log(greeting.innerText);
}

// saveName : local storage에 데이터 저장 

function saveName(inputValue) {
    /*인자로 받은 inputValue를 localStorage에 저장 */
    localStorage.setItem(USER_NAME, inputValue);
}

//loadName - name을 load 시킨다. init에서 호출했으므로 제일 처음으로 실행된다. 

function loadName() {
    /* local storage에 USER_NAME 데이터 조회 */
    const currentUser = localStorage.getItem(USER_NAME);


    if (currentUser == null) {
        askForName();// 없을 경우 form 엘리먼트를 보이게 하고 submit 이벤트 핸들러 넣어줌. 
    } else {
        form.classList.remove(CLASS_ADD);
        paintGreeting(currentUser); //있을 경우 form 엘리먼트를 제거하고 greeting엘리먼트를 보여줌.
    }

}

/*

init 메소드의 이름은 무엇으로 하든 상관없다.
바로 밑에 해당 메소드를 호출시켜주기만 하면 제일 첫번째로 실행된다. 

*/

function init() {
    loadName();
}

init();