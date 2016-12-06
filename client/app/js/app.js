 angular.module('MyApp', ['ngMaterial', 'lessons', 'firebase'])
     .config(function($mdIconProvider, $mdThemingProvider) {

         $mdIconProvider.icon('share', '../assets/svg/share.svg', 24)
             .icon("menu", "../assets/svg/menu.svg", 24)
             .icon("google_plus", "../assets/svg/google-plus-box.svg", 24)
             .icon("twitter", "../assets/svg/twitter-box.svg", 24)
             .icon("facebook", "../assets/svg/facebook-box.svg", 24)
             .icon("thumbsup", "../assets/svg/thumb-up.svg", 24)
             .icon("thumbsdown", "../assets/svg/thumb-down.svg", 24);

         $mdThemingProvider.theme('default')
             .primaryPalette('brown')
             .accentPalette('red');

     }).directive('twitter', [
    function() {
        return {
            link: function(scope, element, attr) {
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
        }
    }
]);
     
