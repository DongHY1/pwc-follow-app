<p align='center'>
<img src="./screenshots/logo.png" width='300'/>
</p>

<p align='center'>
PWC Follow App</a>
</p>

<p align='center'>
<a href='https://follow.szuhy.xyz'/>👉 Goto App</a>
</p>
<br>

![](./screenshots/follow.mp4)

## Features

- 🧙‍♂️ E2E Typesafety with tRPC
- 🔐 E2E testing with Cypress
- 🛠 FullStack React with Next.js
- 📱 Responsive Design with Tailwind
- 📚 Database with Prisma 
- 🚢 Docker It!
- 💡 Inspired by [Create T3 App](https://create.t3.gg/)

## Local Setup

- Install Dependencies

```
pnpm install
```

- Set up

```
touch .env
DATABASE_URL = "YOUR_DATABASE_URL"
// For convenience, I use sqlite
// if you use other database , you should change schema.prisma file
datasource db {
  provider = "sqlite"
  url      =  env("DATABASE_URL")
}

+ visit http://localhost:3000

## Docker setup

+ docker-compose up --build
+ visit http://localhost:3000
```
