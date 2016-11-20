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

                // Load all registered Lessons

                lessonService
                    .loadAllLessons()
                    .then(function(lessons) {
                        self.lessons = [].concat(lessons);
                        self.selected = lessons[0];
                    });

                // Listen for boradcast of select lesson to show content
                // $scope.$on('selectLesson', function(event, lesson) {

                //     self.selected = lesson;
                // });

                //self.selected = ll.selected;

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
