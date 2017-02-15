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

        // Define Functions
        self.toggleLessonList = toggleLessonList;
        self.getCurrentUser = getCurrentUser;
        self.showLogin = showLogin;
        self.login = login;
        self.signout = signout;
        self.resetForm = resetForm;


        // GET DATA FROM FIREBASE
        self.lessons = lessonService.ref;

        // VALUES FOR THE POPOVER ON NAV
        self.classes = 'drop-theme-arrows-bounce-dark';
        self.constrainToScrollParent = 'true';
        self.constrainToWindow = 'true';
        self.openOn = 'hover';
        self.position = 'bottom center';

        self.myWebsite = 'http://www.ianposton.com/';
        self.myRepo = 'https://github.com/iposton/angular-material-dynamic-list';

        // Global for $mdDialog 
        var parentEl = angular.element(document.body);


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

        // Login/Signout globals 
        self.newUser = { email: '', password: '' };
        self.currentUser = null;

        function getCurrentUser() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    self.currentUser = user;

                } else {
                    // No user is signed in.
                    self.currentUser = null;
                    user = null;
                }
            });
        }

        // SEE IF THERE IS A USER SIGNED IN WHEN PAGE LOADS
        self.getCurrentUser();

        //display login modal
        function showLogin($event) {
            self.getCurrentUser();
            //if ctrl and the a key are pressed at same time login modal opens
            if ($event.keyCode === 65 && $event.ctrlKey) {

                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: 'components/loginModal.html',
                    preserveScope: true,
                    controller: LessonController,
                    controllerAs: 'vm'
                });
            }
        }

        function login(email, password) {

            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + ' ' + errorMessage);
                    // ...
                })
                .then(function(user) {
                    self.currentUser = user;
                    self.resetForm();
                    $mdDialog.hide();
                })
        }

        function signout() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                //window.localStorage.removeItem("SIGNOUT_URL");
                self.getCurrentUser();
                $mdDialog.hide();

            }, function(error) {
                // An error happened.
                console.log(error);
            });

        }

        function resetForm() {
            self.newUser = { email: '', password: '' };
        }


    }
}());
