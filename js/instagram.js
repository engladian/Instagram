var instagramApp = angular.module('instagramApp', ['ngAnimate']);
instagramApp.controller('instagramCtrl', function ($scope, $http) {
    $scope.data = {};
    $scope.startSearch = function () {
        var searchTag = $scope.data.searchText;
        $scope.data = {};
        $scope.data.message = 'Searching Instagram...';
        if ($scope.instagramForm.$invalid) {
            $scope.data.message = 'Please enter a search value...';
            return;
        }
        var url = 'https://api.instagram.com/v1/tags/' + searchTag.trim() + '/media/recent';
        var request = {
            callback: 'JSON_CALLBACK',
            client_id: '69563adf08594e80b1ab0298a2762b66'
        };
        $http({ method: 'JSONP', url: url, params: request })
        .success(function (response) {
            if (response.data.length === 0) {
                $scope.data.message = 'No records were found!';
                return;
            }
            $scope.data.message = 'We found ' + response.data.length + ' results for "' + searchTag.trim() + '"';
            var rowURLs = [];
            $scope.data.imageRows = []; //Initialise
            for (imageIdx = 0; imageIdx < response.data.length; imageIdx++) {
                rowURLs.push(
                    {
                        navUrl: response.data[imageIdx].link,
                        imageUrl: response.data[imageIdx].images.low_resolution.url
                    });
                if ((imageIdx + 1) % 3 === 0 || imageIdx == (response.data.length - 1)) {
                    $scope.data.imageRows.push(rowURLs);
                    rowURLs = [];
                }
            }
        })
        .error(function () {
            //Not found.
            $scope.data.message = 'No records were found!';
        });
    };
});