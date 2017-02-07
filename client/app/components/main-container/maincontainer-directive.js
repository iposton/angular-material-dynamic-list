(function() {
    "use strict";

    angular
        .module("lessons")
        .directive("mainContainer", function() {
            return {
                templateUrl: "components/main-container/main-container.html",
                controller: mainContainerCtrl,
                controllerAs: "ll"
            }

            function mainContainerCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope, $timeout) {
 
                var self = this;

                self.selected = null;
                $scope.tweet = null;
            
                self.lessons = [];
                self.selectLesson = selectLesson;
                self.setActive = setActive;
                // PULL IN DATA FROM FIREBASE
                self.lessons = lessonService.ref;


                function selectLesson(lesson) {
                    self.selected = lesson;
                    $mdBottomSheet.hide(self.selected);
                    $mdSidenav('left').toggle();
                    $scope.getTweet();
                }

                function setActive(item, list) {
                    
                    list.some(function(item) {

                        if (item.active) {
                            item.active = false;
                        }
                    });
                    item.active = true;
                }

                $scope.getTweet = function () {
                    $scope.tweet = "Check out " + self.selected.name + " at " + self.selected.websiteUrl + ". More info about where to find coding lessons.";
                }


            }
        }).directive('onLoadClicker', function ($timeout) {
                return {
                    restrict: 'A',
                    scope: {
                        index: '=index'
                    },
                    link: function($scope, iElm) {
                        if ($scope.index === 0) {
                            $timeout(function() {

                                iElm.triggerHandler('click');

                            }, 0);
                        }
                    }
                };
            });
}());
