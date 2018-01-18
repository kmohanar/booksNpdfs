//=================================================================================================================================================================
//AMEND ACCEPT CONTROLLER START HERE
//=================================================================================================================================================================
//Amend start here
app.controller('amendAcceptController', function($http,$interval,$uibModal, $location,$rootScope, $scope, $cookies,$cookieStore,shareid) {
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
                    $scope.message = 'Accept Amended Letter of Credits ';
                    $scope.node = $rootScope.thisNode;
                     $scope.username = $cookieStore.get('employee');
                     console.log("AMENDING ID ===>",shareid.LC_Amend_ID,"  node is ",$scope.node," username is ",$scope.username);
                     //const LCAmendNumb = $rootScope.AmendID;


                        $scope.logout = function(){
                        $cookieStore.remove('employee');
                        $location.path("/customer");
                            };
                        $scope.lcAmendAcceptForm1 = {};
                        $scope.formError = false;

                    const LCAmendId = shareid.LC_Amend_ID;
                    const LCAmendReqNumb = shareid.LC_AmendReq_ID;

                   // const apiBaseURL = $rootScope.apiBaseURL;
						const nodePort = $location.port();
                      const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
                    //const getObj = apiBaseURL + "lc-orders";
                    const cusID1 = $cookieStore.get('employee');
                    const getObj = apiBaseURL + "/employee-lc-orders/"+LCAmendId;

                    const getAmendObj = apiBaseURL + "/lcamendreq/"+LCAmendReqNumb;

                    //start retrieving here


                    $http.get(getAmendObj).then(function(response){
                                        var finalAmendData = response.data;
                                        console.log("db data in amendAccept Controller", finalAmendData);
										console.log("db data ", finalAmendData[0].lcAmendId);
                                          //amend part start here
										  var pattern = /(\d{2})(\d{2})(\d{4})/;
										  $scope.lcAmendAcceptForm1.newLcNumber= finalAmendData[0].lcAmendId;
        								  $scope.lcAmendAcceptForm1.newLcRequestNumber = finalAmendData[0].lcAmendReqId;
       							  	      $scope.lcAmendAcceptForm1.newLCAmount_t1 = finalAmendData[0].lcAmendAmount;
       								      $scope.lcAmendAcceptForm1.newLCExpiryDate_t1 =  new Date(finalAmendData[0].lcAmendExpiryDate.replace(pattern, '$1-$2-$3'));
      								      $scope.lcAmendAcceptForm1.newLCExpiryPlace_t1 = finalAmendData[0].lcAmendExpiryPlace;
										  $scope.lcAmendAcceptForm1.newLcNumberOfAmendments = finalAmendData[0].numberOfAmendment;
										  $scope.lcAmendAcceptForm1.newAmendmentDetails = finalAmendData[0].amendmentDetails;
                    });
                    //end here

                    $http.get(getObj).then(function(res){
                    var finalData = res.data.DATA;
					$scope.ToSendValue = finalData; 
					 var modelData = res.data; 
                    console.log("corda data in amendAcceptController ", finalData);
                    //console.log("RESPONSE DATA final", finalData[0].lcorder,finalData[0]);
                    $scope.lcRequestID = finalData.lcReqId;
		var pattern = /(\d{2})(\d{2})(\d{4})/;
        $scope.lcAmendAcceptForm1.LcRequestNumber = modelData.DATA.lcId;
        $scope.lcAmendAcceptForm1.ImportSightPmtLCType_t1 = modelData.DATA.importSightPmtLCType_t1;
        $scope.lcAmendAcceptForm1.ApplicantID_t1 = modelData.DATA.applicantID_t1;
        $scope.lcAmendAcceptForm1.ApplicantAddress_t1 = modelData.DATA.applicantAddress_t1;
        $scope.lcAmendAcceptForm1.LCCurrency_t1 = modelData.DATA.lCCurrency_t1;
        $scope.lcAmendAcceptForm1.LCAmount_t1 = modelData.DATA.lCAmount_t1;
        $scope.lcAmendAcceptForm1.CreditTolerance_t1 = modelData.DATA.creditTolerance_t1;
        $scope.lcAmendAcceptForm1.DebitTolerance_t1 = modelData.DATA.debitTolerance_t1;
        $scope.lcAmendAcceptForm1.LCIssueDate_t1 = modelData.DATA.lCIssueDate_t1;
        $scope.lcAmendAcceptForm1.ShipmentDate_t1 = new Date(modelData.DATA.shipmentDate_t1.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendAcceptForm1.LCExpiryDate_t1 = modelData.DATA.lCExpiryDate_t1;
		console.log("$scope.lcAmendAcceptForm1.LCExpiryDate_t1",$scope.lcAmendAcceptForm1.LCExpiryDate_t1);
        $scope.lcAmendAcceptForm1.LiablityReversalDate_t1 = new Date(modelData.DATA.liablityReversalDate_t1.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendAcceptForm1.PresentationDays_t1 = modelData.DATA.presentationDays_t1;
        $scope.lcAmendAcceptForm1.LCExpiryPlace_t1 = modelData.DATA.lCExpiryPlace_t1;
        $scope.lcAmendAcceptForm1.IncoTerms_t1 = modelData.DATA.incoTerms_t1;
        $scope.lcAmendAcceptForm1.ModeOfShipment_t1 = modelData.DATA.modeOfShipment_t1;
        $scope.lcAmendAcceptForm1.LimitReference_t1 = modelData.DATA.limitReference_t1;
        $scope.lcAmendAcceptForm1.AutoExpiry_t1 = modelData.DATA.autoExpiry_t1;
        $scope.lcAmendAcceptForm1.OtherOfficer_t1 = modelData.DATA.otherOfficer_t1;
        $scope.lcAmendAcceptForm1.AccountOfficer_t1 = modelData.DATA.accountOfficer_t1;
        $scope.lcAmendAcceptForm1.PortfolioApplicant_t1 = modelData.DATA.portfolioApplicant_t1;
        $scope.lcAmendAcceptForm1.PortfolioBeneficiary_t1 = modelData.DATA.portfolioBeneficiary_t1;
        $scope.lcAmendAcceptForm1.BeneficiaryID_t2 = modelData.DATA.beneficiaryID_t2;
        $scope.lcAmendAcceptForm1.AdvisingThroughBank_t2 = modelData.DATA.advisingThroughBank_t2;
        $scope.lcAmendAcceptForm1.BeneficiaryAddress_t2 = modelData.DATA.beneficiaryAddress_t2;
        $scope.lcAmendAcceptForm1.AdvisingBankAddress_t2 = modelData.DATA.advisingBankAddress_t2;
        $scope.lcAmendAcceptForm1.AvailableWithBankID_t2 = modelData.DATA.availableWithBankID_t2;
        $scope.lcAmendAcceptForm1.AdvisingBankID_t2 = modelData.DATA.advisingBankID_t2;
        $scope.lcAmendAcceptForm1.ReimbusingBank_t2 = modelData.DATA.reimbusingBank_t2;
        $scope.lcAmendAcceptForm1.ChargesFrom_t3 = modelData.DATA.chargesFrom_t3;
        $scope.lcAmendAcceptForm1.ChargeDefaultAcct_t3 = modelData.DATA.chargeDefaultAcct_t3;
        $scope.lcAmendAcceptForm1.ChargeCode_t3 = modelData.DATA.chargeCode_t3;
        $scope.lcAmendAcceptForm1.PartyCharged_t3 = modelData.DATA.partyCharged_t3;
        $scope.lcAmendAcceptForm1.ChargeDebitAcct_t3 = modelData.DATA.chargeDebitAcct_t3;
        $scope.lcAmendAcceptForm1.ChargeCurrency_t3 = modelData.DATA.chargeCurrency_t3;
        $scope.lcAmendAcceptForm1.ChargeExchangeRate_t3 = modelData.DATA.chargeExchangeRate_t3;
        $scope.lcAmendAcceptForm1.WaiveCharges_t3 = modelData.DATA.waiveCharges_t3;
        $scope.lcAmendAcceptForm1.ChargeAmount_t3 = modelData.DATA.chargeAmount_t3;
        $scope.lcAmendAcceptForm1.AmortiseCharges_t3 = modelData.DATA.amortiseCharges_t3;
        $scope.lcAmendAcceptForm1.ChargeStatus_t3 = modelData.DATA.chargeStatus_t3;
        $scope.lcAmendAcceptForm1.TaxCurrency_t3 = modelData.DATA.taxCurrency_t3;
        $scope.lcAmendAcceptForm1.CommissionCode_t4 = modelData.DATA.commissionCode_t4;
        $scope.lcAmendAcceptForm1.CommissionParty_t4 = modelData.DATA.commissionParty_t4;
        $scope.lcAmendAcceptForm1.CommissionFrequency_t4 = modelData.DATA.commissionFrequency_t4;
        $scope.lcAmendAcceptForm1.CommissionRate_t4 = modelData.DATA.commissionRate_t4;
        $scope.lcAmendAcceptForm1.AccrualParam_t4 = modelData.DATA.accrualParam_t4;
        $scope.lcAmendAcceptForm1.FixedCommissionAmount_t4 = modelData.DATA.fixedCommissionAmount_t4;
        $scope.lcAmendAcceptForm1.CommissionAccount_t4 = modelData.DATA.commissionAccount_t4;
        $scope.lcAmendAcceptForm1.CommissionExchangeRate_t4 = modelData.DATA.commissionExchangeRate_t4;
        $scope.lcAmendAcceptForm1.CommissionClaimed_t4 = modelData.DATA.commissionClaimed_t4;
        $scope.lcAmendAcceptForm1.BackForward_t4 = modelData.DATA.backForward_t4;
        $scope.lcAmendAcceptForm1.ReturnCommission_t4 = modelData.DATA.returnCommission_t4;
        $scope.lcAmendAcceptForm1.SLRefTranche_t5 = modelData.DATA.sLRefTranche_t5;
        $scope.lcAmendAcceptForm1.ProductType_t5 = modelData.DATA.productType_t5;
        $scope.lcAmendAcceptForm1.BaseCcyRate_t5 = modelData.DATA.baseCcyRate_t5;
        $scope.lcAmendAcceptForm1.Participator_t5 = modelData.DATA.participator_t5;
        $scope.lcAmendAcceptForm1.PartShare_t5 = modelData.DATA.partShare_t5;
        $scope.lcAmendAcceptForm1.PartAmount_t5 = modelData.DATA.partAmount_t5;
        $scope.lcAmendAcceptForm1.SyndicateCharge_t5 = modelData.DATA.syndicateCharge_t5;
        $scope.lcAmendAcceptForm1.OwnPartAmt_t5 = modelData.DATA.ownPartAmt_t5;
        $scope.lcAmendAcceptForm1.BankToBankInfo_t5 = modelData.DATA.bankToBankInfo_t5;
        $scope.lcAmendAcceptForm1.MT799Message_t5 = modelData.DATA.mT799Message_t5;
        $scope.lcAmendAcceptForm1.MarginRequired_t6 = modelData.DATA.marginRequired_t6;
        $scope.lcAmendAcceptForm1.MarginCalcBase_t6 = modelData.DATA.marginCalcBase_t6;
        $scope.lcAmendAcceptForm1.MarginPercent_t6 = modelData.DATA.marginPercent_t6;
        $scope.lcAmendAcceptForm1.MarginDebitAccount_t6 = modelData.DATA.marginDebitAccount_t6;
        $scope.lcAmendAcceptForm1.MarginAmount_t6 = modelData.DATA.marginAmount_t6;
        $scope.lcAmendAcceptForm1.MarginExchangeRate_t6 = modelData.DATA.marginExchangeRate_t6;
        $scope.lcAmendAcceptForm1.MarginCreditAcct_t6 = modelData.DATA.marginCreditAcct_t6;
        $scope.lcAmendAcceptForm1.LimitwithProvision_t6 = modelData.DATA.limitwithProvision_t6;
        $scope.lcAmendAcceptForm1.DrawingType_1_t7 = modelData.DATA.drawingType_1_t7;
        $scope.lcAmendAcceptForm1.PaymentPercent_1_t7 = modelData.DATA.paymentPercent_1_t7;
        $scope.lcAmendAcceptForm1.PaymentPortion_1_t7 = modelData.DATA.paymentPortion_1_t7;
        $scope.lcAmendAcceptForm1.Acpt_timeBand_1_t7 = modelData.DATA.acpt_timeBand_1_t7;
        $scope.lcAmendAcceptForm1.AddCoveredAmt_1_t7 = modelData.DATA.addCoveredAmt_1_t7;
        $scope.lcAmendAcceptForm1.PortLimitRef_1_t7 = modelData.DATA.portLimitRef_1_t7;
        $scope.lcAmendAcceptForm1.PortionOverdrawn_1_t7 = modelData.DATA.portionOverdrawn_1_t7;
        $scope.lcAmendAcceptForm1.RevolvingType_t7 = modelData.DATA.revolvingType_t7;
        $scope.lcAmendAcceptForm1.NoofRevolutions_t7 = modelData.DATA.noofRevolutions_t7;
        $scope.lcAmendAcceptForm1.RevolvingFqy_t7 = modelData.DATA.revolvingFqy_t7;
        $scope.lcAmendAcceptForm1.LimitforRevolving_t7 = modelData.DATA.limitforRevolving_t7;
        $scope.lcAmendAcceptForm1.Cur_Revol_Liab_t7 = modelData.DATA.cur_Revol_Liab_t7;
        $scope.lcAmendAcceptForm1.DocumentId_t8 = modelData.DATA.documentId_t8;
        $scope.lcAmendAcceptForm1.DocumentsCode_1_t8 = modelData.DATA.documentsCode_1_t8;
        $scope.lcAmendAcceptForm1.ADocumentsText_1_t8 = modelData.DATA.aDocumentsText_1_t8;
        $scope.lcAmendAcceptForm1.ADocumentsRequired_t8 = modelData.DATA.aDocumentsRequired_t8;
        $scope.lcAmendAcceptForm1.AAdditionalConditions_1_t8 = modelData.DATA.aAdditionalConditions_1_t8;
        $scope.lcAmendAcceptForm1.MT700_1_20Docy_CreditNumber = modelData.DATA.mT700_1_20Docy_CreditNumber;
        $scope.lcAmendAcceptForm1.MT700_1_23ReferencetoPreAdvice = modelData.DATA.mT700_1_23ReferencetoPreAdvice;
       // $scope.lcAmendAcceptForm1.MT700_1_31CDateofIssue = new Date(modelData.DATA.MT700_1_31CDateofIssue.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendAcceptForm1.MT700_1_31CDateofIssue = (new Date(modelData.DATA.MT700_1_31CDateofIssue), "MM/dd/yyyy", "IST");
        $scope.lcAmendAcceptForm1.MT700_1_40EApplicableRuleCodes = modelData.DATA.mT700_1_40EApplicableRuleCodes;
        $scope.lcAmendAcceptForm1.MT700_1_31DDateofExpiry = (new Date(modelData.DATA.mT700_1_31DDateofExpiry), "MM/dd/yyyy", "IST");
        $scope.lcAmendAcceptForm1.MT700_1_31DPlaceofExpiry = modelData.DATA.mT700_1_31DPlaceofExpiry;
        $scope.lcAmendAcceptForm1.MT700_1_51aADApplicantBank_1 = modelData.DATA.mT700_1_51aADApplicantBank_1;
        $scope.lcAmendAcceptForm1.MT700_1_50Applicant_1 = modelData.DATA.mT700_1_50Applicant_1;
        $scope.lcAmendAcceptForm1.MT700_1_59Beneficiary_1 = modelData.DATA.mT700_1_59Beneficiary_1;
        $scope.lcAmendAcceptForm1.MT700_1_32BCurrencyCode_Amount = modelData.DATA.mT700_1_32BCurrencyCode_Amount;
        $scope.lcAmendAcceptForm1.MT700_1_39APercentgCrAmtTolerance = modelData.DATA.mT700_1_39APercentgCrAmtTolerance;
        $scope.lcAmendAcceptForm1.MT700_1_39APercentgDrAmtTolerance = modelData.DATA.mT700_1_39APercentgDrAmtTolerance;
        $scope.lcAmendAcceptForm1.MT700_1_39BMaximumCreditAmt = modelData.DATA.mT700_1_39BMaximumCreditAmt;
        $scope.lcAmendAcceptForm1.MT700_1_39CAddlAmountsCovered_1 = modelData.DATA.mT700_1_39CAddlAmountsCovered_1;
        $scope.lcAmendAcceptForm1.MT700_1_41aAAvailableWith = modelData.DATA.mT700_1_41aAAvailableWith;
        $scope.lcAmendAcceptForm1.MT700_1_41aDAvailablewith_1 = modelData.DATA.mT700_1_41aDAvailablewith_1;
        $scope.lcAmendAcceptForm1.MT700_1_AvailableBy = modelData.DATA.mT700_1_AvailableBy;
        $scope.lcAmendAcceptForm1.MT700_1_42CDraftsat_1 = modelData.DATA.mT700_1_42CDraftsat_1;
        $scope.lcAmendAcceptForm1.MT700_1_42aADraweeID = modelData.DATA.mT700_1_42aADraweeID;
        $scope.lcAmendAcceptForm1.MT700_1_42aDDraweeName_1 = modelData.DATA.mT700_1_42aDDraweeName_1;
        $scope.lcAmendAcceptForm1.MT700_1_42MMixedPaymentDetails_1 = modelData.DATA.mT700_1_42MMixedPaymentDetails_1;
        $scope.lcAmendAcceptForm1.MT700_1_42PDeferredPaymentDetails_1 = modelData.DATA.mT700_1_42PDeferredPaymentDetails_1;
        $scope.lcAmendAcceptForm1.MT700_1_43PPartialShipments = modelData.DATA.mT700_1_43PPartialShipments;
        $scope.lcAmendAcceptForm1.MT700_1_43TTranshipment = modelData.DATA.mT700_1_43TTranshipment;
        $scope.lcAmendAcceptForm1.MT700_1_44APlaceofTakinginCharge = modelData.DATA.mT700_1_44APlaceofTakinginCharge;
        $scope.lcAmendAcceptForm1.MT700_1_44EPortofLoading = modelData.DATA.mT700_1_44EPortofLoading;
        $scope.lcAmendAcceptForm1.MT700_1_44FPortofDischarge = modelData.DATA.mT700_1_44FPortofDischarge;
        $scope.lcAmendAcceptForm1.MT700_1_44BFinalDestination = modelData.DATA.mT700_1_44BFinalDestination;
        $scope.lcAmendAcceptForm1.MT700_1_44CLatestDateofShipment = modelData.DATA.mT700_1_44CLatestDateofShipment;
        $scope.lcAmendAcceptForm1.MT700_1_44DShipmentPeriod_1 = modelData.DATA.mT700_1_44DShipmentPeriod_1;
        $scope.lcAmendAcceptForm1.MT700_1_45ADescriptionofGoods = modelData.DATA.mT700_1_45ADescriptionofGoods;
        $scope.lcAmendAcceptForm1.MT700_1_46ADocumentsRequiredCode_1 = modelData.DATA.mT700_1_46ADocumentsRequiredCode_1;
        $scope.lcAmendAcceptForm1.MT700_1_46ADocumentsRequired_1 = modelData.DATA.mT700_1_46ADocumentsRequired_1;
        $scope.lcAmendAcceptForm1.MT700_1_46ADocumentsRequired = modelData.DATA.mT700_1_46ADocumentsRequired;
        $scope.lcAmendAcceptForm1.MT700_1_47AAdditionalConditions_1 = modelData.DATA.mT700_1_47AAdditionalConditions_1;
        $scope.lcAmendAcceptForm1.MT700_1_47AAdditionalConditions = modelData.DATA.mT700_1_47AAdditionalConditions;
        $scope.lcAmendAcceptForm1.MT700_1_71BCharges = modelData.DATA.mT700_1_71BCharges;
        $scope.lcAmendAcceptForm1.MT700_1_48PeriodforPresentation = modelData.DATA.mT700_1_48PeriodforPresentation;
        $scope.lcAmendAcceptForm1.MT700_1_49ConfirmationInstructions = modelData.DATA.mT700_1_49ConfirmationInstructions;
        $scope.lcAmendAcceptForm1.MT700_1_53aAReimbursingBank = modelData.DATA.mT700_1_53aAReimbursingBank;
        $scope.lcAmendAcceptForm1.MT700_1_53aDReimbursingBank_1 = modelData.DATA.mT700_1_53aDReimbursingBank_1;
        $scope.lcAmendAcceptForm1.MT700_1_78InstructionstotheBank = modelData.DATA.mT700_1_78InstructionstotheBank;
        $scope.lcAmendAcceptForm1.MT700_1_57aAAdviseThroughBank = modelData.DATA.mT700_1_57aAAdviseThroughBank;
        $scope.lcAmendAcceptForm1.MT700_1_57aDAdviseThroughBank_1 = modelData.DATA.mT700_1_57aDAdviseThroughBank_1;
        $scope.lcAmendAcceptForm1.MT700_1_72SendertoReceiverInfo_1 = modelData.DATA.mT700_1_72SendertoReceiverInfo_1;
        $scope.lcAmendAcceptForm1.MT740_MT740SenttoBankId = modelData.DATA.mT740_MT740SenttoBankId;
        $scope.lcAmendAcceptForm1.MT740_MT740SenttoBankName = modelData.DATA.mT740_MT740SenttoBankName;
        $scope.lcAmendAcceptForm1.MT740_SendMT740withLC = modelData.DATA.mT740_SendMT740withLC;
        $scope.lcAmendAcceptForm1.MT740_20Docy_CreditNumber = modelData.DATA.mT740_20Docy_CreditNumber;
        $scope.lcAmendAcceptForm1.MT740_25AccountIdentification = modelData.DATA.mT740_25AccountIdentification;
        $scope.lcAmendAcceptForm1.MT740_31DDateofExpiry = modelData.DATA.mT740_31DDateofExpiry;
        $scope.lcAmendAcceptForm1.MT740_31DPlaceofExpiry = modelData.DATA.mT740_31DPlaceofExpiry;
        $scope.lcAmendAcceptForm1.MT740_58aADNegotiatingBank_1 = modelData.DATA.mT740_58aADNegotiatingBank_1;
        $scope.lcAmendAcceptForm1.MT740_59Beneficiary = modelData.DATA.mT740_59Beneficiary;
        $scope.lcAmendAcceptForm1.MT740_59Beneficiary_1 = modelData.DATA.mT740_59Beneficiary_1;
        $scope.lcAmendAcceptForm1.MT740_32BLCCurrency = modelData.DATA.mT740_32BLCCurrency;
        $scope.lcAmendAcceptForm1.MT740_39ACreditTolerance = modelData.DATA.mT740_39ACreditTolerance;
        $scope.lcAmendAcceptForm1.MT740_39ADebitTolerance = modelData.DATA.mT740_39ADebitTolerance;
        $scope.lcAmendAcceptForm1.MT740_39BMaximumCreditAmt = modelData.DATA.mT740_39BMaximumCreditAmt;
        $scope.lcAmendAcceptForm1.MT740_39CAddlAmountsCovered_1 = modelData.DATA.mT740_39CAddlAmountsCovered_1;
        $scope.lcAmendAcceptForm1.MT740_40FApplicableRuleCodes = modelData.DATA.mT740_40FApplicableRuleCodes;
        $scope.lcAmendAcceptForm1.MT740_41aAAvailableWith = modelData.DATA.mT740_41aAAvailableWith;
        $scope.lcAmendAcceptForm1.MT740_41aDAvailablewith_1 = modelData.DATA.mT740_41aDAvailablewith_1;
        $scope.lcAmendAcceptForm1.MT740_42CDraftsat_1 = modelData.DATA.mT740_42CDraftsat_1;
        $scope.lcAmendAcceptForm1.MT740_42aADrawee = modelData.DATA.mT740_42aADrawee;
        $scope.lcAmendAcceptForm1.MT740_42aDDrawee_1 = modelData.DATA.mT740_42aDDrawee_1;
        $scope.lcAmendAcceptForm1.MT740_42MMixedPaymentDetails_1 = modelData.DATA.mT740_42MMixedPaymentDetails_1;
        $scope.lcAmendAcceptForm1.MT740_42PDeferredPaymentDetails_1 = modelData.DATA.mT740_42PDeferredPaymentDetails_1;
        $scope.lcAmendAcceptForm1.MT740_71AReimbursingBankCharges = modelData.DATA.mT740_71AReimbursingBankCharges;
        $scope.lcAmendAcceptForm1.MT740_71BOtherCharges_1 = modelData.DATA.mT740_71BOtherCharges_1;
        $scope.lcAmendAcceptForm1.MT740_72SendertoReceiverInfo_1 = modelData.DATA.mT740_72SendertoReceiverInfo_1;
                        });

                    $scope.amendAcceptLC = () => {
						
						//console.log("$scope.ToSendValue",$scope.ToSendValue);
						//	var recordValues = $scope.ToSendValue;
                        /*    var recordValues ;
							recordValues.lcId = $scope.lcAmendAcceptForm1.newLcNumber;
							recordValues.lcRequestNumber = $scope.lcAmendAcceptForm1.newLcRequestNumber ;
							recordValues.lCAmount_t1 = $scope.lcAmendAcceptForm1.newLCAmount_t1;
							recordValues.lCExpiryDate_t1 = $scope.lcAmendAcceptForm1.newLCExpiryDate_t1;
							recordValues.lCExpiryPlace_t1 = $scope.lcAmendAcceptForm1.newLCExpiryPlace_t1;
							recordValues.lcNumberOfAmendments = $scope.lcAmendAcceptForm1.newLcNumberOfAmendments;
							recordValues.amendmentDetails = $scope.lcAmendAcceptForm1.newAmendmentDetails;
							recordValues.status = "AMENDED";*/

                    const amendAcceptLOC = {
							lcId : $scope.lcAmendAcceptForm1.newLcNumber,
							lcAmendReqId : $scope.lcAmendAcceptForm1.newLcRequestNumber ,
							lCAmount_t1 :($scope.lcAmendAcceptForm1.newLCAmount_t1).toString(),
							//lCAmount_t1 :(($scope.lcAmendAcceptForm1.newLCAmount_t1)+""),
							//lCAmount_t1 : "100000",
							//lcAmendAdvisingBankRef:"",
							//modeOfShipment_t1:"",
							//lCExpiryDate_t1 : $scope.lcAmendAcceptForm1.newLCExpiryDate_t1,
							//lCExpiryDate_t1 : $filter('date')($scope.lcAmendAcceptForm1.newLCExpiryDate_t1,  "MM/dd/yyyy",  "IST"),
							lCExpiryDate_t1 : $scope.lcAmendAcceptForm1.newLCExpiryDate_t1,
							lCExpiryPlace_t1 : $scope.lcAmendAcceptForm1.newLCExpiryPlace_t1,
							status : "AMENDED",
							lcNumberOfAmendments: $scope.lcAmendAcceptForm1.newLcNumberOfAmendments,
							amendmentDetails : $scope.lcAmendAcceptForm1.newAmendmentDetails,
                                };
								
								
								
								console.log("amendAccept LOC object  ",amendAcceptLOC);
                                    const acceptLCEndpoint =
                                        apiBaseURL +"/lc-amend";


                                   $http.post(acceptLCEndpoint, angular.toJson(amendAcceptLOC)).then(
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
						
						
            $scope.otherBankList = [];
            
            const BeneficiaryIDval = $scope.lcAmendAcceptForm1.BeneficiaryID_t2;
            console.log("customerChange", BeneficiaryIDval)
            $http.get(apiBaseURL + "/customer/detail/custID/" + BeneficiaryIDval).then(function (response) {
                $scope.lcAmendAcceptForm1.BeneficiaryAddress_t2 = response.data[0].customeraddress;
console.log("response.data[0].customeraddress   ",response.data[0].bank);
                $http.get(apiBaseURL + "/bank/otherBanks/" + response.data[0].bank).then(function (response) {
                    bankList = response;
                    console.log('bankList', bankList);
                    for (var j = 0; j < bankList.data.length; j++) {
                        console.log('bankListLoop', bankList.data[j]);
                        $scope.otherBankList.push(bankList.data[j]);
                    };
                });
            });
            console.log("otherBankList  ",$scope.otherBankList);
		
		
		
		
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
							
    $scope.back = () => {
        if ($cookieStore.get('customer')) {
          //  shareidCustomer.tab = 2;

            $location.path("/customerHome");
        } else {
         //   shareid.tab = 2;
            $location.path("/employeeHome");
        }
    }

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
//AMEND ACCEPT CONTROLLER END HERE
//====================================================================================================================================================================================
