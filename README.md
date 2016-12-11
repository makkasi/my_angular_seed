Angular2 with TypeScript and Gulp
=================================

#### 1. First install all packages
npm install

#### 2. Run the tsc watch
npm run build:dev.watch

#### 3. Run the lite server
npm run lite

Typings are automatically installed via postinstall command  "typings install". It's used configuration from typings.json. 
Typings in node_modules/@types are not used because gulp-typescript doesn't support "types" and "typesRoot" in typescript.json
