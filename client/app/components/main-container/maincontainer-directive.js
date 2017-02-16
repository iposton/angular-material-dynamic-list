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

            function mainContainerCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope, $timeout, $mdDialog) {

                var self = this;

                // Set globals
                self.selected = null;
                self.tweet = null;
                

                // Define functions
                self.getTweet = getTweet;
                self.showEdit = showEdit;
                self.selectLesson = selectLesson;
                self.setActive = setActive;
                self.deleteLesson = deleteLesson;
                self.showNew = showNew;
                self.clearForm = clearForm;
                self.saveLesson = saveLesson;

                // PULL IN DATA FROM FIREBASE
                self.lessons = lessonService.ref;

                // For $mdDialog
                var parentEl = angular.element(document.body);

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

                function showEdit($event) {

                    $mdDialog.show({

                        locals: {
                            lesson: self.selected
                        },
                        controller: ['$scope', 'lesson', 'lessonService', function($scope, lesson, lessonService) {
                            var self = this;
                            self.selected = lesson;
                            self.id = null;
                            self.lessons = lessonService.ref;

                            self.saveEdit = saveEdit;
                            self.clearForm = clearForm;

                            function saveEdit(l) {
                                // don't save these values only for view condition
                                // TODO: Find a better way to do this
                                l.voted = null;
                                l.votedValue = null;
                                self.id = l.$id
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
                        templateUrl: 'components/editModal.html',

                    });

                }


                function showNew($event) {
                    $mdDialog.show({
                        parent: parentEl,
                        targetEvent: $event,
                        templateUrl: 'components/newModal.html',
                        preserveScope: true,
                        controller: mainContainerCtrl,
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
        }).directive('onLoadClicker', function($timeout) {
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
