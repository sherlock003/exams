# Emapta Exam

## Installation (UI - NextJS)

Use npm or yarn package manager to install the UI.

```bash
npm install
```
or
```bash
yarn install
```

## Usage (UI)

```bash
yarn dev or npm run dev
```
This will run under [http://localhost:3000/](http://localhost:3000/)

## Packages (UI)
- react-hook-form
- yup
- material-ui
- react-redux
- @reduxjs/toolkit
- @tanstack/react-table


## Installation (API - Laravel)

Follow this [step](https://laravel.com/docs/11.x/installation#installing-php) to install PHP and composer.

Install packages: 

```bash
composer install
```

Run migration:
```bash
php artisan migrate
```

## Usage (UI)

Run the application
```bash
php artisan serve
```
This will run under [http://localhost:8000/](http://localhost:8000/)



## Note

If you don`t want to use API, you can empty the API_BASE_URL value to switch to the local state.

src/utils/constants.ts