(function() {
    'use strict';
    angular.module('lessons')

    .config(function($sceProvider) {
        // ngMaterial $mdIconProvider will be updated  to mark urls as safe.
        // Meanwhile, disable $sce for ngMaterial CodePen Demos that using external SVGs
        $sceProvider.enabled(false);
    })

    .controller('LessonController', ['lessonService', '$mdBottomSheet', '$mdSidenav', '$scope', LessonController]);

    function LessonController(lessonService, $mdBottomSheet, $mdSidenav, $scope) {

        var self = this;

        self.selected = null;
        self.lessons = [];
        self.toggleLessonList = toggleLessonList;

        self.lessons = lessonService.ref;
       
                    //  lessonService.loadAllLessons().then(function(lessons) {

                    //     angular.forEach(lessons, function(item) {
                    //         lessonService.ref.$add(item);
                    //     })

                    // });
        
       

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
