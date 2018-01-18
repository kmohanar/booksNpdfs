         app.controller('bgOpenedViewController', function ($http, $uibModal, $location, $rootScope, $scope, $cookies, $cookieStore, $filter, shareid,shareidCustomer) {
             console.log("inside openedBg controller");
             
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


                 if ($cookieStore.get('customer')) {
                    $scope.bgOpenViewID = shareidCustomer.bgOpenViewID;
                    console.log("in customer $scope.bgOpenViewID",$scope.bgOpenViewID);
                } else {
                    $scope.bgOpenViewID = shareid.bgOpenViewID;
                    console.log("in employee $scope.bgOpenViewID",$scope.bgOpenViewID);
                }

               

               

             $scope.message = 'Opened Bank Guarantee View ';
             $scope.node = shareid.thisNode;
             $scope.username = $cookieStore.get('employee');
             console.log("OPENING ID ===>", shareid.ID, " node is ", $scope.node, " username is ", $scope.username);
             //                            const LCRequestId = $rootScope.lcRequestID;
             $scope.bgOpenedForm = {};
             $scope.formError = false;
             $scope.logout = function () {
                 $cookieStore.remove('employee');
                 $location.path("/customer");
             };

          
             //const BGReqNumb =  $rootScope.bgOpenID;
             const bgOpenViewID =$scope.bgOpenViewID;
           //  console.log("shared BGopen ID", BGReqNumb, shareid.bgOpenID);
             const getObj = apiBaseURL + "/employee-bg-orders/" + bgOpenViewID;
             console.log("bg open object --->", getObj);
             $scope.bgOpenedViewForm = {};
             $http.get(getObj).then(function (response) {
                 var modelData = response.data.DATA;
                 console.log("RESPONSE DATA ", modelData.bgNumber_t1);
                 

                


                 //////////////////////////////////////////////////////////////////////////////////////////////

                 $scope.bgOpenedViewForm.bgNumber_t1=modelData.bgNumber_t1;
                 $scope.bgOpenedViewForm.bgReqId=modelData.bgReqId;
                 $scope.bgOpenedViewForm.guaranteeRef_t1=modelData.guaranteeRef_t1;
                 $scope.bgOpenedViewForm.issuedOnBehalfOf_t1=modelData.issuedOnBehalfOf_t1;
                 $scope.bgOpenedViewForm.currency_t1=modelData.currency_t1;
                 $scope.bgOpenedViewForm.dealDate_t1=modelData.dealDate_t1;
                 $scope.bgOpenedViewForm.expiryDate_t1=modelData.expiryDate_t1;
                 $scope.bgOpenedViewForm.beneficiaryId_t1=modelData.beneficiaryId_t1;
                 $scope.bgOpenedViewForm.beneficiaryNoncust_1_t1=modelData.beneficiaryNoncust_1_t1;
                 $scope.bgOpenedViewForm.termsNconditions_1_t1=modelData.termsNconditions_1_t1;
                 $scope.bgOpenedViewForm.eventsProcessing_t1=modelData.eventsProcessing_t1;
                 $scope.bgOpenedViewForm.liquidationMode_t1=modelData.liquidationMode_t1;
                 $scope.bgOpenedViewForm.customersReference_t1=modelData.customersReference_t1;
                 $scope.bgOpenedViewForm.amount_t1=modelData.amount_t1;
                 $scope.bgOpenedViewForm.startDate_t1=modelData.startDate_t1;
                 $scope.bgOpenedViewForm.maturityDate_t1=modelData.maturityDate_t1;
                 $scope.bgOpenedViewForm.limitReference_t1=modelData.limitReference_t1;
                 $scope.bgOpenedViewForm.autoexpiry_t1=modelData.autoexpiry_t1;
                 $scope.bgOpenedViewForm.chargeDate_1_t2=modelData.chargeDate_1_t2;
                 $scope.bgOpenedViewForm.chargeCurrency_1_t2=modelData.chargeCurrency_1_t2;
                 $scope.bgOpenedViewForm.chargeDebitAccount_1_t2=modelData.chargeDebitAccount_1_t2;
                 $scope.bgOpenedViewForm.chargeCode_1_1_t2=modelData.chargeCode_1_1_t2;
                 $scope.bgOpenedViewForm.chargeAmount_1_1_t2=modelData.chargeAmount_1_1_t2;
                 $scope.bgOpenedViewForm.commissionPayType_t3=modelData.commissionPayType_t3;
                 $scope.bgOpenedViewForm.interestCalcBasis_t3=modelData.interestCalcBasis_t3;
                 $scope.bgOpenedViewForm.commrate_t3=modelData.commrate_t3;
                 $scope.bgOpenedViewForm.commFrequency_t3=modelData.commFrequency_t3;
                 $scope.bgOpenedViewForm.fixedAmount_t3=modelData.fixedAmount_t3;
                 $scope.bgOpenedViewForm.commissionClaimed_t3=modelData.commissionClaimed_t3;
                 $scope.bgOpenedViewForm.commissionDate_1_t3=modelData.commissionDate_1_t3;
                 $scope.bgOpenedViewForm.commDebitAcct_1_t3=modelData.commDebitAcct_1_t3;
                 $scope.bgOpenedViewForm.rateChange_t3=modelData.rateChange_t3;
                 $scope.bgOpenedViewForm.newRate_t3=modelData.newRate_t3;
                 $scope.bgOpenedViewForm.accrualPattern_t3=modelData.accrualPattern_t3;
                 $scope.bgOpenedViewForm.currentRate_t3=modelData.currentRate_t3;
                 $scope.bgOpenedViewForm.commSpread_t3=modelData.commSpread_t3;
                 $scope.bgOpenedViewForm.commissionAmount_1_t3=modelData.commissionAmount_1_t3;
                 $scope.bgOpenedViewForm.conversionRate_1_t3=modelData.conversionRate_1_t3;
                 $scope.bgOpenedViewForm.returnCommission_t3=modelData.returnCommission_t3;
                 $scope.bgOpenedViewForm.effectiveDate_t3=modelData.effectiveDate_t3;
                 $scope.bgOpenedViewForm.takeMargin_t4=modelData.takeMargin_t4;
                 $scope.bgOpenedViewForm.marginPercent_t4=modelData.marginPercent_t4;
                 $scope.bgOpenedViewForm.marginAmount_t4=modelData.marginAmount_t4;
                 $scope.bgOpenedViewForm.marginReleaseDate_t4=modelData.marginReleaseDate_t4;
                 $scope.bgOpenedViewForm.marginDebitAcct_t4=modelData.marginDebitAcct_t4;
                 $scope.bgOpenedViewForm.provisionExchangeRate_t4=modelData.provisionExchangeRate_t4;
                 $scope.bgOpenedViewForm.marginCreditAcct_t4=modelData.marginCreditAcct_t4;
                 $scope.bgOpenedViewForm.marginReleaseAcct_t4=modelData.marginReleaseAcct_t4;
                 $scope.bgOpenedViewForm.slTrancheReference_t5=modelData.slTrancheReference_t5;
                 $scope.bgOpenedViewForm.productType_t5=modelData.productType_t5;
                 $scope.bgOpenedViewForm.slLinkdate_t5=modelData.slLinkdate_t5;
                 $scope.bgOpenedViewForm.issuingBank_t5=modelData.issuingBank_t5;
                 $scope.bgOpenedViewForm.participantId_1_t5=modelData.participantId_1_t5;
                 $scope.bgOpenedViewForm.participationAmt_1_t5=modelData.participationAmt_1_t5;
                 $scope.bgOpenedViewForm.netPrinAmt_t5=modelData.netPrinAmt_t5;
                 $scope.bgOpenedViewForm.receivingBankId_t6=modelData.receivingBankId_t6;
                 $scope.bgOpenedViewForm.receivingBankAddress_1_t6=modelData.receivingBankAddress_1_t6;
                 $scope.bgOpenedViewForm.updateCorrBankLimit_t6=modelData.updateCorrBankLimit_t6;
                 $scope.bgOpenedViewForm.transactionReferenceNo20_t6=modelData.transactionReferenceNo20_t6;
                 $scope.bgOpenedViewForm.furtherIdentification23_t6=modelData.furtherIdentification23_t6;
                 $scope.bgOpenedViewForm.date30_t6=modelData.date30_t6;
                 $scope.bgOpenedViewForm.detailsOfGuarantee77c_1_t6=modelData.detailsOfGuarantee77c_1_t6;
                 $scope.bgOpenedViewForm.senderToReceiverInfo72_t6=modelData.senderToReceiverInfo72_t6;
                 $scope.bgOpenedViewForm.applicableRule_t6=modelData.applicableRule_t6;
                 $scope.bgOpenedViewForm.narrative_t6=modelData.narrative_t6;
                 
                 


             });



             

             $scope.bgOpenedViewBack = function () {
                if ($cookieStore.get('customer')) {
                    shareidCustomer.tab = 4;
                    $location.path("/customerHome");
                } else {
                    shareid.tab = 4;
                    $location.path("/employeeHome");
                }
            };	
          


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

         //End
