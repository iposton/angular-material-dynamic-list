(function() {
    'use strict';
    angular.module('lessons')

    .config(function($sceProvider) {
        // ngMaterial $mdIconProvider will be updated  to mark urls as safe.
        // Meanwhile, disable $sce for ngMaterial CodePen Demos that using external SVGs
        $sceProvider.enabled(false);
    })

    .controller('LessonController', ['lessonService', '$mdDialog', LessonController]);

    function LessonController(lessonService, $mdDialog) {

        var self = this;

        // PULL IN DATA FROM FIREBASE
        self.lessons = lessonService.ref;

        self.selected = null;
        // Define Functions 
        self.getCurrentUser = getCurrentUser;
        self.showLogin = showLogin;
        self.login = login;
        self.signout = signout;
        self.resetForm = resetForm;

        // Global for $mdDialog 
        var parentEl = angular.element(document.body);

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
