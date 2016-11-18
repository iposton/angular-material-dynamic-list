(function() {
    'use strict';
    angular.module('users')

    .config(function($sceProvider) {
        // ngMaterial $mdIconProvider will be updated  to mark urls as safe.
        // Meanwhile, disable $sce for ngMaterial CodePen Demos that using external SVGs
        $sceProvider.enabled(false);
    })

    .controller('UserController', ['userService', '$mdBottomSheet', '$mdSidenav', '$log', UserController]);

    function UserController(userService, $mdBottomSheet, $mdSidenav) {
        var self = this;

        self.selected = null;
        self.users = [];
        self.selectUser = selectUser;
        self.makeContact = makeContact;
        self.toggleUserList = toggleUserList;
        self.setActive = setActive;

        // Load all registered users

        userService
            .loadAllUsers()
            .then(function(users) {
                self.users = [].concat(users);
                self.selected = users[0];
            });

        /**
         * Select the current avatars
         * @param menuId
         */

        function toggleUserList($event) {
            $mdSidenav('left').toggle();
            $mdBottomSheet.hide($event);
        }

        function selectUser(user) {
            self.selected = user;
            $mdBottomSheet.hide(self.selected);
        }

        function setActive (item, list){
          list.some(function(item){
            if(item.active){
              return item.active = false;
            }
          });
          item.active = true;
        };

        function makeContact(selectedUser) {
            console.log('hi you have hit the users ctrl :)');
            var appRoot = 'https://rawgit.com/angular/material-start/es5-tutorial/app/';

            $mdBottomSheet.show({
                controllerAs: "vm",
                controller: ['$mdBottomSheet', ContactSheetController],
                templateUrl: 'contactSheet.html',
                parent: angular.element(document.getElementById('content'))
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function ContactSheetController($mdBottomSheet) {
                var rootURL = appRoot + "assets/svg/";

                this.user = selectedUser;

                this.items = [
                    { name: 'Facebook', icon: 'facebook', icon_url: 'svg/facebook-box.svg', link: this.user.facebookUrl },
                    { name: 'Twitter', icon: 'twitter', icon_url: 'svg/twitter-box.svg', link: this.user.twitterUrl },
                    { name: 'Google+', icon: 'google_plus', icon_url: 'svg/google-plus-box.svg', link: this.user.googleplusUrl }
                ];
                this.contactUser = function(action) {
                    // The actually contact process has not been implemented...
                    // so just hide the bottomSheet

                    $mdBottomSheet.hide(action);
                };
            }
        }

    }
})();
