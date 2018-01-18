app.controller('lcAmendReqViewController', function ($scope, $interval, $rootScope, $http, $location, $cookies, $filter, $window, $cookieStore, rootValues, shareidCustomer, shareid, shareidCustomer) {

   /*     $scope.getAttachedFiles = function (b64Data, contentType, sliceSize) {
			$scope.convertToImage($scope.documentsReceived, $scope.documentTypeReceived,"");
			console.log($scope.documentsReceived, $scope.documentTypeReceived,"inside getAttachedFiles");
			
		};
		
        $scope.convertToBlob = function (b64Data, contentType, sliceSize) {
				//function b64toBlob(b64Data, contentType, sliceSize) {
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
		
		$scope.convertToImage = function (b64Data, contentType, sliceSize) {
			var blob = $scope.convertToBlob(b64Data, contentType, sliceSize);
			//To download the image
			var a = document.createElement('a');
			var docExtension = contentType.split('/')[1];
			var filename = "Document_Blockchain."+docExtension;
			a.style = "display: none";
			var url = window.URL.createObjectURL(blob);
			a.href = url;
			console.log("url",url);
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);  
			setTimeout(function(){
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);  
			}, 100);
		};*/
		
    var tick = function () {
       // $scope.getUploads();
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);

    $scope.CurrentDate = new Date();
    const nodePort = $location.port();
    if ($cookieStore.get('customer')) {
        $scope.username = $cookieStore.get('customer');
    } else {
        $scope.username = $cookieStore.get('employee');
    }

    const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";

    console.log("lcAmendRequestNumber", shareidCustomer.lcAmendRequestNumber, "shareid.lcAmendRequestNumber  ", shareid.lcAmendRequestNumber);
    if ($cookieStore.get('customer')) {
        $scope.lcAmendRequestNumber = shareidCustomer.lcAmendRequestNumber;
    } else {
        $scope.lcAmendRequestNumber = shareid.lcAmendRequestNumber;
    }

    $scope.validateNode = function () {
        if ($cookieStore.get('customer')) {

            shareidCustomer.tab = 0;
            $scope.link = '#customerHome';
            $location.path("/customerHome");
        } else {
            shareid.tab = 0;
            $scope.link = '#employeeHome';
            $location.path("/employeeHome");
        }
    };

    $scope.lcViewBack = function () {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 1;
            $location.path("/customerHome");
        } else {
            shareid.tab = 1;
            $location.path("/employeeHome");
        }
    };

    $scope.lcAmendViewForm = {};
    $scope.formError = false;
    $http.get(apiBaseURL + "/lcamendreq/" + $scope.lcAmendRequestNumber).then(function (response) {
        var request = response.data[0];
        console.log("request.request", request);
		console.log("request.request.lcAmendExpiryDate", request.lcAmendExpiryDate, $filter('date')(new Date(request.lcAmendExpiryDate), "MM/dd/yyyy", "IST"));
/*
        var applicantid = request.Applicant;
        $http.get(apiBaseURL + "/customer/detail/custID/" + applicantid).then(function (response) {
            var requestcust = response.data[0];

            $scope.lcAmendViewForm.ApplicantID_t1 = requestcust.name;
        });
        $scope.lcAmendViewForm.mT700_1_51aADApplicantBank_1 = request.ApplicantBank;

        var beneficaryid = request.Beneficiary;

        $http.get(apiBaseURL + "/customer/detail/custID/" + beneficaryid).then(function (response) {
            var requestcust = response.data[0];

            $scope.lcAmendViewForm.BeneficiaryID_t2 = requestcust.name;
            //$scope.lcAmendViewForm.ApplicantID_t1=requestcust.name;
        });

        $scope.lcAmendViewForm.BeneficiaryBank_t2 = request.BeneficiaryBank;
        $scope.lcAmendViewForm.ChargesFrom_t3 = request.ChargesFrom;
        //$scope.lcAmendViewForm.=request.FileReference;
        $scope.lcAmendViewForm.ImportSightPmtLCType_t1 = request.ImportSightPmtLCType;
        $scope.lcAmendViewForm.LCAmount_t1 = request.LCAmount;
        $scope.lcAmendViewForm.LCCurrency_t1 = request.LCCurrency;
        $scope.lcAmendViewForm.LCExpiryDate_t1 = $filter('date')(new Date(request.LCExpiryDate), "MM/dd/yyyy", "IST");
        $scope.lcAmendViewForm.LCExpiryPlace_t1 = request.LCExpiryPlace;
        $scope.lcAmendViewForm.LCIssueDate_t1 = $filter('date')(request.LCIssueDate, "MM/dd/yyyy", "IST");
        $scope.lcAmendViewForm.LcRequestNumber = request.lcRequestNumber;
        console.log("lcrequests", request.LCExpiryDate);
			$scope.documentsReceived = request.documents;
			$scope.documentTypeReceived = request.documentType;*/
			
        $scope.lcAmendViewForm.newLcRequestNumber = request.lcAmendReqId;
        $scope.lcAmendViewForm.newLCAmount_t1 = request.lcAmendAmount;
		$scope.lcAmendViewForm.newLCExpiryDate_t1 = $filter('date')(new Date(request.lcAmendExpiryDate), "MM/dd/yyyy", "IST");
		//$scope.lcAmendViewForm.newLCExpiryDate_t1 = "12/12/2017";
        $scope.lcAmendViewForm.newLCExpiryPlace_t1 = request.lcAmendExpiryPlace;
		$scope.lcAmendViewForm.newLcNumberOfAmendments = request.numberOfAmendment;
		$scope.lcAmendViewForm.newLcNumber = request.lcAmendId;
		$scope.lcAmendViewForm.newAmendmentDetails = request.amendmentDetails;
			
    });
	
	$scope.back = () => {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 2;

            $location.path("/customerHome");
        } else {
            shareid.tab = 2;
            $location.path("/employeeHome");
        }
    }


});