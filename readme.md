# ROUTER-UI METATAGS - AngularJS Service

### Version
0.0.1.3

### Installation

#### Step 1

```sh
$ bower install ambersive-meta
```

#### Step 2
Add the following meta tag to your index.html file between <head></head> Tags.
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

### Options and Updates

Currently numerous options are available. You can set them via $metaSettings Provider (in run() => $metaSettingsProvider).
To update the meta-Tags just Call => MetaSrv.set(object); Please be aware that using the given provider updates the data globally. Use the Update Function for updateing just the current route.

#### $state - ROUTER-UI

```sh
$stateProvide.state('app.state1', {
    parent: 'app',
    url:'/state1',
    data: {
        meta: {
            'title': 'State 1',
            'description':'',
            'keywords':'',
            'robots':'',
            'viewport':'',
            'image':'http://',
            'twitter':{
                'title':'Twitter-Title',
                'description':'',
                'card':'summary',
                'channel':'ambersive',
                'image':'http://'
            },
            'facebook':{
                'title':'Facebook-Title',
                'description':'',
                'type':'website',
                'sitename':'SITENAME',
                'image':'http://'
            },
            'windows':{
                'starturl':'http://',
                'color':'#000'
            },
            'apple':{
                'isCapable':'yes',
                'statusbarColor':'#000'
            }
        }
    },
    views: {
        'main@app': {
            template: '<div>state1</div>'
        }
    }
});
```

#### Service

```sh
 MetaSrv.set(object);
```

#### Broadcast

```sh
$rootScope.$broadcast('ngmeta',data);
```

#### Global Settings

##### Title
```sh
$metaSettings.setTitle(value);

```
##### Template-Path for Meta-Tags
```sh
$metaSettings.setTemplatePath(path);

```
##### Fallback-Description
```sh
$metaSettings.setDescription(path);

```
##### Fallback-Image (for Twitter, Facebook)
```sh
$metaSettings.setImage(path);

```
##### Favicon - default:'favicon.ico'
```sh
$metaSettings.setFavicon(path);

```
##### Windows-Start URL
For pinning the Site to the "desktop".
```sh
$metaSettings.setStartUrl(url);

```

##### Robots-Tags.
```sh
$metaSettings.setRobots(value);

```
##### Viewport
```sh
$metaSettings.setViewport(value);

```
##### IsCapable
```sh
$metaSettings.setIsCapable(value);

##### Statusbar-Color - default: 'black'
```sh
$metaSettings.setStatusbarColor(color);

```

```
##### OG-Site Type - default: 'website'
```sh
$metaSettings.setOgType(value);

```
##### Twitter-Card - default: 'summary'
```sh
$metaSettings.setTwitterCard(value);

```
##### Twitter-Channel - default: 'ambersive'
```sh
$metaSettings.setTwitterChannel(value);

```


License
----
MIT