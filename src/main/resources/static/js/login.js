var app=angular.module("myApp",[]);
app.controller("myCon",function ($scope,$http) {
    $http.get("/home/test").then(function (response) {

        $scope.hello=response.data.username
    })
})
