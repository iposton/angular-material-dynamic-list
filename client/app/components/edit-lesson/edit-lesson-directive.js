(function() {
    "use strict";

    angular
        .module("lessons")
        .directive("editLesson", function() {
            return {
                scope: {
                    currentuser: '=currentuser',
                    selected: '=selected'
                },
                templateUrl: "components/edit-lesson/edit-lesson.html",
                controller: editLessonCtrl,
                controllerAs: "vm"
            }

            function editLessonCtrl (lessonService, $mdDialog) {

                var self = this;

                // Set globals
                self.tweet = null;
                
                // Define functions
                self.showEdit = showEdit;
                self.deleteLesson = deleteLesson;
                

                // PULL IN DATA FROM FIREBASE
                self.lessons = lessonService.ref;

                // For $mdDialog
                var parentEl = angular.element(document.body);

                function showEdit($event, selected) {

                    $mdDialog.show({

                        locals: {
                            lesson: selected
                        },
                        controller: ['$scope', 'lesson', 'lessonService', function($scope, lesson, lessonService) {
                            var self = this;
                            self.selected = lesson;
                            self.id = null;
                            self.lessons = lessonService.ref;

                            self.saveEdit = saveEdit;
                            self.clearForm = clearForm;

                            function saveEdit(update) {

                                // don't save these values only for ng-disabled to disable like/dislike buttons
                                // TODO: Find a better way to do this
                                update.voted = null;
                                update.message = null;

                                self.id = update.$id
                                self.editedLesson = self.lessons.$getRecord(self.id);
                                self.lessons.$save(self.editedLesson);
                                self.selected = {};
                                $mdDialog.hide();

                            }

                            function clearForm() {
                                $mdDialog.hide();
                            }
                        }],
                        controllerAs: 'vm',
                        parent: parentEl,
                        targetEvent: $event,
                        templateUrl: 'components/edit-lesson/editLessonModal.html',

                    });

                }

                function deleteLesson(event, lesson) {
                    var confirm = $mdDialog.confirm()
                        .title("Are you sure you want to delete " + lesson.name + "?")
                        .ok("Yes")
                        .cancel("No")
                        .targetEvent(event);
                    $mdDialog.show(confirm).then(function() {
                        self.lessons.$remove(lesson);
                        //showToast(lesson.names + ' Deleted!');
                    }, function() {

                    });
                }


            }
        })
}());
