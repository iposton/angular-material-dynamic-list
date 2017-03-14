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

            function contentCtrl(lessonService, $mdBottomSheet, $mdSidenav, $scope, $mdDialog, $mdToast, $http, $mdPanel) {

                var self = this;

                self.message = null;

                // DEFINE FUNCTIONS
                self.makeContact = makeContact;
                self.incrementVotes = incrementVotes;
                self.showToast = showToast;
                self.showMenu = showMenu;

                
                // SHOW DATA IN MENU
                function showMenu(ev) {
                    var position = $mdPanel.newPanelPosition()
                        .relativeTo('.ph-fab')
                        .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);
                    var config = {
                        attachTo: angular.element(document.body),
                        controller: ProductHuntCtrl,
                        controllerAs: 'vm',
                        template:
                            '<div class="demo-menu-example" ' +
                            '     aria-label="Select your favorite dessert." ' +
                            '     role="listbox">' +
                            '<div layout="row" layout-sm="column" layout-align="space-around" ng-if="!vm.products.posts">' +
                            ' <md-progress-linear class="md-warn" md-mode="intermediate"></md-progress-linear>' +
                            '</div>' +
                            '     <h4 ng-if="vm.products.posts">Producthunt\'s\ most voted</h4> ' +
                            '    <h5 ng-if="vm.products.posts">{{vm.day | date:\'fullDate\'}}</h5>' +
                            '  <div class="demo-menu-item" ' +
                            '       ng-class="" ' +
                            '       aria-selected="" ' +
                            '       tabindex="-1" ' +
                            '       role="option" ' +
                            '       ng-click=""' +
                            '       ng-repeat="p in vm.products.posts | orderBy:\'-votes_count\'" ng-if="p.votes_count > 50"' +
                            '       ng-keydown="" ng-if="vm.products.posts">' +
                            '     <span ng-if="p.votes_count < 50>No products to show.</span>' +
                            '    <a ng-href="{{p.discussion_url}}"><img ng-src="{{p.thumbnail.image_url}}" alt="" class="ph-image"> {{p.name}} has {{p.votes_count}} votes</a>  ' +
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

                function ProductHuntCtrl(mdPanelRef) {
                    
                      // GET THE DATA FROM PRODUCTHUNT API 
                $http.get('../producthunt.json')
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
