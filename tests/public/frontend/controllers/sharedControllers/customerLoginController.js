app.factory('shareCustomerDetails', function () {

		return {
            cusDet: ''
          };		  

        });

app.controller('customerLoginController', function($scope ,$rootScope,$http,$location,$cookies, $cookieStore,shareidCustomer,shareCustomerDetails) {
$scope.message = 'Customer login form';
			const nodePort = $location.port();
			const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
			$rootScope.apiBaseURL = apiBaseURL;
			
			$scope.userLogin = () =>{
                const emailid = $scope.emailid;

    $http.get(apiBaseURL + "/customer/" + emailid).then( function(response){
                                                                                                                                 // success callback
     console.log("INSIDE SUCCESS FUNCTION");
     const username = response.data;
           console.log("username of customer===>",response.data[0].name);
		   shareCustomerDetails.cusDet = response.data[0].customerid;
           console.log("id of customer===>",shareCustomerDetails.cusDets);
     
           $cookieStore.put('customer', response.data[0].name);
		   $cookieStore.put('customerID', response.data[0].customerid);
		   shareidCustomer.tab=0;
           $location.path("/customerHome");
       },
        function(response){
           $scope.errorMsg="Invalid Email / Password"
          console.log("INSIDE ERROR FUNCTION");

          })
                  }
 });
