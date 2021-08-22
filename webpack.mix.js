let mix = require('laravel-mix');

mix.js('app/resources/js/app.js', '/public/js/app.js').sass('app/resources/scss/app.scss','/public/css/app.css')