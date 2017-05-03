(function() {
    "use strict";

    angular
        .module("lessons")
        .directive("mainContainer", function() {
            return {
                scope: {
                    currentuser: '=currentuser'
                },
                templateUrl: "components/main-container/main-container.html",
                controller: mainContainerCtrl,
                controllerAs: "vm"
            }

            function mainContainerCtrl(lessonService, $mdBottomSheet, $mdSidenav) {

                var self = this;

                // Set globals
                self.selected = null;
                self.tweet = null;
                

                // Define functions
                self.getTweet = getTweet;
                self.selectLesson = selectLesson;
                self.setActive = setActive;
                
                // PULL IN DATA FROM FIREBASE
                self.lessons = lessonService.ref;

                function selectLesson(lesson) {
                    self.selected = lesson;
                    $mdBottomSheet.hide(self.selected);
                    $mdSidenav('left').toggle();
                    self.getTweet();

                }

                function setActive(item, list) {

                    list.some(function(item) {

                        if (item.active) {
                            item.active = false;
                        }
                    });
                    item.active = true;

                }

                function getTweet() {
                    self.tweet = "Check out " + self.selected.name + " at " + self.selected.websiteUrl + ". More info about where to find coding lessons.";
                }


            }
        }).directive('onLoadClicker', function($timeout, $mdSidenav) {
            return {
                restrict: 'A',
                scope: {
                    index: '=index'
                },
                link: function($scope, iElm) {
                    if ($scope.index === 0) {
                        $timeout(function() {

                            iElm.triggerHandler('click');
                            $mdSidenav('left').toggle();
                        }, 0);
                    }
                }
            };
        });
}());
