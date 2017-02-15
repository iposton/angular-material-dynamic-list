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
                controllerAs: "lc"
            }

            function contentCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope, $mdDialog) {

                var self = this;
                // DEFINE FUNCTIONS
                self.makeContact = makeContact;
                self.incrementVotes = incrementVotes;
                // GET FIREBASE DATA
                self.lessons = lessonService.ref;

                // GLOBAL VARS FOR INCEMENT FUNCTION
                var voted = true;
                var votedValue = null;

                function incrementVotes(selected, vote) {

                    if (vote === selected.like) {
                        selected.like += 1;
                        self.lessons.$save(selected);
                        votedValue = 'like';

                    } else {
                        selected.dislike += 1;
                        self.lessons.$save(selected);
                        votedValue = 'dislike';
                    }

                    selected.voted = voted;
                    selected.votedValue = votedValue;
                }

                function makeContact(selectedLesson) {

                    $mdBottomSheet.show({
                        controllerAs: "vm",
                        controller: ['$mdBottomSheet', ContactSheetController],
                        templateUrl: 'components/contactSheet.html',
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
