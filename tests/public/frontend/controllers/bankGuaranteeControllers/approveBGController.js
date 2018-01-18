app.controller('approveBGController', function($http,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore,$filter,shareid) {
 if($cookieStore.get('employee')){
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
                   const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
                     //const apiBaseURL = $rootScope.apiBaseURL;

                    $http.get(apiBaseURL + "/bgRequestID").then(function(response){
                    $rootScope.bgRequestID = response.data.bgRequestID;
                   //  console.log("bgRequestID in employee home page===>",response.data.bgRequestID);
                                });

                   $scope.message = 'Approve Bank Guarantee ';
                   $scope.node = shareid.thisNode;
                    $scope.username = $cookieStore.get('employee');
                    //console.log("APPROVING ID ===>",shareid.bgApproveID,"  node is ",$scope.node," username is ",$scope.username);
//                     const LCReqNumb = $rootScope.bgApproveID;

                       $scope.logout = function(){
                       $cookieStore.remove('employee');
                       $location.path("/customer");
                           };
                       $scope.bgApproveForm = {};
                       $scope.formError = false;

                   //$scope.BGApprovalId = $rootScope.bgApproveID;
                   $scope.BGApprovalId =shareid.bgApproveID;
                   //const getObj = apiBaseURL + "lc-orders";
                   const cusID1 = $cookieStore.get('employee');
                   const getObj = apiBaseURL + "/employee-bg-orders/"+$scope.BGApprovalId;
                   //console.log("object in approveBG",getObj);

                   $http.get(getObj).then(function(response){
                   console.log("response in approveBG",response);
                   var finalData = response.data.DATA;
                   //var responseModel = finalData[0].bgorder;
                  // var responseModel = finalData;
                   console.log("RESPONSE DATA ", finalData,response.data.DATA.BgNumber_t1);
                   //console.log("RESPONSE DATA final", finalData[0].bgorder,finalData[0]);
                   //console.log("RESPONSE DATA final", finalData,"responseModel",responseModel);
                 //  $scope.lcRequestID = finalData[0].bgOrder.lcReqId;

//responseModel.bgID = "BG-"+$rootScope.bgRequestID;

//$rootScope.modelToSend = responseModel;
///////////////////
$scope.bgApproveForm.bgNumber_t1=finalData.bgNumber_t1;
$scope.bgApproveForm.bgReqId=finalData.bgReqId;
$scope.bgApproveForm.guaranteeRef_t1=finalData.guaranteeRef_t1;
$scope.bgApproveForm.issuedOnBehalfOf_t1=finalData.issuedOnBehalfOf_t1;
$scope.bgApproveForm.currency_t1=finalData.currency_t1;
//$scope.bgApproveForm.dealDate_t1=finalData.dealDate_t1;
$scope.bgApproveForm.expiryDate_t1=finalData.expiryDate_t1;
$scope.bgApproveForm.beneficiaryId_t1=finalData.beneficiaryId_t1;
$scope.bgApproveForm.beneficiaryNoncust_1_t1=finalData.beneficiaryNoncust_1_t1;
$scope.bgApproveForm.termsNconditions_1_t1=finalData.termsNconditions_1_t1;
$scope.bgApproveForm.eventsProcessing_t1=finalData.eventsProcessing_t1;
$scope.bgApproveForm.liquidationMode_t1=finalData.liquidationMode_t1;
$scope.bgApproveForm.customersReference_t1=finalData.customersReference_t1;
$scope.bgApproveForm.amount_t1=finalData.amount_t1;
$scope.bgApproveForm.startDate_t1=finalData.startDate_t1;
$scope.bgApproveForm.maturityDate_t1=finalData.maturityDate_t1;
$scope.bgApproveForm.limitReference_t1=finalData.limitReference_t1;
$scope.bgApproveForm.autoexpiry_t1=finalData.autoexpiry_t1;
$scope.bgApproveForm.chargeDate_1_t2=finalData.chargeDate_1_t2;
$scope.bgApproveForm.chargeCurrency_1_t2=finalData.chargeCurrency_1_t2;
$scope.bgApproveForm.chargeDebitAccount_1_t2=finalData.chargeDebitAccount_1_t2;
$scope.bgApproveForm.chargeCode_1_1_t2=finalData.chargeCode_1_1_t2;
$scope.bgApproveForm.chargeAmount_1_1_t2=finalData.chargeAmount_1_1_t2;
$scope.bgApproveForm.commissionPayType_t3=finalData.commissionPayType_t3;
$scope.bgApproveForm.interestCalcBasis_t3=finalData.interestCalcBasis_t3;
$scope.bgApproveForm.commrate_t3=finalData.commrate_t3;
$scope.bgApproveForm.commFrequency_t3=finalData.commFrequency_t3;
$scope.bgApproveForm.fixedAmount_t3=finalData.fixedAmount_t3;
$scope.bgApproveForm.commissionClaimed_t3=finalData.commissionClaimed_t3;
$scope.bgApproveForm.commissionDate_1_t3=finalData.commissionDate_1_t3;
$scope.bgApproveForm.commDebitAcct_1_t3=finalData.commDebitAcct_1_t3;
$scope.bgApproveForm.rateChange_t3=finalData.rateChange_t3;
$scope.bgApproveForm.newRate_t3=finalData.newRate_t3;
$scope.bgApproveForm.accrualPattern_t3=finalData.accrualPattern_t3;
$scope.bgApproveForm.currentRate_t3=finalData.currentRate_t3;
$scope.bgApproveForm.commSpread_t3=finalData.commSpread_t3;
$scope.bgApproveForm.commissionAmount_1_t3=finalData.commissionAmount_1_t3;
$scope.bgApproveForm.conversionRate_1_t3=finalData.conversionRate_1_t3;
$scope.bgApproveForm.returnCommission_t3=finalData.returnCommission_t3;
$scope.bgApproveForm.effectiveDate_t3=finalData.effectiveDate_t3;
$scope.bgApproveForm.takeMargin_t4=finalData.takeMargin_t4;
$scope.bgApproveForm.marginPercent_t4=finalData.marginPercent_t4;
$scope.bgApproveForm.marginAmount_t4=finalData.marginAmount_t4;
$scope.bgApproveForm.marginReleaseDate_t4=finalData.marginReleaseDate_t4;
$scope.bgApproveForm.marginDebitAcct_t4=finalData.marginDebitAcct_t4;
$scope.bgApproveForm.provisionExchangeRate_t4=finalData.provisionExchangeRate_t4;
$scope.bgApproveForm.marginCreditAcct_t4=finalData.marginCreditAcct_t4;
$scope.bgApproveForm.marginReleaseAcct_t4=finalData.marginReleaseAcct_t4;
$scope.bgApproveForm.slTrancheReference_t5=finalData.slTrancheReference_t5;
$scope.bgApproveForm.productType_t5=finalData.productType_t5;
$scope.bgApproveForm.slLinkdate_t5=finalData.slLinkdate_t5;
$scope.bgApproveForm.issuingBank_t5=finalData.issuingBank_t5;
$scope.bgApproveForm.participantId_1_t5=finalData.participantId_1_t5;
$scope.bgApproveForm.participationAmt_1_t5=finalData.participationAmt_1_t5;
$scope.bgApproveForm.netPrinAmt_t5=finalData.netPrinAmt_t5;
$scope.bgApproveForm.receivingBankId_t6=finalData.receivingBankId_t6;
$scope.bgApproveForm.receivingBankAddress_1_t6=finalData.receivingBankAddress_1_t6;
$scope.bgApproveForm.updateCorrBankLimit_t6=finalData.updateCorrBankLimit_t6;
$scope.bgApproveForm.transactionReferenceNo20_t6=finalData.transactionReferenceNo20_t6;
$scope.bgApproveForm.furtherIdentification23_t6=finalData.furtherIdentification23_t6;
$scope.bgApproveForm.date30_t6=finalData.date30_t6;
$scope.bgApproveForm.detailsOfGuarantee77c_1_t6=finalData.detailsOfGuarantee77c_1_t6;
$scope.bgApproveForm.senderToReceiverInfo72_t6=finalData.senderToReceiverInfo72_t6;
$scope.bgApproveForm.applicableRule_t6=finalData.applicableRule_t6;
$scope.bgApproveForm.narrative_t6=finalData.narrative_t6;

///////////////////

                       });


                   $scope.approveBG = () => {

                  const approveBG = {
bgNumber_t1:$scope.bgApproveForm.bgNumber_t1,
bgReqId:$scope.bgApproveForm.bgReqId,
guaranteeRef_t1:$scope.bgApproveForm.guaranteeRef_t1,
issuedOnBehalfOf_t1:$scope.bgApproveForm.issuedOnBehalfOf_t1,
currency_t1:$scope.bgApproveForm.currency_t1,
//dealDate_t1:$scope.bgApproveForm.dealDate_t1,
expiryDate_t1:$scope.bgApproveForm.expiryDate_t1,
beneficiaryId_t1:$scope.bgApproveForm.beneficiaryId_t1,
beneficiaryNoncust_1_t1:$scope.bgApproveForm.beneficiaryNoncust_1_t1,
termsNconditions_1_t1:$scope.bgApproveForm.termsNconditions_1_t1,
eventsProcessing_t1:$scope.bgApproveForm.eventsProcessing_t1,
liquidationMode_t1:$scope.bgApproveForm.liquidationMode_t1,
customersReference_t1:$scope.bgApproveForm.customersReference_t1,
amount_t1:$scope.bgApproveForm.amount_t1,
startDate_t1:$scope.bgApproveForm.startDate_t1,
maturityDate_t1:$scope.bgApproveForm.maturityDate_t1,
limitReference_t1:$scope.bgApproveForm.limitReference_t1,
autoexpiry_t1:$scope.bgApproveForm.autoexpiry_t1,

chargeDate_1_t2:$scope.bgApproveForm.chargeDate_1_t2,
chargeCurrency_1_t2:$scope.bgApproveForm.chargeCurrency_1_t2,
chargeDebitAccount_1_t2:$scope.bgApproveForm.chargeDebitAccount_1_t2,
chargeCode_1_1_t2:$scope.bgApproveForm.chargeCode_1_1_t2,
chargeAmount_1_1_t2:$scope.bgApproveForm.chargeAmount_1_1_t2,

commissionPayType_t3:$scope.bgApproveForm.commissionPayType_t3,
interestCalcBasis_t3:$scope.bgApproveForm.interestCalcBasis_t3,
commrate_t3:$scope.bgApproveForm.commrate_t3,
commFrequency_t3:$scope.bgApproveForm.commFrequency_t3,
fixedAmount_t3:$scope.bgApproveForm.fixedAmount_t3,
commissionClaimed_t3:$scope.bgApproveForm.commissionClaimed_t3,
commissionDate_1_t3:$scope.bgApproveForm.commissionDate_1_t3,
commDebitAcct_1_t3:$scope.bgApproveForm.commDebitAcct_1_t3,
rateChange_t3:$scope.bgApproveForm.rateChange_t3,
newRate_t3:$scope.bgApproveForm.newRate_t3,
accrualPattern_t3:$scope.bgApproveForm.accrualPattern_t3,
currentRate_t3:$scope.bgApproveForm.currentRate_t3,
commSpread_t3:$scope.bgApproveForm.commSpread_t3,
commissionAmount_1_t3:$scope.bgApproveForm.commissionAmount_1_t3,
conversionRate_1_t3:$scope.bgApproveForm.conversionRate_1_t3,
returnCommission_t3:$scope.bgApproveForm.returnCommission_t3,
effectiveDate_t3:$scope.bgApproveForm.effectiveDate_t3,

takeMargin_t4:$scope.bgApproveForm.takeMargin_t4,
marginPercent_t4:$scope.bgApproveForm.marginPercent_t4,
marginAmount_t4:$scope.bgApproveForm.marginAmount_t4,
marginReleaseDate_t4:$scope.bgApproveForm.marginReleaseDate_t4,
marginDebitAcct_t4:$scope.bgApproveForm.marginDebitAcct_t4,
provisionExchangeRate_t4:$scope.bgApproveForm.provisionExchangeRate_t4,
marginCreditAcct_t4:$scope.bgApproveForm.marginCreditAcct_t4,
marginReleaseAcct_t4:$scope.bgApproveForm.marginReleaseAcct_t4,

slTrancheReference_t5:$scope.bgApproveForm.slTrancheReference_t5,
productType_t5:$scope.bgApproveForm.productType_t5,
slLinkdate_t5:$scope.bgApproveForm.slLinkdate_t5,
issuingBank_t5:$scope.bgApproveForm.issuingBank_t5,
participantId_1_t5:$scope.bgApproveForm.participantId_1_t5,
participationAmt_1_t5:$scope.bgApproveForm.participationAmt_1_t5,
netPrinAmt_t5:$scope.bgApproveForm.netPrinAmt_t5,

receivingBankId_t6:$scope.bgApproveForm.receivingBankId_t6,
receivingBankAddress_1_t6:$scope.bgApproveForm.receivingBankAddress_1_t6,
updateCorrBankLimit_t6:$scope.bgApproveForm.updateCorrBankLimit_t6,
transactionReferenceNo20_t6:$scope.bgApproveForm.guaranteeRef_t1,             //MAPPED TO GUARANTEE REFERENCE
furtherIdentification23_t6:$scope.bgApproveForm.furtherIdentification23_t6,
date30_t6:$scope.bgApproveForm.startDate_t1,                                  //MAPPED TO START DATE
detailsOfGuarantee77c_1_t6:$scope.bgApproveForm.detailsOfGuarantee77c_1_t6,
senderToReceiverInfo72_t6:$scope.bgApproveForm.senderToReceiverInfo72_t6,
applicableRule_t6:$scope.bgApproveForm.applicableRule_t6,
narrative_t6:$scope.bgApproveForm.narrative_t6,

status: "Accepted"

};

                                   const approveBGEndpoint =
                                       apiBaseURL +"/bg-approve";

                                  //console.log("approve BG object  ",$rootScope.modelToSend);
                                  console.log("approve BG object  ",approveBG.bgNumber_t1,approveBG);
                                  $http.post(approveBGEndpoint, angular.toJson(approveBG)).then(
                                  function(result){
                                    console.log("result in BG JSON",result);
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
