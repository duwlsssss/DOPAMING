# TEAM2 - 도파밍 DOPAMING

![Untitled pdf](https://github.com/user-attachments/assets/e085eed7-50db-422b-b5f3-a0608d316602)

&nbsp;

## 📂 프로젝트 소개

### **효율적인 수강생 관리와 소통을 위한 가상의 학습 플랫폼 회사 도파밍의 인트라넷 서비스입니다.** 

> **코드 한 줄에 도파민 한 방울을 경험하고 싶으세요?** <br />
> **코딩의 즐거움을 극대화하는 도파밍 학습 플랫폼에 지금 합류하세요** 💫

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

선언 순서, [컬러톤, 공통 스타일 속성](src/styles/global.css.css)을 설정한 후 개발했습니다.

### 브랜치 전략

**main, develop** 브랜치와 **feature** 보조 브랜치를 사용했습니다.
- **main**: 배포 단계에서만 사용하는 브랜치
- **develop**: 개발 단계에서 main 역할을 하는 브랜치
- **feat**: 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제
    - feature 브랜치 이름 규칙: `feature/기능명` e.g. feat/admin-login

**정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.** <br/>
**코드 품질 관리는 eslint로, 코드 포맷팅은 prettier로 했습니다. 팀원들과 소통하여 코딩 컨벤션을 구축했습니다.** <br/>
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

## 데이터 구조
![스크린샷 2024-10-31 오후 6.55.38.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b5df8ca9-ce3d-4838-a145-53af9273b0db/6224b891-a6a8-4335-bc7e-a9869f940a4e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-31_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.55.38.png)

&nbsp;

## 주요 페이지와 기능

참고하세요: 필수 구현기능(스크롤, 페이지네이션, crud가 가능한 공지, 직원 프로필, 부재, 디바이스별 화면 구현, DOM 조작, 부재 신청 창 구현, 부재 신청 내역 확인 창, 부재 항목에 따른 필터링 기능, 공지 제목, 설명, 날짜에 따른 검색 기능, 사진, 직무, 이름이 표기된 프로필 구현, 현 시각을 표시하는 시계 (타이머) 구현, 토글 형태의 근무 시작 / 종료 스위치 구현, 모달을 활용한 근무 시작 / 종료 확인 창 구현, 기업 공지 모음 갤러리 구현, 회원 시스템 기능(로그인, 로그아웃))

- ### 🔐 로그인
    - 이메일과 비밀번호를 받아서 데이터베이스에 존재하는 지 확인
           
  
- ### 🫅 관리자
    - **관리자 홈 페이지**
    - **직원 관리 페이지**
    - **휴가/공가 관리 페이지**
    - **공지 관리 페이지**
  
- ### 🧑 사용자
    - **사용자 홈 페이지**
        - 공지 목록, 부재 신청 목록을 간단히 확인 가능
        - 진도율과 남을 수강일를 표시
        - 현 시각을 표시하는 시계 표시
        - 출근, 퇴근, 외출, 복귀 버튼 누르면 모달 뜨고 처리
          
    - **내 정보 수정 페이지**
        - 사용자의 입력에 대한 유효성 검사를 한 후 통과하지 못하면 오류 표시
        - 입력값이 없으면 이전 데이터 사용
     
        - 프로필 사진을 기본 이미지로 변경도 가능
    - **출결 관리 페이지**
        - 부재 신청시 모든 항목 입력 필요
        - 부재 수정과 삭제 가능
    - **휴가/공가 관리 페이지**
        - 부재 신청시 모든 항목 입력 필요
        - 부재 수정과 삭제 가능
    - **공지 목록 페이지**
        - 공지 제목과 설명으로 검색 가능
        - 클릭하면 상세 페이지로 이동
    - **수강생 목록 페이지**
        - 수강생 이름과 이메일로 검색 가능

&nbsp;

## 💁 구성원

| [![Chajaesik01](https://avatars.githubusercontent.com/u/127061507?v=4)](https://github.com/Chajaesik01) | [![duwlsssss](https://avatars.githubusercontent.com/u/92291790?v=4)](https://github.com/duwlsssss) | [![ALIX-Technology](https://avatars.githubusercontent.com/u/100980794?v=4)](http://github.com/ALIX-Technology) | [![rondido](https://avatars.githubusercontent.com/u/55516901?v=4)](https://github.com/rondido) | [![bbjbc](https://avatars.githubusercontent.com/u/102457140?v=4)](http://github.com/bbjbc) |
| :-----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                             **👑 [차재식](https://github.com/Chajaesik01)**                             |                           **🍀 [김여진](https://github.com/duwlsssss)**                            |                          **🍀 [이규호](https://github.com/ALIX-Technology)**                           |                              **🍀 [박진현](https://github.com/rondido)**                               |                          **🍀 [조병찬](http://github.com/bbjbc)**                          |
|**사용자** 출근/퇴근 관리<br/> 수강생 목록 페이지<br/> 내 정보 수정 페이지<br/> 홈페이지 | **사용자** 휴가/공가 관리 페이지<br/> 공지 목록 페이지<br/> 내 정보 수정 페이지<br/> 홈페이지| **사용자** 커리큘럼 페이지 | **관리자** |  **관리자** |

&nbsp;

## 📝 KPT 회고

|                         **👑 차재식**                          |                      **🍀 김여진**                     |                    **🍀 이규호**                   |                 **🍀 박진현**                  |                **🍀 조병찬**                 |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| Keep | 모르는 게 있으면 바로 물어보기, 부트캠프 시간동안 자리 비우지 않기  | -  | -  | - |
| Problem | 컨벤션을 더 꼼꼼히 정했다면 코드의 통일성이 높아졌을 것이다. 지금은 DOM 조작을 여러 방법으로 하고 있어 아쉬움이 있음(id, class 모두로 css 수정 등) / 컴포넌트화 할 코드를 개발하면서 정했고, 충분히 공유되지 않아 코드 중복이 발생함. 코드의 재사용성이 떨어짐  | -  | -  | - |
| Try | 페이지 컴포넌트에는 틀만 잡고  RenderUserVacationHeader(페이지 컴포넌트에 들어갈 위치, …사용할 데이터); 이런식으로 코드를 통일하기 / css 컨벤션을 더 잘 지키기 / 수정 상황 빠르게 공유하기 | -  | -  | - |

&nbsp;

## 🚀 앞으로의 계획
