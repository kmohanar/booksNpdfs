app.controller('amendController', function ($scope, $interval, $uibModal, $rootScope, $http, $location, $cookies, $filter, $window, $cookieStore, rootValues, shareidCustomer, shareid, shareidCustomer) {
    const nodePort = $location.port();
	const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";
	
    console.log("AmenwwwwdID ID ===>",$rootScope.AmendID,"  node is ",$scope.node," username is ",$scope.username);
                     const cusID1 = $cookieStore.get('customer');
/* 
    $scope.getUploads = () => {
        //console.log("id",$scope.lcRequestNumber);
        //   console.log("id",$scope.lcOpenForm.LcRequestNumber);
        $http.get("http://" + window.__env.apiUrl + ":10009/getfilenames/" + $scope.lcRequestNumber).then(function (response) {
            //console.log("upload response",response);
            //console.log("upload response1",$scope.id);
            $scope.choices = response.data;
            for (var i = 0; i < $scope.choices.length; i++) {
                $scope.choices;
                // console.log("response.data in bill",i,">>>>>",$scope.choices[i]);
            };

        })
    } */

    $scope.Downlod = (choice) => {
        var tempId = $scope.lcRequestNumber;
        console.log("choice", choice);
        //$scope.id=tempId;
        console.log("$scope.id", tempId);
        $http.get("http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice).then(function (response) {
            // console.log("response download",response);
            console.log("http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice);
            $window.location.href  =  "http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice;
        })
    }
	
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
	
//full record changes start
        $scope.lctype = ['SELECT', 'SIGHT', 'USANCE', 'MIXED'];
        $scope.incoTerms = ['CFR-Cost and freight', 'CIF-Cost,Insurance and freight', 'CIP-Carriage and Insurance paid to', 'CPT-Carriage paid to', 'DAF-Delivered at Frontier', 'DAP-Delivered at place', 'DAT-Delivered at terminal',
            'DDP-Delivered duty paid', 'DDU-Delivered duty unpaid', 'DEQ-Delivered Ex Quay', 'DES-Delivered Ex ship', 'EXW-Ex Works', 'FAS-Free Alongside Ship', 'FCA-Free carrier', 'FOB-Free on board'
        ];

        $scope.otherOfficer = ['Implementation', 'Retail Banking Manager-Others', 'Retail Banking User 3', 'Retail Banking User 4', 'Treasury Dealer', 'Treasury Supervisor',
            'Chief Treasury Dealer -Corporate', 'Chief Treasury Dealer -Interbank', 'Securities Dealer', 'Securities Back Office User', 'Chief Securities Dealer', 'Private Corporate Action Officer', 'PBO Settlement Analyst', 'Private Credit Officer', 'Teller 2'
        ];
        $scope.accountOfficer = ['Implementation', 'Retail Banking Manager-Others', 'Retail Banking User 3', 'Retail Banking User 4', 'Treasury Dealer', 'Treasury Supervisor',
            'Chief Treasury Dealer -Corporate', 'Chief Treasury Dealer -Interbank', 'Securities Dealer', 'Securities Back Office User', 'Chief Securities Dealer', 'Private Corporate Action Officer', 'PBO Settlement Analyst', 'Private Credit Officer', 'Teller 2'
        ];
        $scope.chargeCodeDrop = ['LCADVISE', 'LCAMEND', 'LCCHASER', 'LCCONFIRM', 'LCCOURIER', 'LCDISCNT', 'LCDISCREP', 'LCINCOLL', 'LCNEGO', 'LCOPENAMRT', 'LCOUTCOLL', 'LCREIMB', 'LCSLAMEND', 'LCSLCONFIRM', 'LCSLNEGO', 'LCSLOPEN', 'LCSLOPENCP', 'LCSWIFT', 'LCTRFR'];
        $scope.partyChargedDD = ['Beneficiary', 'Opener', 'Third Party'];
        $scope.ChargeStatusDD = ['Collected', 'Charges Claimed'];
        $scope.commissionCodeDD = ['LCACCEPT', 'LCCOMM', 'LCISSUE', 'LCOPEN'];
        $scope.commissionFrequencyDD = ['BOTH', 'FIRST', 'INSURANCE', 'LAST'];
        $scope.accrualParamDD = ['Daily', 'Weekly', 'Monthly', 'Defined', 'Business Day'];
        $scope.applicableRuleCodes = ['Eucp Latest Version', 'Eucpurr Latest Version', 'Isp Latest Version', 'othr', 'Ucp Latest Version', 'Ucpurr Latest Version']
        $scope.lccurrency = ['USD','AED','AMD','ARS','AUD','AZN','CAD','CHF','EUR','GBP'];
		$scope.marginDebitAccount_t6= ['CAD1091500010001	CAD			-250.00',
'CAD1591500010001	CAD			500.00',
'CAD	CAD			4,402,614.23',
'CAD	CAD			281,000.00',
'CHF1280000020001	CHF			375.60',
'CHF1400500010001	CHF			-1,625,000.00',
'CHF1404400010001	CHF			-42.96',
'CHF1418500540001	CHF			0.00'];
$scope.MarginCreditAcct_t6 = ['CAD1091500010001	CAD			-250.00',
'CAD1591500010001	CAD			500.00',
'CAD	CAD			4,402,614.23',
'CAD	CAD			281,000.00',
'CHF1280000020001	CHF			375.60',
'CHF1400500010001	CHF			-1,625,000.00',
'CHF1404400010001	CHF			-42.96',
'CHF1418500540001	CHF			0.00'];

$scope.DrawingType_1_t7 = ['AC','DP','MX','SP'];
$scope.LimitforRevolving_t7 = ['Single'];
$scope.DocumentId_t8 = ['100160','100160-BL','100160-CO'];
$scope.AAdditionalConditions_1_t8 = ['100160','100343'];
$scope.MT700_1_42aADraweeID = ['111616','111613','190144','100436','190032'];
$scope.MT700_1_53aAReimbursingBank = ['111616','111613','190144','100436','190032'];
$scope.MT700_1_57aAAdviseThroughBank = ['111616','111613','190144','100436','190032'];
$scope.MT700_1_47AAdditionalConditions_1 = ['100160-CPT-AIR','100160-DISCRP','100160-LCNUM'];
$scope.MT740_MT740SenttoBankId = ['111616','111613','190144','100436','190032'];
$scope.MT740_42aADrawee = ['111616','111613','190144','100436','190032'];
//$scope.CommissionClaimed_t4 = $scope.lcAmendForm.CommissionClaimed_t4;
//full record changes end
	
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
        //$scope.getUploads();
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);

    $scope.CurrentDate = new Date();

    if ($cookieStore.get('customer')) {
        $scope.username = $cookieStore.get('customer');
    } else {
        $scope.username = $cookieStore.get('employee');
    }

    if ($cookieStore.get('customer')) {
        $scope.lcRequestNumber = shareidCustomer.lcRequestNumber;
    } else {
        $scope.lcRequestNumber = shareid.lcRequestNumber;
    }

    $scope.validateNode = function () {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 0;
            $scope.link = '#customerHome';
            $location.path("/customerHome");
        } else {
            shareid.tab = 0;
            $scope.link = '#employeeHome';
            $location.path("/employeeHome");
        }
    };
	
    $scope.lcViewBack = function () {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 1;
            $location.path("/customerHome");
        } else {
            shareid.tab = 1;
            $location.path("/employeeHome");
        }
    };


	
    $scope.formError = false;
        $scope.lcAmendForm1 = {};
		
				var pattern = /(\d{2})(\d{2})(\d{4})/;
	    const oldValues = shareidCustomer.oldRec.DATA;
	//	var IdValue = (oldValues.lcRequestNumber).split('-')[2];
		var IdValue = (oldValues.lcRequestNumber).split('-', 3).join('-');
		console.log("modelData.DATA.importSightPmtLCType_t1",shareidCustomer.oldRec.DATA.importSightPmtLCType_t1);	
		console.log("oldValues oldValues",oldValues);
		console.log("oldValues.lCExpiryDate_t1",oldValues.lCExpiryDate_t1);
        $scope.lcAmendForm1.newLcRequestNumber = IdValue+"-0"+(oldValues.lcNumberOfAmendments+1);
        $scope.lcAmendForm1.newLCAmount_t1 = oldValues.lCAmount_t1;
        //$scope.lcAmendForm1.newLCExpiryDate_t1 = $filter('date')(new Date(oldValues.lCExpiryDate_t1), "MM/dd/yyyy", "IST");
		$scope.lcAmendForm1.newLCExpiryDate_t1 = new Date(oldValues.lCExpiryDate_t1.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendForm1.newLCExpiryPlace_t1 = oldValues.lCExpiryPlace_t1;
       // $scope.lcAmendForm1.newadvisingBankRef = oldValues.advisingBankID_t2;
		$scope.lcAmendForm1.newLcNumberOfAmendments = oldValues.lcNumberOfAmendments+1;
		$scope.lcAmendForm1.newLcNumber = oldValues.lcId;

$http.get(apiBaseURL + "/lcRequestID").then(function (response) {
	//$scope.lcAmendForm1.LcRequestNumber = lcreqid;
 // var lcreqid = "LC-"+response.data;
 // console.log("lcreqid",lcreqid, $scope.lcAmendForm1.LcRequestNumber)

             })
			 
			 
			 
//assign old values start

        const modelData = shareidCustomer.oldRec;
		console.log("modelData",modelData);
		console.log("modelData.DATA.lcId",modelData.DATA.lcId);
		
		var pattern = /(\d{2})(\d{2})(\d{4})/;
        $scope.lcAmendForm1.LcRequestNumber = modelData.DATA.lcId;
        $scope.lcAmendForm1.ImportSightPmtLCType_t1 = modelData.DATA.importSightPmtLCType_t1;
        $scope.lcAmendForm1.ApplicantID_t1 = modelData.DATA.applicantID_t1;
        $scope.lcAmendForm1.ApplicantAddress_t1 = modelData.DATA.applicantAddress_t1;
        $scope.lcAmendForm1.LCCurrency_t1 = modelData.DATA.lCCurrency_t1;
        $scope.lcAmendForm1.LCAmount_t1 = modelData.DATA.lCAmount_t1;
        $scope.lcAmendForm1.CreditTolerance_t1 = modelData.DATA.creditTolerance_t1;
        $scope.lcAmendForm1.DebitTolerance_t1 = modelData.DATA.debitTolerance_t1;
        $scope.lcAmendForm1.LCIssueDate_t1 = modelData.DATA.lCIssueDate_t1;
        //$scope.lcAmendForm1.ShipmentDate_t1 = $filter('date')(new Date(modelData.DATA.shipmentDate_t1),  "MM/dd/yyyy",  "IST");
		$scope.lcAmendForm1.ShipmentDate_t1 = new Date(modelData.DATA.shipmentDate_t1.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendForm1.LCExpiryDate_t1 = modelData.DATA.lCExpiryDate_t1;
        //$scope.lcAmendForm1.LiablityReversalDate_t1 = $filter('date')(new Date(modelData.DATA.liablityReversalDate_t1), "MM/dd/yyyy",  "IST");
		$scope.lcAmendForm1.LiablityReversalDate_t1 = new Date(modelData.DATA.liablityReversalDate_t1.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendForm1.PresentationDays_t1 = modelData.DATA.presentationDays_t1;
        $scope.lcAmendForm1.LCExpiryPlace_t1 = modelData.DATA.lCExpiryPlace_t1;
        $scope.lcAmendForm1.IncoTerms_t1 = modelData.DATA.incoTerms_t1;
        $scope.lcAmendForm1.ModeOfShipment_t1 = modelData.DATA.modeOfShipment_t1;
        $scope.lcAmendForm1.LimitReference_t1 = modelData.DATA.limitReference_t1;
        $scope.lcAmendForm1.AutoExpiry_t1 = modelData.DATA.autoExpiry_t1;
        $scope.lcAmendForm1.OtherOfficer_t1 = modelData.DATA.otherOfficer_t1;
        $scope.lcAmendForm1.AccountOfficer_t1 = modelData.DATA.accountOfficer_t1;
        $scope.lcAmendForm1.PortfolioApplicant_t1 = modelData.DATA.portfolioApplicant_t1;
        $scope.lcAmendForm1.PortfolioBeneficiary_t1 = modelData.DATA.portfolioBeneficiary_t1;
        $scope.lcAmendForm1.BeneficiaryID_t2 = modelData.DATA.beneficiaryID_t2;
        $scope.lcAmendForm1.AdvisingThroughBank_t2 = modelData.DATA.advisingThroughBank_t2;
        $scope.lcAmendForm1.BeneficiaryAddress_t2 = modelData.DATA.beneficiaryAddress_t2;
        $scope.lcAmendForm1.AdvisingBankAddress_t2 = modelData.DATA.advisingBankAddress_t2;
        $scope.lcAmendForm1.AvailableWithBankID_t2 = modelData.DATA.availableWithBankID_t2;
        $scope.lcAmendForm1.AdvisingBankID_t2 = modelData.DATA.advisingBankID_t2;
        $scope.lcAmendForm1.ReimbusingBank_t2 = modelData.DATA.reimbusingBank_t2;
        $scope.lcAmendForm1.ChargesFrom_t3 = modelData.DATA.chargesFrom_t3;
        $scope.lcAmendForm1.ChargeDefaultAcct_t3 = modelData.DATA.chargeDefaultAcct_t3;
        $scope.lcAmendForm1.ChargeCode_t3 = modelData.DATA.chargeCode_t3;
        $scope.lcAmendForm1.PartyCharged_t3 = modelData.DATA.partyCharged_t3;
        $scope.lcAmendForm1.ChargeDebitAcct_t3 = modelData.DATA.chargeDebitAcct_t3;
        $scope.lcAmendForm1.ChargeCurrency_t3 = modelData.DATA.chargeCurrency_t3;
        $scope.lcAmendForm1.ChargeExchangeRate_t3 = modelData.DATA.chargeExchangeRate_t3;
        $scope.lcAmendForm1.WaiveCharges_t3 = modelData.DATA.waiveCharges_t3;
        $scope.lcAmendForm1.ChargeAmount_t3 = modelData.DATA.chargeAmount_t3;
        $scope.lcAmendForm1.AmortiseCharges_t3 = modelData.DATA.amortiseCharges_t3;
        $scope.lcAmendForm1.ChargeStatus_t3 = modelData.DATA.chargeStatus_t3;
        $scope.lcAmendForm1.TaxCurrency_t3 = modelData.DATA.taxCurrency_t3;
        $scope.lcAmendForm1.CommissionCode_t4 = modelData.DATA.commissionCode_t4;
        $scope.lcAmendForm1.CommissionParty_t4 = modelData.DATA.commissionParty_t4;
        $scope.lcAmendForm1.CommissionFrequency_t4 = modelData.DATA.commissionFrequency_t4;
        $scope.lcAmendForm1.CommissionRate_t4 = modelData.DATA.commissionRate_t4;
        $scope.lcAmendForm1.AccrualParam_t4 = modelData.DATA.accrualParam_t4;
        $scope.lcAmendForm1.FixedCommissionAmount_t4 = modelData.DATA.fixedCommissionAmount_t4;
        $scope.lcAmendForm1.CommissionAccount_t4 = modelData.DATA.commissionAccount_t4;
        $scope.lcAmendForm1.CommissionExchangeRate_t4 = modelData.DATA.commissionExchangeRate_t4;
        $scope.lcAmendForm1.CommissionClaimed_t4 = modelData.DATA.commissionClaimed_t4;
        $scope.lcAmendForm1.BackForward_t4 = modelData.DATA.backForward_t4;
        $scope.lcAmendForm1.ReturnCommission_t4 = modelData.DATA.returnCommission_t4;
        $scope.lcAmendForm1.SLRefTranche_t5 = modelData.DATA.sLRefTranche_t5;
        $scope.lcAmendForm1.ProductType_t5 = modelData.DATA.productType_t5;
        $scope.lcAmendForm1.BaseCcyRate_t5 = modelData.DATA.baseCcyRate_t5;
        $scope.lcAmendForm1.Participator_t5 = modelData.DATA.participator_t5;
        $scope.lcAmendForm1.PartShare_t5 = modelData.DATA.partShare_t5;
        $scope.lcAmendForm1.PartAmount_t5 = modelData.DATA.partAmount_t5;
        $scope.lcAmendForm1.SyndicateCharge_t5 = modelData.DATA.syndicateCharge_t5;
        $scope.lcAmendForm1.OwnPartAmt_t5 = modelData.DATA.ownPartAmt_t5;
        $scope.lcAmendForm1.BankToBankInfo_t5 = modelData.DATA.bankToBankInfo_t5;
        $scope.lcAmendForm1.MT799Message_t5 = modelData.DATA.mT799Message_t5;
        $scope.lcAmendForm1.MarginRequired_t6 = modelData.DATA.marginRequired_t6;
        $scope.lcAmendForm1.MarginCalcBase_t6 = modelData.DATA.marginCalcBase_t6;
        $scope.lcAmendForm1.MarginPercent_t6 = modelData.DATA.marginPercent_t6;
        $scope.lcAmendForm1.MarginDebitAccount_t6 = modelData.DATA.marginDebitAccount_t6;
        $scope.lcAmendForm1.MarginAmount_t6 = modelData.DATA.marginAmount_t6;
        $scope.lcAmendForm1.MarginExchangeRate_t6 = modelData.DATA.marginExchangeRate_t6;
        $scope.lcAmendForm1.MarginCreditAcct_t6 = modelData.DATA.marginCreditAcct_t6;
        $scope.lcAmendForm1.LimitwithProvision_t6 = modelData.DATA.limitwithProvision_t6;
        $scope.lcAmendForm1.DrawingType_1_t7 = modelData.DATA.drawingType_1_t7;
        $scope.lcAmendForm1.PaymentPercent_1_t7 = modelData.DATA.paymentPercent_1_t7;
        $scope.lcAmendForm1.PaymentPortion_1_t7 = modelData.DATA.paymentPortion_1_t7;
        $scope.lcAmendForm1.Acpt_timeBand_1_t7 = modelData.DATA.acpt_timeBand_1_t7;
        $scope.lcAmendForm1.AddCoveredAmt_1_t7 = modelData.DATA.addCoveredAmt_1_t7;
        $scope.lcAmendForm1.PortLimitRef_1_t7 = modelData.DATA.portLimitRef_1_t7;
        $scope.lcAmendForm1.PortionOverdrawn_1_t7 = modelData.DATA.portionOverdrawn_1_t7;
        $scope.lcAmendForm1.RevolvingType_t7 = modelData.DATA.revolvingType_t7;
        $scope.lcAmendForm1.NoofRevolutions_t7 = modelData.DATA.noofRevolutions_t7;
        $scope.lcAmendForm1.RevolvingFqy_t7 = modelData.DATA.revolvingFqy_t7;
        $scope.lcAmendForm1.LimitforRevolving_t7 = modelData.DATA.limitforRevolving_t7;
        $scope.lcAmendForm1.Cur_Revol_Liab_t7 = modelData.DATA.cur_Revol_Liab_t7;
        $scope.lcAmendForm1.DocumentId_t8 = modelData.DATA.documentId_t8;
        $scope.lcAmendForm1.DocumentsCode_1_t8 = modelData.DATA.documentsCode_1_t8;
        $scope.lcAmendForm1.ADocumentsText_1_t8 = modelData.DATA.aDocumentsText_1_t8;
        $scope.lcAmendForm1.ADocumentsRequired_t8 = modelData.DATA.aDocumentsRequired_t8;
        $scope.lcAmendForm1.AAdditionalConditions_1_t8 = modelData.DATA.aAdditionalConditions_1_t8;
        $scope.lcAmendForm1.MT700_1_20Docy_CreditNumber = modelData.DATA.mT700_1_20Docy_CreditNumber;
        $scope.lcAmendForm1.MT700_1_23ReferencetoPreAdvice = modelData.DATA.mT700_1_23ReferencetoPreAdvice;
        //$scope.lcAmendForm1.MT700_1_31CDateofIssue = $filter('date')(new Date(modelData.DATA.MT700_1_31CDateofIssue), "MM/dd/yyyy",  "IST");
		$scope.lcAmendForm1.MT700_1_31CDateofIssue = (new Date(modelData.DATA.MT700_1_31CDateofIssue), "MM/dd/yyyy", "IST");
        $scope.lcAmendForm1.MT700_1_40EApplicableRuleCodes = modelData.DATA.mT700_1_40EApplicableRuleCodes;
        //$scope.lcAmendForm1.MT700_1_31DDateofExpiry = $filter('date')(new Date(modelData.DATA.mT700_1_31DDateofExpiry), "MM/dd/yyyy",  "IST");
		$scope.lcAmendForm1.MT700_1_31DDateofExpiry = new Date(modelData.DATA.mT700_1_31DDateofExpiry.replace(pattern, '$1-$2-$3'));
        $scope.lcAmendForm1.MT700_1_31DPlaceofExpiry = modelData.DATA.mT700_1_31DPlaceofExpiry;
        $scope.lcAmendForm1.MT700_1_51aADApplicantBank_1 = modelData.DATA.mT700_1_51aADApplicantBank_1;
        $scope.lcAmendForm1.MT700_1_50Applicant_1 = modelData.DATA.mT700_1_50Applicant_1;
        $scope.lcAmendForm1.MT700_1_59Beneficiary_1 = modelData.DATA.mT700_1_59Beneficiary_1;
        $scope.lcAmendForm1.MT700_1_32BCurrencyCode_Amount = modelData.DATA.mT700_1_32BCurrencyCode_Amount;
        $scope.lcAmendForm1.MT700_1_39APercentgCrAmtTolerance = modelData.DATA.mT700_1_39APercentgCrAmtTolerance;
        $scope.lcAmendForm1.MT700_1_39APercentgDrAmtTolerance = modelData.DATA.mT700_1_39APercentgDrAmtTolerance;
        $scope.lcAmendForm1.MT700_1_39BMaximumCreditAmt = modelData.DATA.mT700_1_39BMaximumCreditAmt;
        $scope.lcAmendForm1.MT700_1_39CAddlAmountsCovered_1 = modelData.DATA.mT700_1_39CAddlAmountsCovered_1;
        $scope.lcAmendForm1.MT700_1_41aAAvailableWith = modelData.DATA.mT700_1_41aAAvailableWith;
        $scope.lcAmendForm1.MT700_1_41aDAvailablewith_1 = modelData.DATA.mT700_1_41aDAvailablewith_1;
        $scope.lcAmendForm1.MT700_1_AvailableBy = modelData.DATA.mT700_1_AvailableBy;
        $scope.lcAmendForm1.MT700_1_42CDraftsat_1 = modelData.DATA.mT700_1_42CDraftsat_1;
        $scope.lcAmendForm1.MT700_1_42aADraweeID = modelData.DATA.mT700_1_42aADraweeID;
        $scope.lcAmendForm1.MT700_1_42aDDraweeName_1 = modelData.DATA.mT700_1_42aDDraweeName_1;
        $scope.lcAmendForm1.MT700_1_42MMixedPaymentDetails_1 = modelData.DATA.mT700_1_42MMixedPaymentDetails_1;
        $scope.lcAmendForm1.MT700_1_42PDeferredPaymentDetails_1 = modelData.DATA.mT700_1_42PDeferredPaymentDetails_1;
        $scope.lcAmendForm1.MT700_1_43PPartialShipments = modelData.DATA.mT700_1_43PPartialShipments;
        $scope.lcAmendForm1.MT700_1_43TTranshipment = modelData.DATA.mT700_1_43TTranshipment;
        $scope.lcAmendForm1.MT700_1_44APlaceofTakinginCharge = modelData.DATA.mT700_1_44APlaceofTakinginCharge;
        $scope.lcAmendForm1.MT700_1_44EPortofLoading = modelData.DATA.mT700_1_44EPortofLoading;
        $scope.lcAmendForm1.MT700_1_44FPortofDischarge = modelData.DATA.mT700_1_44FPortofDischarge;
        $scope.lcAmendForm1.MT700_1_44BFinalDestination = modelData.DATA.mT700_1_44BFinalDestination;
        $scope.lcAmendForm1.MT700_1_44CLatestDateofShipment = modelData.DATA.mT700_1_44CLatestDateofShipment;
        $scope.lcAmendForm1.MT700_1_44DShipmentPeriod_1 = modelData.DATA.mT700_1_44DShipmentPeriod_1;
        $scope.lcAmendForm1.MT700_1_45ADescriptionofGoods = modelData.DATA.mT700_1_45ADescriptionofGoods;
        $scope.lcAmendForm1.MT700_1_46ADocumentsRequiredCode_1 = modelData.DATA.mT700_1_46ADocumentsRequiredCode_1;
        $scope.lcAmendForm1.MT700_1_46ADocumentsRequired_1 = modelData.DATA.mT700_1_46ADocumentsRequired_1;
        $scope.lcAmendForm1.MT700_1_46ADocumentsRequired = modelData.DATA.mT700_1_46ADocumentsRequired;
        $scope.lcAmendForm1.MT700_1_47AAdditionalConditions_1 = modelData.DATA.mT700_1_47AAdditionalConditions_1;
        $scope.lcAmendForm1.MT700_1_47AAdditionalConditions = modelData.DATA.mT700_1_47AAdditionalConditions;
        $scope.lcAmendForm1.MT700_1_71BCharges = modelData.DATA.mT700_1_71BCharges;
        $scope.lcAmendForm1.MT700_1_48PeriodforPresentation = modelData.DATA.mT700_1_48PeriodforPresentation;
        $scope.lcAmendForm1.MT700_1_49ConfirmationInstructions = modelData.DATA.mT700_1_49ConfirmationInstructions;
        $scope.lcAmendForm1.MT700_1_53aAReimbursingBank = modelData.DATA.mT700_1_53aAReimbursingBank;
        $scope.lcAmendForm1.MT700_1_53aDReimbursingBank_1 = modelData.DATA.mT700_1_53aDReimbursingBank_1;
        $scope.lcAmendForm1.MT700_1_78InstructionstotheBank = modelData.DATA.mT700_1_78InstructionstotheBank;
        $scope.lcAmendForm1.MT700_1_57aAAdviseThroughBank = modelData.DATA.mT700_1_57aAAdviseThroughBank;
        $scope.lcAmendForm1.MT700_1_57aDAdviseThroughBank_1 = modelData.DATA.mT700_1_57aDAdviseThroughBank_1;
        $scope.lcAmendForm1.MT700_1_72SendertoReceiverInfo_1 = modelData.DATA.mT700_1_72SendertoReceiverInfo_1;
        $scope.lcAmendForm1.MT740_MT740SenttoBankId = modelData.DATA.mT740_MT740SenttoBankId;
        $scope.lcAmendForm1.MT740_MT740SenttoBankName = modelData.DATA.mT740_MT740SenttoBankName;
        $scope.lcAmendForm1.MT740_SendMT740withLC = modelData.DATA.mT740_SendMT740withLC;
        $scope.lcAmendForm1.MT740_20Docy_CreditNumber = modelData.DATA.mT740_20Docy_CreditNumber;
        $scope.lcAmendForm1.MT740_25AccountIdentification = modelData.DATA.mT740_25AccountIdentification;
        $scope.lcAmendForm1.MT740_31DDateofExpiry = modelData.DATA.mT740_31DDateofExpiry;
        $scope.lcAmendForm1.MT740_31DPlaceofExpiry = modelData.DATA.mT740_31DPlaceofExpiry;
        $scope.lcAmendForm1.MT740_58aADNegotiatingBank_1 = modelData.DATA.mT740_58aADNegotiatingBank_1;
        $scope.lcAmendForm1.MT740_59Beneficiary = modelData.DATA.mT740_59Beneficiary;
        $scope.lcAmendForm1.MT740_59Beneficiary_1 = modelData.DATA.mT740_59Beneficiary_1;
        $scope.lcAmendForm1.MT740_32BLCCurrency = modelData.DATA.mT740_32BLCCurrency;
        $scope.lcAmendForm1.MT740_39ACreditTolerance = modelData.DATA.mT740_39ACreditTolerance;
        $scope.lcAmendForm1.MT740_39ADebitTolerance = modelData.DATA.mT740_39ADebitTolerance;
        $scope.lcAmendForm1.MT740_39BMaximumCreditAmt = modelData.DATA.mT740_39BMaximumCreditAmt;
        $scope.lcAmendForm1.MT740_39CAddlAmountsCovered_1 = modelData.DATA.mT740_39CAddlAmountsCovered_1;
        $scope.lcAmendForm1.MT740_40FApplicableRuleCodes = modelData.DATA.mT740_40FApplicableRuleCodes;
        $scope.lcAmendForm1.MT740_41aAAvailableWith = modelData.DATA.mT740_41aAAvailableWith;
        $scope.lcAmendForm1.MT740_41aDAvailablewith_1 = modelData.DATA.mT740_41aDAvailablewith_1;
        $scope.lcAmendForm1.MT740_42CDraftsat_1 = modelData.DATA.mT740_42CDraftsat_1;
        $scope.lcAmendForm1.MT740_42aADrawee = modelData.DATA.mT740_42aADrawee;
        $scope.lcAmendForm1.MT740_42aDDrawee_1 = modelData.DATA.mT740_42aDDrawee_1;
        $scope.lcAmendForm1.MT740_42MMixedPaymentDetails_1 = modelData.DATA.mT740_42MMixedPaymentDetails_1;
        $scope.lcAmendForm1.MT740_42PDeferredPaymentDetails_1 = modelData.DATA.mT740_42PDeferredPaymentDetails_1;
        $scope.lcAmendForm1.MT740_71AReimbursingBankCharges = modelData.DATA.mT740_71AReimbursingBankCharges;
        $scope.lcAmendForm1.MT740_71BOtherCharges_1 = modelData.DATA.mT740_71BOtherCharges_1;
        $scope.lcAmendForm1.MT740_72SendertoReceiverInfo_1 = modelData.DATA.mT740_72SendertoReceiverInfo_1;

//assign old values ends
			 
//		$scope.documentsReceived = request.documents;
//		$scope.documentTypeReceived = request.documentType;


/*
            $scope.otherBankList = [];
            
            const BeneficiaryIDval = $scope.lcAmendForm1.BeneficiaryID_t2;
            console.log("customerChange", BeneficiaryIDval)
            $http.get(apiBaseURL + "/customer/detail/custID/" + BeneficiaryIDval).then(function (response) {
                $scope.lcAmendForm1.BeneficiaryAddress_t2 = response.data[0].customeraddress;
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
            console.log("otherBankList  ",$scope.otherBankList)


        $scope.applicantAddressUpdate = function () {
            console.log("ApplicantID_t1 applicantAddressUpdate", $scope.lcAmendForm1.ApplicantID_t1)
            const applicantAddressUpdateval = $scope.lcAmendForm1.ApplicantID_t1;
            $http.get(apiBaseURL + "/customer/detail/custID/" + applicantAddressUpdateval).then(function (response) {
                $scope.lcAmendForm1.ApplicantAddress_t1 = response.data[0].customeraddress;
            });
        };

        $scope.advisingBankChange = function () {
            console.log("AdvisingThroughBankIDval", $scope.lcAmendForm1.AdvisingThroughBank_t2)
            const AdvisingThroughBankIDval = $scope.lcAmendForm1.AdvisingThroughBank_t2;
            $http.get(apiBaseURL + "/bank/bankAddress/" + AdvisingThroughBankIDval).then(function (response) {
                $scope.lcAmendForm1.AdvisingBankAddress_t2 = response.data[0].address;
            });
        };
*/


$scope.lcAmendBtnDisable= () => {
console.log("lcAmendBtnDisable lcAmendBtnDisable lcAmendBtnDisable",$scope.lcAmendForm1.newLCAmount_t1 , $scope.lcAmendForm1.LCAmount_t1 ,  $filter('date')($scope.lcAmendForm1.newLCExpiryDate_t1, "MM/dd/yyyy", "IST"),$scope.lcAmendForm1.LCExpiryDate_t1 , $scope.lcAmendForm1.newLCExpiryPlace_t1 , $scope.lcAmendForm1.LCExpiryPlace_t1);
	
if($scope.lcAmendForm1.newLCAmount_t1 == $scope.lcAmendForm1.LCAmount_t1 && $filter('date')($scope.lcAmendForm1.newLCExpiryDate_t1, "MM/dd/yyyy", "IST")==$scope.lcAmendForm1.LCExpiryDate_t1 && $scope.lcAmendForm1.newLCExpiryPlace_t1 == $scope.lcAmendForm1.LCExpiryPlace_t1){
console.log("inside if amend");
return false;
}
else {
console.log("inside else amend");
return true;
}
return true;
}

	

            $scope.otherBankList = [];
            
            const BeneficiaryIDval = $scope.lcAmendForm1.BeneficiaryID_t2;
            console.log("customerChange", BeneficiaryIDval)
            $http.get(apiBaseURL + "/customer/detail/custID/" + BeneficiaryIDval).then(function (response) {
                $scope.lcAmendForm1.BeneficiaryAddress_t2 = response.data[0].customeraddress;
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
			
			//back button function
			
			$scope.lcAmendBack = function () {
				if ($cookieStore.get('customer')) {
					shareidCustomer.tab = 2;
					$location.path("/customerHome");
				} else {
					shareid.tab = 2;
					$location.path("/employeeHome");
				}
			};
			
			
			//end
			
			

                     $scope.amendLC = () => {
       const amendLOC = {
											//lcId :shareidCustomer.oldRec.DATA.lcId,
											lcId :$scope.lcAmendForm1.newLcNumber,
											lcAmendReqId :$scope.lcAmendForm1.newLcRequestNumber,
											lCAmount_t1 :$scope.lcAmendForm1.newLCAmount_t1,
											LCExpiryDate_t1 :$scope.lcAmendForm1.newLCExpiryDate_t1,
											LCExpiryPlace_t1 :$scope.lcAmendForm1.newLCExpiryPlace_t1,
											//LcNumberOfAmendments :$scope.lcAmendForm1.LcNumberOfAmendments,
											LcNumberOfAmendments :$scope.lcAmendForm1.newLcNumberOfAmendments,
										//	AdvisingBankRef :$scope.lcAmendForm1.advisingBankRef,
											Status : "AmendRequested",
										    AmendmentDetails : $scope.lcAmendForm1.newAmendmentDetails,
											ModeOfShipment_t1:"",
											beneficiaryId :$scope.lcAmendForm1.BeneficiaryID_t2,
											advisingBankID :$scope.lcAmendForm1.AdvisingBankAddress_t2,
											applicantCustomer :$scope.lcAmendForm1.ApplicantID_t1,
											applicantBank :$scope.lcAmendForm1.AdvisingThroughBank_t2			
						   };

                 /*  const amendLOC = {
											lcId :"1234",
											lcAmendReqId :"1234",
											lCAmount_t1 :"1234",
											LCExpiryDate_t1 :"1234",
											LCExpiryPlace_t1 :"1234",
											LcNumberOfAmendments :"1234",
											AdvisingBankRef :"1234",
											Status : "AmendRequested",
											ModeOfShipment_t1:"field" 
						   };*/
                            /*     if($scope.lcAmendForm.amendbeneficiarybank == null){
                                                                      alert("Advising Bank Ref Cannot Be Empty");
                                                                  }
                                 else{*/
                                console.log("amendloc value---",amendLOC);
                                const amendLCEndpoint = apiBaseURL +"/lcamendreq";
                                //console.log("approve LOC object  ",approveLOC);
                                    $http.post(amendLCEndpoint, amendLOC).then(
                                    function(result){
                                     // success callback
                                     console.log("INSIDE SUCCESS FUNCTION");
									 shareidCustomer.tab=1;
                                     displayMessage(result);
                                     $location.path("/customerHome");
                                     },
                                     function(result){
                                     // failure callback
                                     console.log("INSIDE ERROR FUNCTION");
                                     displayMessage(result);
                                        }
                                     );
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
								 
});
								 
//});
