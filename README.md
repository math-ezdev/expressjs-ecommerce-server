# ExpressJs Full Experiences

## Instruction

- Download Nodejs `node -v`
- Express Application Generator `npm i -g express-generator`
- Initialize Project `express --ejs [project-name]`
- Config Scripts `npm i --save-dev nodemon`
- Project Structure

```
.
├── app
├── package.json
├── configs
├── middlewares
├── apis
├──
├── models
├── controllers
├── routes
├──
├── public
├── views
│   ├── layouts
│   └── partials
├──
└── .gitignore
    ├── /node_modules
    └── .env
```

- Setup `npm i dotenv`
- Middleware ErrorHandling, Response, URL
- Database `npm i mongoose`
- Validation `npm i joi joi-password-complexity`
- Authentication API `npm i bcrypt jsonwebtoken`
- Authentication Application `npm i express-session passport passport-local connect-mongo`
- Authorization
- View Engine + Bootstrap Templates `npm i express-ejs-layouts`

> [!WARNING]
> session({cookie:{secure: ?}}) // always set false for local server

> [!NOTE]
> On Android, tokens should be stored in Shared Preferences, KeyStore or Room Database

<!--
- Learn more `npm i cors`
-->

## API Response JSON

```
{
    "success": true/false,
    "message": "Registration successful.",
    "data": {
        "email": "Manh.Thai@gmail.com",
        "password": "$2b$10$sLOGl.NZEoO7Y3DLJ4BureyeLCCqQLDySVNdRljMCxqjQe082.fw6",
        "_id": "66210e446639432cb8bda2df",
    },
    "error": null
}
```

## API Endpoint

- Auth

```
POST /api/auth/signup
POST /api/auth/signin
POST /api/auth/token
```

## Conclusion

```

```

<!--
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
-->

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

## Source

[ExpressJs](https://expressjs.com)
\
[Bootstrap Template](https://bootstrapmade.com/demo/NiceAdmin/)
