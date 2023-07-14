# Hxan Develop Blog

## 프로젝트 시작 (2023.06.17)

**Client 기초 설정**

- `Home`, `Header` `Login` 컴포넌트 및 스타일시트 생성
- 라우터 생성 `<Home />`, `<Login />`
- HTML, CSS, JS, LOGO, mongoDB, Node SVG 추가

<br>

## 서버 생성 (2023.06.18)

**React와 상호작용 할 서버 설정**

- 서버 Babel 설정 (ES6)
- 4001번 포트로 서버 설정
- env 환경변수 설정
- 개발 환경 구성 (nodemon, morgan)
- mongoDB 연결
- create-react-app 을 통해 React 라이브 개발 서버 생성
- 서버에서 모든 경로에 접근할 시 Client의 Build 파일 (정적) 연동
- Footer 컴포넌트 생성
- Login 컴포넌트 스타일링 및 기본 동작 구현

<br>

![img](https://github.com/Hansan529/Blog/assets/115819770/cab229ff-4dde-4ce2-a09f-3959a5dbaabd)

<br>

## 회원가입, 로그인 컴포넌트 (23.06.20~21)

**클라이언트**

- HTML 타이틀 변경 (hxan &rarr; Hxan)
- `Home 컴포넌트`에 `Footer` 추가
- `Footer 컴포넌트`에 `Source Code` (깃허브) 이미지 `alt` 추가
- 전체 컴포넌트에 스타일링 추가 (`margin-top`, `padding`)
- `Join 라우터` 및 컴포넌트 생성
- 서버 요청하기 위해 axios 패키지 추가
- 회원가입(관리자 추가) 하기 위해 관리자 비밀번호 입력 추가

**서버**

- nodemon 설정 (자동 build)
- 포트 번호 4001 &rarr; 8000 수정
- 회원가입 데이터 전송, 중복된 아이디가 있을 경우 오류 출력
- CORS 설정 및 JSON 값으로 데이터 받도록 설정
- 관리자 모델 (DB) 추가
- Join 데이터베이스 중복 체크 후 관리자 모델에 추가하는 컨트롤러 설정

<br>

![img](https://github.com/Hansan529/Blog/assets/115819770/4d6c47fc-98f6-4277-89f9-e01521d91919)

<br>
