(function() {
    'use strict';
    angular.module('lessons')

    .config(function($sceProvider) {
        // ngMaterial $mdIconProvider will be updated  to mark urls as safe.
        // Meanwhile, disable $sce for ngMaterial CodePen Demos that using external SVGs
        $sceProvider.enabled(false);
    })

    .controller('LessonController', ['lessonService', '$mdBottomSheet', '$mdSidenav', '$scope', '$mdDialog', '$window', LessonController]);

    function LessonController(lessonService, $mdBottomSheet, $mdSidenav, $scope, $mdDialog, $window) {

        var self = this;

        self.selected = null;
        self.lessons = [];
        self.toggleLessonList = toggleLessonList;

        self.lessons = lessonService.ref;

        self.id = 100;
        self.like = 0;
        self.dislike = 0;

        $scope.classes = 'drop-theme-arrows-bounce-dark';
        $scope.constrainToScrollParent = 'true';
        $scope.constrainToWindow = 'true';
        $scope.openOn = 'hover';
        $scope.position = 'bottom center';

        self.someValue = 'http://www.ianposton.com/';

        /**
         * Select the current lessons
         * @param menuId
         */

        function toggleLessonList($event) {
            $mdSidenav('left').toggle();
            $mdBottomSheet.hide($event);
        }

        /**
         * Log in function
         * @param menuId
         */


        $scope.newUser = { email: '', password: '' };
        $scope.currentUser = null;

        $scope.getCurrentUser = function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    $scope.currentUser = user;

                    //if user add lesson available
                    $scope.showNew = function($event) {
                        $scope.getCurrentUser();
                        //if ctrl and the n key are pressed at same time new modal opens
                        if ($event.keyCode == 78 && $event.ctrlKey && $scope.currentUser) {
                            var parentEl = angular.element(document.body);
                            $mdDialog.show({
                                parent: parentEl,
                                targetEvent: $event,
                                templateUrl: 'components/newModal.html',
                                preserveScope: true,
                                controller: LessonController
                            });
                        };
                    }

                } else {
                    // No user is signed in.
                    $scope.currentUser = null;
                    user = null;
                }
            });
        }

        $scope.getCurrentUser();

        //display login modal
        $scope.showLogin = function($event) {
            $scope.getCurrentUser();
            //if ctrl and the a key are pressed at same time login modal opens
            if ($event.keyCode == 65 && $event.ctrlKey) {
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: 'components/loginModal.html',
                    preserveScope: true,
                    controller: LessonController
                });
            };
        }

        $scope.login = function(email, password) {

            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + ' ' + errorMessage);
                    // ...
                })
                .then(function(user) {
                    $scope.currentUser = user;
                    $scope.resetForm();
                    $mdDialog.hide();
                })
        }

        $scope.signout = function() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                window.localStorage.removeItem("firebase:host:my-lessons.firebaseio.com");
                $scope.getCurrentUser();
                $mdDialog.hide();

            }, function(error) {
                // An error happened.
                console.log(error);
            });

        }

        $scope.resetForm = function() {
            $scope.newUser = { email: '', password: '' };
        }

        // add a new lesson website
        $scope.saveLesson = function(lesson) {
            self.lessons.$add(lesson);
            $mdDialog.hide();
        }

        $scope.clearForm = function() {
            $scope.lessons = { avatar: '', name: '', content: '', websiteUrl: '', twitterUrl: '', googleplusUrl: '', facebookUrl: '' };
        }


    }
}());
