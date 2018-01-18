  app.controller('bgAmendController', function($http,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore,$filter,rootValues,shareidCustomer,shareid) {
   if($cookieStore.get('customer')){
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
            title: 'CashMargin',
            url: 'four.tpl.html'
        },
        {
            title: 'SyndicatedLending',
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

					 var chainCodevalues;
                     $scope.message = 'Amend Bank of Guarantee ';
                     $scope.node = shareidCustomer.thisNode;
                      $scope.username = $cookieStore.get('customer');

                      const nodePort = $location.port();
                      const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
					 
					 
					   console.log("AmendID ID ===>",shareidCustomer.BgAmendID,"  node is ",$scope.node," username is ",$scope.username);

					   $scope.logout = function(){
                         $cookieStore.remove('customer');
                         $location.path("/customer");
                             };
                         $scope.bgAmendForm = {};
                         $scope.formError = false;


                    //const BGAmendRequestId = BGRequestID ;
					//console.log("BG REQUEST NUMBER IN BGAMEEND---->",BGRequestID);
                     //const getObj = apiBaseURL + "lc-orders";
                     const BGID = shareidCustomer.BgAmendID;
                     const getObj = apiBaseURL + "/api/GetBgById/"+BGID;
console.log("BGID ", BGID);

 $http.get(getObj).then(function(response){
                     var finalData = response.data.DATA;
					 $scope.finalData = finalData;
                     console.log("RESPONSE DATA in amend BG", finalData);  
					var pattern = /(\d{2})(\d{2})(\d{4})/;					 
					 $scope.bgAmendForm.guaranteeRef_t1 = finalData.guaranteeRef_t1 ;
                     $scope.bgAmendForm.bgNumber_t1 = finalData.bgNumber_t1;                   
				     $scope.bgAmendForm.issuedOnBehalfOf_t1 = finalData.issuedOnBehalfOf_t1 ;
					$scope.bgAmendForm.customersReference_t1 = finalData.customersReference_t1 ;
					$scope.bgAmendForm.currency_t1 = finalData.currency_t1 ;
					$scope.bgAmendForm.amount_t1 = finalData.amount_t1 ;					
					//$scope.bgAmendForm.dealDate_t1 = new Date((finalData.dealDate_t1).replace(pattern, '$1-$2-$3')) ;
					$scope.bgAmendForm.dealDate_t1 = finalData.dealDate_t1;
					$scope.bgAmendForm.startDate_t1 = finalData.startDate_t1 ;
					$scope.bgAmendForm.expiryDate_t1 = finalData.expiryDate_t1 ;
					$scope.bgAmendForm.maturityDate_t1 = finalData.maturityDate_t1 ;
					$scope.bgAmendForm.beneficiaryId_t1 = finalData.beneficiaryId_t1 ;
					$scope.bgAmendForm.limitReference_t1 = finalData.limitReference_t1 ;
					$scope.bgAmendForm.beneficiaryNoncust_1_t1 = finalData.beneficiaryNoncust_1_t1 ;
					$scope.bgAmendForm.termsNconditions_1_t1 = finalData.termsNconditions_1_t1 ;
					$scope.bgAmendForm.eventsProcessing_t1 = finalData.eventsProcessing_t1 ;			 
					$scope.bgAmendForm.autoexpiry_t1 = finalData.autoexpiry_t1 ;
					$scope.bgAmendForm.liquidationMode_t1 = finalData.liquidationMode_t1 ;
					$scope.bgAmendForm.chargeDate_1_t2 = finalData.chargeDate_1_t2 ;
					$scope.bgAmendForm.chargeCurrency_1_t2 = finalData.chargeCurrency_1_t2 ;
					$scope.bgAmendForm.chargeDebitAccount_1_t2 = finalData.chargeDebitAccount_1_t2 ;
					$scope.bgAmendForm.chargeCode_1_1_t2 = finalData.chargeCode_1_1_t2 ;
					$scope.bgAmendForm.chargeAmount_1_1_t2 = finalData.chargeAmount_1_1_t2 ;
					$scope.bgAmendForm.commissionPayType_t3 = finalData.commissionPayType_t3 ;
					$scope.bgAmendForm.accrualPattern_t3 = finalData.accrualPattern_t3 ;
					$scope.bgAmendForm.interestCalcBasis_t3 = finalData.interestCalcBasis_t3 ;
					$scope.bgAmendForm.currentRate_t3 = finalData.currentRate_t3 ; 
					$scope.bgAmendForm.commrate_t3 = finalData.commrate_t3 ;
					$scope.bgAmendForm.commSpread_t3 = finalData.commSpread_t3 ;
					$scope.bgAmendForm.commFrequency_t3 = finalData.commFrequency_t3 ;
					$scope.bgAmendForm.fixedAmount_t3 = finalData.fixedAmount_t3 ;
					$scope.bgAmendForm.commissionClaimed_t3 = finalData.commissionClaimed_t3 ;
					$scope.bgAmendForm.commissionDate_1_t3 = finalData.commissionDate_1_t3 ;
					$scope.bgAmendForm.commissionAmount_1_t3 = finalData.commissionAmount_1_t3 ;
					$scope.bgAmendForm.commDebitAcct_1_t3 = finalData.commDebitAcct_1_t3 ;
					$scope.bgAmendForm.conversionRate_1_t3 = finalData.conversionRate_1_t3 ;
					$scope.bgAmendForm.rateChange_t3 = finalData.rateChange_t3 ;
					$scope.bgAmendForm.returnCommission_t3 = finalData.returnCommission_t3 ;
					$scope.bgAmendForm.newRate_t3 = finalData.newRate_t3 ;
					$scope.bgAmendForm.effectiveDate_t3 = finalData.effectiveDate_t3 ;
					$scope.bgAmendForm.takeMargin_t4 = finalData.takeMargin_t4 ;
					$scope.bgAmendForm.marginPercent_t4 = finalData.marginPercent_t4 ;
					$scope.bgAmendForm.marginAmount_t4 = finalData.marginAmount_t4 ;
					$scope.bgAmendForm.marginReleaseDate_t4 = finalData.marginReleaseDate_t4 ;
					$scope.bgAmendForm.marginDebitAcct_t4 = finalData.marginDebitAcct_t4 ;
					$scope.bgAmendForm.provisionExchangeRate_t4 = finalData.provisionExchangeRate_t4 ;
					$scope.bgAmendForm.marginCreditAcct_t4 = finalData.marginCreditAcct_t4 ;
					$scope.bgAmendForm.marginReleaseAcct_t4 = finalData.marginReleaseAcct_t4 ;
					$scope.bgAmendForm.slTrancheReference_t5 = finalData.slTrancheReference_t5 ;
					$scope.bgAmendForm.productType_t5 = finalData.productType_t5 ;
					$scope.bgAmendForm.slLinkdate_t5 = finalData.slLinkdate_t5 ;
					$scope.bgAmendForm.issuingBank_t5 = finalData.issuingBank_t5 ;
					$scope.bgAmendForm.participantId_1_t5 = finalData.participantId_1_t5 ;
					$scope.bgAmendForm.participationAmt_1_t5 = finalData.participationAmt_1_t5 ;
					$scope.bgAmendForm.receivingBankId_t6 = finalData.receivingBankId_t6 ;
					$scope.bgAmendForm.receivingBankAddress_1_t6 = finalData.receivingBankAddress_1_t6 ;
					$scope.bgAmendForm.updateCorrBankLimit_t6 = finalData.updateCorrBankLimit_t6 ;
					$scope.bgAmendForm.transactionReferenceNo20_t6 = finalData.transactionReferenceNo20_t6 ;
					$scope.bgAmendForm.furtherIdentification23_t6 = finalData.furtherIdentification23_t6 ;
					$scope.bgAmendForm.date30_t6 = finalData.date30_t6 ;
					$scope.bgAmendForm.detailsOfGuarantee77c_1_t6 = finalData.detailsOfGuarantee77c_1_t6 ;
					$scope.bgAmendForm.senderToReceiverInfo72_t6 = finalData.senderToReceiverInfo72_t6 ;
					$scope.bgAmendForm.applicableRule_t6 = finalData.applicableRule_t6 ;
					$scope.bgAmendForm.narrative_t6 = finalData.narrative_t6 ;
					//START
					const numberOfAmendment=finalData.bgNumberOfAmendments+1;
					$scope.numberOfAmendment = numberOfAmendment;
                        $scope.bgamendrequestID = finalData.bgNumber_t1+"-00"+numberOfAmendment;
                        console.log("BG AMEND ID====>  "+$scope.bgamendrequestID);
					//END
					//AMENDMENT VALUES
					$scope.bgAmendForm.newBgNumber = finalData.bgNumber_t1 ;
					$scope.bgAmendForm.newBgRequestNumber = $scope.bgamendrequestID ;
					$scope.newLCExpiryDate_t1 = new Date(finalData.expiryDate_t1);
					//$filter('date')(new Date(finalData.expiryDate_t1),  "MM/dd/yyyy",  "IST");
					$scope.bgAmendForm.newLCAmount_t1 = finalData.amount_t1 ;
					$scope.bgAmendForm.newLcNumberOfAmendments = $scope.numberOfAmendment ;
					$scope.bgAmendForm.newtermsNconditions = finalData.termsNconditions_1_t1 ;
					
					
/*


                        $scope.bgAmendForm.dealDate = new Date((finalData[i].dealDate).replace(pattern, '$1-$2-$3'));

                        $scope.bgAmendForm.valueDate = new Date((finalData[i].valueDate).replace(pattern, '$1-$2-$3'));
                        $scope.bgAmendForm.expiryDate = new Date((finalData[i].expiryDate).replace(pattern, '$1-$2-$3'));
                        $scope.bgAmendForm.maturityDate =  new Date((finalData[i].maturityDate).replace(pattern, '$1-$2-$3'));
                        //$scope.bgAmendForm.bgissuedate =  finalData[i].maturityDate;
                        $scope.bgAmendForm.beneficiary = finalData[i].beneficiary;
                        $scope.bgAmendForm.beneficiaryAddress = finalData[i].beneficiaryAddress;
                        $scope.bgAmendForm.termsAndConditions = finalData[i].termsAndConditions;
                        $scope.bgAmendForm.bgmainnumberofamendment = finalData[i].BGMainNumberOfAmendment;
                        $scope.bgAmendForm.ibanNumber = finalData[i].ibanNumber;
                        $scope.bgAmendForm.details = finalData[i].detailsOfGuarantee1;
                        $scope.bgAmendForm.srInfo = finalData[i].senderToReceiverInformation;
                        $scope.bgAmendForm.applicableRule = finalData[i].applicableRule;
                        $scope.bgAmendForm.narrative = finalData[i].narrative;
                         $scope.bgAmendForm.furtherIdentification = finalData[i].furtherIdentification;*/
						 
                //New Changes:10-04-2017 :END

                       /* $scope.bgAmendAmountcheck = () =>  {
         console.log("LC AMOUNT",$scope.bgAmendForm.bgamendamount);
                        var value = $scope.bgAmendForm.bgamendamount;
                       
                        var Amtval = value.split(/^([-+]?[0-9]*\.?[0-9]+)([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ])$/);
                        console.log("AMT VAL  ",Amtval);

                        if(Amtval[2].toLowerCase()=='m'|| Amtval[2].toLowerCase()=='h'|| Amtval[2].toLowerCase()=='t'){

                        if(Amtval[2].toLowerCase()== "m"){
                        $scope.bgAmendForm.bgamendamount = Amtval[1]*1000000;
                        }
                        else if(Amtval[2].toLowerCase()== "h")
                        {
                        $scope.bgAmendForm.bgamendamount = Amtval[1]*100;
                        }
                        else if(Amtval[2].toLowerCase()== "t")
                        {
                        $scope.bgAmendForm.bgamendamount = Amtval[1]*1000;
                        }
                        else {
                        $scope.bgAmendForm.bgamendamount = $scope.bgAmendForm.bgamendamount;
                        }
                        }
                        else{
                        console.log("inside check else");
                        $scope.bgAmendForm.bgamendamount = "";

                        }
					}*/
                        //end here

                        
	});
                         console.log("Before scope");

                $scope.changebgamendfields= () => {
					var finalData = $scope.finalData;                  

                   $scope.oldvaluefromcorda = {
                                expirydate :$filter('date')(finalData.expiryDate_t1, "MM/dd/yyyy", "IST"),
								//new Date(finalData.expiryDate_t1),
								//$filter('date')(finalData.expiryDate_t1, "MM/dd/yyyy", "IST")
                                bgamount : finalData.amount_t1,
                                termsandconditions : finalData.termsNconditions_1_t1
                                   }
                 $scope.fieldvaluefromUI = {
                           bgAmendAmountfieldlevel: $scope.bgAmendForm.newLCAmount_t1,
                           bgAmendTermsAndConditionsfieldlevel : $scope.bgAmendForm.newtermsNconditions,
                           bgAmendExpiryDatefieldlevel : $filter('date')($scope.bgAmendForm.newLCExpiryDate_t1, "MM/dd/yyyy", "IST")
						   //new Date($scope.bgAmendForm.newLCExpiryDate_t1)
                        }
                    console.log("objects " ,$scope.oldvaluefromcorda , $scope.fieldvaluefromUI );

if(($scope.oldvaluefromcorda.expirydate == $scope.fieldvaluefromUI.bgAmendExpiryDatefieldlevel) && ($scope.oldvaluefromcorda.bgamount==$scope.fieldvaluefromUI.bgAmendAmountfieldlevel) && ($scope.oldvaluefromcorda.termsandconditions == $scope.fieldvaluefromUI.bgAmendTermsAndConditionsfieldlevel)){
console.log("inside if amend");

return false;
}
else {
console.log("inside else amend");
return true;
}        
  }
  
  
  $scope.bgAmendBack = function () {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 3;
            $location.path("/customerHome");
        } else {
            shareid.tab = 3;
            $location.path("/employeeHome");
        }
    };	

                     $scope.amendBG = () => {
							console.log("chainCodevalues===>>>",chainCodevalues);
                         const amendBG = {                            
							 bgNumber_t1 : $scope.bgAmendForm.newBgNumber,
                             bgAmendReqId: $scope.bgAmendForm.newBgRequestNumber,
                             amount_t1:$scope.bgAmendForm.newLCAmount_t1,
                             termsNconditions_1_t1: $scope.bgAmendForm.newtermsNconditions,
                             expiryDate_t1: new Date($scope.newLCExpiryDate_t1).toLocaleDateString(),
                             bgNumberOfAmendments: $scope.bgAmendForm.newLcNumberOfAmendments,
							 issuedOnBehalfOf_t1 : $scope.bgAmendForm.issuedOnBehalfOf_t1,
                             status : "AMEND REQUESTED"							 
             };

                                 //if($scope.bgAmendForm.amendbeneficiarybank == null){
                                                                      //alert("Advising Bank Ref Cannot Be Empty");
                                                                  //}
                                 //else{
                                 console.log("amendbg value---",amendBG);
                                     const amendBGEndpoint = apiBaseURL +"/bgamendreq";
                            
                                    $http.post(amendBGEndpoint, angular.toJson(amendBG)).then(
                                    function(result){
                                     // success callback
                                     console.log("INSIDE SUCCESS FUNCTION");
									 shareidCustomer.tab=3;
                                     $location.path("/customerHome");
                                     displayMessage(result);
                                     },
                                     function(result){
                                     // failure callback
                                     console.log("INSIDE ERROR FUNCTION");
                                     displayMessage(result);
                                        }
                                     );
                                 //}
                         }
                         $scope.cancel = () => {
							 shareidCustomer.tab=4;
                               $location.path("/customerHome");
                         }
                         displayMessage = (message) => {
                         console.log("message in display message--->",message);
                         $rootScope.messageStatus = message.status;
                                 const modalInstanceTwo = $uibModal.open({
                                     templateUrl: 'messageContent.html',
                                     controller: 'messageCtrl',
                                     controllerAs: 'modalInstanceTwo',
                                     resolve: { message: () => message }
                                 });
                                 modalInstanceTwo.result.then(() => {}, () => {});
                             };
                         function invalidFormInput() {
                        //     const invalidNonItemFields = !$scope.lcform.lcrequest
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

                        //     return invalidNonItemFields;
                         }
                        }
                                                 else{
                                                 $location.path("/customer");
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


