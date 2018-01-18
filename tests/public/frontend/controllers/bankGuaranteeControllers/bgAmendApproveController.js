app.controller('bgAmendApproveController', function($http,$uibModal,$interval, $location,$rootScope, $scope, $cookies,$cookieStore,shareid) {
 var tick = function () {
            $scope.clock = Date.now();
          }
          tick();
          $interval(tick, 1000);

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
	
 if($cookieStore.get('employee')){
                    $scope.message = 'Approve Amended Letter of Credits ';
                    $scope.node = shareid.thisNode;
                     $scope.username = $cookieStore.get('employee');
                     //console.log("AMENDING ID ===>",$rootScope.bgApproveAmendID,"  node is ",$scope.node," username is ",$scope.username);
                     //const LCAmendNumb = $rootScope.AmendID;


                        $scope.logout = function(){
                        $cookieStore.remove('employee');
                        $location.path("/customer");
                            };
                        $scope.bgAmendApproveForm = {};
                        $scope.formError = false;
					
					const BGApproveAmendID = shareid.bgApproveAmendID;
					//const BGAmendReqNumb = sharedid.AmendReqID;
					console.log("BGApproveAmendID in bg amend approve controller====>>>>",BGApproveAmendID );
					
					const nodePort = $location.port();
                    const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
					console.log("apiBaseURL in bg amend approve controller====>>>>",apiBaseURL );
					
                    const getObj = apiBaseURL + "/employee-bg-orders/"+BGApproveAmendID;

                    $http.get(getObj).then(function(response){
                    var finalData = response.data.DATA;
					$scope.finalData = finalData;
                    console.log("corda data in bgAmendApproveController ",finalData);
					var amendArrayLength = finalData.bgAmendArray.length;
					amendArrayLength = amendArrayLength-1;
					console.log("amendArrayLength ",amendArrayLength);
					$scope.bgAmendApproveForm.newBgNumber = finalData.bgAmendArray[amendArrayLength].bgNumber_t1 ;
					$scope.bgAmendApproveForm.newBgRequestNumber = finalData.bgAmendArray[amendArrayLength].bgAmendReqId ;
					$scope.bgAmendApproveForm.newLCExpiryDate_t1 = finalData.expiryDate_t1 ;
					$scope.bgAmendApproveForm.newLCAmount_t1 = finalData.amount_t1 ;
					$scope.bgAmendApproveForm.newLcNumberOfAmendments = finalData.bgNumberOfAmendments ;
					$scope.bgAmendApproveForm.newtermsNconditions = finalData.termsNconditions_1_t1 ;
					$scope.bgAmendApproveForm.guaranteeRef_t1 = finalData.guaranteeRef_t1 ;
                     $scope.bgAmendApproveForm.bgNumber_t1 = finalData.bgNumber_t1;                   
				     $scope.bgAmendApproveForm.issuedOnBehalfOf_t1 = finalData.issuedOnBehalfOf_t1 ;
					$scope.bgAmendApproveForm.customersReference_t1 = finalData.customersReference_t1 ;
					$scope.bgAmendApproveForm.currency_t1 = finalData.currency_t1 ;
					$scope.bgAmendApproveForm.amount_t1 = finalData.bgAmendArray[amendArrayLength].amount_t1 ;					
					//$scope.bgAmendApproveForm.dealDate_t1 = new Date((finalData.dealDate_t1).replace(pattern, '$1-$2-$3')) ;
					$scope.bgAmendApproveForm.dealDate_t1 = finalData.dealDate_t1;
					$scope.bgAmendApproveForm.startDate_t1 = finalData.startDate_t1 ;
					$scope.bgAmendApproveForm.expiryDate_t1 = finalData.bgAmendArray[amendArrayLength].expiryDate_t1 ;
					$scope.bgAmendApproveForm.maturityDate_t1 = finalData.maturityDate_t1 ;
					$scope.bgAmendApproveForm.beneficiaryId_t1 = finalData.beneficiaryId_t1 ;
					$scope.bgAmendApproveForm.limitReference_t1 = finalData.limitReference_t1 ;
					$scope.bgAmendApproveForm.beneficiaryNoncust_1_t1 = finalData.beneficiaryNoncust_1_t1 ;
					$scope.bgAmendApproveForm.termsNconditions_1_t1 = finalData.bgAmendArray[amendArrayLength].termsNconditions_1_t1 ;
					$scope.bgAmendApproveForm.eventsProcessing_t1 = finalData.eventsProcessing_t1 ;			 
					$scope.bgAmendApproveForm.autoexpiry_t1 = finalData.autoexpiry_t1 ;
					$scope.bgAmendApproveForm.liquidationMode_t1 = finalData.liquidationMode_t1 ;
					$scope.bgAmendApproveForm.chargeDate_1_t2 = finalData.chargeDate_1_t2 ;
					$scope.bgAmendApproveForm.chargeCurrency_1_t2 = finalData.chargeCurrency_1_t2 ;
					$scope.bgAmendApproveForm.chargeDebitAccount_1_t2 = finalData.chargeDebitAccount_1_t2 ;
					$scope.bgAmendApproveForm.chargeCode_1_1_t2 = finalData.chargeCode_1_1_t2 ;
					$scope.bgAmendApproveForm.chargeAmount_1_1_t2 = finalData.chargeAmount_1_1_t2 ;
					$scope.bgAmendApproveForm.commissionPayType_t3 = finalData.commissionPayType_t3 ;
					$scope.bgAmendApproveForm.accrualPattern_t3 = finalData.accrualPattern_t3 ;
					$scope.bgAmendApproveForm.interestCalcBasis_t3 = finalData.interestCalcBasis_t3 ;
					$scope.bgAmendApproveForm.currentRate_t3 = finalData.currentRate_t3 ; 
					$scope.bgAmendApproveForm.commrate_t3 = finalData.commrate_t3 ;
					$scope.bgAmendApproveForm.commSpread_t3 = finalData.commSpread_t3 ;
					$scope.bgAmendApproveForm.commFrequency_t3 = finalData.commFrequency_t3 ;
					$scope.bgAmendApproveForm.fixedAmount_t3 = finalData.fixedAmount_t3 ;
					$scope.bgAmendApproveForm.commissionClaimed_t3 = finalData.commissionClaimed_t3 ;
					$scope.bgAmendApproveForm.commissionDate_1_t3 = finalData.commissionDate_1_t3 ;
					$scope.bgAmendApproveForm.commissionAmount_1_t3 = finalData.commissionAmount_1_t3 ;
					$scope.bgAmendApproveForm.commDebitAcct_1_t3 = finalData.commDebitAcct_1_t3 ;
					$scope.bgAmendApproveForm.conversionRate_1_t3 = finalData.conversionRate_1_t3 ;
					$scope.bgAmendApproveForm.rateChange_t3 = finalData.rateChange_t3 ;
					$scope.bgAmendApproveForm.returnCommission_t3 = finalData.returnCommission_t3 ;
					$scope.bgAmendApproveForm.newRate_t3 = finalData.newRate_t3 ;
					$scope.bgAmendApproveForm.effectiveDate_t3 = finalData.effectiveDate_t3 ;
					$scope.bgAmendApproveForm.takeMargin_t4 = finalData.takeMargin_t4 ;
					$scope.bgAmendApproveForm.marginPercent_t4 = finalData.marginPercent_t4 ;
					$scope.bgAmendApproveForm.marginAmount_t4 = finalData.marginAmount_t4 ;
					$scope.bgAmendApproveForm.marginReleaseDate_t4 = finalData.marginReleaseDate_t4 ;
					$scope.bgAmendApproveForm.marginDebitAcct_t4 = finalData.marginDebitAcct_t4 ;
					$scope.bgAmendApproveForm.provisionExchangeRate_t4 = finalData.provisionExchangeRate_t4 ;
					$scope.bgAmendApproveForm.marginCreditAcct_t4 = finalData.marginCreditAcct_t4 ;
					$scope.bgAmendApproveForm.marginReleaseAcct_t4 = finalData.marginReleaseAcct_t4 ;
					$scope.bgAmendApproveForm.slTrancheReference_t5 = finalData.slTrancheReference_t5 ;
					$scope.bgAmendApproveForm.productType_t5 = finalData.productType_t5 ;
					$scope.bgAmendApproveForm.slLinkdate_t5 = finalData.slLinkdate_t5 ;
					$scope.bgAmendApproveForm.issuingBank_t5 = finalData.issuingBank_t5 ;
					$scope.bgAmendApproveForm.participantId_1_t5 = finalData.participantId_1_t5 ;
					$scope.bgAmendApproveForm.participationAmt_1_t5 = finalData.participationAmt_1_t5 ;
					$scope.bgAmendApproveForm.receivingBankId_t6 = finalData.receivingBankId_t6 ;
					$scope.bgAmendApproveForm.receivingBankAddress_1_t6 = finalData.receivingBankAddress_1_t6 ;
					$scope.bgAmendApproveForm.updateCorrBankLimit_t6 = finalData.updateCorrBankLimit_t6 ;
					$scope.bgAmendApproveForm.transactionReferenceNo20_t6 = finalData.transactionReferenceNo20_t6 ;
					$scope.bgAmendApproveForm.furtherIdentification23_t6 = finalData.furtherIdentification23_t6 ;
					$scope.bgAmendApproveForm.date30_t6 = finalData.date30_t6 ;
					$scope.bgAmendApproveForm.detailsOfGuarantee77c_1_t6 = finalData.detailsOfGuarantee77c_1_t6 ;
					$scope.bgAmendApproveForm.senderToReceiverInfo72_t6 = finalData.senderToReceiverInfo72_t6 ;
					$scope.bgAmendApproveForm.applicableRule_t6 = finalData.applicableRule_t6 ;
					$scope.bgAmendApproveForm.narrative_t6 = finalData.narrative_t6 ;
					
                        });

				$scope.bgAmendApproveBack = function () {
					shareid.tab = 4;
					$location.path("/employeeHome");
				};
					

                    $scope.amendApproveBG = () => {
                
								$scope.finalData.status = "AMEND_APPROVED";
								
                                    const approveBGEndpoint =
                                        apiBaseURL +"/bg-amend-approve";

                                   console.log("amendApprove BG object  ",$scope.finalData);
                                   $http.post(approveBGEndpoint, angular.toJson($scope.finalData)).then(
                                   function(result){
                                    // success callback
                                    console.log("INSIDE SUCCESS FUNCTION");
									shareid.tab=4;
									
                                    $location.path("/employeeHome");
                                    displayMessage(result);
                                    }, 
                                    function(result){
                                    // failure callback
                                    console.log("INSIDE ERROR FUNCTION");
                                    displayMessage(result);
                                                                         }
                                        //(result) => displayMessage(result),
                                        //(result) => displayMessage(result)
                                    );
                                    // console.log("LC approved and the object is  ",approveLoc);
                                     //console.log("message status" , $scope.messageStatus);
                                     //$location.path("/home");
                        }
                        $scope.cancel = () => {
							shareid.tab=4;
                              $location.path("/employeeHome");
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
                        const invalidNonItemFields = !$scope.lcform.lcrequest
                    

                            return invalidNonItemFields;
                        }
                        }
                                                else{
                                                $location.path("/customer");
                                                }

                  });
