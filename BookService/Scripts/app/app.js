"use strict";

var angularBookApp = angular.module('angularBookApp', ['ngRoute', 'ngResource']);

angularBookApp.config(function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/books.html',
            controller: 'BookController'
        })
        .when('/books', {
            templateUrl: '/partials/books.html',
            controller: 'BookController'
        })
        .when('/books/:id', {
            templateUrl: '/partials/EditBook.html',
            controller: 'bookEditFormController'
        })
        .otherwise({
            redirectTo: '/'
        });
});