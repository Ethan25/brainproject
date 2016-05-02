// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
  });
})

.config(function ($stateProvider, $urlRouterProvider) { 
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: false,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.artists', {
            url: '/artists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/artists.html',
                    controller: 'ArtistsCtrl'
                }
            }
        })

        .state('app.artist', {
            url: '/artists/:artist',
            views: {
                'menuContent': {
                    templateUrl: 'templates/artist.html',
                    controller: 'ArtistCtrl'
                }
            }
        })

        .state('app.brains', {
            url: '/brains',
            views: {
                'menuContent': {
                    templateUrl: 'templates/brains.html',
                    controller: 'BrainsCtrl'
                }
            }
        })

        .state('app.brain', {
            url: '/brains/:brain',
            views: {
                'menuContent': {
                    templateUrl: 'templates/brain.html',
                    controller: 'BrainCtrl'
                }
            }
        })

        .state('app.brainquiz', {
            url: '/brainquiz',
            views: {
                'menuContent': {
                    templateUrl: 'templates/brainquiz.html',
                    controller: 'BrainQuizCtrl'
                }
            }
        })

        .state('app.brainquizplay', {
            url: '/brainquiz/:questions',
            views: {
                'menuContent': {
                    templateUrl: 'templates/brainquizplay.html',
                    controller: 'BrainQuizPlayCtrl'
                }
            }
        })

        .state('app.braingame', {
            url: '/braingame',
            views: {
                'menuContent': {
                    templateUrl: 'templates/braingame.html',
                    controller: 'BrainGameCtrl'
                }
            }
        })

      .state('app.account', {
          url: '/account',
          views: {
              'menuContent': {
                  templateUrl: 'templates/account.html',
                  controller: 'AccountCtrl'
              }
          }
      })

        .state('app.patterns0', {
            url: '/patterns0',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/patterns/0.html',
                    controller: 'Patterns0Ctrl'
                }
            }
        })

        .state('app.patterns1', {
            url: '/patterns1',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/patterns/1.html',
                    controller: 'Patterns1Ctrl'
                }
            }
        })

        .state('app.patterns2', {
            url: '/patterns2',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/patterns/0.html',
                    controller: 'Patterns2Ctrl'
                }
            }
        })

        .state('app.patterns3', {
            url: '/patterns3',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/patterns/3.html',
                    controller: 'Patterns3Ctrl'
                }
            }
        })

        .state('app.patterns4', {
            url: '/patterns4',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/patterns/4.html',
                    controller: 'Patterns4Ctrl'
                }
            }
        })

        .state('app.patterns5', {
            url: '/patterns5',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/patterns/5.html',
                    controller: 'Patterns5Ctrl'
                }
            }
        })

        .state('app.patterns6', {
            url: '/patterns6',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/patterns/6.html',
                    controller: 'Patterns6Ctrl'
                }
            }
        })

        .state('app.patterns7', {
            url: '/patterns7',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/patterns/7.html',
                    controller: 'Patterns7Ctrl'
                }
            }
        })

        .state('app.cognition0', {
            url: '/cognition0',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/cognition/0.html',
                    controller: 'Cognition0Ctrl'
                }
            }
        })

        .state('app.cognition1', {
            url: '/cognition1',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/cognition/1.html',
                    controller: 'Cognition1Ctrl'
                }
            }
        })

        .state('app.cognition2', {
            url: '/cognition2',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/cognition/2.html',
                    controller: 'Cognition2Ctrl'
                }
            }
        })

        .state('app.cognition3', {
            url: '/cognition3',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/cognition/3.html',
                    controller: 'Cognition3Ctrl'
                }
            }
        })

        .state('app.cognition4', {
            url: '/cognition4',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/cognition/4.html',
                    controller: 'Cognition4Ctrl'
                }
            }
        })

        .state('app.cognition5', {
            url: '/cognition5',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/cognition/5.html',
                    controller: 'Cognition5Ctrl'
                }
            }
        })

        .state('app.cognition6', {
            url: '/cognition6',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/cognition/6.html',
                    controller: 'Cognition6Ctrl'
                }
            }
        })

        .state('app.cognition7', {
            url: '/cognition7',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/cognition/7.html',
                    controller: 'Cognition7Ctrl'
                }
            }
        })

        .state('app.reflex0', {
            url: '/reflex0',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/reflex/0.html',
                    controller: 'Reflex0Ctrl'
                }
            }
        })

        .state('app.reflex1', {
            url: '/reflex1',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/reflex/1.html',
                    controller: 'Reflex1Ctrl'
                }
            }
        })

        .state('app.reflex2', {
            url: '/reflex2',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/reflex/2.html',
                    controller: 'Reflex2Ctrl'
                }
            }
        })

        .state('app.reflex3', {
            url: '/reflex3',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/reflex/3.html',
                    controller: 'Reflex3Ctrl'
                }
            }
        })

        .state('app.reflex4', {
            url: '/reflex4',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/reflex/4.html',
                    controller: 'Reflex4Ctrl'
                }
            }
        })

        .state('app.reflex5', {
            url: '/reflex5',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/reflex/5.html',
                    controller: 'Reflex5Ctrl'
                }
            }
        })

        .state('app.reflex6', {
            url: '/reflex6',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/reflex/6.html',
                    controller: 'Reflex6Ctrl'
                }
            }
        })

        .state('app.reflex7', {
            url: '/reflex7',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/reflex/7.html',
                    controller: 'Reflex7Ctrl'
                }
            }
        })

        .state('app.memory0', {
            url: '/memory0',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/memory/0.html',
                    controller: 'Memory0Ctrl'
                }
            }
        })

        .state('app.memory1', {
            url: '/memory1',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/memory/1.html',
                    controller: 'Memory1Ctrl'
                }
            }
        })

        .state('app.memory2', {
            url: '/memory2',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/memory/2.html',
                    controller: 'Memory2Ctrl'
                }
            }
        })

        .state('app.memory3', {
            url: '/memory3',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/memory/3.html',
                    controller: 'Memory3Ctrl'
                }
            }
        })

        .state('app.memory4', {
            url: '/memory4',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/memory/4.html',
                    controller: 'Memory4Ctrl'
                }
            }
        })

        .state('app.memory5', {
            url: '/memory5',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/memory/5.html',
                    controller: 'Memory5Ctrl'
                }
            }
        })

        .state('app.memory6', {
            url: '/memory6',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/memory/6.html',
                    controller: 'Memory6Ctrl'
                }
            }
        })

        .state('app.memory7', {
            url: '/memory7',
            views: {
                'menuContent': {
                    templateUrl: 'templates/minigame/memory/7.html',
                    controller: 'Memory7Ctrl'
                }
            }
        })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/brains');
});


