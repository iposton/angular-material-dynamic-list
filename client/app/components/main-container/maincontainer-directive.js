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
                controllerAs: "ll"
            }

            function mainContainerCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope, $timeout, $mdDialog) {
 
                var self = this;

                self.selected = null;
                $scope.tweet = null;
                $scope.lesson = null;
            
                self.lessons = [];
                self.selectLesson = selectLesson;
                self.setActive = setActive;
                self.deleteLesson = deleteLesson;
                // PULL IN DATA FROM FIREBASE
                self.lessons = lessonService.ref;
                var parentEl = angular.element(document.body);
                
               


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

                $scope.showEdit = function($event) {
                        //$scope.getCurrentUser();
                        $scope.editing = true;
                            $mdDialog.show({
                              
                                locals:{
                                    lesson: self.selected
                                },
                                controller: ['$scope', 'lesson', 'lessonService', function($scope, lesson, lessonService) {
                                    var self = this;
                                    self.selected = lesson;
                                    self.id = null;
                                    self.lessons = lessonService.ref;

                                    $scope.saveEdit = function (l) {
                                        self.id = l.$id
                                        self.editedLesson = self.lessons.$getRecord(self.id);
                                        self.lessons.$save(self.editedLesson);
                                        self.selected = {};
                                        $mdDialog.hide();

                                    }

                                    $scope.clearForm = function() {
                                        $mdDialog.hide();
                                    }
                                }],
                                controllerAs: 'vm',
                                parent: parentEl,
                                targetEvent: $event,
                                templateUrl: 'components/editModal.html',
                                
                            });  
                        
                    }

                        
                    $scope.showNew = function($event) {
                            $mdDialog.show({
                                parent: parentEl,
                                targetEvent: $event,
                                templateUrl: 'components/newModal.html',
                                preserveScope: true,
                                controller: mainContainerCtrl
                            }); 
                    }

                    // Add a new lesson
                    $scope.saveLesson = function(lesson) {
                        self.lessons.$add(lesson);
                        $mdDialog.hide();
                    }

                    $scope.clearForm = function() {
                        $scope.lessons = {like: 0, dislike: 0, id: 100};
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
