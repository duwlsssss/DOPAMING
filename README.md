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

## 프로젝트 진행 과정

### 피그마 작성

### 데이터 구조 설정
![스크린샷 2024-10-31 오후 6.55.38.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b5df8ca9-ce3d-4838-a145-53af9273b0db/6224b891-a6a8-4335-bc7e-a9869f940a4e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-31_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.55.38.png)

&nbsp;

## 💁 구성원

| [![Chajaesik01](https://avatars.githubusercontent.com/u/127061507?v=4)](https://github.com/Chajaesik01) | [![duwlsssss](https://avatars.githubusercontent.com/u/92291790?v=4)](https://github.com/duwlsssss) | [![rondido](https://avatars.githubusercontent.com/u/55516901?v=4)](https://github.com/rondido) | [![ALIX-Technology](https://avatars.githubusercontent.com/u/100980794?v=4)](http://github.com/ALIX-Technology) | [![bbjbc](https://avatars.githubusercontent.com/u/102457140?v=4)](http://github.com/bbjbc) |
| :-----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                             **👑 [차재식](https://github.com/Chajaesik01)**                             |                           **🍀 [김여진](https://github.com/duwlsssss)**                            |                          **🍀 [박진현](https://github.com/rondido)**                           |                              **🍀 [이규호](https://github.com/ALIX-Technology)**                               |                          **🍀 [조병찬](http://github.com/bbjbc)**                          |

&nbsp;

## 📝 KPT 회고
