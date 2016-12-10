'use strict';

angular.module('lessons')
.service('lessonService', ['$q', '$http', '$firebaseArray', LessonService]);

// Lessons DataService
function LessonService($q, $http, $firebaseArray) {

  var ref = new Firebase('https://my-lessons.firebaseio.com/');

  // Promise-based API
  return {
    ref: $firebaseArray(ref),
    loadAllLessons: function() {
      // Simulate async nature of real remote calls
      return $q.when(lessons);

    }
 };
}
