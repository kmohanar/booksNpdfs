   app.controller('bgRequestController', function($http,$filter,$uibModal, $location,$rootScope, $scope,$cookies,$cookieStore,shareidCustomer,shareid) {
         if($cookieStore.get('customer')){
              $scope.message = 'Request Bank Guarantee';
              const nodePort = $location.port();
              const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
              //const apiBaseURL = $rootScope.apiBaseURL;
                console.log("apiBase",apiBaseURL);
                $http.get(apiBaseURL + "/lcRequestID").then(function(response){
                      $scope.BGRequestID = response.data;
                      const requestID = "BG-REQ-"+$scope.BGRequestID;
                      $scope.bgForm.BgRequestNumber  = requestID; 
                 });
              
                $scope.node=shareidCustomer.thisNode;
				$scope.logout = function(){
					$cookieStore.remove('customer');
					$location.path("/customer");
				};

                $scope.username = $cookieStore.get('customer');
                $http.get(apiBaseURL + "/customer/detail/id/"+ $scope.username).then(function(response){
					
                    console.log("response",response,response.data[0].bank);				    
				    $scope.bgForm.issuedOnBehalfOf  = response.data[0].name;				    
				    $scope.bgForm.beneficiaryBank = response.data[0].bank;	
					$scope.applicant = response.data[0].customerid;
				 });
  
              
              $scope.bgForm = {};
              $scope.formError = false;
              $scope.isCollapsed = true;              
              
              $scope.bgCurrency = ['USD','GBP','EUR','CHF'];
			  
			//$scope.dealDate = new Date();
			//console.log("$scope.bgForm.dealDate",$filter('date')($scope.bgForm.dealDate,  "MM/dd/yyyy",  "IST"));
			$scope.startDate = new Date();
			$scope.expiryDate = new Date();
			$scope.maturityDate = new Date();
                        
              //end
	
				$scope.bgAmountcheck = () =>  {
					  console.log("BG AMOUNT",$scope.bgForm.amount);
					  var value = $scope.bgForm.amount;
					
					  var Amtval = value.split(/^([-+]?[0-9]*\.?[0-9]+)([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ])$/);
					  console.log("AMT VAL  ",Amtval);

					  if(Amtval[2].toLowerCase()=='m'|| Amtval[2].toLowerCase()=='h'|| Amtval[2].toLowerCase()=='t'){

					  if(Amtval[2].toLowerCase()== "m"){
					  $scope.bgForm.amount = Amtval[1]*1000000;
					  }
					  else if(Amtval[2].toLowerCase()== "h")
					  {
					  $scope.bgForm.amount = Amtval[1]*100;
					  }
					  else if(Amtval[2].toLowerCase()== "t")
					  {
					  $scope.bgForm.amount = Amtval[1]*1000;
					  }
					  else {
					  $scope.bgForm.amount = $scope.bgForm.amount;
					  }
					  }
					  else{
					  console.log("inside check else");
					  $scope.bgForm.amount = "";

					  }
                }
				
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
				});
				
				
				/* $scope.bgCreate = () => {
					if (invalidFormInput()) {
						formError = true;
					} else {
						//writing validate code
						const validateReqBg = {				  
							bgRequestNumber: $scope.bgForm.BgRequestNumber,                  
							expiryDate: $filter('date')($scope.bgForm.expiryDate,"MM/dd/yyyy",  "IST")                 
						};
              
					const validateBGEndpoint = apiBaseURL + "/bg-validate";
					console.log("URL in validation ", validateBGEndpoint);
					console.log(validateReqBg);
					
					$http.post(validateBGEndpoint, angular.toJson(validateReqBg)).then(function (	result) {
						if(result.data[0].BgRequestNumber){
						console.log("inside if",result.data[0].BgRequestNumber);
						$scope.isError=false;
						console.log("iserror", $scope.isError);
						console.log("error",result.data);  
						formError = false;
						
						$http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
							console.log('respp', response.data[0]);
							const bg = {
								bgReqID: $scope.bgForm.BgRequestNumber,
								issuedOnBehalfOf: $scope.bgForm.issuedOnBehalfOf,
								currency: $scope.bgForm.bgCurrency,
							    amount: $scope.bgForm.amount,
							    dealDate: $scope.bgForm.dealDate,
							    startDate: $scope.bgForm.startDate,
							    expiryDate: $scope.bgForm.expiryDate,
							    maturityDate: $scope.bgForm.maturityDate,
							    beneficiaryBank: $scope.bgForm.beneficiaryBank,
							    beneficiary: $scope.bgForm.BeneficiaryID,
							    status: "Requested"			    
								
							};

							console.log("bg from request page>", bg);

                   const createBGEndpoint = apiBaseURL + "/bg-req";
                   $http.post(createBGEndpoint, angular.toJson(bg)).then(
                       function (result) {
                           // success callback
                           console.log("INSIDE SUCCESS FUNCTION");
                           shareidCustomer.tab = 1;
                           $location.path("/customerHome");
                           displayMessage(result);
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
              console.log("BG validated and the object is  ", validateReqLoc);
				   //creation code

               //}
           }; */
		   
		$scope.bgRequestValidate = () => {			  
              const validateReqBg = {				  
                  bgReqId: $scope.bgForm.BgRequestNumber,                  
                  startDate_t1: $filter('date')($scope.startDate,  "MM/dd/yyyy",  "IST"),
				  expiryDate_t1: $filter('date')($scope.expiryDate,"MM/dd/yyyy",  "IST"),     
                  maturityDate_t1: $filter('date')($scope.maturityDate,"MM/dd/yyyy",  "IST")                 
              };
			  console.log("validateReqBg",validateReqBg);
              const validateBGEndpoint = apiBaseURL + "/bg-validate";
              console.log("URL in validation ", validateBGEndpoint);
              console.log(validateReqBg);
              $http.post(validateBGEndpoint, angular.toJson(validateReqBg)).then(
                  function (result) {
					  console.log("result in bg validation method",result);
			if(result.data[0].bgReqId){
                      console.log("in side if",result.data[0].bgReqId);
                      $scope.isError=false;
                      console.log("iserror", $scope.isError);
                      console.log("error",result.data);                    
                  }
                   else{
                      console.log("in side else",result.data[0].bgReqId);
                      $scope.isError=true;
                      console.log("validation error else",result);
                      $scope.validationErrors = result.data;                      
                      console.log("INSIDE SUCCESS FUNCTION", result.data.DATA);
                      $location.path("/bgRequest");                      
			} },  
                  function (result) {
                      // failure callback
                      console.log("INSIDE ERROR FUNCTION");
                      displayMessage(result);
                  }
              );
              console.log("BG validated and the object is 1234 ", validateReqBg);
          }   
		
		$scope.bgBack = function () {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 3;
            $location.path("/customerHome");
        } else {
            shareid.tab = 3;
            $location.path("/employeeHome");
        }
    };	
		   
		    
		   
		    $scope.bgCreate = () => {
                                  /* if (invalidFormInput()) {
									  console.log("inside form error");
                                      formError = true;
                                  } else { */
                                  const validateReqBg = {				  
                  bgReqId: $scope.bgForm.BgRequestNumber,                  
                  startDate_t1: $filter('date')($scope.startDate,  "MM/dd/yyyy",  "IST"),
				  expiryDate_t1: $filter('date')($scope.expiryDate,"MM/dd/yyyy",  "IST"),     
                  maturityDate_t1: $filter('date')($scope.maturityDate,"MM/dd/yyyy",  "IST")                 
              };    //formError = false;
									
                               
							   const validateBGEndpoint = apiBaseURL + "/bg-validate";
              console.log("URL in validation ", validateBGEndpoint);
              console.log(validateReqBg);
              $http.post(validateBGEndpoint, angular.toJson(validateReqBg)).then(
                  function (result) {
					  console.log("result in bg validation method",result);
			if(result.data[0].bgReqId){
                      console.log("in side if",result.data[0].bgReqId);
                      $scope.isError=false;
                      console.log("iserror", $scope.isError);
                      console.log("error",result.data); 

						const bog = {
										bgReqID: $scope.bgForm.BgRequestNumber,
										issuedOnBehalfOf: $scope.applicant,
										currency: $scope.bgForm.bgCurrency,
										amount: $scope.bgForm.amount,
										//dealDate: $scope.dealDate,
										startDate: $scope.startDate,
										expiryDate: $scope.expiryDate,
										maturityDate: $scope.maturityDate,
										beneficiaryBank: $scope.bgForm.beneficiaryBank,
										beneficiary: $scope.bgForm.BeneficiaryID,
										termsAndConditions: $scope.bgForm.termsAndConditions,
										status: "Requested"			    
								
									};
                               console.log("bog  >",bog);
                               
                               const createBGEndpoint =apiBaseURL+"/bg-req";
                         
						 $http.post(createBGEndpoint, angular.toJson(bog)).then(
                             function(result){
                              // success callback
                              console.log("INSIDE SUCCESS FUNCTION");
							  console.log("msg result",result);
							  shareidCustomer.tab=3;
                              $location.path("/customerHome");
                              displayMessage(result);
                              }, 
                              function(result){
                              // failure callback
                              console.log("INSIDE ERROR FUNCTION",result);
                              displayMessage(result);
                              }
                              );
					
                  }
                   else{
                      console.log("in side else",result.data[0].bgReqId);
                      $scope.isError=true;
                      console.log("validation error else",result);
                      $scope.validationErrors = result.data;                      
                      console.log("INSIDE SUCCESS FUNCTION", result.data.DATA);
                      $location.path("/bgRequest");                      
			} },  
                  function (result) {
                      // failure callback
                      console.log("INSIDE ERROR FUNCTION");
                      displayMessage(result);
                  }
              );
							   
							   
							   
                               
                          //}
                              };
									
              displayMessage = (message) => {
                                  const modalInstanceTwo = $uibModal.open({
                                      templateUrl: 'messageContent.html',
                                      controller: 'messageCtrl',
                                      controllerAs: 'modalInstanceTwo',
                                      resolve: { message: () => message }
                                  });

                                  modalInstanceTwo.result.then(() => {}, () => {});
                              };
							  
              $scope.cancel = () => {
				  shareidCustomer.tab=3;
                        $location.path("/customerHome");
                                     }
              function invalidFormInput() {
                                  const invalidNonItemFields = !$scope.bgForm.bgReqNo

                                  return invalidNonItemFields;
                              }
                              }
                              else{
                              $location.path("/customer");
                              }

                        });
  app.controller('messageCtrl', function ($uibModalInstance, message) {
       const modalInstanceTwo = this;
       modalInstanceTwo.message = message.data;
       console.log("message inside messageCtrl  ", modalInstanceTwo.message);
   });
