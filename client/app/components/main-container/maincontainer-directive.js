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
                self.lessons = [];
                self.selectLesson = selectLesson;
                self.setActive = setActive;

                // THE OLD WAY FOR SHOWING FOR SELECTING THE FIRST ITEM IN THE LIST FOR CONTENT VIEW
                // lessonService
                //     .loadAllLessons()
                //     .then(function(ref) {

                //         function getSelected(ref) {
                //             return ref.map(function(select) {
                //                 return select;
                //             })
                //         }

                //         var selected = getSelected(ref);

                //         //self.selected = selected[0];
              

                //         console.log(self.selected);

                //     });


                self.lessons = lessonService.ref;


                function selectLesson(lesson) {
                    self.selected = lesson;
                    $mdBottomSheet.hide(self.selected);
                    //TODO: FIND A WAY TO CLOSE SIDENAV ON SMALL SCREEN ON SELECTED
                    $mdSidenav('left').toggle();
                    // broadcast the selected lesson for content directive
                    //$scope.$broadcast('selectLesson', lesson);
                }

                function setActive(item, list) {
                    
                    list.some(function(item) {

                        if (item.active) {
                            return item.active = false;
                        }
                    });
                    item.active = true;
                };


            }
        }).directive('onLoadClicker', function ($timeout) {
                return {
                    restrict: 'A',
                    scope: {
                        index: '=index'
                    },
                    link: function($scope, iElm) {
                        if ($scope.index == 0) {
                            $timeout(function() {

                                iElm.triggerHandler('click');

                            }, 0);
                        }
                    }
                };
            });
})();
