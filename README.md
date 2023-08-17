# Hxan Develop Blog

<div align="center">
<img src="https://github.com/Hansan529/Blog/assets/115819770/662224d3-0969-4718-bf1d-d673a71fe2ef" width="300" />
</div>

# **프로젝트 정보**

> 1인 개발  
> 개발 기간: **2023.06.17 ~ ing**

## 홈페이지 배포 주소

> 프론트 서버: <https://hxan.net>  

## 프로젝트 소개

제작에 참여한 홈페이지들의 소스코드 및 페이지를 목록으로 **나열해 볼 수 있도록** 하기 위해 제작되었습니다.

웹 개발을 진행하면서 하나씩 추가되는 프로젝트를 보면서 동기를 얻을 수도 있고  
개발에 도움이 되는 정보나 간단한 예시들을 볼 수 있는 페이지를 만들려고 합니다.

한산: @Hansan529 / 웹퍼블리셔 및 프론트엔드 스터디

## 프로젝트 목표

1. 반응형 웹 디자인으로 어느 플랫폼에서도 정보를 개발자 취지대로 정확하게 전달하고자 합니다.
2. 추후에 Comment 기능을 구현해 사용자와 정보 교환을 할 수 있도록 하고자 합니다.
3. 홈페이지 내 포스팅을 외부로 공유하는 별도의 페이지를 제작하고자 합니다.

<br>

## 기술 스택

### 작업 환경

![Visual Studio Code](https://img.shields.io/badge/visual%20studio%20code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Github](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)

### 개발 도구

![Yarn](https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![Tailwindcss](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### 언어

![Mdx](https://img.shields.io/badge/mdx-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)
![Javascript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)
![Typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![NextJS](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)

### 배포

![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

<br>

## [업데이트 내역 (CHANGELOG)](https://github.com/Hansan529/Blog/blob/main/CHANGELOG.md)

---

### [v2.0.1](https://github.com/Hansan529/Blog/tree/v2.0.1)

포스팅 및 포트폴리오 페이지에서 존재하지 않는 페이지로 이동할 경우 NotFound 컴포넌트로 이동되도록 수정하고 파비콘 및 아이콘 추가했습니다.

### [v2.0.0 Next.js + Tailwindcss](https://github.com/Hansan529/Blog/tree/v2.0.0)

포스팅 내용을 데이터베이스 안에 모두 저장하다보니 하고자 하는 취지에 맞지 않는 것 같아서 데이터베이스를 제거하고 이를 `mdx` 파일로 옮기기로 했습니다.  
데이터베이스를 제거함에 따라서 로그인 기능을 통해 Create 하는 기능을 없애면서 상태 관리 도구인 `Redux` 및 API를 사용하지 않게 됐습니다.  

기존에 스타일 시트를 작성하면서 네이밍에 시간을 사용하고 있었는데, Tailwindcss 를 도입하고서 시간 절약이 많이 되었습니다.  

### [v1.1.0 Responsive Web](https://github.com/Hansan529/Blog/tree/v1.1.0)

데스크탑 디자인만을 진행해서, 다른 플랫폼에서 확인 했을 경우 레이아웃이 변하지 않아서 홈페이지 뷰어가 힘들어서  
각 `module.css` 파일에 추가적으로 반응형 작업을 했습니다.

### [v1.0.0 React.js + Node.js + mongoDB](https://github.com/Hansan529/Blog/tree/releases)

제가 제작에 참여했던 홈페이지를 저장하고 싶어서 제작했습니다. 데이터를 배포된 웹 안에서 CRUD 작업을 진행했습니다.  
그래서 해당 데이터를 저장할 DB가 필요했는데, 체계화적인 데이터베이스가 필요하진 않았기에 noSQL인 mongoDB를 사용했습니다.