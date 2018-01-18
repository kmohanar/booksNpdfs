//=================================================================================================================================================================
//BG AMEND ACCEPT CONTROLLER START HERE
//=================================================================================================================================================================
//Amend start here
app.controller('bgAmendAcceptViewController', function($http,$uibModal,$filter, $location,$rootScope, $scope, $cookies,$cookieStore, shareid,$interval) {
	var tick = function () {
            $scope.clock = Date.now();
          }
          tick();
          $interval(tick, 1000);

          
		  
          $scope.CurrentDate = new Date();
  if($cookieStore.get('employee')){
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
                    $scope.message = 'Accept Amended Bank Guarantees';
                    $scope.node = shareid.thisNode;
                     $scope.username = $cookieStore.get('employee');
                 
                        $scope.logout = function(){
                        $cookieStore.remove('employee');
                        $location.path("/customer");
                            };
                        $scope.bgAmendAcceptViewForm = {};
                        $scope.formError = false;

                   $scope.NoOfAmendments = shareid.noOfAmendments;
                    const BGAmendReqNumb = shareid.bgAmendAcceptViewId;
					
console.log("NoOfAmendments===>",$scope.NoOfAmendments,"BGAmendReqNumb ==>",BGAmendReqNumb);
					const nodePort = $location.port();
                    const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
                    
                    const getObj = apiBaseURL + "/employee-bg-orders/"+BGAmendReqNumb;

                  

                    $http.get(getObj).then(function(response){
                    var finalData = response.data.DATA;
                    console.log("corda data in bgamendAcceptController ", finalData);
					$scope.bgAmendAcceptViewForm.guaranteeRef_t1 = finalData.guaranteeRef_t1 ;
                     $scope.bgAmendAcceptViewForm.bgNumber_t1 = finalData.bgNumber_t1;                   
				     $scope.bgAmendAcceptViewForm.issuedOnBehalfOf_t1 = finalData.issuedOnBehalfOf_t1 ;
					$scope.bgAmendAcceptViewForm.customersReference_t1 = finalData.customersReference_t1 ;
					$scope.bgAmendAcceptViewForm.currency_t1 = finalData.currency_t1 ;
										
					//$scope.bgAmendAcceptViewForm.dealDate_t1 = new Date((finalData.dealDate_t1).replace(pattern, '$1-$2-$3')) ;
					$scope.bgAmendAcceptViewForm.dealDate_t1 = finalData.dealDate_t1;
					$scope.bgAmendAcceptViewForm.startDate_t1 = finalData.startDate_t1 ;
					
					$scope.bgAmendAcceptViewForm.maturityDate_t1 = finalData.maturityDate_t1 ;
					$scope.bgAmendAcceptViewForm.beneficiaryId_t1 = finalData.beneficiaryId_t1 ;
					$scope.bgAmendAcceptViewForm.limitReference_t1 = finalData.limitReference_t1 ;
					$scope.bgAmendAcceptViewForm.beneficiaryNoncust_1_t1 = finalData.beneficiaryNoncust_1_t1 ;
					
					$scope.bgAmendAcceptViewForm.eventsProcessing_t1 = finalData.eventsProcessing_t1 ;			 
					$scope.bgAmendAcceptViewForm.autoexpiry_t1 = finalData.autoexpiry_t1 ;
					$scope.bgAmendAcceptViewForm.liquidationMode_t1 = finalData.liquidationMode_t1 ;
					$scope.bgAmendAcceptViewForm.chargeDate_1_t2 = finalData.chargeDate_1_t2 ;
					$scope.bgAmendAcceptViewForm.chargeCurrency_1_t2 = finalData.chargeCurrency_1_t2 ;
					$scope.bgAmendAcceptViewForm.chargeDebitAccount_1_t2 = finalData.chargeDebitAccount_1_t2 ;
					$scope.bgAmendAcceptViewForm.chargeCode_1_1_t2 = finalData.chargeCode_1_1_t2 ;
					$scope.bgAmendAcceptViewForm.chargeAmount_1_1_t2 = finalData.chargeAmount_1_1_t2 ;
					$scope.bgAmendAcceptViewForm.commissionPayType_t3 = finalData.commissionPayType_t3 ;
					$scope.bgAmendAcceptViewForm.accrualPattern_t3 = finalData.accrualPattern_t3 ;
					$scope.bgAmendAcceptViewForm.interestCalcBasis_t3 = finalData.interestCalcBasis_t3 ;
					$scope.bgAmendAcceptViewForm.currentRate_t3 = finalData.currentRate_t3 ; 
					$scope.bgAmendAcceptViewForm.commrate_t3 = finalData.commrate_t3 ;
					$scope.bgAmendAcceptViewForm.commSpread_t3 = finalData.commSpread_t3 ;
					$scope.bgAmendAcceptViewForm.commFrequency_t3 = finalData.commFrequency_t3 ;
					$scope.bgAmendAcceptViewForm.fixedAmount_t3 = finalData.fixedAmount_t3 ;
					$scope.bgAmendAcceptViewForm.commissionClaimed_t3 = finalData.commissionClaimed_t3 ;
					$scope.bgAmendAcceptViewForm.commissionDate_1_t3 = finalData.commissionDate_1_t3 ;
					$scope.bgAmendAcceptViewForm.commissionAmount_1_t3 = finalData.commissionAmount_1_t3 ;
					$scope.bgAmendAcceptViewForm.commDebitAcct_1_t3 = finalData.commDebitAcct_1_t3 ;
					$scope.bgAmendAcceptViewForm.conversionRate_1_t3 = finalData.conversionRate_1_t3 ;
					$scope.bgAmendAcceptViewForm.rateChange_t3 = finalData.rateChange_t3 ;
					$scope.bgAmendAcceptViewForm.returnCommission_t3 = finalData.returnCommission_t3 ;
					$scope.bgAmendAcceptViewForm.newRate_t3 = finalData.newRate_t3 ;
					$scope.bgAmendAcceptViewForm.effectiveDate_t3 = finalData.effectiveDate_t3 ;
					$scope.bgAmendAcceptViewForm.takeMargin_t4 = finalData.takeMargin_t4 ;
					$scope.bgAmendAcceptViewForm.marginPercent_t4 = finalData.marginPercent_t4 ;
					$scope.bgAmendAcceptViewForm.marginAmount_t4 = finalData.marginAmount_t4 ;
					$scope.bgAmendAcceptViewForm.marginReleaseDate_t4 = finalData.marginReleaseDate_t4 ;
					$scope.bgAmendAcceptViewForm.marginDebitAcct_t4 = finalData.marginDebitAcct_t4 ;
					$scope.bgAmendAcceptViewForm.provisionExchangeRate_t4 = finalData.provisionExchangeRate_t4 ;
					$scope.bgAmendAcceptViewForm.marginCreditAcct_t4 = finalData.marginCreditAcct_t4 ;
					$scope.bgAmendAcceptViewForm.marginReleaseAcct_t4 = finalData.marginReleaseAcct_t4 ;
					$scope.bgAmendAcceptViewForm.slTrancheReference_t5 = finalData.slTrancheReference_t5 ;
					$scope.bgAmendAcceptViewForm.productType_t5 = finalData.productType_t5 ;
					$scope.bgAmendAcceptViewForm.slLinkdate_t5 = finalData.slLinkdate_t5 ;
					$scope.bgAmendAcceptViewForm.issuingBank_t5 = finalData.issuingBank_t5 ;
					$scope.bgAmendAcceptViewForm.participantId_1_t5 = finalData.participantId_1_t5 ;
					$scope.bgAmendAcceptViewForm.participationAmt_1_t5 = finalData.participationAmt_1_t5 ;
					$scope.bgAmendAcceptViewForm.receivingBankId_t6 = finalData.receivingBankId_t6 ;
					$scope.bgAmendAcceptViewForm.receivingBankAddress_1_t6 = finalData.receivingBankAddress_1_t6 ;
					$scope.bgAmendAcceptViewForm.updateCorrBankLimit_t6 = finalData.updateCorrBankLimit_t6 ;
					$scope.bgAmendAcceptViewForm.transactionReferenceNo20_t6 = finalData.transactionReferenceNo20_t6 ;
					$scope.bgAmendAcceptViewForm.furtherIdentification23_t6 = finalData.furtherIdentification23_t6 ;
					$scope.bgAmendAcceptViewForm.date30_t6 = finalData.date30_t6 ;
					$scope.bgAmendAcceptViewForm.detailsOfGuarantee77c_1_t6 = finalData.detailsOfGuarantee77c_1_t6 ;
					$scope.bgAmendAcceptViewForm.senderToReceiverInfo72_t6 = finalData.senderToReceiverInfo72_t6 ;
					$scope.bgAmendAcceptViewForm.applicableRule_t6 = finalData.applicableRule_t6 ;
					$scope.bgAmendAcceptViewForm.narrative_t6 = finalData.narrative_t6 ;

					if($scope.NoOfAmendments == finalData.bgNumberOfAmendments){
$scope.bgAmendAcceptViewForm.amount_t1 = finalData.amount_t1 ;
$scope.bgAmendAcceptViewForm.expiryDate_t1 = finalData.expiryDate_t1 ;
$scope.bgAmendAcceptViewForm.termsNconditions_1_t1 = finalData.termsNconditions_1_t1 ;
					}else{
						$scope.bgAmendAcceptViewForm.amount_t1 = finalData.bgAmendArray[$scope.NoOfAmendments].amount_t1 ;
						$scope.bgAmendAcceptViewForm.expiryDate_t1 = finalData.bgAmendArray[$scope.NoOfAmendments].expiryDate_t1 ;
						$scope.bgAmendAcceptViewForm.termsNconditions_1_t1 = finalData.bgAmendArray[$scope.NoOfAmendments].termsNconditions_1_t1 ;
					}
                        });


                    
                        $scope.back = () => {
							shareid.tab=4;
                              $location.path("/employeeHome");
                        }
                       

                       
                        }
                                                else{
                                                $location.path("/customer");
                                                }

                  });
//====================================================================================================================================================================================
//AMEND ACCEPT CONTROLLER END HERE
//====================================================================================================================================================================================
