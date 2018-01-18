app.controller('approvalController', function($http,$uibModal,$interval, $location,$rootScope, $scope, $cookies,$cookieStore,shareid) {
var tick = function () {
            $scope.clock = Date.now();
          }
          tick();
          $interval(tick, 1000);

		  
          //tabbed request page starts////////////////////////////////////////////////////
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

          //tabbed request page ends//////////////////////////////////////////////////////

		  
		  
		  
		  
		  
          $scope.CurrentDate = new Date(); 
 if($cookieStore.get('employee')){
                    $scope.message = 'Approve Letter of Credits ';
                    $scope.node = shareid.thisNode;
                     $scope.username = $cookieStore.get('employee');
					 const nodePort = $location.port();
					  const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + "";
					  $scope.LcApproveID = shareid.lcApproveID 
                     console.log("APPROVING ID ===>",shareid.lcApproveID,"  node is ",$scope.node," username is ",$scope.username);
                     const LCReqNumb = $rootScope.ID;

                        $scope.logout = function(){
                        $cookieStore.remove('employee');
                        $location.path("/customer");
                            };
                        $scope.lcApproveForm = {};
                        $scope.formError = false;

                    const cusID1 = $cookieStore.get('employee');
                    const getObj = apiBaseURL + "/employee-lc-orders/"+$scope.LcApproveID;

                    $http.get(getObj).then(function(response){
                    var finalData = response.data;
                    console.log("RESPONSE DATA final", finalData.DATA);                    
					$scope.lcApproveObj = finalData.DATA; 					
					console.log("RESPONSE DATA final status ", finalData.DATA.status);

 $scope.lcApproveForm.LcRequestNumber=finalData.DATA.lcId;
 $scope.lcApproveForm.ImportSightPmtLCType_t1=finalData.DATA.importSightPmtLCType_t1;
 $scope.lcApproveForm.ApplicantID_t1=finalData.DATA.applicantID_t1;
 $scope.lcApproveForm.ApplicantAddress_t1=finalData.DATA.applicantAddress_t1;
 $scope.lcApproveForm.LCCurrency_t1=finalData.DATA.lCCurrency_t1;
 $scope.lcApproveForm.LCAmount_t1=finalData.DATA.lCAmount_t1;
 $scope.lcApproveForm.CreditTolerance_t1=finalData.DATA.creditTolerance_t1;
 $scope.lcApproveForm.DebitTolerance_t1=finalData.DATA.debitTolerance_t1;
 $scope.lcApproveForm.LCIssueDate_t1=finalData.DATA.lCIssueDate_t1;
 $scope.lcApproveForm.ShipmentDate_t1=finalData.DATA.shipmentDate_t1;
 $scope.lcApproveForm.LCExpiryDate_t1=finalData.DATA.lCExpiryDate_t1;
 $scope.lcApproveForm.LiablityReversalDate_t1=finalData.DATA.liablityReversalDate_t1;
 $scope.lcApproveForm.PresentationDays_t1=finalData.DATA.presentationDays_t1;
 $scope.lcApproveForm.LCExpiryPlace_t1=finalData.DATA.lCExpiryPlace_t1;
 $scope.lcApproveForm.IncoTerms_t1=finalData.DATA.incoTerms_t1;
 $scope.lcApproveForm.ModeOfShipment_t1=finalData.DATA.modeOfShipment_t1;
 $scope.lcApproveForm.LimitReference_t1=finalData.DATA.limitReference_t1;
 $scope.lcApproveForm.AutoExpiry_t1=finalData.DATA.autoExpiry_t1;
 $scope.lcApproveForm.OtherOfficer_t1=finalData.DATA.otherOfficer_t1;
 $scope.lcApproveForm.AccountOfficer_t1=finalData.DATA.accountOfficer_t1;
 $scope.lcApproveForm.PortfolioApplicant_t1=finalData.DATA.portfolioApplicant_t1;
 $scope.lcApproveForm.PortfolioBeneficiary_t1=finalData.DATA.portfolioBeneficiary_t1;
 $scope.lcApproveForm.BeneficiaryID_t2=finalData.DATA.beneficiaryID_t2;
 $scope.lcApproveForm.AdvisingThroughBank_t2=finalData.DATA.advisingThroughBank_t2;
 $scope.lcApproveForm.BeneficiaryAddress_t2=finalData.DATA.beneficiaryAddress_t2;
 $scope.lcApproveForm.AdvisingBankAddress_t2=finalData.DATA.advisingBankAddress_t2;
 $scope.lcApproveForm.AvailableWithBankID_t2=finalData.DATA.availableWithBankID_t2;
 $scope.lcApproveForm.AdvisingBankID_t2=finalData.DATA.advisingBankID_t2;
 $scope.lcApproveForm.ReimbusingBank_t2=finalData.DATA.reimbusingBank_t2;
 $scope.lcApproveForm.ChargesFrom_t3=finalData.DATA.chargesFrom_t3;
 $scope.lcApproveForm.ChargeDefaultAcct_t3=finalData.DATA.chargeDefaultAcct_t3;
 $scope.lcApproveForm.ChargeCode_t3=finalData.DATA.chargeCode_t3;
 $scope.lcApproveForm.PartyCharged_t3=finalData.DATA.partyCharged_t3;
 $scope.lcApproveForm.ChargeDebitAcct_t3=finalData.DATA.chargeDebitAcct_t3;
 $scope.lcApproveForm.ChargeCurrency_t3=finalData.DATA.chargeCurrency_t3;
 $scope.lcApproveForm.ChargeExchangeRate_t3=finalData.DATA.chargeExchangeRate_t3;
 $scope.lcApproveForm.WaiveCharges_t3=finalData.DATA.waiveCharges_t3;
 $scope.lcApproveForm.ChargeAmount_t3=finalData.DATA.chargeAmount_t3;
 $scope.lcApproveForm.AmortiseCharges_t3=finalData.DATA.amortiseCharges_t3;
 $scope.lcApproveForm.ChargeStatus_t3=finalData.DATA.chargeStatus_t3;
 $scope.lcApproveForm.TaxCurrency_t3=finalData.DATA.taxCurrency_t3;
 $scope.lcApproveForm.CommissionCode_t4=finalData.DATA.commissionCode_t4;
 $scope.lcApproveForm.CommissionParty_t4=finalData.DATA.commissionParty_t4;
 $scope.lcApproveForm.CommissionFrequency_t4=finalData.DATA.commissionFrequency_t4;
 $scope.lcApproveForm.CommissionRate_t4=finalData.DATA.commissionRate_t4;
 $scope.lcApproveForm.AccrualParam_t4=finalData.DATA.accrualParam_t4;
 $scope.lcApproveForm.FixedCommissionAmount_t4=finalData.DATA.fixedCommissionAmount_t4;
 $scope.lcApproveForm.CommissionAccount_t4=finalData.DATA.commissionAccount_t4;
 $scope.lcApproveForm.CommissionExchangeRate_t4=finalData.DATA.commissionExchangeRate_t4;
 $scope.lcApproveForm.CommissionClaimed_t4=finalData.DATA.commissionClaimed_t4;
 $scope.lcApproveForm.BackForward_t4=finalData.DATA.backForward_t4;
 $scope.lcApproveForm.ReturnCommission_t4=finalData.DATA.returnCommission_t4;
 $scope.lcApproveForm.SLRefTranche_t5=finalData.DATA.sLRefTranche_t5;
 $scope.lcApproveForm.ProductType_t5=finalData.DATA.productType_t5;
 $scope.lcApproveForm.BaseCcyRate_t5=finalData.DATA.baseCcyRate_t5;
 $scope.lcApproveForm.Participator_t5=finalData.DATA.participator_t5;
 $scope.lcApproveForm.PartShare_t5=finalData.DATA.partShare_t5;
 $scope.lcApproveForm.PartAmount_t5=finalData.DATA.partAmount_t5;
 $scope.lcApproveForm.SyndicateCharge_t5=finalData.DATA.syndicateCharge_t5;
 $scope.lcApproveForm.OwnPartAmt_t5=finalData.DATA.ownPartAmt_t5;
 $scope.lcApproveForm.BankToBankInfo_t5=finalData.DATA.bankToBankInfo_t5;
 $scope.lcApproveForm.MT799Message_t5=finalData.DATA.mT799Message_t5;
 $scope.lcApproveForm.MarginRequired_t6=finalData.DATA.marginRequired_t6;
 $scope.lcApproveForm.MarginCalcBase_t6=finalData.DATA.marginCalcBase_t6;
 $scope.lcApproveForm.MarginPercent_t6=finalData.DATA.marginPercent_t6;
 $scope.lcApproveForm.MarginDebitAccount_t6=finalData.DATA.marginDebitAccount_t6;
 $scope.lcApproveForm.MarginAmount_t6=finalData.DATA.marginAmount_t6;
 $scope.lcApproveForm.MarginExchangeRate_t6=finalData.DATA.marginExchangeRate_t6;
 $scope.lcApproveForm.MarginCreditAcct_t6=finalData.DATA.marginCreditAcct_t6;
 $scope.lcApproveForm.LimitwithProvision_t6=finalData.DATA.limitwithProvision_t6;
 $scope.lcApproveForm.DrawingType_1_t7=finalData.DATA.drawingType_1_t7;
 $scope.lcApproveForm.PaymentPercent_1_t7=finalData.DATA.paymentPercent_1_t7;
 $scope.lcApproveForm.PaymentPortion_1_t7=finalData.DATA.paymentPortion_1_t7;
 $scope.lcApproveForm.Acpt_timeBand_1_t7=finalData.DATA.acpt_timeBand_1_t7;
 $scope.lcApproveForm.AddCoveredAmt_1_t7=finalData.DATA.addCoveredAmt_1_t7;
 $scope.lcApproveForm.PortLimitRef_1_t7=finalData.DATA.portLimitRef_1_t7;
 $scope.lcApproveForm.PortionOverdrawn_1_t7=finalData.DATA.portionOverdrawn_1_t7;
 $scope.lcApproveForm.RevolvingType_t7=finalData.DATA.revolvingType_t7;
 $scope.lcApproveForm.NoofRevolutions_t7=finalData.DATA.noofRevolutions_t7;
 $scope.lcApproveForm.RevolvingFqy_t7=finalData.DATA.revolvingFqy_t7;
 $scope.lcApproveForm.LimitforRevolving_t7=finalData.DATA.limitforRevolving_t7;
 $scope.lcApproveForm.Cur_Revol_Liab_t7=finalData.DATA.cur_Revol_Liab_t7;
 $scope.lcApproveForm.DocumentId_t8=finalData.DATA.documentId_t8;
 $scope.lcApproveForm.DocumentsCode_1_t8=finalData.DATA.documentsCode_1_t8;
 $scope.lcApproveForm.ADocumentsText_1_t8=finalData.DATA.aDocumentsText_1_t8;
 $scope.lcApproveForm.ADocumentsRequired_t8=finalData.DATA.aDocumentsRequired_t8;
 $scope.lcApproveForm.AAdditionalConditions_1_t8=finalData.DATA.aAdditionalConditions_1_t8;
 $scope.lcApproveForm.MT700_1_20Docy_CreditNumber=finalData.DATA.mT700_1_20Docy_CreditNumber;
 $scope.lcApproveForm.MT700_1_23ReferencetoPreAdvice=finalData.DATA.mT700_1_23ReferencetoPreAdvice;
 $scope.lcApproveForm.MT700_1_31CDateofIssue=finalData.DATA.MT700_1_31CDateofIssue;
 $scope.lcApproveForm.MT700_1_40EApplicableRuleCodes=finalData.DATA.mT700_1_40EApplicableRuleCodes;
 $scope.lcApproveForm.MT700_1_31DDateofExpiry=finalData.DATA.mT700_1_31DDateofExpiry;
 $scope.lcApproveForm.MT700_1_31DPlaceofExpiry=finalData.DATA.mT700_1_31DPlaceofExpiry;
 $scope.lcApproveForm.MT700_1_51aADApplicantBank_1=finalData.DATA.mT700_1_51aADApplicantBank_1;
 $scope.lcApproveForm.MT700_1_50Applicant_1=finalData.DATA.mT700_1_50Applicant_1;
 $scope.lcApproveForm.MT700_1_59Beneficiary_1=finalData.DATA.mT700_1_59Beneficiary_1;
 $scope.lcApproveForm.MT700_1_32BCurrencyCode_Amount=finalData.DATA.mT700_1_32BCurrencyCode_Amount;
 $scope.lcApproveForm.MT700_1_39APercentgCrAmtTolerance=finalData.DATA.mT700_1_39APercentgCrAmtTolerance;
 $scope.lcApproveForm.MT700_1_39APercentgDrAmtTolerance=finalData.DATA.mT700_1_39APercentgDrAmtTolerance;
 $scope.lcApproveForm.MT700_1_39BMaximumCreditAmt=finalData.DATA.mT700_1_39BMaximumCreditAmt;
 $scope.lcApproveForm.MT700_1_39CAddlAmountsCovered_1=finalData.DATA.mT700_1_39CAddlAmountsCovered_1;
 $scope.lcApproveForm.MT700_1_41aAAvailableWith=finalData.DATA.mT700_1_41aAAvailableWith;
 $scope.lcApproveForm.MT700_1_41aDAvailablewith_1=finalData.DATA.mT700_1_41aDAvailablewith_1;
 $scope.lcApproveForm.MT700_1_AvailableBy=finalData.DATA.mT700_1_AvailableBy;
 $scope.lcApproveForm.MT700_1_42CDraftsat_1=finalData.DATA.mT700_1_42CDraftsat_1;
 $scope.lcApproveForm.MT700_1_42aADraweeID=finalData.DATA.mT700_1_42aADraweeID;
 $scope.lcApproveForm.MT700_1_42aDDraweeName_1=finalData.DATA.mT700_1_42aDDraweeName_1;
 $scope.lcApproveForm.MT700_1_42MMixedPaymentDetails_1=finalData.DATA.mT700_1_42MMixedPaymentDetails_1;
 $scope.lcApproveForm.MT700_1_42PDeferredPaymentDetails_1=finalData.DATA.mT700_1_42PDeferredPaymentDetails_1;
 $scope.lcApproveForm.MT700_1_43PPartialShipments=finalData.DATA.mT700_1_43PPartialShipments;
 $scope.lcApproveForm.MT700_1_43TTranshipment=finalData.DATA.mT700_1_43TTranshipment;
 $scope.lcApproveForm.MT700_1_44APlaceofTakinginCharge=finalData.DATA.mT700_1_44APlaceofTakinginCharge;
 $scope.lcApproveForm.MT700_1_44EPortofLoading=finalData.DATA.mT700_1_44EPortofLoading;
 $scope.lcApproveForm.MT700_1_44FPortofDischarge=finalData.DATA.mT700_1_44FPortofDischarge;
 $scope.lcApproveForm.MT700_1_44BFinalDestination=finalData.DATA.mT700_1_44BFinalDestination;
 $scope.lcApproveForm.MT700_1_44CLatestDateofShipment=finalData.DATA.mT700_1_44CLatestDateofShipment;
 $scope.lcApproveForm.MT700_1_44DShipmentPeriod_1=finalData.DATA.mT700_1_44DShipmentPeriod_1;
 $scope.lcApproveForm.MT700_1_45ADescriptionofGoods=finalData.DATA.mT700_1_45ADescriptionofGoods;
 $scope.lcApproveForm.MT700_1_46ADocumentsRequiredCode_1=finalData.DATA.mT700_1_46ADocumentsRequiredCode_1;
 $scope.lcApproveForm.MT700_1_46ADocumentsRequired_1=finalData.DATA.mT700_1_46ADocumentsRequired_1;
 $scope.lcApproveForm.MT700_1_46ADocumentsRequired=finalData.DATA.mT700_1_46ADocumentsRequired;
 $scope.lcApproveForm.MT700_1_47AAdditionalConditions_1=finalData.DATA.mT700_1_47AAdditionalConditions_1;
 $scope.lcApproveForm.MT700_1_47AAdditionalConditions=finalData.DATA.mT700_1_47AAdditionalConditions;
 $scope.lcApproveForm.MT700_1_71BCharges=finalData.DATA.mT700_1_71BCharges;
 $scope.lcApproveForm.MT700_1_48PeriodforPresentation=finalData.DATA.mT700_1_48PeriodforPresentation;
 $scope.lcApproveForm.MT700_1_49ConfirmationInstructions=finalData.DATA.mT700_1_49ConfirmationInstructions;
 $scope.lcApproveForm.MT700_1_53aAReimbursingBank=finalData.DATA.mT700_1_53aAReimbursingBank;
 $scope.lcApproveForm.MT700_1_53aDReimbursingBank_1=finalData.DATA.mT700_1_53aDReimbursingBank_1;
 $scope.lcApproveForm.MT700_1_78InstructionstotheBank=finalData.DATA.mT700_1_78InstructionstotheBank;
 $scope.lcApproveForm.MT700_1_57aAAdviseThroughBank=finalData.DATA.mT700_1_57aAAdviseThroughBank;
 $scope.lcApproveForm.MT700_1_57aDAdviseThroughBank_1=finalData.DATA.mT700_1_57aDAdviseThroughBank_1;
 $scope.lcApproveForm.MT700_1_72SendertoReceiverInfo_1=finalData.DATA.mT700_1_72SendertoReceiverInfo_1;
 $scope.lcApproveForm.MT740_MT740SenttoBankId=finalData.DATA.mT740_MT740SenttoBankId;
 $scope.lcApproveForm.MT740_MT740SenttoBankName=finalData.DATA.mT740_MT740SenttoBankName;
 $scope.lcApproveForm.MT740_SendMT740withLC=finalData.DATA.mT740_SendMT740withLC;
 $scope.lcApproveForm.MT740_20Docy_CreditNumber=finalData.DATA.mT740_20Docy_CreditNumber;
 $scope.lcApproveForm.MT740_25AccountIdentification=finalData.DATA.mT740_25AccountIdentification;
 $scope.lcApproveForm.MT740_31DDateofExpiry=finalData.DATA.mT740_31DDateofExpiry;
 $scope.lcApproveForm.MT740_31DPlaceofExpiry=finalData.DATA.mT740_31DPlaceofExpiry;
 $scope.lcApproveForm.MT740_58aADNegotiatingBank_1=finalData.DATA.mT740_58aADNegotiatingBank_1;
 $scope.lcApproveForm.MT740_59Beneficiary=finalData.DATA.mT740_59Beneficiary;
 $scope.lcApproveForm.MT740_59Beneficiary_1=finalData.DATA.mT740_59Beneficiary_1;
 $scope.lcApproveForm.MT740_32BLCCurrency=finalData.DATA.mT740_32BLCCurrency;
 $scope.lcApproveForm.MT740_39ACreditTolerance=finalData.DATA.mT740_39ACreditTolerance;
 $scope.lcApproveForm.MT740_39ADebitTolerance=finalData.DATA.mT740_39ADebitTolerance;
 $scope.lcApproveForm.MT740_39BMaximumCreditAmt=finalData.DATA.mT740_39BMaximumCreditAmt;
 $scope.lcApproveForm.MT740_39CAddlAmountsCovered_1=finalData.DATA.mT740_39CAddlAmountsCovered_1;
 $scope.lcApproveForm.MT740_40FApplicableRuleCodes=finalData.DATA.mT740_40FApplicableRuleCodes;
 $scope.lcApproveForm.MT740_41aAAvailableWith=finalData.DATA.mT740_41aAAvailableWith;
 $scope.lcApproveForm.MT740_41aDAvailablewith_1=finalData.DATA.mT740_41aDAvailablewith_1;
 $scope.lcApproveForm.MT740_42CDraftsat_1=finalData.DATA.mT740_42CDraftsat_1;
 $scope.lcApproveForm.MT740_42aADrawee=finalData.DATA.mT740_42aADrawee;
 $scope.lcApproveForm.MT740_42aDDrawee_1=finalData.DATA.mT740_42aDDrawee_1;
 $scope.lcApproveForm.MT740_42MMixedPaymentDetails_1=finalData.DATA.mT740_42MMixedPaymentDetails_1;
 $scope.lcApproveForm.MT740_42PDeferredPaymentDetails_1=finalData.DATA.mT740_42PDeferredPaymentDetails_1;
 $scope.lcApproveForm.MT740_71AReimbursingBankCharges=finalData.DATA.mT740_71AReimbursingBankCharges;
 $scope.lcApproveForm.MT740_71BOtherCharges_1=finalData.DATA.mT740_71BOtherCharges_1;
 $scope.lcApproveForm.MT740_72SendertoReceiverInfo_1=finalData.DATA.mT740_72SendertoReceiverInfo_1;

		$http.get(apiBaseURL + "/api/GetImageDetialById/" + "doc"+finalData.DATA.lcId).then(function (response) {
			console.log("response",response);
			$scope.documentsReceived = response.data.DATA.docContent;
			$scope.documentTypeReceived = response.data.DATA.docType;

                    console.log("response.data[0].docID",response.data.DATA.docID);
					console.log("response.data[0].docContent",response.data.DATA.docContent);
					console.log("response.data[0].docType",response.data.DATA.docType);
					console.log("response.data[0].lcId",response.data.DATA.lcId);
			
		});
 
 
 });


$scope.approveLC = () => {

			$scope.lcApproveObj.status = "ACCEPTED";
			console.log("$scope.lcApproveObj ",$scope.lcApproveObj.status);
				const approveLCEndpoint = apiBaseURL +"/lc-approve";

			   $http.post(approveLCEndpoint, angular.toJson($scope.lcApproveObj)).then(
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
					
				);				
	}
	
        $scope.getAttachedFiles = function (b64Data, contentType, sliceSize) {
		     if($scope.documentsReceived)
			  {
				  console.log("inside if case $scope.documentsReceived", $scope.documentsReceived);
              $scope.convertToImage($scope.documentsReceived, $scope.documentTypeReceived, "");
              console.log($scope.documentsReceived, $scope.documentTypeReceived, "inside getAttachedFiles");
			  }
			  else{
				  console.log("from else case $scope.documentsReceived",);
				  console.log("File not updated");
				  alert("File is not updated for the LC");
			  }
			
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
			console.log("contentType convertToImage",contentType);
			var a = document.createElement('a');
			var docExtension = contentType.split('/')[1];
			var filename = "Document_Blockchain."+docExtension;
			console.log("docExtensionoutside", docExtension);
			if(docExtension == "vnd.openxmlformats-officedocument.wordprocessingml.document")
			{
				console.log("docExtension", docExtension);
				filename = "Word_Document_Blockchain."+"docx";
			}
		    if(docExtension == "png")
			{
				console.log("docExtension", docExtension);
				filename = "Image_File_Blockchain."+"png";
			}
		    if(docExtension == "msword")
			{
				console.log("docExtension", docExtension);
				filename = "MSWord_Document_Blockchain."+"doc";
			}
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
			
			
		};
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

                  });
