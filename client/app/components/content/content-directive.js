(function() {
    "use strict";

    angular
        .module("lessons")
        .directive("content", function() {
            return {
                templateUrl: "components/content/content.html",
                scope: {
                    selected: '=selected'
                },
                controller: contentCtrl,
                controllerAs: "lc"
            }

            function contentCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope) {

                var self = this;

                self.selected = null;
                self.lessons = [];
                self.makeContact = makeContact;
                self.incrementLikes = incrementLikes;
                self.incrementDislikes = incrementDislikes;


                $scope.tweet = "The Sweetest websites that provide coding lessons! Go code now!"

                self.lessons = lessonService.ref;

                function incrementLikes(selected) {
                    selected.like++;

                    self.lessons.$save(selected);
                    // console.log('saving like for ' + selected.name + ' ' + selected.like);


                }

                function incrementDislikes(selected) {
                    selected.dislike++;

                    self.lessons.$save(selected);
                    // wconsole.log('saving like for ' + selected.name + ' ' + selected.dislike);
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
        });
})();
