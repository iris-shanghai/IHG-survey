"use strict";var app=angular.module("myApp",["ngRoute","myApp.config","myApp.filters","myApp.services","myApp.directives","myApp.controllers"]);app.config(["$routeProvider",function(e){e.when("/survey",{templateUrl:"partials/survey.html",controller:"surveyCtrl"}),e.when("/welcome",{templateUrl:"partials/welcome.html",controller:"welcomeCtrl"}),e.when("/login",{templateUrl:"partials/login.html",controller:"loginCtrl"}),e.when("/demoSwipe",{templateUrl:"partials/demoSwipe.html",controller:"demoSwipeCtrl"}),e.when("/eventEnd",{templateUrl:"partials/eventEnd.html",controller:"eventEndCtrl"}),e.when("/result",{templateUrl:"partials/result.html",controller:"resultCtrl",resolve:{currentAuth:["Auth",function(e){return e.$requireAuth()}]}}),e.otherwise({redirectTo:"/eventEnd"})}]),app.run(["FBURL",function(e){"https://angularfire-survey.firebaseio.com/surveys"===e&&angular.element(document.body).html("<h1>Please configure app/js/config.js before running!</h1>")}]),app.run(["$rootScope","$location","Auth",function(e,a,r){r.$onAuth(function(a){e.authData=a}),e.logout=function(){r.$unauth(),a.path("/survey")},e.isActive=function(e){return e===a.path()},e.$on("$routeChangeError",function(e,r,t,n){"AUTH_REQUIRED"===n&&a.path("/survey")})}]);var app=angular.module("myApp.config",["ngRoute"]);app.constant("FBURL","https://ihgsurvey.firebaseio.com/surveys");var app=angular.module("myApp.services",["ngRoute","firebase"]);app.value("version","1.0.1"),app.factory("Auth",["$firebaseAuth","FBURL",function(e,a){var r=new Firebase(a);return e(r)}]);var app=angular.module("myApp.controllers",["ngRoute"]);app.controller("welcomeCtrl",["$scope","FBURL","$firebaseArray","$location",function(e,a,r,t){$("#tnc").on("show.bs.modal",function(){var e=Math.max(document.documentElement.clientHeight,window.innerHeight||0),a=e-90-136;$(".modal-body").height(a)}),e.takeSurvey=function(){$("#tnc").modal("show")},e.go=function(e){t.path("/survey")}}]),app.controller("surveyCtrl",["$scope","FBURL","$firebaseArray",function(e,a,r){var t=new Firebase(a),n=$("#addButton,.sendbtn"),i=$(".scroll-down"),l=$(".scrollIndex"),o=0,u=5,d=!0,s=$(".alert-danger");s.hide(),n.hide(),e.surveys=r(t),e.timestamp=(new Date).getTime(),e.successInfo=!1,e.openTravelPrefer=function(){$("#travel").unbind("hidden"),$("#travel").modal("show")},e.openDailyPrefer=function(){$("#daily").modal("show")},e.swiper={},e.preferReward=function(a){return"both"==e.formData.preferReward?!0:a==e.formData.preferReward};var c=function(e){for(var a in e){var r=e[a];if(1==r)return!0}return!1},m=function(e,a){return 1==e?1!=c(a):!1};e.travelValidation=function(){var a=[e.travelForm["categoryTravel-1"].$viewValue,e.travelForm["categoryTravel-2"].$viewValue,e.travelForm["categoryTravel-3"].$viewValue,e.travelForm["categoryTravel-4"].$viewValue,e.travelForm["categoryTravel-5"].$viewValue,e.travelForm["categoryTravel-6"].$viewValue,e.travelForm["categoryTravel-7"].$viewValue],r=[e.travelForm.travelInsuranceType1.$viewValue,e.travelForm.travelInsuranceType2.$viewValue,e.travelForm.travelInsuranceType3.$viewValue],t=[e.travelForm.travelAccessoryType1.$viewValue,e.travelForm.travelAccessoryType2.$viewValue,e.travelForm.travelAccessoryType3.$viewValue],n=!c(a),i=m(e.travelForm["categoryTravel-4"].$viewValue,r),l=m(e.travelForm["categoryTravel-5"].$viewValue,t),o=e.travelForm.$invalid,u=o||n||i||l;return u},e.dailyValidation=function(){var a=[e.dailyForm["categoryDaily-1"].$viewValue,e.dailyForm["categoryDaily-2"].$viewValue,e.dailyForm["categoryDaily-3"].$viewValue,e.dailyForm["categoryDaily-4"].$viewValue,e.dailyForm["categoryDaily-5"].$viewValue,e.dailyForm["categoryDaily-6"].$viewValue,e.dailyForm["categoryDaily-7"].$viewValue],r=[e.dailyForm.dailyConsumption1.$viewValue,e.dailyForm.dailyConsumption2.$viewValue,e.dailyForm.dailyConsumption3.$viewValue],t=[e.dailyForm.dailyFoodHealth1.$viewValue,e.dailyForm.dailyFoodHealth2.$viewValue,e.dailyForm.dailyFoodHealth3.$viewValue],n=[e.dailyForm.dailyEntertainment1.$viewValue,e.dailyForm.dailyEntertainment2.$viewValue,e.dailyForm.dailyEntertainment3.$viewValue,e.dailyForm.dailyEntertainment4.$viewValue,e.dailyForm.dailyEntertainment5.$viewValue],i=[e.dailyForm.dailySelfimprovement1.$viewValue,e.dailyForm.dailySelfimprovement2.$viewValue,e.dailyForm.dailySelfimprovement3.$viewValue,e.dailyForm.dailySelfimprovement4.$viewValue],l=!c(a),o=m(e.dailyForm["categoryDaily-2"].$viewValue,r),u=m(e.dailyForm["categoryDaily-3"].$viewValue,t),d=m(e.dailyForm["categoryDaily-4"].$viewValue,n),s=m(e.dailyForm["categoryDaily-5"].$viewValue,i),v=e.dailyForm.$invalid,p=v||l||o||u||d||s;return p},e.onReadySurvey=function(a,r){a.on("onReachEnd",function(){i.hide(),n.show()}),a.on("onSlideChangeEnd",function(a){""==e.formData.memberType?(a.slideTo(0),$(".swiper-slide-active").addClass("error-quiz")):""==e.formData.preferReward&&a.activeIndex>1?(a.slideTo(1),$(".swiper-slide-active").addClass("error-quiz")):""==e.formData.preferTreatment&&a.activeIndex>3&&(a.slideTo(3),$(".swiper-slide-active").addClass("error-quiz"))}),a.on("onSlideChangeStart",function(a){o=a.activeIndex+1,s.hide(),3==o&&1==d&&("travel"==e.formData.preferReward&&($("#travel").unbind("hidden"),$("#travel").modal("show"),$("#travel").on("hidden.bs.modal",function(e){a.slideTo(3)}),d=!1),"daily"==e.formData.preferReward&&($("#daily").unbind("hidden"),$("#daily").modal("show"),$("#daily").on("hidden.bs.modal",function(e){a.slideTo(3)}),d=!1),"both"==e.formData.preferReward&&($("#travel").modal("show"),$("#travel").on("hidden.bs.modal",function(e){$("#daily").modal("show")}),$("#daily").on("hidden.bs.modal",function(e){a.slideTo(3)}),d=!1)),o<a.slides.length?(i.show(),n.hide(),l.text(o)):o==a.slides.length&&l.text(o)})},e.formData={name:"",memberId:"",phoneNumber:"",memberType:"",preferReward:"",preferTreatment:"",timestamp:e.timestamp},e.updateRating=function(a){e.formData.rating=a},e.isTrue=function(a){return e.formData[a]},e.lastQuestion=function(){return o==u},e.addSurvey=function(){e.formData.name?(n.button("loading"),e.surveys.$add(e.formData).then(function(){n.button("reset").hide(),e.successInfo=!0,$(".swiper-container,hr,h4.modal-title").hide(),$("#survey").modal("hide"),$("#contactInfo").modal("hide")})["catch"](function(e){alert("请正确填写您的联系信息"),$("#contactInfo").modal("show")})):($("#contactInfo").modal("show"),$("#contactInfo").addClass("highlight"))}}]),app.controller("loginCtrl",["$scope","$location","Auth",function(e,a,r){e.email="admin@mydomain.com",e.password="password",e.login=function(){e.authData=null,e.error=null;var t=$("#loginButton").button("loading");r.$authWithPassword({email:e.email,password:e.password}).then(function(r){e.authData=r,a.path("/result"),t.button("reset")})["catch"](function(a){e.error=a,t.button("reset")})}}]),app.controller("resultCtrl",["$scope","FBURL","$firebaseArray",function(e,a,r){var t=new Firebase(a);e.results=r(t)}]);var app=angular.module("myApp.filters",["ngRoute"]);app.filter("interpolate",["version",function(e){return function(a){return String(a).replace(/\%VERSION\%/gm,e)}}]),angular.module("myApp.directives",["ngRoute","ksSwiper"]).constant("buttonConfig",{activeClass:"active",toggleEvent:"click"}).directive("btnRadio",["buttonConfig",function(e){var a=e.activeClass||"active",r=e.toggleEvent||"click";return{require:"ngModel",link:function(e,t,n,i){i.$render=function(){t.toggleClass(a,angular.equals(i.$modelValue,n.btnRadio))},t.bind(r,function(){t.hasClass(a)||e.$apply(function(){i.$setViewValue(n.btnRadio),i.$render()})})}}}]).directive("starRating",function(){return{restrict:"A",template:"<ul class='rating'><li ng-repeat='star in stars' ng-click='toggle($index)'><span class='glyphicon' ng-class='{\"glyphicon-star\": star.filled, \"glyphicon-star-empty\": !star.filled}'></span></li></ul>",scope:{ratingValue:"=",max:"=",readonly:"@",onRatingSelected:"&"},link:function(e,a,r){var t=function(){e.stars=[];for(var a=0;a<e.max;a++)e.stars.push({filled:a<e.ratingValue})};e.toggle=function(a){e.readonly&&"true"===e.readonly||(e.ratingValue=a+1,e.onRatingSelected({rating:a+1}))},e.$watch("ratingValue",function(e,a){a&&t()})}}}).directive("ksSwiperContainer",function(){return{restrict:"AE",replace:!0,link:function(e,a,r){var t=Math.max(document.documentElement.clientHeight,window.innerHeight||0),n=t-190;a.children(".swiper-container").css({height:n+"px"})}}});