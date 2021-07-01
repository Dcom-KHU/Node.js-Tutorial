# MongoDB Example
## Develop Environment
- Node.js 14.16.1
- Npm 7.19.0
- MySQL 8.0.21
## How To Run
1. Prerequsites  
    MySQL이 설치되어 있어야 합니다.  
    sample.users 테이블 구조  
    ```bash
    mysql>desc users;
    +----------------+--------------+------+-----+---------+----------------+
    | Field          | Type         | Null | Key | Default | Extra          |
    +----------------+--------------+------+-----+---------+----------------+
    | id             | int          | NO   | PRI | NULL    | auto_increment |
    | userId         | varchar(45)  | NO   |     | NULL    |                |
    | hashedPassword | varchar(128) | NO   |     | NULL    |                |
    | salt           | varchar(128) | NO   |     | NULL    |                |
    | name           | varchar(45)  | YES  |     | NULL    |                |
    | email          | varchar(45)  | YES  |     | NULL    |                |
    +----------------+--------------+------+-----+---------+----------------+
    ```
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
- mysql2/promise : mysql을 연결하는 라이브러리, mysql2는 promise가 지원된다.  
- dotenv : .env 파일에 configuration 작성하여 process.env에 로드  
    (**주의** .env파일은 원래 .gitignore에 등록돼야 함.)
- crypto-js : 암호화 라이브러리
- express-session : 세션 라이브러리
- express-mysql-session : 세션을 서버 메모리가 아닌 데이터베이스에 저장
- morgan : 로깅(logging) 미들웨어
