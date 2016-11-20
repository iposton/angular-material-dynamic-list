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
        self.toggleLessonList = toggleLessonList;
        

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

    }
})();
