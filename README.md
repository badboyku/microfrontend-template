# microfrontend-template
This is a template repo for creating a micro frontend react app.

Includes support for:
- React with TypeScript/JavaScript (preferably stick to TypeScript)
- ESLint with custom rules added from [@badboyku/eslint-config-badboyku](https://github.com/badboyku/eslint-config-badboyku)
- Jest with jest-dom
- Husky's pre-commit hook that will run linter and tests
- Webpack with Module Federation Plugin

---

## Quickstart
1. Install dependencies: `yarn install` or `npm install`
2. Start the app: `yarn start` or `npm start`
    1. Browser should automatically open to [http://localhost:8080](http://localhost:8080)

NOTE: App will be served from webpack-dev-server's default port 8080, which can be changed by following the .env.example in the repo.

---

## Module Federation Plugin
This plugin is used to help bundle multiple builds into one build. There is a `bootstrap.tsx` file that is necessary for the plugin to work correctly.

**WARNING: Do not remove file `bootstrap.tsx`**

There are some options that need to be set in `webpack.config.js` file:

1. `name` - this is used for your application name

   Example:
   ```js
   name: 'my_app'
   ```

2. `remotes` - this is used to set up your app to have remote apps

   Example:
   ```js
   remotes: {
     this_app: 'this_app@http://localhost:8081/remoteEntry.js',
     that_app: 'that_app@http://localhost:8082/remoteEntry.js',
   }
   ```

3. `exposes` - this is used to set up your app to expose one or more components

   Example:
   ```js
   exposes: {
     './ThisComponent': './src/components/ThisComponent',
     './ThatComponent': './src/components/ThisComponent',
   }
   ```

See https://github.com/module-federation/module-federation-examples as reference examples

---

## Code Formatting with ESLint
ESLint has been set up with using the config from: [@badboyku/eslint-config-badboyku](https://github.com/badboyku/eslint-config-badboyku)
- To run eslint: `yarn lint` or `npm run lint`
- To run eslint with fix: `yarn lint:fix` or `npm run lint:fix`

NOTE: You are able to override a rule by updating the rules inside the `.eslintrc.js` file.

Example:
```js
rules: {
  'no-console': 'error',
},
```

---

## Code Formatting with Prettier
Prettier has been configured to help format css, scss, json files
- To run prettier: `yarn prettier` or `npm run prettier`
- To run prettier with fix: `yarn prettier:fix` or `npm run prettier:fix`
---

## Testing with Jest
Jest has been set up with coverage needing at least 80%. We are following industry standards to keep test files and snapshots in the src folder.
- To run jest: `yarn test` or `npm test`
- To run jest and update snapshots: `yarn test -u` or `npm test -u`
- To run jest test coverage: `yarn test:coverage` or `npm test:coverage`
- To run jest watch mode: `yarn test:watch` or `npm test:watch`

---

## Folder Structure
In the `src` folder, let's try to keep a `components`, `pages`, and `routes` folder, in order to have a common folder structure for each MFE app.  Apart from that, create folders to support your application.
