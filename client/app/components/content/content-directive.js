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

            function contentCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope) {

                var self = this;

                self.selected = null;
                $scope.tweet = null;
                self.lessons = [];
                self.makeContact = makeContact;
                self.incrementLikes = incrementLikes;
                self.incrementDislikes = incrementDislikes;
                // GET FIREBASE DATA
                self.lessons = lessonService.ref;


                function incrementLikes(selected) {
                    selected.like++;
                    self.lessons.$save(selected);

                    var voted = true;
                    var votedValue = 'like';
                    selected.voted = voted;
                    selected.votedValue = votedValue;


                }

                function incrementDislikes(selected) {
                    selected.dislike++;
                    self.lessons.$save(selected);

                    var voted = true;
                    var votedValue = 'dislike';
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
