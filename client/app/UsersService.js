'use strict';

angular.module('users')
.service('userService', ['$q', UserService]);

// Users DataService
function UserService($q){
  var users = [
    {
      name: 'Egghead.io',
      avatar: 'img/egghead.jpg',
      content: 'Egghead.io is a good place to learn angular.js, javascript, and much more. I highly recommend a yearlong subscription for pro access.',
      twitterUrl: 'https://twitter.com/eggheadio',
      facebookUrl: 'https://www.facebook.com/eggheadio',
      googleplusUrl: 'https://plus.google.com/+EggheadIo',
      websiteUrl: 'https://egghead.io/'
    },
    {
      name: 'Udemy',
      avatar: 'img/udemy.jpg',
      content: 'There are some really great web development courses here on udemy. Search for any specific programming language or framework and they provide several useful options. I use udemy to learn angular, javascript, and full-stack web development.',
      twitterUrl: 'https://twitter.com/udemy?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
      facebookUrl: 'https://www.facebook.com/udemy/',
      googleplusUrl: 'https://plus.google.com/105747040663578953977',
      websiteUrl: 'https://www.udemy.com/courses/'
    },
    {
      name: 'Edx.org',
      avatar: 'img/edx-logo-header.png',
      content: "I made my first stop here to take a deep dive into computer science. Here you can follow along with a class taught at Harvard. Not a bad deal if you ever thought you had to wait to be excepted to learn at this level.",
      twitterUrl: 'https://twitter.com/edXOnline',
      facebookUrl: 'https://www.facebook.com/edX',
      googleplusUrl: 'https://plus.google.com/+edXOnline',
      websiteUrl: 'https://www.edx.org/'
    },
    {
      name: 'Free Code Camp',
      avatar: 'img/freecodecamp.png',
      content: 'Free Code Camp is a great place to get started on coding fundamentals. It has a robust community with a lot of helpful resources. The founder Quincy provides a great weekly newsletter and it is worth it to subscribe.',
      twitterUrl: 'https://twitter.com/FreeCodeCamp?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
      facebookUrl: 'https://www.facebook.com/freecodecamp/',
      googleplusUrl: 'https://plus.google.com/+Freecodecamp',
      websiteUrl: 'https://www.freecodecamp.com/'
    },

    {
      name: 'Javascript Weekly',
      avatar: 'img/jsdaily.jpg',
      content: 'JS Weekly is a very thorough web development news-letter! Just subscribe and look for the awesome tutorials listed in the weekly emails.',
      twitterUrl: 'https://twitter.com/JavaScriptDaily',
      facebookUrl: 'https://www.facebook.com/cooperpress',
      googleplusUrl: 'https://plus.google.com/communities/100875929141897651837',
      websiteUrl: 'http://javascriptweekly.com/'
    },
    {
      name: 'Hungry Turtle Code',
      avatar: 'img/Hungry_Turtle.png',
      content: "Hungry Turtle Code is a fantastic place to take some free advanced full-stack programming courses! I learned how to get started using the material-lite library taught by the instructor at HT.",
      twitterUrl: 'https://twitter.com/hungryturtledev/',
      facebookUrl: 'https://www.facebook.com/hungryturtlecode/',
      googleplusUrl: 'https://plus.google.com/u/0/+Hungryturtledev',
      websiteUrl: 'https://hungryturtlecode.com/'
    }
  ];

  // Promise-based API
  return {
    loadAllUsers : function() {
      // Simulate async nature of real remote calls
      return $q.when(users);
    }
  };
}
