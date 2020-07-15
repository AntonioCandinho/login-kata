# Login Kata

## Introduction

This repository contains a web page that implements the following user story:

**As a user, I should be able to log in with my email and password into the platform. This log in
process will generate a session token which should be persisted into the application so I
don’t have to type my credentials when opening the app again and again. Once the user is
logged in, we should show him a button to close the user session.**


## How to run?

[Node](https://nodejs.org/en/) 14 was used for the development of this project so it is the recommended Node version to use, Node versions greater and including 8 should also be able to run this project, though. 

For running the project you can do: 

``` sh
npm install
npm run server
```

This commands will start a development web server in the port *3000*, it will serve the static Html and js files that make the web page and will also act as a mock authentication API that will allow login with any credentials. Once the server is up and running you can access it in the following url: http://localhost:3000

*Note: Sometimes webpack will take a little bit to compile so be sure you see a Compiled successfully message before trying to access the server*

## Architecture

Some abstractions were made for being able to represent all the different components that make this project. This architecture is not written in stone and it can (and should) change according to business needs. The abstractions made are represented in the source code folder structure, which looks something like the following:

```
src
├── gateways
├── images
├── presenters
├── repositories
├── servicelocators
├── styles
├── usecases
├── images.d.ts
├── index.html
└── index.tsx
```

The files that stand alone: `index.html`, `index.tsx` are the entry point for the application whereas `images.d.ts` contains some Typescript type definitions. The folders follow the next ideas:

* **Gateways**, in this folder are the objects whose function is to encapsulate some communication, they wrap things like API calls, etc in some nice to use and replace interfaces.
* **Presenters**, the classes in here are the ones in charge of displaying the UI, perform basic user input validation in terms of UI, call the use cases and react to them.
* **Usecases**, the object in this folder encapsulate the use cases of our application, they do things like interacting with repositories, gateways, etc as dictated by the application logic.
* **Repositories**, these classes abstract the persistency of the system, we usually use them for storing and retrieving things while being unaware of the underline physical information representation.
* **Servicelocator**, the service locators aggregate a bunch of dependencies together and they help us building them and passing them around. Nothing else, nothing more.
* **Images**, nothing tricky here, just a folder containing some image files.
* **Styles**, styles of the application, as we use CSS in JS, this folder contains a bunch of Tsx files that will end up being the CSS of the application.


## Test coverage

This web page aims to be fully test covered. For that three different kinds of tests are used: 

**Unit tests** will test modules in isolation, they require no dependencies and they can be run with:

``` sh
npm run test:unit
```

**Integration tests** will test modules integration with different components. They are more expensive in time to run and maintain than unit tests and require a running development web server in the port 3000 (`npm run serve`). Run them with:

``` sh
npm run test:integration
```

**E2E tests** these are the most expensive and for that reason the less common, these tests will
test the page like and end-user would, clicking, scrolling, writing, etc. They need a running dev server (`npm run serve`). The following command should run them:

``` sh
npm run test:e2e
```

[Jest](https://jestjs.io) is the test framework that supports all of them. With Jest, (Selenium)[https://www.selenium.dev/] powers the e2e tests.

Because of the heterogeneous nature of the test system, there is not a tool that could give a complete coverage report of the system so none is used.


## Production build

Although the development web server could be a very useful tool for quick development and demo it is **not suitable for a production environment**. For that a production build can be done issuing: 

``` sh
npm run build
```

This command will generate some static files in the **dist** directory these files could be served with your preferred HTTP server.
