var app = angular.module("demoAppModule", ['ngRoute', 'ui.bootstrap', 'ngCookies', 'dx']);

 


app.config(
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
                url: "/customer",
                templateUrl: './frontend/views/sharedViews/customerLogin.html',
                controller: 'customerLoginController'

            })
            .when('/customerHome', {
                url: "/customerHome",
                templateUrl: './frontend/views/sharedViews/customerHome.html',
                controller: 'customerHomeController'
            })

            .when('/employeeLogin', {
                url: "/employeeLogin",
                templateUrl: './frontend/views/sharedViews/employeeLogin.html',
                controller: 'employeeLoginController'
            })
            .when('/employeeHome', {
                url: "/employeeHome",
                templateUrl: './frontend/views/sharedViews/employeeHome.html',
                controller: 'employeeHomeController'
            })
            .when('/lcRequest', {
                url: "/lcRequest",
                templateUrl: './frontend/views/letterOfCredit/lcRequest.html',
                controller: 'requestController'
            })
            .when('/lcReqView', {
                url: "/lcReqView",
                templateUrl: './frontend/views/letterOfCredit/lcReqView.html',
                controller: 'lcReqViewController'
            })
            .when('/lcAmendReqView', {
                url: "/lcAmendReqView",
                templateUrl: './frontend/views/letterOfCredit/lcAmendReqView.html',
                controller: 'lcAmendReqViewController'
            })
            .when('/lcOpen', {
                url: "/lcOpen",
                templateUrl: './frontend/views/letterOfCredit/lcOpen.html',
                controller: 'openController'
            })

            .when('/lcApprove', {
                url: "/lcApprove",
                templateUrl: './frontend/views/letterOfCredit/lcApprove.html',
                controller: 'approvalController'
            })
            /*==========================================================================================================================
             ****************Code for LC Amendment Request************************
             ****************Developer name : Kesavan N B
             *****************Start************************/

            .when('/lcAmend', {
                url: "/lcAmend",
                templateUrl: './frontend/views/letterOfCredit/lcAmend.html',
                controller: 'amendController'
            })
            //=======================End===================================================================================================

            .when('/lcAmendAccept', {
                url: "/lcAmendAccept",
                templateUrl: './frontend/views/letterOfCredit/lcAmendAccept.html',
                controller: 'amendAcceptController'
            })
            .when('/lcAmendApprove', {
                url: "/lcAmendApprove",
                templateUrl: './frontend/views/letterOfCredit/lcAmendApprove.html',
                controller: 'amendApproveController'
            })
            .when('/Documents', {
                url: "/Documents",
                templateUrl: './frontend/views/letterOfCredit/Documents.html',
                controller: 'DocumentsController'
            })


            ///////////////////////////////////routes for bank guarantee starts//////////////////////////////////////////////////////////////
            .when('/bgRequest', {
                url: "/bgRequest",
                templateUrl: './frontend/views/bankGuarantee/bgRequest.html',
                controller: 'bgRequestController'

            })
            .when('/bgOpen', {            
                url:   "/bgOpen",
                            templateUrl:   './frontend/views/bankGuarantee/bgOpen.html',
                            controller:   'openBGController'                
            })
            .when('/bgApprove', {           
                url:   "/bgApprove",
                           templateUrl:   './frontend/views/bankGuarantee/bgApprove.html',
                           controller:   'approveBGController'
            })
            .when('/bgAmend', {           
                url:   "/bgAmend",
                           templateUrl:   './frontend/views/bankGuarantee/bgAmend.html',
                           controller:   'bgAmendController'
            })
            .when('/bgAcceptAmend', {           
                url:   "/bgAcceptAmend",
                           templateUrl:   './frontend/views/bankGuarantee/bgAcceptAmend.html',
                           controller:   'bgAmendAcceptController'
            })
            .when('/bgApproveAmend', {           
                url:   "/bgApproveAmend",
                           templateUrl:   './frontend/views/bankGuarantee/bgApproveAmend.html',
                           controller:   'bgAmendApproveController'
            })
            .when('/bgRequestView', {           
                url:   "/bgRequestView",
                           templateUrl:   './frontend/views/bankGuarantee/bgRequestView.html',
                           controller:   'bgRequestViewController'
            })
            .when('/bgOpenedView', {           
                url:   "/bgOpenedView",
                           templateUrl:   './frontend/views/bankGuarantee/bgOpenedView.html',
                           controller:   'bgOpenedViewController'
            })
			.when('/openLCView', {           
                url:   "/openLCView",
                           templateUrl:   './frontend/views/letterOfCredit/openLCView.html',
                           controller:   'openLCViewController'
            })
			.when('/bgAmendReqView', {           
                url:   "/bgAmendReqView",
                           templateUrl:   './frontend/views/bankGuarantee/bgAmendReqView.html',
                           controller:   'bgAmendReqViewController'
            })
			.when('/bgAmendAcceptView', {           
                url:   "/bgAmendAcceptView",
                           templateUrl:   './frontend/views/bankGuarantee/bgAmendAcceptView.html',
                           controller:   'bgAmendAcceptViewController'
            })
			
            .otherwise({
                redirectTo: '/'
            });
    });
