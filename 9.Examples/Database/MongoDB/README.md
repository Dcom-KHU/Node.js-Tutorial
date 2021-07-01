# MongoDB Example
## Develop Environment
- Node.js 14.16.1
- Npm 7.19.0
## How To Run
1. Prerequsites  
    MongoDB가 설치되어 있어야 합니다.
2. Install modules
   ```bash
   npm install
   ```
3. Run
   ```bash
   node app.js
   ```
## APIs
- POST /api/user/signup : 사용자 회원가입 API
- POST /api/user/login : 사용자 로그인 API
- POST /api/user/logout : 사용자 로그아웃 API
- GET /api/user/info : 사용자 정보 API

## Modules
- express : 웹 프레임워크
- mongoose : MongoDB ODM 라이브러리
- dotenv : .env 파일에 configuration 작성하여 process.env에 로드  
    (**주의** .env파일은 원래 .gitignore에 등록돼야 함.)
- crypto-js : 암호화 라이브러리
- express-session : 세션 라이브러리
- connect-mongo : 세션을 서버 메모리가 아닌 데이터베이스에 저장
- morgan : 로깅(logging) 미들웨어
