
const formElement = document.querySelector(".js-todo");
const textInput = document.querySelector(".todos");
const todoListElement = document.querySelector(".js-todoList");
let todoList = []; //globally하게 선언된 array타입

const currentDate = new Date(),
    month = currentDate.getMonth(),
    day = currentDate.getDate(),
    hours = currentDate.getHours();


//text input 데이터를 받아서 todo list표출해주는 메소드에 넘기기. 새 데이터를 받을때마다 기존 데이터는 지워주기.

function onFormSubmit() {

    const finalTask = textInput.value;
    const savedTaskByDay = `${month}월 ${day}일 ${hours < 10 ? `0${hours}` : hours}시 - ${finalTask}`;

    const todoText = savedTaskByDay;
    console.log(todoText);
    renderTodo(todoText);
    textInput.value = "";
}

// todo class 만들기, 추가/수정/삭제 메소드 추가하기

class todo {
    constructor(text, id) {
        this.text = text;
        this.id = id;
    }

    get text() {
        return this.text;
    }

    get id() {
        return this.id;
    }

    text(txt) {
        this.text = txt;
    }

    id(id) {
        this.id = id;
    }

    addTodo(text, id) {

        const todoObj = {
            text: text,
            id: id
        }

        todoList.push(todoObj);
    }

    deleteTodo(id) {

        const listElement = document.querySelector(`[data-todoId='${id}']`);
        //이 경우 delete하려는 엘리먼트의 id만 조회하고싶으므로 = 받은id로 써줌.

        listElement.parentElement.removeChild(listElement);
        //엘리먼트 삭제.

        /* delete하는 시점에서 지금 인자로 받은 id가 아닌 건 모두 save */
        todoList = todoList.filter(todoObject => todoObject.id !== id);
        saveToDos();

    }


    modifyTodo(id) {

        //id에 해당하는 todo에 접근
        const listElement = document.querySelector(`[data-todoId='${id}']`);

        //form태그 id엘리먼트 밑에 생성
        const form = document.createElement("form");
        form.setAttribute("class", "new-todo");
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "formInput")
        input.setAttribute("placeholder", "What is your todo?");
        input.setAttribute("class", "new-todos");
        const input2 = document.createElement("input");
        input2.setAttribute("type", "submit");
        input2.setAttribute("value", "Submit");
        input2.setAttribute("onClick", "modifyTodoHandler(this.form); return false;");

        form.appendChild(input);
        form.appendChild(input2);
        listElement.appendChild(form);
        listElement.classList.add("modified-list");

    }

}


//todo list 표출 


//받은 input을 해당 id 오브젝트로 불러오기

function modifyTodoHandler(form) {

    const listElement = document.querySelector(".modified-list");
    const id = listElement.getAttribute("data-todoId");

    const todoText = form.formInput.value;

    const modifiedTodo = todoList.filter(todoObj => todoObj.id == id);

    //현재날짜

    modifiedTodo.forEach(newtodos => newtodos.text = `${month}월 ${day}일 ${hours < 10 ? `0${hours}` : hours}시 - ${todoText}`);
    console.log(modifiedTodo);
    saveToDos();


    //전에 있던 HTML 엘리먼트 replace
    const oldSpan = listElement.firstChild;
    const newSpan = document.createElement("span");
    newSpan.innerText = todoText;
    oldSpan.replaceWith(newSpan);

    const formTag = listElement[1];
    formTag.parentNode.removeChild('formTag');

}



function renderTodo(todoText) {
    console.log(todoText);
    if (!todoText) {
        return;
    }

    let todoObj = new todo(todoText, todoList.length + 1);

    /* HTML 엘리먼트 만들기 */

    //li에 span으로 텍스트써져있는 엘리먼트 만들기.
    const listElement = document.createElement("li");
    const newId = todoList.length + 1;

    //custom attribute 추가하기 + 값 넣어주기.
    listElement.setAttribute("data-todoId", newId);
    listElement.classList.add("lists");

    //delete 버튼 만들어주고 클릭시 delete이벤트 실행 - 해당 이벤트만 지워질 수 있게 newId도 전달함.
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", () => { todoObj.deleteTodo(newId) });

    const span = document.createElement("span");
    span.innerText = todoText;


    //modify btn

    const modifyButton = document.createElement("button");
    modifyButton.innerText = "modify";
    modifyButton.addEventListener("click", () => { todoObj.modifyTodo(newId) });


    //todo자리 표시해놓은 곳에 방금만든 list아이템(span을 자손으로 가지는) 추가하기
    todoListElement.appendChild(listElement);
    listElement.appendChild(span);

    //list아이템 각각에 button엘리먼트도 자손으로 추가해준다
    listElement.appendChild(deleteButton);

    listElement.appendChild(modifyButton);
    //todoListElement.appendChild(listElement);

    //전역 array에 방금 추가된 todoObj 넣어주기.
    todoList.push(todoObj);
    //saveToDo 실행시켜서 todo들 LS에 저장시키기.
    saveToDos();

    if (todoList.length === 5) {

        const deleteAllBtn = document.createElement('button');
        todoListElement.appendChild(deleteAllBtn);
        deleteAllBtn.innerText = "delete all";
        deleteAllBtn.classList.add("delete-all");
        deleteAllBtn.addEventListener("click", () => { deleteAllFunc() });

    } else if (todoList.length >= 5 && todoList.length < 10) {

        const deleteAllBtn = document.querySelector(".delete-all");
        deleteAllBtn.parentNode.removeChild(deleteAllBtn);

    } else if (todoList.length >= 10) {
        alert('todo가 10개 이상이면 출력할 수 없습니다');

    } else {
        return;
    }

}



function deleteAllFunc() {

    const allList = document.querySelectorAll('.lists');

    allList.forEach(items => { items.parentNode.removeChild(items) });
    todoList = [];
    saveToDos();

    const allBtns = document.querySelector('.delete-all');
    allBtns.parentNode.removeChild(allBtns);

}






//todo list를 save
const LOCALSTORAGE_KEY = "todoList";

function saveToDos() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todoList)); //이건 TODO_LS의 오브젝트를 string화 시키는 메소드
}

//submission 시점 관리하기

function onDomReady() {
    const storedTodos = localStorage.getItem(LOCALSTORAGE_KEY);

    if (storedTodos) {

        const parsedToDos = JSON.parse(storedTodos);

        for (i = 0; i < parsedToDos.length; i++) {

            console.log(parsedToDos[i]);
            renderTodo(parsedToDos[i].text);

        }

        /* 
        parsedToDos.forEach(todo => { //local storage에 저장되어있는 storedTodos들은 parse해줘야 string data로 바뀐다. 
            renderTodo(todo.text);
        });
        */
    } else {
        onFormSubmit();
    }


}

//가장 처음 호출 시 save한 투두 있는지 없는지 체크하고 없으면 로컬 storage에 받아놓은것 추가 
function init() {
    /*

    onLoad:
    onLoad window event가 발생 시 코드를 사용한다 - 전체 페이지가 로드 되었을때의 시점
    
    onDomReady:
    onDomReady window event가 발생 시 코드를 사용한다 - DOM이 모두 로드되었을때의 시점

    즉, onDomReady는 DOM 엘리먼트가 웹에서 모두 파싱되었을때, onLoad는 전체 페이지가 로드되었을때이므로
    onDomReady가 onLoad 보다 더 빠르게 사용된다. 

    */
    onDomReady();
    formElement.addEventListener("submit", onFormSubmit);
}


init();


