(function() {
    "use strict";

    angular
        .module("lessons")
        .directive("content", function() {
            return {
                templateUrl: "components/content/content.html",
                scope: {
                    selected: '=selected',
                    tweet: '=tweet'

                },
                controller: contentCtrl,
                controllerAs: "vm"
            }

            function contentCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope, $mdDialog, $mdToast) {

                var self = this;

                self.message = null;

                // DEFINE FUNCTIONS
                self.makeContact = makeContact;
                self.incrementVotes = incrementVotes;
                
                // GET FIREBASE DATA
                self.lessons = lessonService.ref;
                
                var parentEl = angular.element(document.body);
                
                function incrementVotes(selected, vote) {
                    var votedValue = null;

                    if (vote === selected.like) {
                        selected.like += 1;
                        self.lessons.$save(selected);
                        votedValue = 'like';
                         

                    } else {
                        selected.dislike += 1;
                        self.lessons.$save(selected);
                        votedValue = 'dislike';
                        
                    }

                    selected.voted = self.voted = true;
                    selected.message = 'You chose to ' + votedValue + ' ' + selected.name + '. Thank you for voting!';

                    $mdToast.show(
                      $mdToast.simple()
                        .textContent(selected.message)
                        .action('OK')
                        .highlightAction(true)
                        .hideDelay(0)
                        .position('bottom right')
                        .parent(parentEl)
                    );
                    
                }

                

                function makeContact(selectedLesson) {

                    console.log('whats up with this??');

                    $mdBottomSheet.show({
                        controllerAs: "vm",
                        controller: ['$mdBottomSheet', ContactSheetController],
                        templateUrl: 'components/content/contactsheet.html',
                        parent: angular.element(document.getElementById('content'))
                    });

                    /**
                     * Bottom Sheet controller for the Avatar Actions
                     */

                    function ContactSheetController($mdBottomSheet) {

                        this.lesson = selectedLesson;

                        this.items = [
                            { name: 'Facebook', icon: 'facebook', icon_url: 'assets/svg/facebook-box.svg', link: this.lesson.facebookUrl },
                            { name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter-box.svg', link: this.lesson.twitterUrl },
                            { name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google-plus-box.svg', link: this.lesson.googleplusUrl }
                        ];
                        this.contactLesson = function(action) {

                            $mdBottomSheet.hide(action);
                        };
                    }
                }



            }
        })
}());
