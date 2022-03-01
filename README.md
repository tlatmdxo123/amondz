# Amondz front-end 과제

## scripts

`yarn` : install dependencies  
`yarn dev`: start server & application

## 주요 기능

### 메인 페이지

- 상품 리스트 보여주기
- 상품 추가 버튼 클릭시 상품 정보 입력 페이지 이동
- 상품정보 클릭시 상세페이지 이동

### 상품 정보 입력 페이지

- 상품명과 가격,사진 입력시 추가버튼 활성화
- 가격은 숫자 이외의 내용입력시 에러 메세지 활성화
- 사진 추가시(최대 5개) 미리보기 기능 제공
- 미리보기의 x버튼 클릭시 사진 삭제
- 추가하기 버튼 클릭시 상품정보 추가 및 메인페이지 이동
- 취소 버튼 클릭시 메인페이지로 이동

### 상세페이지

- 메인 사진 아래에 사진 리스트 클릭시 메인 사진 전환
- 수정 버튼 클릭시 해당 상품 정보가 채워진 상태로 상품 정보 입력페이지 이동
- 삭제버튼 클릭시 해당 상품정보 삭제

## dependencies

### server

- lowdb : json db생성
- multer : 이미지 업로드시 form data처리
- express : rest API 처리
- cors : cors문제 해결
- body-parser : 데이터 파싱
- nanoid : 랜덤 id 생성
- fs : 파일 생성 및 삭제
- concurrently : 서버와 클라이언트 동시 실행

### client

- @reduxjs/tookit : 전역상태 관리
- redux-saga : 비동기 요청 미들웨어 처리
- styled-components : 컴포넌트 스타일링
- react-router-dom : 페이지 라우팅
- axios : 서버 통신
