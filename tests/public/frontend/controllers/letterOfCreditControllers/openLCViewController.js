app.controller('openLCViewController', function ($http,$sce,$window, $interval, $uibModal, $location, shareidCustomer, $rootScope, $scope, $cookies, $cookieStore, $filter, rootValues, shareid,shareidCustomer) {


    $scope.getUploads = () => {
        //console.log("id",$scope.id);
        //   console.log("id",$scope.lcOpenForm.LcRequestNumber);
        $http.get("http://" + window.__env.apiUrl + ":10009/getfilenames/" + $scope.id).then(function (response) {
            //console.log("upload response",response);
            //console.log("upload response1",$scope.id);
            $scope.choices = response.data;
            for (var i = 0; i < $scope.choices.length; i++) {
                $scope.choices;
                //console.log("response.data in bill",i,">>>>>",$scope.choices[i]);
            };

        })
    }


    $scope.Downlod = (choice) => {

        var tempId = $scope.id;

        console.log("choice", choice);
        //$scope.id=tempId;
        console.log("$scope.id", $scope.id);
        $http.get("http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice).then(function (response) {
            console.log("response download", response);
            console.log("http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice);
            $window.location.href = "http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice;

        })
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
	

    var tick = function () {
      //  $scope.getUploads();
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);

    $scope.CurrentDate = new Date();
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

    /* $scope.lcRequestID = shareid.lcID;
    //$scope.lcRequestID = 1234;
    console.log("lcRequestID   ",$scope.lcRequestID); */

    if ($cookieStore.get('customer')) {
        $scope.lcRequestID = shareidCustomer.lcID;
    } else {
        $scope.lcRequestID = shareid.lcID;
    }

    $scope.message = 'Open Letter of Credits ';


    $scope.node = $rootScope.thisNode;
    if ($cookieStore.get('customer')) {
        $scope.username = $cookieStore.get('customer');
    } else {
        $scope.username = $cookieStore.get('employee');
    }




    $scope.lcOpenViewForm = {};
    $scope.formError = false;
    const nodePort = $location.port();
    const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";

    const getObj = apiBaseURL + "/employee-lc-orders/" + $scope.lcRequestID;

    $http.get(getObj).then(function (response) {
        var modelData = response.data;
        console.log("modelData in open view controller====>", response.data.DATA);
        console.log("modelData in open view controller====>", modelData.DATA.lcId);

        $scope.lcOpenViewForm.LcRequestNumber = modelData.DATA.lcId;

        var tempId = modelData.DATA.lcRequestNumber;
        console.log("tempId ", tempId);
        $scope.id = tempId;

        $scope.lcOpenViewForm.ImportSightPmtLCType_t1 = modelData.DATA.importSightPmtLCType_t1;
        $scope.lcOpenViewForm.ApplicantID_t1 = modelData.DATA.applicantID_t1;
        $scope.lcOpenViewForm.ApplicantAddress_t1 = modelData.DATA.applicantAddress_t1;
        $scope.lcOpenViewForm.LCCurrency_t1 = modelData.DATA.lCCurrency_t1;
        //$scope.lcOpenViewForm.LCAmount_t1 = modelData.DATA.lCAmount_t1;
        $scope.lcOpenViewForm.CreditTolerance_t1 = modelData.DATA.creditTolerance_t1;
        $scope.lcOpenViewForm.DebitTolerance_t1 = modelData.DATA.debitTolerance_t1;
        $scope.lcOpenViewForm.LCIssueDate_t1 = modelData.DATA.lCIssueDate_t1;
        $scope.lcOpenViewForm.ShipmentDate_t1 = $filter('date')(new Date(modelData.DATA.shipmentDate_t1),  "MM/dd/yyyy",  "IST");
        //$scope.lcOpenViewForm.LCExpiryDate_t1 = modelData.DATA.lCExpiryDate_t1;
        $scope.lcOpenViewForm.LiablityReversalDate_t1 = $filter('date')(new Date(modelData.DATA.liablityReversalDate_t1), "MM/dd/yyyy",  "IST");
        $scope.lcOpenViewForm.PresentationDays_t1 = modelData.DATA.presentationDays_t1;
        //$scope.lcOpenViewForm.LCExpiryPlace_t1 = modelData.DATA.lCExpiryPlace_t1;
        $scope.lcOpenViewForm.IncoTerms_t1 = modelData.DATA.incoTerms_t1;
        $scope.lcOpenViewForm.ModeOfShipment_t1 = modelData.DATA.modeOfShipment_t1;
        $scope.lcOpenViewForm.LimitReference_t1 = modelData.DATA.limitReference_t1;
        $scope.lcOpenViewForm.AutoExpiry_t1 = modelData.DATA.autoExpiry_t1;
        $scope.lcOpenViewForm.OtherOfficer_t1 = modelData.DATA.otherOfficer_t1;
        $scope.lcOpenViewForm.AccountOfficer_t1 = modelData.DATA.accountOfficer_t1;
        $scope.lcOpenViewForm.PortfolioApplicant_t1 = modelData.DATA.portfolioApplicant_t1;
        $scope.lcOpenViewForm.PortfolioBeneficiary_t1 = modelData.DATA.portfolioBeneficiary_t1;
        $scope.lcOpenViewForm.BeneficiaryID_t2 = modelData.DATA.beneficiaryID_t2;
        $scope.lcOpenViewForm.AdvisingThroughBank_t2 = modelData.DATA.advisingThroughBank_t2;
        $scope.lcOpenViewForm.BeneficiaryAddress_t2 = modelData.DATA.beneficiaryAddress_t2;
        $scope.lcOpenViewForm.AdvisingBankAddress_t2 = modelData.DATA.advisingBankAddress_t2;
        $scope.lcOpenViewForm.AvailableWithBankID_t2 = modelData.DATA.availableWithBankID_t2;
        $scope.lcOpenViewForm.AdvisingBankID_t2 = modelData.DATA.advisingBankID_t2;
        $scope.lcOpenViewForm.ReimbusingBank_t2 = modelData.DATA.reimbusingBank_t2;
        $scope.lcOpenViewForm.ChargesFrom_t3 = modelData.DATA.chargesFrom_t3;
        $scope.lcOpenViewForm.ChargeDefaultAcct_t3 = modelData.DATA.chargeDefaultAcct_t3;
        $scope.lcOpenViewForm.ChargeCode_t3 = modelData.DATA.chargeCode_t3;
        $scope.lcOpenViewForm.PartyCharged_t3 = modelData.DATA.partyCharged_t3;
        $scope.lcOpenViewForm.ChargeDebitAcct_t3 = modelData.DATA.chargeDebitAcct_t3;
        $scope.lcOpenViewForm.ChargeCurrency_t3 = modelData.DATA.chargeCurrency_t3;
        $scope.lcOpenViewForm.ChargeExchangeRate_t3 = modelData.DATA.chargeExchangeRate_t3;
        $scope.lcOpenViewForm.WaiveCharges_t3 = modelData.DATA.waiveCharges_t3;
        $scope.lcOpenViewForm.ChargeAmount_t3 = modelData.DATA.chargeAmount_t3;
        $scope.lcOpenViewForm.AmortiseCharges_t3 = modelData.DATA.amortiseCharges_t3;
        $scope.lcOpenViewForm.ChargeStatus_t3 = modelData.DATA.chargeStatus_t3;
        $scope.lcOpenViewForm.TaxCurrency_t3 = modelData.DATA.taxCurrency_t3;
        $scope.lcOpenViewForm.CommissionCode_t4 = modelData.DATA.commissionCode_t4;
        $scope.lcOpenViewForm.CommissionParty_t4 = modelData.DATA.commissionParty_t4;
        $scope.lcOpenViewForm.CommissionFrequency_t4 = modelData.DATA.commissionFrequency_t4;
        $scope.lcOpenViewForm.CommissionRate_t4 = modelData.DATA.commissionRate_t4;
        $scope.lcOpenViewForm.AccrualParam_t4 = modelData.DATA.accrualParam_t4;
        $scope.lcOpenViewForm.FixedCommissionAmount_t4 = modelData.DATA.fixedCommissionAmount_t4;
        $scope.lcOpenViewForm.CommissionAccount_t4 = modelData.DATA.commissionAccount_t4;
        $scope.lcOpenViewForm.CommissionExchangeRate_t4 = modelData.DATA.commissionExchangeRate_t4;
        $scope.lcOpenViewForm.CommissionClaimed_t4 = modelData.DATA.commissionClaimed_t4;
        $scope.lcOpenViewForm.BackForward_t4 = modelData.DATA.backForward_t4;
        $scope.lcOpenViewForm.ReturnCommission_t4 = modelData.DATA.returnCommission_t4;
        $scope.lcOpenViewForm.SLRefTranche_t5 = modelData.DATA.sLRefTranche_t5;
        $scope.lcOpenViewForm.ProductType_t5 = modelData.DATA.productType_t5;
        $scope.lcOpenViewForm.BaseCcyRate_t5 = modelData.DATA.baseCcyRate_t5;
        $scope.lcOpenViewForm.Participator_t5 = modelData.DATA.participator_t5;
        $scope.lcOpenViewForm.PartShare_t5 = modelData.DATA.partShare_t5;
        $scope.lcOpenViewForm.PartAmount_t5 = modelData.DATA.partAmount_t5;
        $scope.lcOpenViewForm.SyndicateCharge_t5 = modelData.DATA.syndicateCharge_t5;
        $scope.lcOpenViewForm.OwnPartAmt_t5 = modelData.DATA.ownPartAmt_t5;
        $scope.lcOpenViewForm.BankToBankInfo_t5 = modelData.DATA.bankToBankInfo_t5;
        $scope.lcOpenViewForm.MT799Message_t5 = modelData.DATA.mT799Message_t5;
        $scope.lcOpenViewForm.MarginRequired_t6 = modelData.DATA.marginRequired_t6;
        $scope.lcOpenViewForm.MarginCalcBase_t6 = modelData.DATA.marginCalcBase_t6;
        $scope.lcOpenViewForm.MarginPercent_t6 = modelData.DATA.marginPercent_t6;
        $scope.lcOpenViewForm.MarginDebitAccount_t6 = modelData.DATA.marginDebitAccount_t6;
        $scope.lcOpenViewForm.MarginAmount_t6 = modelData.DATA.marginAmount_t6;
        $scope.lcOpenViewForm.MarginExchangeRate_t6 = modelData.DATA.marginExchangeRate_t6;
        $scope.lcOpenViewForm.MarginCreditAcct_t6 = modelData.DATA.marginCreditAcct_t6;
        $scope.lcOpenViewForm.LimitwithProvision_t6 = modelData.DATA.limitwithProvision_t6;
        $scope.lcOpenViewForm.DrawingType_1_t7 = modelData.DATA.drawingType_1_t7;
        $scope.lcOpenViewForm.PaymentPercent_1_t7 = modelData.DATA.paymentPercent_1_t7;
        $scope.lcOpenViewForm.PaymentPortion_1_t7 = modelData.DATA.paymentPortion_1_t7;
        $scope.lcOpenViewForm.Acpt_timeBand_1_t7 = modelData.DATA.acpt_timeBand_1_t7;
        $scope.lcOpenViewForm.AddCoveredAmt_1_t7 = modelData.DATA.addCoveredAmt_1_t7;
        $scope.lcOpenViewForm.PortLimitRef_1_t7 = modelData.DATA.portLimitRef_1_t7;
        $scope.lcOpenViewForm.PortionOverdrawn_1_t7 = modelData.DATA.portionOverdrawn_1_t7;
        $scope.lcOpenViewForm.RevolvingType_t7 = modelData.DATA.revolvingType_t7;
        $scope.lcOpenViewForm.NoofRevolutions_t7 = modelData.DATA.noofRevolutions_t7;
        $scope.lcOpenViewForm.RevolvingFqy_t7 = modelData.DATA.revolvingFqy_t7;
        $scope.lcOpenViewForm.LimitforRevolving_t7 = modelData.DATA.limitforRevolving_t7;
        $scope.lcOpenViewForm.Cur_Revol_Liab_t7 = modelData.DATA.cur_Revol_Liab_t7;
        $scope.lcOpenViewForm.DocumentId_t8 = modelData.DATA.documentId_t8;
        $scope.lcOpenViewForm.DocumentsCode_1_t8 = modelData.DATA.documentsCode_1_t8;
        $scope.lcOpenViewForm.ADocumentsText_1_t8 = modelData.DATA.aDocumentsText_1_t8;
        $scope.lcOpenViewForm.ADocumentsRequired_t8 = modelData.DATA.aDocumentsRequired_t8;
        $scope.lcOpenViewForm.AAdditionalConditions_1_t8 = modelData.DATA.aAdditionalConditions_1_t8;
        $scope.lcOpenViewForm.MT700_1_20Docy_CreditNumber = modelData.DATA.mT700_1_20Docy_CreditNumber;
        $scope.lcOpenViewForm.MT700_1_23ReferencetoPreAdvice = modelData.DATA.mT700_1_23ReferencetoPreAdvice;
        $scope.lcOpenViewForm.MT700_1_31CDateofIssue = $filter('date')(new Date(modelData.DATA.MT700_1_31CDateofIssue), "MM/dd/yyyy",  "IST");
        $scope.lcOpenViewForm.MT700_1_40EApplicableRuleCodes = modelData.DATA.mT700_1_40EApplicableRuleCodes;
        $scope.lcOpenViewForm.MT700_1_31DDateofExpiry = $filter('date')(new Date(modelData.DATA.mT700_1_31DDateofExpiry), "MM/dd/yyyy",  "IST");
        $scope.lcOpenViewForm.MT700_1_31DPlaceofExpiry = modelData.DATA.mT700_1_31DPlaceofExpiry;
        $scope.lcOpenViewForm.MT700_1_51aADApplicantBank_1 = modelData.DATA.mT700_1_51aADApplicantBank_1;
        $scope.lcOpenViewForm.MT700_1_50Applicant_1 = modelData.DATA.mT700_1_50Applicant_1;
        $scope.lcOpenViewForm.MT700_1_59Beneficiary_1 = modelData.DATA.mT700_1_59Beneficiary_1;
        $scope.lcOpenViewForm.MT700_1_32BCurrencyCode_Amount = modelData.DATA.mT700_1_32BCurrencyCode_Amount;
        $scope.lcOpenViewForm.MT700_1_39APercentgCrAmtTolerance = modelData.DATA.mT700_1_39APercentgCrAmtTolerance;
        $scope.lcOpenViewForm.MT700_1_39APercentgDrAmtTolerance = modelData.DATA.mT700_1_39APercentgDrAmtTolerance;
        $scope.lcOpenViewForm.MT700_1_39BMaximumCreditAmt = modelData.DATA.mT700_1_39BMaximumCreditAmt;
        $scope.lcOpenViewForm.MT700_1_39CAddlAmountsCovered_1 = modelData.DATA.mT700_1_39CAddlAmountsCovered_1;
        $scope.lcOpenViewForm.MT700_1_41aAAvailableWith = modelData.DATA.mT700_1_41aAAvailableWith;
        $scope.lcOpenViewForm.MT700_1_41aDAvailablewith_1 = modelData.DATA.mT700_1_41aDAvailablewith_1;
        $scope.lcOpenViewForm.MT700_1_AvailableBy = modelData.DATA.mT700_1_AvailableBy;
        $scope.lcOpenViewForm.MT700_1_42CDraftsat_1 = modelData.DATA.mT700_1_42CDraftsat_1;
        $scope.lcOpenViewForm.MT700_1_42aADraweeID = modelData.DATA.mT700_1_42aADraweeID;
        $scope.lcOpenViewForm.MT700_1_42aDDraweeName_1 = modelData.DATA.mT700_1_42aDDraweeName_1;
        $scope.lcOpenViewForm.MT700_1_42MMixedPaymentDetails_1 = modelData.DATA.mT700_1_42MMixedPaymentDetails_1;
        $scope.lcOpenViewForm.MT700_1_42PDeferredPaymentDetails_1 = modelData.DATA.mT700_1_42PDeferredPaymentDetails_1;
        $scope.lcOpenViewForm.MT700_1_43PPartialShipments = modelData.DATA.mT700_1_43PPartialShipments;
        $scope.lcOpenViewForm.MT700_1_43TTranshipment = modelData.DATA.mT700_1_43TTranshipment;
        $scope.lcOpenViewForm.MT700_1_44APlaceofTakinginCharge = modelData.DATA.mT700_1_44APlaceofTakinginCharge;
        $scope.lcOpenViewForm.MT700_1_44EPortofLoading = modelData.DATA.mT700_1_44EPortofLoading;
        $scope.lcOpenViewForm.MT700_1_44FPortofDischarge = modelData.DATA.mT700_1_44FPortofDischarge;
        $scope.lcOpenViewForm.MT700_1_44BFinalDestination = modelData.DATA.mT700_1_44BFinalDestination;
        $scope.lcOpenViewForm.MT700_1_44CLatestDateofShipment = modelData.DATA.mT700_1_44CLatestDateofShipment;
        $scope.lcOpenViewForm.MT700_1_44DShipmentPeriod_1 = modelData.DATA.mT700_1_44DShipmentPeriod_1;
        $scope.lcOpenViewForm.MT700_1_45ADescriptionofGoods = modelData.DATA.mT700_1_45ADescriptionofGoods;
        $scope.lcOpenViewForm.MT700_1_46ADocumentsRequiredCode_1 = modelData.DATA.mT700_1_46ADocumentsRequiredCode_1;
        $scope.lcOpenViewForm.MT700_1_46ADocumentsRequired_1 = modelData.DATA.mT700_1_46ADocumentsRequired_1;
        $scope.lcOpenViewForm.MT700_1_46ADocumentsRequired = modelData.DATA.mT700_1_46ADocumentsRequired;
        $scope.lcOpenViewForm.MT700_1_47AAdditionalConditions_1 = modelData.DATA.mT700_1_47AAdditionalConditions_1;
        $scope.lcOpenViewForm.MT700_1_47AAdditionalConditions = modelData.DATA.mT700_1_47AAdditionalConditions;
        $scope.lcOpenViewForm.MT700_1_71BCharges = modelData.DATA.mT700_1_71BCharges;
        $scope.lcOpenViewForm.MT700_1_48PeriodforPresentation = modelData.DATA.mT700_1_48PeriodforPresentation;
        $scope.lcOpenViewForm.MT700_1_49ConfirmationInstructions = modelData.DATA.mT700_1_49ConfirmationInstructions;
        $scope.lcOpenViewForm.MT700_1_53aAReimbursingBank = modelData.DATA.mT700_1_53aAReimbursingBank;
        $scope.lcOpenViewForm.MT700_1_53aDReimbursingBank_1 = modelData.DATA.mT700_1_53aDReimbursingBank_1;
        $scope.lcOpenViewForm.MT700_1_78InstructionstotheBank = modelData.DATA.mT700_1_78InstructionstotheBank;
        $scope.lcOpenViewForm.MT700_1_57aAAdviseThroughBank = modelData.DATA.mT700_1_57aAAdviseThroughBank;
        $scope.lcOpenViewForm.MT700_1_57aDAdviseThroughBank_1 = modelData.DATA.mT700_1_57aDAdviseThroughBank_1;
        $scope.lcOpenViewForm.MT700_1_72SendertoReceiverInfo_1 = modelData.DATA.mT700_1_72SendertoReceiverInfo_1;
        $scope.lcOpenViewForm.MT740_MT740SenttoBankId = modelData.DATA.mT740_MT740SenttoBankId;
        $scope.lcOpenViewForm.MT740_MT740SenttoBankName = modelData.DATA.mT740_MT740SenttoBankName;
        $scope.lcOpenViewForm.MT740_SendMT740withLC = modelData.DATA.mT740_SendMT740withLC;
        $scope.lcOpenViewForm.MT740_20Docy_CreditNumber = modelData.DATA.mT740_20Docy_CreditNumber;
        $scope.lcOpenViewForm.MT740_25AccountIdentification = modelData.DATA.mT740_25AccountIdentification;
        $scope.lcOpenViewForm.MT740_31DDateofExpiry = modelData.DATA.mT740_31DDateofExpiry;
        $scope.lcOpenViewForm.MT740_31DPlaceofExpiry = modelData.DATA.mT740_31DPlaceofExpiry;
        $scope.lcOpenViewForm.MT740_58aADNegotiatingBank_1 = modelData.DATA.mT740_58aADNegotiatingBank_1;
        $scope.lcOpenViewForm.MT740_59Beneficiary = modelData.DATA.mT740_59Beneficiary;
        $scope.lcOpenViewForm.MT740_59Beneficiary_1 = modelData.DATA.mT740_59Beneficiary_1;
        $scope.lcOpenViewForm.MT740_32BLCCurrency = modelData.DATA.mT740_32BLCCurrency;
        $scope.lcOpenViewForm.MT740_39ACreditTolerance = modelData.DATA.mT740_39ACreditTolerance;
        $scope.lcOpenViewForm.MT740_39ADebitTolerance = modelData.DATA.mT740_39ADebitTolerance;
        $scope.lcOpenViewForm.MT740_39BMaximumCreditAmt = modelData.DATA.mT740_39BMaximumCreditAmt;
        $scope.lcOpenViewForm.MT740_39CAddlAmountsCovered_1 = modelData.DATA.mT740_39CAddlAmountsCovered_1;
        $scope.lcOpenViewForm.MT740_40FApplicableRuleCodes = modelData.DATA.mT740_40FApplicableRuleCodes;
        $scope.lcOpenViewForm.MT740_41aAAvailableWith = modelData.DATA.mT740_41aAAvailableWith;
        $scope.lcOpenViewForm.MT740_41aDAvailablewith_1 = modelData.DATA.mT740_41aDAvailablewith_1;
        $scope.lcOpenViewForm.MT740_42CDraftsat_1 = modelData.DATA.mT740_42CDraftsat_1;
        $scope.lcOpenViewForm.MT740_42aADrawee = modelData.DATA.mT740_42aADrawee;
        $scope.lcOpenViewForm.MT740_42aDDrawee_1 = modelData.DATA.mT740_42aDDrawee_1;
        $scope.lcOpenViewForm.MT740_42MMixedPaymentDetails_1 = modelData.DATA.mT740_42MMixedPaymentDetails_1;
        $scope.lcOpenViewForm.MT740_42PDeferredPaymentDetails_1 = modelData.DATA.mT740_42PDeferredPaymentDetails_1;
        $scope.lcOpenViewForm.MT740_71AReimbursingBankCharges = modelData.DATA.mT740_71AReimbursingBankCharges;
        $scope.lcOpenViewForm.MT740_71BOtherCharges_1 = modelData.DATA.mT740_71BOtherCharges_1;
        $scope.lcOpenViewForm.MT740_72SendertoReceiverInfo_1 = modelData.DATA.mT740_72SendertoReceiverInfo_1;
		
		//displaying amend values kumar start
            var finalData = response.data;
			var len=finalData.DATA.lcNumberOfAmendments;
            var idVal= parseInt(shareid.selectedVersionID);
			console.log("Received version id from employee controller",shareid.selectedVersionID);

			if (idVal==len){
					$scope.lcOpenViewForm.LCAmount_t1=finalData.DATA.lCAmount_t1;
					$scope.lcOpenViewForm.LCExpiryDate_t1= $filter('date')(new Date(finalData.DATA.lCExpiryDate_t1), "MM/dd/yyyy",  "IST");
					$scope.lcOpenViewForm.LCExpiryPlace_t1=finalData.DATA.lCExpiryPlace_t1;
            }
             else
            {
					$scope.lcOpenViewForm.LCAmount_t1=finalData.DATA.amendArray[idVal].lCAmount_t1;
					$scope.lcOpenViewForm.LCExpiryDate_t1= $filter('date')(new Date(finalData.DATA.amendArray[idVal].lCExpiryDate_t1), "MM/dd/yyyy",  "IST");
					$scope.lcOpenViewForm.LCExpiryPlace_t1=finalData.DATA.amendArray[idVal].lCExpiryPlace_t1;
            }			

			shareid.selectedVersionID = "";
		//displaying amend values kumar end

			
			
			
			console.log("before /api/GetImageDetialById/");
		$http.get(apiBaseURL + "/api/GetImageDetialById/" + "doc"+modelData.DATA.lcId).then(function (response) {
console.log("response /api/GetImageDetialById/",response);
		$scope.documentsReceived = response.data.DATA.docContent;
		$scope.documentTypeReceived = response.data.DATA.docType;
			
                    //console.log("response.data[0].docID",response.data.DATA.docID);
				    //console.log("response.data[0].docContent",response.data.DATA.docContent);
					//console.log("response.data[0].docType",response.data.DATA.docType);
					//console.log("response.data[0].lcId",response.data.DATA.lcId);
		});
		
    });

    $scope.validateNode = function () {
        if ($cookieStore.get('customer')) {
            
            shareidCustomer.tab = 0;
            $scope.link = '#customerHome';
            $location.path("/customerHome");
			console.log("I am inside if back");
        } else {
            shareid.tab = 0;
            $scope.link = '#employeeHome';
            $location.path("/employeeHome");
			console.log("I am inside else back");
        }
      };


    $scope.back = () => {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 2;

            $location.path("/customerHome");
        } else {
            shareid.tab = 2;
            $location.path("/employeeHome");
        }
    }

})