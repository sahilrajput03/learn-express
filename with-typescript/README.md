# Creating a expressjs + typescript project

Two step process:

1. First Step: Create a `src/app.ts` file:

```ts
import express from 'express'
import type { Application, Request, Response } from 'express'

const app: Application = express()

const port = 3001

app.get('/toto', (req: Request, res: Response) => {
  res.send('Hello toto')
})

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`)
})
```

2. Install dependencies:

```bash
npm init -y
npm i express
npm i -D typescript ts-node ts-node-dev @types/node @types/express

# Generate tsconfig file
npx tsc --init
# To remove all comments tsconfig.ts file you can use below command: [source - https://stackoverflow.com/a/74414298/10012446 ]
# sed -i -r '/^[ \t]*\//d; /^[[:space:]]*$/d; s/\/\*(.*?)\*\///g; s/[[:blank:]]+$//' tsconfig.json

# Now, in tsconfig.json file, you must copy-paste below two lines:
"rootDir": "./src" /* Specify the root folder within your source files. */,
"outDir": "./dist" /* Specify an output folder for all emitted files. */,

# In `package.json` remove "test" script and add below scripts:
"start": "npm run start:dev",
"start:dev": "ts-node-dev --respawn --transpile-only --clear src/app.ts",
"start:debug": "ts-node-dev --inspect --respawn --transpile-only --clear src/app.ts"


# Run the dev server
npm start
```