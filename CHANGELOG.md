# Hxan Develop Blog - CHANGELOG

## 데이터베이스 연동 (2023.08.06 ~ 2023.08.07)

- mongoDB 연결
- middleware 설정
- multer, bcrpyt 패키지 추가
- 로그인 API 완성
- 관리자 추가 구현
- Project, Info 모델 추가

## 마이그레이션 시작 (2023.08.05)

- React/Node &rarr; **NEXT JS**
- 로그인 페이지 마이그레이션

<img width="382" alt="#" src="https://github.com/Hansan529/Blog/assets/115819770/b868584e-30b5-4280-83e2-96fa36ef0eeb">

- 서버 컴포넌트, 클라이언트 컴포넌트 분리
- ~~MySQL 추가~~

# 릴리즈 1.1.0
## 반응형 디자인 스타일시트 구현 [#35](https://github.com/Hansan529/Blog/pull/35) (2023.07.31)

### 클라이언트

- 프로젝트 컴포넌트 마크업 수정 및 사용 언어를 출력하지 않도록 변경함, 기존 부분은 이미지가 차지하도록 수정
- 반응형 스타일시트 적용 (모바일: ~743px)
- view 폴더 미참조로 인해 삭제
- 프로젝트 목록을 grid 3개에서 4개로 변경
- 반응형은 단순 해상도만이 아닌 `userAgent`도 포함해 적용됨. 마크업이 생기거나 사라지는 부분은 `userAgent` 이며, 단순 스타일링의 경우 `media screen` 사용
- 추후에 각 페이지마다 더보기 버튼에 내용을 다르게 하기 위해 `header 컴포넌트`에 로고 좌측 빈 공간을 생성함. (ex: 기존 nav바, 상세페이지의 경우 projects 목록)

### 서버

- 프로젝트 단일 `return` 에서, 프로젝트, 정보를 `return` 하도록 수정

## 정보 모음 컴포넌트 구현 [#34](https://github.com/Hansan529/Blog/pull/34) (2023.07.18 ~ 2023.07.24)

### 클라이언트

- 프로젝트 정렬에 필요한 업데이트가 이루어지지 않는 점 수정
- `Info 컴포넌트` 구현
- Info 정보 게시글을 업로드할 수 있도록 구현
- state 명 변경 project -> DB
- `Header 컴포넌트`의 **정보 모음** 바로가기 버튼 활성화
- 정보를 받아와 `상태 저장`하도록 설정

### 서버

- Info 라우터, 생성 함수 설정
- Info 모델 오타 수정

## Join 컴포넌트의 article 태그 누락 수정 및 DetailProject 컴포넌트 모듈화 수정 [#32](https://github.com/Hansan529/Blog/pull/32) (2023.07.18)

- `<Join />` 컴포넌트 `article` 누락된 사항 수정
- `<DetailProject />` 컴포넌트에서 `<Upload />` 컴포넌트의 module.css를 참조하는 사항을 제거함
- `DetailProject.module.css` 에서 참조하도록 수정

## Readme 수정 및 배포 포트 통합 [#31](https://github.com/Hansan529/Blog/pull/31) (2023.07.17)

- `README` 내용이 `CHANGELOG` 으로 변경
- 업데이트 내역을 내림차순으로 정렬하도록 수정

### 클라이언트

- 클라이언트에서는 불필요한 패키지인 `express-session`, `mongoose` 및 현재는 미사용중인 `redux-saga` 삭제
- ~~개발 서버 포트를 8000 &rarr; 5000 수정~~
- ~~AirPlay 수신 모드가 5000 포트를 사용중에 있어 5000 &rarr; 6000 포트 수정~~
- Chrome 브라우저에서 보안상 접근이 불가능한 포트라 6000 &rarr; 6001 수정

### 서버

- 정적 파일 렌더링 (Client/build/index.html)
- 배포 포트를 8001 &rarr; 8000 수정

## SourceCode &rarr; URL 변경 및 REST API 규칙화 [#28](https://github.com/Hansan529/Blog/pull/30) (2023.07.17)

- CSS 모듈 파일 업로드하기로 변경 (Local, SSH 상의 pull 단계에서 누락되는 일 발생)
- `<DetailProject />` 컴포넌트에서 수정 폼의 `sourceCode` 제거, 기존의 소스 코드는 url로 대체
- 상세 프로젝트에서 소스코드가 URL로 이동함에 따라서 해당 위치를 미리보기 이미지 위치로 수정
- 홈 컴포넌트 프로젝트 수정 시 이미지 크기 500x200 지정
- 이전 페이지 이동에서 홈 컴포넌트 페이지로 이동으로 변경 naviagte(-2) → navigate('/')
- REST API 규칙에 맞게 axios 요청 수정
- 중복 호출 코드 제거

## 1차 배포 (릴리즈 1.0.0) [#28](https://github.com/Hansan529/Blog/pull/28) (2023.07.14)

### 클라이언트

- DetailProject 오류 수정
- &lt;Upload&gt; 컴포넌트에서 &lt;Loading&gt; 컴포넌트에도 Header, Footer 컴포넌트가 적용되도록 수정
- 상세 컴포넌트에서 이전 페이지로 이동하는 버튼 고정화
- 포트 수정 3002 &rarr; 8000
- 이미지 경로 소문자로 변경

### 서버

- 포트 수정 8000 &rarr; 8001

## 홈페이지 소개, 프로젝트 바로가기 버튼 구현 [#24](https://github.com/Hansan529/Blog/pull/24) (2023.07.14)

- Home 컴포넌트에서 해당 Dom을 저장할 State 생성, Homepage 컴포넌트에 setState 를 Props으로 전달
- 해당 Props을 받아 컴포넌트에서 useRef로 변경시킨 뒤 부모 컴포넌트로 전달
- Home 컴포넌트에서 각 Ref가 필요한 컴포넌트에게 Props 전달
- 해당 컴포넌트에서 scrollIntoView 를 사용해 해당 객체 위치로 스크롤 이동

![img](https://github.com/Hansan529/Blog/assets/115819770/43197844-a56e-4790-9c53-b23564ba1a13)

## Project 구조 변경 및 컴포넌트 높이 지정 [#23](https://github.com/Hansan529/Blog/pull/23) (2023.07.10 ~ 2023.07.13)

- 소셜 로그인 이미지 추가
- SCSS mixin 추가
- 컴포넌트 최소 높이 지정
- `div.center` &rarr; `article` 변경
- 컴포넌트 중앙 정렬

## 상세 프로젝트 페이지에서 새로고침 오류 수정 [#21](https://github.com/Hansan529/Blog/pull/21) (2023.07.10)

- `DetailProject 컴포넌트`에서 중복으로 개발자 이미지를 요청해 해당 요소 삭제
- `상세 프로젝트 컴포넌트`에서 새로고침 할 경우 개발자 이미지 로드가 될 때 까지 로딩 컴포넌트가 보이도록 수정

## 메인 페이지 생성 [#20](https://github.com/Hansan529/Blog/pull/20) (2023.07.09 ~ 2023.07.10)

### 클라이언트

- 프로젝트 홈페이지로 이동하는 Link 추가
- 프로젝트 수정 후 프로젝트를 불러오지 않는 현상 수정
- `Header 컴포넌트`에서 해당 영역에 스크롤이 이동하도록 `Link 태그`에서 `a 태그`로 **변경**
- 프로젝트 수정 후 더보기 상태 제거
- &lt;Login&gt;, &lt;Header&gt;, &lt;DetailProject&gt; 컴포넌트 스타일링
- 파트를 나타내는 empty 객체 생성
- 프로젝트 업로드 버튼을 &lt;Header&gt; 컴포넌트로 이동
- 메인 배너로 나올 &lt;Page&gt; 컴포넌트 구현

### 서버

- 프로젝트 업로드 및 수정에서 Language 에 대한 정보를 Client가 아닌, 서버에서 변환하도록 수정
- 프로젝트 목록을 날짜를 기준으로 내림차순으로 전송

![img](https://github.com/Hansan529/Blog/assets/115819770/6b8448b5-a162-46a3-b8c5-038897eb3500)
![img](https://github.com/Hansan529/Blog/assets/115819770/74a1d9e3-5299-4c93-b160-fba6da4decb3)

## 이름 변경 및 프로젝트 상세 정보 추가 [#19](https://github.com/Hansan529/Blog/pull/19) (2023.07.09)

- img &rarr; thumbnail
- select &rarr; developSelect
- body &rarr; description

## 언어 이미지 구현 CSS에서 REACT로 변경 [#18](https://github.com/Hansan529/Blog/pull/18) (2023.07.07 ~ 2023.07.09)

### 클라이언트

- 소셜 회원가입에 `username` 추가하도록 설정
- 프로그래밍 언어 이미지 CSS → ReactJS img 태그로 변경
- Admin 모델에 username 추가, 종속성을 가진 Join 컴포넌트도 업데이트
- 선언되고 사용되지 않은 코드 삭제
- `Loading 컴포넌트`에서 `Header`, `Footer 컴포넌트` 제거

### 서버

- 관리자 모델에 `username` 추가

## 프로젝트 본문 수정 및 관리자 이미지 할당 [#17](https://github.com/Hansan529/Blog/pull/17) (2023.07.05 ~ 2023.07.07)

- 상세 프로젝트에서 본문 및 관리자 이미지 출력
- 관리자 이미지 비동기 처리로 Redux State 설정
- Loading 컴포넌트 안에 Header, Footer 컴포넌트 제거
- 상세 프로젝트 페이지에서 수정하기 기능 구현, 그로 인해 별도의 `ProjectEdit 컴포넌트` 및 **라우터** 제거

## 레이아웃 [#16](https://github.com/Hansan529/Blog/pull/16) (2023.07.05)

### 클라이언트

- `Loading 컴포넌트`에 `Header`, `Footer 컴포넌트` 추가
- 프로젝트 링크를 `이미지`에서 `_id 값`으로 수정
- `Upload 컴포넌트`에 **개발자 이미지** 추가 및 `로딩 컴포넌트` 구현
- 프로젝트 본문 구현
- 상세 프로젝트 컴포넌트 구현
- Footer 컴포넌트 높이 수정

### 서버

- 프로젝트 본문 구현
- 개발자 이미지를 불러오는 API 및 라우터 생성
- 특정 프로젝트를 불러오는 라우터 생성

## 아바타 이미지 [#15](https://github.com/Hansan529/Blog/pull/15) (2023.06.29 ~ 2023.07.04)

### 클라이언트

- 로그아웃시 Compoennts 이동에서 dispatch State 변경으로 수정
- 프로젝트에 날짜 정보 추가하고 이를 포함해 서버에 요청하도록 변경
- `Header 컴포넌트`에 logged props을 제거
- 소셜 로그인 (Github) 토큰 생성 및 관리자가 아닐 경우에 관리자 비밀번호 입력 후 추가하도록 구현
- 소셜 로그인 콜백 컴포넌트 생성, 대기 중에는 `Loading 컴포넌트`가 나타남
- 소셜 로그인 정보를 담아둘 State 생성 (info)

### 서버

- 프로젝트 모델에 날짜 정보 추가, 값이 없을 경우 기본 값인 현재 시각으로 지정
- 관리자 모델에 개발자 이미지 (아바타 이미지) 추가
- 소셜 로그인 콜백 라우터 설정
- Github에 토큰을 갖고 계정에 대한 정보 요청 및 클라이언트에 반환

![img](https://github.com/Hansan529/Blog/assets/115819770/e11a3e8a-ebd6-4d22-b219-1524388beda2)

## 프로젝트 설정 [#14](https://github.com/Hansan529/Blog/pull/14) (2023.06.28 ~ 2023.06.29)

### 클라이언트

- 로그인 시, 레이아웃 변경
- 프로젝트 업로드 성공 시, 재렌더링
- 프로젝트 목록에서 가벼운 수정 기능 구현 (날짜, 제목, 개발자, 이미지, 언어)
- 프로젝트 수정에 기존 값을 유지하도록 값 설정
- 이미지를 변경하지 않았을 경우 기존 이미지를 사용하도록 설정
- 프로젝트 목록 Redux로 저장하도록 구현
- 상세 프로젝트의 수정 컴포넌트 라우터 및 컴포넌트 생성
- 로그인: 프로젝트 더보기(more), 수정, 삭제 버튼 구현

### 서버

- 프로젝트 모델 수정하는 함수 추가, 이미지를 변경했다면 기존 이미지 파일 제거
- 프로젝트에 저장될 **언어** 대문자로 저장되도록 설정
- 프로젝트 모델 제거, 이미지 삭제 구현
- 프로젝트 삭제 함수를 실행시킬 API 라우터 구현

## 파일 업로드 (2023.06.28)

### 클라이언트

- 상세 프로젝트 라우터 및 컴포넌트 설정
- 홈 루트에서 프로젝트 나열하도록 구현
- &lt;Upload&gt; 컴포넌트 구현 (프로젝트 추가)

### - 서버

- 프로젝트를 데이터베이스에 저장
- 업로드된 파일에 접근하기 위해 `static` 설정

![img](https://github.com/Hansan529/Blog/assets/115819770/f364f215-6739-4b5e-9a56-e271ef31ea76)

## 프로젝트 데이터베이스 (2023.06.27)

### 클라이언트

- 프로젝트 데이터베이스 로드 구현
- 관리자 추가 후 홈페이지로 페이지 이동

### 서버

- moment 제거

## 페이지 이동 및 확장자 수정 (2023.06.25 ~ 2023.06.26)

### 클라이언트

- `window.location.href` &rarr; `navigate`로 redux 상태값을 보존한 채로 페이지 이동하도록 수정
- js &rarr; jsx 확장자 변경
- 스타일시트 파일 경로 수정
- &lt;Upload&gt; 컴포넌트 라우터 설정
- `Login`: form 중앙 스타일링

### 서버

- 파일 업로드를 하기 위한 패키지 `multer` 추가
- 개발 환경 (동시 서버 오픈) moment 패키지 추가

## 로그인 클라이언트 - 서버 연동 및 상태 저장 (2023.06.22 ~ 2023.06.23)

### 클라이언트

- 로그인을 서버에 요청하고, 결과 값을 바탕으로 로그인 상태 값 지정
- Redux 활성화 (login)
- Redux Toolkit 으로 state 생성 (createStore &rarr; configureStore)
- 로그인 실패 시 에러 객체를 사용자에게 보여주도록 구현

### 서버

- 데이터베이스에서 해당 데이터와 일치하는지 체크하고 결과 반환

## 회원가입, 로그인 컴포넌트 (2023.06.20 ~ 2023.06.21)

### 클라이언트

- HTML 타이틀 변경 (hxan &rarr; Hxan)
- `Home 컴포넌트`에 `Footer` 추가
- `Footer 컴포넌트`에 `Source Code` (깃허브) 이미지 `alt` 추가
- 전체 컴포넌트에 스타일링 추가 (`margin-top`, `padding`)
- `Join 라우터` 및 컴포넌트 생성
- 서버 요청하기 위해 axios 패키지 추가
- 회원가입(관리자 추가) 하기 위해 관리자 비밀번호 입력 추가

### 서버

- nodemon 설정 (자동 build)
- 포트 번호 4001 &rarr; 8000 수정
- 회원가입 데이터 전송, 중복된 아이디가 있을 경우 오류 출력
- CORS 설정 및 JSON 값으로 데이터 받도록 설정
- 관리자 모델 (DB) 추가
- Join 데이터베이스 중복 체크 후 관리자 모델에 추가하는 컨트롤러 설정

![img](https://github.com/Hansan529/Blog/assets/115819770/4d6c47fc-98f6-4277-89f9-e01521d91919)

## React와 상호작용 할 서버 설정 (2023.06.18)

- 서버 Babel 설정 (ES6)
- 4001번 포트로 서버 설정
- env 환경변수 설정
- 개발 환경 구성 (nodemon, morgan)
- mongoDB 연결
- create-react-app 을 통해 React 라이브 개발 서버 생성
- 서버에서 모든 경로에 접근할 시 Client의 Build 파일 (정적) 연동
- Footer 컴포넌트 생성
- Login 컴포넌트 스타일링 및 기본 동작 구현

![img](https://github.com/Hansan529/Blog/assets/115819770/cab229ff-4dde-4ce2-a09f-3959a5dbaabd)

## 프론트엔드 기초 설정 (2023.06.17)

- `Home`, `Header` `Login` 컴포넌트 및 스타일시트 생성
- 라우터 생성 `<Home />`, `<Login />`
- HTML, CSS, JS, LOGO, mongoDB, Node SVG 추가
