//=================================================================================================================================================================
//AMEND APPROVE CONTROLLER START HERE
//=================================================================================================================================================================
//Amend start here
app.controller('amendApproveController', function($http,$interval,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore,shareid,shareidCustomer) {
  var tick = function () {
            $scope.clock = Date.now();
          }
          tick();
          $interval(tick, 1000);

          $scope.tabs = [{
                  title: 'LC Details',
                  url: 'one.tpl.html',
                  test: 'lcRequestTab1.html'
              }, {
                  title: 'Parties to LC',
                  url: 'two.tpl.html'
              }, {
                  title: 'Charges',
                  url: 'three.tpl.html'
              }, {
                  title: 'Commission',
                  url: 'four.tpl.html'
              },
              {
                  title: 'Syndication',
                  url: 'five.tpl.html'
              },
              {
                  title: 'Margin Det',
                  url: 'six.tpl.html'
              },
              {
                  title: 'Pay Details',
                  url: 'seven.tpl.html'
              },
              {
                  title: 'Documents',
                  url: 'eight.tpl.html'
              },
              {
                  title: 'MT 700/701',
                  url: 'nine.tpl.html'
              },
              {
                  title: 'MT 740',
                  url: 'ten.tpl.html'
              }
          ];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        }

        $scope.isActiveTab = function (tabUrl) {
            return tabUrl == $scope.currentTab;
        }
	
		  
		  
          $scope.CurrentDate = new Date();
  if($cookieStore.get('employee')){
                    $scope.message = 'Accept Amended Letter of Credits';
                    $scope.node=shareid.thisNode;
					//$scope.node = $rootScope.thisNode;
                     $scope.username = $cookieStore.get('employee');
                     //console.log("AMENDING ID ===>",$rootScope.AmendID,"  node is ",$scope.node," username is ",$scope.username);
					  console.log("AMENDING ID ===>",shareid.AmendID,"  node is ",$scope.node," username is ",$scope.username);
                     //const LCAmendNumb = $rootScope.AmendID;


                        $scope.logout = function(){
                        $cookieStore.remove('employee');
                        $location.path("/customer");
                            };
                        $scope.lcAmendApproveForm1 = {};
                        $scope.formError = false;

                    //const LCAmendId = $rootScope.AmendID;
					const LCAmendId = shareid.AmendID;
                    const LCAmendReqNumb = $rootScope.AmendReqID;					
					//console.log("api base url before",apiBaseURL);
					const nodePort = $location.port();
					const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";

					console.log("api base url",apiBaseURL);

//                    const apiBaseURL = $rootScope.apiBaseURL;
                    //const getObj = apiBaseURL + "lc-orders";
                    const cusID1 = $cookieStore.get('employee');
                    const getObj = apiBaseURL + "/employee-lc-orders/"+LCAmendId;



                    //end here

                    $http.get(getObj).then(function(response){

					var modelData = response.data; 
					 console.log("corda re in amendApproveController ", modelData.DATA);

                    $scope.lcRequestID = modelData.DATA.lcId;
					$scope.amendApproveToSend = modelData.DATA;
					var amendArrayLength = modelData.DATA.amendArray.length;
					amendArrayLength = amendArrayLength-1;
					console.log("amedarray length ", amendArrayLength);
					
					
		$scope.lcAmendApproveForm1.newLcNumber= modelData.DATA.amendArray[amendArrayLength].lcId;
        $scope.lcAmendApproveForm1.newLcRequestNumber = modelData.DATA.amendArray[amendArrayLength].lcAmendReqId;
       	$scope.lcAmendApproveForm1.newLCAmount_t1 =modelData.DATA.lCAmount_t1;
       	$scope.lcAmendApproveForm1.newLCExpiryDate_t1 = new Date(modelData.DATA.lCExpiryDate_t1.replace(pattern, '$1-$2-$3'));
      	$scope.lcAmendApproveForm1.newLCExpiryPlace_t1 = modelData.DATA.lCExpiryPlace_t1;
		$scope.lcAmendApproveForm1.newLcNumberOfAmendments = modelData.DATA.lcNumberOfAmendments;
		$scope.lcAmendApproveForm1.newAmendmentDetails = modelData.DATA.amendmentDetails;

		var pattern = /(\d{2})(\d{2})(\d{4})/;
        $scope.lcAmendApproveForm1.LcRequestNumber = modelData.DATA.lcId;
		$scope.lcAmendApproveForm1.LCAmount_t1 = modelData.DATA.amendArray[amendArrayLength].lCAmount_t1;
        $scope.lcAmendApproveForm1.LCExpiryDate_t1 = new Date(modelData.DATA.amendArray[amendArrayLength].lCExpiryDate_t1.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendApproveForm1.LCExpiryPlace_t1 = modelData.DATA.amendArray[amendArrayLength].lCExpiryPlace_t1;
		
		$scope.lcAmendApproveForm1.ImportSightPmtLCType_t1 = modelData.DATA.importSightPmtLCType_t1;
        $scope.lcAmendApproveForm1.ApplicantID_t1 = modelData.DATA.applicantID_t1;
        $scope.lcAmendApproveForm1.ApplicantAddress_t1 = modelData.DATA.applicantAddress_t1;
        $scope.lcAmendApproveForm1.LCCurrency_t1 = modelData.DATA.lCCurrency_t1;
        $scope.lcAmendApproveForm1.CreditTolerance_t1 = modelData.DATA.creditTolerance_t1;
        $scope.lcAmendApproveForm1.DebitTolerance_t1 = modelData.DATA.debitTolerance_t1;
        $scope.lcAmendApproveForm1.LCIssueDate_t1 = modelData.DATA.lCIssueDate_t1;
        $scope.lcAmendApproveForm1.ShipmentDate_t1 = new Date(modelData.DATA.shipmentDate_t1.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendApproveForm1.LiablityReversalDate_t1 = new Date(modelData.DATA.liablityReversalDate_t1.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendApproveForm1.PresentationDays_t1 = modelData.DATA.presentationDays_t1;
        $scope.lcAmendApproveForm1.IncoTerms_t1 = modelData.DATA.incoTerms_t1;
        $scope.lcAmendApproveForm1.ModeOfShipment_t1 = modelData.DATA.modeOfShipment_t1;
        $scope.lcAmendApproveForm1.LimitReference_t1 = modelData.DATA.limitReference_t1;
        $scope.lcAmendApproveForm1.AutoExpiry_t1 = modelData.DATA.autoExpiry_t1;
        $scope.lcAmendApproveForm1.OtherOfficer_t1 = modelData.DATA.otherOfficer_t1;
        $scope.lcAmendApproveForm1.AccountOfficer_t1 = modelData.DATA.accountOfficer_t1;
        $scope.lcAmendApproveForm1.PortfolioApplicant_t1 = modelData.DATA.portfolioApplicant_t1;
        $scope.lcAmendApproveForm1.PortfolioBeneficiary_t1 = modelData.DATA.portfolioBeneficiary_t1;
        $scope.lcAmendApproveForm1.BeneficiaryID_t2 = modelData.DATA.beneficiaryID_t2;
        $scope.lcAmendApproveForm1.AdvisingThroughBank_t2 = modelData.DATA.advisingThroughBank_t2;
        $scope.lcAmendApproveForm1.BeneficiaryAddress_t2 = modelData.DATA.beneficiaryAddress_t2;
        $scope.lcAmendApproveForm1.AdvisingBankAddress_t2 = modelData.DATA.advisingBankAddress_t2;
        $scope.lcAmendApproveForm1.AvailableWithBankID_t2 = modelData.DATA.availableWithBankID_t2;
        $scope.lcAmendApproveForm1.AdvisingBankID_t2 = modelData.DATA.advisingBankID_t2;
        $scope.lcAmendApproveForm1.ReimbusingBank_t2 = modelData.DATA.reimbusingBank_t2;
        $scope.lcAmendApproveForm1.ChargesFrom_t3 = modelData.DATA.chargesFrom_t3;
        $scope.lcAmendApproveForm1.ChargeDefaultAcct_t3 = modelData.DATA.chargeDefaultAcct_t3;
        $scope.lcAmendApproveForm1.ChargeCode_t3 = modelData.DATA.chargeCode_t3;
        $scope.lcAmendApproveForm1.PartyCharged_t3 = modelData.DATA.partyCharged_t3;
        $scope.lcAmendApproveForm1.ChargeDebitAcct_t3 = modelData.DATA.chargeDebitAcct_t3;
        $scope.lcAmendApproveForm1.ChargeCurrency_t3 = modelData.DATA.chargeCurrency_t3;
        $scope.lcAmendApproveForm1.ChargeExchangeRate_t3 = modelData.DATA.chargeExchangeRate_t3;
        $scope.lcAmendApproveForm1.WaiveCharges_t3 = modelData.DATA.waiveCharges_t3;
        $scope.lcAmendApproveForm1.ChargeAmount_t3 = modelData.DATA.chargeAmount_t3;
        $scope.lcAmendApproveForm1.AmortiseCharges_t3 = modelData.DATA.amortiseCharges_t3;
        $scope.lcAmendApproveForm1.ChargeStatus_t3 = modelData.DATA.chargeStatus_t3;
        $scope.lcAmendApproveForm1.TaxCurrency_t3 = modelData.DATA.taxCurrency_t3;
        $scope.lcAmendApproveForm1.CommissionCode_t4 = modelData.DATA.commissionCode_t4;
        $scope.lcAmendApproveForm1.CommissionParty_t4 = modelData.DATA.commissionParty_t4;
        $scope.lcAmendApproveForm1.CommissionFrequency_t4 = modelData.DATA.commissionFrequency_t4;
        $scope.lcAmendApproveForm1.CommissionRate_t4 = modelData.DATA.commissionRate_t4;
        $scope.lcAmendApproveForm1.AccrualParam_t4 = modelData.DATA.accrualParam_t4;
        $scope.lcAmendApproveForm1.FixedCommissionAmount_t4 = modelData.DATA.fixedCommissionAmount_t4;
        $scope.lcAmendApproveForm1.CommissionAccount_t4 = modelData.DATA.commissionAccount_t4;
        $scope.lcAmendApproveForm1.CommissionExchangeRate_t4 = modelData.DATA.commissionExchangeRate_t4;
        $scope.lcAmendApproveForm1.CommissionClaimed_t4 = modelData.DATA.commissionClaimed_t4;
        $scope.lcAmendApproveForm1.BackForward_t4 = modelData.DATA.backForward_t4;
        $scope.lcAmendApproveForm1.ReturnCommission_t4 = modelData.DATA.returnCommission_t4;
        $scope.lcAmendApproveForm1.SLRefTranche_t5 = modelData.DATA.sLRefTranche_t5;
        $scope.lcAmendApproveForm1.ProductType_t5 = modelData.DATA.productType_t5;
        $scope.lcAmendApproveForm1.BaseCcyRate_t5 = modelData.DATA.baseCcyRate_t5;
        $scope.lcAmendApproveForm1.Participator_t5 = modelData.DATA.participator_t5;
        $scope.lcAmendApproveForm1.PartShare_t5 = modelData.DATA.partShare_t5;
        $scope.lcAmendApproveForm1.PartAmount_t5 = modelData.DATA.partAmount_t5;
        $scope.lcAmendApproveForm1.SyndicateCharge_t5 = modelData.DATA.syndicateCharge_t5;
        $scope.lcAmendApproveForm1.OwnPartAmt_t5 = modelData.DATA.ownPartAmt_t5;
        $scope.lcAmendApproveForm1.BankToBankInfo_t5 = modelData.DATA.bankToBankInfo_t5;
        $scope.lcAmendApproveForm1.MT799Message_t5 = modelData.DATA.mT799Message_t5;
        $scope.lcAmendApproveForm1.MarginRequired_t6 = modelData.DATA.marginRequired_t6;
        $scope.lcAmendApproveForm1.MarginCalcBase_t6 = modelData.DATA.marginCalcBase_t6;
        $scope.lcAmendApproveForm1.MarginPercent_t6 = modelData.DATA.marginPercent_t6;
        $scope.lcAmendApproveForm1.MarginDebitAccount_t6 = modelData.DATA.marginDebitAccount_t6;
        $scope.lcAmendApproveForm1.MarginAmount_t6 = modelData.DATA.marginAmount_t6;
        $scope.lcAmendApproveForm1.MarginExchangeRate_t6 = modelData.DATA.marginExchangeRate_t6;
        $scope.lcAmendApproveForm1.MarginCreditAcct_t6 = modelData.DATA.marginCreditAcct_t6;
        $scope.lcAmendApproveForm1.LimitwithProvision_t6 = modelData.DATA.limitwithProvision_t6;
        $scope.lcAmendApproveForm1.DrawingType_1_t7 = modelData.DATA.drawingType_1_t7;
        $scope.lcAmendApproveForm1.PaymentPercent_1_t7 = modelData.DATA.paymentPercent_1_t7;
        $scope.lcAmendApproveForm1.PaymentPortion_1_t7 = modelData.DATA.paymentPortion_1_t7;
        $scope.lcAmendApproveForm1.Acpt_timeBand_1_t7 = modelData.DATA.acpt_timeBand_1_t7;
        $scope.lcAmendApproveForm1.AddCoveredAmt_1_t7 = modelData.DATA.addCoveredAmt_1_t7;
        $scope.lcAmendApproveForm1.PortLimitRef_1_t7 = modelData.DATA.portLimitRef_1_t7;
        $scope.lcAmendApproveForm1.PortionOverdrawn_1_t7 = modelData.DATA.portionOverdrawn_1_t7;
        $scope.lcAmendApproveForm1.RevolvingType_t7 = modelData.DATA.revolvingType_t7;
        $scope.lcAmendApproveForm1.NoofRevolutions_t7 = modelData.DATA.noofRevolutions_t7;
        $scope.lcAmendApproveForm1.RevolvingFqy_t7 = modelData.DATA.revolvingFqy_t7;
        $scope.lcAmendApproveForm1.LimitforRevolving_t7 = modelData.DATA.limitforRevolving_t7;
        $scope.lcAmendApproveForm1.Cur_Revol_Liab_t7 = modelData.DATA.cur_Revol_Liab_t7;
        $scope.lcAmendApproveForm1.DocumentId_t8 = modelData.DATA.documentId_t8;
        $scope.lcAmendApproveForm1.DocumentsCode_1_t8 = modelData.DATA.documentsCode_1_t8;
        $scope.lcAmendApproveForm1.ADocumentsText_1_t8 = modelData.DATA.aDocumentsText_1_t8;
        $scope.lcAmendApproveForm1.ADocumentsRequired_t8 = modelData.DATA.aDocumentsRequired_t8;
        $scope.lcAmendApproveForm1.AAdditionalConditions_1_t8 = modelData.DATA.aAdditionalConditions_1_t8;
        $scope.lcAmendApproveForm1.MT700_1_20Docy_CreditNumber = modelData.DATA.mT700_1_20Docy_CreditNumber;
        $scope.lcAmendApproveForm1.MT700_1_23ReferencetoPreAdvice = modelData.DATA.mT700_1_23ReferencetoPreAdvice;
       // $scope.lcAmendApproveForm1.MT700_1_31CDateofIssue = new Date(modelData.DATA.MT700_1_31CDateofIssue.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendApproveForm1.MT700_1_31CDateofIssue = (new Date(modelData.DATA.MT700_1_31CDateofIssue), "MM/dd/yyyy", "IST");
        $scope.lcAmendApproveForm1.MT700_1_40EApplicableRuleCodes = modelData.DATA.mT700_1_40EApplicableRuleCodes;
        $scope.lcAmendApproveForm1.MT700_1_31DDateofExpiry = new Date(modelData.DATA.mT700_1_31DDateofExpiry.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendApproveForm1.MT700_1_31DPlaceofExpiry = modelData.DATA.mT700_1_31DPlaceofExpiry;
        $scope.lcAmendApproveForm1.MT700_1_51aADApplicantBank_1 = modelData.DATA.mT700_1_51aADApplicantBank_1;
        $scope.lcAmendApproveForm1.MT700_1_50Applicant_1 = modelData.DATA.mT700_1_50Applicant_1;
        $scope.lcAmendApproveForm1.MT700_1_59Beneficiary_1 = modelData.DATA.mT700_1_59Beneficiary_1;
        $scope.lcAmendApproveForm1.MT700_1_32BCurrencyCode_Amount = modelData.DATA.mT700_1_32BCurrencyCode_Amount;
        $scope.lcAmendApproveForm1.MT700_1_39APercentgCrAmtTolerance = modelData.DATA.mT700_1_39APercentgCrAmtTolerance;
        $scope.lcAmendApproveForm1.MT700_1_39APercentgDrAmtTolerance = modelData.DATA.mT700_1_39APercentgDrAmtTolerance;
        $scope.lcAmendApproveForm1.MT700_1_39BMaximumCreditAmt = modelData.DATA.mT700_1_39BMaximumCreditAmt;
        $scope.lcAmendApproveForm1.MT700_1_39CAddlAmountsCovered_1 = modelData.DATA.mT700_1_39CAddlAmountsCovered_1;
        $scope.lcAmendApproveForm1.MT700_1_41aAAvailableWith = modelData.DATA.mT700_1_41aAAvailableWith;
        $scope.lcAmendApproveForm1.MT700_1_41aDAvailablewith_1 = modelData.DATA.mT700_1_41aDAvailablewith_1;
        $scope.lcAmendApproveForm1.MT700_1_AvailableBy = modelData.DATA.mT700_1_AvailableBy;
        $scope.lcAmendApproveForm1.MT700_1_42CDraftsat_1 = modelData.DATA.mT700_1_42CDraftsat_1;
        $scope.lcAmendApproveForm1.MT700_1_42aADraweeID = modelData.DATA.mT700_1_42aADraweeID;
        $scope.lcAmendApproveForm1.MT700_1_42aDDraweeName_1 = modelData.DATA.mT700_1_42aDDraweeName_1;
        $scope.lcAmendApproveForm1.MT700_1_42MMixedPaymentDetails_1 = modelData.DATA.mT700_1_42MMixedPaymentDetails_1;
        $scope.lcAmendApproveForm1.MT700_1_42PDeferredPaymentDetails_1 = modelData.DATA.mT700_1_42PDeferredPaymentDetails_1;
        $scope.lcAmendApproveForm1.MT700_1_43PPartialShipments = modelData.DATA.mT700_1_43PPartialShipments;
        $scope.lcAmendApproveForm1.MT700_1_43TTranshipment = modelData.DATA.mT700_1_43TTranshipment;
        $scope.lcAmendApproveForm1.MT700_1_44APlaceofTakinginCharge = modelData.DATA.mT700_1_44APlaceofTakinginCharge;
        $scope.lcAmendApproveForm1.MT700_1_44EPortofLoading = modelData.DATA.mT700_1_44EPortofLoading;
        $scope.lcAmendApproveForm1.MT700_1_44FPortofDischarge = modelData.DATA.mT700_1_44FPortofDischarge;
        $scope.lcAmendApproveForm1.MT700_1_44BFinalDestination = modelData.DATA.mT700_1_44BFinalDestination;
        $scope.lcAmendApproveForm1.MT700_1_44CLatestDateofShipment = modelData.DATA.mT700_1_44CLatestDateofShipment;
        $scope.lcAmendApproveForm1.MT700_1_44DShipmentPeriod_1 = modelData.DATA.mT700_1_44DShipmentPeriod_1;
        $scope.lcAmendApproveForm1.MT700_1_45ADescriptionofGoods = modelData.DATA.mT700_1_45ADescriptionofGoods;
        $scope.lcAmendApproveForm1.MT700_1_46ADocumentsRequiredCode_1 = modelData.DATA.mT700_1_46ADocumentsRequiredCode_1;
        $scope.lcAmendApproveForm1.MT700_1_46ADocumentsRequired_1 = modelData.DATA.mT700_1_46ADocumentsRequired_1;
        $scope.lcAmendApproveForm1.MT700_1_46ADocumentsRequired = modelData.DATA.mT700_1_46ADocumentsRequired;
        $scope.lcAmendApproveForm1.MT700_1_47AAdditionalConditions_1 = modelData.DATA.mT700_1_47AAdditionalConditions_1;
        $scope.lcAmendApproveForm1.MT700_1_47AAdditionalConditions = modelData.DATA.mT700_1_47AAdditionalConditions;
        $scope.lcAmendApproveForm1.MT700_1_71BCharges = modelData.DATA.mT700_1_71BCharges;
        $scope.lcAmendApproveForm1.MT700_1_48PeriodforPresentation = modelData.DATA.mT700_1_48PeriodforPresentation;
        $scope.lcAmendApproveForm1.MT700_1_49ConfirmationInstructions = modelData.DATA.mT700_1_49ConfirmationInstructions;
        $scope.lcAmendApproveForm1.MT700_1_53aAReimbursingBank = modelData.DATA.mT700_1_53aAReimbursingBank;
        $scope.lcAmendApproveForm1.MT700_1_53aDReimbursingBank_1 = modelData.DATA.mT700_1_53aDReimbursingBank_1;
        $scope.lcAmendApproveForm1.MT700_1_78InstructionstotheBank = modelData.DATA.mT700_1_78InstructionstotheBank;
        $scope.lcAmendApproveForm1.MT700_1_57aAAdviseThroughBank = modelData.DATA.mT700_1_57aAAdviseThroughBank;
        $scope.lcAmendApproveForm1.MT700_1_57aDAdviseThroughBank_1 = modelData.DATA.mT700_1_57aDAdviseThroughBank_1;
        $scope.lcAmendApproveForm1.MT700_1_72SendertoReceiverInfo_1 = modelData.DATA.mT700_1_72SendertoReceiverInfo_1;
        $scope.lcAmendApproveForm1.MT740_MT740SenttoBankId = modelData.DATA.mT740_MT740SenttoBankId;
        $scope.lcAmendApproveForm1.MT740_MT740SenttoBankName = modelData.DATA.mT740_MT740SenttoBankName;
        $scope.lcAmendApproveForm1.MT740_SendMT740withLC = modelData.DATA.mT740_SendMT740withLC;
        $scope.lcAmendApproveForm1.MT740_20Docy_CreditNumber = modelData.DATA.mT740_20Docy_CreditNumber;
        $scope.lcAmendApproveForm1.MT740_25AccountIdentification = modelData.DATA.mT740_25AccountIdentification;
        $scope.lcAmendApproveForm1.MT740_31DDateofExpiry = modelData.DATA.mT740_31DDateofExpiry;
        $scope.lcAmendApproveForm1.MT740_31DPlaceofExpiry = modelData.DATA.mT740_31DPlaceofExpiry;
        $scope.lcAmendApproveForm1.MT740_58aADNegotiatingBank_1 = modelData.DATA.mT740_58aADNegotiatingBank_1;
        $scope.lcAmendApproveForm1.MT740_59Beneficiary = modelData.DATA.mT740_59Beneficiary;
        $scope.lcAmendApproveForm1.MT740_59Beneficiary_1 = modelData.DATA.mT740_59Beneficiary_1;
        $scope.lcAmendApproveForm1.MT740_32BLCCurrency = modelData.DATA.mT740_32BLCCurrency;
        $scope.lcAmendApproveForm1.MT740_39ACreditTolerance = modelData.DATA.mT740_39ACreditTolerance;
        $scope.lcAmendApproveForm1.MT740_39ADebitTolerance = modelData.DATA.mT740_39ADebitTolerance;
        $scope.lcAmendApproveForm1.MT740_39BMaximumCreditAmt = modelData.DATA.mT740_39BMaximumCreditAmt;
        $scope.lcAmendApproveForm1.MT740_39CAddlAmountsCovered_1 = modelData.DATA.mT740_39CAddlAmountsCovered_1;
        $scope.lcAmendApproveForm1.MT740_40FApplicableRuleCodes = modelData.DATA.mT740_40FApplicableRuleCodes;
        $scope.lcAmendApproveForm1.MT740_41aAAvailableWith = modelData.DATA.mT740_41aAAvailableWith;
        $scope.lcAmendApproveForm1.MT740_41aDAvailablewith_1 = modelData.DATA.mT740_41aDAvailablewith_1;
        $scope.lcAmendApproveForm1.MT740_42CDraftsat_1 = modelData.DATA.mT740_42CDraftsat_1;
        $scope.lcAmendApproveForm1.MT740_42aADrawee = modelData.DATA.mT740_42aADrawee;
        $scope.lcAmendApproveForm1.MT740_42aDDrawee_1 = modelData.DATA.mT740_42aDDrawee_1;
        $scope.lcAmendApproveForm1.MT740_42MMixedPaymentDetails_1 = modelData.DATA.mT740_42MMixedPaymentDetails_1;
        $scope.lcAmendApproveForm1.MT740_42PDeferredPaymentDetails_1 = modelData.DATA.mT740_42PDeferredPaymentDetails_1;
        $scope.lcAmendApproveForm1.MT740_71AReimbursingBankCharges = modelData.DATA.mT740_71AReimbursingBankCharges;
        $scope.lcAmendApproveForm1.MT740_71BOtherCharges_1 = modelData.DATA.mT740_71BOtherCharges_1;
        $scope.lcAmendApproveForm1.MT740_72SendertoReceiverInfo_1 = modelData.DATA.mT740_72SendertoReceiverInfo_1;
 
                        });

console.log("crossing crossing  ");


//back button function
			
			$scope.lcAmendApproveBack = function () {
				console.log("working inside lcAmendApproveBack ")
				if ($cookieStore.get('customer')) {
					shareidCustomer.tab = 2;
					$location.path("/customerHome");
				} else {
					shareid.tab = 2;
					$location.path("/employeeHome");
				}
			};
			
			
			//end



                    $scope.amendApproveLC = () => {
                    const amendApproveLOC = {

                          status : "APPROVED"
                                };
								var recordValuesToSend = $scope.amendApproveToSend;
							        recordValuesToSend.status = "AMEND_APPROVED";

                                    const approveLCEndpoint =
                                        apiBaseURL +"/lc-amend-approve";

console.log("amendApprove LOC object  ",recordValuesToSend);
                                   $http.post(approveLCEndpoint, angular.toJson(recordValuesToSend)).then(
                                   function(result){
                                    // success callback
                                    console.log("INSIDE SUCCESS FUNCTION");
									shareid.tab=2;
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
							shareid.tab=2;
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
												
												
					$scope.backToRequested = () => {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 1;

            $location.path("/customerHome");
        } else {
            shareid.tab = 1;
            $location.path("/employeeHome");
        }
    }
	
	$scope.backToOpened = () => {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 2;

            $location.path("/customerHome");
        } else {
            shareid.tab = 2;
            $location.path("/employeeHome");
        }
    }
					

                  });
//====================================================================================================================================================================================
//AMEND APPROVE CONTROLLER END HERE
//====================================================================================================================================================================================
