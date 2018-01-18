app.controller('bgAmendReqViewController', function($http, $location, $scope, $cookies,$cookieStore,shareidCustomer,shareid) {
   if($cookieStore.get('customer')){
	   console.log("INSIDE bgAmendReqViewController");
	                 $scope.message = 'bgAmendReqViewController';
                     $scope.node = shareidCustomer.thisNode;
                      $scope.username = $cookieStore.get('customer');

                      const nodePort = $location.port();
                      const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
					 
					 
					   console.log("AmendID ID ===>",shareidCustomer.bgAmendViewId,"  node is ",$scope.node," username is ",$scope.username);

					   $scope.logout = function(){
                         $cookieStore.remove('customer');
                         $location.path("/customer");
                             };
                         $scope.bgAmendReqViewForm = {};
                         $scope.formError = false;

                     const CusBGID = shareidCustomer.bgAmendViewId;
					 
                     const getObj = apiBaseURL + "/bgamendreq/"+CusBGID;					 
						console.log("CusBGID ", CusBGID);
					 

 $http.get(getObj).then(function(response){
  var finalAmendData = response.data;
		console.log("db data in amendAccept Controller ", finalAmendData[0]);		
		
		$scope.bgAmendReqViewForm.newBgNumber = finalAmendData[0].bgAmendId ;
		$scope.bgAmendReqViewForm.newBgRequestNumber = finalAmendData[0].bgAmendReqId ;
		$scope.bgAmendReqViewForm.newLCExpiryDate_t1 = finalAmendData[0].bgAmendExpiryDate ;
		$scope.bgAmendReqViewForm.newLCAmount_t1 = finalAmendData[0].bgAmendPrincipalAmount ;
		$scope.bgAmendReqViewForm.newLcNumberOfAmendments = finalAmendData[0].numberOfAmendment ;
		$scope.bgAmendReqViewForm.newtermsNconditions = finalAmendData[0].bgTermsAndConditions ;
	});
                      
                         $scope.back = () => {
							 shareidCustomer.tab=3;
                               $location.path("/customerHome");
                         }
                       
   } else if($cookieStore.get('employee')){
		 console.log("INSIDE bgAmendReqViewController");
	                 $scope.message = 'bgAmendReqViewController';
                     $scope.node = shareid.thisNode;
                      $scope.username = $cookieStore.get('employee');

                      const nodePort = $location.port();
                      const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
					 
					 
					   console.log("AmendID ID ===>",shareid.bgAmendViewId,"  node is ",$scope.node," username is ",$scope.username);

					   $scope.logout = function(){
                         $cookieStore.remove('employee');
                         $location.path("/employeeLogin");
                             };
                         $scope.bgAmendReqViewForm = {};
                         $scope.formError = false;

                     
					 const EmpBGID = shareid.bgAmendViewId;
					 const getObj = apiBaseURL + "/bgamendreq/"+EmpBGID;
										 
						console.log("EmpBGID ", EmpBGID);
					

 $http.get(getObj).then(function(response){
  var finalAmendData = response.data;
		console.log("db data in amendAccept Controller ", finalAmendData[0]);		
		
		$scope.bgAmendReqViewForm.newBgNumber = finalAmendData[0].bgAmendId ;
		$scope.bgAmendReqViewForm.newBgRequestNumber = finalAmendData[0].bgAmendReqId ;
		$scope.bgAmendReqViewForm.newLCExpiryDate_t1 = finalAmendData[0].bgAmendExpiryDate ;
		$scope.bgAmendReqViewForm.newLCAmount_t1 = finalAmendData[0].bgAmendPrincipalAmount ;
		$scope.bgAmendReqViewForm.newLcNumberOfAmendments = finalAmendData[0].numberOfAmendment ;
		$scope.bgAmendReqViewForm.newtermsNconditions = finalAmendData[0].bgTermsAndConditions ;
	});
                      
                         $scope.back = () => {
							 shareid.tab=3;
                               $location.path("/employeeHome");
                         }
		 }

		$scope.backToRequested = () => {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 3;

            $location.path("/customerHome");
        } else {
            shareid.tab = 3;
            $location.path("/employeeHome");
        }
    }
	
	$scope.backToOpened = () => {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 4;

            $location.path("/customerHome");
        } else {
            shareid.tab = 4;
            $location.path("/employeeHome");
        }
    }
		 
                   });


