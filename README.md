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

## 로그인 클라이언트 - 서버 연동 및 상태 저장 (23.06.22~23)

**클라이언트**

- 로그인을 서버에 요청하고, 결과 값을 바탕으로 로그인 상태 값 지정
- Redux 활성화 (login)
- Redux Toolkit 으로 state 생성 (createStore &rarr; configureStore)
- 로그인 실패 시 에러 객체를 사용자에게 보여주도록 구현

**서버**

- 데이터베이스에서 해당 데이터와 일치하는지 체크하고 결과 반환

<br>

### 페이지 이동 및 확장자 수정 (23.06.25~26)

**클라이언트**

- `window.location.href` &rarr; `navigate`로 redux 상태값을 보존한 채로 페이지 이동하도록 수정
- js &rarr; jsx 확장자 변경
- 스타일시트 파일 경로 수정
- &lt;Upload&gt; 컴포넌트 라우터 설정
- `Login`: form 중앙 스타일링

**서버**

- 파일 업로드를 하기 위한 패키지 `multer` 추가
- 개발 환경 (동시 서버 오픈) moment 패키지 추가

<br>

## 프로젝트 데이터베이스 (23.06.27)

**클라이언트**

- 프로젝트 데이터베이스 로드 구현
- 관리자 추가 후 홈페이지로 페이지 이동

**서버**

- moment 제거

<br>

## 파일 업로드 (23.06.28)

**클라이언트**

- 상세 프로젝트 라우터 및 컴포넌트 설정
- 홈 루트에서 프로젝트 나열하도록 구현
- &lt;Upload&gt; 컴포넌트 구현 (프로젝트 추가)
- **서버**

- 프로젝트를 데이터베이스에 저장
- 업로드된 파일에 접근하기 위해 `static` 설정

![img](https://github.com/Hansan529/Blog/assets/115819770/f364f215-6739-4b5e-9a56-e271ef31ea76)

## 프로젝트 설정 [#14](https://github.com/Hansan529/Blog/pull/14) (23.06.28~29)

**클라이언트**

- 로그인 시, 레이아웃 변경
- 프로젝트 업로드 성공 시, 재렌더링
- 프로젝트 목록에서 가벼운 수정 기능 구현 (날짜, 제목, 개발자, 이미지, 언어)
- 프로젝트 수정에 기존 값을 유지하도록 값 설정
- 이미지를 변경하지 않았을 경우 기존 이미지를 사용하도록 설정
- 프로젝트 목록 Redux로 저장하도록 구현
- 상세 프로젝트의 수정 컴포넌트 라우터 및 컴포넌트 생성
- 로그인: 프로젝트 더보기(more), 수정, 삭제 버튼 구현

**서버**

- 프로젝트 모델 수정하는 함수 추가, 이미지를 변경했다면 기존 이미지 파일 제거
- 프로젝트에 저장될 **언어** 대문자로 저장되도록 설정
- 프로젝트 모델 제거, 이미지 삭제 구현
- 프로젝트 삭제 함수를 실행시킬 API 라우터 구현

<br>

## 아바타 이미지 [#15](https://github.com/Hansan529/Blog/pull/15) (23.06.29 ~ 07.04)

**클라이언트**

- 로그아웃시 Compoennts 이동에서 dispatch State 변경으로 수정
- 프로젝트에 날짜 정보 추가하고 이를 포함해 서버에 요청하도록 변경
- `Header 컴포넌트`에 logged props을 제거
- 소셜 로그인 (Github) 토큰 생성 및 관리자가 아닐 경우에 관리자 비밀번호 입력 후 추가하도록 구현
- 소셜 로그인 콜백 컴포넌트 생성, 대기 중에는 `Loading 컴포넌트`가 나타남
- 소셜 로그인 정보를 담아둘 State 생성 (info)

**서버**

- 프로젝트 모델에 날짜 정보 추가, 값이 없을 경우 기본 값인 현재 시각으로 지정
- 관리자 모델에 개발자 이미지 (아바타 이미지) 추가
- 소셜 로그인 콜백 라우터 설정
- Github에 토큰을 갖고 계정에 대한 정보 요청 및 클라이언트에 반환

![img](https://github.com/Hansan529/Blog/assets/115819770/e11a3e8a-ebd6-4d22-b219-1524388beda2)

<br>

## 레이아웃 [#16](https://github.com/Hansan529/Blog/pull/16) (23.07.05)

- `Loading 컴포넌트`에 `Header`, `Footer 컴포넌트` 추가
- 프로젝트 링크를 `이미지`에서 `_id 값`으로 수정
- `Upload 컴포넌트`에 **개발자 이미지** 추가 및 `로딩 컴포넌트` 구현
- 프로젝트 본문 구현
- 상세 프로젝트 컴포넌트 구현
- Footer 컴포넌트 높이 수정

**서버**

- 프로젝트 본문 구현
- 개발자 이미지를 불러오는 API 및 라우터 생성
- 특정 프로젝트를 불러오는 라우터 생성

<br>

## 프로젝트 본문 수정 및 관리자 이미지 할당 [#17](https://github.com/Hansan529/Blog/pull/17) (23.07.05 ~ 07)

- 상세 프로젝트에서 본문 및 관리자 이미지 출력
- 관리자 이미지 비동기 처리로 Redux State 설정
- Loading 컴포넌트 안에 Header, Footer 컴포넌트 제거
- 상세 프로젝트 페이지에서 수정하기 기능 구현, 그로 인해 별도의 `ProjectEdit 컴포넌트` 및 **라우터** 제거

<br>

## 언어 이미지 구현 CSS에서 REACT로 변경 [#18](https://github.com/Hansan529/Blog/pull/18) (23.07.07 ~ 09)

**클라이언트**

- 소셜 회원가입에 `username` 추가하도록 설정
- 프로그래밍 언어 이미지 CSS → ReactJS img 태그로 변경
- Admin 모델에 username 추가, 종속성을 가진 Join 컴포넌트도 업데이트
- 선언되고 사용되지 않은 코드 삭제
- `Loading 컴포넌트`에서 `Header`, `Footer 컴포넌트` 제거

**서버**

- 관리자 모델에 `username` 추가

<br>

## 이름 변경 및 프로젝트 상세 정보 추가 [#19](https://github.com/Hansan529/Blog/pull/19) (23.07.09)

- img &rarr; thumbnail
- select &rarr; developSelect
- body &rarr; description

<br>

## 메인 페이지 생성 [#20](https://github.com/Hansan529/Blog/pull/20) (23.07.09 ~ 10)

**클라이언트**

- 프로젝트 홈페이지로 이동하는 Link 추가
- 프로젝트 수정 후 프로젝트를 불러오지 않는 현상 수정
- `Header 컴포넌트`에서 해당 영역에 스크롤이 이동하도록 `Link 태그`에서 `a 태그`로 **변경**
- 프로젝트 수정 후 더보기 상태 제거
- &lt;Login&gt;, &lt;Header&gt;, &lt;DetailProject&gt; 컴포넌트 스타일링
- 파트를 나타내는 empty 객체 생성
- 프로젝트 업로드 버튼을 &lt;Header&gt; 컴포넌트로 이동
- 메인 배너로 나올 &lt;Page&gt; 컴포넌트 구현

**서버**

- 프로젝트 업로드 및 수정에서 Language 에 대한 정보를 Client가 아닌, 서버에서 변환하도록 수정
- 프로젝트 목록을 날짜를 기준으로 내림차순으로 전송

![img](https://github.com/Hansan529/Blog/assets/115819770/6b8448b5-a162-46a3-b8c5-038897eb3500)
![img](https://github.com/Hansan529/Blog/assets/115819770/74a1d9e3-5299-4c93-b160-fba6da4decb3)

<br>

## 상세 프로젝트 페이지에서 새로고침 오류 수정 [#21](https://github.com/Hansan529/Blog/pull/21) (23.07.10)

- `DetailProject 컴포넌트`에서 중복으로 개발자 이미지를 요청해 해당 요소 삭제
- `상세 프로젝트 컴포넌트`에서 새로고침 할 경우 개발자 이미지 로드가 될 때 까지 로딩 컴포넌트가 보이도록 수정

<br>

## Project 구조 변경 및 컴포넌트 높이 지정 [#23](https://github.com/Hansan529/Blog/pull/23) (23.07.10 ~ 13)

- 소셜 로그인 이미지 추가
- SCSS mixin 추가
- 컴포넌트 최소 높이 지정
- `div.center` &rarr; `article` 변경
- 컴포넌트 중앙 정렬
