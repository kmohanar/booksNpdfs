  //---------------------------------------------------------------------------------------------------------------------------------------------
  //LC Open code after lc request from customer
  //---------------------------------------------------------------------------------------------------------------------------------------------
  //Start
  app.controller('openController', function ($http, $interval, $uibModal, $window, $sce, $window, $rootScope, $location, $scope, $cookies, $cookieStore, $filter, rootValues, shareid, $anchorScroll,$log) {
$scope.lcOpenForm = {};
  ////////////////////////////////////////////////////////
	$scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        /* items: function () {
          return $scope.items;
        } */
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
	  $rootScope.selectedCommissionDate = selectedItem.CommissionDate;
	  $rootScope.selectedCommissionFrequency = selectedItem.string;
	  console.log("$scope.selectedCommissionDate",$rootScope.selectedCommissionDate,$rootScope.selectedCommissionFrequency);
	  $scope.lcOpenForm.CommissionFrequency_t4 = selectedItem.string; 
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  ///////////////////////////////////////////////////////
      /* $scope.getUploads = () => {
          //		 console.log("id",$scope.id);
          //   console.log("id",$scope.lcOpenForm.LcRequestNumber);
          $http.get("http://" + window.__env.apiUrl + ":10009/getfilenames/" + $scope.id).then(function (response) {
              //  console.log("upload response",response);
              //  console.log("upload response1",$scope.id);
              $scope.choices = response.data;
              for (var i = 0; i < $scope.choices.length; i++) {
                  $scope.choices;
                  //  console.log("response.data in bill",i,">>>>>",$scope.choices[i]);
              };

          })
      } */


      $scope.Downlod = (choice) => {

          var tempId = $scope.id;

          console.log("choice", choice);
          //$scope.id=tempId;
          console.log("$scope.id", $scope.id);
          $http.get("http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice).then(function (response) {
              console.log("response download", response);
              console.log("http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice);
              $window.location.href  =  "http://" + window.__env.apiUrl + ":10009/download/" + tempId + "/" + choice;

          })
      }







      var tick = function () {
         /*  $scope.getUploads(); */
          $scope.clock = Date.now();
      }
      tick();
      $interval(tick, 1000);

      $scope.CurrentDate = new Date();
      if ($cookieStore.get('employee')) {
          $scope.scrollTo = function (id) {
              $location.hash(id);
              console.log($location.hash());
              $anchorScroll();
          };

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



          //  $scope.id = rootValues.data1;
          // console.log("rootID",$scope.id);
          $scope.test = shareid.ID;
          //$scope.test =  'LC-REQ-114297723167';
          var sub = $scope.test;
          //var lcRequestID=sub.substring(7);
          var lcRequestID = shareid.ID;

          console.log("id in open", lcRequestID);


          $scope.message = 'Open Letter of Credits ';
          /* const nodePort = $location.port();
          const apiBaseURL = "http://"+window.__env.apiUrl+":" + nodePort + ""; */
          $scope.IsDocReqDisabled = true;
          $scope.node = $rootScope.thisNode;
          $scope.username = $cookieStore.get('employee');
          //console.log("$rootScope.ID:",$rootScope.ID12);
          //  console.log("OPENING ID ===>",$rootScope.ID ," node is ",$scope.node," username is ",$scope.username);
          const LCRequestId = lcRequestID;
          
          $scope.formError = false;

          $scope.logout = function () {
              $cookieStore.remove('employee');
              $location.path("/customer");
          };

          $scope.checkIsDocReqDisabled = function () {
              console.log("checkIsDocReqDisabled --->", $scope.lcOpenForm.DocRequired);
              if ($scope.lcOpenForm.DocRequired != null) {
                  $scope.IsDocReqDisabled = false;
              } else {
                  $scope.IsDocReqDisabled = true;
              }
              console.log("$scope.lcOpenForm.IsDocReqDisabled --->", $scope.IsDocReqDisabled);
          };





          $scope.lctype = ['SELECT', 'SIGHT', 'USANCE', 'MIXED'];
          $scope.incoTerms = ['CFR', 'CIF', 'CIP', 'CPT', 'DAF'];


          /*                      $scope.otherOfficer = ['Implementation', 'Retail Banking Manager-Others', 'Retail Banking User 3', 'Retail Banking User 4', 'Treasury Dealer', 'Treasury Dealer', 'Treasury Supervisor', 'Treasury Supervisor', 'Chief Treasury Dealer -Corporate', 'Chief Treasury Dealer -Interbank', 'Securities Dealer', 'Securities Back Office User', 'Chief Securities Dealer', 'Private Corporate Action Officer', 'PBO Settlement Analyst', 'Private Credit Officer', 'Teller 2', 'Retail Loan Administrator 1', 'Retail Loan Administrator 2', 'Retail Loan Supervisor', 'Mortgage Dept User 2', 'Payments Administrator', 'Payments Supervisor', 'Financial Control Manager', 'Customer Services Manager-Corporate', 'Customer Service Agent', 'Branch Operations Manager', 'Retail Credit Officer', 'Retail Credit Manager', 'Call Centre Agent', 'Teller', 'Head Teller', 'Retail Payments Officer', 'Retail Payments Supervisor', 'Retail Collector', 'Retail Collection Manager', 'Broker Administrator', 'Derivatives Front Office Dealer', 'Derivatives Middle Officer User', 'Derivatives Back Office User', 'Private Corporate Action Officer', 'Credit Officer', 'Credit Officer', 'Credit Manager,Trade Finance Officer', 'Trade Finance Officer', 'Trade Finance Officer', 'Trade Finance Supervisor', 'Credit Officer', 'Credit Manager', 'Corporate Officer', 'Corporate Loan Supervisor', 'Corporate Loan Administrator', 'Corporate Loan Administrator', 'Corporate Loan Supervisor', 'Corporate Customer Service Agent', 'PWM Relationship Manager', 'PWM Relationship Manager', 'PWM Portfolio Administrator', 'PWM Portfolio Advisor', 'Arc Admin User', 'Finance Officer', 'Finance Manager', 'Compliance Officer', 'Import LC Officer', 'Export LC Officer', 'Collections Officer', 'Guarantees Officer', 'Trade Finance Supervisor 1', 'Trade Finance Supervisor 2', 'Trade Finance Manager', 'Treasury', 'Implementation', 'Treasury Forex Dealer', 'Consumer Banking', 'Corporate Banking', 'Treasury', 'Investment Portfolio', 'Support', 'Private Banking Department', 'Treasury Divisional Head', 'Treasury Dealers Manager', 'Treasury Back Office Manager', 'Treasury Back Office Manager', 'Private Banking Divisional Head', 'Private Wealth Manager', 'Securities Middle Officer Manager', 'Securities Back Office Manager', 'Customer Services Divisional Head', 'Retail Banking Manager', 'Main Cashiers', 'Foreign Currency Cashiers', 'Corporate Banking Divisional Head', 'Trade Finance Manager', 'Payments Manager', 'Corporate Loans Manager', 'Credit Risk Divisional Head', 'Credit Risk Manager', 'Information Technology Manager', 'Premises Divisional Head', 'Client Services Division', 'Head Office Division', 'Capital Markets Division', 'Financial Control Divisional Head', 'Finance Controller', 'T24 Updates'];
           */
          $scope.otherOfficer = ['6', '7', '8', '9'];

          $scope.accountOfficer = ['1', '2', '3', '4'];
          $scope.chargeCodeDrop = ['LCADVISE', 'LCAMEND', 'LCCHASER', 'LCCONFIRM', 'LCCOURIER', 'LCDISCNT', 'LCDISCREP', 'LCINCOLL', 'LCNEGO', 'LCOPENAMRT', 'LCOUTCOLL', 'LCREIMB', 'LCSLAMEND', 'LCSLCONFIRM', 'LCSLNEGO', 'LCSLOPEN', 'LCSLOPENCP', 'LCSWIFT', 'LCTRFR'];
          $scope.chargeCodeChanged = function (chargeCode) {
                  $scope.lcOpenForm.ChargeCurrency_t3 = $scope.lcOpenForm.LCCurrency_t1;
    
                  $http.get(apiBaseURL + "/getCharges/" + chargeCode).then(function (response) {
    
                      //   $scope.chargeCurrency = [];
    
                      for (i = 0; i <= response.data.length; i++) {
    
                          if (response.data[i].CURRENCY == $scope.lcOpenForm.LCCurrency_t1) {
                              //console.log("true true",response.data[i].CURRENCY,response.data[i].AMOUNT);
                              $scope.lcOpenForm.ChargeAmount_t3 = response.data[i].AMOUNT;
                          }
                          //else {
                          //console.log("false",response.data[i].CURRENCY); }
                          // $scope.chargeCurrency.push[response.data[i].CURRENCY];
                      }
    
                  })
              };
              $scope.checkEmpty = function () {
                  if ($scope.lcOpenForm.ChargeAmount_t3 == "") {
                      console.log("empty", $scope.lcOpenForm.ChargeAmount_t3);
                      $scope.lcOpenForm.ChargeCurrency_t3 = '';
                  } else {
                      $scope.lcOpenForm.ChargeCurrency_t3 = $scope.lcOpenForm.LCCurrency_t1;
                  }
              };
          $scope.partyChargedDD = ['Beneficiary', 'Opener', 'Third Party'];
          $scope.ChargeStatusDD = ['2', '3'];
          $scope.commissionCodeDD = ['LCACCEPT', 'LCCOMM', 'LCISSUE', 'LCOPEN'];

          $scope.wavecharges = ['YES','NO']; 

          $scope.commissionFrequencyDD = ['20171231M0101'];
          $scope.accrualParamDD = ['FIRST', 'BOTH', 'INSURANCE', 'LAST'];
          $scope.applicableRuleCodes = ['Eucp Latest Version', 'Eucpurr Latest Version', 'Isp Latest Version', 'othr', 'Ucp Latest Version', 'Ucpurr Latest Version'];
          $scope.lccurrency = ['USD', 'AED', 'AMD', 'ARS', 'AUD', 'AZN', 'CAD', 'CHF', 'EUR', 'GBP'];
          $scope.marginDebitAccount_t6 = ['CAD1091500010001	CAD			-250.00',
              'CAD1591500010001	CAD			500.00',
              'CAD	CAD			4,402,614.23',
              'CAD	CAD			281,000.00',
              'CHF1280000020001	CHF			375.60',
              'CHF1400500010001	CHF			-1,625,000.00',
              'CHF1404400010001	CHF			-42.96',
              'CHF1418500540001	CHF			0.00'
          ];
          $scope.MarginCreditAcct_t6 = ['CAD1091500010001	CAD			-250.00',
              'CAD1591500010001	CAD			500.00',
              'CAD	CAD			4,402,614.23',
              'CAD	CAD			281,000.00',
              'CHF1280000020001	CHF			375.60',
              'CHF1400500010001	CHF			-1,625,000.00',
              'CHF1404400010001	CHF			-42.96',
              'CHF1418500540001	CHF			0.00'
          ];

          $scope.DrawingType_1_t7 = ['AC', 'DP', 'MX', 'SP'];
          $scope.LimitforRevolving_t7 = ['Single'];
          $scope.DocumentId_t8 = ['100160', '100160-BL', '100160-CO'];
          $scope.AAdditionalConditions_1_t8 = ['100160', '100343'];
          $scope.MT700_1_42aADraweeID = ['111616', '111613', '190144', '100436', '190032'];
          $scope.MT700_1_53aAReimbursingBank = ['111616', '111613', '190144', '100436', '190032'];
          $scope.MT700_1_57aAAdviseThroughBank = ['111616', '111613', '190144', '100436', '190032'];
          $scope.MT700_1_47AAdditionalConditions_1 = ['100160-CPT-AIR', '100160-DISCRP', '100160-LCNUM'];
          $scope.MT740_MT740SenttoBankId = ['111616', '111613', '190144', '100436', '190032'];
          $scope.MT740_42aADrawee = ['111616', '111613', '190144', '100436', '190032'];
          $scope.CommissionClaimed_t4 = $scope.lcOpenForm.CommissionClaimed_t4;

          console.log("$scope.CommissionClaimed_t4", $scope.CommissionClaimed_t4);
          //$scope.lccurrency = ['USD'];





          const LCReqNumb = lcRequestID;
          //const apiBaseURL = $rootScope.apiBaseURL;
          const nodePort = $location.port();
          const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";

          const getObj = apiBaseURL + "/lcreq/" + sub;
          console.log("sub---", sub);
          console.log("getobj", getObj);
          $scope.modelData1;


          //console.log("url path --->",getObj);
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
              var blob = new Blob(byteArrays, {
                  type: contentType
              });
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
              console.log("url", url);
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
              setTimeout(function () {
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
              }, 100);


          };


          $rootScope.documentID;
          $scope.documentDetailToSend;
          $http.get(getObj).then(function (response) {
              var modelData = response.data;
              $scope.modelData1 = modelData[0];

              $http.get(apiBaseURL + "/lcRequestID").then(function (response) {
                  var lcreqid = "LC-" + response.data;
                  console.log("RESPONSE DATA ", modelData);
                  console.log("Modeldata111", $scope.modelData1);
                  //$scope.lcOpenForm.lcId= "LC-"+shareid.lcIDnew;
                  var tempId = $scope.modelData1.lcRequestNumber;
                  console.log("tempId ", tempId);
                  $scope.id = tempId;

                  $scope.lcOpenForm.LcRequestNumber = lcreqid;
					console.log("modelData[0].documentType  modelData[0].documentType", modelData[0].documentType);
					console.log("modelData[0].documents modelData[0].documents", modelData[0].documents);
                  var imageObj = {
                      docID: "doc" + lcreqid,
                      docType: modelData[0].documentType,
                      docContent: modelData[0].documents,
                      lcId: "doc" + lcreqid,
                  };
                  console.log("imageObjimageObj", imageObj);
                  $scope.documentDetailToSend = imageObj;
              })
              $scope.lcOpenForm.ImportSightPmtLCType_t1 = modelData[0].ImportSightPmtLCType;
              $scope.lcOpenForm.ApplicantID_t1 = modelData[0].Applicant;
              //$scope.lcOpenForm.AdvisingBankID_t2=	modelData[0].ApplicantBank;
              $scope.lcOpenForm.BeneficiaryID_t2 = modelData[0].Beneficiary;
              //$scope.lcOpenForm.ReimbusingBank_t2=	modelData[0].BeneficiaryBank;
              $scope.lcOpenForm.LCCurrency_t1 = modelData[0].LCCurrency;
              $scope.lcOpenForm.LCAmount_t1 = modelData[0].LCAmount;
              $scope.lcOpenForm.LCIssueDate_t1 =  $filter('date')(modelData[0].LCIssueDate,  "MM/dd/yyyy",  "IST");
              $scope.lcOpenForm.LCExpiryDate_t1 =  $filter('date')(new Date(modelData[0].LCExpiryDate),  "MM/dd/yyyy",  "IST");
              $scope.lcOpenForm.ShipmentDate_t1 =  $filter('date')(new Date(modelData[0].LcShipmentDate),  "MM/dd/yyyy",  "IST");

              $scope.lcOpenForm.LCExpiryPlace_t1 = modelData[0].LCExpiryPlace;
              $scope.lcOpenForm.ChargesFrom_t3 = modelData[0].ChargesFrom;
              //T24 Changes for lc-open
              $scope.lcOpenForm.ChargeDebitAcct_t3 = '';
              console.log("Charges Account", $scope.lcOpenForm.ChargeDebitAcct_t3);
              $scope.lcOpenForm.WaiveCharges_t3 = '';
              $scope.lcOpenForm.ChargeCode_t3 = '';
              $scope.lcOpenForm.ChargeCurrency_t3 = '';
              $scope.lcOpenForm.ChargeExchangeRate_t3 = '';
              $scope.lcOpenForm.ChargeAmount_t3 = '';
              $scope.lcOpenForm.ChargeStatus_t3 = '';
              $scope.lcOpenForm.IncoTerms_t1 = '';
              $scope.lcOpenForm.PresentationDays_t1 = '';
              $scope.lcOpenForm.AutoExpiry_t1 = '';
              $scope.lcOpenForm.CommissionCode_t4 = '';
              $scope.lcOpenForm.CommissionFrequency_t4 = '';
              $scope.lcOpenForm.CommissionRate_t4 = '';
              $scope.lcOpenForm.AccrualParam_t4 = '';
              $scope.lcOpenForm.CommissionExchangeRate_t4 = '';
              $scope.lcOpenForm.CommissionClaimed_t4 = '';
              $scope.lcOpenForm.FixedCommissionAmount_t4 = '';
              $scope.lcOpenForm.ReturnCommission_t4 = '';
              $scope.lcOpenForm.CommissionParty_t4 = '';
              $scope.lcOpenForm.ModeOfShipment_t1 = '';
              $scope.lcOpenForm.AccountOfficer_t1 = '';
              $scope.lcOpenForm.OtherOfficer_t1 = '';
              $scope.lcOpenForm.AutoExpiry_t1 = '';
              $scope.lcOpenForm.DocumentsCode_1_t8 = '';
              $scope.lcOpenForm.ADocumentsRequired_t8 = '';
              $scope.lcOpenForm.ADocumentsText_1_t8 = '';

              //End 

              $scope.lcOpenForm.DocumentId_t8 = modelData[0].FileReference;
              //MT fields mapping
              $scope.lcOpenForm.MT700_1_20Docy_CreditNumber = $scope.lcOpenForm.LcRequestNumber;
              $scope.lcOpenForm.MT700_1_31CDateofIssue = $scope.lcOpenForm.LCIssueDate_t1;
              $scope.lcOpenForm.MT700_1_31DDateofExpiry = $scope.lcOpenForm.LCExpiryDate_t1;
              $scope.lcOpenForm.MT700_1_31DPlaceofExpiry = $scope.lcOpenForm.LCExpiryPlace_t1;
              $scope.lcOpenForm.MT700_1_51aADApplicantBank_1 = $scope.lcOpenForm.ApplicantID_t1;
              $scope.lcOpenForm.MT700_1_32BCurrencyCode_Amount = modelData[0].LCCurrency + modelData[0].LCAmount;

              $scope.documentsReceived = modelData[0].documents;
              $scope.documentTypeReceived = modelData[0].documentType;

              console.log('$scope.documentsReceived', $scope.documentsReceived, $scope.documentTypeReceived);
              //$scope.convertToImage($scope.documentsReceived, $scope.documentTypeReceived,"");



              console.log("As suggested by sathish on scrum 20170906, not displaing these  ApplicantBank and BeneficiaryBank--->", modelData[0].ApplicantBank, "and", modelData[0].BeneficiaryBank);
              //To update fields values
              $scope.customerChange();
              $scope.applicantAddressUpdate();
              //For enable and disable button

              $scope.enableOpen();
          });
          $scope.customerChange = function () {

              $http.get(apiBaseURL + "/othercustomer").then(function (response) {
                  $scope.cusList = [];
                  $scope.customerList = [];
                  const otherCustomer = response;
                  console.log('otherCustomer', otherCustomer);
                  for (var j = 0; j < otherCustomer.data.length; j++) {
                      console.log('otherCustomerLoop', otherCustomer.data[j]);
                      $scope.cusList.push(otherCustomer.data[j].ibanno);
                      $scope.customerList.push(otherCustomer.data[j]);
                  };
              });

              $http.get(apiBaseURL + "/account/allDetail/").then(function (response) {
                  $scope.allAccountList = [];
                  for (var j = 0; j < response.data.length; j++) {
                      $scope.allAccountList.push(response.data[j].accno);
                  };
                  console.log('$scope.allAccountList', $scope.allAccountList);
              });





              $scope.otherBankList = [];

              const BeneficiaryIDval = $scope.lcOpenForm.BeneficiaryID_t2;
              console.log("customerChange", BeneficiaryIDval)
              $http.get(apiBaseURL + "/customer/detail/custID/" + BeneficiaryIDval).then(function (response) {
                  $scope.lcOpenForm.BeneficiaryAddress_t2 = response.data[0].customeraddress;
                  console.log("response.data[0].customeraddress   ", response.data[0].bank);
                  $http.get(apiBaseURL + "/bank/otherBanks/" + response.data[0].bank).then(function (response) {
                      bankList = response;
                      console.log('bankList', bankList);
                      for (var j = 0; j < bankList.data.length; j++) {
                          console.log('bankListLoop', bankList.data[j]);
                          $scope.otherBankList.push(bankList.data[j]);
                      };
                  });
              });
              console.log("otherBankList  ", $scope.otherBankList)
          };

          $scope.applicantAddressUpdate = function () {
              console.log("ApplicantID_t1 applicantAddressUpdate", $scope.lcOpenForm.ApplicantID_t1)
              const applicantAddressUpdateval = $scope.lcOpenForm.ApplicantID_t1;
              $http.get(apiBaseURL + "/customer/detail/custID/" + applicantAddressUpdateval).then(function (response) {
                  $scope.lcOpenForm.ApplicantAddress_t1 = response.data[0].customeraddress;
              });
          };

          $scope.advisingBankChange = function () {
              console.log("AdvisingThroughBankIDval", $scope.lcOpenForm.AdvisingThroughBank_t2)
              const AdvisingThroughBankIDval = $scope.lcOpenForm.AdvisingThroughBank_t2;
              $http.get(apiBaseURL + "/bank/bankAddress/" + AdvisingThroughBankIDval).then(function (response) {
                  $scope.lcOpenForm.AdvisingBankAddress_t2 = response.data[0].address;
              });
          };


          //});
          console.log("$scope.modelData1 modelData  --->", $scope.modelData1);

          console.log("$scope.lcOpenForm --->", $scope.lcOpenForm);
          $scope.enableOpenValue = true;
          $scope.enableOpen = function () {

              console.log($scope.lcOpenForm.LCExpiryPlace_t1, $scope.lcOpenForm.ImportSightPmtLCType_t1,
                  $scope.lcOpenForm.ApplicantID_t1, $scope.lcOpenForm.LCCurrency_t1,
                  $scope.lcOpenForm.LCAmount_t1, $scope.lcOpenForm.LCIssueDate_t1,
                  $scope.lcOpenForm.BeneficiaryID_t2, $scope.lcOpenForm.AvailableWithBankID_t2,
                  $scope.lcOpenForm.AdvisingBankID_t2, $scope.lcOpenForm.ReimbusingBank_t2,
                  $scope.lcOpenForm.AdvisingThroughBank_t2);

              console.log("$scope.enableOpenValue --->", $scope.enableOpenValue);
              if (($scope.lcOpenForm.LCExpiryPlace_t1 == '') || ($scope.lcOpenForm.ImportSightPmtLCType_t1 == '') ||
                  ($scope.lcOpenForm.ApplicantID_t1 == '') || ($scope.lcOpenForm.LCCurrency_t1 == '') ||
                  ($scope.lcOpenForm.LCAmount_t1 == '') || ($scope.lcOpenForm.LCIssueDate_t1 == '') ||
                  ($scope.lcOpenForm.BeneficiaryID_t2 == '') || ($scope.lcOpenForm.AvailableWithBankID_t2 == undefined) ||
                  ($scope.lcOpenForm.AdvisingBankID_t2 == undefined)) {
                  $scope.enableOpenValue = true;
                  console.log("$scope.enableOpenValue if case --->", $scope.enableOpenValue);
              } else {

                  $scope.enableOpenValue = false;
                  console.log("$scope.enableOpenValue else case --->", $scope.enableOpenValue);
              }
          };





          $scope.Open = () => {
              //validation starts here
              $scope.isError = "true";
			  
			  console.log("inside validate button",$rootScope.selectedCommissionDate,$scope.lcOpenForm.CommissionFrequency_t4);
				var commFrequency;
				if($scope.lcOpenForm.CommissionFrequency_t4 == "" ){
					console.log("coming inside undefined");
					commFrequency = '';
				}else{
					commFrequency = $rootScope.selectedCommissionFrequency;
				}


              var sh_date = $scope.lcOpenForm.ShipmentDate_t1;
              const validateLoc = {
                  lcId: $scope.lcOpenForm.LcRequestNumber,
                  lcRequestNumber: shareid.ID,
                  lCIssueDate_t1: $scope.lcOpenForm.LCIssueDate_t1,
                  lCExpiryDate_t1: $scope.lcOpenForm.LCExpiryDate_t1,
                  shipmentDate_t1: $filter('date')(sh_date,  "MM/dd/yyyy",  "IST"),
				  commissionFrequency_t4: commFrequency
              };

              const validateLCEndpoint = apiBaseURL + "/lc-validate";
              console.log("URL in validation ", validateLCEndpoint);
              console.log(validateLoc);

              $http.post(validateLCEndpoint, angular.toJson(validateLoc)).then(
                  function (result) {
                      if (result.data[0].lcId) {
                          console.log("in side if", result.data[0].lcId);
                          $scope.isError = false;
                          console.log("iserror", $scope.isError);
                          console.log("error", result.data);
                          //lc open start
                          const openLoc = {
                              lcId: $scope.lcOpenForm.LcRequestNumber,
                              lcRequestNumber: $scope.modelData1.lcRequestNumber,
                              importSightPmtLCType_t1: $scope.lcOpenForm.ImportSightPmtLCType_t1,
                              applicantID_t1: $scope.lcOpenForm.ApplicantID_t1,
                              applicantAddress_t1: $scope.lcOpenForm.ApplicantAddress_t1,
                              lCCurrency_t1: $scope.lcOpenForm.LCCurrency_t1,
                              lCAmount_t1: $scope.lcOpenForm.LCAmount_t1,
                              creditTolerance_t1: $scope.lcOpenForm.CreditTolerance_t1,
                              debitTolerance_t1: $scope.lcOpenForm.DebitTolerance_t1,
                              lCIssueDate_t1: $scope.lcOpenForm.LCIssueDate_t1,
                              shipmentDate_t1: $scope.lcOpenForm.ShipmentDate_t1,
                              lCExpiryDate_t1: $scope.lcOpenForm.LCExpiryDate_t1,
                              liablityReversalDate_t1: $scope.lcOpenForm.LiablityReversalDate_t1,
                              presentationDays_t1: $scope.lcOpenForm.PresentationDays_t1,
                              lCExpiryPlace_t1: $scope.lcOpenForm.LCExpiryPlace_t1,
                              incoTerms_t1: $scope.lcOpenForm.IncoTerms_t1,
                              modeOfShipment_t1: $scope.lcOpenForm.ModeOfShipment_t1,
                              limitReference_t1: $scope.lcOpenForm.LimitReference_t1,
                              autoExpiry_t1: $scope.lcOpenForm.AutoExpiry_t1,
                              otherOfficer_t1: $scope.lcOpenForm.OtherOfficer_t1,
                              accountOfficer_t1: $scope.lcOpenForm.AccountOfficer_t1,
                              portfolioApplicant_t1: $scope.lcOpenForm.PortfolioApplicant_t1,
                              portfolioBeneficiary_t1: $scope.lcOpenForm.PortfolioBeneficiary_t1,
                              beneficiaryID_t2: $scope.lcOpenForm.BeneficiaryID_t2,
                              advisingThroughBank_t2: $scope.lcOpenForm.AdvisingThroughBank_t2,
                              beneficiaryAddress_t2: $scope.lcOpenForm.BeneficiaryAddress_t2,
                              advisingBankAddress_t2: $scope.lcOpenForm.AdvisingBankAddress_t2,
                              availableWithBankID_t2: $scope.lcOpenForm.AvailableWithBankID_t2,
                              advisingBankID_t2: $scope.lcOpenForm.AdvisingBankID_t2,
                              reimbusingBank_t2: $scope.lcOpenForm.ReimbusingBank_t2,
                              chargesFrom_t3: $scope.lcOpenForm.ChargesFrom_t3,
                              chargeDefaultAcct_t3: $scope.lcOpenForm.ChargeDefaultAcct_t3,
                              chargeCode_t3: $scope.lcOpenForm.ChargeCode_t3,
                              partyCharged_t3: $scope.lcOpenForm.PartyCharged_t3,
                              chargeDebitAcct_t3: $scope.lcOpenForm.ChargeDebitAcct_t3,
                              chargeCurrency_t3: $scope.lcOpenForm.ChargeCurrency_t3,
                              chargeExchangeRate_t3: $scope.lcOpenForm.ChargeExchangeRate_t3,
                              waiveCharges_t3: $scope.lcOpenForm.WaiveCharges_t3,
                              chargeAmount_t3: $scope.lcOpenForm.ChargeAmount_t3,
                              amortiseCharges_t3: $scope.lcOpenForm.AmortiseCharges_t3,
                              chargeStatus_t3: $scope.lcOpenForm.ChargeStatus_t3,
                              taxCurrency_t3: $scope.lcOpenForm.TaxCurrency_t3,
                              commissionCode_t4: $scope.lcOpenForm.CommissionCode_t4,
                              commissionParty_t4: $scope.lcOpenForm.CommissionParty_t4,
                              commissionFrequency_t4: $scope.lcOpenForm.CommissionFrequency_t4,
                              commissionRate_t4: $scope.lcOpenForm.CommissionRate_t4,
                              accrualParam_t4: $scope.lcOpenForm.AccrualParam_t4,
                              fixedCommissionAmount_t4: $scope.lcOpenForm.FixedCommissionAmount_t4,
                              commissionAccount_t4: $scope.lcOpenForm.CommissionAccount_t4,
                              commissionExchangeRate_t4: $scope.lcOpenForm.CommissionExchangeRate_t4,
                              commissionClaimed_t4: $scope.lcOpenForm.CommissionClaimed_t4,
                              backForward_t4: $scope.lcOpenForm.BackForward_t4,
                              returnCommission_t4: $scope.lcOpenForm.ReturnCommission_t4,
                              sLRefTranche_t5: $scope.lcOpenForm.SLRefTranche_t5,
                              productType_t5: $scope.lcOpenForm.ProductType_t5,
                              baseCcyRate_t5: $scope.lcOpenForm.BaseCcyRate_t5,
                              participator_t5: $scope.lcOpenForm.Participator_t5,
                              partShare_t5: $scope.lcOpenForm.PartShare_t5,
                              partAmount_t5: $scope.lcOpenForm.PartAmount_t5,
                              syndicateCharge_t5: $scope.lcOpenForm.SyndicateCharge_t5,
                              ownPartAmt_t5: $scope.lcOpenForm.OwnPartAmt_t5,
                              bankToBankInfo_t5: $scope.lcOpenForm.BankToBankInfo_t5,
                              mT799Message_t5: $scope.lcOpenForm.MT799Message_t5,
                              marginRequired_t6: $scope.lcOpenForm.MarginRequired_t6,
                              marginCalcBase_t6: $scope.lcOpenForm.MarginCalcBase_t6,
                              marginPercent_t6: $scope.lcOpenForm.MarginPercent_t6,
                              marginDebitAccount_t6: $scope.lcOpenForm.MarginDebitAccount_t6,
                              marginAmount_t6: $scope.lcOpenForm.MarginAmount_t6,
                              marginExchangeRate_t6: $scope.lcOpenForm.MarginExchangeRate_t6,
                              marginCreditAcct_t6: $scope.lcOpenForm.MarginCreditAcct_t6,
                              limitwithProvision_t6: $scope.lcOpenForm.LimitwithProvision_t6,
                              drawingType_1_t7: $scope.lcOpenForm.DrawingType_1_t7,
                              paymentPercent_1_t7: $scope.lcOpenForm.PaymentPercent_1_t7,
                              paymentPortion_1_t7: $scope.lcOpenForm.PaymentPortion_1_t7,
                              acpt_timeBand_1_t7: $scope.lcOpenForm.Acpt_timeBand_1_t7,
                              addCoveredAmt_1_t7: $scope.lcOpenForm.AddCoveredAmt_1_t7,
                              portLimitRef_1_t7: $scope.lcOpenForm.PortLimitRef_1_t7,
                              portionOverdrawn_1_t7: $scope.lcOpenForm.PortionOverdrawn_1_t7,
                              revolvingType_t7: $scope.lcOpenForm.RevolvingType_t7,
                              noofRevolutions_t7: $scope.lcOpenForm.NoofRevolutions_t7,
                              revolvingFqy_t7: $scope.lcOpenForm.RevolvingFqy_t7,
                              limitforRevolving_t7: $scope.lcOpenForm.LimitforRevolving_t7,
                              cur_Revol_Liab_t7: $scope.lcOpenForm.Cur_Revol_Liab_t7,
                              documentId_t8: $scope.lcOpenForm.DocumentId_t8,
                              documentsCode_1_t8: $scope.lcOpenForm.DocumentsCode_1_t8,
                              aDocumentsText_1_t8: $scope.lcOpenForm.ADocumentsText_1_t8,
                              aDocumentsRequired_t8: $scope.lcOpenForm.ADocumentsRequired_t8,
                              aAdditionalConditions_1_t8: $scope.lcOpenForm.AAdditionalConditions_1_t8,
                              mT700_1_20Docy_CreditNumber: $scope.lcOpenForm.MT700_1_20Docy_CreditNumber,
                              mT700_1_23ReferencetoPreAdvice: $scope.lcOpenForm.MT700_1_23ReferencetoPreAdvice,
                              MT700_1_31CDateofIssue: $scope.lcOpenForm.MT700_1_31CDateofIssue,
                              mT700_1_40EApplicableRuleCodes: $scope.lcOpenForm.MT700_1_40EApplicableRuleCodes,
                              mT700_1_31DDateofExpiry: $scope.lcOpenForm.MT700_1_31DDateofExpiry,
                              mT700_1_31DPlaceofExpiry: $scope.lcOpenForm.MT700_1_31DPlaceofExpiry,
                              mT700_1_51aADApplicantBank_1: $scope.lcOpenForm.MT700_1_51aADApplicantBank_1,
                              mT700_1_50Applicant_1: $scope.lcOpenForm.MT700_1_50Applicant_1,
                              mT700_1_59Beneficiary_1: $scope.lcOpenForm.MT700_1_59Beneficiary_1,
                              mT700_1_32BCurrencyCode_Amount: $scope.lcOpenForm.MT700_1_32BCurrencyCode_Amount,
                              mT700_1_39APercentgCrAmtTolerance: $scope.lcOpenForm.MT700_1_39APercentgCrAmtTolerance,
                              mT700_1_39APercentgDrAmtTolerance: $scope.lcOpenForm.MT700_1_39APercentgDrAmtTolerance,
                              mT700_1_39BMaximumCreditAmt: $scope.lcOpenForm.MT700_1_39BMaximumCreditAmt,
                              mT700_1_39CAddlAmountsCovered_1: $scope.lcOpenForm.MT700_1_39CAddlAmountsCovered_1,
                              mT700_1_41aAAvailableWith: $scope.lcOpenForm.MT700_1_41aAAvailableWith,
                              mT700_1_41aDAvailablewith_1: $scope.lcOpenForm.MT700_1_41aDAvailablewith_1,
                              mT700_1_AvailableBy: $scope.lcOpenForm.MT700_1_AvailableBy,
                              mT700_1_42CDraftsat_1: $scope.lcOpenForm.MT700_1_42CDraftsat_1,
                              mT700_1_42aADraweeID: $scope.lcOpenForm.MT700_1_42aADraweeID,
                              mT700_1_42aDDraweeName_1: $scope.lcOpenForm.MT700_1_42aDDraweeName_1,
                              mT700_1_42MMixedPaymentDetails_1: $scope.lcOpenForm.MT700_1_42MMixedPaymentDetails_1,
                              mT700_1_42PDeferredPaymentDetails_1: $scope.lcOpenForm.MT700_1_42PDeferredPaymentDetails_1,
                              mT700_1_43PPartialShipments: $scope.lcOpenForm.MT700_1_43PPartialShipments,
                              mT700_1_43TTranshipment: $scope.lcOpenForm.MT700_1_43TTranshipment,
                              mT700_1_44APlaceofTakinginCharge: $scope.lcOpenForm.MT700_1_44APlaceofTakinginCharge,
                              mT700_1_44EPortofLoading: $scope.lcOpenForm.MT700_1_44EPortofLoading,
                              mT700_1_44FPortofDischarge: $scope.lcOpenForm.MT700_1_44FPortofDischarge,
                              mT700_1_44BFinalDestination: $scope.lcOpenForm.MT700_1_44BFinalDestination,
                              mT700_1_44CLatestDateofShipment: $scope.lcOpenForm.MT700_1_44CLatestDateofShipment,
                              mT700_1_44DShipmentPeriod_1: $scope.lcOpenForm.MT700_1_44DShipmentPeriod_1,
                              mT700_1_45ADescriptionofGoods: $scope.lcOpenForm.MT700_1_45ADescriptionofGoods,
                              mT700_1_46ADocumentsRequiredCode_1: $scope.lcOpenForm.MT700_1_46ADocumentsRequiredCode_1,
                              mT700_1_46ADocumentsRequired_1: $scope.lcOpenForm.MT700_1_46ADocumentsRequired_1,
                              mT700_1_46ADocumentsRequired: $scope.lcOpenForm.MT700_1_46ADocumentsRequired,
                              mT700_1_47AAdditionalConditions_1: $scope.lcOpenForm.MT700_1_47AAdditionalConditions_1,
                              mT700_1_47AAdditionalConditions: $scope.lcOpenForm.MT700_1_47AAdditionalConditions,
                              mT700_1_71BCharges: $scope.lcOpenForm.MT700_1_71BCharges,
                              mT700_1_48PeriodforPresentation: $scope.lcOpenForm.MT700_1_48PeriodforPresentation,
                              mT700_1_49ConfirmationInstructions: $scope.lcOpenForm.MT700_1_49ConfirmationInstructions,
                              mT700_1_53aAReimbursingBank: $scope.lcOpenForm.MT700_1_53aAReimbursingBank,
                              mT700_1_53aDReimbursingBank_1: $scope.lcOpenForm.MT700_1_53aDReimbursingBank_1,
                              mT700_1_78InstructionstotheBank: $scope.lcOpenForm.MT700_1_78InstructionstotheBank,
                              mT700_1_57aAAdviseThroughBank: $scope.lcOpenForm.MT700_1_57aAAdviseThroughBank,
                              mT700_1_57aDAdviseThroughBank_1: $scope.lcOpenForm.MT700_1_57aDAdviseThroughBank_1,
                              mT700_1_72SendertoReceiverInfo_1: $scope.lcOpenForm.MT700_1_72SendertoReceiverInfo_1,
                              mT740_MT740SenttoBankId: $scope.lcOpenForm.MT740_MT740SenttoBankId,
                              mT740_MT740SenttoBankName: $scope.lcOpenForm.MT740_MT740SenttoBankName,
                              mT740_SendMT740withLC: $scope.lcOpenForm.MT740_SendMT740withLC,
                              mT740_20Docy_CreditNumber: $scope.lcOpenForm.MT740_20Docy_CreditNumber,
                              mT740_25AccountIdentification: $scope.lcOpenForm.MT740_25AccountIdentification,
                              mT740_31DDateofExpiry: $scope.lcOpenForm.MT740_31DDateofExpiry,
                              mT740_31DPlaceofExpiry: $scope.lcOpenForm.MT740_31DPlaceofExpiry,
                              mT740_58aADNegotiatingBank_1: $scope.lcOpenForm.MT740_58aADNegotiatingBank_1,
                              mT740_59Beneficiary: $scope.lcOpenForm.MT740_59Beneficiary,
                              mT740_59Beneficiary_1: $scope.lcOpenForm.MT740_59Beneficiary_1,
                              mT740_32BLCCurrency: $scope.lcOpenForm.MT740_32BLCCurrency,
                              mT740_39ACreditTolerance: $scope.lcOpenForm.MT740_39ACreditTolerance,
                              mT740_39ADebitTolerance: $scope.lcOpenForm.MT740_39ADebitTolerance,
                              mT740_39BMaximumCreditAmt: $scope.lcOpenForm.MT740_39BMaximumCreditAmt,
                              mT740_39CAddlAmountsCovered_1: $scope.lcOpenForm.MT740_39CAddlAmountsCovered_1,
                              mT740_40FApplicableRuleCodes: $scope.lcOpenForm.MT740_40FApplicableRuleCodes,
                              mT740_41aAAvailableWith: $scope.lcOpenForm.MT740_41aAAvailableWith,
                              mT740_41aDAvailablewith_1: $scope.lcOpenForm.MT740_41aDAvailablewith_1,
                              mT740_42CDraftsat_1: $scope.lcOpenForm.MT740_42CDraftsat_1,
                              mT740_42aADrawee: $scope.lcOpenForm.MT740_42aADrawee,
                              mT740_42aDDrawee_1: $scope.lcOpenForm.MT740_42aDDrawee_1,
                              mT740_42MMixedPaymentDetails_1: $scope.lcOpenForm.MT740_42MMixedPaymentDetails_1,
                              mT740_42PDeferredPaymentDetails_1: $scope.lcOpenForm.MT740_42PDeferredPaymentDetails_1,
                              mT740_71AReimbursingBankCharges: $scope.lcOpenForm.MT740_71AReimbursingBankCharges,
                              mT740_71BOtherCharges_1: $scope.lcOpenForm.MT740_71BOtherCharges_1,
                              mT740_72SendertoReceiverInfo_1: $scope.lcOpenForm.MT740_72SendertoReceiverInfo_1,
                              status: "OPENED"
                          };

                          const openLCEndpoint = apiBaseURL + "/lc-open";
                          console.log("URL in Open ", openLCEndpoint);
                          console.log(openLoc);

                          console.log("$scope.modelData1", $scope.modelData1);
                          $http.post(openLCEndpoint, angular.toJson(openLoc)).then(
                              function (result) {
                                  console.log("INSIDE SUCCESS FUNCTION", openLoc);
                                  $location.path("/employeeHome");
                                  displayMessage(result);
                              },  
                              function (result) {
                                  // failure callback
                                  console.log("INSIDE ERROR FUNCTION");
                                  displayMessage(result);
                              }
                          );


                          $http.get(apiBaseURL + "/lc-orders").then(function (response) {
                              console.log("RESPONSE OF LC ORDERS===>", response);
                              $scope.loc1213 = response.data;
                              console.log("LC-ORDERS amendArray ==---=>", response.data[0].amendArray);
                              console.log("length response.data ==---=>", response.data.length);
                          });

                          const openLCEndpoint1 = apiBaseURL + "/image-store";
                          console.log("URL in Open ", openLCEndpoint1);
                          console.log("$scope.documentDetailToSend", $scope.documentDetailToSend);
						   console.log("$scope.documentDetailToSend.docContent",$scope.documentDetailToSend.docContent);
						if($scope.documentDetailToSend.docContent)
						{
                          $http.post(openLCEndpoint1, angular.toJson($scope.documentDetailToSend)).then(
                              function (result) {
                                  console.log("INSIDE SUCCESS FUNCTION image-store", $scope.documentDetailToSend);
                                  //$location.path("/employeeHome");
                                  // displayMessage(result);
                              },  
                              function (result) {
                                  // failure callback
                                  console.log("INSIDE ERROR FUNCTION image-store");
                                  //   displayMessage(result);
                              }
                          );
						}
                          //lc open end	 
                      } else {
                          console.log("in side else", result.data[0].lcId);
                          $scope.isError = true;
                          console.log("validation error else", result);

                          $scope.validationErrors = result.data;
                          $location.path("/lcOpen");
                          //displayMessage(result);
                      }
                  },  
                  function (result) {
                      // failure callback
                      console.log("INSIDE ERROR FUNCTION");
                      displayMessage(result);
                  }

              );


          }



          // //validation code starts

          $scope.validate = () => {
			  $scope.isError = "true";
			  
			  console.log("inside validate button",$rootScope.selectedCommissionDate,$scope.lcOpenForm.CommissionFrequency_t4);
				var commFrequency;
				if($scope.lcOpenForm.CommissionFrequency_t4 == "" ){
					console.log("coming inside undefined");
					commFrequency = '';
				}else{
					commFrequency = $rootScope.selectedCommissionFrequency;
				}
              


              var sh_date = $scope.lcOpenForm.ShipmentDate_t1;
              const validateLoc = {
                  lcId: $scope.lcOpenForm.LcRequestNumber,
                  lcRequestNumber: shareid.ID,
                  lCIssueDate_t1: $scope.lcOpenForm.LCIssueDate_t1,
                  lCExpiryDate_t1: $scope.lcOpenForm.LCExpiryDate_t1,
                  shipmentDate_t1: $filter('date')(sh_date,  "MM/dd/yyyy",  "IST"),
				  commissionFrequency_t4: commFrequency
              };

              const validateLCEndpoint = apiBaseURL + "/lc-validate";
              console.log("URL in validation ", validateLCEndpoint);
              console.log(validateLoc);

              $http.post(validateLCEndpoint, angular.toJson(validateLoc)).then(
                  function (result) {
                      if (result.data[0].lcId) {
                          console.log("in side if", result.data[0].lcId);
                          $scope.isError = false;
                          console.log("iserror", $scope.isError);
                          console.log("error", result.data);
                      } else {
                          console.log("in side else", result.data[0].lcId);
                          $scope.isError = true;
                          console.log("validation error else", result);

                          $scope.validationErrors = result.data;
                          $location.path("/lcOpen");
                      }
                  },  
                  function (result) {
                      // failure callback
                      console.log("INSIDE ERROR FUNCTION");
                      displayMessage(result);
                  }

              );
              console.log("LC validaetd and the object is  ", validateLoc);

          }
          // ///validation code ends
          $scope.cancel = () => {
              shareid.tab = 1;
              $location.path("/employeeHome");
          }
          displayMessage = (message) => {
              console.log("message in display message--->", message);
              const modalInstanceTwo = $uibModal.open({
                  templateUrl: 'messageContent.html',
                  controller: 'messageCtrl',
                  controllerAs: 'modalInstanceTwo',
                  resolve: {
                      message: () => message
                  }
              });

              modalInstanceTwo.result.then(() => {}, () => {});
          };


      } else {
          $location.path("/customer");
      }

  });

  
   app.controller('ModalInstanceCtrl', function ($scope,$filter, $uibModalInstance) {

  $scope.obj = {};
  //$scope.string = ''; 

  $scope.ok = function () {
	 console.log("coming inside ok");
	 
	 $scope.obj.CommissionDate = $scope.obj.commFrequency_t3;
	 $scope.obj.date = $filter('date')($scope.obj.commFrequency_t3,  "yyyyMMdd",  "IST");
	 
	 $scope.obj.radioButton = $scope.obj.freqOption_t3;
	 $scope.obj.radioDailyButton = $scope.obj.freqOptionOne_t3;
	 $scope.obj.radioWeeklyButton = $scope.obj.freqOptionTwo_t3;
	 $scope.obj.radioMonthlyButton = $scope.obj.freqOptionThree_t3;
	 $scope.obj.radioDefinedButton = $scope.obj.freqOptionFour_t3;
	 console.log("all avlues",$scope.obj.radioButton,$scope.obj.radioDailyButton,$scope.obj.radioWeeklyButton,$scope.obj.radioDefinedButton);
	 
	 if($scope.obj.radioButton == "DAILY"){
		 if($scope.obj.radioDailyButton == "DAILY"){
			$scope.obj.string = $scope.obj.date + "DAILY";
		 }else{
			 $scope.obj.string = $scope.obj.date + "BSNSS";
			 //20150422BSNSS
		 }
	 }else if($scope.obj.radioButton == "WEEKLY"){
		 $scope.obj.string = $scope.obj.date + "WEEk"+$scope.obj.freqOptionTwo_t3;
		//20150422WEEK2
	 }else if($scope.obj.radioButton == "MONTHLY"){
		 console.log("$scope.obj.radioMonthlyButton",$scope.obj.radioMonthlyButton)
		 if($scope.obj.radioMonthlyButton == "TWMTH"){
			$scope.obj.string = $scope.obj.date + "TWMTH";
			//twice mnth----20150422TWMTH
		 }else{
			 $scope.obj.string = $scope.obj.date + "M"+$scope.obj.freqOptionThree1_t3+$scope.obj.freqOptionThree2_t3;
			 //every---20150422M0304
			 //22 APR 2015
		 }
	 }else if($scope.obj.radioButton == "DEFINED"){
			$scope.obj.string = $scope.obj.date + ($scope.obj.freqOptionFour_t3).substring(0,5);		
	 }

		
	 
	 
    $uibModalInstance.close($scope.obj);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('messageCtrl', function ($uibModalInstance, message) {
       const modalInstanceTwo = this;
       modalInstanceTwo.message = message.data;
       console.log("message inside messageCtrl  ", modalInstanceTwo.message);
   });




  //End