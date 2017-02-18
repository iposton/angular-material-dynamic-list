# My Lessons - <a href="https://my-lessons.herokuapp.com/">Demo</a> <a href="https://codeclimate.com/github/iposton/angular-material-dynamic-list"><img src="https://codeclimate.com/github/iposton/angular-material-dynamic-list/badges/gpa.svg" /></a>
This is a single page app which is a dynamic list showing my favorite websites that offer coding lessons.  

### Description
This [application](https://my-lessons.herokuapp.com/) is made with angular.js (version 1.5.8) and the most current version of angular-material. This SPA app is hosted for free on heroku (cloud application platform). The data is served by firebase which is a cloud based db. In this readme I will give you step by step how to deploy an angular app to heroku and add your data to firebase. Then I will instruct how to consume the api within your angular app. This app uses the most modern way to build angular apps by using components/directives in the index.html to keep your code organized.

Why this app may be worth following along. It's a nice way to share a list of content without having to scroll. A compact easy user experience worth displaying a list of your favorite bands, or books, or favorite inventors. You will learn how to use angular and make directives.

### You can learn this
* Create angular directives for a clean modular app structure.
* How to create Firebase User for authentication to protect writing data to the db.   
* Create, Udate, and Delete data using angulat-material $mdDialog (SPA approach). 
* Allow 1 like or dislike per session.
* Customize the twitter share button to pull in selected data.   

This app is for beginners to make an app and host it for free so that the app is able to be shared with the world. It's fun! 

### Software used for this application
* angular.js (version 1.5.8)   
* Firebase [Set up a free account ](https://firebase.google.com/) 
* [angular-material](version master)
* [drop-ng](https://github.com/stevenh77/drop-ng)
* Heroku [Set up a free account ](https://www.heroku.com/)

### Clone and serve this app
You could simply clone this repo and run <code>npm install</code> and <code>bower install</code> then run <code>npm start</code> to serve the app on localhost, but there would be no data to show unless you setup a firebase endpoint. Add json array with data like this below in someService.js and change the lessons array in controller.js to <code>self.data = someService.data;</code> also comment out the firebase ref until it's setup. See firebase setup below.  

```js
   
   //someService.js

   var data = [
    {
      id: 0,
      name: 'Egghead.io',
      avatar: 'assets/img/egghead.jpg',
      content: 'Egghead.io is a good place to learn angular.js, javascript, and much more. I highly recommend a yearlong subscription for pro access.',
      twitterUrl: 'https://twitter.com/eggheadio',
      facebookUrl: 'https://www.facebook.com/eggheadio',
      googleplusUrl: 'https://plus.google.com/+EggheadIo',
      websiteUrl: 'https://egghead.io/',
      like: 0,
      dislike: 0
    },
    {
      id: 1,
      name: 'Udemy',
      avatar: 'assets/img/udemy.jpg',
      content: 'There are some really great web development courses here on udemy. Search for any specific programming language or framework and they provide several useful options. I use udemy to learn angular, javascript, and full-stack web development.',
      twitterUrl: 'https://twitter.com/udemy?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
      facebookUrl: 'https://www.facebook.com/udemy/',
      googleplusUrl: 'https://plus.google.com/105747040663578953977',
      websiteUrl: 'https://www.udemy.com/courses/',
      like: 0,
      dislike: 0
    },
    {
      id: 2,
      name: 'Edx.org',
      avatar: 'assets/img/edx-logo-header.png',
      content: "I made my first stop here to take a deep dive into computer science. Here you can follow along with a class taught at Harvard. Not a bad deal if you ever thought you had to wait to be excepted to learn at this level.",
      twitterUrl: 'https://twitter.com/edXOnline',
      facebookUrl: 'https://www.facebook.com/edX',
      googleplusUrl: 'https://plus.google.com/+edXOnline',
      websiteUrl: 'https://www.edx.org/',
      like: 0,
      dislike: 0
    },
    {
      id: 3,
      name: 'Free Code Camp',
      avatar: 'assets/img/freecodecamp.png',
      content: 'Free Code Camp is a great place to get started on coding fundamentals. It has a robust community with a lot of helpful resources. The founder Quincy provides a great weekly newsletter and it is worth it to subscribe.',
      twitterUrl: 'https://twitter.com/FreeCodeCamp?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
      facebookUrl: 'https://www.facebook.com/freecodecamp/',
      googleplusUrl: 'https://plus.google.com/+Freecodecamp',
      websiteUrl: 'https://www.freecodecamp.com/',
      like: 0,
      dislike: 0
    }
  ];

``` 


### Heroku Deploy 
After you <code>git push</code> to your repo follow the steps below. Assuming you have a heroku account and installed the heroku toolbelt. 
<ol>
  <li>run <code>heroku log in</code></li>
  <li>run <code>heroku create name-of-app</code></li>
  <li>run <code>git push heroku master</code></li>
  <li>If deploy successful run <code>heroku open</code></li>
  If there were problems during deploy and you are trying this from scratch here are some requirements heroku needs to deploy.
  <li>have all the client js modules in bower.json and in the json file have this line <code>"resolutions": {
    "angular": "^1.5.8"
  }</code> below dependencies.</li>
  <li>make a Procfile and have this line <code>web: node server.js</code></li>
  <li>make a server.js file in root and heroku needs this line <code>var port = process.env.PORT || 8082;</code> to set the port.</li>
</ol>

### Firebase Add Data from App 
Move data to firebase...
<ol>
  <li>click create new project button once signed into Firebase and name your project.</li>
  <li>from the overview dashboard of the project click on database in the side-nav.</li>
  <li>in the data tab view you'll see a link icon with the ref next to it. it will look like this <code>https://new-project.firebaseio.com/</code> Copy this url to use as the ref in your code.</li>
  <li>In the index.html you will need to add the firebase script tag and angularfire script tag. See html block below this list for script tags.</li>
  <li>Add 'firebase' as a dependency to your app's module.</li>
  <li>Then in your service.js file add '$firebaseArray' as a dependency. this is where you will add the ref to your db.</li>
  <li>Inside the service function use this to define the ref and return a promise to pipe data into the controller.</li> 
  <li>Then in the controller add the service as a dependency, call the loadLessons function and pass in data. Then use this line to add the data to the firebase db.</li>
  <li>Then you can pull in the data from firebase and consume the data by defining a variable equal to the firebase ref <code>$scope.data = someService.ref</code></li>
</ol>

```html

  <!-- index.htlm -->
  <script src="https://cdn.firebase.com/v0/firebase.js"></script>
  <script src="https://cdn.firebase.com/libs/angularfire/1.2.0/angularfire.min.js"></script>

``` 

  ```js
     
    //someService.js  

    var ref = new Firebase('https://new-project.firebaseio.com/');

    var data = [all the json data here]; 

    return {
    ref: $firebaseArray(ref),
    loadAllLessons: function() {
      // Simulate async nature of real remote calls
      return $q.when(data);

    }
  };

  ```
  ```js

     //controller.js 

     lessonService.loadAllLessons().then(function(data) {

            angular.forEach(data, function(item) {
                lessonService.ref.$add(item);
            })

        });

  ```

***

###Problems/Solutions
How to make the first item selected on load. The content is shown based on which item in the side-nav is selected. This is data-binding so that the data in one component can be shown in the other component. I was able to add the first item to selected to show when the page is loaded but it was static and when I add the like/dislike feature I needed a better way to select the first item in the side-nav. I needed to click the side-nav as the page loaded. This directive was very helpful. 

```js

.directive('onLoadClicker', function ($timeout) {
                return {
                    restrict: 'A',
                    scope: {
                        index: '=index'
                    },
                    link: function($scope, iElm) {
                        if ($scope.index === 0) {
                            $timeout(function() {

                                iElm.triggerHandler('click');

                            }, 0);
                        }
                    }
                };
            });

```

```html

<!-- main-container.html -->

<a class="md-button" id="btn" ng-click="ll.selectLesson(l); ll.setActive(l, ll.lessons)" ng-class="{active: l.active}" on-load-clicker index="$index">click selection</a>

```
I am passing in the index so that I can specify in the directive to only click the first item in the array of the ng-repeat otherwise it would click them all. This way I get active content that is dynamic and ready to be called to action. Hence likes or dislikes will be saved to the db. 

In this app I had to allow for read and write access to my db to allow for like/dislike increments. Firebase security defaults this to read and write authentication required. This app does not authenticate users so I had to bypass this security check. If you do it will allow for anyone to write to your data using the firebase ref. So beware if you follow this same route I took. In my case this is just a fun app that doesn't have anything sensitive in it so I'm not worried about security. Besides if somebody wrote data to it I would just cancel it and make a new ref. 

Adding the environment variable for firebase ref. I didn't want to share my firebase ref in my repo so I added env_var for heroku to use. I stored the ref in my heroku app by going to the app settings in my heroku dashboard. Click on Config Variables and add the key value there. It will be secured safely away from human view. You can call it to the client side by adding this code to the server.js file. I called my env_var for firebase FIREBASE_URL and made the value the firebase ref url form my db. 


```js

  //server.js 

  app.get('/firebaseurl.js', function(req, res){
    res.send("var FIREBASE_URL='"+process.env.FIREBASE_URL+"'");
  });


```
I created a dummy link to firebaseurl.js in my index.html even though the file doesn't exist. This pulls the env_var into my app so I can use it on the client side in my service. 

```html

  <!-- index.html -->
  <script src="/firebaseurl.js"></script>

```

```js

  //service.js

  var ref = new Firebase(FIREBASE_URL);

```

###Features
####Like/Dislike Feature
I added two features I am very proud of. I wanted to add a like/dislike feature so that people visiting this app can interact with the data. It's a simple incrementing function that adds one when the button is clicked then it's saved in the db. It's not perfect I would need to add authentication to limit each user to one click per item, but it is still is a fun feature. 
####Popover Feature
The other feature is a popover that displays a name and the link to this repo. I used a module called [drop-ng](https://github.com/stevenh77/drop-ng). This is a directive that uses the tether.js library and makes it compatible with angular. It was easy to set up and use in the app. 
####Twitter Share Feature
Twitter share button. I used a plugin for this. I added the module script tag to index.html and used the directive in the content.html. An easy way to allow others to share your work on social media. 

```html

<!-- index.htlm -->
<script src="https://platform.twitter.com/widgets.js"></script>

<!-- content.html -->
<a twitter data-text="{{tweet}}" data-url="https://name-of-app.herokuapp.com/" style="position:absolute; bottom:5px; right:5px;"></a>
 
``` 
### New Features February 2017
####Create Firebase User for authentication 
* Create a firebase user by going to your firebase console and in the sidenav under Develop click on the <code>Authentication</code> option. 
* In Authentication go to the SIGN-IN METHOD tab and enable Email/Password. 
* Then click on USERS tab and click ADD USER button. Enter an email and password.
* You can authenticate the user on the client side with this html and login function. 

```html

<section ng-if="!vm.currentUser" class="md-form">
    <md-input-container layout-align="end center">
        <label>Email</label>
        <input ng-model="vm.newUser.email" type="email">
    </md-input-container>
    <md-input-container layout-align="end center">
        <label>Password</label>
        <input ng-model="vm.newUser.password" type="password">
    </md-input-container>
    <md-button class="md-raised md-primary" ng-click="vm.login(vm.newUser.email, vm.newUser.password)">Log In</md-button>
</section>
 
```

```js

  function login(email, password) {

            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + ' ' + errorMessage);
                    // ...
                })
                .then(function(user) {
                    self.currentUser = user;
                    self.resetForm();
                    $mdDialog.hide();
                })
        }
 
```

* The key here is <code>firebase.auth().signInWithEmailAndPassword(email, password)</code> This specifically talks to firebase. Now there is a currentUser object that can be used to show/hide add/edit/delete data features in the client.

* To get the firebase keyword to work some code needed to be updated to initialize firebase in my app. In your firebase console under Authentication there is a WEB SETUP button where to find the special keys to your firebase db. It should look like this. 

```js

    var config = {
            apiKey: API_KEY,
            authDomain: AUTH_DOM,
            databaseURL: FIREBASE_URL,
            storageBucket: STRG_BUCKET,
            messagingSenderId: MSG_SND_ID
            };
           firebase.initializeApp(config);
 
```

* I updated my firebase library by adding these scripts to index.html.

```html

    <script src="https://cdn.firebase.com/js/client/2.3.2/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/3.6.7/firebase.js"></script>
 
```




####Create, Update, and Delete data using angular-material $mdDialog.
* Create new data then save to your firebase db with this html and add new data function. 

```html

  <!-- addNewDataModal.html -->
  <md-toolbar>
      <h2 class="md-toolbar-tools">Add Data</h2>
  </md-toolbar>
  <md-content layout-padding>
      <form>
        <md-input-container class="md-block">
            <label for="name">Name</label>
            <input type="text" id="name" ng-model="vm.data.name" md-autofocus>
        </md-input-container>
        <md-input-container class="md-block">
            <label for="avatar">Link to image</label>
            <input type="text" id="avatar" ng-model="vm.data.avatar">
        </md-input-container>
        <md-input-container class="md-block">
            <label for=""></label>
            <textarea type="text" id="content" ng-model="vm.data.content">Content</textarea>
        </md-input-container>
       
        <section layout="row">
            <md-button class="md-raised md-button md-ink-ripple" ng-click="vm.saveData(vm.data)">Save</md-button>
        </section>
        
      </form>
  </md-content>
 
```

```js

    //addDataCtrl.js
    // Add a new data
    function savedata(data) {
        firebase.ref.$add(data);
    }
 
```

* Use $mdDialog to add data with this html and function. 

```html

    <!-- addNewData.html -->
    <a class="md-button" id="btn" ng-click="vm.showNew($event)">+ Add Data</a>
 
```

```js

      //addDataCtrl.js
      // For $mdDialog
      var parentEl = angular.element(document.body);

       function showNew($event) {
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'addNewDataModal.html',
                preserveScope: true,
                controller: addDataCtrl,
                controllerAs: 'vm'
            });
        }
 
```

* Edit data then save to your firebase db with this html and add new data function.

```html

  <!-- editModal.html -->
  <md-toolbar>
      <h2 class="md-toolbar-tools">Add Data</h2>
  </md-toolbar>
  <md-content layout-padding>
      <form>
        <md-input-container class="md-block">
            <label for="name">Name</label>
            <input type="text" id="name" ng-model="vm.selected.name" md-autofocus>
        </md-input-container>
        <md-input-container class="md-block">
            <label for="avatar">Link to image</label>
            <input type="text" id="avatar" ng-model="vm.selected.avatar">
        </md-input-container>
        <md-input-container class="md-block">
            <label for=""></label>
            <textarea type="text" id="content" ng-model="vm.selected.content">Content</textarea>
        </md-input-container>
       
        <section layout="row">
            <md-button class="md-raised md-button md-ink-ripple" ng-click="vm.saveEdit(vm.selected)">Save Edit</md-button>
        </section>
        
      </form>
  </md-content>
 
```

```js

       //editDataCtrl.js
       function saveEdit(data) {
          self.id = data.$id
          self.editedLesson = self.lessons.$getRecord(self.id);
          self.lessons.$save(self.editedLesson);
        }
 
```

* The trick to editing data is I stored a data object from the ng-repeat and called it selected. Then I was able to see the data in the form and change the data then call the saveEdit function. 

```html

  <!-- mainContainer.html -->
  <!-- Get Selected Data -->
   <md-list-item ng-repeat="d in vm.data">
        <a class="md-button" id="btn" ng-click="vm.selectData(d);">
             {{d.someItem}}
        </a>
  </md-list-item>

  <!-- Pass selected data to edit directive -->
  <edit-lesson selected="vm.selected" currentuser="currentuser"></edit-lesson>

```

```js

       //mainCtrl.js
       function selectLesson(data) {
          self.selected = data;
          
      }
 
```

* To pull this off in an $mdDialog modal was tricky. I was able to pass selected into the modal like this.

```html

  <!-- editData.html -->
   <md-button class="md-raised md-button md-ink-ripple" ng-click="vm.showEdit($event, selected)">
        Edit
  </md-button>

```

```js

       //editCtrl.js
          function showEdit($event, selected) {

                    $mdDialog.show({

                        locals: {
                            data: selected
                        },
                        controller: ['$scope', 'lesson', 'dataService', function($scope, data, dataService) {
                            var self = this;

                            //Now selected is ready for the modal view to edit it
                            self.selected = data;

                            // Define var for modal ctrl
                            self.id = null;

                            //GET DATA FROM FIREBASE
                            self.data = dataService.ref;

                            // DEFINE MODAL CONTROLLER FUNCTIONS
                            self.saveEdit = saveEdit;
                            self.clearForm = clearForm;

                            function saveEdit(update) {
                                
                                self.id = update.$id
                                self.editedData = self.lessons.$getRecord(self.id);
                                self.lessons.$save(self.editedData);
                                // Hide the modal after save
                                $mdDialog.hide();

                            }

                        }],
                        controllerAs: 'vm',
                        parent: parentEl,
                        targetEvent: $event,
                        templateUrl: 'components/edit-lesson/editLessonModal.html',

                    });

                }
 
``` 

* I made a controller for this modal and passed the selected data so it could be used in the modal and saved to the firebase.ref from the modal. Also notice I am passing in <code>$id</code> of the editedData object before saving. That $id is the funny id firebase assigns to each data object it will look somelike this <code>-KXx-NpXOL9pppppxxLxxx</code> This is so I update the existing data with that specific id in my firebase ref. 

* Delete data with this html and function. 

```html
    
    <md-button class="md-raised md-button md-ink-ripple md-warn" ng-click="vm.deleteData($event, selected)">
        Delete
    </md-button>

```

```js

            function deleteData(event, data) {
                    var confirm = $mdDialog.confirm()
                        .title("Are you sure you want to delete " + data.someItem + "?")
                        .ok("Yes")
                        .cancel("No")
                        .targetEvent(event);
                    $mdDialog.show(confirm).then(function() {
                        firebase.ref.$remove(data);
                        
                    }, function() {
                      // error msg here
                    });
                }


```

* I am passing in the selected data again and then calling <code>$remove</code> from the firebase ref.

####Prevent like dislike clicks per session
* This feature is to prevent a user from clicking multiple times per session. I created 2 attributes to be added to the data object that would then allow me to disable the buttons after one of the buttons had been selected and give a friendly message. It will disable the buttons until the page is refreshed. So It won't stop a user from voting again but it will require doing extra work to keep users from abusing the voting option. I can't block a user to one vote unless I have an auth token for that user and this app is not set up to auth users so this is a little trick I used to prevent too many clicks at once. It works well for this fun app. 

```html
    
    <!-- If voted true then disabled buttons with nice message -->
    <div>
      <md-button md-no-ink aria-label="Share with {{selected.name}}" ng-disabled="selected.voted" ng-click="vm.incrementVotes(selected, selected.like)">
          <md-icon md-svg-icon="thumbsup"></md-icon> Like {{selected.like}}
      </md-button>
      <md-button md-no-ink aria-label="Share with {{selected.name}}" ng-disabled="selected.voted" ng-click="vm.incrementVotes(selected, selected.dislike)">
          <md-icon md-svg-icon="thumbsdown"></md-icon> Dislike {{selected.dislike}}
      </md-button>
      <p class="vote-text">{{selected.message}} </p>
    </div>

```

```js

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
                }


```

* When I add <code>selected.voted = self.voted = true;</code> I can use the built in angular directive <code>ng-disabled</code> on the button to disable the button after the click. It will only disable the buttons of the selected object. I also add a nice message to the selected object to avoid the message showing on all the data generated from the ng-repeat of the firebase ref array.  

####Customize the twitter button to pull in selected data.

* I created a twitter directive that would use Angular's $watch expression to see if the share button text had changed depending on which item in my data is selected. If the tweet changes the directive has to remove the old share button and create a new one. 

```html
    
  <div>
    <a twitter data-text="{{tweet}}" data-url="https://your-app/" style="float: right"></a>
  </div>

```

```js

       //Define the tweet and get it when the data is selected
       function getTweet() {
          self.tweet = "Check out " + self.selected.name + " at " + self.selected.websiteUrl +;
        }

        //Twitter share directive 
        .directive('twitter', [
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


```

Note: Keep checking back in as I will add some more features to this app.

###References
The angular-material course on egghead. [https://egghead.io/lessons/angularjs-angular-material-installing-with-npm](https://egghead.io/lessons/angularjs-angular-material-installing-with-npm)
Ultimate AngularJS: Build a Real-World App from Scratch. [https://www.udemy.com/ultimate-angularjs-course/](https://www.udemy.com/ultimate-angularjs-course/)
Authenticate with Firebase using Password-Based Accounts [https://firebase.google.com/docs/auth/web/password-auth](https://firebase.google.com/docs/auth/web/password-auth)



####[My Lessons](https://my-lessons.herokuapp.com/)