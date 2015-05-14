/// <reference path="D:\Dotnet\v2013\BookServiceAngular\BookService\Scripts/jasmine.js" />
/// <reference path="D:\Dotnet\v2013\BookServiceAngular\BookService\Scripts/app/Math.js" />
describe("Math.add", function () {
    it("can add two numbers", function () {
        var result = new Math().add(2, 3);
        expect(result).toBe(5);
    });
});