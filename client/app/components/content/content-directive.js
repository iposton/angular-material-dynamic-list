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
                controllerAs: "vm"
            }

            function contentCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope, $mdDialog, $mdToast, $http, $mdPanel, $compile, $timeout) {

                var self = this;

                self.message = null;
                self.isLoading = true;

                // DEFINE FUNCTIONS
                self.makeContact = makeContact;
                self.incrementVotes = incrementVotes;
                self.showToast = showToast;
                self.showMenu = showMenu;
                self.showMenuPc = showMenuPc;
                self.showFeed = showFeed;

                // GET THE DATA FROM PRODUCTHUNT API 
                $http.get('/producthunt')
                    .then(function(response) {
                        
                        self.day = null;
                        self.products = response.data;
                        
                        angular.forEach(self.products, function(day) {
                            self.day = day[0].day;
                            
                        })
                    })
                    .catch(function(error) {
                        console.error("Error with GET request", error);  
                    });

                    // $http.get('https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1318/explicit=true/xml')
                    // .then(function(response) {
                        
                    //     console.log(JSON(response.data));
                    //     //self.podcastsData = response.data;

                    // })
                    // .catch(function(error) {
                    //     console.error("Error with GET request", error);  
                    // });
$scope.url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=8/genre=1318/explicit=true/xml';
    $scope.count = 8;
    $scope.summary = false;
    function showFeed (ev) {
      self.isLoading = false;
      var $panelBody = $('.panel-body');
      $panelBody.html('');
      var feedHTML = "<feed url='" + $scope.url + "' count='" + $scope.count + "' summary='" + $scope.summary + "'/>";
      $panelBody.append($compile(feedHTML)($scope));
    };

    // var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    // $scope.isOrigin = function (){
    //   return window.parent.location.href.indexOf(url) === -1;
    // };

    

//     $timeout(function(){
//   console.log("show after directive partial loaded")
//   $scope.showFeed();
// }, 3000);

                // $http.jsonp('https://itunes.apple.com/search', { params: { term: 'Technology', entity: 'podcast', callback: 'JSON_CALLBACK' } }).success(function (response) { //console.log(response) 
                // });

                
                // SHOW DATA IN MENU
                function showMenu(ev) {
                    var position = $mdPanel.newPanelPosition()
                        .relativeTo('.ph-fab')
                        .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);
                    var config = {
                        attachTo: angular.element(document.body),
                        controller: contentCtrl,
                        controllerAs: 'vm',
                        template:
                            '<div class="demo-menu-example" ' +
                            '     aria-label="Select your favorite dessert." ' +
                            '     role="listbox">' +
                            '<div layout="row" layout-sm="column" layout-align="space-around" ng-if="!vm.products">' +
                            ' <md-progress-linear class="md-warn" md-mode="intermediate"></md-progress-linear>' +
                            '</div>' +
                            '     <h4 ng-if="vm.products">Producthunt\'s\ most voted</h4> ' +
                            '    <h5 ng-if="vm.products">{{vm.day | date:\'fullDate\'}}</h5>' +
                            '  <div class="demo-menu-item" ' +
                            '       ng-class="" ' +
                            '       aria-selected="" ' +
                            '       tabindex="-1" ' +
                            '       role="option" ' +
                            '       ng-click=""' +
                            '       ng-repeat="p in vm.products.posts | orderBy:\'-votes_count\'" ng-if="p.votes_count > 40"' +
                            '       ng-keydown="" ng-if="vm.products">' +
                            '    <a ng-href="{{p.discussion_url}}"><img ng-src="{{p.thumbnail.image_url}}" alt="" class="ph-image"> {{p.name}}</a> <span class="vote-btn">{{p.votes_count}}</span>  ' +
                            '  </div>' +
                            '</div>',
                        position: position,
                        openFrom: ev,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        focusOnOpen: false,
                        zIndex: 2
                    };

                    $mdPanel.open(config);
                    

                }


                // SHOW DATA IN MENU
                function showMenuPc(ev) {
                    self.isLoading = false;
                    var position = $mdPanel.newPanelPosition()
                        .relativeTo('.ph-fab')
                        .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);
                    var config = {
                        attachTo: angular.element(document.body),
                        controller: contentCtrl,
                        controllerAs: 'vm',
                        template:
                            '  <div class="panel-body">' +
                            '  </div>',
                        position: position,
                        openFrom: ev,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        focusOnOpen: false,
                        zIndex: 2
                    };

                    $mdPanel.open(config);
                    $timeout(function(){self.showFeed();}, 50);
                    

                }


  

                // GET FIREBASE DATA
                self.lessons = lessonService.ref;

                $scope.$on('commentSent', function(event, message) {
                    showToast(message);
                });



                function incrementVotes(selected, vote) {
                    var votedValue = null;

                    if (vote === selected.like) {
                        selected.like += 1;
                        self.lessons.$save(selected);
                        votedValue = 'like';


                    } else {
                        selected.dislike += 1;
                        self.lessons.$save(selected);
                        votedValue = 'dislike';

                    }

                    selected.voted = self.voted = true;
                    selected.message = 'You chose to ' + votedValue + ' ' + selected.name + '. Thank you for voting!';
                    var message = selected.message;
                    showToast(message);


                }

                function showToast(message) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(message)
                        .action('OK')
                        .highlightAction(true)
                        .hideDelay(0)
                        .position('bottom right')
                        .parent(angular.element(document.body))
                    );
                }



                function makeContact(selectedLesson) {

                    console.log('whats up with this??');

                    $mdBottomSheet.show({
                        controllerAs: "vm",
                        controller: ['$mdBottomSheet', ContactSheetController],
                        templateUrl: 'components/content/contactsheet.html',
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
