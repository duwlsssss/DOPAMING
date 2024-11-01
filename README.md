# TEAM2 - 도파밍 DOPAMING

![Untitled pdf](https://github.com/user-attachments/assets/e085eed7-50db-422b-b5f3-a0608d316602)

&nbsp;

## 📂 프로젝트 소개

### **효율적인 수강생 관리와 소통을 위한 가상의 학습 플랫폼 회사 도파밍의 인트라넷 서비스입니다.**

> **코드 한 줄에 도파민 한 방울을 경험하고 싶으세요?** <br /> > **코딩의 즐거움을 극대화하는 도파밍 학습 플랫폼에 지금 합류하세요** 💫

&nbsp;

## 🔧 기술 스택

<div align="center">

|      Type       |                                                                                                             Tool                                                                                                             |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Library     |                                                               ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                                |
|    Language     | ![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black) |
|     Styling     |                                                               ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)                                                                |
|  Data Fetching  |                                                              ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)                                                              |
|      BaaS       |                                                         ![Firebase](https://img.shields.io/badge/firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white)                                                          |
|   Formatting    |      ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)      |
| Package Manager |                                                                 ![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                 |
| Version Control |       ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)       |
|   Deployment    |                                                            ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)                                                             |
|  Collaboration  |           ![Slack](https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)           |

</div>

&nbsp;

## 🔩 프로젝트 설정 및 실행 방법

### 1. 프로젝트 클론하기

먼저, Git 저장소에서 프로젝트를 로컬로 클론해야 합니다. 터미널(또는 명령 프롬프트)을 열고 아래 명령어를 입력합니다.

```bash
git clone https://github.com/Dev-FE-2/toy-project1-team2-intranet-project.git
```

해당 명령어는 지정된 Git 저장소에서 프로젝트를 로컬 컴퓨터로 복사해옵니다.

### 2. 의존성 설치

프로젝트가 로컬에 클론된 후, 프로젝트 폴더로 이동한 다음, 필요한 패키지들을 설치해야 합니다.
Node.js 기반 프로젝트인 경우, `npm` 명령어를 사용하여 의존성을 설치할 수 있습니다.

```bash
npm install
```

이 명령어는 `package.json` 파일에 정의된 모든 의존성(dependencies)을 자동으로 설치해 줍니다.

### 3. 개발 서버 실행

모든 의존성이 설치되면, 개발 서버를 실행하여 프로젝트를 로컬에서 테스트할 수 있습니다.

```bash
npm run dev
```

이 명령어를 통해 개발 모드에서 서버를 시작하며, 변경 사항이 있을 때 자동으로 갱신됩니다.
이후, 브라우저에서 `http://localhost:5173` 주소로 접속하여 애플리케이션을 확인할 수 있습니다.

&nbsp;

## 📌 우리의 컨벤션

### 커밋 컨벤션

- `feat`: 새로운 기능 추가
- `style`: css 수정 및 코드의 의미에 영향을 미치지 않는 변경사항
- `fix`: 버그 수정
- `refactor`: 리팩토링, 기능 변화 없이 코드 구조 개선
- `chore`: 코드 수정 외 잡다한 작업 (빌드 과정이나 설정 변경 등)
- `docs`: 문서 변경
- `test`: 테스트 코드 추가 또는 수정
- `revert`: 이전 커밋을 되돌림

### 파일 컨벤션

- 폴더명: lowercase 또는 kebab-case
- 파일명: PascalCase

### 코드 컨벤션

- 함수: export default function FunctionName(){}
- 변수명: camelCase
- 상수명: UPPER_SNAKE_CASE

### CSS 스타일 가이드

선언 순서, [컬러톤, 공통 스타일 속성](src/styles/global.css)을 설정한 후 개발했습니다.

### 브랜치 전략

**main, develop** 브랜치와 **feat** 보조 브랜치를 사용했습니다.

- **main**: 배포 단계에서만 사용하는 브랜치
- **develop**: 개발 단계에서 main 역할을 하는 브랜치
- **feat**: 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제
  - feat 브랜치 이름 규칙: `feat/기능명` e.g. feat/admin-login

**정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.** <br/>
**코드 품질 관리는 `eslint`로, 코드 포맷팅은 `prettier`로 했습니다. 팀원들과 소통하여 코딩 컨벤션을 구축했습니다.** <br/>
**그리고 `husky`를 사용해 규칙에 맞지 않으면 커밋을 제한했습니다.** <br/>

&nbsp;

## 🕓 프로젝트 진행 과정

### 기획 (2024.10.16 ~ 2024.10.18)

전체적인 서비스를 구상하고, 컨셉 기획을 했습니다.

### [피그마](https://www.figma.com/design/rKGozCHGUUrTe3vNqW0oXg/%5B%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B81%5D-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=0-1&t=hR1YMVLNJ39smo6k-1) 작성 (2024.10.20~2024.10.22)

피그마로 디자인 작업을 하며 서비스의 구체적인 기능과 필요한 데이터를 정립했습니다.

### 퍼블리싱 (2024.10.23~2024.10.28)

역할을 분담해 페이지별 퍼블리싱 작업 위주로 개발했습니다.

### 기능 구현 (2024.10.29~2024.11.1)

역할을 분담해 전체적인 기능을 보완하고 서버를 연동했습니다.

&nbsp;

## 📈 데이터 구조

<img width="543" alt="db 구조" src="https://github.com/user-attachments/assets/f75bd56b-c41a-4c5c-9d7b-6394909cfc41"><br/>

실제 서비스에는 `firebase`의 [Realtime Database](https://console.firebase.google.com/project/toy-project1-team2/database/toy-project1-team2-default-rtdb/data/~2F)를 사용했습니다.

&nbsp;

## 🚀 주요 페이지와 기능

_참고하세요: 필수 구현기능(스크롤, 페이지네이션, crud가 가능한 공지, 직원 프로필, 부재, 디바이스별 화면 구현, DOM 조작, 부재 신청 창 구현, 부재 신청 내역 확인 창, 부재 항목에 따른 필터링 기능, 공지 제목, 설명, 날짜에 따른 검색 기능, 사진, 직무, 이름이 표기된 프로필 구현, 현 시각을 표시하는 시계 (타이머) 구현, 토글 형태의 근무 시작 / 종료 스위치 구현, 모달을 활용한 근무 시작 / 종료 확인 창 구현, 기업 공지 모음 갤러리 구현, 회원 시스템 기능(로그인, 로그아웃))_

### ☁️ 반응형 디자인

모든 페이지에 다양한 디바이스에서 작동할 수 있도록 스타일을 적용했습니다.

![반응형](https://github.com/user-attachments/assets/d6aa12ec-68b2-4c6b-88ce-ae2565757312)

### 🔐 로그인

이메일과 비밀번호를 받아서 데이터베이스에 존재하는 지 확인 후 타입(관리자 or 사용자)에 따라 홈 페이지로 리다이렉트합니다.

![로그인](https://github.com/user-attachments/assets/0f75fb9a-99ae-499e-aa7e-14d647368dfd)

### 🫅 관리자

- **관리자 홈 페이지**

  - 최신 직원 목록 10명 조회
  - 최신 공지사항 목록 조회

    ![main](https://github.com/user-attachments/assets/e39ec959-f0ce-4aad-9b81-738c088262a9)

- **직원 관리 페이지**
  - 직원 CRUD 구현
  - 직원 구분(수강생/매니저)에 따른 필터링
  - 직원 검색 기능
  - 페이지네이션(10명/페이지)
- **휴가/공가 관리 페이지**
  - 휴가 조회 및 승인/거부 관리
  - 휴가 종류 및 승인 상태 필터링
  - 아코디언 UI로 상세 내용 조회
  - 페이지네이션(6개/페이지)
- **공지 관리 페이지**

  - 공지사항 CRUD 구현
  - 공지사항 검색 기능
  - 페이지네이션(8개/페이지)

    ![notice (1)](https://github.com/user-attachments/assets/11d4dca1-b332-4a73-b6a7-a9aae6d1d482)

### 🧑 사용자

- ### 사용자 홈 페이지

  - 공지 목록, 부재 신청 목록을 간단히 확인할 수 있습니다.
  - 진도율과 남을 수강일을 표시합니다.
  - 현 시각을 표시하는 시계를 표시합니다.
  - 출근, 퇴근, 외출, 복귀 버튼 누르면 모달을 띄우고 처리합니다.

    ![사용자 메인](https://github.com/user-attachments/assets/9a944ecd-d093-4454-b04c-b906c7639e7a)

- ### 내 정보 수정 페이지

  - 사용자의 입력에 대한 유효성 검사를 한 후 통과하지 못하면 오류를 표시합니다.
  - 입력값이 없으면 이전 데이터를 사용합니다.

    ![내용 수정](https://github.com/user-attachments/assets/86646934-eb32-4931-acb1-9c020ed16a66)

  - 프로필 사진을 기본 이미지로 변경도 가능합니다.

    ![사진 등록](https://github.com/user-attachments/assets/5b0c4241-d174-425b-8f15-6b96698366ab)

- ### 출결 관리 페이지
  - 기본적으로 오늘 날짜에 해당하는 출/퇴근, 외출, 복귀의 기록을 출력합니다.
  - 날짜를 선택하여 해당 날짜의 기록을 확인 할 수 있습니다.
  - 화살표 이미지를 클릭하여 달을 이동하며 기록을 확인 할 수 있습니다.
    ![출/퇴근 기록](https://github.com/user-attachments/assets/af10d060-114a-44d6-875e-80a86410a12f)
- ### 휴가/공가 관리 페이지

  - 부재 종류로 필터링을 할 수 있습니다.

    ![부재 필터링](https://github.com/user-attachments/assets/f281a788-c239-401e-b663-900407e262e4)

  - 모든 항목을 입력한 후 부재 신청을 할 수 있습니다.
  - gif 변환 후 넣어야 함

  - 부재 수정과 삭제가 가능합니다.

    ![부재 수정](https://github.com/user-attachments/assets/8379edc9-b6ab-4b37-a0ce-c56c86daf9f9)

- ### 공지 목록 페이지

  - 공지 제목과 설명으로 공지를 검색할 수 있습니다.
  - 각 공지를 클릭하면 상세 페이지로 이동합니다.

    ![공지 목록](https://github.com/user-attachments/assets/5ae5bd12-1370-4709-b902-7fe53360bc32)

- ### 수강생 목록 페이지

  - 수강생 이름과 이메일로 수강생을 검색할 수 있습니다.

    ![수강생](https://github.com/user-attachments/assets/58274128-50d9-4e00-afce-d826fe25db9e)

&nbsp;

## 💁 구성원

| [![Chajaesik01](https://avatars.githubusercontent.com/u/127061507?v=4)](https://github.com/Chajaesik01) | [![duwlsssss](https://avatars.githubusercontent.com/u/92291790?v=4)](https://github.com/duwlsssss) | [![ALIX-Technology](https://avatars.githubusercontent.com/u/100980794?v=4)](http://github.com/ALIX-Technology) | [![rondido](https://avatars.githubusercontent.com/u/55516901?v=4)](https://github.com/rondido) | [![bbjbc](https://avatars.githubusercontent.com/u/102457140?v=4)](http://github.com/bbjbc) |
| :-----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                             **👑 [차재식](https://github.com/Chajaesik01)**                             |                           **🍀 [김여진](https://github.com/duwlsssss)**                            |                              **🍀 [이규호](https://github.com/ALIX-Technology)**                               |                          **🍀 [박진현](https://github.com/rondido)**                           |                          **🍀 [조병찬](http://github.com/bbjbc)**                          |
|        **사용자** 출근/퇴근 관리<br/> 수강생 목록 페이지<br/> 내 정보 수정 페이지<br/> 홈페이지         |   **사용자** 휴가/공가 관리 페이지<br/> 공지 목록 페이지<br/> 내 정보 수정 페이지<br/> 홈페이지    |                                           **사용자** 커리큘럼 페이지                                           |                                           **관리자**                                           |     **관리자** 메인페이지 <br /> 공지 관리 페이지 <br /> 휴가/공가 관리 페이지 <br />      |

&nbsp;

## 📝 KPT 회고

### 👑차재식

- **KEEP**
  - ㅇㅇ
- **PROBLEM**
  - ㅇㅇ
- **TRY**
  - ㅇㅇ

### 🍀김여진

- **KEEP**
  - 모르는 게 있으면 바로 물어보기
  - 부트캠프 시간동안 자리 비우지 않기
- **PROBLEM**
  - 컨벤션을 더 꼼꼼히 정했다면 코드의 통일성이 높아졌을 것이다.
  - 지금은 DOM 조작을 여러 방법으로 하고 있어 아쉬움이 있음(id, class 모두로 css 수정 등)
  - 컴포넌트화 할 코드를 개발하면서 정했고, 충분히 공유되지 않아 코드 중복이 발생함.
  - 코드의 재사용성이 떨어짐.
- **TRY**
  - 페이지 컴포넌트에는 틀만 잡고 RenderUserVacationHeader(페이지 컴포넌트에 들어갈 위치, …사용할 데이터) 이런식으로 코드를 통일하기
  - css 컨벤션을 더 잘 지키기
  - 수정 상황 빠르게 공유하기

### 🍀이규호

- **KEEP**
  - ㅇㅇ
- **PROBLEM**
  - ㅇㅇ
- **TRY**
  - ㅇㅇ

### 🍀박진현

- **KEEP**
  - ㅇㅇ
- **PROBLEM**
  - ㅇㅇ
- **TRY**
  - ㅇㅇ

### 🍀조병찬

- **KEEP**
  - 모르는 것 있으면 팀 회의를 진행하며 바로바로 질문하기
  - 내 파트 진행하며 궁금했던 점 멘토님께 질문하기
  - 팀원들과 수시로 코드 리뷰를 진행하여 피드백 주고받기
  - PR을 통한 트러블슈팅 과정 공유하기
  - Git과 관련한 컨벤션을 준수하며 코드와 커밋 컨벤션 일관성 증대
  - 기능 구현 전 팀원들과 충분한 논의를 통해 설계 진행
- **PROBLEM**
  - admin과 user가 나뉘다 보니 공통되는 컴포넌트가 존재하는데 완성하기에 급급하여 중복되는 코드가 많은 점이 아쉬움
  - UI 컴포넌트의 재활용도를 조금 더 높이기
  - Vanilla JS를 처음 사용하다 보니 전체적으로 코드가 복잡하게 되어 관심사와 가독성이 떨어지는 것 같음
  - 사용자 경험이 다소 부족한 부분이 아쉬움
- **TRY**
  - 중복 코드를 줄이고 최대한 공통 컴포넌트를 통해 재사용하기
  - 컨벤션을 사전에 정의했지만 일관성이 떨어지는 부분 수정하기
  - 컴포넌트 설계 시 재사용성과 확장성 우선 고려하기
  - 성능 최적화를 위한 데이터 캐싱 전략 도입
  - 사용자 경험 향상을 위한 피드백 시스템 구축

&nbsp;

## 🚀 앞으로의 계획
