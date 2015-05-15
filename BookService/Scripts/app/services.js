/// <reference path="../angular.js" />
/// <reference path="../angular-resource.js" />
/// <reference path="../angular-route.js" />


/*
http://www.masnun.com/2013/08/28/rest-access-in-angularjs-using-ngresource.html
// Get all booking returned by the API
var bookings = Booking.query(); // Calls: GET /api/booking/
 
// Get Booking ID 1
var booking = Booking.get({},{'Id': 1}); // Calls: GET /api/booking/1
 
// Change a value
booking.fees = 34;
 
// Save the changes (update it)
booking.$save(); // Calls: PUT /api/booking/1
 
// Delete Booking ID 1
Booking.delete({}, {'Id': 1}); // Calls: DELETE /api/booking/1
 
// Get Reviews
var reviews = Booking.reviews(); // Calls: GET /api/booking/?reviews_only=true


*/


"use strict";

angularBookApp.factory("BookService", ['$http','$resource',function ($http,$resource) {
    var API_URI = '/api/books/';
    var booksResource = $resource(API_URI+":Id",
                                    {Id: "@Id" },
                                    {
                                        "update": {method: "PUT"},
                                        "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
                                    });

    return {

        fetch: function () {
            //Ajax call
            //return $http.get(API_URI);
            
            return booksResource.query();
        },

        create: function (book) {
            //return $http.post(API_URI, book);
            var newBook = new booksResource(book);
            return newBook.$save();
        },

        remove: function (id) {
            //return $http.delete(API_URI +  id);
            return booksResource.delete({}, { 'Id': id })
        },

        fetchOne: function (id) {
            //return $http.get(API_URI + id);
            return booksResource.get({},{'Id':id})
        },

        update: function (id,book) {
            //return $http.put(API_URI + id, book);
            
            return booksResource.update({ Id: id, book: book });
        }

    };

}]);

angularBookApp.factory("AuthorService", ['$http',function ($http) {
    var API_URI = '/api/authors/';

    return {

        fetch: function () {
            return $http.get(API_URI);
        },

        create: function (author) {
            return $http.post(API_URI, book);
        },

        remove: function (id) {
            return $http.delete(API_URI + id);
        },

        fetchOne: function (id) {
            return $http.get(API_URI + id);
        },

        update: function (id, author) {
            return $http.put(API_URI + id, book);
        }

    };

}]);