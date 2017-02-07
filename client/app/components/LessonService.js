'use strict';

angular.module('lessons')
.service('lessonService', ['$q', '$http', '$firebaseArray', LessonService])

// Lessons DataService
function LessonService($q, $http, $firebaseArray) {

  var config = {
            apiKey: API_KEY,
            authDomain: AUTH_DOM,
            databaseURL: FIREBASE_URL,
            storageBucket: STRG_BUCKET,
            messagingSenderId: MSG_SND_ID
            };
           firebase.initializeApp(config);
 
  var ref = new Firebase(FIREBASE_URL);
 
  // Promise-based API
  return {
    ref: $firebaseArray(ref),
    loadAllLessons: function() {
      // Simulate async nature of real remote calls
      return $q.when(lessons);

    }
 };
}
