# Creating a expressjs + typescript project

*TODO: In future I might want to explore this package - [tsx](https://github.com/privatenumber/tsx)*

**❤️Three step process:**

1. Create a folder `my-expressjs-typescript` and then run following commands inside the folder:

```bash
mkdir src
touch src/app.ts
```

Add below code to `src/app.ts` file:
  - *Note: Do not try to optimize this step by using echo command create file with below code because I tried it and it causes issues with below code because of backticks in the below code (in console.log).*

```ts
import express from 'express'
import type { Application, Request, Response } from 'express'

const app: Application = express()

const port = 8080

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from express + typescript')
})

app.listen(port, function () {
  console.log(`App running on: http://localhost:${port}`)
})
```

```bash
# Install dependencies:
npm init -y
node -v > .nvmrc
echo node_modules >> .gitignore
echo dist >> .gitignore
npm i express
npm i -D typescript ts-node ts-node-dev @types/node @types/express

# Generate tsconfig.json file
npx tsc --init
# Remove all comments tsconfig.json for a cleaner view: [source - https://stackoverflow.com/a/74414298/10012446 ]
sed -i -r '/^[ \t]*\//d; /^[[:space:]]*$/d; s/\/\*(.*?)\*\///g; s/[[:blank:]]+$//' tsconfig.json; rm tsconfig.json-r
```

2. Manually update `tsconfig.ts` and by copy-pasting below lines inside `"compilerOptions"` key:

```json
"outDir": "./dist" /* Specify an output folder for all emitted files. */,
// To help progress faster by not having to unnecessary assign `any` everywhere i.e, to allow type to be any implicitly
"noImplicitAny": false,
```

3. Depending upon if you want to use nps or not:
  - Using `nps`:

```bash
npm i -D nps && nps init

# Add below scripts to your package-scripts.js file in "scripts" key:
default: "nps s.dev",
start: {
  dev: "ts-node-dev --respawn --transpile-only --clear src/app.ts",
  debug: "ts-node-dev --inspect --respawn --transpile-only --clear src/app.ts",
  prod: "node dist/app.js"
},
build: "rm -rf dist && tsc",



# Run the dev server
nps
```

  - Without `nps`: Update `package.json` files

```bash
# In `package.json` remove "test" script and copy-paste below three scripts:
"start": "npm run start:dev",
"start:dev": "ts-node-dev --respawn --transpile-only --clear src/app.ts",
"start:debug": "ts-node-dev --inspect --respawn --transpile-only --clear src/app.ts",
"build": "rm -rf dist && tsc",
"start:prod": "node dist/app.js"



# Run the dev server
npm start
```

**Other resources:**
- Article: Dev.to Article: [Click here](https://dev.to/codeoz/express-with-typescript-starter-explained-fast-4dn7)
  - [Github Repo](https://github.com/Code-Oz/basic-express-typescript)


Thanks

