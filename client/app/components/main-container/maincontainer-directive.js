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

            function mainContainerCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope) {
                var self = this;

                self.selected = null;
                self.lessons = [];
                self.selectLesson = selectLesson;
                self.setActive = setActive;

                // Load all registered Lessons

                lessonService
                    .loadAllLessons()
                    .then(function(lessons) {
                        self.lessons = [].concat(lessons);
                        self.selected = lessons[0];
                    });



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
        });
})();
