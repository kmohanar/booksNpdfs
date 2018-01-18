//=================================================================================================================================================================
//BG AMEND ACCEPT CONTROLLER START HERE
//=================================================================================================================================================================
//Amend start here
app.controller('bgAmendAcceptController', function($http,$uibModal,$filter, $location,$rootScope, $scope, $cookies,$cookieStore, shareid,$interval) {
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
                     
                     //const LCAmendNumb = $rootScope.AmendID;


                        $scope.logout = function(){
                        $cookieStore.remove('employee');
                        $location.path("/customer");
                            };
                        $scope.bgAmendAcceptForm = {};
                        $scope.formError = false;

                   const BGAmendId = shareid.bgAmendAcceptID;
                    const BGAmendReqNumb = shareid.bgAmendAcceptReqID;
					//const BGAmendId = "BG-222";
                    //const BGAmendReqNumb = "BG-222-001";
console.log("AMENDING ID ===>",BGAmendId,"BGAmendReqNumb ==>",BGAmendReqNumb,"  node is ",$scope.node," username is ",$scope.username);
					const nodePort = $location.port();
                    const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
                    
                    const getObj = apiBaseURL + "/employee-bg-orders/"+BGAmendId;

                    const getAmendObj = apiBaseURL + "/bgamendreq/"+BGAmendReqNumb;

                    //start retrieving here


                    $http.get(getAmendObj).then(function(response){
                          var finalAmendData = response.data;
							console.log("db data in amendAccept Controller ", finalAmendData[0]);		
							
							$scope.bgAmendAcceptForm.newBgNumber = finalAmendData[0].bgAmendId ;
							$scope.bgAmendAcceptForm.newBgRequestNumber = finalAmendData[0].bgAmendReqId ;
							$scope.bgAmendAcceptForm.newLCExpiryDate_t1 = finalAmendData[0].bgAmendExpiryDate ;
							$scope.bgAmendAcceptForm.newLCAmount_t1 = finalAmendData[0].bgAmendPrincipalAmount ;
							$scope.bgAmendAcceptForm.newLcNumberOfAmendments = finalAmendData[0].numberOfAmendment ;
							$scope.bgAmendAcceptForm.newtermsNconditions = finalAmendData[0].bgTermsAndConditions ;
                           });

                    //end here

                    $http.get(getObj).then(function(response){
                    var finalData = response.data.DATA;
                    console.log("corda data in bgamendAcceptController ", finalData);
					$scope.bgAmendAcceptForm.guaranteeRef_t1 = finalData.guaranteeRef_t1 ;
                    $scope.bgAmendAcceptForm.bgNumber_t1 = finalData.bgNumber_t1;                   
				    $scope.bgAmendAcceptForm.issuedOnBehalfOf_t1 = finalData.issuedOnBehalfOf_t1 ;
					$scope.bgAmendAcceptForm.customersReference_t1 = finalData.customersReference_t1 ;
					$scope.bgAmendAcceptForm.currency_t1 = finalData.currency_t1 ;
					$scope.bgAmendAcceptForm.amount_t1 = finalData.amount_t1 ;					
					//$scope.bgAmendAcceptForm.dealDate_t1 = new Date((finalData.dealDate_t1).replace(pattern, '$1-$2-$3')) ;
					$scope.bgAmendAcceptForm.dealDate_t1 = finalData.dealDate_t1;
					$scope.bgAmendAcceptForm.startDate_t1 = finalData.startDate_t1 ;
					$scope.bgAmendAcceptForm.expiryDate_t1 = finalData.expiryDate_t1 ;
					$scope.bgAmendAcceptForm.maturityDate_t1 = finalData.maturityDate_t1 ;
					$scope.bgAmendAcceptForm.beneficiaryId_t1 = finalData.beneficiaryId_t1 ;
					$scope.bgAmendAcceptForm.limitReference_t1 = finalData.limitReference_t1 ;
					$scope.bgAmendAcceptForm.beneficiaryNoncust_1_t1 = finalData.beneficiaryNoncust_1_t1 ;
					$scope.bgAmendAcceptForm.termsNconditions_1_t1 = finalData.termsNconditions_1_t1 ;
					$scope.bgAmendAcceptForm.eventsProcessing_t1 = finalData.eventsProcessing_t1 ;			 
					$scope.bgAmendAcceptForm.autoexpiry_t1 = finalData.autoexpiry_t1 ;
					$scope.bgAmendAcceptForm.liquidationMode_t1 = finalData.liquidationMode_t1 ;
					$scope.bgAmendAcceptForm.chargeDate_1_t2 = finalData.chargeDate_1_t2 ;
					$scope.bgAmendAcceptForm.chargeCurrency_1_t2 = finalData.chargeCurrency_1_t2 ;
					$scope.bgAmendAcceptForm.chargeDebitAccount_1_t2 = finalData.chargeDebitAccount_1_t2 ;
					$scope.bgAmendAcceptForm.chargeCode_1_1_t2 = finalData.chargeCode_1_1_t2 ;
					$scope.bgAmendAcceptForm.chargeAmount_1_1_t2 = finalData.chargeAmount_1_1_t2 ;
					$scope.bgAmendAcceptForm.commissionPayType_t3 = finalData.commissionPayType_t3 ;
					$scope.bgAmendAcceptForm.accrualPattern_t3 = finalData.accrualPattern_t3 ;
					$scope.bgAmendAcceptForm.interestCalcBasis_t3 = finalData.interestCalcBasis_t3 ;
					$scope.bgAmendAcceptForm.currentRate_t3 = finalData.currentRate_t3 ; 
					$scope.bgAmendAcceptForm.commrate_t3 = finalData.commrate_t3 ;
					$scope.bgAmendAcceptForm.commSpread_t3 = finalData.commSpread_t3 ;
					$scope.bgAmendAcceptForm.commFrequency_t3 = finalData.commFrequency_t3 ;
					$scope.bgAmendAcceptForm.fixedAmount_t3 = finalData.fixedAmount_t3 ;
					$scope.bgAmendAcceptForm.commissionClaimed_t3 = finalData.commissionClaimed_t3 ;
					$scope.bgAmendAcceptForm.commissionDate_1_t3 = finalData.commissionDate_1_t3 ;
					$scope.bgAmendAcceptForm.commissionAmount_1_t3 = finalData.commissionAmount_1_t3 ;
					$scope.bgAmendAcceptForm.commDebitAcct_1_t3 = finalData.commDebitAcct_1_t3 ;
					$scope.bgAmendAcceptForm.conversionRate_1_t3 = finalData.conversionRate_1_t3 ;
					$scope.bgAmendAcceptForm.rateChange_t3 = finalData.rateChange_t3 ;
					$scope.bgAmendAcceptForm.returnCommission_t3 = finalData.returnCommission_t3 ;
					$scope.bgAmendAcceptForm.newRate_t3 = finalData.newRate_t3 ;
					$scope.bgAmendAcceptForm.effectiveDate_t3 = finalData.effectiveDate_t3 ;
					$scope.bgAmendAcceptForm.takeMargin_t4 = finalData.takeMargin_t4 ;
					$scope.bgAmendAcceptForm.marginPercent_t4 = finalData.marginPercent_t4 ;
					$scope.bgAmendAcceptForm.marginAmount_t4 = finalData.marginAmount_t4 ;
					$scope.bgAmendAcceptForm.marginReleaseDate_t4 = finalData.marginReleaseDate_t4 ;
					$scope.bgAmendAcceptForm.marginDebitAcct_t4 = finalData.marginDebitAcct_t4 ;
					$scope.bgAmendAcceptForm.provisionExchangeRate_t4 = finalData.provisionExchangeRate_t4 ;
					$scope.bgAmendAcceptForm.marginCreditAcct_t4 = finalData.marginCreditAcct_t4 ;
					$scope.bgAmendAcceptForm.marginReleaseAcct_t4 = finalData.marginReleaseAcct_t4 ;
					$scope.bgAmendAcceptForm.slTrancheReference_t5 = finalData.slTrancheReference_t5 ;
					$scope.bgAmendAcceptForm.productType_t5 = finalData.productType_t5 ;
					$scope.bgAmendAcceptForm.slLinkdate_t5 = finalData.slLinkdate_t5 ;
					$scope.bgAmendAcceptForm.issuingBank_t5 = finalData.issuingBank_t5 ;
					$scope.bgAmendAcceptForm.participantId_1_t5 = finalData.participantId_1_t5 ;
					$scope.bgAmendAcceptForm.participationAmt_1_t5 = finalData.participationAmt_1_t5 ;
					$scope.bgAmendAcceptForm.receivingBankId_t6 = finalData.receivingBankId_t6 ;
					$scope.bgAmendAcceptForm.receivingBankAddress_1_t6 = finalData.receivingBankAddress_1_t6 ;
					$scope.bgAmendAcceptForm.updateCorrBankLimit_t6 = finalData.updateCorrBankLimit_t6 ;
					$scope.bgAmendAcceptForm.transactionReferenceNo20_t6 = finalData.transactionReferenceNo20_t6 ;
					$scope.bgAmendAcceptForm.furtherIdentification23_t6 = finalData.furtherIdentification23_t6 ;
					$scope.bgAmendAcceptForm.date30_t6 = finalData.date30_t6 ;
					$scope.bgAmendAcceptForm.detailsOfGuarantee77c_1_t6 = finalData.detailsOfGuarantee77c_1_t6 ;
					$scope.bgAmendAcceptForm.senderToReceiverInfo72_t6 = finalData.senderToReceiverInfo72_t6 ;
					$scope.bgAmendAcceptForm.applicableRule_t6 = finalData.applicableRule_t6 ;
					$scope.bgAmendAcceptForm.narrative_t6 = finalData.narrative_t6 ;


                        });
						
						
				$scope.bgAmendAcceptBack = function () {
					shareid.tab = 3;
					$location.path("/employeeHome");
				};


                    $scope.amendAcceptBG = () => {
							
                    const amendAcceptBG = {                                                        
							 bgNumber_t1 : $scope.bgAmendAcceptForm.newBgNumber,
                             bgAmendReqId: $scope.bgAmendAcceptForm.newBgRequestNumber,
                             amount_t1:($scope.bgAmendAcceptForm.newLCAmount_t1).toString(),
                             termsNconditions_1_t1: $scope.bgAmendAcceptForm.newtermsNconditions,
                             expiryDate_t1: $filter('date')(new Date($scope.bgAmendAcceptForm.newLCExpiryDate_t1), "MM/dd/yyyy", "IST"),
							 //new Date($scope.bgAmendAcceptForm.newLCExpiryDate_t1).toLocaleDateString(),
                             bgNumberOfAmendments: $scope.bgAmendAcceptForm.newLcNumberOfAmendments,                     
                             status:"AMENDED"
                                };

                                    const acceptBGEndpoint =
                                        apiBaseURL +"/bg-amend";

                                   console.log("amendAccept BG object  ",amendAcceptBG);
                                   $http.post(acceptBGEndpoint, angular.toJson(amendAcceptBG)).then(
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
                                   
                        );
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

                            return invalidNonItemFields;
                        }
                        }
                                                else{
                                                $location.path("/customer");
                                                }

                  });
//====================================================================================================================================================================================
//AMEND ACCEPT CONTROLLER END HERE
//====================================================================================================================================================================================
