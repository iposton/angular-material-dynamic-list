(function() {
    'use strict';
    angular.module('lessons')

    .config(function($sceProvider) {
        // ngMaterial $mdIconProvider will be updated  to mark urls as safe.
        // Meanwhile, disable $sce for ngMaterial CodePen Demos that using external SVGs
        $sceProvider.enabled(false);
    })

    .controller('LessonController', ['lessonService', '$mdBottomSheet', '$mdSidenav', '$log', LessonController]);

    function LessonController(lessonService, $mdBottomSheet, $mdSidenav) {
        var self = this;

        self.selected = null;
        self.lessons = [];
        self.selectLesson = selectLesson;
        self.makeContact = makeContact;
        self.toggleLessonList = toggleLessonList;
        self.setActive = setActive;

        // Load all registered Lessons

        lessonService
            .loadAllLessons()
            .then(function(lessons) {
                self.lessons = [].concat(lessons);
                self.selected = lessons[0];
            });

        /**
         * Select the current avatars
         * @param menuId
         */

        function toggleLessonList($event) {
            $mdSidenav('left').toggle();
            $mdBottomSheet.hide($event);
        }

        function selectLesson(lesson) {
            self.selected = lesson;
            $mdBottomSheet.hide(self.selected);
        }

        function setActive(item, list) {
            list.some(function(item) {
                if (item.active) {
                    return item.active = false;
                }
            });
            item.active = true;
        };

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
})();
