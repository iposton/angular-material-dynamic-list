# My Lessons - <a href="https://my-lessons.herokuapp.com/">Demo</a>
<a href="https://codeclimate.com/github/iposton/angular-material-dynamic-list"><img src="https://codeclimate.com/github/iposton/angular-material-dynamic-list/badges/gpa.svg" /></a> This is a single page app which is a dynamic list showing my favorite websites that offer coding lessons.  

### Description
This [application](https://my-lessons.herokuapp.com/) is made with angular.js (version 1.5.8) and the most current version of angular-material. This SPA app is hosted for free on heroku. The data is served by firebase which is a cloud based db. In this readme I will give you step by step how to deploy an angular app to heroku and add your data to firebase. Then I will instruct how to consume the api within your angular app. This app uses the most modern way to build angular apps by using components/directives in the index.html to keep your code organized. 

This app is for beginners to make an app and host it for free so that the app is able to be shared with the world. It's fun! 

### Software used for this application
* angular.js (version 1.5.8)   
* Firebase [Set up a free account ](https://firebase.google.com/) 
* [angular-material](version master)
* [drop-ng](https://github.com/stevenh77/drop-ng)
* Heroku [Set up a free account ](https://www.heroku.com/)

### Clone and serve this app
You could simply clone this repo and run <code>npm install</code> and <code>bower install</code> then run <code>npm start</code> to serve the app on localhost, but there would be no data to show unless you setup a firebase endpoint. Add json array with data like this below in LessonService.js and change the lessons array in LessonController.js to <code>self.lessons = someService.lessons;</code> also comment out the firebase ref until it's setup. See firebase setup below.  

```js
   
   //someService.js

   var lessons = [
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
After you <code>git push</code> to your repo follow steps below. Assuming you have a heroku account. 
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
  <li>In the index.html you will need to add <code> <script src="https://cdn.firebase.com/v0/firebase.js"></script></code> and <code> <script src="https://cdn.firebase.com/libs/angularfire/1.2.0/angularfire.min.js"></script> </code> </li>
  <li>Add 'firebase' as a dependency to your app's module.</li>
  <li>Then in your service.js file add '$firebaseArray' as a dependency. this is where you will add the ref to your db.</li>
  <li>Inside the service function use this to define the ref and return a promise to pipe data into the controller.</li> 
  <li>
    ```js
     
    //someService.js  

    var ref = new Firebase('https://new-project.firebaseio.com/');

    var lessons = [all the json data here]; 

    return {
    ref: $firebaseArray(ref),
    loadAllLessons: function() {
      // Simulate async nature of real remote calls
      return $q.when(lessons);

    }
  };

  ```
</li>
  <li>Then in the controller add the service as a dependency, call the loadLessons function and pass in data. Then use this line to add the data to the firebase db.</li>
  <li>
     ```js

     controller.js 

     lessonService.loadAllLessons().then(function(lessons) {

            angular.forEach(lessons, function(item) {
                lessonService.ref.$add(item);
            })

        });

  ```
</li>

 
</ol>

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
                        if ($scope.index == 0) {
                            $timeout(function() {

                                iElm.triggerHandler('click');

                            }, 0);
                        }
                    }
                };
            });
```

```
<!-- main-container.html -->

<a class="md-button" id="btn" ng-click="ll.selectLesson(l); ll.setActive(l, ll.lessons)" ng-class="{active: l.active}" on-load-clicker index="$index">click selection</a>

```
I am passing in the index so that I can specify in the directive to only click the first item in the array of the ng-repeat otherwise it would click them all. This way I get active content that is dynamic and ready to be called to action. Hence likes or dislikes will be saved to the db. 

###Features
Like Dislike feature. Popover feature. 

###Refs
The angular-material course on egghead. drop-ng.


####[My Lessons](https://my-lessons.herokuapp.com/)