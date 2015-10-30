angular.module('ambersive.meta').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/meta.html',
    "<title>{{meta.title}}</title><link rel=\"shortcut icon\" href={{meta.favicon}}><meta name=description content={{meta.description}}><meta name=keywords content={{meta.keywords}}><meta name=robots content={{meta.robots}}><meta name=viewport content={{meta.viewport}}><meta http-equiv=X-UA-Compatible content=\"IE=Edge\"><meta name=mobile-web-app-capable content={{meta.isCapable}}><meta name=apple-mobile-web-app-capable content={{meta.apple.isCapable}}><meta name=apple-mobile-web-app-status-bar-style content={{meta.apple.statusbarColor}}><meta name=apple-mobile-web-app-title content={{meta.apple.title}}><meta name=application-name content={{meta.applicationName}}><meta name=msapplication-navbutton-color content={{meta.windows.color}}><meta name=msapplication-starturl content={{meta.windows.starturl}}><meta property=og:description content={{meta.facebook.description}}><meta property=og:image content={{meta.facebook.image}}><meta property=og:site_name content={{meta.facebook.sitename}}><meta property=og:title content={{meta.facebook.title}}><meta property=og:type content={{meta.facebook.type}}><meta name=twitter:card content={{meta.twitter.card}}><meta name=twitter:site content=@{{meta.twitter.channel}}><meta name=twitter:description content={{meta.twitter.description}}><meta name=twitter:img:src content={{meta.twitter.image}}><meta name=twitter:title content={{meta.twitter.title}}>"
  );

}]);
