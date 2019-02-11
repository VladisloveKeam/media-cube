# Media Cube Test 

The completed test for MediaCube company.

### Prerequisites

* Web server(Apache/Nginx)
* Node.js
* NPM

### Installing

Start your web server, brings to project root and run the following commands:

```
composer install
```

```
composer dump-autoload
```

```
php artisan key:generate
```

```
php artisan migrate
```

```
npm install
```
to build:
```
npm run build
```
to development:
```
npm run watch
```

[Demo on Heroku](http://pacific-wildwood-51090.herokuapp.com/grid) 

## Deployment

* [NGINX](https://docs.nginx.com/) - as web-server
* [PHP-FPM](https://php-fpm.org/) - FastCGI Process Manager
* [PHP 7.2](https://php.org/) - as project programming lang
* [Node.js](https://nodejs.org/en/) - JavaScript runtime built


## Built With

* [Vue.js](https://vuejs.org/v2/guide/) - The front-end framework used
* [Laravel](https://laravel.com/docs/5.7) - The back-end framework used


## Authors

**Kim Vladislav** - *Initial work*


## License

This project is licensed under the MIT License

