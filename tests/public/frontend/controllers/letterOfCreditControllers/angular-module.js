//var app = angular.module("demoAppModule", ['ngRoute','ui.bootstrap','ngCookies']);
//
//app.config(
//        function ($routeProvider, $locationProvider) {
//              $routeProvider.
//
//                    when('/',{
//                        url:"/customer",
//                        templateUrl:'views/customerLogin.html',
//                        controller:'customerLoginController'
//
//                    })
//                    .when('/customerHome', {
//                        url:"/customerHome",
//                        templateUrl: 'views/customerHome.html',
//                        controller: 'customerHomeController'
//                    })
//
//                    .when('/employeeLogin',{
//                    url:"/employeeLogin",
//                    templateUrl:'views/employeeLogin.html',
//                    controller:'employeeLoginController'
//                    })
//                    .when('/employeeHome', {
//                        url:"/employeeHome",
//                        templateUrl: 'views/employeeHome.html',
//                        controller: 'employeeHomeController'
//                    })
//                    .when('/lcRequest', {
//                        url:"/lcRequest",
//                        templateUrl: 'views/lcRequest.html',
//                        controller: 'requestController'
//                    })
//                    .when('/lcOpen', {
//                        url: "/lcOpen",
//                        templateUrl: 'views/lcOpen.html',
//                        controller: 'openController'
//                    })
//
//                    .when('/lcApprove', {
//                        url: "/lcApprove",
//                        templateUrl: 'views/lcApprove.html',
//                        controller: 'approvalController'
//                    })
///*==========================================================================================================================
//                    ****************Code for LC Amendment Request************************
//                    ****************Developer name : Kesavan N B
//                     *****************Start************************/
//
//            .when('/lcAmend', {
//               url: "/lcAmend",
//               templateUrl: 'views/lcAmend.html',
//               controller: 'amendController'
//               })
////=======================End===================================================================================================
//
//                    .when('/lcAmendAccept', {
//                        url: "/lcAmendAccept",
//                        templateUrl: 'views/lcAmendAccept.html',
//                        controller: 'amendAcceptController'
//                    })
//                    .when('/lcAmendApprove', {
//                        url: "/lcAmendApprove",
//                        templateUrl: 'views/lcAmendApprove.html',
//                        controller: 'amendApproveController'
//                    })
//                    .when('/Documents', {
//                                           url: "/Documents",
//                                           templateUrl: 'views/Documents.html',
//                                           controller: 'DocumentsController'
//                                           })
//                   .otherwise({
//                        redirectTo: '/'
//                    });
//        });


//app.controller('customerLoginController', function($scope ,$rootScope,$http,$location,$cookies, $cookieStore) {
//$scope.message = 'Customer login form';
//         const nodePort = $location.port();
//         const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "/api/letter-of-credit/";
//         $rootScope.apiBaseURL = apiBaseURL;
//         $scope.userLogin = () =>{
//                const emailid = $scope.emailid;
//
//    $http.get(apiBaseURL + "customer/" + emailid).then( function(response){
//                                                                                                                                 // success callback
//     console.log("INSIDE SUCCESS FUNCTION");
//     const username = response.data;
//           console.log("username of customer===>",response.data);
//           $cookieStore.put('customer', username);
//           $location.path("/customerHome");
//       },
//        function(response){
//           $scope.errorMsg="Invalid Email / Password"
//          console.log("INSIDE ERROR FUNCTION");
//
//          })
//                  }
// });
//
// app.controller('employeeLoginController', function($scope,$rootScope,$http,$location , $cookies, $cookieStore) {
// $scope.message = 'Employee login form';
//           const nodePort = $location.port();
//           const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "/api/letter-of-credit/";
//           $rootScope.apiBaseURL = apiBaseURL;
//           $scope.employeeLogin = () =>{
//            const emailid = $scope.emailid;
// $http.get(apiBaseURL + "employee/" + emailid).then( function(response){
//                                                                                                                                 // success callback
//     console.log("INSIDE SUCCESS FUNCTION");
//     const username = response.data;
//           console.log("username of customer===>",response.data);
//           $cookieStore.put('employee', username);
//           $location.path("/employeeHome");
//       },
//        function(response){
//          $scope.errorMsg="Invalid Email / Password"
//          console.log("INSIDE ERROR FUNCTION");
//
//          })
//
//         }
//})
//
//
//
//     app.controller('customerHomeController', function($scope,$rootScope,$http,$location,$cookies, $cookieStore) {
//     if($cookieStore.get('customer')){
//          $scope.message = 'Letter of Credit';
//          $scope.username = $cookieStore.get('customer');
//          const nodePort = $location.port();
//          const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "/api/letter-of-credit/";
//          $rootScope.apiBaseURL = apiBaseURL;
//             $scope.tab = 1;
//             $scope.setTab = function(newTab){
//             $scope.tab = newTab;
//              };
//
//              $scope.isSet = function(tabNum){
//              return $scope.tab === tabNum;
//              };
//           /*==========================================================================================================================
//                               ****************Code for LC Amendment Request************************
//                               ****************Developer name : Kesavan N B
//                                *****************Start************************/
//
//            /*$scope.amendLc = (AmendID) => {
//                $location.path("/lcAmend");
//                $rootScope.AmendID = AmendID;
//                console.log("ID in home page  ",AmendID);
//                        };*/
//
//                         $scope.amendLc = (AmendID) => {
//
//                                                      $rootScope.AmendID = AmendID;
//                                                      console.log("lcid",AmendID);
//                                                       $http.get(apiBaseURL + "lc-amend-req/"+AmendID).then( function(response){
//                                                       console.log("INSIDE SUCCESS FUNCTION");
//                                                       const StatusFromDB = response.data;
//                                                       const statusvalue = response.data.status;
//                                                       console.log("status from api===>",StatusFromDB );
//
//
//                                                       //if(response.data.status = 'AmendRequested')
//                                                      if(statusvalue == 'AmendRequested')
//
//                                                    {
//                                                    console.log("response.data.status",response.data.status);
//                                                    console.log("inside status if");
//                                                    //return false;
//                                                    alert("LC Amend Request is in progress");
//                                                    $location.path("/customerHome");
//                                                    //alert("hi");
//                                                    /*$scope.status = function(){
//
//                                                    return false;
//                                                    }*/
//                                                    }
//                                                    else{
//                                                    console.log("inside status else");
//                                                    $location.path("/lcAmend");
//                                                    //return true;
//
//                                                    }
//                                                 });
//                                                  /*function(response){
//
//                                                    console.log("INSIDE ERROR FUNCTION");
//
//                                                    })
//                        */
//                                                        //$location.path("/lcAmend");
//                                                        //console.log("ID in home page  ",AmendID);
//                                                                };
//
//
//                        //-------------------------------------------------------End----------------------------------------------------------------------------------
////-------------------------------------------------------End----------------------------------------------------------------------------------
//              $scope.logout = function(){
//                    $cookieStore.remove('customer');
//                    $location.path("/customer");
//                    var cust= $cookieStore.get('customer');
//                    console.log("customer  ",cust);
//                              };
//
//              $scope.getLCs = () => $http.get(apiBaseURL + "get-customer-lc/"+$scope.username)
//                            .then((response) => $scope.loc = Object.keys(response.data)
//                            .map((key) => response.data[key])
//                            .reverse());
//              $scope.getLCs();
//
//              //start
//                            $scope.getAmendedLCs = () => $http.get(apiBaseURL + "lcamendreq")
//                                          .then((response) => $scope.locamend = Object.keys(response.data)
//                                          .map((key) => response.data[key])
//                                          .reverse());
//                            $scope.getAmendedLCs();
//              //end
//
//              $scope.getProcessedLCs = () => $http.get(apiBaseURL + "customer-lc-orders/" +$scope.username)
//                         .then((response) => $scope.loc1 = Object.keys(response.data)
//                         .map((key) => response.data[key])
//                         .reverse());
//              $scope.getProcessedLCs();
//
//              $http.get(apiBaseURL + "me").then(function(response){
//                              $scope.thisNode = response.data.me;
//                              $rootScope.thisNode = $scope.thisNode;
//                              console.log("me===>",response.data.me);
//                                       });
////////////////////////////////////////////////for email sending begins//////////////////////////////////////
//              $http.get(apiBaseURL + "lcRequestID").then(function(response){
//                 $rootScope.lcRequestID = response.data.lcRequestID;
//
//
//
////                $scope.showHide=()=>{
//
//                    /////hide the modal starts///////////////////////
//                            $scope.IsHidden = true;
//                            $scope.emailForm={};
//                            $scope.getMail = (iban) => {
//
//                                    console.log("hidden now");
//
//                      /////////////applicant mail id starts//////////
//                                    $scope.username = $cookieStore.get('customer');
//                                    $http.get($rootScope.apiBaseURL + "customer/detail/id/"+ $scope.username).then(function(response){
//                                    const fromEmail=response.data.email;
//                                    console.log("from Mail:",fromEmail);
//                                    $scope.emailForm.fromEmail=fromEmail;
//
//                                    });
//                      /////////////applicant mail id ends//////////
//                      /////////////beneficiary mail id starts//////
//                            $rootScope.iban = iban;
//                            $http.get($rootScope.apiBaseURL + "customer/detail/"+ iban).then(function(response){
//                            const toMail=response.data.email;
//                            console.log("tomail: ",toMail);
//                            $scope.emailForm.toEmail=toMail;
//
//                            });
//                      /////////////beneficiary mail id ends//////
//                        }
//
//
//                            $scope.showHide = function () {
//                            console.log("inhidden!:)")
//                      //If DIV is hidden it will be visible and vice versa.
//                                $scope.IsHidden = $scope.IsHidden ? false : true;
//                            }
//                            $scope.send=function(){
//
//                            console.log("testS",$scope.emailForm.subject,$scope.emailForm.mailbody);
//                                    const email={
//                                        from:$scope.emailForm.fromEmail,
//                                        to:$scope.emailForm.toEmail,
//                                        subject:$scope.emailForm.subject,
//                                        msg:$scope.emailForm.mailbody
//                                        };
//                                        console.log("email Obj",angular.toJson(email));
//                                        const emailCreate =apiBaseURL +"email-for-amend";
//                                        $http.post(emailCreate, angular.toJson(email)).then(function(result){
//                                        console.log("success",angular.toJson(email));
//                                        });
//                            $scope.IsHidden=true;
//                            }
//                                console.log("lcRequestID in customer home page===>",response.data.lcRequestID);
//                                             });
/////////////////////////////////////////////////for email sending ends//////////////////////////////////////
//
////for versions and history/////////////////////
//// $scope.getLength = () => $http.get(apiBaseURL + "customer-lc-orders/"+$scope.username)
////                            .then(function(response){
////                            var finalData = response.data;
////                            console.log("length in func "+ finalData);
////                        $scope.versionLength = finalData[0].lcorder.amendData.length;
////                        console.log("domg ",finalData[0].lcorder.amendData.length);
////                            });
////              $scope.getLength();
////
//
////================================================================================================================================
//// Below is the logic for displaying the amended lc records based on the version number
////================================================================================================================================
//
////Start
//
//$scope.numberofamendval = null;
//
//$scope.amendList=function(id,amendId){
//
//$scope.numberofamendval = id
//                                const getObj = apiBaseURL + "employee-lc-orders/"+amendId;
//                                  $http.get(getObj).then(function(response){
//
//                                          var finalData = response.data;
//                                          var len=finalData[0].lcorder.lcNumberOfAmendment;
//
//                                          var idVal= parseInt(id);
//                                          console.log("length",len);
//                                          console.log("idVal",idVal);
//
//
//
//                            if (idVal==len){
//
//                                          $scope.amendAmountval=finalData[0].lcorder.lcAmount;
//                                          //$scope.numberOfAmendmentval=finalData[0].lcorder.lcNumberOfAmendment;
//                                          //$scope.lcAmendAdvisingBankRefval=finalData[0].lcorder.advisingBankID;
//                                          $scope.amendModeOfShipmentval=finalData[0].lcorder.modeOfShipment;
//                                          $scope.lcAmendExpiryDateval=finalData[0].lcorder.lcExpiryDate;
//                                          $scope.lcAmendExpiryPlaceval=finalData[0].lcorder.lcExpiryPlace;
//                                          //$scope.amendmentDetailsval=finalData[0].lcorder.lcAmendmentDetails;
//
//                                            console.log("id last:",idVal,"length",len)
//                                          }
//
//                                          else
//                                           {
//                                          $scope.amendAmountval=finalData[0].lcorder.amendData[idVal].lcAmendAmount;
//                                          //$scope.numberOfAmendmentval=finalData[0].lcorder.amendData[idVal].numberOfAmendment;
//                                          //$scope.lcAmendAdvisingBankRefval=finalData[0].lcorder.amendData[idVal].lcAmendAdvisingBankRef;
//                                          $scope.amendModeOfShipmentval=finalData[0].lcorder.amendData[idVal].amendModeOfShipment;
//                                          $scope.lcAmendExpiryDateval=finalData[0].lcorder.amendData[idVal].lcAmendExpiryDate;
//                                          $scope.lcAmendExpiryPlaceval=finalData[0].lcorder.amendData[idVal].lcAmendExpiryPlace;
//                                          //$scope.amendmentDetailsval=finalData[0].lcorder.amendData[idVal].amendmentDetails;
//                                            console.log("id others:",idVal,"length",len)
//                                          }
//
//
//                                          });
//                              }
//
//
//    $scope.myvar = false;
//
//    $scope.historycus=(amendId)=>{
//
//    $scope.myvar = true;
//
//    const getObj = apiBaseURL + "employee-lc-orders/"+amendId;
//
//         $http.get(getObj).then(function(response){
//
//                                           var finalData = response.data;
//                                          var len=finalData[0].lcorder.lcNumberOfAmendment;
//
//    if($scope.numberofamendval!=null){
//                                          var idVal= parseInt($scope.numberofamendval);
//                                          console.log("length",len);
//                                          console.log("idVal",idVal);
//
//
//                            if (idVal==len){
//
//                                          $scope.amendAmountval=finalData[0].lcorder.lcAmount;
//                                          //$scope.numberOfAmendmentval=finalData[0].lcorder.lcNumberOfAmendment;
//                                          $scope.lcAmendAdvisingBankRefval=finalData[0].lcorder.advisingBankID;
//                                          $scope.amendModeOfShipmentval=finalData[0].lcorder.modeOfShipment;
//                                          $scope.lcAmendExpiryDateval=finalData[0].lcorder.lcExpiryDate;
//                                          $scope.lcAmendExpiryPlaceval=finalData[0].lcorder.lcExpiryPlace;
//                                          //$scope.amendmentDetailsval=finalData[0].lcorder.lcAmendmentDetails;
//
//                                            console.log("id last:",idVal,"length",len)
//                                          }
//
//                                          else
//                                           {
//                                          $scope.amendAmountval=finalData[0].lcorder.amendData[idVal].lcAmendAmount;
//                                          //$scope.numberOfAmendmentval=finalData[0].lcorder.amendData[idVal].numberOfAmendment;
//                                          $scope.lcAmendAdvisingBankRefval=finalData[0].lcorder.amendData[idVal].lcAmendAdvisingBankRef;
//                                          $scope.amendModeOfShipmentval=finalData[0].lcorder.amendData[idVal].amendModeOfShipment;
//                                          $scope.lcAmendExpiryDateval=finalData[0].lcorder.amendData[idVal].lcAmendExpiryDate;
//                                          $scope.lcAmendExpiryPlaceval=finalData[0].lcorder.amendData[idVal].lcAmendExpiryPlace;
//                                          //$scope.amendmentDetailsval=finalData[0].lcorder.amendData[idVal].amendmentDetails;
//                                            console.log("id others:",idVal,"length",len)
//                                          }
//}
//
//                                          });
//
//        }
//
//
//
//                 }
//                 else{
//
//                 console.log("Inside else statement ----->");
//                 $location.path("/customer");
//                 }
//            });
//
//
//         app.controller('employeeHomeController', function($scope,$rootScope,$http,$location,$cookies, $cookieStore) {
//         if($cookieStore.get('employee')){
//                  $scope.message = 'Letter of Credit';
//                  $scope.username = $cookieStore.get('employee');
//
//                     $scope.tab = 1;
//                     $scope.setTab = function(newTab){
//                     $scope.tab = newTab;
//                      };
//                     $scope.logout = function(){
//                            $cookieStore.remove('employee');
//                            $location.path("/customer");
//                          };
//
//                           $scope.Documents = function(ID){
//
//                                                $rootScope.LCID = ID;
//                                               console.log("ID in home page  ",ID);
//                                                $location.path("/Documents");
//                                                         }
//                      $scope.isSet = function(tabNum){
//                      return $scope.tab === tabNum;
//                      };
//
//                      const nodePort = $location.port();
//                      const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "/api/letter-of-credit/";
//                      $rootScope.apiBaseURL = apiBaseURL;
//
//                      $scope.getLCs = () => $http.get(apiBaseURL + "lcreq")
//                                    .then((response) => $scope.loc = Object.keys(response.data)
//                                    .map((key) => response.data[key])
//                                    .reverse());
//                      $scope.getLCs();
//                      $scope.getProcessedLCs = () => $http.get(apiBaseURL + "lc-orders")
//                                 .then((response) => $scope.loc1 = Object.keys(response.data)
//                                 .map((key) => response.data[key].state.data)
//                                 .reverse());
//                      $scope.getProcessedLCs();
//
//                      $scope.openLc = (ID) => {
//                            $location.path("/lcOpen");
//                        $rootScope.ID = ID;
//                        console.log("ID in home page  ",ID);
//                         }
//                    //start
//                    $scope.getAmendedLCs = () => $http.get(apiBaseURL + "lcamendreq")
//                                    .then((response) => $scope.locamend = Object.keys(response.data)
//                                    .map((key) => response.data[key])
//                                    .reverse());
//                    $scope.getAmendedLCs();
//
//                    //end
//
//                    //start here
//                    $scope.amendAccept = (AmendID,AmendReqID) => {
//                            $rootScope.AmendID = AmendID;
//                            $rootScope.AmendReqID = AmendReqID;
//                            console.log("AmendID in home page  ",AmendID,AmendReqID);
//                            $location.path("/lcAmendAccept");
//                    }
//                    //end here
//
//                    //start here
//                    $scope.approveAmendedLC = (AmendID) => {
//                             $rootScope.AmendID = AmendID;
//                             //$rootScope.AmendReqID = AmendReqID;
//                             console.log("AmendID in home page  ",AmendID);
//                             $location.path("/lcAmendApprove");
//                    }
//                    //end here
//
//
//                  $scope.approveLc = (ApproveID) => {
//                  $location.path("/lcApprove");
//                  $rootScope.ApproveID = ApproveID;
//                  console.log("ID in home page  ",ApproveID);
//                          }
//
//                   $http.get(apiBaseURL + "lcRequestID").then(function(response){
//                   $rootScope.lcRequestID = response.data.lcRequestID;
//                    console.log("lcRequestID in customer home page===>",response.data.lcRequestID);
//                               });
//
//                  $http.get(apiBaseURL + "me").then(function(response){
//                   $scope.thisNode = response.data.me;
//                   $rootScope.thisNode = $scope.thisNode;
//                   console.log("me===>",response.data.me);
//                        });
//
//
//
//
////================================================================================================================================
//// Below is the logic for displaying the amended lc records based on the version number
////================================================================================================================================
//
////Start
//
//$scope.numberofamendval = null;
//
//$scope.empamendList=function(id,amendId){
//
//$scope.numberofamendval = id
//                                const getObj = apiBaseURL + "employee-lc-orders/"+amendId;
//                                  $http.get(getObj).then(function(response){
//
//                                          var finalData = response.data;
//                                          var len=finalData[0].lcorder.lcNumberOfAmendment;
//
//                                          var idVal= parseInt(id);
//                                          console.log("length",len);
//                                          console.log("idVal",idVal);
//
//
//
//                            if (idVal==len){
//
//                                          $scope.amendAmountval=finalData[0].lcorder.lcAmount;
//                                          //$scope.numberOfAmendmentval=finalData[0].lcorder.lcNumberOfAmendment;
//                                          $scope.lcAmendAdvisingBankRefval=finalData[0].lcorder.advisingBankID;
//                                          $scope.amendModeOfShipmentval=finalData[0].lcorder.modeOfShipment;
//                                          $scope.lcAmendExpiryDateval=finalData[0].lcorder.lcExpiryDate;
//                                          $scope.lcAmendExpiryPlaceval=finalData[0].lcorder.lcExpiryPlace;
//                                          //$scope.amendmentDetailsval=finalData[0].lcorder.lcAmendmentDetails;
//
//                                            console.log("id last:",idVal,"length",len)
//                                          }
//
//                                          else
//                                           {
//                                          $scope.amendAmountval=finalData[0].lcorder.amendData[idVal].lcAmendAmount;
//                                          //$scope.numberOfAmendmentval=finalData[0].lcorder.amendData[idVal].numberOfAmendment;
//                                          $scope.lcAmendAdvisingBankRefval=finalData[0].lcorder.amendData[idVal].lcAmendAdvisingBankRef;
//                                          $scope.amendModeOfShipmentval=finalData[0].lcorder.amendData[idVal].amendModeOfShipment;
//                                          $scope.lcAmendExpiryDateval=finalData[0].lcorder.amendData[idVal].lcAmendExpiryDate;
//                                          $scope.lcAmendExpiryPlaceval=finalData[0].lcorder.amendData[idVal].lcAmendExpiryPlace;
//                                          //$scope.amendmentDetailsval=finalData[0].lcorder.amendData[idVal].amendmentDetails;
//                                            console.log("id others:",idVal,"length",len)
//                                          }
//
//
//                                          });
//                              }
//
//
//    $scope.empmyvar = false;
//
//    $scope.historyemp=(amendId)=>{
//
//    $scope.empmyvar = true;
//
//    const getObj = apiBaseURL + "employee-lc-orders/"+amendId;
//
//         $http.get(getObj).then(function(response){
//
//                                           var finalData = response.data;
//                                          var len=finalData[0].lcorder.lcNumberOfAmendment;
//
//    if($scope.numberofamendval!=null){
//                                          var idVal= parseInt($scope.numberofamendval);
//                                          console.log("length",len);
//                                          console.log("idVal",idVal);
//
//
//
//                            if (idVal==len){
//
//                                          $scope.amendAmountval=finalData[0].lcorder.lcAmount;
//                                          //$scope.numberOfAmendmentval=finalData[0].lcorder.lcNumberOfAmendment;
//                                          //$scope.lcAmendAdvisingBankRefval=finalData[0].lcorder.advisingBankID;
//                                          $scope.amendModeOfShipmentval=finalData[0].lcorder.modeOfShipment;
//                                          $scope.lcAmendExpiryDateval=finalData[0].lcorder.lcExpiryDate;
//                                          $scope.lcAmendExpiryPlaceval=finalData[0].lcorder.lcExpiryPlace;
//                                          //$scope.amendmentDetailsval=finalData[0].lcorder.lcAmendmentDetails;
//
//                                            console.log("id last:",idVal,"length",len)
//                                          }
//
//                                          else
//                                           {
//                                          $scope.amendAmountval=finalData[0].lcorder.amendData[idVal].lcAmendAmount;
//                                          //$scope.numberOfAmendmentval=finalData[0].lcorder.amendData[idVal].numberOfAmendment;
//                                          //$scope.lcAmendAdvisingBankRefval=finalData[0].lcorder.amendData[idVal].lcAmendAdvisingBankRef;
//                                          $scope.amendModeOfShipmentval=finalData[0].lcorder.amendData[idVal].amendModeOfShipment;
//                                          $scope.lcAmendExpiryDateval=finalData[0].lcorder.amendData[idVal].lcAmendExpiryDate;
//                                          $scope.lcAmendExpiryPlaceval=finalData[0].lcorder.amendData[idVal].lcAmendExpiryPlace;
//                                          //$scope.amendmentDetailsval=finalData[0].lcorder.amendData[idVal].amendmentDetails;
//                                            console.log("id others:",idVal,"length",len)
//                                          }
//}
//
//                                          });
//
//        }
//
//         // End
//
//        //disable part start here
//$scope.disableButton=(loc)=>{
//
//console.log("hi came here:loc",loc);
//console.log("hi came here:scope.node",$rootScope.thisNode);
////|| loc.status == "APPROVED" || loc.status == "AMEND_APPROVED"
//    if(loc.lcorder.advisingBankID != $rootScope.thisNode || loc.status == "APPROVED" || loc.status == "AMEND APPROVED"){
//       return true;
//    }
//    else if(loc.status == "AMENDED"){
//       return true;
//    }
//    else{
//        return false;
//    }
//
//}
//
//$scope.disableAmendButton=(loc)=>{
//
//console.log("hi came here:loc",loc);
//console.log("hi came here:scope.node",$rootScope.thisNode);
////|| loc.status == "APPROVED" || loc.status == "AMEND_APPROVED"
//    if(loc.lcorder.advisingBankID != $rootScope.thisNode || loc.status == "APPROVED" || loc.status == "AMEND APPROVED"){
//       return true;
//    }
//    else if(loc.status == "OPENED"){
//       return true;
//    }
//    else{
//        return false;
//    }
//
//}
////end here
//
//
//
//                        }
//                        else{
//                        $location.path("/customer");
//                        }
//                });
//
//
//
//
//
//
////------------------------------------------------------------------------------------------------------------------------------------
////LC Request
////------------------------------------------------------------------------------------------------------------------------------------
//
//         app.controller('requestController', function($http,$uibModal, $location,$rootScope, $scope,$cookies,$cookieStore) {
//         if($cookieStore.get('customer')){
//                          $scope.message = 'Request Letter of Credit';
//                          const apiBaseURL = $rootScope.apiBaseURL;
//                          const LCRequestId = $rootScope.lcRequestID;
//                          $scope.node = $rootScope.thisNode;
//
//
//
//                          $scope.logout = function(){
//                          $cookieStore.remove('customer');
//                          $location.path("/customer");
//                                };
//                          const requestID = "LC-REQ-"+LCRequestId;
//                            $scope.username = $cookieStore.get('customer');
//                            $http.get($rootScope.apiBaseURL + "customer/detail/id/"+ $scope.username).then(function(response){
//                                                  $scope.lcForm.lcissuedate = new Date();
//                                                  $scope.lcForm.lcReqNo  = requestID;
//                                                  $scope.lcForm.applicant  = response.data.name;
//                                                  $scope.lcForm.applicantaddress  = response.data.customeraddress;
//                                                  $scope.lcForm.applicantBank = response.data.bank;
//                                                  $scope.lcForm.applicantBankAddress = response.data.bankaddress;
//                                                 });
//
//
//
//                        $http.get($rootScope.apiBaseURL + "othercustomer").then(function(response){
//                                                $scope.cusList = [];
//                                                    const otherCustomer = response.data;
//                                               for(var j=0; j<otherCustomer.length; j++){
//                                                           $scope.cusList.push(otherCustomer[j].ibanno);
//                                                     };
//
//
//                                 });
//
//                        //Amount Test
//
//                        /*$s
//                        $scope.AmountChange = function() {
//                                    const amountValue = $scope.lcForm.amount;
//                                     };*/
//                        //end
//
//
//                         $scope.ibanChange = function() {
//                        const ibanValue = $scope.lcForm.iban;
//                        $http.get($rootScope.apiBaseURL + "customer/detail/"+ ibanValue).then(function(response){
//                                                  $scope.lcForm.beneficiary  = response.data.name;
//                                                  $scope.lcForm.beneficiaryaddress  = response.data.customeraddress;
//                                                  $scope.lcForm.beneficiarybank  = response.data.bank;
//                                                  $scope.lcForm.beneficiarybankaddress  = response.data.bankaddress;
//                                 });
//                         };
//
//                              $scope.lcForm = {};
//                              $scope.formError = false;
//                              $scope.isCollapsed = true;
//
//                              $scope.lcForm.DraftsAt='SIGHT';                                
//                              $scope.lctype=['SELECT','SIGHT','USANCE','MIXED'];
//
//                           	  //$scope.lctype=['SIGHT','USANCE','MIXED'];
//                           	  $scope.incoTerms = ['CFR-Cost and freight','CIF-Cost,Insurance and freight','CIP-Carriage and Insurance paid to','CPT-Carriage paid to','DAF-Delivered at Frontier','DAP-Delivered at place','DAT-Delivered at terminal',
//                           	                        'DDP-Delivered duty paid','DDU-Delivered duty unpaid','DEQ-Delivered Ex Quay','DES-Delivered Ex ship','EXW-Ex Works','FAS-Free Alongside Ship','FCA-Free carrier','FOB-Free on board'];
//
//
//                               $scope.percent1 = () =>{
//                               console.log("percent1")
//                               var per=$scope.lcForm.Percentage_sight;
//                               var amt=$scope.lcForm.lcamount;
//                               var res=amt*per/100;
//                               console.log(res);
//                               $scope.lcForm.lcamount_sight=res;
//                               $scope.lcForm.Percentage_usance=100-$scope.lcForm.Percentage_sight;
//
//
//                               }
//                                $scope.percent2 = () =>{
//                                  console.log("percent2")
//                                var per=$scope.lcForm.Percentage_usance;
//                                var per=100-$scope.lcForm.Percentage_sight;
//                                var amt=$scope.lcForm.lcamount;
//                                 console.log(res);
//                                var res=amt*per/100;
//
//                                $scope.lcForm.lcamount_usance=res;
//
//                              }
//
//                                $scope.drafts = () =>{
//                                    var x =$scope.lcForm.lctype;
//                                          if(x=='USANCE'){
//                                           // alert("input empty");
//                                               $scope.lcForm.DraftsAt_usance='';
//                                               $scope.lcForm.DraftsAt_sight='USANCE';
//                                               $scope.lcForm.lcamount_usance='';
//                                               $scope.lcForm.lcamount_sight='';
//                                               $scope.lcForm.shipmentperiod_sight='';
//                                               $scope.lcForm.shipmentperiod_usance;
//                                                $scope.lcForm.Percentage_sight='';
//                                                $scope.lcForm.Percentage_usance='';
//                                                 }
//                                                 else if(x=='SIGHT'){
//                                                    $scope.lcForm.DraftsAt_sight='SIGHT';
//                                                    $scope.lcForm.DraftsAt_usance='';
//                                                    $scope.lcForm.lcamount_usance='';
//                                                    $scope.lcForm.lcamount_sight='';
//                                                    $scope.lcForm.shipmentperiod_sight='';
//                                                   $scope.lcForm.shipmentperiod_usance;
//                                                    $scope.lcForm.Percentage_sight='';
//                                                    $scope.lcForm.Percentage_usance='';
//
//
//                                                 }
//                                                 else if(x=='MIXED'){
//                                                $scope.lcForm.DraftsAt_usance='';
//                                                $scope.lcForm.DraftsAt_sight='';
//                                                $scope.lcForm.Percentage_sight='';
//                                                $scope.lcForm.Percentage_usance='';
//                                                $scope.lcForm.lcamount_sight='';
//                                                $scope.lcForm.lcamount_usance='';
//                                                $scope.lcForm.shipmentperiod_sight='';
//                                                $scope.lcForm.shipmentperiod_usance;
//                                                $scope.lcForm.DraftsAt_sight='SIGHT';
//                                                $scope.lcForm.DraftsAt_usance='USANCE';
//                                                 }
//                                                   else if(x=='SELECT'){
//                                                $scope.lcForm.DraftsAt_usance='';
//                                                $scope.lcForm.DraftsAt_sight='';
//                                                $scope.lcForm.Percentage_sight='';
//                                                $scope.lcForm.Percentage_usance='';
//                                                $scope.lcForm.lcamount_sight='';
//                                                $scope.lcForm.lcamount_usance='';
//                                                $scope.lcForm.shipmentperiod_sight='';
//                                                $scope.lcForm.shipmentperiod_usance;
//                                                $scope.lcForm.DraftsAt_sight='SIGHT';
//                                                $scope.lcForm.DraftsAt_usance='USANCE';
//                                                 }
//                                             }
//
//
//
//                              $scope.lccurrency = ['USD'];
//                              $scope.lcForm.lcissuedate = new Date().toLocaleDateString();
//
//
//                              console.log("LCRequestId as current node",LCRequestId);
//
//                              //chndu integration
//
//                                                            $scope.datechange = () => {
//                                                                    console.log("dateChange triggered");
//                                                                    if($scope.lcForm.shipmentdate>$scope.lcForm.lcexpirydate){
//                                                                           console.log("Inside date if");
//                                                                           alert("Shipment Date should be less than LC Expiry Date");
//                                                                           $scope.lcForm.shipmentdate =$scope.lcForm.lcissuedate;
//
//                                                                    }
//                                                            }
//
//                                                            $scope.expirydatechange= () => {
//
//                                                                    console.log("dateChange in Expiry date triggered");
//                                                                    console.log("hi");
//                                                                    console.log("LC ISSUE DATE",$scope.lcForm.lcissuedate);
//                                                                    if($scope.lcForm.lcexpirydate<$scope.lcForm.lcissuedate){
//                                                                         console.log("Inside date if expiry");
//                                                                         alert("lcExpiry Date should not be less than lcIssueDate");
//                                                                         $scope.lcForm.lcexpirydate =$scope.lcForm.lcissuedate;
//                                                                    }
//                                                            }
//
//                                                            $scope.lcAmountcheck = () =>  {
//                                                              console.log("LC AMOUNT",$scope.lcForm.lcamount);
//                                                              var value = $scope.lcForm.lcamount;
//                                                              //var Amtval = value.split(/(\d+)/).filter(Boolean);
//                                                              var Amtval = value.split(/^([-+]?[0-9]*\.?[0-9]+)([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ])$/);
//                                                              console.log("AMT VAL  ",Amtval);
//
//                                                              if(Amtval[2].toLowerCase()=='m'|| Amtval[2].toLowerCase()=='h'|| Amtval[2].toLowerCase()=='t'){
//
//                                                              if(Amtval[2].toLowerCase()== "m"){
//                                                              $scope.lcForm.lcamount = Amtval[1]*1000000;
//                                                              }
//                                                              else if(Amtval[2].toLowerCase()== "h")
//                                                              {
//                                                              $scope.lcForm.lcamount = Amtval[1]*100;
//                                                              }
//                                                              else if(Amtval[2].toLowerCase()== "t")
//                                                              {
//                                                              $scope.lcForm.lcamount = Amtval[1]*1000;
//                                                              }
//                                                              else {
//                                                              $scope.lcForm.lcamount = $scope.lcForm.lcamount;
//                                                              }
//                                                              }
//                                                              else{
//                                                              console.log("inside check else");
//                                                              $scope.lcForm.lcamount = "";
//
//                                                              }
//                                                            }
//
//
//                              //end
//
//                              $scope.create = () => {
//                                  if (invalidFormInput()) {
//                                      formError = true;
//                                  } else {
//                                      formError = false;
//
//                                      const loc = {
//
//        lcReqId : $scope.lcForm.lcReqNo,
//        applicantCustomer : $scope.lcForm.applicant,
//        applicantAddress : $scope.lcForm.applicantaddress,
//        shipmentPeriod : $scope.lcForm.shipmentperiod,
//        lcExpiryDate : new Date($scope.lcForm.lcexpirydate).toLocaleDateString(), //new Date($scope.lcForm.lcexpirydate).toLocaleDateString()
//        modeOfShipment : $scope.lcForm.modeofshipment,
//        beneficiaryId : $scope.lcForm.beneficiary,
//        beneficiaryAddress : $scope.lcForm.beneficiaryaddress,
//        lcType : $scope.lcForm.lctype,
//        lcCurrency : $scope.lcForm.lccurrency,
//        lcAmount : $scope.lcForm.lcamount,
//        lcIssueDate : new Date($scope.lcForm.lcissuedate).toLocaleDateString(),
//        lcExpiryPlace : $scope.lcForm.lcexpiryplace,
//        latestShipmentDate : new Date($scope.lcForm.shipmentdate).toLocaleDateString(),
//        liabilityReversalDate : new Date($scope.lcForm.liabilitydate).toLocaleDateString(),
//        advisingBankID : $scope.lcForm.beneficiarybank,
//        applicantBank : $scope.lcForm.applicantBank,
//        applicantBankAddress : $scope.lcForm.applicantBankAddress,
//        advisingBankAddress : $scope.lcForm.beneficiarybankaddress,
//        formofDocumentaryCredit : $scope.lcForm.DocumentaryCredit,
//        documentaryCreditNumber : $scope.lcForm.CreditNumber,
//        availableWithBy : $scope.lcForm.AvailableWith,
//        forTransportationTo : $scope.lcForm.TransportationTo,
//        descriptionOfGoodsAndOrServices : $scope.lcForm.DescOfGoods,
//        additionalConditions : $scope.lcForm.additionalConditions,
//        periodForPresentation : $scope.lcForm.PeriodForPresentaion,
//        advisingThroughBank : $scope.lcForm.AdvisingThroughBank,
//        transshipment : $scope.lcForm.transhipment,
//        portofLoading: $scope.lcForm.PortofLoading,
//        maximumCreditAmount : $scope.lcForm.MaxCreditAmount,
//
//        //New Changes :Deepak :begin 24-03-2017
//
//        draftsAtSight : $scope.lcForm.DraftsAt_sight,
//        draftsAtUsance :  $scope.lcForm.DraftsAt_usance,
//        shipmentPeriodSight : $scope.lcForm.shipmentperiod_sight,
//        shipmentPeriodUsance : $scope.lcForm.shipmentperiod_usance,
//        percentageSight : $scope.lcForm.Percentage_sight,
//        percentageUsance :$scope.lcForm.Percentage_usance,
//        lcAmountSight : $scope.lcForm.lcamount_sight,
//        lcAmountUsance : $scope.lcForm.lcamount_usance,
//
//        //New Changes :Deepak :End 24-03-2017
//
//        partialShipments : $scope.lcForm.PartialShipments,
//        senderToReceiverInformation : $scope.lcForm.SenderToReceiverInfo,
//        charges : $scope.lcForm.Charges,
//        confirmationInstructions : $scope.lcForm.ConfirmationInstruction,
//        sequenceOfTotal : $scope.lcForm.SequenceTotal,
//        ibanNumber : $scope.lcForm.iban,
//        incoTerms:$scope.lcForm.incoTerms,
//        status : "PENDING",
//
//                                      };
////                                      console.log("value",$scope.lcForm.SequenceTotal);
////                                      console.log("key",sequenceOfTotal);
//                                       console.log("loc  >",loc);
//
//                                       const createLCEndpoint =
//                                          apiBaseURL +
//                                          "lcreq";
//                                  $http.post(createLCEndpoint, angular.toJson(loc)).then(
//                                     function(result){
//                                      // success callback
//                                      console.log("INSIDE SUCCESS FUNCTION");
//                                      $location.path("/customerHome");
//                                      displayMessage(result);
//                                      }, 
//                                      function(result){
//                                      // failure callback
//                                      console.log("INSIDE ERROR FUNCTION");
//                                      displayMessage(result);
//                                      }
//                                      );
//                                  }
//                              };
//
//                              displayMessage = (message) => {
//                                  const modalInstanceTwo = $uibModal.open({
//                                      templateUrl: 'messageContent.html',
//                                      controller: 'messageCtrl',
//                                      controllerAs: 'modalInstanceTwo',
//                                      resolve: { message: () => message }
//                                  });
//
//                                  modalInstanceTwo.result.then(() => {}, () => {});
//                              };
//                            $scope.cancel = () => {
//                                                $location.path("/customerHome");
//                                          }
//                         function invalidFormInput() {
//                                  const invalidNonItemFields = !$scope.lcForm.lcReqNo
//                          //            || isNaN(modalInstance.form.orderNumber)
//                          //            || !modalInstance.form.deliveryDate
//                          //            || !modalInstance.form.city
//                          //            || !modalInstance.form.country;
//                          //
//                          //        const inValidCounterparty = modalInstance.form.counterparty === undefined;
//                          //
//                          //        const invalidItemFields = modalInstance.items
//                          //            .map(item => !item.name || !item.amount || isNaN(item.amount))
//                          //            .reduce((prev, curr) => prev && curr);
//
//                                  return invalidNonItemFields;
//                              }
//                              }
//                              else{
//                              $location.path("/customer");
//                              }
//
//                        });
//
//
//  //---------------------------------------------------------------------------------------------------------------------------------------------
//  //LC Open code after lc request from customer
//  //---------------------------------------------------------------------------------------------------------------------------------------------
//  //Start
//         app.controller('openController', function($http,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore) {
//         if($cookieStore.get('employee')){
//                            $scope.message = 'Open Letter of Credits ';
//                            $scope.IsDocReqDisabled = true;
//                            $scope.node = $rootScope.thisNode;
//                            $scope.username = $cookieStore.get('employee');
//                            console.log("OPENING ID ===>",$rootScope.ID ," node is ",$scope.node," username is ",$scope.username);
//                            const LCRequestId = $rootScope.lcRequestID;
//                                $scope.lcOpenForm = {};
//                                $scope.formError = false;
//                            $scope.logout = function(){
//                            $cookieStore.remove('employee');
//                            $location.path("/customer");
//                                };
//
//                         $scope.checkIsDocReqDisabled = function() {
//                         console.log("checkIsDocReqDisabled --->",$scope.lcOpenForm.DocRequired);
//                         if($scope.lcOpenForm.DocRequired != null )
//                        {
//                         $scope.IsDocReqDisabled = false;
//                         }
//                         else
//                          {
//                          $scope.IsDocReqDisabled = true;
//                          }
//                         console.log("$scope.lcForm.IsDocReqDisabled --->",$scope.IsDocReqDisabled);
//                         };
//
//
//                            const LCReqNumb = $rootScope.ID;
//                            const apiBaseURL = $rootScope.apiBaseURL;
//                            const getObj = apiBaseURL + "lcreq/" + LCReqNumb;
//
//                  console.log("url path --->",getObj);
//
//
//                                $http.get(getObj).then(function(response){
//                                var modelData = response.data;
//                                console.log("RESPONSE DATA ", modelData);
//
//          $scope.lcOpenForm.lcId= "LC-"+LCRequestId ;
//          $scope.lcOpenForm.applicant=	modelData.applicantCustomer;
//          $scope.lcOpenForm.applicantaddress=	modelData.applicantAddress;
//          //$scope.lcOpenForm.presentationdays=	modelData.presentationDays;
//          $scope.lcOpenForm.shipmentperiod=	modelData.shipmentPeriod;
//          $scope.lcOpenForm.lcexpirydate=	modelData.lcExpiryDate;
//          $scope.lcOpenForm.modeofshipment=	modelData.modeOfShipment;
//          $scope.lcOpenForm.beneficiary=	modelData.beneficiaryId;
//          $scope.lcOpenForm.beneficiaryaddress=	modelData.beneficiaryAddress;
//          $scope.lcOpenForm.lctype=	modelData.lcType;
//          $scope.lcOpenForm.lccurrency=	modelData.lcCurrency;
//          $scope.lcOpenForm.lcamount=	modelData.lcAmount;
//          $scope.lcOpenForm.lcissuedate=	new Date(modelData.lcIssueDate).toLocaleDateString();
//          $scope.lcOpenForm.lcexpiryplace=	modelData.lcExpiryPlace;
//          $scope.lcOpenForm.shipmentdate=	new Date(modelData.latestShipmentDate).toLocaleDateString();
//          $scope.lcOpenForm.liabilitydate=	new Date(modelData.liabilityReversalDate).toLocaleDateString();
//          $scope.lcOpenForm.beneficiarybank=	modelData.advisingBankID;
//          $scope.lcOpenForm.applicantBank=	modelData.applicantBank;
//          $scope.lcOpenForm.applicantBankAddress=	modelData.applicantBankAddress;
//          $scope.lcOpenForm.beneficiarybankaddress=	modelData.advisingBankAddress;
//          $scope.lcOpenForm.DocumentaryCredit=	modelData.formofDocumentaryCredit;
//          $scope.lcOpenForm.CreditNumber=	"LC-"+LCRequestId;
//          $scope.lcOpenForm.AvailableWith=	modelData.availableWithBy;
//          $scope.lcOpenForm.TransportationTo=	modelData.forTransportationTo;
//          $scope.lcOpenForm.DescOfGoods=	modelData.descriptionOfGoodsAndOrServices;
//          $scope.lcOpenForm.additionalConditions=	modelData.additionalConditions;
//          $scope.lcOpenForm.PeriodForPresentaion=	modelData.periodForPresentation;
//          $scope.lcOpenForm.AdvisingThroughBank=	modelData.advisingThroughBank;
//          $scope.lcOpenForm.transhipment=	modelData.transshipment;
//          //$scope.lcOpenForm.TakingCharge=	modelData.onBoardOrDispOrTakingCharge;
//          $scope.lcOpenForm.PortofLoading=	modelData.portofLoading;
//
//          //$scope.lcOpenForm.TakingCharge=	modelData.onBoardOrDispOrTakingCharge;
//          $scope.lcOpenForm.MaxCreditAmount=	modelData.maximumCreditAmount;
//          //$scope.lcOpenForm.DraftsAt=	modelData.draftsAt;
//          $scope.lcOpenForm.PartialShipments=	modelData.partialShipments;
//          $scope.lcOpenForm.SenderToReceiverInfo=	modelData.senderToReceiverInformation;
//          $scope.lcOpenForm.Charges=	modelData.charges;
//          $scope.lcOpenForm.ConfirmationInstruction=	modelData.confirmationInstructions;
//          $scope.lcOpenForm.SequenceTotal=	modelData.sequenceOfTotal;
//          $scope.lcOpenForm.iban=	modelData.ibanNumber;
//          $scope.lcOpenForm.incoTerms=modelData.incoTerms;
//            //New Changes:24-03-2017 : Deepak:Begin
//           $scope.lcOpenForm.DraftsAt_sight=	modelData.draftsAtSight;
//           $scope.lcOpenForm.DraftsAt_usance=	modelData.draftsAtUsance;
//           $scope.lcOpenForm.shipmentperiod_sight=	modelData.shipmentPeriodSight;
//           $scope.lcOpenForm.shipmentperiod_usance=	modelData.shipmentPeriodUsance;
//           $scope.lcOpenForm.Percentage_sight=	modelData.percentageSight;
//           $scope.lcOpenForm.Percentage_usance=	modelData.percentageUsance;
//           $scope.lcOpenForm.lcamount_sight=	modelData.lcAmountSight;
//           $scope.lcOpenForm.lcamount_usance=	modelData.lcAmountUsance;
//            //New Changes:24-03-2017 : Deepak:END
//
// //--------------------------------------------------------------------------------------
// //Code for document Required
// //--------------------------------------------------------------------------------------
// //Start
//
//
// //--------------------------------------------------------------------------------------
//
////End
//                          //"PENDING",	modelData.status
//
//            });
//                                //});
//
//           $scope.Open = () => {
//
//                            const openLoc = {
//
//                                       lcId : $scope.lcOpenForm.lcId,
//                                       lcReqId:LCReqNumb,
//                                       applicantCustomer : $scope.lcOpenForm.applicant,
//                                       applicantAddress : $scope.lcOpenForm.applicantaddress,
//                                       //presentationDays : $scope.lcOpenForm.presentationdays,
//                                       //shipmentPeriod : $scope.lcOpenForm.shipmentperiod,
//                                       lcExpiryDate : $scope.lcOpenForm.lcexpirydate,
//                                       modeOfShipment : $scope.lcOpenForm.modeofshipment,
//                                       beneficiaryId : $scope.lcOpenForm.beneficiary,
//                                       beneficiaryAddress : $scope.lcOpenForm.beneficiaryaddress,
//                                       lcType : $scope.lcOpenForm.lctype,
//                                       lcCurrency : $scope.lcOpenForm.lccurrency,
//                                       lcAmount : $scope.lcOpenForm.lcamount,
//                                       lcAmountTemp : $scope.lcOpenForm.lcamount,
//                                       lcIssueDate : $scope.lcOpenForm.lcissuedate,
//                                       lcExpiryPlace : $scope.lcOpenForm.lcexpiryplace,
//                                       latestShipmentDate : $scope.lcOpenForm.shipmentdate,
//                                       liabilityReversalDate : $scope.lcOpenForm.liabilitydate,
//                                       advisingBankID : $scope.lcOpenForm.beneficiarybank,
//                                       applicantBank : $scope.lcOpenForm.applicantBank,
//                                       applicantBankAddress : $scope.lcOpenForm.applicantBankAddress,
//                                       advisingBankAddress : $scope.lcOpenForm.beneficiarybankaddress,
//                                       formofDocumentaryCredit : $scope.lcOpenForm.DocumentaryCredit,
//                                       documentaryCreditNumber : $scope.lcOpenForm.CreditNumber,
//                                       availableWithBy : $scope.lcOpenForm.AvailableWith,
//                                       forTransportationTo : $scope.lcOpenForm.TransportationTo,
//                                       descriptionOfGoodsAndOrServices : $scope.lcOpenForm.DescOfGoods,
//                                       additionalConditions : $scope.lcOpenForm.additionalConditions,
//                                       periodForPresentation : $scope.lcOpenForm.PeriodForPresentaion,
//                                       advisingThroughBank : $scope.lcOpenForm.AdvisingThroughBank,
//                                       transshipment : $scope.lcOpenForm.transhipment,
//                                       portofLoading : $scope.lcOpenForm.PortofLoading,
//                                       maximumCreditAmount : $scope.lcOpenForm.MaxCreditAmount,
//                                       draftsAt : $scope.lcOpenForm.DraftsAt,
//                                       partialShipments : $scope.lcOpenForm.PartialShipments,
//                                       senderToReceiverInformation : $scope.lcOpenForm.SenderToReceiverInfo,
//                                       charges : $scope.lcOpenForm.Charges,
//                                       confirmationInstructions : $scope.lcOpenForm.ConfirmationInstruction,
//                                       sequenceOfTotal : $scope.lcOpenForm.SequenceTotal,
//                                       ibanNumber : $scope.lcOpenForm.iban,
//                                       incoTerms:$scope.lcOpenForm.incoTerms,
//
//
//                             //New Changes:24-03-2017 : Deepak:Begin
//                                     draftsAtSight:  $scope.lcOpenForm.DraftsAt_sight,
//                                      draftsAtUsance: $scope.lcOpenForm.DraftsAt_usance,
//                                     shipmentPeriodSight: $scope.lcOpenForm.shipmentperiod_sight,
//                                     shipmentPeriodUsance: $scope.lcOpenForm.shipmentperiod_usance,
//                                      percentageSight: $scope.lcOpenForm.Percentage_sight,
//                                   percentageUsance:    $scope.lcOpenForm.Percentage_usance,
//                                      lcAmountSight: $scope.lcOpenForm.lcamount_sight,
//                                     lcAmountUsance:  $scope.lcOpenForm.lcamount_usance ,
//                                        //New Changes:24-03-2017 : Deepak:END
//
//
//
//                                         documentsRequired : $scope.lcOpenForm.DocRequired,
//
//
//                                       //status : "Processed",
//                                              };
//
//                        const openLCEndpoint =
//                            apiBaseURL +"lc-open";
//
//                       /*$http.post(openLCEndpoint, angular.toJson(openLoc)).then(
//                            (result) => displayMessage(result),
//                            (result) => displayMessage(result)
//                        );*/
//                        $http.post(openLCEndpoint, angular.toJson(openLoc)).then(
//                           function(result){
//                            console.log("INSIDE SUCCESS FUNCTION",openLoc);
//                            $location.path("/employeeHome");
//                            displayMessage(result);
//                            }, 
//                            function(result){
//                            // failure callback
//                            console.log("INSIDE ERROR FUNCTION");
//                            displayMessage(result);
//                                                                 }
//                                //(result) => displayMessage(result),
//                                //(result) => displayMessage(result)
//                            );
//                         console.log("LC opened and the object is  ",openLoc);
//
//                                }
//                                $scope.cancel = () => {
//                                      $location.path("/employeeHome");
//                                }
//                                displayMessage = (message) => {
//                                console.log("message in display message--->",message);
//                                        const modalInstanceTwo = $uibModal.open({
//                                            templateUrl: 'messageContent.html',
//                                            controller: 'messageCtrl',
//                                            controllerAs: 'modalInstanceTwo',
//                                            resolve: { message: () => message }
//                                        });
//
//                                        modalInstanceTwo.result.then(() => {}, () => {});
//                                    };
//
//                  				  /*
//                                function invalidFormInput() {
//                                    const invalidNonItemFields = !$scope.lcform.lcrequest
//                            //            || isNaN(modalInstance.form.orderNumber)
//                            //            || !modalInstance.form.deliveryDate
//                            //            || !modalInstance.form.city
//                            //            || !modalInstance.form.country;
//                            //
//                            //        const inValidCounterparty = modalInstance.form.counterparty === undefined;
//                            //
//                            //        const invalidItemFields = modalInstance.items
//                            //            .map(item => !item.name || !item.amount || isNaN(item.amount))
//                            //            .reduce((prev, curr) => prev && curr);
//
//                                    return invalidNonItemFields;
//                                }
//                  			  */
//                  			  }
//                              else{
//                              $location.path("/customer");
//                              }
//
//                          });
//
//   //End
//
//  //-----------------------------------------------------------------------------------------------------------------------------
//  //Code for LC Approve after LcOpen
//  //-----------------------------------------------------------------------------------------------------------------------------
//
//  //Start
//
//  app.controller('approvalController', function($http,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore) {
//  if($cookieStore.get('employee')){
//                    $scope.message = 'Approve Letter of Credits ';
//                    $scope.node = $rootScope.thisNode;
//                     $scope.username = $cookieStore.get('employee');
//                     console.log("APPROVING ID ===>",$rootScope.ApproveID,"  node is ",$scope.node," username is ",$scope.username);
//                     const LCReqNumb = $rootScope.ID;
//
//                        $scope.logout = function(){
//                        $cookieStore.remove('employee');
//                        $location.path("/customer");
//                            };
//                        $scope.lcApproveForm = {};
//                        $scope.formError = false;
//
//                    const LCApprovalId = $rootScope.ApproveID;
//                    const apiBaseURL = $rootScope.apiBaseURL;
//                    //const getObj = apiBaseURL + "lc-orders";
//                    const cusID1 = $cookieStore.get('employee');
//                    const getObj = apiBaseURL + "employee-lc-orders/"+LCApprovalId;
//
//                    $http.get(getObj).then(function(response){
//                    var finalData = response.data;
//                    console.log("RESPONSE DATA ", finalData);
//                    console.log("RESPONSE DATA final", finalData[0].lcorder,finalData[0]);
//                    $scope.lcRequestID = finalData[0].lcorder.lcReqId;
//
//                      $scope.lcApproveForm.lcId = finalData[0].lcorder.lcId;
//                      $scope.lcApproveForm.applicant = finalData[0].lcorder.applicantCustomer;
//                      $scope.lcApproveForm.applicantaddress = finalData[0].lcorder.applicantAddress;
//                      //$scope.lcApproveForm.shipmentperiod =  finalData[0].lcorder.shipmentPeriod;
//                      $scope.lcApproveForm.lcexpirydate = finalData[0].lcorder.lcExpiryDate;
//                      $scope.lcApproveForm.modeofshipment =  finalData[0].lcorder.modeOfShipment;
//                      $scope.lcApproveForm.beneficiary = finalData[0].lcorder.beneficiaryId;
//                      $scope.lcApproveForm.beneficiaryaddress = finalData[0].lcorder.beneficiaryAddress;
//                      $scope.lcApproveForm.lctype = finalData[0].lcorder.lcType;
//                      $scope.lcApproveForm.lccurrency = finalData[0].lcorder.lcCurrency;
//                      $scope.lcApproveForm.lcamount =  finalData[0].lcorder.lcAmount;
//                      $scope.lcApproveForm.lcissuedate = finalData[0].lcorder.lcIssueDate;
//                      $scope.lcApproveForm.lcexpiryplace = finalData[0].lcorder.lcExpiryPlace;
//                      $scope.lcApproveForm.shipmentdate = finalData[0].lcorder.latestShipmentDate;
//                      $scope.lcApproveForm.liabilitydate = finalData[0].lcorder.liabilityReversalDate;
//                      $scope.lcApproveForm.beneficiarybank = finalData[0].lcorder.advisingBankID;
//                      $scope.lcApproveForm.applicantBank = finalData[0].lcorder.applicantBank;
//                      $scope.lcApproveForm.applicantBankAddress = finalData[0].lcorder.applicantBankAddress;
//                      $scope.lcApproveForm.beneficiarybankaddress = finalData[0].lcorder.advisingBankAddress;
//                      $scope.lcApproveForm.DocumentaryCredit = finalData[0].lcorder.formofDocumentaryCredit;
//                      $scope.lcApproveForm.CreditNumber = finalData[0].lcorder.documentaryCreditNumber;
//                      $scope.lcApproveForm.AvailableWith = finalData[0].lcorder.availableWithBy;
//                      $scope.lcApproveForm.TransportationTo = finalData[0].lcorder.forTransportationTo;
//                      $scope.lcApproveForm.DescOfGoods = finalData[0].lcorder.descriptionOfGoodsAndOrServices;
//                      $scope.lcApproveForm.additionalConditions = finalData[0].lcorder.additionalConditions;
//                      $scope.lcApproveForm.PeriodForPresentaion = finalData[0].lcorder.periodForPresentation;
//                      $scope.lcApproveForm.AdvisingThroughBank = finalData[0].lcorder.advisingThroughBank;
//                      $scope.lcApproveForm.transhipment = finalData[0].lcorder.transshipment;
//                      $scope.lcApproveForm.PortofLoading = finalData[0].lcorder.portofLoading;
//                      $scope.lcApproveForm.MaxCreditAmount = finalData[0].lcorder.maximumCreditAmount;
//                      $scope.lcApproveForm.DraftsAt = finalData[0].lcorder.draftsAt;
//                      $scope.lcApproveForm.PartialShipments = finalData[0].lcorder.partialShipments;
//                      $scope.lcApproveForm.SenderToReceiverInfo = finalData[0].lcorder.senderToReceiverInformation;
//                      $scope.lcApproveForm.Charges = finalData[0].lcorder.charges;
//                      $scope.lcApproveForm.ConfirmationInstruction = finalData[0].lcorder.confirmationInstructions;
//                      $scope.lcApproveForm.SequenceTotal = finalData[0].lcorder.sequenceOfTotal;
//                      $scope.lcApproveForm.DocRequired = finalData[0].lcorder.documentsRequired;
//                      $scope.lcApproveForm.iban = finalData[0].lcorder.ibanNumber;
//                      $scope.lcApproveForm.incoTerms=finalData[0].lcorder.incoTerms;
//
//                      //New Changes:24-03-2017 : Deepak:Begin
//                                 $scope.lcApproveForm.DraftsAt_sight=	finalData[0].lcorder.draftsAtSight;
//                                 $scope.lcApproveForm.DraftsAt_usance=	finalData[0].lcorder.draftsAtUsance;
//                                 $scope.lcApproveForm.shipmentperiod_sight=	finalData[0].lcorder.shipmentPeriodSight;
//                                 $scope.lcApproveForm.shipmentperiod_usance=	finalData[0].lcorder.shipmentPeriodUsance;
//                                 $scope.lcApproveForm.Percentage_sight=	finalData[0].lcorder.percentageSight;
//                                 $scope.lcApproveForm.Percentage_usance=	finalData[0].lcorder.percentageUsance;
//                                 $scope.lcApproveForm.lcamount_sight=	finalData[0].lcorder.lcAmountSight;
//                                 $scope.lcApproveForm.lcamount_usance=	finalData[0].lcorder.lcAmountUsance;
//                        //New Changes:24-03-2017 : Deepak:END
//                        });
//
//
//                    $scope.approveLC = () => {
//
//                    const approveLOC = {
//                          lcId : $scope.lcApproveForm.lcId,
//                          lcReqId : $scope.lcRequestID,
//                          applicantCustomer : $scope.lcApproveForm.applicant,
//                          applicantAddress : $scope.lcApproveForm.applicantaddress,
//                          //shipmentPeriod : $scope.lcApproveForm.shipmentperiod,
//                          lcExpiryDate : $scope.lcApproveForm.lcexpirydate,
//                          modeOfShipment : $scope.lcApproveForm.modeofshipment,
//                          beneficiaryId : $scope.lcApproveForm.beneficiary,
//                          beneficiaryAddress : $scope.lcApproveForm.beneficiaryaddress,
//                          lcType : $scope.lcApproveForm.lctype,
//                          lcCurrency : $scope.lcApproveForm.lccurrency,
//                          lcAmount : $scope.lcApproveForm.lcamount,
//                          lcIssueDate : $scope.lcApproveForm.lcissuedate,
//                          lcExpiryPlace : $scope.lcApproveForm.lcexpiryplace,
//                          latestShipmentDate : $scope.lcApproveForm.shipmentdate,
//                          liabilityReversalDate : $scope.lcApproveForm.liabilitydate,
//                          advisingBankID : $scope.lcApproveForm.beneficiarybank,
//                          applicantBank : $scope.lcApproveForm.applicantBank,
//                          applicantBankAddress : $scope.lcApproveForm.applicantBankAddress,
//                          advisingBankAddress : $scope.lcApproveForm.beneficiarybankaddress,
//                          formofDocumentaryCredit : $scope.lcApproveForm.DocumentaryCredit,
//                          documentaryCreditNumber : $scope.lcApproveForm.CreditNumber,
//                          availableWithBy : $scope.lcApproveForm.AvailableWith,
//                          forTransportationTo : $scope.lcApproveForm.TransportationTo,
//                          descriptionOfGoodsAndOrServices : $scope.lcApproveForm.DescOfGoods,
//                          additionalConditions : $scope.lcApproveForm.additionalConditions,
//                          periodForPresentation : $scope.lcApproveForm.PeriodForPresentaion,
//                          advisingThroughBank : $scope.lcApproveForm.AdvisingThroughBank,
//                          transshipment : $scope.lcApproveForm.transhipment,
//                          portofLoading : $scope.lcApproveForm.PortofLoading,
//                          maximumCreditAmount : $scope.lcApproveForm.MaxCreditAmount,
//                          draftsAt : $scope.lcApproveForm.DraftsAt,
//                          partialShipments : $scope.lcApproveForm.PartialShipments,
//                          senderToReceiverInformation : $scope.lcApproveForm.SenderToReceiverInfo,
//                          charges : $scope.lcApproveForm.Charges,
//                          confirmationInstructions : $scope.lcApproveForm.ConfirmationInstruction,
//                          sequenceOfTotal : $scope.lcApproveForm.SequenceTotal,
//                          //documentsRequired : docrec1,
//                          ibanNumber : $scope.lcApproveForm.iban,
//                          incoTerms:$scope.lcApproveForm.incoTerms,
//
//                            //New Changes:24-03-2017 : Deepak:Begin
//
//                              draftsAtSight : $scope.lcApproveForm.DraftsAt_sight,
//                                draftsAtUsance: $scope.lcApproveForm.DraftsAt_usance,
//                                shipmentPeriodSight: $scope.lcApproveForm.shipmentperiod_sight,
//                                 shipmentPeriodUsance:$scope.lcApproveForm.shipmentperiod_usance,
//                                percentageSight: $scope.lcApproveForm.Percentage_sight,
//                                percentageUsance: $scope.lcApproveForm.Percentage_usance,
//                                 lcAmountSight:$scope.lcApproveForm.lcamount_sight,
//                                 lcAmountUsance:$scope.lcApproveForm.lcamount_usance,
//
//                            //New Changes:24-03-2017 : Deepak:END
//
//                          documentsRequired: $scope.lcApproveForm.DocRequired,
//                          //status : "APPROVED"
//                                };
//                                    const approveLCEndpoint =
//                                        apiBaseURL +"lc-approve";
//
//console.log("approve LOC object  ",approveLOC);
//                                   $http.post(approveLCEndpoint, angular.toJson(approveLOC)).then(
//                                   function(result){
//                                    // success callback
//                                    console.log("INSIDE SUCCESS FUNCTION");
//                                    $location.path("/employeeHome");
//                                    displayMessage(result);
//                                    }, 
//                                    function(result){
//                                    // failure callback
//                                    console.log("INSIDE ERROR FUNCTION");
//                                    displayMessage(result);
//                                                                         }
//                                        //(result) => displayMessage(result),
//                                        //(result) => displayMessage(result)
//                                    );
//                                    // console.log("LC approved and the object is  ",approveLoc);
//                                     //console.log("message status" , $scope.messageStatus);
//                                     //$location.path("/home");
//                        }
//                        $scope.cancel = () => {
//                              $location.path("/employeeHome");
//                        }
//                        displayMessage = (message) => {
//                        console.log("message in display message--->",message);
//                        $rootScope.messageStatus = message.status;
//                                const modalInstanceTwo = $uibModal.open({
//                                    templateUrl: 'messageContent.html',
//                                    controller: 'messageCtrl',
//                                    controllerAs: 'modalInstanceTwo',
//                                    resolve: { message: () => message }
//                                });
//
//                                modalInstanceTwo.result.then(() => {}, () => {});
//                            };
//
//                        function invalidFormInput() {
//                            const invalidNonItemFields = !$scope.lcform.lcrequest
//                    //            || isNaN(modalInstance.form.orderNumber)
//                    //            || !modalInstance.form.deliveryDate
//                    //            || !modalInstance.form.city
//                    //            || !modalInstance.form.country;
//                    //
//                    //        const inValidCounterparty = modalInstance.form.counterparty === undefined;
//                    //
//                    //        const invalidItemFields = modalInstance.items
//                    //            .map(item => !item.name || !item.amount || isNaN(item.amount))
//                    //            .reduce((prev, curr) => prev && curr);
//
//                            return invalidNonItemFields;
//                        }
//                        }
//                                                else{
//                                                $location.path("/customer");
//                                                }
//
//                  });
///*==========================================================================================================================
//                     ****************Code for LC Amendment Request************************
//                     ****************Developer name : Kesavan N B
//                      *****************Start************************/
//app.controller('DocumentsController', function($scope ,$uibModal,$rootScope,$http,$location,$cookies,$window,$cookieStore) {
//                                const apiBaseURL = $rootScope.apiBaseURL;
//                                  $scope.LCRequestId = $rootScope.LCID;
//                                  $scope.node = $rootScope.thisNode;
//                                  $scope.username = $cookieStore.get('employee');
//                                  $scope.logout = function(){
//                                  $cookieStore.remove('customer');
//                                  $location.path("/customer");
//                                        };
//                         const getObj = apiBaseURL + "employee-lc-orders/"+$scope.LCRequestId;
//                         $scope.getbills = () => $http.get(getObj).then(function(response) {
//                         $scope.bills = response.data[0].lcorder.bills;
//                         $scope.getData = response.data[0];
//                         console.log("response.data[0] in bill",$scope.bills);
//                         console.log("response.data[0] in lcorders",$scope.getData);
//                          })
//                        $scope.getbills();
//                  $scope.getUploads = () => $http.get("http://"+window.__env.apiUrl+":10009/getfilenames/"+$rootScope.LCID).then(function(response) {
//                  console.log("upload response",response);
//                  $scope.choices= response.data;
//                  console.log("response.data in bill",$scope.choices);
//     })
//
//         $scope.getUploads();
//         $scope.Downlod = (choice) => {
//                                                 $http.get("http://"+window.__env.apiUrl+":10009/download/"+$rootScope.LCID+"/"+choice).then(function(response) {
//                                                 console.log("http://"+window.__env.apiUrl+":10009/download/"+$rootScope.LCID+"/"+choice);
//                                                 $window.location.href = "http://"+window.__env.apiUrl+":10009/download/"+$rootScope.LCID+"/"+choice;
//
//                                          })
//                                          }
//
//
//                                          $scope.verify = function() {
//                                             $http.get(getObj).then(function(response){
//                                               var finalData = response.data;
//                                            console.log("RESPONSE DATA ", finalData[0]);
//                                                const VerifyStatus = {
//                                                lcId : $scope.LCRequestId,
//                                                 lcReqId : finalData[0].lcorder.lcReqId,
//                                                 applicantCustomer : finalData[0].lcorder.applicantCustomer,
//                                                 applicantAddress : finalData[0].lcorder.applicantAddress,
//                                                // shipmentPeriod : finalData[0].lcorder.shipmentPeriod,
//                                                 lcExpiryDate : finalData[0].lcorder.lcExpiryDate,
//                                                 modeOfShipment :  finalData[0].lcorder.modeOfShipment,
//                                                 beneficiaryId : finalData[0].lcorder.beneficiaryId,
//                                                 beneficiaryAddress : finalData[0].lcorder.beneficiaryAddress,
//                                                 lcType : finalData[0].lcorder.lcType,
//                                                 lcCurrency : finalData[0].lcorder.lcCurrency,
//                                                 lcAmount :  finalData[0].lcorder.lcAmount,
//                                                 lcAmountTemp : finalData[0].lcorder.lcAmount,
//
//                                                lcIssueDate : finalData[0].lcorder.lcIssueDate,
//                                                 lcExpiryPlace : finalData[0].lcorder.lcExpiryPlace,
//                                                 latestShipmentDate : finalData[0].lcorder.latestShipmentDate,
//                                                 liabilityReversalDate : finalData[0].lcorder.liabilityReversalDate,
//                                                 advisingBankID : finalData[0].lcorder.advisingBankID,
//                                                 applicantBank : finalData[0].lcorder.applicantBank,
//                                                 applicantBankAddress : finalData[0].lcorder.applicantBankAddress,
//                                                 advisingBankAddress : finalData[0].lcorder.advisingBankAddress,
//                                                 formofDocumentaryCredit : finalData[0].lcorder.formofDocumentaryCredit,
//                                                 documentaryCreditNumber : finalData[0].lcorder.documentaryCreditNumber,
//                                                 availableWithBy : finalData[0].lcorder.availableWithBy,
//                                                 forTransportationTo : finalData[0].lcorder.forTransportationTo,
//                                                 descriptionOfGoodsAndOrServices : finalData[0].lcorder.descriptionOfGoodsAndOrServices,
//                                                 additionalConditions : finalData[0].lcorder.additionalConditions,
//                                                 periodForPresentation : finalData[0].lcorder.periodForPresentation,
//                                                 advisingThroughBank : finalData[0].lcorder.advisingThroughBank,
//                                                 transshipment : finalData[0].lcorder.transshipment,
//                                                 portofLoading : finalData[0].lcorder.portofLoading,
//                                                 maximumCreditAmount : finalData[0].lcorder.maximumCreditAmount,
//                                                 draftsAt : finalData[0].lcorder.draftsAt,
//                                                 partialShipments : finalData[0].lcorder.partialShipments,
//                                                 senderToReceiverInformation : finalData[0].lcorder.senderToReceiverInformation,
//                                                 charges : finalData[0].lcorder.charges,
//                                                 confirmationInstructions : finalData[0].lcorder.confirmationInstructions,
//                                                 sequenceOfTotal : finalData[0].lcorder.sequenceOfTotal,
//                                                 documentsRequired : finalData[0].lcorder.documentsRequired,
//                                                ibanNumber : finalData[0].lcorder.ibanNumber,
//                                                 incoTerms : finalData[0].lcorder.incoTerms,
//                                                draftsAtSight:finalData[0].lcorder.draftsAtSight,
//                                                draftsAtUsance:finalData[0].lcorder.draftsAtUsance,
//                                                shipmentPeriodSight:finalData[0].lcorder.shipmentPeriodSight,
//                                                shipmentPeriodUsance:finalData[0].lcorder.shipmentPeriodUsance,
//                                                percentageSight:finalData[0].lcorder.percentageSight,
//                                                percentageUsance :finalData[0].lcorder.percentageUsance,
//                                                lcAmountSight:finalData[0].lcorder.lcAmountSight,
//                                                lcAmountUsance:finalData[0].lcorder.lcAmountUsance
//
//                                              };
//                                              console.log("verify object Json",VerifyStatus);
//                                               const createVerifyStatusEndpoint =
//                                                       apiBaseURL +
//                                                       "lc-docs-verify";
//                                               $http.post(createVerifyStatusEndpoint, angular.toJson(VerifyStatus)).then(
//                                                  function(result){
//                                                   // success callback
//                                                   console.log("INSIDE SUCCESS FUNCTION");
//                                                   alert("Documents Verified");
//                                                   $location.path("/employeeHome");
//                                                    }, 
//                                                   function(result){
//                                                   // failure callback
//                                                      console.log("upload Status Failure");
//                                                   });
//                                           });
//                                      }
//
//               //1. Used to list all selected files
//                  $scope.files = [];
//
//
//                  //3. listen for the file selected event which is raised from directive
//                  $scope.$on("seletedFile", function (event, args) {
//                      $scope.$apply(function () {
//                          //add the file object to the scope's files collection
//                          $scope.files.push(args.file);
//                      });
//                  });
//
//                  //4. Post data and selected files.
//                  $scope.save = function () {
//                      $http({
//                          method: 'POST',
//                          url: "http://"+window.__env.apiUrl+":10009/upload/"+$rootScope.LCID,
//                          headers: { 'Content-Type': undefined },
//                          transformRequest: function (data) {
//                                                             var formData = new FormData();
////                                                             formData.append("model", angular.toJson(data.model));
//                                                             for (var i = 0; i < data.files.length; i++) {
//                                                              formData.append("file" + i, data.files[i]);
//                                                             }
//                              return formData;
//                          },
//                          data: { files: $scope.files }
//                        }).
//                        success(function () {
//                              $http.get(getObj).then(function(response){
//                                                    var finalData = response.data;
//                                                    console.log("RESPONSE DATA ", finalData[0]);
//                                                           const uploadStatus = {
//                                                            lcId : $scope.LCRequestId,
//                                                             lcReqId : finalData[0].lcorder.lcReqId,
//                                                             applicantCustomer : finalData[0].lcorder.applicantCustomer,
//                                                             applicantAddress : finalData[0].lcorder.applicantAddress,
//                                                            // shipmentPeriod : finalData[0].lcorder.shipmentPeriod,
//                                                             lcExpiryDate : finalData[0].lcorder.lcExpiryDate,
//                                                             modeOfShipment :  finalData[0].lcorder.modeOfShipment,
//                                                             beneficiaryId : finalData[0].lcorder.beneficiaryId,
//                                                             beneficiaryAddress : finalData[0].lcorder.beneficiaryAddress,
//                                                             lcType : finalData[0].lcorder.lcType,
//                                                             lcCurrency : finalData[0].lcorder.lcCurrency,
//                                                             lcAmount :  finalData[0].lcorder.lcAmount,
//                                                             lcAmountTemp : finalData[0].lcorder.lcAmount,
//                                                            lcIssueDate : finalData[0].lcorder.lcIssueDate,
//                                                             lcExpiryPlace : finalData[0].lcorder.lcExpiryPlace,
//                                                             latestShipmentDate : finalData[0].lcorder.latestShipmentDate,
//                                                             liabilityReversalDate : finalData[0].lcorder.liabilityReversalDate,
//                                                             advisingBankID : finalData[0].lcorder.advisingBankID,
//                                                             applicantBank : finalData[0].lcorder.applicantBank,
//                                                             applicantBankAddress : finalData[0].lcorder.applicantBankAddress,
//                                                             advisingBankAddress : finalData[0].lcorder.advisingBankAddress,
//                                                             formofDocumentaryCredit : finalData[0].lcorder.formofDocumentaryCredit,
//                                                             documentaryCreditNumber : finalData[0].lcorder.documentaryCreditNumber,
//                                                             availableWithBy : finalData[0].lcorder.availableWithBy,
//                                                             forTransportationTo : finalData[0].lcorder.forTransportationTo,
//                                                             descriptionOfGoodsAndOrServices : finalData[0].lcorder.descriptionOfGoodsAndOrServices,
//                                                             additionalConditions : finalData[0].lcorder.additionalConditions,
//                                                             periodForPresentation : finalData[0].lcorder.periodForPresentation,
//                                                             advisingThroughBank : finalData[0].lcorder.advisingThroughBank,
//                                                             transshipment : finalData[0].lcorder.transshipment,
//                                                             portofLoading : finalData[0].lcorder.portofLoading,
//                                                             maximumCreditAmount : finalData[0].lcorder.maximumCreditAmount,
//                                                             draftsAt : finalData[0].lcorder.draftsAt,
//                                                             partialShipments : finalData[0].lcorder.partialShipments,
//                                                             senderToReceiverInformation : finalData[0].lcorder.senderToReceiverInformation,
//                                                             charges : finalData[0].lcorder.charges,
//                                                             confirmationInstructions : finalData[0].lcorder.confirmationInstructions,
//                                                             sequenceOfTotal : finalData[0].lcorder.sequenceOfTotal,
//                                                             documentsRequired : finalData[0].lcorder.documentsRequired,
//                                                            ibanNumber : finalData[0].lcorder.ibanNumber,
//                                                             incoTerms : finalData[0].lcorder.incoTerms,
//                                                             draftsAtSight:finalData[0].lcorder.draftsAtSight,
//                                                            draftsAtUsance:finalData[0].lcorder.draftsAtUsance,
//                                                            shipmentPeriodSight:finalData[0].lcorder.shipmentPeriodSight,
//                                                            shipmentPeriodUsance:finalData[0].lcorder.shipmentPeriodUsance,
//                                                            percentageSight:finalData[0].lcorder.percentageSight,
//                                                            percentageUsance :finalData[0].lcorder.percentageUsance,
//                                                            lcAmountSight:finalData[0].lcorder.lcAmountSight,
//                                                            lcAmountUsance:finalData[0].lcorder.lcAmountUsance
//
//                                                         };
//                                                         console.log("uploadStatus object Json",uploadStatus);
//                                                          const createUploadStatusEndpoint =
//                                                                  apiBaseURL +
//                                                                  "lc-upload";
//                                                          $http.post(createUploadStatusEndpoint, angular.toJson(uploadStatus)).then(
//                                                             function(result){
//                                                              // success callback
//                                                               alert("Document Uploaded successfully");
//                                                              console.log("INSIDE SUCCESS FUNCTION");
//                                                              $location.path("/employeeHome");
//
//                                                              }, 
//                                                              function(result){
//                                                              // failure callback
//                                                                 console.log("upload Status Failure");
//                                                              });
//                                                      });
//
//
//                                  }).
//                        error(function () {
//                          alert("failed!");
//                          $location.path("/Documents");
//                       });
//                        }
//                        $scope.showTheForm = true;
//                        $scope.showTheForm1 = false;
////                                       $scope.addNewChoice = function() {
////                                       $scope.showTheForm = true;
////                                       console.log($scope.choices.length);
////                                       const newItemNo = $scope.choices.length+1;
////                                       $scope.choices.push({'sno': newItemNo});
////                            };
//
//           $scope.billInput = function(sno) {
//            $http.get(apiBaseURL + "lcRequestID").then(function(response){
//                 const billID = response.data.lcRequestID;
//                 $scope.billform.billNumb = "BILL-"+billID;
//                 console.log("lcRequestID in customer home page===>",response.data.lcRequestID);
//             });
//                 $scope.billSNO=sno;
//                 $scope.showTheForm1 = true;
//                 $scope.billcurrency = ['USD'];
//                 $scope.amountChange = () =>  {
//                             console.log("LC AMOUNT",$scope.billform.billamount);
//                                     var value = $scope.billform.billamount;
//                                     
//                                     var Amtval = value.split(/^([-+]?[0-9]*\.?[0-9]+)([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ])$/);
//                                     console.log("AMT VAL  ",Amtval);
//
//                                     if(Amtval[2].toLowerCase()=='m'|| Amtval[2].toLowerCase()=='h'|| Amtval[2].toLowerCase()=='t'){
//
//                                     if(Amtval[2].toLowerCase()== "m"){
//                                     $scope.billform.billamount = Amtval[1]*1000000;
//                                     }
//                                     else if(Amtval[2].toLowerCase()== "h")
//                                     {
//                                     $scope.billform.billamount = Amtval[1]*100;
//                                     }
//                                     else if(Amtval[2].toLowerCase()== "t")
//                                     {
//                                     $scope.billform.billamount = Amtval[1]*1000;
//                                     }
//                                     else {
//                                     $scope.billform.billamount = $scope.billform.billamount;
//                                     }
//                                     }
//                                     else{
//                                     console.log("inside check else");
//                                     $scope.billform.billamount = "";
//
//                                     }
//                                   }
//
//               $scope.create = () => {
//                           $http.get(getObj).then(function(response){
//                            var finalData = response.data;
//                            console.log("RESPONSE DATA ", finalData[0]);
//                            console.log("RESPONSE DATA final", finalData[0].lcorder);
//                                   const bill = {
//                                    lcId : $scope.LCRequestId,
//                                    lcReqId : finalData[0].lcorder.lcReqId,
//                                    applicantCustomer : finalData[0].lcorder.applicantCustomer,
//                                    applicantAddress : finalData[0].lcorder.applicantAddress,
//                                    //shipmentPeriod : finalData[0].lcorder.shipmentPeriod,
//                                    lcExpiryDate : finalData[0].lcorder.lcExpiryDate,
//                                    modeOfShipment :  finalData[0].lcorder.modeOfShipment,
//                                    beneficiaryId : finalData[0].lcorder.beneficiaryId,
//                                    beneficiaryAddress : finalData[0].lcorder.beneficiaryAddress,
//                                    lcType : finalData[0].lcorder.lcType,
//                                    lcCurrency : finalData[0].lcorder.lcCurrency,
//                                    lcAmount :  finalData[0].lcorder.lcAmount,
//                                    lcAmountTemp : finalData[0].lcorder.lcAmount,
//                                    lcIssueDate : finalData[0].lcorder.lcIssueDate,
//                                    lcExpiryPlace : finalData[0].lcorder.lcExpiryPlace,
//                                    latestShipmentDate : finalData[0].lcorder.latestShipmentDate,
//                                    liabilityReversalDate : finalData[0].lcorder.liabilityReversalDate,
//                                    advisingBankID : finalData[0].lcorder.advisingBankID,
//                                    applicantBank : finalData[0].lcorder.applicantBank,
//                                    applicantBankAddress : finalData[0].lcorder.applicantBankAddress,
//                                    advisingBankAddress : finalData[0].lcorder.advisingBankAddress,
//                                    formofDocumentaryCredit : finalData[0].lcorder.formofDocumentaryCredit,
//                                    documentaryCreditNumber : finalData[0].lcorder.documentaryCreditNumber,
//                                    availableWithBy : finalData[0].lcorder.availableWithBy,
//                                    forTransportationTo : finalData[0].lcorder.forTransportationTo,
//                                    descriptionOfGoodsAndOrServices : finalData[0].lcorder.descriptionOfGoodsAndOrServices,
//                                    additionalConditions : finalData[0].lcorder.additionalConditions,
//                                    periodForPresentation : finalData[0].lcorder.periodForPresentation,
//                                    advisingThroughBank : finalData[0].lcorder.advisingThroughBank,
//                                    transshipment : finalData[0].lcorder.transshipment,
//                                    portofLoading : finalData[0].lcorder.portofLoading,
//                                    maximumCreditAmount : finalData[0].lcorder.maximumCreditAmount,
//                                    draftsAt : finalData[0].lcorder.draftsAt,
//                                    partialShipments : finalData[0].lcorder.partialShipments,
//                                    senderToReceiverInformation : finalData[0].lcorder.senderToReceiverInformation,
//                                    charges : finalData[0].lcorder.charges,
//                                    confirmationInstructions : finalData[0].lcorder.confirmationInstructions,
//                                    sequenceOfTotal : finalData[0].lcorder.sequenceOfTotal,
//                                    documentsRequired : finalData[0].lcorder.documentsRequired,
//                                    draftsAtSight:finalData[0].lcorder.draftsAtSight,
//                                    draftsAtUsance:finalData[0].lcorder.draftsAtUsance,
//                                    shipmentPeriodSight:finalData[0].lcorder.shipmentPeriodSight,
//                                    shipmentPeriodUsance:finalData[0].lcorder.shipmentPeriodUsance,
//                                    percentageSight:finalData[0].lcorder.percentageSight,
//                                    percentageUsance :finalData[0].lcorder.percentageUsance,
//                                    lcAmountSight:finalData[0].lcorder.lcAmountSight,
//                                    lcAmountUsance:finalData[0].lcorder.lcAmountUsance,
//                                    ibanNumber : finalData[0].lcorder.ibanNumber,
//                                    incoTerms : finalData[0].lcorder.incoTerms,
//                                    bills : [{
//                                          billNo : $scope.billform.billNumb,
//                                            billAmount: $scope.billform.billamount,
//                                           currencyType: $scope.billform.billcurrency,
//                                            billDate : new Date($scope.billform.billdate).toLocaleDateString(),
//                                                                              }]
//                                 };
//                                 console.log("BILL without forming json ",bill);
//
//                                  const createBillEndpoint =
//                                          apiBaseURL +
//                                          "lodge-bill";
//                                  $http.post(createBillEndpoint, angular.toJson(bill)).then(
//                                     function(result){
//                                      // success callback
//                                      console.log("INSIDE SUCCESS FUNCTION");
//                                      $location.path("/employeeHome");
//                                      displayMessage(result);
//                                      }, 
//                                      function(result){
//                                      // failure callback
//                                      console.log("INSIDE ERROR FUNCTION");
//                                      displayMessage(result);
//                                      });
//                              });
//               };
//
//                            $scope.cancel = () => {
//                                      $location.path("/employeeHome");
//                             }
//                             displayMessage = (message) => {
//                             console.log("message in display message--->",message);
//                             $rootScope.messageStatus = message.status;
//                             const modalInstanceTwo = $uibModal.open({
//                                         templateUrl: 'messageContent.html',
//                                         controller: 'messageCtrl',
//                                         controllerAs: 'modalInstanceTwo',
//                                         resolve: { message: () => message }
//                                     });
//
//                                     modalInstanceTwo.result.then(() => {}, () => {});
//                                 };
//
//        };
//        })
//        //End
//
//   	app.directive('uploadFiles', function () {
//       return {
//           scope: true,        //create a new scope
//           link: function (scope, el, attrs) {
//               el.bind('change', function (event) {
//                   var files = event.target.files;
//                   //iterate files since 'multiple' may be specified on the element
//                   for (var i = 0; i < files.length; i++) {
//                       //emit event upward
//                       scope.$emit("seletedFile", { file: files[i] });
//                   }
//               });
//           }
//       };
//   });
//
//
//   //AMEND STARTS HERE
//   app.controller('amendController', function($http,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore,$filter) {
//   if($cookieStore.get('customer')){
//                     $scope.message = 'Amend Letter of Credits ';
//                     $scope.node = $rootScope.thisNode;
//                      $scope.username = $cookieStore.get('customer');
//                      console.log("AmendID ID ===>",$rootScope.AmendID,"  node is ",$scope.node," username is ",$scope.username);
//                      const LCReqNumb = $rootScope.ID;
//
//                         $scope.logout = function(){
//                         $cookieStore.remove('customer');
//                         $location.path("/customer");
//                             };
//                         $scope.lcAmendForm = {};
//                         $scope.formError = false;
//
//                     const apiBaseURL = $rootScope.apiBaseURL;
//                    const LCAmendRequestId = $rootScope.lcRequestID;
//                     //const getObj = apiBaseURL + "lc-orders";
//                     const cusID1 = $cookieStore.get('customer');
//                     const getObj = apiBaseURL + "customer-lc-orders/"+cusID1;
//
//                     $http.get(getObj).then(function(response){
//                     var finalData = response.data;
//                     console.log("RESPONSE DATA ", finalData);
//                  var finaldatalength= finalData.length;
//                  console.log("finaldatalength DATA ", finaldatalength);
//                  for (i=0; i<finaldatalength; i++){
//
//                    const selectlcid= $rootScope.AmendID;
//                    console.log("selectlcid----",selectlcid);
//                    const amendid =finalData[i].lcorder.lcId;
//                     console.log("amendid----",amendid);
//                  if (selectlcid == amendid){
//                    const index = 0;
//                    $rootScope.index = i;
//                    // console.log("RESPONSE DATA in amend ----->", finalData.lcorder.finalData[i]);
//                     $scope.lcRequestID = finalData[i].lcorder.lcReqId;
//
//                       $scope.lcAmendForm.lcamendId = finalData[i].lcorder.lcId;
//                            const LCRequestId = $rootScope.lcRequestID;
//                            const numberOfAmendment=finalData[i].lcorder.lcNumberOfAmendment+1;
//                            $rootScope.numberOfAmendment = numberOfAmendment;
//                        const lcamendrequestID = "LC-REQ-"+LCRequestId+"-00"+numberOfAmendment;
//                        $scope.lcAmendForm.lcamendreq =  lcamendrequestID;
//
//                        var expdt = finalData[i].lcorder.lcExpiryDate;
//                        console.log("expdt---",expdt);
//                        console.log("hi");
//
//                     var pattern = /(\d{2})(\d{2})(\d{4})/;
//                        $scope.lcAmendForm.lcamendexpirydate = new Date(expdt.replace(pattern, '$1-$2-$3'));
//                       $scope.lcAmendForm.amendmodeofshipment =  finalData[i].lcorder.modeOfShipment;
//                        $scope.lcAmendForm.lcamendamount =  finalData[i].lcorder.lcAmount;
//                       $scope.lcAmendForm.lcamendexpiryplace = finalData[i].lcorder.lcExpiryPlace;
//                       //$scope.lcAmendForm.beneficiarybank = finalData[i].lcorder.advisingBankID;
//
//                        //$scope.lcAmendForm.amendmentdetails = finalData[i].lcorder.lcAmendmentDetails;
//
//                        //form assign start here
//
//                        $scope.lcAmendForm.lcId = finalData[i].lcorder.lcId;
//                        $scope.lcAmendForm.applicant = finalData[i].lcorder.applicantCustomer;
//                        $scope.lcAmendForm.applicantaddress = finalData[i].lcorder.applicantAddress;
//                        $scope.lcAmendForm.shipmentperiod =  finalData[i].lcorder.shipmentPeriod;
//                        $scope.lcAmendForm.lcexpirydate = finalData[i].lcorder.lcExpiryDate;
//                        $scope.lcAmendForm.modeofshipment =  finalData[i].lcorder.modeOfShipment;
//                        $scope.lcAmendForm.beneficiary = finalData[i].lcorder.beneficiaryId;
//                        $scope.lcAmendForm.beneficiaryaddress = finalData[i].lcorder.beneficiaryAddress;
//                        $scope.lcAmendForm.lctype = finalData[i].lcorder.lcType;
//                        $scope.lcAmendForm.lccurrency = finalData[i].lcorder.lcCurrency;
//                        $scope.lcAmendForm.lcamount =  finalData[i].lcorder.lcAmount;
//                        $scope.lcAmendForm.lcissuedate = finalData[i].lcorder.lcIssueDate;
//                        $scope.lcAmendForm.lcexpiryplace = finalData[i].lcorder.lcExpiryPlace;
//                        $scope.lcAmendForm.shipmentdate = finalData[i].lcorder.latestShipmentDate;
//                        $scope.lcAmendForm.liabilitydate = finalData[i].lcorder.liabilityReversalDate;
//                        $scope.lcAmendForm.beneficiarybank = finalData[i].lcorder.advisingBankID;
//                        $scope.lcAmendForm.applicantBank = finalData[i].lcorder.applicantBank;
//                        $scope.lcAmendForm.applicantBankAddress = finalData[i].lcorder.applicantBankAddress;
//                        $scope.lcAmendForm.beneficiarybankaddress = finalData[i].lcorder.advisingBankAddress;
//                        $scope.lcAmendForm.DocumentaryCredit = finalData[i].lcorder.formofDocumentaryCredit;
//                        $scope.lcAmendForm.CreditNumber = finalData[i].lcorder.documentaryCreditNumber;
//                        $scope.lcAmendForm.AvailableWith = finalData[i].lcorder.availableWithBy;
//                        $scope.lcAmendForm.TransportationTo = finalData[i].lcorder.forTransportationTo;
//                        $scope.lcAmendForm.DescOfGoods = finalData[i].lcorder.descriptionOfGoodsAndOrServices;
//                        $scope.lcAmendForm.additionalConditions = finalData[i].lcorder.additionalConditions;
//                        $scope.lcAmendForm.PeriodForPresentaion = finalData[i].lcorder.periodForPresentation;
//                        $scope.lcAmendForm.AdvisingThroughBank = finalData[i].lcorder.advisingThroughBank;
//                        $scope.lcAmendForm.transhipment = finalData[i].lcorder.transshipment;
//                        $scope.lcAmendForm.PortofLoading = finalData[i].lcorder.portofLoading;
//                        $scope.lcAmendForm.MaxCreditAmount = finalData[i].lcorder.maximumCreditAmount;
//                        $scope.lcAmendForm.DraftsAt = finalData[i].lcorder.draftsAt;
//                        $scope.lcAmendForm.PartialShipments = finalData[i].lcorder.partialShipments;
//                        $scope.lcAmendForm.SenderToReceiverInfo = finalData[i].lcorder.senderToReceiverInformation;
//                        $scope.lcAmendForm.Charges = finalData[i].lcorder.charges;
//                        $scope.lcAmendForm.ConfirmationInstruction = finalData[i].lcorder.confirmationInstructions;
//                        $scope.lcAmendForm.SequenceTotal = finalData[i].lcorder.sequenceOfTotal;
//                        $scope.lcAmendForm.DocRequired = finalData[i].lcorder.documentsRequired;
//                        $scope.lcAmendForm.iban = finalData[i].lcorder.ibanNumber;
//                        $scope.lcAmendForm.incoTerms=finalData[i].lcorder.incoTerms;
//                //New Changes:24-03-2017 : Deepak:Begin
//                         $scope.lcAmendForm.DraftsAt_sight=	finalData[i].lcorder.draftsAtSight;
//                         $scope.lcAmendForm.DraftsAt_usance=	finalData[i].lcorder.draftsAtUsance;
//                         $scope.lcAmendForm.shipmentperiod_sight=	finalData[i].lcorder.shipmentPeriodSight;
//                         $scope.lcAmendForm.shipmentperiod_usance=	finalData[i].lcorder.shipmentPeriodUsance;
//                         $scope.lcAmendForm.Percentage_sight=	finalData[i].lcorder.percentageSight;
//                         $scope.lcAmendForm.Percentage_usance=	finalData[i].lcorder.percentageUsance;
//                         $scope.lcAmendForm.lcamount_sight=	finalData[i].lcorder.lcAmountSight;
//                         $scope.lcAmendForm.lcamount_usance=	finalData[i].lcorder.lcAmountUsance;
//                //New Changes:24-03-2017 : Deepak:END
//
//                        $scope.lcAmendAmountcheck = () =>  {
//         console.log("LC AMOUNT",$scope.lcAmendForm.lcamendamount);
//                        var value = $scope.lcAmendForm.lcamendamount;
//                       
//                        var Amtval = value.split(/^([-+]?[0-9]*\.?[0-9]+)([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ])$/);
//                        console.log("AMT VAL  ",Amtval);
//
//                        if(Amtval[2].toLowerCase()=='m'|| Amtval[2].toLowerCase()=='h'|| Amtval[2].toLowerCase()=='t'){
//
//                        if(Amtval[2].toLowerCase()== "m"){
//                        $scope.lcAmendForm.lcamendamount = Amtval[1]*1000000;
//                        }
//                        else if(Amtval[2].toLowerCase()== "h")
//                        {
//                        $scope.lcAmendForm.lcamendamount = Amtval[1]*100;
//                        }
//                        else if(Amtval[2].toLowerCase()== "t")
//                        {
//                        $scope.lcAmendForm.lcamendamount = Amtval[1]*1000;
//                        }
//                        else {
//                        $scope.lcAmendForm.lcamendamount = $scope.lcAmendForm.lcamendamount;
//                        }
//                        }
//                        else{
//                        console.log("inside check else");
//                        $scope.lcAmendForm.lcamendamount = "";
//
//                        }
//    }
//                        //end here
//
//                       } } });
//                         console.log("Before scope");
//
//                $scope.changelcamendfields= () => {
//
//                //lc amount chnge logic
//
////end
//
//                   $http.get(getObj).then(function(response){
//                   var finalData = response.data;
//                   console.log("RESPONSE DATA inside ", finalData);
//                   console.log("$rootScope.index value", $rootScope.index);
//                   console.log("RESPONSE DATA in amend insdi ----->", finalData[$rootScope.index].lcorder,finalData[$rootScope.index]);
//
//
//                   $scope.oldvaluefromcorda = {
//                                expirydate : finalData[$rootScope.index].lcorder.lcExpiryDate,
//                                modeofshipment :  finalData[$rootScope.index].lcorder.modeOfShipment,
//                                lcamount : finalData[$rootScope.index].lcorder.lcAmount,
//                                lcexpiryplace : finalData[$rootScope.index].lcorder.lcExpiryPlace,
//                                advisingbankref : finalData[$rootScope.index].lcorder.advisingBankID,
//                                    }
//console.log("oldvaluefromcorda-inside--->",$scope.oldvaluefromcorda);
//
//                 $scope.fieldvaluefromUI = {
//
//                           lcAmendAmountfieldlevel: $scope.lcAmendForm.lcamendamount,
//                           amendModeOfShipmentfieldlevel : $scope.lcAmendForm.amendmodeofshipment,
//                           lcAmendExpiryDatefieldlevel : new Date($scope.lcAmendForm.lcamendexpirydate).toLocaleDateString(),
//                           lcAmendExpiryPlacefieldlevel : $scope.lcAmendForm.lcamendexpiryplace,
//                           lcAmendAdvisingBankReffieldlevel : $scope.lcAmendForm.amendbeneficiarybank,
//
//                        }
//                    console.log("fieldvaluefromUI---->",$scope.fieldvaluefromUI);
//$scope.lccheck= () => {
//
//
//if($scope.oldvaluefromcorda.expirydate == $scope.fieldvaluefromUI. lcAmendExpiryDatefieldlevel && $scope.oldvaluefromcorda.modeofshipment==$scope.fieldvaluefromUI.amendModeOfShipmentfieldlevel&& $scope.oldvaluefromcorda.lcamount == $scope.fieldvaluefromUI.lcAmendAmountfieldlevel&&$scope.oldvaluefromcorda.lcexpiryplace==$scope.fieldvaluefromUI.lcAmendExpiryPlacefieldlevel){
//console.log("inside if amend");
//
//return false;
//}
//else {
//console.log("inside else amend");
//return true;
//}
//
//}
//
//
//         });
//         }
//
//
//
//
//
//
//                     $scope.amendLC = () => {
//
//                         const amendLOC = {
//                           lcAmendId : $scope.lcAmendForm.lcamendId,
//                           lcAmendReqId : $scope.lcAmendForm.lcamendreq,
//                           //lcAmendExpiryDate : $scope.lcAmendForm.lcexpirydate,
//                           numberOfAmendment : $rootScope.numberOfAmendment,
//                          lcAmendExpiryDate : new Date($scope.lcAmendForm.lcamendexpirydate).toLocaleDateString(),
//                           amendModeOfShipment : $scope.lcAmendForm.amendmodeofshipment,
//                           lcAmendAmount : $scope.lcAmendForm.lcamendamount,
//                           lcAmendExpiryPlace : $scope.lcAmendForm.lcamendexpiryplace,
//                           lcAmendAdvisingBankRef : $scope.lcAmendForm.amendbeneficiarybank,
//                            amendmentDetails: $scope.lcAmendForm.amendmentdetails,
//                            status : "AmendRequested"
//                                                       //status : "APPROVED"
//                                 };
//
//                                 if($scope.lcAmendForm.amendbeneficiarybank == null){
//                                                                      alert("Advising Bank Ref Cannot Be Empty");
//                                                                  }
//                                 else{
//                                 console.log("amendloc value---",amendLOC);
//                                     const amendLCEndpoint = apiBaseURL +"lcamendreq";
//                            //console.log("approve LOC object  ",approveLOC);
//                                    $http.post(amendLCEndpoint, angular.toJson(amendLOC)).then(
//                                    function(result){
//                                     // success callback
//                                     console.log("INSIDE SUCCESS FUNCTION");
//                                     $location.path("/customerHome");
//                                     displayMessage(result);
//                                     },
//                                     function(result){
//                                     // failure callback
//                                     console.log("INSIDE ERROR FUNCTION");
//                                     displayMessage(result);
//                                        }
//                                     );
//                                 }
//                         }
//                         $scope.cancel = () => {
//                               $location.path("/customerHome");
//                         }
//                         displayMessage = (message) => {
//                         console.log("message in display message--->",message);
//                         $rootScope.messageStatus = message.status;
//                                 const modalInstanceTwo = $uibModal.open({
//                                     templateUrl: 'messageContent.html',
//                                     controller: 'messageCtrl',
//                                     controllerAs: 'modalInstanceTwo',
//                                     resolve: { message: () => message }
//                                 });
//                                 modalInstanceTwo.result.then(() => {}, () => {});
//                             };
//                         function invalidFormInput() {
//                        //     const invalidNonItemFields = !$scope.lcform.lcrequest
//                    //            || isNaN(modalInstance.form.orderNumber)
//                     //            || !modalInstance.form.deliveryDate
//                     //            || !modalInstance.form.city
//                     //            || !modalInstance.form.country;
//                     //
//                     //        const inValidCounterparty = modalInstance.form.counterparty === undefined;
//                     //
//                     //        const invalidItemFields = modalInstance.items
//                     //            .map(item => !item.name || !item.amount || isNaN(item.amount))
//                     //            .reduce((prev, curr) => prev && curr);
//
//                        //     return invalidNonItemFields;
//                         }
//                        }
//                                                 else{
//                                                 $location.path("/customer");
//                                                 }
//
//                   });
//
//
//
//
//
// //End
////====================================================================================================================================================================================================================================================
//
////=================================================================================================================================================================
////AMEND ACCEPT CONTROLLER START HERE
////=================================================================================================================================================================
////Amend start here
//app.controller('amendAcceptController', function($http,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore) {
//  if($cookieStore.get('employee')){
//                    $scope.message = 'Accept Amended Letter of Credits ';
//                    $scope.node = $rootScope.thisNode;
//                     $scope.username = $cookieStore.get('employee');
//                     console.log("AMENDING ID ===>",$rootScope.AmendID,"  node is ",$scope.node," username is ",$scope.username);
//                     //const LCAmendNumb = $rootScope.AmendID;
//
//
//                        $scope.logout = function(){
//                        $cookieStore.remove('employee');
//                        $location.path("/customer");
//                            };
//                        $scope.lcAmendAcceptForm = {};
//                        $scope.formError = false;
//
//                    const LCAmendId = $rootScope.AmendID;
//                    const LCAmendReqNumb = $rootScope.AmendReqID;
//
//                    const apiBaseURL = $rootScope.apiBaseURL;
//                    //const getObj = apiBaseURL + "lc-orders";
//                    const cusID1 = $cookieStore.get('employee');
//                    const getObj = apiBaseURL + "employee-lc-orders/"+LCAmendId;
//
//                    const getAmendObj = apiBaseURL + "lcamendreq/"+LCAmendReqNumb;
//
//                    //start retrieving here
//
//
//                    $http.get(getAmendObj).then(function(response){
//                                        var finalAmendData = response.data;
//                                        console.log("db data in amendAccept Controller ", finalAmendData);
//
//                                          //amend part start here
//
//                                          $scope.lcAmendAcceptForm.LcAmendId = finalAmendData.lcAmendId;
//                                          $scope.lcAmendAcceptForm.LcAmendReqId = finalAmendData.lcAmendReqId;
//                                          $scope.lcAmendAcceptForm.NumberOfAmendment = finalAmendData.numberOfAmendment;
//                                          $scope.lcAmendAcceptForm.LcAmendAmount = finalAmendData.lcAmendAmount;
//                                          $scope.lcAmendAcceptForm.LcAmendAdvisingBankRef = finalAmendData.lcAmendAdvisingBankRef;
//                                          $scope.lcAmendAcceptForm.AmendModeOfShipment = finalAmendData.amendModeOfShipment;
//
//                                          var pattern = /(\d{2})(\d{2})(\d{4})/;
//                                          $scope.lcAmendAcceptForm.LcAmendExpiryDate = new Date(finalAmendData.lcAmendExpiryDate.replace(pattern, '$1-$2-$3'));
//
//                                          $scope.lcAmendAcceptForm.LcAmendExpiryPlace = finalAmendData.lcAmendExpiryPlace;
//
//                                          $scope.lcAmendAcceptForm.AmendmentDetails = finalAmendData.amendmentDetails;
//
//                    });
//
//                    //end here
//
//                    $http.get(getObj).then(function(response){
//                    var finalData = response.data;
//                    console.log("corda data in amendAcceptController ", finalData[0]);
//                    $scope.lcRequestID = finalData[0].lcorder.lcReqId;
//                      $scope.lcAmendAcceptForm.lcId = finalData[0].lcorder.lcId;
//                      $scope.lcAmendAcceptForm.applicant = finalData[0].lcorder.applicantCustomer;
//                      $scope.lcAmendAcceptForm.applicantaddress = finalData[0].lcorder.applicantAddress;
//                      $scope.lcAmendAcceptForm.shipmentperiod =  finalData[0].lcorder.shipmentPeriod;
//                      $scope.lcAmendAcceptForm.lcexpirydate = finalData[0].lcorder.lcExpiryDate;
//                      $scope.lcAmendAcceptForm.modeofshipment =  finalData[0].lcorder.modeOfShipment;
//                      $scope.lcAmendAcceptForm.beneficiary = finalData[0].lcorder.beneficiaryId;
//                      $scope.lcAmendAcceptForm.beneficiaryaddress = finalData[0].lcorder.beneficiaryAddress;
//                      $scope.lcAmendAcceptForm.lctype = finalData[0].lcorder.lcType;
//                      $scope.lcAmendAcceptForm.lccurrency = finalData[0].lcorder.lcCurrency;
//                      $scope.lcAmendAcceptForm.lcamount =  finalData[0].lcorder.lcAmount;
//                      $scope.lcAmendAcceptForm.lcissuedate = finalData[0].lcorder.lcIssueDate;
//                      $scope.lcAmendAcceptForm.lcexpiryplace = finalData[0].lcorder.lcExpiryPlace;
//                      $scope.lcAmendAcceptForm.shipmentdate = finalData[0].lcorder.latestShipmentDate;
//                      $scope.lcAmendAcceptForm.liabilitydate = finalData[0].lcorder.liabilityReversalDate;
//                      $scope.lcAmendAcceptForm.beneficiarybank = finalData[0].lcorder.advisingBankID;
//                      $scope.lcAmendAcceptForm.applicantBank = finalData[0].lcorder.applicantBank;
//                      $scope.lcAmendAcceptForm.applicantBankAddress = finalData[0].lcorder.applicantBankAddress;
//                      $scope.lcAmendAcceptForm.beneficiarybankaddress = finalData[0].lcorder.advisingBankAddress;
//                      $scope.lcAmendAcceptForm.DocumentaryCredit = finalData[0].lcorder.formofDocumentaryCredit;
//                      $scope.lcAmendAcceptForm.CreditNumber = finalData[0].lcorder.documentaryCreditNumber;
//                      $scope.lcAmendAcceptForm.AvailableWith = finalData[0].lcorder.availableWithBy;
//                      $scope.lcAmendAcceptForm.TransportationTo = finalData[0].lcorder.forTransportationTo;
//                      $scope.lcAmendAcceptForm.DescOfGoods = finalData[0].lcorder.descriptionOfGoodsAndOrServices;
//                      $scope.lcAmendAcceptForm.additionalConditions = finalData[0].lcorder.additionalConditions;
//                      $scope.lcAmendAcceptForm.PeriodForPresentaion = finalData[0].lcorder.periodForPresentation;
//                      $scope.lcAmendAcceptForm.AdvisingThroughBank = finalData[0].lcorder.advisingThroughBank;
//                      $scope.lcAmendAcceptForm.transhipment = finalData[0].lcorder.transshipment;
//                      $scope.lcAmendAcceptForm.PortofLoading = finalData[0].lcorder.portofLoading;
//                      $scope.lcAmendAcceptForm.MaxCreditAmount = finalData[0].lcorder.maximumCreditAmount;
//                      $scope.lcAmendAcceptForm.DraftsAt = finalData[0].lcorder.draftsAt;
//                      $scope.lcAmendAcceptForm.PartialShipments = finalData[0].lcorder.partialShipments;
//                      $scope.lcAmendAcceptForm.SenderToReceiverInfo = finalData[0].lcorder.senderToReceiverInformation;
//                      $scope.lcAmendAcceptForm.Charges = finalData[0].lcorder.charges;
//                      $scope.lcAmendAcceptForm.ConfirmationInstruction = finalData[0].lcorder.confirmationInstructions;
//                      $scope.lcAmendAcceptForm.SequenceTotal = finalData[0].lcorder.sequenceOfTotal;
//                      $scope.lcAmendAcceptForm.DocRequired = finalData[0].lcorder.documentsRequired;
//                      $scope.lcAmendAcceptForm.iban = finalData[0].lcorder.ibanNumber;
//                      $scope.lcAmendAcceptForm.incoTerms=finalData[0].lcorder.incoTerms;
//                  //New Changes:24-03-2017 : Deepak:Begin
//                       $scope.lcAmendAcceptForm.DraftsAt_sight=	finalData[0].lcorder.draftsAtSight;
//                       $scope.lcAmendAcceptForm.DraftsAt_usance=finalData[0].lcorder.draftsAtUsance;
//                       $scope.lcAmendAcceptForm.shipmentperiod_sight=finalData[0].lcorder.shipmentPeriodSight;
//                       $scope.lcAmendAcceptForm.shipmentperiod_usance=finalData[0].lcorder.shipmentPeriodUsance;
//                       $scope.lcAmendAcceptForm.Percentage_sight=finalData[0].lcorder.percentageSight;
//                       $scope.lcAmendAcceptForm.Percentage_usance=finalData[0].lcorder.percentageUsance;
//                       $scope.lcAmendAcceptForm.lcamount_sight=	finalData[0].lcorder.lcAmountSight;
//                       $scope.lcAmendAcceptForm.lcamount_usance=finalData[0].lcorder.lcAmountUsance;
//                //New Changes:24-03-2017 : Deepak:END
//                        });
//
//
//                    $scope.amendAcceptLC = () => {
//
//                    const amendAcceptLOC = {
//                          lcId : $scope.lcAmendAcceptForm.lcId,
//                          //lcReqId : $scope.lcRequestID,$scope.lcAmendAcceptForm.LcAmendReqId
//                          lcReqId : $scope.lcAmendAcceptForm.LcAmendReqId,
//                          applicantCustomer : $scope.lcAmendAcceptForm.applicant,
//                          applicantAddress : $scope.lcAmendAcceptForm.applicantaddress,
//                          beneficiaryId : $scope.lcAmendAcceptForm.beneficiary,
//                          beneficiaryAddress : $scope.lcAmendAcceptForm.beneficiaryaddress,
//                          lcType : $scope.lcAmendAcceptForm.lctype,
//                          lcCurrency : $scope.lcAmendAcceptForm.lccurrency,
//                          lcIssueDate : $scope.lcAmendAcceptForm.lcissuedate,
//                          latestShipmentDate : $scope.lcAmendAcceptForm.shipmentdate,
//                          liabilityReversalDate : $scope.lcAmendAcceptForm.liabilitydate,
//                          applicantBank : $scope.lcAmendAcceptForm.applicantBank,
//                          applicantBankAddress : $scope.lcAmendAcceptForm.applicantBankAddress,
//                          advisingBankAddress : $scope.lcAmendAcceptForm.beneficiarybankaddress,
//                          formofDocumentaryCredit : $scope.lcAmendAcceptForm.DocumentaryCredit,
//                          documentaryCreditNumber : $scope.lcAmendAcceptForm.CreditNumber,
//                          availableWithBy : $scope.lcAmendAcceptForm.AvailableWith,
//                          forTransportationTo : $scope.lcAmendAcceptForm.TransportationTo,
//                          descriptionOfGoodsAndOrServices : $scope.lcAmendAcceptForm.DescOfGoods,
//                          additionalConditions : $scope.lcAmendAcceptForm.additionalConditions,
//                          periodForPresentation : $scope.lcAmendAcceptForm.PeriodForPresentaion,
//                          advisingThroughBank : $scope.lcAmendAcceptForm.AdvisingThroughBank,
//                          transshipment : $scope.lcAmendAcceptForm.transhipment,
//                          portofLoading : $scope.lcAmendAcceptForm.PortofLoading,
//                          maximumCreditAmount : $scope.lcAmendAcceptForm.MaxCreditAmount,
//                          draftsAt : $scope.lcAmendAcceptForm.DraftsAt,
//                          partialShipments : $scope.lcAmendAcceptForm.PartialShipments,
//                          senderToReceiverInformation : $scope.lcAmendAcceptForm.SenderToReceiverInfo,
//                          charges : $scope.lcAmendAcceptForm.Charges,
//                          confirmationInstructions : $scope.lcAmendAcceptForm.ConfirmationInstruction,
//                          sequenceOfTotal : $scope.lcAmendAcceptForm.SequenceTotal,
//                          //documentsRequired : docrec1,
//                          ibanNumber : $scope.lcAmendAcceptForm.iban,
//                          incoTerms:$scope.lcAmendAcceptForm.incoTerms,
//
//                          documentsRequired: $scope.lcAmendAcceptForm.DocRequired,
//
//                          shipmentPeriod : $scope.lcAmendAcceptForm.shipmentperiod,
//                          lcExpiryDate : new Date($scope.lcAmendAcceptForm.LcAmendExpiryDate).toLocaleDateString(),
//                          modeOfShipment : $scope.lcAmendAcceptForm.AmendModeOfShipment,
//                          lcAmount : $scope.lcAmendAcceptForm.LcAmendAmount,
//                          lcExpiryPlace :  $scope.lcAmendAcceptForm.LcAmendExpiryPlace,
//                          lcNumberOfAmendment : $rootScope.version,
//                          lcAmendmentDetails : $scope.lcAmendAcceptForm.AmendmentDetails,
//                          advisingBankID : $scope.lcAmendAcceptForm.beneficiarybank,
//                          lcAmountTemp : $scope.lcAmendAcceptForm.LcAmendAmount,
//                            //New Changes:24-03-2017 : Deepak:Begin
//
//                                draftsAtSight : $scope.lcAmendAcceptForm.DraftsAt_sight,
//                                draftsAtUsance: $scope.lcAmendAcceptForm.DraftsAt_usance,
//                                shipmentPeriodSight: $scope.lcAmendAcceptForm.shipmentperiod_sight,
//                                shipmentPeriodUsance:$scope.lcAmendAcceptForm.shipmentperiod_usance,
//                                percentageSight: $scope.lcAmendAcceptForm.Percentage_sight,
//                                percentageUsance: $scope.lcAmendAcceptForm.Percentage_usance,
//                                lcAmountSight:$scope.lcAmendAcceptForm.lcamount_sight,
//                                lcAmountUsance:$scope.lcAmendAcceptForm.lcamount_usance,
//
//                             //New Changes:24-03-2017 : Deepak:END
//
//                          //status : "APPROVED"
//                                };
//                                    const acceptLCEndpoint =
//                                        apiBaseURL +"lc-amend";
//
//console.log("amendAccept LOC object  ",amendAcceptLOC);
//                                   $http.post(acceptLCEndpoint, angular.toJson(amendAcceptLOC)).then(
//                                   function(result){
//                                    // success callback
//                                    console.log("INSIDE SUCCESS FUNCTION");
//                                    $location.path("/employeeHome");
//                                    displayMessage(result);
//                                    }, 
//                                    function(result){
//                                    // failure callback
//                                    console.log("INSIDE ERROR FUNCTION");
//                                    displayMessage(result);
//                                                                         }
//                                        //(result) => displayMessage(result),
//                                        //(result) => displayMessage(result)
//                                    );
//                                    // console.log("LC approved and the object is  ",approveLoc);
//                                     //console.log("message status" , $scope.messageStatus);
//                                     //$location.path("/home");
//                        }
//                        $scope.cancel = () => {
//                              $location.path("/employeeHome");
//                        }
//                        displayMessage = (message) => {
//                        console.log("message in display message--->",message);
//                        $rootScope.messageStatus = message.status;
//                                const modalInstanceTwo = $uibModal.open({
//                                    templateUrl: 'messageContent.html',
//                                    controller: 'messageCtrl',
//                                    controllerAs: 'modalInstanceTwo',
//                                    resolve: { message: () => message }
//                                });
//
//                                modalInstanceTwo.result.then(() => {}, () => {});
//                            };
//
//                        function invalidFormInput() {
//                            const invalidNonItemFields = !$scope.lcform.lcrequest
//                    //            || isNaN(modalInstance.form.orderNumber)
//                    //            || !modalInstance.form.deliveryDate
//                    //            || !modalInstance.form.city
//                    //            || !modalInstance.form.country;
//                    //
//                    //        const inValidCounterparty = modalInstance.form.counterparty === undefined;
//                    //
//                    //        const invalidItemFields = modalInstance.items
//                    //            .map(item => !item.name || !item.amount || isNaN(item.amount))
//                    //            .reduce((prev, curr) => prev && curr);
//
//                            return invalidNonItemFields;
//                        }
//                        }
//                                                else{
//                                                $location.path("/customer");
//                                                }
//
//                  });
////====================================================================================================================================================================================
////AMEND ACCEPT CONTROLLER END HERE
////====================================================================================================================================================================================
//
////=================================================================================================================================================================
////AMEND APPROVE CONTROLLER START HERE
////=================================================================================================================================================================
////Amend start here
//app.controller('amendApproveController', function($http,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore) {
//  if($cookieStore.get('employee')){
//                    $scope.message = 'Accept Amended Letter of Credits ';
//                    $scope.node = $rootScope.thisNode;
//                     $scope.username = $cookieStore.get('employee');
//                     console.log("AMENDING ID ===>",$rootScope.AmendID,"  node is ",$scope.node," username is ",$scope.username);
//                     //const LCAmendNumb = $rootScope.AmendID;
//
//
//                        $scope.logout = function(){
//                        $cookieStore.remove('employee');
//                        $location.path("/customer");
//                            };
//                        $scope.lcAmendApproveForm = {};
//                        $scope.formError = false;
//
//                    const LCAmendId = $rootScope.AmendID;
//                    const LCAmendReqNumb = $rootScope.AmendReqID;
//
//                    const apiBaseURL = $rootScope.apiBaseURL;
//                    //const getObj = apiBaseURL + "lc-orders";
//                    const cusID1 = $cookieStore.get('employee');
//                    const getObj = apiBaseURL + "employee-lc-orders/"+LCAmendId;
//
//
//
//                    //end here
//
//                    $http.get(getObj).then(function(response){
//                    var finalData = response.data;
//                    console.log("corda data in amendApproveController ", finalData[0]);
//                    //console.log("RESPONSE DATA final", finalData[0].lcorder,finalData[0]);
//                    $scope.lcRequestID = finalData[0].lcorder.lcReqId;
//
//
//
//
// //start here
//                    //amend assign part start
//
//
//                                            const getAmendApproveObj = "http://"+window.__env.apiUrl+":10005/api/letter-of-credit/lcamendreq/"+$scope.lcRequestID;
//                                            console.log("URl",getAmendApproveObj);
//
//                                                                //start retrieving here
//
//
//                                                                $http.get(getAmendApproveObj).then(function(response){
//                                                                                    var finalAmendData = response.data;
//                                                                                    console.log("response in amendAccept Controller ", response);
//                                                                                    console.log("db data in amendAccept Controller ", finalAmendData);
//
//                                                                                      //amend part start here
//
//                                                                                      $scope.lcAmendApproveForm.LcAmendId = finalAmendData.lcAmendId;
//                                                                                      $scope.lcAmendApproveForm.LcAmendReqId = finalAmendData.lcAmendReqId;
//                                                                                      $scope.lcAmendApproveForm.NumberOfAmendment = finalAmendData.numberOfAmendment;
//
//                                                                                      //const version = 0;
//                                                                                      //$rootScope.version = $scope.lcAmendAcceptForm.NumberOfAmendment;
//
//                                                                                      $scope.lcAmendApproveForm.LcAmendAmount = finalAmendData.lcAmendAmount;
//
//                                                                                      //const lcNewAmount = 0;
//                                                                                      //$rootScope.lcNewAmount = $scope.lcAmendAcceptForm.LcAmendAmount;
//                                                                                      //console.log("lcNewAmount",lcNewAmount);
//
//                                                                                      $scope.lcAmendApproveForm.LcAmendAdvisingBankRef = finalAmendData.lcAmendAdvisingBankRef;
//
//                                                                                      //const lcNewAmendAdvisingBankRef = 0;
//                                                                                      //$rootScope.lcNewAmendAdvisingBankRef = $scope.lcAmendAcceptForm.LcAmendAdvisingBankRef;
//                                                                                      //console.log("lcNewAmendAdvisingBankRef",lcNewAmendAdvisingBankRef);
//
//                                                                                      $scope.lcAmendApproveForm.AmendModeOfShipment = finalAmendData.amendModeOfShipment;
//
//                                                                                      //const lcNewAmendModeOfShipment = 0;
//                                                                                      //$rootScope.lcNewAmendModeOfShipment = $scope.lcAmendAcceptForm.AmendModeOfShipment;
//                                                                                      //console.log("lcNewAmendModeOfShipment",lcNewAmendModeOfShipment);
//
//                                                                                      var pattern = /(\d{2})(\d{2})(\d{4})/;
//                                                                                      $scope.lcAmendApproveForm.LcAmendExpiryDate = new Date(finalAmendData.lcAmendExpiryDate.replace(pattern, '$1-$2-$3'));
//
//                                                                                      //const lcNewAmendExpiryDate = 0;
//                                                                                      //$rootScope.lcNewAmendExpiryDate = $scope.lcAmendAcceptForm.LcAmendExpiryDate;
//                                                                                      //console.log("lcNewAmendExpiryDate",$scope.lcAmendAcceptForm.LcAmendExpiryDate);
//
//                                                                                      $scope.lcAmendApproveForm.LcAmendExpiryPlace = finalAmendData.lcAmendExpiryPlace;
//
//                                                                                      //const lcNewAmendExpiryPlace = 0;
//                                                                                      //$rootScope.lcNewAmendExpiryPlace = $scope.lcAmendAcceptForm.LcAmendExpiryPlace;
//                                                                                      //console.log("lcNewAmendExpiryPlace",lcNewAmendExpiryPlace);
//
//                                                                                      $scope.lcAmendApproveForm.AmendmentDetails = finalAmendData.amendmentDetails;
//
//
//                                                                                      //const lcNewAmendmentDetails = 0;
//                                                                                      //$rootScope.lcNewAmendmentDetails = $scope.lcAmendAcceptForm.AmendmentDetails;
//                                                                                      //console.log("lcNewAmendmentDetails",lcNewAmendmentDetails);
//
//                                                                                      //end here
//
//                                                                });
//
//                                            //end
//
//                     /* $scope.lcAmendApproveForm.LcAmendExpiryDate = new Date(finalData[0].lcorder.amendData[length-1].lcAmendExpiryDate.replace(pattern, '$1-$2-$3'));*/
//                      const length = finalData[0].lcorder.amendData.length;
//                      console.log("lenght",length);
//                      $scope.lcAmendApproveForm.lcexpirydate = finalData[0].lcorder.amendData[length-1].lcAmendExpiryDate;
//                      $scope.lcAmendApproveForm.lcexpiryplace = finalData[0].lcorder.amendData[length-1].lcAmendExpiryPlace;
//                      $scope.lcAmendApproveForm.modeofshipment =  finalData[0].lcorder.amendData[length-1].amendModeOfShipment;
//                      $scope.lcAmendApproveForm.lcamount =  finalData[0].lcorder.amendData[length-1].lcAmendAmount;
//
//                      $scope.lcAmendApproveForm.lcId = finalData[0].lcorder.lcId;
//                      $scope.lcAmendApproveForm.applicant = finalData[0].lcorder.applicantCustomer;
//                      $scope.lcAmendApproveForm.applicantaddress = finalData[0].lcorder.applicantAddress;
//                      $scope.lcAmendApproveForm.shipmentperiod =  finalData[0].lcorder.shipmentPeriod;
//                      $scope.lcAmendApproveForm.beneficiary = finalData[0].lcorder.beneficiaryId;
//                      $scope.lcAmendApproveForm.beneficiaryaddress = finalData[0].lcorder.beneficiaryAddress;
//                      $scope.lcAmendApproveForm.lctype = finalData[0].lcorder.lcType;
//                      $scope.lcAmendApproveForm.lccurrency = finalData[0].lcorder.lcCurrency;
//                      $scope.lcAmendApproveForm.lcissuedate = finalData[0].lcorder.lcIssueDate;
//                      $scope.lcAmendApproveForm.shipmentdate = finalData[0].lcorder.latestShipmentDate;
//                      $scope.lcAmendApproveForm.liabilitydate = finalData[0].lcorder.liabilityReversalDate;
//                      $scope.lcAmendApproveForm.beneficiarybank = finalData[0].lcorder.advisingBankID;
//                      $scope.lcAmendApproveForm.applicantBank = finalData[0].lcorder.applicantBank;
//                      $scope.lcAmendApproveForm.applicantBankAddress = finalData[0].lcorder.applicantBankAddress;
//                      $scope.lcAmendApproveForm.beneficiarybankaddress = finalData[0].lcorder.advisingBankAddress;
//                      $scope.lcAmendApproveForm.DocumentaryCredit = finalData[0].lcorder.formofDocumentaryCredit;
//                      $scope.lcAmendApproveForm.CreditNumber = finalData[0].lcorder.documentaryCreditNumber;
//                      $scope.lcAmendApproveForm.AvailableWith = finalData[0].lcorder.availableWithBy;
//                      $scope.lcAmendApproveForm.TransportationTo = finalData[0].lcorder.forTransportationTo;
//                      $scope.lcAmendApproveForm.DescOfGoods = finalData[0].lcorder.descriptionOfGoodsAndOrServices;
//                      $scope.lcAmendApproveForm.additionalConditions = finalData[0].lcorder.additionalConditions;
//                      $scope.lcAmendApproveForm.PeriodForPresentaion = finalData[0].lcorder.periodForPresentation;
//                      $scope.lcAmendApproveForm.AdvisingThroughBank = finalData[0].lcorder.advisingThroughBank;
//                      $scope.lcAmendApproveForm.transhipment = finalData[0].lcorder.transshipment;
//                      $scope.lcAmendApproveForm.PortofLoading = finalData[0].lcorder.portofLoading;
//                      $scope.lcAmendApproveForm.MaxCreditAmount = finalData[0].lcorder.maximumCreditAmount;
//                      $scope.lcAmendApproveForm.DraftsAt = finalData[0].lcorder.draftsAt;
//                      $scope.lcAmendApproveForm.PartialShipments = finalData[0].lcorder.partialShipments;
//                      $scope.lcAmendApproveForm.SenderToReceiverInfo = finalData[0].lcorder.senderToReceiverInformation;
//                      $scope.lcAmendApproveForm.Charges = finalData[0].lcorder.charges;
//                      $scope.lcAmendApproveForm.ConfirmationInstruction = finalData[0].lcorder.confirmationInstructions;
//                      $scope.lcAmendApproveForm.SequenceTotal = finalData[0].lcorder.sequenceOfTotal;
//                      $scope.lcAmendApproveForm.DocRequired = finalData[0].lcorder.documentsRequired;
//                      $scope.lcAmendApproveForm.iban = finalData[0].lcorder.ibanNumber;
//                      $scope.lcAmendApproveForm.incoTerms=finalData[0].lcorder.incoTerms;
//                        //New Changes:24-03-2017 : Deepak:Begin
//                         $scope.lcAmendApproveForm.DraftsAt_sight=	finalData[0].lcorder.draftsAtSight;
//                         $scope.lcAmendApproveForm.DraftsAt_usance=	finalData[0].lcorder.draftsAtUsance;
//                         $scope.lcAmendApproveForm.shipmentperiod_sight=	finalData[0].lcorder.shipmentPeriodSight;
//                         $scope.lcAmendApproveForm.shipmentperiod_usance=	finalData[0].lcorder.shipmentPeriodUsance;
//                         $scope.lcAmendApproveForm.Percentage_sight=finalData[0].lcorder.percentageSight;
//                         $scope.lcAmendApproveForm.Percentage_usance=	finalData[0].lcorder.percentageUsance;
//                         $scope.lcAmendApproveForm.lcamount_sight=	finalData[0].lcorder.lcAmountSight;
//                         $scope.lcAmendApproveForm.lcamount_usance=	finalData[0].lcorder.lcAmountUsance;
//
//                      //New Changes:24-03-2017 : Deepak:END
//                        });
//
//
//
//                    $scope.amendApproveLC = () => {
//                    const amendApproveLOC = {
//                          lcId : $scope.lcAmendApproveForm.lcId,
//                          lcReqId : $scope.lcRequestID,
//                          //lcReqId : $scope.lcAmendApproveForm.LcAmendReqId,
//                          applicantCustomer : $scope.lcAmendApproveForm.applicant,
//                          applicantAddress : $scope.lcAmendApproveForm.applicantaddress,
//                          beneficiaryId : $scope.lcAmendApproveForm.beneficiary,
//                          beneficiaryAddress : $scope.lcAmendApproveForm.beneficiaryaddress,
//                          lcType : $scope.lcAmendApproveForm.lctype,
//                          lcCurrency : $scope.lcAmendApproveForm.lccurrency,
//                          lcIssueDate : $scope.lcAmendApproveForm.lcissuedate,
//                          latestShipmentDate : $scope.lcAmendApproveForm.shipmentdate,
//                          liabilityReversalDate : $scope.lcAmendApproveForm.liabilitydate,
//                          applicantBank : $scope.lcAmendApproveForm.applicantBank,
//                          applicantBankAddress : $scope.lcAmendApproveForm.applicantBankAddress,
//                          advisingBankAddress : $scope.lcAmendApproveForm.beneficiarybankaddress,
//                          formofDocumentaryCredit : $scope.lcAmendApproveForm.DocumentaryCredit,
//                          documentaryCreditNumber : $scope.lcAmendApproveForm.CreditNumber,
//                          availableWithBy : $scope.lcAmendApproveForm.AvailableWith,
//                          forTransportationTo : $scope.lcAmendApproveForm.TransportationTo,
//                          descriptionOfGoodsAndOrServices : $scope.lcAmendApproveForm.DescOfGoods,
//                          additionalConditions : $scope.lcAmendApproveForm.additionalConditions,
//                          periodForPresentation : $scope.lcAmendApproveForm.PeriodForPresentaion,
//                          advisingThroughBank : $scope.lcAmendApproveForm.AdvisingThroughBank,
//                          transshipment : $scope.lcAmendApproveForm.transhipment,
//                          portofLoading : $scope.lcAmendApproveForm.PortofLoading,
//                          maximumCreditAmount : $scope.lcAmendApproveForm.MaxCreditAmount,
//                          draftsAt : $scope.lcAmendApproveForm.DraftsAt,
//                          partialShipments : $scope.lcAmendApproveForm.PartialShipments,
//                          senderToReceiverInformation : $scope.lcAmendApproveForm.SenderToReceiverInfo,
//                          charges : $scope.lcAmendApproveForm.Charges,
//                          confirmationInstructions : $scope.lcAmendApproveForm.ConfirmationInstruction,
//                          sequenceOfTotal : $scope.lcAmendApproveForm.SequenceTotal,
//                          ibanNumber : $scope.lcAmendApproveForm.iban,
//                          incoTerms:$scope.lcAmendApproveForm.incoTerms,
//
//                          documentsRequired: $scope.lcAmendApproveForm.DocRequired,
//
//                          shipmentPeriod : $scope.lcAmendApproveForm.shipmentperiod,
//                          lcExpiryDate : new Date($scope.lcAmendApproveForm.LcAmendExpiryDate).toLocaleDateString(),
//                          modeOfShipment : $scope.lcAmendApproveForm.amendModeOfShipment,
//                          lcAmount : $scope.lcAmendApproveForm.lcAmendAmount,
//                          lcExpiryPlace :  $scope.lcAmendApproveForm.lcAmendExpiryPlace,
//                          lcNumberOfAmendment : $rootScope.version,
//                          lcAmendmentDetails : $scope.lcAmendApproveForm.AmendmentDetails,
//                          /*lcAmountTemp : $scope.lcAmendApproveForm.lcAmendAmount,*/
//                          advisingBankID : $scope.lcAmendApproveForm.beneficiarybank,
//                          //New Changes:24-03-2017 : Deepak:Begin
//
//                          draftsAtSight : $scope.lcAmendApproveForm.DraftsAt_sight,
//                          draftsAtUsance: $scope.lcAmendApproveForm.DraftsAt_usance,
//                          shipmentPeriodSight: $scope.lcAmendApproveForm.shipmentperiod_sight,
//                          shipmentPeriodUsance:$scope.lcAmendApproveForm.shipmentperiod_usance,
//                          percentageSight: $scope.lcAmendApproveForm.Percentage_sight,
//                          percentageUsance: $scope.lcAmendApproveForm.Percentage_usance,
//                          lcAmountSight:$scope.lcAmendApproveForm.lcamount_sight,
//                          lcAmountUsance:$scope.lcAmendApproveForm.lcamount_usance,
//
//                       //New Changes:24-03-2017 : Deepak:END
//
//                          //status : "APPROVED"
//                                };
//                                    const approveLCEndpoint =
//                                        apiBaseURL +"lc-amend-approve";
//
//console.log("amendApprove LOC object  ",amendApproveLOC);
//                                   $http.post(approveLCEndpoint, angular.toJson(amendApproveLOC)).then(
//                                   function(result){
//                                    // success callback
//                                    console.log("INSIDE SUCCESS FUNCTION");
//                                    $location.path("/employeeHome");
//                                    displayMessage(result);
//                                    }, 
//                                    function(result){
//                                    // failure callback
//                                    console.log("INSIDE ERROR FUNCTION");
//                                    displayMessage(result);
//                                                                         }
//                                        //(result) => displayMessage(result),
//                                        //(result) => displayMessage(result)
//                                    );
//                                    // console.log("LC approved and the object is  ",approveLoc);
//                                     //console.log("message status" , $scope.messageStatus);
//                                     //$location.path("/home");
//                        }
//                        $scope.cancel = () => {
//                              $location.path("/employeeHome");
//                        }
//                        displayMessage = (message) => {
//                        console.log("message in display message--->",message);
//                        $rootScope.messageStatus = message.status;
//                                const modalInstanceTwo = $uibModal.open({
//                                    templateUrl: 'messageContent.html',
//                                    controller: 'messageCtrl',
//                                    controllerAs: 'modalInstanceTwo',
//                                    resolve: { message: () => message }
//                                });
//
//                                modalInstanceTwo.result.then(() => {}, () => {});
//                            };
//
//                        function invalidFormInput() {
//                            const invalidNonItemFields = !$scope.lcform.lcrequest
//                    //            || isNaN(modalInstance.form.orderNumber)
//                    //            || !modalInstance.form.deliveryDate
//                    //            || !modalInstance.form.city
//                    //            || !modalInstance.form.country;
//                    //
//                    //        const inValidCounterparty = modalInstance.form.counterparty === undefined;
//                    //
//                    //        const invalidItemFields = modalInstance.items
//                    //            .map(item => !item.name || !item.amount || isNaN(item.amount))
//                    //            .reduce((prev, curr) => prev && curr);
//
//                            return invalidNonItemFields;
//                        }
//                        }
//                                                else{
//                                                $location.path("/customer");
//                                                }
//
//                  });
////====================================================================================================================================================================================
////AMEND APPROVE CONTROLLER END HERE
////====================================================================================================================================================================================
//
//
//
////Amend start here
//app.controller('amendApprovalController', function($http,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore) {
//  if($cookieStore.get('employee')){
//                    $scope.message = 'Approve Amended Letter of Credits ';
//                    $scope.node = $rootScope.thisNode;
//                     $scope.username = $cookieStore.get('employee');
//                     console.log("APPROVING ID ===>",$rootScope.ApproveID,"  node is ",$scope.node," username is ",$scope.username);
//                     const LCReqNumb = $rootScope.ID;
//
//                        $scope.logout = function(){
//                        $cookieStore.remove('employee');
//                        $location.path("/customer");
//                            };
//                        $scope.lcAmendApproveForm = {};
//                        $scope.formError = false;
//
//                    const LCApprovalId = $rootScope.ApproveID;
//                    const apiBaseURL = $rootScope.apiBaseURL;
//                    //const getObj = apiBaseURL + "lc-orders";
//                    const cusID1 = $cookieStore.get('employee');
//                    const getObj = apiBaseURL + "employee-amended-lc-orders/"+LCApprovalId;
//
//                    $http.get(getObj).then(function(response){
//                    var finalData = response.data;
//                    console.log("RESPONSE DATA ", finalData);
//                    console.log("RESPONSE DATA final", finalData[0].lcorder,finalData[0]);
//                    $scope.lcRequestID = finalData[0].lcorder.lcReqId;
//
//                      //amend details assign here
//                      const length = finalData[0].amendData.length;
//                      console.log("lenght",length);
//                      const size = finalData.size;
//                      console.log("size",size)
//                      /*$scope.lcAmendApproveForm.LcAmendId = finalData[0].lcorder;
//                      $scope.lcAmendApproveForm.LcAmendReqId = finalData[0].lcorder.lcReqId;
//                      $scope.lcAmendApproveForm.LcAmendAmount = finalData[0].lcorder.;
//                      $scope.lcAmendApproveForm.shipmentperiod =  finalData[0].lcorder.shipmentPeriod;
//                      $scope.lcAmendApproveForm.lcexpirydate = finalData[0].lcorder.lcExpiryDate;
//                      $scope.lcAmendApproveForm.modeofshipment =  finalData[0].lcorder.modeOfShipment;
//                      $scope.lcAmendApproveForm.beneficiary = finalData[0].lcorder.beneficiaryId;*/
//
//
//                      $scope.lcAmendApproveForm.lcId = finalData[0].lcorder.lcId;
//                      $scope.lcAmendApproveForm.applicant = finalData[0].lcorder.applicantCustomer;
//                      $scope.lcAmendApproveForm.applicantaddress = finalData[0].lcorder.applicantAddress;
//                      $scope.lcAmendApproveForm.shipmentperiod =  finalData[0].lcorder.shipmentPeriod;
//                      $scope.lcAmendApproveForm.lcexpirydate = finalData[0].lcorder.lcExpiryDate;
//                      $scope.lcAmendApproveForm.modeofshipment =  finalData[0].lcorder.modeOfShipment;
//                      $scope.lcAmendApproveForm.beneficiary = finalData[0].lcorder.beneficiaryId;
//                      $scope.lcAmendApproveForm.beneficiaryaddress = finalData[0].lcorder.beneficiaryAddress;
//                      $scope.lcAmendApproveForm.lctype = finalData[0].lcorder.lcType;
//                      $scope.lcAmendApproveForm.lccurrency = finalData[0].lcorder.lcCurrency;
//                      $scope.lcAmendApproveForm.lcamount =  finalData[0].lcorder.lcAmount;
//                      $scope.lcAmendApproveForm.lcissuedate = finalData[0].lcorder.lcIssueDate;
//                      $scope.lcAmendApproveForm.lcexpiryplace = finalData[0].lcorder.lcExpiryPlace;
//                      $scope.lcAmendApproveForm.shipmentdate = finalData[0].lcorder.latestShipmentDate;
//                      $scope.lcAmendApproveForm.liabilitydate = finalData[0].lcorder.liabilityReversalDate;
//                      $scope.lcAmendApproveForm.beneficiarybank = finalData[0].lcorder.advisingBankID;
//                      $scope.lcAmendApproveForm.applicantBank = finalData[0].lcorder.applicantBank;
//                      $scope.lcAmendApproveForm.applicantBankAddress = finalData[0].lcorder.applicantBankAddress;
//                      $scope.lcAmendApproveForm.beneficiarybankaddress = finalData[0].lcorder.advisingBankAddress;
//                      $scope.lcAmendApproveForm.DocumentaryCredit = finalData[0].lcorder.formofDocumentaryCredit;
//                      $scope.lcAmendApproveForm.CreditNumber = finalData[0].lcorder.documentaryCreditNumber;
//                      $scope.lcAmendApproveForm.AvailableWith = finalData[0].lcorder.availableWithBy;
//                      $scope.lcAmendApproveForm.TransportationTo = finalData[0].lcorder.forTransportationTo;
//                      $scope.lcAmendApproveForm.DescOfGoods = finalData[0].lcorder.descriptionOfGoodsAndOrServices;
//                      $scope.lcAmendApproveForm.additionalConditions = finalData[0].lcorder.additionalConditions;
//                      $scope.lcAmendApproveForm.PeriodForPresentaion = finalData[0].lcorder.periodForPresentation;
//                      $scope.lcAmendApproveForm.AdvisingThroughBank = finalData[0].lcorder.advisingThroughBank;
//                      $scope.lcAmendApproveForm.transhipment = finalData[0].lcorder.transshipment;
//                      $scope.lcAmendApproveForm.PortofLoading = finalData[0].lcorder.portofLoading;
//                      $scope.lcAmendApproveForm.MaxCreditAmount = finalData[0].lcorder.maximumCreditAmount;
//                      $scope.lcAmendApproveForm.DraftsAt = finalData[0].lcorder.draftsAt;
//                      $scope.lcAmendApproveForm.PartialShipments = finalData[0].lcorder.partialShipments;
//                      $scope.lcAmendApproveForm.SenderToReceiverInfo = finalData[0].lcorder.senderToReceiverInformation;
//                      $scope.lcAmendApproveForm.Charges = finalData[0].lcorder.charges;
//                      $scope.lcAmendApproveForm.ConfirmationInstruction = finalData[0].lcorder.confirmationInstructions;
//                      $scope.lcAmendApproveForm.SequenceTotal = finalData[0].lcorder.sequenceOfTotal;
//                      $scope.lcAmendApproveForm.DocRequired = finalData[0].lcorder.documentsRequired;
//                      $scope.lcAmendApproveForm.iban = finalData[0].lcorder.ibanNumber;
//                      $scope.lcAmendApproveForm.incoTerms=finalData[0].lcorder.incoTerms;
//                        });
//
//
//                    $scope.amendApproveLC = () => {
//                    const amendApproveLOC = {
//                          lcId : $scope.lcAmendApproveForm.lcId,
//                          lcReqId : $scope.lcRequestID,
//                          applicantCustomer : $scope.lcAmendApproveForm.applicant,
//                          applicantAddress : $scope.lcAmendApproveForm.applicantaddress,
//                          shipmentPeriod : $scope.lcAmendApproveForm.shipmentperiod,
//                          lcExpiryDate : $scope.lcAmendApproveForm.lcexpirydate,
//                          modeOfShipment : $scope.lcAmendApproveForm.modeofshipment,
//                          beneficiaryId : $scope.lcAmendApproveForm.beneficiary,
//                          beneficiaryAddress : $scope.lcAmendApproveForm.beneficiaryaddress,
//                          lcType : $scope.lcAmendApproveForm.lctype,
//                          lcCurrency : $scope.lcAmendApproveForm.lccurrency,
//                          lcAmount : $scope.lcAmendApproveForm.lcamount,
//                          lcIssueDate : $scope.lcAmendApproveForm.lcissuedate,
//                          lcExpiryPlace : $scope.lcAmendApproveForm.lcexpiryplace,
//                          latestShipmentDate : $scope.lcAmendApproveForm.shipmentdate,
//                          liabilityReversalDate : $scope.lcAmendApproveForm.liabilitydate,
//                          advisingBankID : $scope.lcAmendApproveForm.beneficiarybank,
//                          applicantBank : $scope.lcAmendApproveForm.applicantBank,
//                          applicantBankAddress : $scope.lcAmendApproveForm.applicantBankAddress,
//                          advisingBankAddress : $scope.lcAmendApproveForm.beneficiarybankaddress,
//                          formofDocumentaryCredit : $scope.lcAmendApproveForm.DocumentaryCredit,
//                          documentaryCreditNumber : $scope.lcAmendApproveForm.CreditNumber,
//                          availableWithBy : $scope.lcAmendApproveForm.AvailableWith,
//                          forTransportationTo : $scope.lcAmendApproveForm.TransportationTo,
//                          descriptionOfGoodsAndOrServices : $scope.lcAmendApproveForm.DescOfGoods,
//                          additionalConditions : $scope.lcAmendApproveForm.additionalConditions,
//                          periodForPresentation : $scope.lcAmendApproveForm.PeriodForPresentaion,
//                          advisingThroughBank : $scope.lcAmendApproveForm.AdvisingThroughBank,
//                          transshipment : $scope.lcAmendApproveForm.transhipment,
//                          portofLoading : $scope.lcAmendApproveForm.PortofLoading,
//                          maximumCreditAmount : $scope.lcAmendApproveForm.MaxCreditAmount,
//                          draftsAt : $scope.lcAmendApproveForm.DraftsAt,
//                          partialShipments : $scope.lcAmendApproveForm.PartialShipments,
//                          senderToReceiverInformation : $scope.lcAmendApproveForm.SenderToReceiverInfo,
//                          charges : $scope.lcAmendApproveForm.Charges,
//                          confirmationInstructions : $scope.lcAmendApproveForm.ConfirmationInstruction,
//                          sequenceOfTotal : $scope.lcAmendApproveForm.SequenceTotal,
//                          ibanNumber : $scope.lcAmendApproveForm.iban,
//                          incoTerms:$scope.lcAmendApproveForm.incoTerms,
//
//                          documentsRequired: $scope.lcAmendApproveForm.DocRequired,
//                                };
//                                    const approveLCEndpoint =
//                                        apiBaseURL +"lc-approve";
//
//console.log("amendApprove LOC object  ",amendApproveLOC);
//                                   $http.post(amendApproveLCEndpoint, angular.toJson(amendApproveLOC)).then(
//                                   function(result){
//                                    // success callback
//                                    console.log("INSIDE SUCCESS FUNCTION");
//                                    $location.path("/employeeHome");
//                                    displayMessage(result);
//                                    }, 
//                                    function(result){
//                                    // failure callback
//                                    console.log("INSIDE ERROR FUNCTION");
//                                    displayMessage(result);
//                                                                         }
//                                        //(result) => displayMessage(result),
//                                        //(result) => displayMessage(result)
//                                    );
//                                    // console.log("LC approved and the object is  ",approveLoc);
//                                     //console.log("message status" , $scope.messageStatus);
//                                     //$location.path("/home");
//                        }
//                        $scope.cancel = () => {
//                              $location.path("/employeeHome");
//                        }
//                        displayMessage = (message) => {
//                        console.log("message in display message--->",message);
//                        $rootScope.messageStatus = message.status;
//                                const modalInstanceTwo = $uibModal.open({
//                                    templateUrl: 'messageContent.html',
//                                    controller: 'messageCtrl',
//                                    controllerAs: 'modalInstanceTwo',
//                                    resolve: { message: () => message }
//                                });
//
//                                modalInstanceTwo.result.then(() => {}, () => {});
//                            };
//
//                        function invalidFormInput() {
//                            const invalidNonItemFields = !$scope.lcform.lcrequest
//                    //            || isNaN(modalInstance.form.orderNumber)
//                    //            || !modalInstance.form.deliveryDate
//                    //            || !modalInstance.form.city
//                    //            || !modalInstance.form.country;
//                    //
//                    //        const inValidCounterparty = modalInstance.form.counterparty === undefined;
//                    //
//                    //        const invalidItemFields = modalInstance.items
//                    //            .map(item => !item.name || !item.amount || isNaN(item.amount))
//                    //            .reduce((prev, curr) => prev && curr);
//
//                            return invalidNonItemFields;
//                        }
//                        }
//                                                else{
//                                                $location.path("/customer");
//                                                }
//
//                  });
//
//        app.controller('messageCtrl', function ($uibModalInstance, message) {
//            const modalInstanceTwo = this;
//            modalInstanceTwo.message = message.data;
//            console.log("message inside messageCtrl  ",modalInstanceTwo.message);
//        });