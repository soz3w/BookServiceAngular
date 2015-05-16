"use strict";

angularBookApp.controller("homeController",['$scope',  function ($scope) {

    $scope.user = 'Saadna';

}]);

angularBookApp.controller("BookController", ['$scope', 'BookService', function ($scope, BookService) {

    
    $scope.iconeSort = $scope.reverse ? "glyphicon glyphicon-triangle-bottom" : "glyphicon glyphicon-triangle-top";
  
    $scope.books = BookService.fetch();
    //BookService.fetch().success(function (resp) {
    //    $scope.books = resp;
       
    //});
    
    $scope.deleteBook = function (book) {
        if (!confirm("You are sure you want to delete the book : " + book.Title + " ?"))
            return false;
        var index = $scope.books.indexOf(book);
        BookService.remove(book.Id).$promise.
            then(function () {
                $scope.books.splice(index, 1);
            });

        //ajax call
        //BookService.remove(book.id)
        //    .success(function () {
        //        $scope.books.splice(index, 1);
        //    }
        //);
    };

}]);


angularBookApp.controller("bookAddFormController", ['$scope', 'BookService','AuthorService',function ($scope, BookService,AuthorService) {
    AuthorService.fetch().success(function (resp) {
        $scope.authors = resp;
        
    });
    $scope.addBook = function (newBook) {
        var book = {
            AuthorId: newBook.Author.Id,
            Genre: newBook.Genre,
            Price: newBook.Price,
            Title: newBook.Title,
            Year: newBook.Year
        };
        
        //ajax method
        //BookService.create(book)
        //    .success(function () {
        //        $scope.books.push(newBook);
        //        $scope.book = {};
        //    })
        //    .error(function (resp) {
        //        console.log(resp);
        //    });

        BookService.create(book)
            .then(function (data) {
                        $scope.books.push(data);
                        $scope.book = {};
            })
            .catch(function (resp) {
                     console.log(resp);
                 });

    };
}]);
angularBookApp.controller("bookEditFormController", ['$scope', 'BookService','AuthorService','$routeParams','$location',function ($scope, BookService, AuthorService, $routeParams, $location) {
    AuthorService.fetch().success(function (resp) {
        $scope.authors = resp;

    });

    var bookId = $routeParams.id;


    $scope.book = BookService.fetchOne(bookId)
    
    //ajax call
    //BookService.fetchOne(bookId).success(function (book) {
    //    $scope.book = book;
    //    $scope.author = {Id:book.AuthorId,Name:book.AuthorName};
        
    //});

    $scope.book.$promise.then(function (book) {
        $scope.author = { Id: book.AuthorId, Name: book.AuthorName };
    });
    
   
    

    $scope.updateBook = function (id, bookEdited) {

        var book = {
            Id:id,
            AuthorId: $scope.author.Id,
            Genre: bookEdited.Genre,
            Price: bookEdited.Price,
            Title: bookEdited.Title,
            Year: bookEdited.Year
        };
        // solve ng-otions select list issue
        $scope.book.AuthorId = $scope.author.Id
        //console.log($scope.author.Id);
        $scope.book.$update()
            .then(function () {               
                $location.path('/books');
            })
            .catch(function (resp) {
                console.log(resp);
            });

    };
}]);
