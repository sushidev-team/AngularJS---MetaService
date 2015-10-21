# ROUTER-UI METATAGS - AngularJS Service

### Version
0.0.1.0

### Installation

#### Step 1

```sh
$ bower install ambersive-meta
```

#### Step 2
Add the following meta tag to your index.html file.
```sh
<meta ngmeta></meta>
```

#### Step 3
You first have to declare the 'ambersive.meta' module dependency inside your app module (perhaps inside your app main module).
Please be aware, that you need ambersive.helper and ui.router!

```sh
angular.module('app', ['ambersive.meta']);
```
### Useage

```sh

angular.module('app', ['ambersive.meta','ui.router'])
        .config(['$stateProvider','$urlRouterProvider','$metaSettingsProvider',function ($stateProvider,$urlRouterProvider,$metaSettingsProvider) {

            $metaSettingsProvider.setTitle('DEMO');

            $stateProvider
               .state('app', {
                   abstract: true,
                   data: {
                       meta: {
                           'title': 'standard',
                           'description': 'asdf',
                           'twitter':{
                               'title':'TWITTER TITLE'
                           },
                           'facebook':{
                               'title':'FACEBOOK TITLE'
                           }
                       }
                   },
                   views: {
                       'app': {
                           template: '<div ui-view="main"></div>'
                       }
                   }
               })
               .state('app.state1', {
                        parent: 'app',
                        url:'/state1',
                        data: {
                            meta: {
                                'title': 'asdfs'
                            }
                        },
                        views: {
                            'main@app': {
                                template: '<div>state1</div>'
                            }
                        }
                    })
               .state('app.state2', {
                   parent: 'app',
                   url:'/state2',

                   views: {
                       'main@app': {
                           template: '<div>state2</div>'
                       }
                   }
               })
               .state('app.state3', {
                   parent: 'app',
                   url:'/state3',

                   views: {
                       'main@app': {
                           template: '<div>state2</div>',
                           controller:function($rootScope){
                               $rootScope.$broadcast('ngmeta',{
                                   meta: {
                                       'title': 'BROAD'
                                   }
                               });
                           }
                       }
                   }
               });

            $urlRouterProvider.otherwise("/state1");
    }])
   .controller('DemoController',function($scope,$log,$rootScope){

});
```

### Options

Currently numerous options are available. You can set them via $metaSettings Provider (in run() => $metaSettingsProvider).
To update the meta-Tags just Call => MetaSrv.set(object);

```sh
    MetaSrv.set(object);
```

or

```sh
    $rootScope.$broadcast('ngmeta',data);
```

#### Title
```sh
    $metaSettings.setTitle(value);

```


*

License
----
MIT