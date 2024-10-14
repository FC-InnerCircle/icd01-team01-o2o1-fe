# 프로젝트 안내

아래에 프로젝트 구조를 만들면서 의도한 바를 간단하게 작성해두었습니다.

## 컴포넌트 계층화

\_components 폴더의 컴포넌트는 각 페이지에서만 사용되고, components 폴더의 공용 컴포넌트는 여러 곳에서 재사용됩니다.  
공용 컴포넌트를 조합해 각 페이지에서 독립적으로 사용되는 컴포넌트를 만드는 걸 의도했으나, 생각만큼 공용 컴포넌트를 뽑아내지 못했습니다.

## 기능의 분리

기능과 관련된 코드는 features 폴더에 각 기능(도메인)별로 분리해두었습니다.

## 미구현 사항

- 리뷰 작성의 입력값 검증 (리뷰의 필수값이 정해지지 않음)
- 리뷰 이미지 업로드 (리뷰 이미지 업로드 api 미구현)
- home 페이지의 음식점 카테고리 관련 (카테고리 분류가 완료되지 않아 서버와 동기화 X, 임시 데이터 출력)
- 예외 처리

# 프로젝트 실행 방법

```bash
npm install
npm run dev
```

브라우저 : http://localhost:3000

# 테스트 실행 방법

```bash
npm run test
```

# 폴더 구조

```md
.
├── app _ nextjs 앱 라우터
│ ├── home _ 페이지 라우팅
│ │ └── \_components _ 페이지 전용 컴포넌트 컴포넌트
├── components
│ ├── Layout _ 레이아웃 컴포넌트
│ ├── shared _ 공용 컴포넌트
│ └── ui _ shadcn/ui 컴포넌트
├── constants _ 공용 상수
├── context _ 외부 모듈 관련
├── features _ 기능 코드
│ ├── address _ 도메인
│ │ ├── api _ api 호출 함수
│ │ ├── hooks _ 커스텀 hook
│ │ └── types _ 타입 정의
├── hooks _ 공용 커스텀 hook
├── lib _ 라이브러리
├── mocks _ msw mock api
└── store \* 전역 상태 관리
```
