   app.controller('bgRequestViewController', function($filter,$http,$uibModal, $location,$rootScope, $scope,$cookies,$cookieStore,shareidCustomer,shareid) {
	   
              $scope.message = 'View Bank Guarantee';
              const nodePort = $location.port();
              const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
              //const apiBaseURL = $rootScope.apiBaseURL;
                console.log("apiBase",apiBaseURL);
              
              
                $scope.node=shareidCustomer.thisNode;
				$scope.logout = function(){
					$cookieStore.remove('customer');
					$location.path("/customer");
				};

                //$scope.username = $cookieStore.get('customer');
				
				if ($cookieStore.get('customer')) {
					$scope.username = $cookieStore.get('customer');
				} else {
					$scope.username = $cookieStore.get('employee');
				}
          
				if ($cookieStore.get('customer')) {
					$scope.bgReqID = shareidCustomer.bgReqID;
				} else {
					$scope.bgReqID = shareid.bgReqID;
				}
		  //end							  
							  
	$scope.bgViewBack = function () {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 3;
            $location.path("/customerHome");
        } else {
            shareid.tab = 3;
            $location.path("/employeeHome");
        }
    };	
	
	$scope.bgViewForm = {};
    $scope.formError = false;						

	 $http.get(apiBaseURL + "/bg-req/" + $scope.bgReqID).then(function (response) {
        var res = response.data[0];		
        console.log("res", res); 
		
        $scope.bgViewForm.BgRequestNumber = res.bgReqID;
        $scope.bgViewForm.issuedOnBehalfOf = res.issuedOnBehalfOf;
        $scope.bgViewForm.bgCurrency = res.currency;        
        $scope.bgViewForm.amount = res.amount;
       // $scope.bgViewForm.dealDate = $filter('date')(new Date(res.dealDate), "MM/dd/yyyy", "IST");
        $scope.bgViewForm.startDate = $filter('date')(new Date(res.startDate), "MM/dd/yyyy", "IST");
        $scope.bgViewForm.expiryDate = $filter('date')(new Date(res.expiryDate), "MM/dd/yyyy", "IST");
        $scope.bgViewForm.maturityDate = $filter('date')(res.maturityDate, "MM/dd/yyyy", "IST");
        $scope.bgViewForm.beneficiaryBank = res.beneficiaryBank;
        $scope.bgViewForm.BeneficiaryID = res.beneficiary;
		$scope.bgViewForm.termsAndConditions = res.termsAndConditions;
        
			
			
		

    });
	
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
 
