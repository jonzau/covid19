# Covid19

This is a simple web app that displays basic COVID19 stats per country.

This project is written in [Angular](https://angular.io/) using the [Angular Material](https://material.angular.io/) UI library and [COVID19 API](https://covid19api.com/), as well as [NGX Cookie Service](https://www.npmjs.com/package/ngx-cookie-service) to store cookies with user's selections (such as favourites and sorting).

[Demo here!](https://jonz-covid19.web.app/)

Some of the app's features include:

* A search bar to quickly find a specific country
* Different sorting options
* Mark as favourite / show favourites only 

## License

Licensed under the [MIT License](LICENSE).

## Running the project

After cloning the project you first should run `npm install` (make sure you have [Node.js](https://nodejs.org/) installed first). Afterwards a simple `npm run start` (or `ng serve`) is enough to start the application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
