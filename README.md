# 🍀 Todo List Application with Vanilla Javascript

## 한줄 소개

바닐라 자바스크립트를 사용하여 총 2가지의 방법으로 프로그래밍을 하였습니다.
1. 객체지향 프로그래밍(OOP 폴더)
2. 함수형 프로그래밍(functional 폴더)

## 어플리케이션 구현 내용

![스크린샷](images/image1.png)
![스크린샷2](images/image2.png)
![스크린샷2](images/image3.png)

- 기본적인 List `CRUD` 작업하였습니다.
- 작업 `Complete` 여부에 따라 동적인 UI를 구성하였습니다.
- 리스트에서 여러 `카테고리`를 추가하였습니다.
  - 카테고리별 리스트 갯수를 추가로 표현하였습니다.
- 사용성 개선 고려
  - 컨텐츠가 없을 시 `FallBack` 문구 추가하였습니다.
  - 리스트 추가 및 오류에 대해서 `Modal`을 통해서 사용자에게 응답메시지를 보냅니다.
- 기본 데이터 저장은 브라우저의 `Local Storage`를 이용하였습니다.

## 코드적 구현 내용

### ⚡️ 객체지향 프로그래밍 구현 내용
- 최대한 기능별로 코드를 모듈화 시켜서 파일로 분리하였습니다.
- app.js파일에서 모듈화시킨 파일들을 모아서 전체 어플리케이션을 관리하였습니다.

![image](https://github.com/study-from-goorm/Project_TodoList_Develsopher/assets/78126381/abbed7fc-1391-48d1-82a3-7c7dac225392)

- `Todo.js` : **Todo Item**을 만들어내는 클래스 입니다.
- `TodoState.js`
  - **Todo Item**의 상태값 (소속카테고리, 타이틀, 완료여부)을 관리하고 비즈니스 로직역할을 합니다.
  - 참조타입인 state를 직접수정하지 않으며 데이터 불변성 원칙을 유지하였습니다.
- `Store>index.js` : **Local Storage**에 get, set 역할을 합니다.
- `dom.js`: dom요소를 쉽게 가져오기 위한 utility 역할을 합니다.
- `view > TodoView.js`: DOM요소를 조작하는 역할을 합니다.
- `TodoEvent.js`: 이벤트리스너 역할을 합니다.

### ✨ 함수형 프로그래밍 구현 내용
이미 만들어진 객체지향 코드를 참고하여 함수형으로 변경하였습니다.
각각의 함수는 부수효과가 없는 순수함수가 될 수 있도록 구성하였습니다.
특히, 참조타입인 state값을 직접 수정되지 않도록 데이터 불변성 원칙을 지켰습니다.

## 배포 주소
[배포사이트](https://zesty-kleicha-5f3e9f.netlify.app/)
## 시연 영상


https://github.com/Develsopher/vanillaJS_ToDoList/assets/78126381/1da4f577-5b7f-4f5d-ab6f-b77c97edc87d

