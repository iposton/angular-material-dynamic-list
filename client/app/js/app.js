 angular.module('MyApp', ['ngMaterial', 'lessons', 'firebase', 'drop-ng', 'ngMessages'])
     .config(function($mdIconProvider, $mdThemingProvider) {

         $mdIconProvider.icon('share', '../assets/svg/share.svg', 24)
             .icon("menu", "../assets/svg/menu.svg", 24)
             .icon("google_plus", "../assets/svg/google-plus-box.svg", 24)
             .icon("twitter", "../assets/svg/twitter-box.svg", 24)
             .icon("facebook", "../assets/svg/facebook-box.svg", 24)
             .icon("thumbsup", "../assets/svg/thumb-up.svg", 24)
             .icon("thumbsdown", "../assets/svg/thumb-down.svg", 24)
             .icon("close", "../assets/svg/close.svg", 24)
             .icon("comment", "../assets/svg/comment-text.svg", 24);

         $mdThemingProvider.theme('default')
             .primaryPalette('brown')
             .accentPalette('red');

     }).directive('twitter', [
         function() {
             return {
                 link: function(scope, element, attr) {
                     var i = 0;
                     var idNum = i.toString();

                     scope.$watch('tweet', function(newValue, oldValue) {

                         if (newValue !== oldValue) {
                             // covert i to string for id of twitter share btn
                             idNum = i.toString();
                             // concat i to string for new id when one button is removed
                             var $ = function(id) { return document.getElementById(id); };
                             var twitter = $('twitter-widget-' + idNum);
                            // increment i and remove old twitter share button by id
                             if (oldValue && twitter) {
                                 i += 1;
                                 twitter.remove();

                             }
                             // watch and create new twitter share button when tweet value changes
                             setTimeout(function() {
                                 twttr.widgets.createShareButton(
                                     attr.url,
                                     element[0],
                                     function(el) {}, {
                                         count: 'none',
                                         text: attr.text
                                     }
                                 );

                             });

                         }
                     }, true);

                 }
             }
         }
     ]);
