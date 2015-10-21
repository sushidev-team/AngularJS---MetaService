/**
 * Auth Meta Service for AngularJS
 * @version v0.0.1
 * @link http://www.ambersive.com
 * @licence MIT License, http://www.opensource.org/licenses/MIT
 */

(function(window, document, undefined) {

    'use strict';

    angular.module('ambersive.meta',['ambersive.helper','ui.router']);

    angular.module('ambersive.meta').run(['$rootScope', '$state', '$stateParams', 'MetaSrv','$log',
        function ($rootScope, $state, $stateParams, MetaSrv,$log) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.toState = $state;
            $rootScope.toStateParams = $stateParams;

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
            });
        }
    ]);

    angular.module('ambersive.meta').provider('$metaSettings',[function(){

        var title = '',
            titleSeperator = ' :: ',
            description = '',
            robots = 'index,follow',
            image = 'favicon.ico',
            favicon = 'favicon.ico',
            viewport = 'width=device-width,user-scalable=no',
            standardTemplatePath     =  'src/views/meta.html',
            isCapable = true,
            statusbarColor = 'black',
            ogType = 'website',
            twitterCard = 'summary',
            twitterChannel = 'ambersive',
            startUrl = 'http://',
            fields = [
                'description',
                'keywords',
                'robots',
                'viewport',
                'isCapable',
                'favicon'
            ];

        var setTitle = function(name){
                title = name;
            },
            setTemplatePath = function(path){
                standardTemplatePath = path;
            },
            setDescription = function(text){
                description = text;
            },
            setImage = function(imagePath){
                image = imagePath;
            },
            setFavicon = function(imagePath){
                favicon = imagePath;
            },
            setStartUrl = function(url){
                startUrl = url;
            },
            setFields = function(arr){
                if(angular.isArray(arr)){
                    fields = arr;
                }
            },
            setRobots = function(value){
                robots = value;
            },
            setViewport = function(value){
                viewport = value;
            },
            setIsCapable = function(value){
                if(angular.isDefined(value)){
                    isCapable = value;
                }
            },
            setOgType = function(type){
                ogType = type;
            },
            setTwitterCard = function(value){
                twitterCard = value;
            },
            setTwitterChannel = function(value){
                twitterChannel = value;
            },
            setStatusbarColor = function(value){
                statusbarColor = value;
            };

        return {
            setFields:setFields,
            setTitle:setTitle,
            setTemplatePath:setTemplatePath,
            setDescription:setDescription,
            setImage:setImage,
            setFavicon:setFavicon,
            setRobots:setRobots,
            setViewport:setViewport,
            setIsCapable:setIsCapable,
            setOgType:setOgType,
            setTwitterCard:setTwitterCard,
            setTwitterChannel:setTwitterChannel,
            setStatusbarColor:setStatusbarColor,
            setStartUrl:setStartUrl,
            $get: function () {
                return {
                    title:title,
                    titleSeperator:titleSeperator,
                    description:description,
                    image:image,
                    favicon:favicon,
                    robots:robots,
                    viewport:viewport,
                    templatePath:standardTemplatePath,
                    isCapable:isCapable,
                    ogType:ogType,
                    twitterCard:twitterCard,
                    twitterChannel:twitterChannel,
                    statusbarColor:statusbarColor,
                    fields:fields,
                    startUrl:startUrl
                };
            }
        };
    }]);

    angular.module('ambersive.meta').factory('MetaSrv',['$q','$log','$window','$rootScope','$metaSettings','HelperSrv',
        function($q,$log,$window,$rootScope,$metaSettings,HelperSrv){

            var MetaSrv = {},
                _MetaSettings = $metaSettings,
                _MetaFields = $metaSettings.fields,
                _MetaData = {};

            MetaSrv.get = function(data){

                var stateData = $rootScope.toState,
                    meta = {},
                    url = $window.location.href,
                    metaFieldsLength = _MetaFields.length;

                if(data === undefined) {

                    if (stateData.data === undefined) {
                        if (stateData.current === undefined) {
                            $log.warn('$state.data is undefined');
                        }
                        return _MetaData;
                    }
                    if (stateData.data.meta === undefined) {
                        $log.warn('$state.data.meta is undefined');
                        return _MetaData;
                    }
                    meta = stateData.data.meta;
                } else {
                    if(data.meta === undefined){
                        $log.warn('data.meta is undefined');
                        return;
                    } else {
                        meta = data.meta;
                    }
                }

                // Automatic loop for specific fields

                try {
                    for (var i = 0; i < metaFieldsLength; i++) {
                        if (meta[_MetaFields[i]] !== undefined) {
                            _MetaData[_MetaFields[i]] = meta[_MetaFields[i]];
                        } else {
                            if ($metaSettings[_MetaFields[i]] !== undefined) {
                                _MetaData[_MetaFields[i]] = $metaSettings[_MetaFields[i]];
                            }
                        }
                    }
                } catch(err){
                    $log.error(err);
                }

                // Title
                if(meta.title !== undefined){
                    _MetaData.title = meta.title+$metaSettings.titleSeperator+$metaSettings.title;
                }

                // Twitter
                _MetaData.twitter = {};

                if(meta.twitter === undefined || meta.twitter.title === undefined){
                    _MetaData.twitter.title = _MetaData.title;
                } else {
                    _MetaData.twitter.title = meta.twitter.title;
                }

                if(meta.twitter === undefined || meta.twitter.description === undefined){
                    _MetaData.twitter.description = _MetaData.description;
                } else {
                    _MetaData.twitter.description = meta.twitter.description;
                }

                if(meta.twitter === undefined || meta.twitter.card === undefined){
                    _MetaData.twitter.card = $metaSettings.twitterCard;
                } else {
                    _MetaData.twitter.card = meta.twitter.card;
                }

                if(meta.twitter === undefined || meta.twitter.channel === undefined){
                    _MetaData.twitter.channel = $metaSettings.twitterChannel;
                } else {
                    _MetaData.twitter.channel = meta.twitter.channel;
                }

                // Facebook
                _MetaData.facebook = {};

                if(meta.facebook === undefined || meta.facebook.title === undefined){
                    _MetaData.facebook.title = _MetaData.title;
                } else {
                    _MetaData.facebook.title = meta.facebook.title;
                }

                if(meta.facebook === undefined || meta.facebook.description === undefined){
                    _MetaData.facebook.description = _MetaData.description;
                } else {
                    _MetaData.facebook.description = meta.facebook.description;
                }

                if(meta.facebook === undefined || meta.facebook.type === undefined){
                    _MetaData.facebook.type = $metaSettings.ogType;
                } else {
                    _MetaData.facebook.type = meta.facebook.type;
                }

                if(meta.facebook === undefined || meta.facebook.url === undefined){
                    _MetaData.facebook.url = url;
                } else {
                    _MetaData.facebook.type = meta.facebook.url;
                }

                _MetaData.facebook.sitename =  $metaSettings.title;

                // Image

                if(meta.image === undefined){
                    _MetaData.facebook.image = $metaSettings.image;
                    _MetaData.twitter.image = $metaSettings.image;
                    _MetaData.image = $metaSettings.image;
                } else {
                    _MetaData.facebook.image = meta.image;
                    _MetaData.twitter.image = meta.image;
                    _MetaData.image = meta.image;
                }

                // Windows
                _MetaData.windows = {};

                if(meta.windows === undefined || meta.windows.starturl === undefined){
                    _MetaData.windows.starturl = $metaSettings.startUrl;
                } else {
                    _MetaData.windows.starturl = meta.windows.starturl;
                }

                if(meta.windows === undefined || meta.windows.color === undefined){
                    _MetaData.windows.color = $metaSettings.statusbarColor;
                } else {
                    _MetaData.windows.color = meta.windows.color;
                }

                // Apple
                _MetaData.apple = {};

                _MetaData.apple.isCapable = 'no';
                if(_MetaData.isCapable === true){
                    _MetaData.apple.isCapable = 'yes';
                }

                if(meta.apple === undefined || meta.apple.statusbarColor === undefined){
                    _MetaData.apple.statusbarColor = $metaSettings.statusbarColor;
                } else {
                    _MetaData.apple.statusbarColor = meta.apple.statusbarColor;
                }

                _MetaData.apple.title = $metaSettings.title;
                _MetaData.applicationName = $metaSettings.title;

                $log.log(_MetaData);

                return _MetaData;
            };

            MetaSrv.set = function(data){
                $rootScope.$broadcast('ngmeta',data);
            };

            return MetaSrv;

        }]);

    angular.module('ambersive.meta').directive('ngmeta', ['$compile','HelperSrv','MetaSrv','$log',
        function ($compile,HelperSrv,MetaSrv,$log) {
            var MetaTags = {};

            // Settings

            MetaTags.restrict = 'A';
            MetaTags.replace = true;
            MetaTags.transclude = false;
            MetaTags.controller = ['$scope','$metaSettings','$rootScope',function($scope,$metaSettings,$rootScope){

                $scope.meta = {};

                if($scope.templateUrl === undefined || $scope.templateUrl === ''){
                    $scope.templateUrl = $metaSettings.templatePath;
                }

                $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                    $scope.meta = MetaSrv.get();
                });

                $scope.$on('ngmeta', function(event, args) {
                    $scope.meta = MetaSrv.get(args);
                });

            }];

            MetaTags.link = function (scope, element, attrs) {
                try {
                    var html = HelperSrv.template.forUrl(scope.templateUrl);
                    if(html === '' || html === null){
                        throw 'ambersive.meta: template is empty';
                    }
                    else {
                        element.replaceWith($compile(html)(scope));
                    }
                } catch (err) {
                    alert(err);
                }
            };

            return MetaTags;
        }]);


})(window, document, undefined);