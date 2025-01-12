# Creating a expressjs + typescript project

Two step process:

1. Create a folder `my-expressjs-typescript` and then run following commands inside the folder:

```ts
mkdir src

cat <<EOF > src/app.ts
import express from 'express'
import type { Application, Request, Response } from 'express'

const app: Application = express()

const port = 3001

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from express + typescript')
})

app.listen(port, function () {
  console.log(\`App is listening on port \${port} !\`)
})
EOF


# Install dependencies:
npm init -y
npm i express
npm i -D typescript ts-node ts-node-dev @types/node @types/express

# Generate tsconfig.json file
npx tsc --init
# Remove all comments tsconfig.json for a cleaner view: [source - https://stackoverflow.com/a/74414298/10012446 ]
sed -i -r '/^[ \t]*\//d; /^[[:space:]]*$/d; s/\/\*(.*?)\*\///g; s/[[:blank:]]+$//' tsconfig.json; rm tsconfig.json-r
```

2. Manually update `tsconfig.ts` fand `package.json` files:

```bash
# In tsconfig.json file, you must copy-paste below two lines:
"rootDir": "./src" /* Specify the root folder within your source files. */,
"outDir": "./dist" /* Specify an output folder for all emitted files. */,



# In `package.json` remove "test" script and copy-paste below three scripts:
"start": "npm run start:dev",
"start:dev": "ts-node-dev --respawn --transpile-only --clear src/app.ts",
"start:debug": "ts-node-dev --inspect --respawn --transpile-only --clear src/app.ts"



# Run the dev server
npm start
```
