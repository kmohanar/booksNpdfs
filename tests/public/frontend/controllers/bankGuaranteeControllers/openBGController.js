app.controller('openBGController', function ($http, $log, $uibModal, $location, $rootScope, $scope, $cookies, $cookieStore,$filter,shareid) {
	$scope.bgOpenForm = {};
	
	/* $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    }; */
	////////////////////////////////////////////////////////
	$scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        /* items: function () {
          return $scope.items;
        } */
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
	  $rootScope.selectedCommissionDate = selectedItem.CommissionDate;
	  console.log("$scope.selectedCommissionDate",$rootScope.selectedCommissionDate);
	  $scope.bgOpenForm.commFrequency_t3 = selectedItem.string; 
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  ///////////////////////////////////////////////////////
	
	
    console.log("inside openBg controller");
    if ($cookieStore.get('employee')) {
//tabbed request page starts////////////////////////////////////////////////////
$scope.tabs = [{
   title: 'Basic Details',
   url: 'one.tpl.html',
   test: 'lcRequestTab1.html'
}, {
   title: 'Charges',
   url: 'two.tpl.html'
}, {
   title: 'Commission',
   url: 'three.tpl.html'
}, {
   title: 'Cash Margin',
   url: 'four.tpl.html'
},
{
   title: 'Syndicated Lending',
   url: 'five.tpl.html'
},

{
   title: 'MT760',
   url: 'six.tpl.html'
}
];

$scope.currentTab = 'one.tpl.html';

$scope.onClickTab = function (tab) {
$scope.currentTab = tab.url;
}

$scope.isActiveTab = function (tabUrl) {
return tabUrl == $scope.currentTab;
}

//tabbed request page ends//////////////////////////////////////////////////////



        const nodePort = $location.port();
        const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";
        //const apiBaseURL = $rootScope.apiBaseURL;
        $http.get(apiBaseURL + "/lcRequestID").then(function (response) {
            console.log("response bg", response);
            $scope.newOpenID = "BG-" + response.data;
            console.log("bgRequestID in employee home page===>", $scope.newOpenID);
            shareid.bgOpenID=$scope.newOpenID;
           // console.log("shareid issue",shareid.bgOpenID);
           // $scope.bgOpenForm.bgNumber_t1=$scope.newOpenID;
        });
        $scope.test = shareid.ID;
        console.log("scope test", shareid.ID,shareid.bgOpenID);

        console.log("inside openBg controller2");


        //          $http.get(apiBaseURL + "lcRequestID").then(function(response){
        //                                                          $rootScope.BGRequestID = response.data.lcRequestID;
        //                                                          console.log($rootScope.BGRequestID);
        //                                                          });

        $scope.message = 'Open Bank Guarentees ';
        $scope.node = shareid.thisNode;
        $scope.username = $cookieStore.get('employee');
        console.log("OPENING ID ===>", shareid.ID, " node is ", $scope.node, " username is ", $scope.username);
        //                            const LCRequestId = $rootScope.lcRequestID;
        
        $scope.formError = false;
        $scope.logout = function () {
            $cookieStore.remove('employee');
            $location.path("/customer");
        };

       $http.get(apiBaseURL + "/account/allDetail/").then(function (response) {
   $scope.allAccountList = [];
   for (var j = 0; j < response.data.length; j++) {
       $scope.allAccountList.push(response.data[j].accno);
   };
   console.log('$scope.allAccountList', $scope.allAccountList);
});

        //const BGReqNumb =  $rootScope.bgOpenID;
        const BGReqNumb = shareid.bgOpenID;
        console.log("shared BGopen ID", BGReqNumb, shareid.bgOpenID);
        const getObj = apiBaseURL + "/bg-req/" + BGReqNumb;
        console.log("bg open object --->", getObj);
        $http.get(getObj).then(function (response) {
            var modelData = response.data;
            console.log("RESPONSE DATA%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ", modelData[0]);
            $scope.oldbgId = modelData[0].bgReqID;

            var dt = new Date(modelData[0].dealDate).toLocaleDateString();
            console.log("oldbgId", $scope.oldbgId);
            console.log("date", dt);
            console.log("date1", modelData[0].dealDate);
            //console.log("modelData[0].ibanNumbera",modelData[0].ibannumber);


//////////////////////////////////////////////////////////////////////////////////////////////

$scope.bgOpenForm.bgNumber_t1 = $scope.newOpenID;
$scope.bgOpenForm.bgReqId=modelData[0].bgReqID;
$scope.bgOpenForm.issuedOnBehalfOf_t1=modelData[0].issuedOnBehalfOf;
$scope.bgOpenForm.currency_t1=modelData[0].currency;
$scope.bgOpenForm.amount_t1=modelData[0].amount.toString();
//$scope.bgOpenForm.dealDate_t1=$filter('date')(modelData[0].dealDate,  "MM/dd/yyyy",  "IST");
$scope.bgOpenForm.startDate_t1=$filter('date')(modelData[0].startDate,  "MM/dd/yyyy",  "IST");
$scope.bgOpenForm.expiryDate_t1=$filter('date')(modelData[0].expiryDate,  "MM/dd/yyyy",  "IST");
$scope.bgOpenForm.maturityDate_t1=$filter('date')(modelData[0].maturityDate,  "MM/dd/yyyy",  "IST");
$scope.bgOpenForm.beneficiaryNoncust_1_t1=modelData[0].beneficiaryBank;
$scope.bgOpenForm.beneficiaryId_t1=modelData[0].beneficiary;
$scope.bgOpenForm.termsNconditions_1_t1=modelData[0].termsAndConditions;

//$scope.bgOpenForm.BgNumber_t1='';
//$scope.bgOpenForm.BgReqId='';
$scope.bgOpenForm.guaranteeRef_t1='';
//$scope.bgOpenForm.IssuedOnBehalfOf_t1='';
//$scope.bgOpenForm.Currency_t1='';
//$scope.bgOpenForm.DealDate_t1='';
//$scope.bgOpenForm.ExpiryDate_t1='';
//$scope.bgOpenForm.BeneficiaryId_t1='';
//$scope.bgOpenForm.BeneficiaryNoncust_1_t1='';
//$scope.bgOpenForm.TermsNconditions_1_t1='';
$scope.bgOpenForm.eventsProcessing_t1='ONLINE';
$scope.bgOpenForm.liquidationMode_t1='AUTOMATIC';
$scope.bgOpenForm.customersReference_t1='';
//$scope.bgOpenForm.Amount_t1='';
//$scope.bgOpenForm.StartDate_t1='';
//$scope.bgOpenForm.MaturityDate_t1='';
$scope.bgOpenForm.limitReference_t1='';
$scope.bgOpenForm.autoexpiry_t1='NO';
$scope.bgOpenForm.chargeDate_1_t2='';
$scope.bgOpenForm.chargeCurrency_1_t2='';
$scope.bgOpenForm.chargeDebitAccount_1_t2='';
$scope.bgOpenForm.chargeCode_1_1_t2='';
$scope.bgOpenForm.chargeAmount_1_1_t2='';
$scope.bgOpenForm.commissionPayType_t3='';
$scope.bgOpenForm.interestCalcBasis_t3='';
$scope.bgOpenForm.commrate_t3='';
$scope.bgOpenForm.commFrequency_t3='';
$scope.bgOpenForm.fixedAmount_t3='';
$scope.bgOpenForm.commissionClaimed_t3='';
$scope.bgOpenForm.commissionDate_1_t3='';
$scope.bgOpenForm.commDebitAcct_1_t3='';
$scope.bgOpenForm.rateChange_t3='';
$scope.bgOpenForm.newRate_t3='';
$scope.bgOpenForm.accrualPattern_t3='';
$scope.bgOpenForm.currentRate_t3='';
$scope.bgOpenForm.commSpread_t3='';
$scope.bgOpenForm.commissionAmount_1_t3='';
$scope.bgOpenForm.conversionRate_1_t3='';
$scope.bgOpenForm.returnCommission_t3='';
$scope.bgOpenForm.effectiveDate_t3='';
$scope.bgOpenForm.takeMargin_t4='';
$scope.bgOpenForm.marginPercent_t4='';
$scope.bgOpenForm.marginAmount_t4='';
$scope.bgOpenForm.marginReleaseDate_t4='';
$scope.bgOpenForm.marginDebitAcct_t4='';
$scope.bgOpenForm.provisionExchangeRate_t4='';
$scope.bgOpenForm.marginCreditAcct_t4='';
$scope.bgOpenForm.marginReleaseAcct_t4='';
$scope.bgOpenForm.slTrancheReference_t5='';
$scope.bgOpenForm.productType_t5='';
$scope.bgOpenForm.slLinkdate_t5='';
$scope.bgOpenForm.issuingBank_t5='';
$scope.bgOpenForm.participantId_1_t5='';
$scope.bgOpenForm.participationAmt_1_t5='';
$scope.bgOpenForm.netPrinAmt_t5='';
$scope.bgOpenForm.receivingBankId_t6='';
$scope.bgOpenForm.receivingBankAddress_1_t6='';
$scope.bgOpenForm.updateCorrBankLimit_t6='';
$scope.bgOpenForm.transactionReferenceNo20_t6='';
$scope.bgOpenForm.furtherIdentification23_t6='';
$scope.bgOpenForm.date30_t6='';
$scope.bgOpenForm.detailsOfGuarantee77c_1_t6='';
$scope.bgOpenForm.senderToReceiverInfo72_t6='';
$scope.bgOpenForm.applicableRule_t6='';
$scope.bgOpenForm.narrative_t6='';

//drop down values starts
//tab1
$scope.chargeCurrencies = ['USD','AED','AMD','ARS','AUD','AZN','CAD','CHF','EUR','GBP'];
//Comm/Chg Code and Short Description tab2

$scope.chargeCodes=['GTEEADVIS','GTEEISSAMD','GTEEISSUE','GTEEMAREG','GTEERECAMD'];

$scope.bgChargeCodeChanged = function (chargeCode) {
    $scope.bgOpenForm.chargeCurrency_1_t2 = $scope.bgOpenForm.currency_t1;
    console.log("julla>>>>>>>>>>>",$scope.bgOpenForm.chargeCurrency_1_t2 , $scope.bgOpenForm.currency_t1)

    $http.get(apiBaseURL + "/getCharges/" + chargeCode).then(function (response) {

        

        for (i = 0; i <= response.data.length; i++) {

            if (response.data[i].CURRENCY == $scope.bgOpenForm.currency_t1) {
                console.log("true true",response.data[i].CURRENCY,response.data[i].AMOUNT);
                $scope.bgOpenForm.chargeAmount_1_1_t2 = response.data[i].AMOUNT;
            }
            //else {
            //console.log("false",response.data[i].CURRENCY); }
            // $scope.chargeCurrency.push[response.data[i].CURRENCY];
        }

    })
};
$scope.bgCheckEmpty = function () {
    if ($scope.bgOpenForm.chargeAmount_1_1_t2 == "") {
        console.log("empty", $scope.bgOpenForm.chargeAmount_1_1_t2);
        $scope.bgOpenForm.chargeCurrency_1_t2 = '';
    } else {
        $scope.bgOpenForm.chargeCurrency_1_t2 = $scope.bgOpenForm.currency_t1;
    }
};

$scope.checkChanges=function(selectedCommissionType){
   // console.log("selected field!!!!!!!!!!!!!!!!",selectedCommissionType)
   
      if(selectedCommissionType=="END" ){
        $scope.bgOpenForm.fixedAmount_t3="NO";
        $scope.bgOpenForm.rateChange_t3="YES";
        $scope.bgOpenForm.returnCommission_t3="NO";
        var commissionMDt=$filter('date')($scope.bgOpenForm.commissionDate_1_t3, "MM/dd/yyyy",  "IST")
          if(commissionMDt != $scope.bgOpenForm.maturityDate_t1 || $scope.bgOpenForm.commrate_t3==""){
              console.log("commissionMDt",commissionMDt,"1", $scope.bgOpenForm.maturityDate_t1 ,"2", $scope.bgOpenForm.commrate_t3);
            $scope.Stl_comrate_t3="margin-bottom: 10px;border-color:blue;"
            
       alert("commission date should be same as maturity date");
       $scope.bgOpenForm.commissionDate_1_t3="";
       
    }
    }


     if(selectedCommissionType=="BEGIN" ){
        $scope.bgOpenForm.fixedAmount_t3="NO";
        $scope.bgOpenForm.rateChange_t3="YES";
        $scope.bgOpenForm.returnCommission_t3="NO";
        
         var commissionSDt=$filter('date')($scope.bgOpenForm.commissionDate_1_t3, "MM/dd/yyyy",  "IST")
    if(commissionSDt != $scope.bgOpenForm.startDate_t1 || $scope.bgOpenForm.commrate_t3=="" ){
        $scope.Stl_comrate_t3="margin-bottom: 10px;border-color:blue;"
       
       alert("commission date should be same as start date");
       $scope.bgOpenForm.commissionDate_1_t3="";
       }
     }

     if(selectedCommissionType==""){
        $scope.bgOpenForm.fixedAmount_t3="";
        $scope.bgOpenForm.rateChange_t3="";
        $scope.bgOpenForm.returnCommission_t3="";
         $scope.Stl_comrate_t3="margin-bottom: 10px;border-color:blue;"

     }
     
    
}


$scope.checkInput=function(){
    console.log("in checkinput>>><<<<>>><<<")
    if($scope.bgOpenForm.commrate_t3!=""){
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>--------------",$scope.Stl_comrate_t3)
        $scope.Stl_comrate_t3="margin-bottom: 10px;"
    }
}

$scope.checkDateChanges=function(){
    //console.log("selected field!!!!!!!!!!!!!!!!",selectedCommissionType)
    console.log("Print>>>>>>>",  $scope.bgOpenForm.commissionDate_1_t3,$scope.bgOpenForm.startDate_t1);
    var commissionSDt=$filter('date')($scope.bgOpenForm.commissionDate_1_t3, "MM/dd/yyyy",  "IST")
    if(commissionSDt != $scope.bgOpenForm.startDate_t1 ){
       alert("commission date should be same as start date");
       $scope.bgOpenForm.commissionDate_1_t3="";
       
    }

}
//tab3
$scope.interestCalcBasis=['A','A1','A2','A3','A4','B','C','C2','D','E','E1','F','F1','F2','G','H','S','W','W1'];


/*Id	Description	Prin adjust rtn	Include start date	Last day inclusive
BOTH	Both First and Last day accrual		YES	YES
FIRST	INTEREST ON FIRST DAY		YES	NO
INSURANCE	Insurance Amortisation		NO	YES
LAST	Last Day Accrual		NO	YES*/
//tab3
$scope.accrualPatterns=['BOTH','FIRST','INSURANCE','LAST'];
//tab6
//$scope.applicableRules['Ispr','None','Other','Urdg'];

$scope.commFrequencies=['20171231M0101','20171229M0101','20180131M0101']; 

//drop down values ends

$scope.bgOpenValidate = () => {
    console.log("inside validate button",$rootScope.selectedCommissionDate,$scope.bgOpenForm.commFrequency_t3);
	var commFrequency;
	if($scope.bgOpenForm.commFrequency_t3 == "" ){
		console.log("coming inside undefined");
		commFrequency = '';
	}else{
		commFrequency = $filter('date')($rootScope.selectedCommissionDate, "MM/dd/yyyy",  "IST");
	}
    const validateOpenBg = {
        bgReqId: $scope.bgOpenForm.bgReqId,
        //startDate_t1: $filter('date')($scope.startDate,  "MM/dd/yyyy",  "IST"),
        //startDate_t1: $filter('date')(modelData[0].startDate,  "MM/dd/yyyy",  "IST"),
        startDate_t1:  $filter('date')(modelData[0].startDate,  "MM/dd/yyyy",  "IST"),       
        expiryDate_t1: $filter('date')(modelData[0].expiryDate, "MM/dd/yyyy",  "IST"),
        maturityDate_t1: $filter('date')(modelData[0].maturityDate, "MM/dd/yyyy",  "IST"),
		commFrequency_t3: commFrequency,
    };
    console.log("validateBg", validateOpenBg);
    const validateBGEndpoint = apiBaseURL + "/bg-validate";
    console.log("URL in validation ", validateBGEndpoint);
    console.log(validateOpenBg);
    $http.post(validateBGEndpoint, angular.toJson(validateOpenBg)).then(
        function (result) {
            console.log("result in bg validation method", result);
            if (result.data[0].bgReqId) {
                console.log("in side if", result.data[0].bgReqId);
                $scope.isError = false;
                console.log("iserror", $scope.isError);
                console.log("error", result.data);
            } else {
                console.log("in side else", result.data[0].bgReqId);
                $scope.isError = true;
                console.log("validation error else", result);
                $scope.validationErrors = result.data;
                console.log("INSIDE SUCCESS FUNCTION", result.data.DATA);
                $location.path("/bgOpen");
            }
        },  
        function (result) {
            // failure callback
            console.log("INSIDE ERROR FUNCTION");
            displayMessage(result);
        }
    );
    console.log("BG validated and the object is 1234 ", validateOpenBg);
}


        


        $scope.Openbg = () => {
            
			///////////////////////////////////////////////////
            console.log("inside validate button",$rootScope.selectedCommissionDate,$scope.bgOpenForm.commFrequency_t3);
	var commFrequency;
	if($scope.bgOpenForm.commFrequency_t3 == "" ){
		console.log("coming inside undefined");
		commFrequency = '';
	}else{
		commFrequency = $filter('date')($rootScope.selectedCommissionDate, "MM/dd/yyyy",  "IST");
	}
    const validateOpenBg = {
        bgReqId: $scope.bgOpenForm.bgReqId,
        //startDate_t1: $filter('date')($scope.startDate,  "MM/dd/yyyy",  "IST"),
        //startDate_t1: $filter('date')(modelData[0].startDate,  "MM/dd/yyyy",  "IST"),
        startDate_t1:  $filter('date')(modelData[0].startDate,  "MM/dd/yyyy",  "IST"),       
        expiryDate_t1: $filter('date')(modelData[0].expiryDate, "MM/dd/yyyy",  "IST"),
        maturityDate_t1: $filter('date')(modelData[0].maturityDate, "MM/dd/yyyy",  "IST"),
		commFrequency_t3: commFrequency,
    };
    console.log("validateBg", validateOpenBg);
    const validateBGEndpoint = apiBaseURL + "/bg-validate";
    console.log("URL in validation ", validateBGEndpoint);
    console.log(validateOpenBg);
    $http.post(validateBGEndpoint, angular.toJson(validateOpenBg)).then(
        function (result) {
            console.log("result in bg validation method", result);
            if (result.data[0].bgReqId) {
                console.log("in side if", result.data[0].bgReqId);
                $scope.isError = false;
                console.log("iserror", $scope.isError);
                console.log("error", result.data);
				
				///open logic/////
				
				
            if($scope.bgOpenForm.chargeDate_1_t2 == ''){
                $scope.bgOpenForm.chargeDate_1_t2 = '';
            }else{
                $scope.bgOpenForm.chargeDate_1_t2= $filter('date')($scope.bgOpenForm.chargeDate_1_t2,  "MM/dd/yyyy",  "IST");
                console.log("$scope.bgOpenForm.chargeDate_1_t2",$scope.bgOpenForm.chargeDate_1_t2);
            }
           
           if($scope.bgOpenForm.commissionDate_1_t3 == ''){
                $scope.bgOpenForm.commissionDate_1_t3 = '';
            }else{
                $scope.bgOpenForm.commissionDate_1_t3= $filter('date')($scope.bgOpenForm.commissionDate_1_t3,  "MM/dd/yyyy",  "IST");
                console.log("$scope.bgOpenForm.commissionDate_1_t3",$scope.bgOpenForm.commissionDate_1_t3);
            }
            
           if($scope.bgOpenForm.commissionDate_1_t3 == ''){
                $scope.bgOpenForm.commissionDate_1_t3 = '';
            }else{
                $scope.bgOpenForm.commissionDate_1_t3= $filter('date')($scope.bgOpenForm.commissionDate_1_t3,  "MM/dd/yyyy",  "IST");
                console.log("$scope.bgOpenForm.commissionDate_1_t3",$scope.bgOpenForm.commissionDate_1_t3);
            }
            
            if($scope.bgOpenForm.slLinkdate_t5 == ''){
                $scope.bgOpenForm.slLinkdate_t5 = '';
            }else{
                $scope.bgOpenForm.slLinkdate_t5= $filter('date')($scope.bgOpenForm.slLinkdate_t5,  "MM/dd/yyyy",  "IST");
                console.log("$scope.bgOpenForm.slLinkdate_t5",$scope.bgOpenForm.slLinkdate_t5);
            }
            
            if($scope.bgOpenForm.date30_t6 == ''){
                $scope.bgOpenForm.date30_t6 = '';
            }else{
                $scope.bgOpenForm.date30_t6= $filter('date')($scope.bgOpenForm.date30_t6,  "MM/dd/yyyy",  "IST");
                console.log("$scope.bgOpenForm.date30_t6",$scope.bgOpenForm.date30_t6);
            }
            
            if($scope.bgOpenForm.marginReleaseDate_t4 == ''){
                $scope.bgOpenForm.marginReleaseDate_t4 = '';
            }else{
                $scope.bgOpenForm.marginReleaseDate_t4= $filter('date')($scope.bgOpenForm.marginReleaseDate_t4,  "MM/dd/yyyy",  "IST");
                console.log("$scope.bgOpenForm.marginReleaseDate_t4",$scope.bgOpenForm.marginReleaseDate_t4);
            }

            
          


            const openBG = {

               // bgId: $scope.bgOpenForm.bgID,
               // bgReqID: $scope.oldbgId,
               
               
                
               //  bgNumber_t1:$scope.bgOpenForm.bgNumber_t1,
               //  bgReqId:$scope.bgOpenForm.bgReqId,
                bgNumber_t1:$scope.bgOpenForm.bgNumber_t1,
                bgReqId:$scope.bgOpenForm.bgReqId,
                guaranteeRef_t1:$scope.bgOpenForm.guaranteeRef_t1,
                issuedOnBehalfOf_t1:$scope.bgOpenForm.issuedOnBehalfOf_t1,
                currency_t1:$scope.bgOpenForm.currency_t1,
                //dealDate_t1:$scope.bgOpenForm.dealDate_t1,
                expiryDate_t1:$scope.bgOpenForm.expiryDate_t1,
                beneficiaryId_t1:$scope.bgOpenForm.beneficiaryId_t1,
                beneficiaryNoncust_1_t1:$scope.bgOpenForm.beneficiaryNoncust_1_t1,
                termsNconditions_1_t1:$scope.bgOpenForm.termsNconditions_1_t1,
                eventsProcessing_t1:$scope.bgOpenForm.eventsProcessing_t1,
                liquidationMode_t1:$scope.bgOpenForm.liquidationMode_t1,
                customersReference_t1:$scope.bgOpenForm.customersReference_t1,
                amount_t1:$scope.bgOpenForm.amount_t1,
                startDate_t1:$scope.bgOpenForm.startDate_t1,
                maturityDate_t1:$scope.bgOpenForm.maturityDate_t1,
                limitReference_t1:$scope.bgOpenForm.limitReference_t1,
                autoexpiry_t1:$scope.bgOpenForm.autoexpiry_t1,

                chargeDate_1_t2:$scope.bgOpenForm.chargeDate_1_t2,
                chargeCurrency_1_t2:$scope.bgOpenForm.chargeCurrency_1_t2,
                chargeDebitAccount_1_t2:$scope.bgOpenForm.chargeDebitAccount_1_t2,
                chargeCode_1_1_t2:$scope.bgOpenForm.chargeCode_1_1_t2,
                chargeAmount_1_1_t2:$scope.bgOpenForm.chargeAmount_1_1_t2,

                commissionPayType_t3:$scope.bgOpenForm.commissionPayType_t3,
                interestCalcBasis_t3:$scope.bgOpenForm.interestCalcBasis_t3,
                commrate_t3:$scope.bgOpenForm.commrate_t3,
                commFrequency_t3:$scope.bgOpenForm.commFrequency_t3,
                fixedAmount_t3:$scope.bgOpenForm.fixedAmount_t3,
                commissionClaimed_t3:$scope.bgOpenForm.commissionClaimed_t3,
                commissionDate_1_t3:$scope.bgOpenForm.commissionDate_1_t3,
                commDebitAcct_1_t3:$scope.bgOpenForm.commDebitAcct_1_t3,
                rateChange_t3:$scope.bgOpenForm.rateChange_t3,
                newRate_t3:$scope.bgOpenForm.newRate_t3,
                accrualPattern_t3:$scope.bgOpenForm.accrualPattern_t3,
                currentRate_t3:$scope.bgOpenForm.currentRate_t3,
                commSpread_t3:$scope.bgOpenForm.commSpread_t3,
                commissionAmount_1_t3:$scope.bgOpenForm.commissionAmount_1_t3,
                conversionRate_1_t3:$scope.bgOpenForm.conversionRate_1_t3,
                returnCommission_t3:$scope.bgOpenForm.returnCommission_t3,
                effectiveDate_t3:$scope.bgOpenForm.effectiveDate_t3,

                takeMargin_t4:$scope.bgOpenForm.takeMargin_t4,
                marginPercent_t4:$scope.bgOpenForm.marginPercent_t4,
                marginAmount_t4:$scope.bgOpenForm.marginAmount_t4,
                marginReleaseDate_t4:$scope.bgOpenForm.marginReleaseDate_t4,
                marginDebitAcct_t4:$scope.bgOpenForm.marginDebitAcct_t4,
                provisionExchangeRate_t4:$scope.bgOpenForm.provisionExchangeRate_t4,
                marginCreditAcct_t4:$scope.bgOpenForm.marginCreditAcct_t4,
                marginReleaseAcct_t4:$scope.bgOpenForm.marginReleaseAcct_t4,

                slTrancheReference_t5:$scope.bgOpenForm.slTrancheReference_t5,
                productType_t5:$scope.bgOpenForm.productType_t5,
                slLinkdate_t5:$scope.bgOpenForm.slLinkdate_t5,
                issuingBank_t5:$scope.bgOpenForm.issuingBank_t5,
                participantId_1_t5:$scope.bgOpenForm.participantId_1_t5,
                participationAmt_1_t5:$scope.bgOpenForm.participationAmt_1_t5,
                netPrinAmt_t5:$scope.bgOpenForm.netPrinAmt_t5,

                receivingBankId_t6:$scope.bgOpenForm.receivingBankId_t6,
                receivingBankAddress_1_t6:$scope.bgOpenForm.receivingBankAddress_1_t6,
                updateCorrBankLimit_t6:$scope.bgOpenForm.updateCorrBankLimit_t6,
                transactionReferenceNo20_t6:$scope.bgOpenForm.guaranteeRef_t1,             //MAPPED TO GUARANTEE REFERENCE
                furtherIdentification23_t6:$scope.bgOpenForm.furtherIdentification23_t6,
                date30_t6:$scope.bgOpenForm.startDate_t1,                                  //MAPPED TO START DATE
                detailsOfGuarantee77c_1_t6:$scope.bgOpenForm.detailsOfGuarantee77c_1_t6,
                senderToReceiverInfo72_t6:$scope.bgOpenForm.senderToReceiverInfo72_t6,
                applicableRule_t6:$scope.bgOpenForm.applicableRule_t6,
                narrative_t6:$scope.bgOpenForm.narrative_t6,
                
                status: "ISSUED"

            };

            const openBGEndpoint =
                apiBaseURL + "/bg-open";

            /*$http.post(openLCEndpoint, angular.toJson(openLoc)).then(
                 (result) => displayMessage(result),
                 (result) => displayMessage(result)
             );*/
            console.log("openBG",openBG);
            $http.post(openBGEndpoint, angular.toJson(openBG)).then(
                function (result) {
                    console.log("result============>", result);
                    console.log("INSIDE SUCCESS FUNCTION", openBG);
                    shareid.tab = 4;
                    $location.path("/employeeHome");
                    displayMessage(result);
                },  
                function (result) {
                    // failure callback
                    console.log("INSIDE ERROR FUNCTION");
                    displayMessage(result);    
                }
                //(result) => displayMessage(result),
                //(result) => displayMessage(result)
            );
            //console.log("BG opened and the object is  ",openBG);
				
				
				
				////end
				
            } else {
                console.log("in side else", result.data[0].bgReqId);
                $scope.isError = true;
                console.log("validation error else", result);
                $scope.validationErrors = result.data;
                console.log("INSIDE SUCCESS FUNCTION", result.data.DATA);
                $location.path("/bgOpen");
            }
        },  
        function (result) {
            // failure callback
            console.log("INSIDE ERROR FUNCTION");
            displayMessage(result);
        }
    );
    console.log("BG validated and the object is 1234 ", validateOpenBg);
	
	////////////////////////////
            

        }
    });
        
        $scope.cancel = () => {
            shareid.tab = 4;
            $location.path("/employeeHome");
        }
		
		displayMessage = (message) => {
                                  const modalInstanceTwo = $uibModal.open({
                                      templateUrl: 'messageContent.html',
                                      controller: 'messageCtrl',
                                      controllerAs: 'modalInstanceTwo',
                                      resolve: { message: () => message }
                                  });

                                  modalInstanceTwo.result.then(() => {}, () => {});
                              };


    } else {
        $location.path("/employeeLogin");
    }

});

  
  app.controller('ModalInstanceCtrl', function ($scope,$filter, $uibModalInstance) {

  $scope.obj = {};
  //$scope.string = ''; 

  $scope.ok = function () {
	 console.log("coming inside ok");
	 
	 $scope.obj.CommissionDate = $scope.obj.commFrequency_t3;
	 $scope.obj.date = $filter('date')($scope.obj.commFrequency_t3,  "yyyyMMdd",  "IST");
	 
	 $scope.obj.radioButton = $scope.obj.freqOption_t3;
	 $scope.obj.radioDailyButton = $scope.obj.freqOptionOne_t3;
	 $scope.obj.radioWeeklyButton = $scope.obj.freqOptionTwo_t3;
	 $scope.obj.radioMonthlyButton = $scope.obj.freqOptionThree_t3;
	 $scope.obj.radioDefinedButton = $scope.obj.freqOptionFour_t3;
	 console.log("all avlues",$scope.obj.radioButton,$scope.obj.radioDailyButton,$scope.obj.radioWeeklyButton,$scope.obj.radioDefinedButton);
	 
	 if($scope.obj.radioButton == "DAILY"){
		 if($scope.obj.radioDailyButton == "DAILY"){
			$scope.obj.string = $scope.obj.date + "DAILY";
		 }else{
			 $scope.obj.string = $scope.obj.date + "BSNSS";
			 //20150422BSNSS
		 }
	 }else if($scope.obj.radioButton == "WEEKLY"){
		 $scope.obj.string = $scope.obj.date + "WEEk"+$scope.obj.freqOptionTwo_t3;
		//20150422WEEK2
	 }else if($scope.obj.radioButton == "MONTHLY"){
		 console.log("$scope.obj.radioMonthlyButton",$scope.obj.radioMonthlyButton)
		 if($scope.obj.radioMonthlyButton == "TWMTH"){
			$scope.obj.string = $scope.obj.date + "TWMTH";
			//twice mnth----20150422TWMTH
		 }else{
			 $scope.obj.string = $scope.obj.date + "M"+$scope.obj.freqOptionThree1_t3+$scope.obj.freqOptionThree2_t3;
			 //every---20150422M0304
			 //22 APR 2015
		 }
	 }else if($scope.obj.radioButton == "DEFINED"){
			$scope.obj.string = $scope.obj.date + ($scope.obj.freqOptionFour_t3).substring(0,5);		
	 }

		
	 
	 
    $uibModalInstance.close($scope.obj);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('messageCtrl', function ($uibModalInstance, message) {
       const modalInstanceTwo = this;
       modalInstanceTwo.message = message.data;
       console.log("message inside messageCtrl  ", modalInstanceTwo.message);
   });