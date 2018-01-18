   app.controller('requestController', function ($http,$filter,$sce,$window, $uibModal, $location, $rootScope,$interval, $scope, $cookies, $cookieStore, rootValues, shareidCustomer) {
        $scope.files = [];

    //2. a simple model that want to pass to Web API along with selected files
    $scope.jsonData = {

        comments: "Multiple upload files"
    };
	$scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
	   $scope.uploadfileTest = function () {
		var idd=$scope.tempid;
		
		console.log("uploadfileTest",idd);
		//console.log("LCRequestId ",tempid);
		var  url= "http://"+window.__env.apiUrl+":10009/upload/"+idd;
		  console.log(url);
        $http({
            method: 'POST',
            url: "http://"+window.__env.apiUrl+":10009/upload/"+idd,
            headers: { 'Content-Type': undefined },

            transformRequest: function (data) {
                      var formData = new FormData();
					            console.log("DATA",data);
                      //formData.append("model", angular.toJson(data.model));
                      for (var i = 0; i < data.files.length; i++) {
                          formData.append("file" + i, data.files[i]);
                          console.log("file appending",data.files[i]);
                          console.log("$scope.LCRequestId",$scope.LCRequestId);
                        }
                        console.log("formData",formData);

			                  console.log("data===========",data);
		              return formData;
            },
            data: { model: $scope.jsonData, files: $scope.files }
        }).
                        success(function (resp) {
							console.log("TEST DATA====>",resp);
							alert(resp);
              //displayMessage(resp);
			  shareid.tab=2;
							$location.path("/lcRequest");


                                  }).
                        error(function () {
                          alert("failed!");
                          $location.path("/lcRequest");
                       });
                        }
	   
	   
       var tick = function () {
            $scope.clock = Date.now();
          }
          tick();
          $interval(tick, 1000);

          $scope.CurrentDate = new Date();
	   if ($cookieStore.get('customer')) {

           custID = $cookieStore.get('customerID');
           console.log("custID", $cookieStore.get('customerID'));
           $scope.selectedIndex = 2;

           //tabbed request page starts////////////////////////////////////////////////////
           $scope.tabs = [{
                   title: 'Import LC Basic Info',
                   url: 'one.tpl.html',
                   test: 'lcRequestTab1.html'
               }, {
                   title: 'Parties to LC',
                   url: 'two.tpl.html'
               }, {
                   title: 'Charges',
                   url: 'three.tpl.html'
               }, {
                   title: 'Commission',
                   url: 'four.tpl.html'
               },
               {
                   title: 'Syndication',
                   url: 'five.tpl.html'
               },
               {
                   title: 'Margin Details',
                   url: 'six.tpl.html'
               },
               {
                   title: 'Pay/Revolving Details',
                   url: 'seven.tpl.html'
               },
               {
                   title: 'Documents and conditions',
                   url: 'eight.tpl.html'
               },
               {
                   title: 'MT 700/701',
                   url: 'nine.tpl.html'
               },
               {
                   title: 'MT 740',
                   url: 'ten.tpl.html'
               }
           ];

		   
		   
           $scope.currentTab = 'one.tpl.html';

           $scope.onClickTab = function (tab) {
               $scope.currentTab = tab.url;
           }

           $scope.isActiveTab = function (tabUrl) {
               return tabUrl == $scope.currentTab;
           }

		   
		   
		   
		   
                        displayMessage = (message) => {
                        console.log("message in display message- lcreq controller-->",message);
                        $rootScope.messageStatus = message.status;
                                const modalInstanceTwo = $uibModal.open({
                                    templateUrl: 'messageContent.html',
                                    controller: 'messageCtrl',
                                    controllerAs: 'modalInstanceTwo',
                                    resolve: { message: () => message }
                                });

                                modalInstanceTwo.result.then(() => {}, () => {});
                            };
           //tabbed request page ends//////////////////////////////////////////////////////



           $scope.message = 'Request Letter of Credit';
           const nodePort = $location.port();
           const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";
           // const apiBaseURL = $rootScope.apiBaseURL;
           //  const LCRequestId = $rootScope.lcRequestID;

           $scope.id = rootValues.data1;
           console.log("rootID", $scope.id);


           // const LCRequestId = '123342';
           //const LCRequestId = rootValues.id;
           const LCRequestId = $scope.id;
           // $rootScope.ID12=LCRequestId;

           //  console.log("LCRequestId222:",LCRequestId);
           console.log("LCRequestId", LCRequestId);
           // const LCRequestId = $rootScope.lcRequestID;
           $scope.node = $rootScope.thisNode;
           console.log("apiBaseNil:", apiBaseURL);



           $scope.logout = function () {
               $cookieStore.remove('customer');
               $cookieStore.remove('customerID');
               $location.path("/customer");
           };
           const requestID = "LC-REQ-" + rootValues.data1;
		   $scope.tempid=requestID;
          
           console.log("1", LCRequestId);
           console.log("2", requestID);
           $scope.username = $cookieStore.get('customer');
           $http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
               console.log('respp', response.data[0]);
               $scope.lcForm.LCIssueDate_t1 = new Date();
               $scope.lcForm.lcReqNo = requestID;
               $scope.lcForm.ApplicantID_t1 = response.data[0].name;
               $scope.lcForm.LcRequestNumber = "LC-REQ-" + rootValues.data1;
            //    $scope.lcForm.applicant = response.data[0].name;
               $scope.lcForm.ApplicantAddress_t1 = response.data[0].customeraddress;
               $scope.lcForm.mT700_1_51aADApplicantBank_1 = response.data[0].bank;
               $scope.lcForm.applicantBankAddress = response.data[0].bankaddress;
               
           });

           $http.get(apiBaseURL + "/othercustomer").then(function (response) {
               $scope.cusList = [];
               $scope.customerList = [];
               const otherCustomer = response;
               console.log('otherCustomer', otherCustomer);
               for (var j = 0; j < otherCustomer.data.length; j++) {
                   console.log('otherCustomerLoop', otherCustomer.data[j]);
                   $scope.cusList.push(otherCustomer.data[j].ibanno);
                   $scope.customerList.push(otherCustomer.data[j]);
               };
               console.log("$scope.customerList",$scope.customerList);
			   $scope.lcForm.beneficiaryBank = $scope.customerList[0].bank;
           });


           $http.get(apiBaseURL + "/account/allDetail/").then(function (response) {
               $scope.allAccountList = [];
               for (var j = 0; j < response.data.length; j++) {
                   $scope.allAccountList.push(response.data[j].accno);
               };
               console.log('$scope.allAccountList', $scope.allAccountList);
           });



           $scope.customerChange = function () {
               $scope.otherBankList = [];
               console.log("customerChange", $scope.lcForm.BeneficiaryID_t2)
               const BeneficiaryIDval = $scope.lcForm.BeneficiaryID_t2;
               $http.get(apiBaseURL + "/customer/detail/custID/" + BeneficiaryIDval).then(function (response) {
                   $scope.lcForm.BeneficiaryAddress_t2 = response.data[0].customeraddress;

                   $http.get(apiBaseURL + "/bank/otherBanks/" + response.data[0].bank).then(function (response) {
                       bankList = response;
                       console.log('bankList', bankList);
                       for (var j = 0; j < bankList.data.length; j++) {
                           console.log('bankListLoop', bankList.data[j]);
                           $scope.otherBankList.push(bankList.data[j]);
                       };
                   });

               });



           };



           $scope.options = [{
               "col1": "data1",
               "col2": "data1.2"
           }, {
               "col1": "data2",
               "col2": "data2.2"
           }];
           $scope.advisingBankChange = function () {
               console.log("AdvisingThroughBankIDval", $scope.lcForm.AdvisingThroughBank_t2)
               const AdvisingThroughBankIDval = $scope.lcForm.AdvisingThroughBank_t2;
               $http.get(apiBaseURL + "/bank/bankAddress/" + AdvisingThroughBankIDval).then(function (response) {
                   $scope.lcForm.AdvisingBankAddress_t2 = response.data[0].address;
               });
           };


           //Amount Test

           /*$s
           $scope.AmountChange = function() {
                       const amountValue = $scope.lcForm.amount;
                        };*/
           //end


           $scope.ibanChange = function () {
               const ibanValue = $scope.lcForm.iban;
               $http.get(apiBaseURL + "/customer/detail/" + ibanValue).then(function (response) {
                   $scope.lcForm.beneficiary = response.data[0].name;
                   $scope.lcForm.beneficiaryaddress = response.data[0].customeraddress;
                   $scope.lcForm.beneficiarybank = response.data[0].bank;
                   $scope.lcForm.beneficiarybankaddress = response.data[0].bankaddress;
               });
           };

           $scope.lcForm = {};
           $scope.formError = false;
           $scope.isCollapsed = true;

           $scope.lcForm.DraftsAt = 'SIGHT';                                
           $scope.lctype = ['IAC', 'IATC', 'IATU', 'IAU','IDC','IDTC','IDTU','IDU'];

           //$scope.lctype=['SIGHT','USANCE','MIXED'];
           $scope.incoTerms = ['CFR-Cost and freight', 'CIF-Cost,Insurance and freight', 'CIP-Carriage and Insurance paid to', 'CPT-Carriage paid to', 'DAF-Delivered at Frontier', 'DAP-Delivered at place', 'DAT-Delivered at terminal',
               'DDP-Delivered duty paid', 'DDU-Delivered duty unpaid', 'DEQ-Delivered Ex Quay', 'DES-Delivered Ex ship', 'EXW-Ex Works', 'FAS-Free Alongside Ship', 'FCA-Free carrier', 'FOB-Free on board'
           ];

           /*                               $scope.otherOfficer = ['Implementation', 'Retail Banking Manager-Others', 'Retail Banking User 3', 'Retail Banking User 4', 'Treasury Dealer', 'Treasury Dealer', 'Treasury Supervisor', 'Treasury Supervisor', 'Chief Treasury Dealer -Corporate', 'Chief Treasury Dealer -Interbank', 'Securities Dealer', 'Securities Back Office User', 'Chief Securities Dealer', 'Private Corporate Action Officer', 'PBO Settlement Analyst', 'Private Credit Officer', 'Teller 2', 'Retail Loan Administrator 1', 'Retail Loan Administrator 2', 'Retail Loan Supervisor', 'Mortgage Dept User 2', 'Payments Administrator', 'Payments Supervisor', 'Financial Control Manager', 'Customer Services Manager-Corporate', 'Customer Service Agent', 'Branch Operations Manager', 'Retail Credit Officer', 'Retail Credit Manager', 'Call Centre Agent', 'Teller', 'Head Teller', 'Retail Payments Officer', 'Retail Payments Supervisor', 'Retail Collector', 'Retail Collection Manager', 'Broker Administrator', 'Derivatives Front Office Dealer', 'Derivatives Middle Officer User', 'Derivatives Back Office User', 'Private Corporate Action Officer', 'Credit Officer', 'Credit Officer', 'Credit Manager,Trade Finance Officer', 'Trade Finance Officer', 'Trade Finance Officer', 'Trade Finance Supervisor', 'Credit Officer', 'Credit Manager', 'Corporate Officer', 'Corporate Loan Supervisor', 'Corporate Loan Administrator', 'Corporate Loan Administrator', 'Corporate Loan Supervisor', 'Corporate Customer Service Agent', 'PWM Relationship Manager', 'PWM Relationship Manager', 'PWM Portfolio Administrator', 'PWM Portfolio Advisor', 'Arc Admin User', 'Finance Officer', 'Finance Manager', 'Compliance Officer', 'Import LC Officer', 'Export LC Officer', 'Collections Officer', 'Guarantees Officer', 'Trade Finance Supervisor 1', 'Trade Finance Supervisor 2', 'Trade Finance Manager', 'Treasury', 'Implementation', 'Treasury Forex Dealer', 'Consumer Banking', 'Corporate Banking', 'Treasury', 'Investment Portfolio', 'Support', 'Private Banking Department', 'Treasury Divisional Head', 'Treasury Dealers Manager', 'Treasury Back Office Manager', 'Treasury Back Office Manager', 'Private Banking Divisional Head', 'Private Wealth Manager', 'Securities Middle Officer Manager', 'Securities Back Office Manager', 'Customer Services Divisional Head', 'Retail Banking Manager', 'Main Cashiers', 'Foreign Currency Cashiers', 'Corporate Banking Divisional Head', 'Trade Finance Manager', 'Payments Manager', 'Corporate Loans Manager', 'Credit Risk Divisional Head', 'Credit Risk Manager', 'Information Technology Manager', 'Premises Divisional Head', 'Client Services Division', 'Head Office Division', 'Capital Markets Division', 'Financial Control Divisional Head', 'Finance Controller', 'T24 Updates'];
            */

           $scope.otherOfficer = ['Implementation', 'Retail Banking Manager-Others', 'Retail Banking User 3', 'Retail Banking User 4', 'Treasury Dealer', 'Treasury Supervisor',
               'Chief Treasury Dealer -Corporate', 'Chief Treasury Dealer -Interbank', 'Securities Dealer', 'Securities Back Office User', 'Chief Securities Dealer', 'Private Corporate Action Officer', 'PBO Settlement Analyst', 'Private Credit Officer', 'Teller 2'
           ];

           $scope.accountOfficer = ['Implementation', 'Retail Banking Manager-Others', 'Retail Banking User 3', 'Retail Banking User 4', 'Treasury Dealer', 'Treasury Supervisor',
               'Chief Treasury Dealer -Corporate', 'Chief Treasury Dealer -Interbank', 'Securities Dealer', 'Securities Back Office User', 'Chief Securities Dealer', 'Private Corporate Action Officer', 'PBO Settlement Analyst', 'Private Credit Officer', 'Teller 2'
           ];

           $scope.chargeCodeDrop = ['LCADVISE', 'LCAMEND', 'LCCHASER', 'LCCONFIRM', 'LCCOURIER', 'LCDISCNT', 'LCDISCREP', 'LCINCOLL', 'LCNEGO', 'LCOPENAMRT', 'LCOUTCOLL', 'LCREIMB', 'LCSLAMEND', 'LCSLCONFIRM', 'LCSLNEGO', 'LCSLOPEN', 'LCSLOPENCP', 'LCSWIFT', 'LCTRFR'];

           $scope.partyChargedDD = ['SELECT', 'Beneficiary', 'Opener', 'Third Party'];
           $scope.ChargeStatusDD = ['SELECT', 'Collected', 'Charges Claimed'];

           $scope.commissionCodeDD = ['LCACCEPT', 'LCCOMM', 'LCISSUE', 'LCOPEN'];
           $scope.commissionFrequencyDD = ['BOTH', 'FIRST', 'INSURANCE', 'LAST'];
           $scope.accrualParamDD = ['Daily', 'Weekly', 'Monthly', 'Defined', 'Business Day'];

           $scope.percent1 = () => {
               console.log("percent1")
               var per = $scope.lcForm.Percentage_sight;
               var amt = $scope.lcForm.LCAmount_t1;
               var res = amt * per / 100;
               var res1 = amt * (100 - per) / 100;
               console.log(res);
               $scope.lcForm.lcamount_sight = res;

               $scope.lcForm.Percentage_usance = 100 - $scope.lcForm.Percentage_sight;
               $scope.lcForm.lcamount_usance = res1;

           }

           $scope.percent2 = () => {
               console.log("percent2")
               var per2 = $scope.lcForm.Percentage_usance;
               var per1 = 100 - per2;
               var amt = $scope.lcForm.LCAmount_t1;

               var amount2 = amt * per2 / 100;
               var amount1 = amt * per1 / 100;
               $scope.lcForm.lcamount_usance = amount2;
               $scope.lcForm.lcamount_sight = amount1;
               $scope.lcForm.Percentage_sight = per1;
           }

           $scope.drafts = () => {                                    
               var  x = $scope.lcForm.lctype;                                          
               if (x == 'USANCE') {                                            // alert("input empty");
                                                               
                   $scope.lcForm.DraftsAt_usance = '';
                   $scope.lcForm.DraftsAt_sight = 'USANCE';
                   $scope.lcForm.lcamount_usance = '0';
                   $scope.lcForm.lcamount_sight = '0';
                   $scope.lcForm.shipmentperiod_sight = '';
                   $scope.lcForm.shipmentperiod_usance;
                   $scope.lcForm.Percentage_sight = '';
                   $scope.lcForm.Percentage_usance = '';                                                 
               }                                                 
               else if (x == 'SIGHT') {                                                
                   $scope.lcForm.DraftsAt_sight = 'SIGHT';
                   $scope.lcForm.DraftsAt_usance = '';
                   $scope.lcForm.lcamount_usance = '0';
                   $scope.lcForm.lcamount_sight = '0';
                   $scope.lcForm.shipmentperiod_sight = '';
                   $scope.lcForm.shipmentperiod_usance;
                   $scope.lcForm.Percentage_sight = '';
                   $scope.lcForm.Percentage_usance = '';


                                                                    
               }                                                 
               else if (x == 'MIXED') {
                   $scope.lcForm.DraftsAt_usance = '';
                   $scope.lcForm.DraftsAt_sight = '';
                   $scope.lcForm.Percentage_sight = '';
                   $scope.lcForm.Percentage_usance = '';
                   $scope.lcForm.lcamount_sight = '';
                   $scope.lcForm.lcamount_usance = '';
                   $scope.lcForm.shipmentperiod_sight = '';
                   $scope.lcForm.shipmentperiod_usance;                                               
                   $scope.lcForm.DraftsAt_sight = 'SIGHT';
                   $scope.lcForm.DraftsAt_usance = 'USANCE';                                                 
               } else if (x == 'SELECT') {
                   $scope.lcForm.DraftsAt_usance = '';
                   $scope.lcForm.DraftsAt_sight = '';
                   $scope.lcForm.Percentage_sight = '';
                   $scope.lcForm.Percentage_usance = '';
                   $scope.lcForm.lcamount_sight = '';
                   $scope.lcForm.lcamount_usance = '';
                   $scope.lcForm.shipmentperiod_sight = '';
                   $scope.lcForm.shipmentperiod_usance;                                               
                   $scope.lcForm.DraftsAt_sight = '';
                   $scope.lcForm.DraftsAt_usance = '';                                                 
               }
           }

		 $scope.requestValidate = () => {			  
              const validateReqLoc = {				  
                  lcRequestNumber: $scope.lcForm.LcRequestNumber,                  
                  lCIssueDate_t1: $filter('date')($scope.lcForm.LCIssueDate_t1,  "MM/dd/yyyy",  "IST"),
				  shipmentDate_t1: $filter('date')($scope.lcForm.LCShipmentDate_t1,"MM/dd/yyyy",  "IST"),     
                  lCExpiryDate_t1: $filter('date')($scope.lcForm.LCExpiryDate_t1,"MM/dd/yyyy",  "IST")                 
              };
              const validateLCEndpoint = apiBaseURL + "/lc-validate";
              console.log("URL in validation ", validateLCEndpoint);
              console.log(validateReqLoc);
              $http.post(validateLCEndpoint, angular.toJson(validateReqLoc)).then(
                  function (result) {
			if(result.data[0].lcRequestNumber){
                      console.log("in side if",result.data[0].lcRequestNumber);
                      $scope.isError=false;
                      console.log("iserror", $scope.isError);
                      console.log("error",result.data);                    
                  }
                   else{
                      console.log("in side else",result.data[0].lcRequestNumber);
                      $scope.isError=true;
                      console.log("validation error else",result);
                      $scope.validationErrors = result.data;                      
                      console.log("INSIDE SUCCESS FUNCTION", result.data.DATA);
                      $location.path("/lcRequest");                      
			} },  
                  function (result) {
                      // failure callback
                      console.log("INSIDE ERROR FUNCTION");
                      //displayMessage(result);
                  }
              );
              console.log("LC validated and the object is 1234 ", validateReqLoc);
          }
	

           $scope.lccurrency = ['USD','GBP','EUR','CHF'];
           $scope.applicableRuleCodes = ['Eucp Latest Version', 'Eucpurr Latest Version', 'Isp Latest Version', 'othr', 'Ucp Latest Version', 'Ucpurr Latest Version']
           $scope.lcForm.lcissuedate = new Date();


           console.log("LCRequestId as current node", LCRequestId);

           //chndu integration

           $scope.datechange = () => {
               console.log("dateChange triggered");
               if ($scope.lcForm.shipmentdate > $scope.lcForm.lcexpirydate) {
                   console.log("Inside date if");
                   alert("Shipment Date should be less than LC Expiry Date");
                   $scope.lcForm.shipmentdate = $scope.lcForm.lcissuedate;

               }
           }

           $scope.expirydatechange = () => {

               console.log("dateChange in Expiry date triggered");
               console.log("hi");
               console.log("LC ISSUE DATE", $scope.lcForm.lcissuedate);
               if ($scope.lcForm.lcexpirydate < $scope.lcForm.lcissuedate) {
                   console.log("Inside date if expiry");
                   alert("lcExpiry Date should not be less than lcIssueDate");
                   $scope.lcForm.lcexpirydate = $scope.lcForm.lcissuedate;
               }
           }
           $scope.lcAmountcheck = () => {


               /* const createLCEndpoint1 = apiBaseURL +"/email-for-amend";

						                const mail = {
                                                fromID : "test@test.com",
                                                toID : "test@test1.com",
		                                        subject : "test",
                                                message : "Say hello"
                                        };

						 			$http.post(createLCEndpoint1, mail).then(
                                     function(result){
                                      // success callback
                                      console.log("INSIDE email  SUCCESS FUNCTION");
                                    //  $location.path("/customerHome");
                                      displayMessage(result);
                                      }, 
                                      function(result){
                                      // failure callback
                                      console.log("INSIDEemail ERROR FUNCTION");
                                      displayMessage(result);
                                      }
                                      );  */



               if (($scope.lcForm.lctype == "MIXED") && ($scope.lcForm.Percentage_sight && $scope.lcForm.Percentage_usance)) {

                   if ($scope.lcForm.Percentage_sight) {
                       console.log("if $scope.lcForm.Percentage_sight", $scope.lcForm.Percentage_sight)
                       $scope.percent1();
                   }
                   //                                                            if($scope.lcForm.Percentage_usance)
                   //                                                            {
                   //                                                            console.log("if $scope.lcForm.Percentage_usance", $scope.lcForm.Percentage_usance)
                   //                                                            $scope.percent2();
                   //                                                            }
               }


               console.log("LC AMOUNT", $scope.lcForm.LCAmount_t1);
               var value = $scope.lcForm.LCAmount_t1;
               //var Amtval = value.split(/(\d+)/).filter(Boolean);
               var Amtval = value.split(/^([-+]?[0-9]*\.?[0-9]+)([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ])$/);
               console.log("AMT VAL  ", Amtval);

               if (Amtval[2].toLowerCase() == 'm' || Amtval[2].toLowerCase() == 'h' || Amtval[2].toLowerCase() == 't') {

                   if (Amtval[2].toLowerCase() == "m") {
                       $scope.lcForm.LCAmount_t1 = Amtval[1] * 1000000;
                   } else if (Amtval[2].toLowerCase() == "h") {
                       $scope.lcForm.LCAmount_t1 = Amtval[1] * 100;
                   } else if (Amtval[2].toLowerCase() == "t") {
                       $scope.lcForm.LCAmount_t1 = Amtval[1] * 1000;
                   } else {
                       $scope.lcForm.LCAmount_t1 = $scope.lcForm.LCAmount_t1;
                   }
               } else {
                   console.log("inside check else");
                   $scope.lcForm.LCAmount_t1 = "";

               }

           }
           //end

           $scope.create = () => {
               if (invalidFormInput()) {
                   formError = true;
               } else {
				   //writing validate code
				   const validateReqLoc = {				  
                  lcRequestNumber: $scope.lcForm.LcRequestNumber,                  
                  lCIssueDate_t1: $filter('date')($scope.lcForm.LCIssueDate_t1,  "MM/dd/yyyy",  "IST"),
				  shipmentDate_t1: $filter('date')($scope.lcForm.LCShipmentDate_t1,"MM/dd/yyyy",  "IST"), 
                  lCExpiryDate_t1: $filter('date')($scope.lcForm.LCExpiryDate_t1,"MM/dd/yyyy",  "IST")       
              };
              const validateLCEndpoint = apiBaseURL + "/lc-validate";
              console.log("URL in validation ", validateLCEndpoint);
              console.log(validateReqLoc);
              $http.post(validateLCEndpoint, angular.toJson(validateReqLoc)).then(
                  function (result) {
			if(result.data[0].lcRequestNumber){
                      console.log("inside if",result.data[0].lcRequestNumber);
                      $scope.isError=false;
                      console.log("iserror", $scope.isError);
                      console.log("error",result.data);  
                   formError = false;
$http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
               console.log('respp', response.data[0]);
                   const loc = {
                       lcRequestNumber: $scope.lcForm.LcRequestNumber,
                       ImportSightPmtLCType: $scope.lcForm.ImportSightPmtLCType_t1,
                       Applicant: response.data[0].customerid,
                       ApplicantBank: $scope.lcForm.mT700_1_51aADApplicantBank_1,
                       Beneficiary: $scope.lcForm.BeneficiaryID_t2,
                       BeneficiaryBank: $scope.lcForm.beneficiaryBank,
                       LCCurrency: $scope.lcForm.LCCurrency_t1,
                       LCAmount: $scope.lcForm.LCAmount_t1,
                       LCIssueDate: $scope.lcForm.LCIssueDate_t1,
                       LCExpiryDate: $scope.lcForm.LCExpiryDate_t1,
                       LCExpiryPlace: $scope.lcForm.LCExpiryPlace_t1,
                       ChargesFrom: $scope.lcForm.ChargesFrom_t3,
                       FileReference: $scope.lcForm.documentId_t8,
                       "status": "requested",
					   documents:$scope.documentToAdd,
                       documentType:$scope.documentTypeToAdd,
					   LcShipmentDate : $scope.lcForm.LCShipmentDate_t1
                   };

                   console.log("loc from request page>", loc);

                   const createLCEndpoint = apiBaseURL + "/lcreq";
                   $http.post(createLCEndpoint, angular.toJson(loc)).then(
                       function (result) {
                           // success callback
                           console.log("INSIDE SUCCESS FUNCTION loc from request page>");

                           displayMessage(result);
                           shareidCustomer.tab = 1;
                           $location.path("/customerHome");
                       },  
                       function (result) {
                           // failure callback
                           console.log("INSIDE ERROR FUNCTION post lcreq", result);
                           displayMessage(result);
                       }
                   );
});					  
                  }
                   else{
                      console.log("inside else",result.data[0].lcRequestNumber);
                      $scope.isError=true;
                      console.log("validation error else",result);
                      $scope.validationErrors = result.data;                      
                      console.log("INSIDE SUCCESS FUNCTION", result.data.DATA);
                      $location.path("/lcRequest");                      
			} },  
                  function (result) {
                      // failure callback
                      console.log("INSIDE ERROR FUNCTION");
                      //displayMessage(result);
                  }
              );
              console.log("LC validated and the object is  ", validateReqLoc);
				   //creation code

               }
           };

		   
		   
		   //Kumar Documents starts here
		   
           $scope.documentUpload = function () { 
	                console.log("coming inside to documentUpload");
                    var files = document.getElementById('file').files;
  	                console.log("documentUpload files files", files[0]);
				if(files[0].size<5242880)
				{
                    if (files.length > 0) {
						$scope.getBase64(files[0]);	
						//alert("File successfully processed");
                    }
				}
				else{
					alert("Maximum allowed file size is 5MB only");
				}
           };
		   
		   $scope.getBase64 = function (file) {
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function () {
					console.log("request controller reader.result", reader.result);
					console.log("$scope.documentTypeToAdd", ((reader.result).split(';')[0]).split(':')[1]);

					//mysql
					//Start for file upload to mysql

					if (((reader.result).split(';')[0]).split(':')[1] != "")
					{
						const tempType = ((reader.result).split(';')[0]).split(':')[1];
						if(tempType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || tempType == "image/png" || tempType == "application/msword" || tempType == "image/jpeg" || tempType == "application/pdf")
						{
							console.log("$scope.documentTypeToAdd if case");
							$scope.documentToAdd =  (reader.result).split(',')[1];
							$scope.documentTypeToAdd =  ((reader.result).split(';')[0]).split(':')[1];
							console.log("$scope.documentTypeToAdd $scope.documentTypeToAdd if case", $scope.documentTypeToAdd);
							alert("File successfully processed");
						}
						else{
							$scope.documentToAdd =  "";
							$scope.documentTypeToAdd =  "";
							console.log("$scope.documentTypeToAdd $scope.documentTypeToAdd else case", $scope.documentTypeToAdd);
							alert("Please upload only PDF, DOCX, DOC, PNG, JPEG/JPG file formats");
						}
					}
					console.log("request controller $scope.documentToAdd", $scope.documentToAdd);
					console.log("request controller $scope.documentTypeToAdd", $scope.documentTypeToAdd);
					
               /*     const imageDetail = {
                       ID: $scope.lcForm.LcRequestNumber,
                       IMAGE: (reader.result).split(',')[1],
					   content: (reader.result).split(',')[1],
		               docType: ((reader.result).split(';')[0]).split(':')[1],
                    };
                   console.log("imageDetail>", imageDetail);
				   
				   
                   const createLCEndpoint = apiBaseURL + "/documentTableUpdate";
                   $http.post(createLCEndpoint, angular.toJson(imageDetail)).then(
                       function (result) {
                           // success callback
                            console.log("INSIDE SUCCESS FUNCTION documentTableUpdate");
							
							//Working code to retrieve and download the image from mysql
	/*					    $http.get(apiBaseURL + "/documentTableQuery/" + ival).then(function (response) {
							console.log("response.data[0].ID",response.data[0].ID);
							console.log("response.data[0].content",response.data[0].content);
							console.log("response.data[0].IMAGE",response.data[0].IMAGE);
					
							var blob = $scope.b64toBlob(response.data[0].IMAGE, response.data[0].docType);
							var blobUrl = URL.createObjectURL(blob);
						     $scope.downloadURL = blobUrl;
							$scope.downloads;
							console.log("blobUrl",blobUrl);
								
							function addLink(linkAddress){	
								console.log("linkAddress",linkAddress);
								var obj = {
									link: linkAddress,
									name: 'test '
								};
								$scope.downloads = linkAddress;
							}
							addLink(blobUrl);

							var img = document.createElement('img');
							img.src = blobUrl;
							document.body.appendChild(img);

							//For download purpose

							var a = document.createElement('a');
							var filename = "image_Blockchain.jpeg"
							a.style = "display: none";  
							//var blob = new Blob(data, {type: "application/octet-stream"});
							var url = window.URL.createObjectURL(blob);
							a.href = url;
							a.download = filename;
							document.body.appendChild(a);
							a.click();
							document.body.removeChild(a);
							window.URL.revokeObjectURL(url);  
							setTimeout(function(){
								document.body.removeChild(a);
								window.URL.revokeObjectURL(url);  
							}, 100);  	

						});
						   
                        //   $location.path("/customerHome");
                        //displayMessage(result);
                       },  
                       function (result) {
							// failure callback
							console.log("INSIDE ERROR FUNCTION documentTableUpdate", result);
							//   displayMessage(result);
                       }
                   );*/

//mysql	
 //End for file upload to mysql  

				    var base64 = btoa($scope.uint8ToString(reader.result));
				 
					const imageObj = {
						docID :"D1",
						docType :"img",
						docContent :reader.result,
						lcId :"LC-1234"
					};
					
					const openLCEndpoint = apiBaseURL + "/image-store";
					console.log("URL in Open ", openLCEndpoint);
					console.log(imageObj);
						
					/* $http.post(openLCEndpoint, angular.toJson(imageObj)).then(
						function (result) {
							console.log("INSIDE SUCCESS FUNCTION", imageObj);
							//$location.path("/employeeHome");
							//displayMessage(result);
						},  
						function (result) {
							// failure callback
							console.log("INSIDE ERROR FUNCTION");
							displayMessage(result);
						}
					); */
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}











$scope.uint8ToString = function (buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
};












$scope.b64toBlob = function (b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});

  return blob;
};

		   
		   
		   
		 		   //Kumar Documents ends here  
		   
		   
		   
		   
		   
		   
		   
		   
		   
           displayMessage = (message) => {
               const modalInstanceTwo = $uibModal.open({
                   templateUrl: 'messageContent.html',
                   controller: 'messageCtrl',
                   controllerAs: 'modalInstanceTwo',
                   resolve: {
                       message: () => message
                   }
               });

               modalInstanceTwo.result.then(() => {}, () => {});
           };
           $scope.back = () => {
               shareidCustomer.tab = 1;
               console.log("tab in request controller",shareidCustomer.tab);
               $location.path("/customerHome");
           }

           function invalidFormInput() {
               const invalidNonItemFields = !$scope.lcForm.lcReqNo
               //            || isNaN(modalInstance.form.orderNumber)
               //            || !modalInstance.form.deliveryDate
               //            || !modalInstance.form.city
               //            || !modalInstance.form.country;
               //
               //        const inValidCounterparty = modalInstance.form.counterparty === undefined;
               //
               //        const invalidItemFields = modalInstance.items
               //            .map(item => !item.name || !item.amount || isNaN(item.amount))
               //            .reduce((prev, curr) => prev && curr);

               return invalidNonItemFields;
           }
       } else {
           $location.path("/customer");
       }

   });
   app.controller('messageCtrl', function ($uibModalInstance, message) {
       const modalInstanceTwo = this;
       modalInstanceTwo.message = message.data;
       console.log("message inside messageCtrl  ", modalInstanceTwo.message);
   });


   // //directive for tabbed request page starts//////////////////////////////////////
   app.directive('tabHighlight', [function () {
       return {
           restrict: 'A',
           link: function (scope, element) {
               var x, y, initial_background = 'black';

               element
                   .removeAttr('style')
                   .mousemove(function (e) {
                       // Add highlight effect on inactive tabs
                       if (!element.hasClass('active')) {
                           x = e.pageX - this.offsetLeft;
                           y = e.pageY - this.offsetTop;

                           element


                       }
                   })

           }
       };
   }]);
   // //directive for tabbed request page ends////////////////////////////////////////
