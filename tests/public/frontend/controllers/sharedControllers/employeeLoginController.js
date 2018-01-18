app.controller('employeeLoginController', function($scope,$rootScope,$http,$location , $cookies, $cookieStore,shareid) {
 $scope.message = 'Employee login form';
           const nodePort = $location.port();
           const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
           $rootScope.apiBaseURL = apiBaseURL;
		   console.log("apiBaseURL===>",apiBaseURL);
		   
           $scope.employeeLogin = () =>{
            const emailid = $scope.emailid;
			
 $http.get(apiBaseURL + "/employee/" + emailid).then( function(response){
                                                                                                                                 // success callback
     console.log("INSIDE SUCCESS FUNCTION");
     const username = response.data;
           console.log("username of employee===>",response.data);
           $cookieStore.put('employee', response.data[0].name);
		   shareid.tab=0;
           $location.path("/employeeHome");
       },
        function(response){
          $scope.errorMsg="Invalid Email / Password"
          console.log("INSIDE ERROR FUNCTION");

          })

         }
})

