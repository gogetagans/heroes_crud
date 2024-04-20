# API Service

First of all, go to the link to generate the ID to send GET, POST, PUT and DELETE requests on page [CRUDCRUD](https://crudcrud.com/). Note: Service still in development. Instabilities are possible

Copy this line: https://crudcrud.com/api/{{ID}} and paste it on environment file located on ./src/environment.ts

PROBLEM FOUND: update endpoint have some issues and it's imposible to fix it (CORS PROBLEM). Please don't consider this as an issue itself.

Now we are ready to start!

# HeroesCrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
