(function() {
    "use strict";

    angular
        .module("lessons")
        .directive("addLesson", function() {
            return {
                templateUrl: "components/add-lesson/add-lesson.html",
                scope: {
                    currentuser: '=currentuser'

                },
                controller: addLessonCtrl,
                controllerAs: "vm"
            }

            function addLessonCtrl($mdDialog, lessonService) {
              var self = this;

              self.showNew = showNew;
              self.clearForm = clearForm;
              self.saveLesson = saveLesson;

              // PULL IN DATA FROM FIREBASE
              self.lessons = lessonService.ref;

              // For $mdDialog
              var parentEl = angular.element(document.body);

               function showNew($event) {
                    $mdDialog.show({
                        parent: parentEl,
                        targetEvent: $event,
                        templateUrl: 'components/add-lesson/addNewLessonModal.html',
                        preserveScope: true,
                        controller: addLessonCtrl,
                        controllerAs: 'vm'
                    });
                }

                // Add a new lesson
                function saveLesson(lesson) {
                    self.lessons.$add(lesson);
                    $mdDialog.hide();
                }

                function clearForm() {
                    self.newLesson = { like: 0, dislike: 0, id: 100 };
                }
             

            }
        })
}());
