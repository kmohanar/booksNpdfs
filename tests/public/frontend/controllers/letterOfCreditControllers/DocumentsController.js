app.controller('DocumentsController', function ($scope, $interval, $uibModal, $rootScope, $http, $location, $cookies, $sce, $window, $cookieStore, shareid, shareidCustomer) {
    $scope.files = [];

    var tick = function () {
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);

    $scope.CurrentDate = new Date();
    const nodePort = $location.port();
    const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";
    //const apiBaseURL = $rootScope.apiBaseURL;
    //$scope.LCRequestId = $rootScope.LCID;
    console.log("apiBaseURL===", apiBaseURL);
    $scope.LCRequestId = shareid.ID;
    console.log("shareid", shareid.ID);

    //  $scope.node = $rootScope.thisNode;

    $scope.node = shareid.thisNode;
    console.log("thisNode=========>", shareid.thisNode, $scope.node);

    $scope.username = $cookieStore.get('employee');
    $scope.logout = function () {
        $cookieStore.remove('customer');
        $location.path("/customer");
    };

    const getObj = apiBaseURL + "/employee-lc-orders/" + $scope.LCRequestId;
    console.log("getObj=====>", getObj);
    $scope.getbills = () => $http.get(getObj).then(function (response) {
        console.log("inside getbills");
        console.log("response.data.DATA.status", response.data.DATA);
		
const getObj1 = apiBaseURL + "/bank/bankAddress/"+ response.data.DATA.advisingBankID_t2;
 $http.get(getObj1).then(function (response) {
            var finalData = response.data;
console.log("response.data in 39=======>>>>>>>>",finalData[0]);

        $scope.otherBank = finalData[0].bankname;
        console.log("response node=======>>>>>>>>", $scope.otherBank);
 });
        //  console.log("response.data.DATA[0]", response.data.DATA, ">>>>>>", response.data.DATA.bills, ">>>>>>", response.data.DATA.bills[0]);
        console.log("extracted data", response.data.DATA.billArray);
        // var l = response.data.DATA.bills;
        var l = response.data.DATA.billArray;
        $scope.bill = response.data.DATA.Bill;
        console.log("bills", l);
        $scope.bills = l;
        console.log("$scope.bills", response.data.DATA.bills);
        //console.log("length of the bill",l.length,response.data.DATA.bills[l.length-1].lcOutstandingAmt);
        $scope.lastOutStandingAmount = response.data.DATA.Bill[l.length - 1].lcOutstandingAmt;
        //  console.log("outstanding amount", $scope.lastOutStandingAmount);
        //$scope.bills = response.data.DATA[0].bills;
        //console.log("response.data.DATA[0] in bill",$scope.bills);
        $scope.getData = response.data.DATA;
        console.log("getData", $scope.getData);
        //console.log("response.data.DATA[0] in lcorders",response.data.DATA.bills[1]);

        var l = response.data.DATA.bills;


        console.log("response.data.DATA.status", response.data.DATA.status);
    })
    $scope.getbills();



    $scope.verify = function () {
        console.log("object in documentverify==>", getObj);
        $http.get(getObj).then(function (response) {
            var finalData = response.data.DATA;
            console.log("RESPONSE DATA==> ", finalData);
            const VerifyStatus = {
                lcId: $scope.LCRequestId,
                lcReqId: finalData.lcReqId,
                applicantCustomer: finalData.applicantCustomer,
                applicantAddress: finalData.applicantAddress,
                // shipmentPeriod : finalData.shipmentPeriod,
                lcExpiryDate: finalData.lcExpiryDate,
                modeOfShipment: finalData.modeOfShipment,
                beneficiaryId: finalData.beneficiaryId,
                beneficiaryAddress: finalData.beneficiaryAddress,
                lcType: finalData.lcType,
                lcCurrency: finalData.lcCurrency,
                lcAmount: finalData.lcAmount,
                lcAmountTemp: finalData.lcAmount,
                lcIssueDate: finalData.lcIssueDate,
                lcExpiryPlace: finalData.lcExpiryPlace,
                latestShipmentDate: finalData.latestShipmentDate,
                liabilityReversalDate: finalData.liabilityReversalDate,
                advisingBankID: finalData.advisingBankID,
                applicantBank: finalData.applicantBank,
                applicantBankAddress: finalData.applicantBankAddress,
                advisingBankAddress: finalData.advisingBankAddress,
                formofDocumentaryCredit: finalData.formofDocumentaryCredit,
                documentaryCreditNumber: finalData.documentaryCreditNumber,
                availableWithBy: finalData.availableWithBy,
                forTransportationTo: finalData.forTransportationTo,
                descriptionOfGoodsAndOrServices: finalData.descriptionOfGoodsAndOrServices,
                additionalConditions: finalData.additionalConditions,
                periodForPresentation: finalData.periodForPresentation,
                advisingThroughBank: finalData.advisingThroughBank,
                transshipment: finalData.transshipment,
                portofLoading: finalData.portofLoading,
                maximumCreditAmount: finalData.maximumCreditAmount,
                draftsAt: finalData.draftsAt,
                partialShipments: finalData.partialShipments,
                senderToReceiverInformation: finalData.senderToReceiverInformation,
                charges: finalData.charges,
                confirmationInstructions: finalData.confirmationInstructions,
                sequenceOfTotal: finalData.sequenceOfTotal,
                documentsRequired: finalData.documentsRequired,
                ibanNumber: finalData.ibanNumber,
                incoTerms: finalData.incoTerms,
                draftsAtSight: finalData.draftsAtSight,
                draftsAtUsance: finalData.draftsAtUsance,
                shipmentPeriodSight: finalData.shipmentPeriodSight,
                shipmentPeriodUsance: finalData.shipmentPeriodUsance,
                percentageSight: finalData.percentageSight,
                percentageUsance: finalData.percentageUsance,
                lcAmountSight: finalData.lcAmountSight,
                lcAmountUsance: finalData.lcAmountUsance

            };
            console.log("verify object Json", VerifyStatus);
            const createVerifyStatusEndpoint =
                apiBaseURL +
                "/lc-docs-verify/" + $scope.LCRequestId;
            console.log("createVerifyStatusEndpoint", createVerifyStatusEndpoint);
            $http.post(createVerifyStatusEndpoint, angular.toJson(VerifyStatus)).then(
                function (result) {
                    // success callback
                    console.log("INSIDE SUCCESS FUNCTION", result);
                    alert("Documents Verified");
                    $location.path("/employeeHome");
                },  
                function (result) {
                    // failure callback
                    console.log("upload Status Failure");
                });
        });
    }

    //1. Used to list all selected files
    $scope.files = [];


    //3. listen for the file selected event which is raised from directive
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });


    //Document Upload code used for bill lodging starts(Kumar)

    $scope.documentUpload = function () {
        console.log("inside documentUpload");
        var files = document.getElementById('file').files;
        console.log("documentUpload files files", files[0]);
        if (files[0].size < 5242880) {
            if (files.length > 0) {
                $scope.getBase64(files[0]);
                alert("Image successfully processed");

            }
        } else {
            alert("Maximum allowed file size is 5MB only");
        }
    };

    $scope.getBase64 = function (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log("reader.result", reader.result);



            $scope.documentToAdd = (reader.result).split(',')[1];
            $scope.documentTypeToAdd = ((reader.result).split(';')[0]).split(':')[1];




            var base64 = btoa($scope.uint8ToString(reader.result));

            const imageObj = {
                docID: "img" + $scope.LCRequestId,
                docType: ((reader.result).split(';')[0]).split(':')[1],
                docContent: (reader.result).split(',')[1],
                lcId: "LC-1234"
            };

            $scope.documentDetailToSend = imageObj;
            const openLCEndpoint = apiBaseURL + "/image-store";
            console.log("URL in Open ", openLCEndpoint);
            console.log("imageObj", imageObj);
            //$http.post(openLCEndpoint, angular.toJson($scope.documentDetailToSend)).then(
            $http.post(openLCEndpoint, angular.toJson(imageObj)).then(
                function (result) {
                    console.log("INSIDE SUCCESS FUNCTION image-store", $scope.documentDetailToSend);
                    shareid.tab = 2;
                    $location.path("/employeeHome");
                },  
                function (result) {
                    // failure callback
                    console.log("INSIDE ERROR FUNCTION image-store");
                    //   displayMessage(result);
                }
            );


        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }



    $scope.uint8ToString = function (buf) {
        var i, length, out = '';
        for (i = 0, length = buf.length; i < length; i += 1) {
            out += String.fromCharCode(buf[i]);
        }
        return out;
    };




    $scope.b64toBlob = function (b64Data, contentType, sliceSize) {
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


    $scope.getAttachedFiles = function (b64Data, contentType, sliceSize) {
        $http.get(apiBaseURL + "/api/GetImageDetialById/" + "img" + $scope.LCRequestId).then(function (response) {
            console.log("response document", response);
            $scope.documentsReceived = response.data.DATA.docContent;
            $scope.documentTypeReceived = response.data.DATA.docType;

            //console.log("response.data[0].docID",response.data.DATA.docID);
            //console.log("response.data[0].docContent",response.data.DATA.docContent);
            //console.log("response.data[0].docType",response.data.DATA.docType);
            //console.log("response.data[0].lcId",response.data.DATA.lcId);

            // console.log($scope.documentsReceived, $scope.documentTypeReceived, "inside getAttachedFiles");
            $scope.convertToImage($scope.documentsReceived, $scope.documentTypeReceived, "");
            //  console.log($scope.documentsReceived, $scope.documentTypeReceived, "inside getAttachedFiles");

        });
        // console.log($scope.documentsReceived, $scope.documentTypeReceived, "inside getAttachedFiles");
        // $scope.convertToImage($scope.documentsReceived, $scope.documentTypeReceived, "");
        // console.log($scope.documentsReceived, $scope.documentTypeReceived, "inside getAttachedFiles");

    };
    $scope.isFile = false;
    $scope.checkFile = () => {
        $http.get(apiBaseURL + "/api/GetImageDetialById/" + "img" + $scope.LCRequestId).then(function (response) {
            console.log("document exists", response.status);

            if (response.status == 200) {
                console.log("inside 200");
                $scope.isFile = true;
            }
        });
    };
    $scope.checkFile();


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
        //console.log("b64Data",b64Data,"contentType",contentType,"sliceSize",sliceSize);
        var blob = $scope.convertToBlob(b64Data, contentType, sliceSize);
        //To download the image

        var a = document.createElement('a');
        var docExtension = contentType.split('/')[1];
        var filename = "Document_Blockchain." + docExtension;
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



    //Document Upload code used for bill lodging ends(Kumar)


    $scope.showTheForm = true;
    $scope.showTheForm1 = false;

    $scope.documentBack = function () {
        if ($cookieStore.get('customer')) {
            shareidCustomer.tab = 2;
            $location.path("/customerHome");
        } else {
            shareid.tab = 2;
            $location.path("/employeeHome");
        }
    };
    $scope.billInput = function (sno) {
        $http.get(apiBaseURL + "/lcRequestID").then(function (response) {
            console.log("response in bill input=====>", response);
            const billID = response.data;
            $scope.billform.billNumb = "BILL-" + billID;
            console.log("lcRequestID in customer home page===>", response.data.lcRequestID);
        });
        $scope.billSNO = sno;
        $scope.showTheForm1 = true;
        $scope.billcurrency = ['USD', 'GBP', 'EUR', 'CHF'];
        $scope.amountChange = () => {  
            console.log("LC AMOUNT", $scope.billform.billamount);  
            var  value = $scope.billform.billamount;    
            var  Amtval = value.split(/^([-+]?[0-9]*\.?[0-9]+)([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ])$/);  
            console.log("AMT VAL  ", Amtval);

              
            if (Amtval[2].toLowerCase() == 'm' || Amtval[2].toLowerCase() == 'h' || Amtval[2].toLowerCase() == 't') {

                  
                if (Amtval[2].toLowerCase() ==  "m") {  
                    $scope.billform.billamount = Amtval[1] * 1000000;  
                }  
                else if (Amtval[2].toLowerCase() ==  "h")   {  
                    $scope.billform.billamount = Amtval[1] * 100;  
                }  
                else if (Amtval[2].toLowerCase() ==  "t")   {  
                    $scope.billform.billamount = Amtval[1] * 1000;  
                }  
                else  {  
                    $scope.billform.billamount = $scope.billform.billamount;  
                }  
            }  
            else {  
                console.log("inside check else");  
                $scope.billform.billamount =  "";

                  
            }
        }

        $scope.create = () => {
            $http.get(getObj).then(function (response) {
                var finalData = response.data;
                //console.log("RESPONSE DATA ", finalData[0]);
                console.log("Bill DATA Create function", finalData, finalData.DATA);
                //checking bill details
                console.log("bill details before forming object", $scope.billform.billNumb, $scope.billform.billamount, $scope.billform.billcurrency, new Date($scope.billform.billdate).toLocaleDateString());
                //end


                const bill = {
                    lcId: $scope.LCRequestId,
                    lcReqId: finalData.DATA.lcReqId,
                    applicantCustomer: finalData.DATA.applicantCustomer,
                    applicantAddress: finalData.DATA.applicantAddress,
                    //shipmentPeriod : finalData.DATA.shipmentPeriod,
                    lcExpiryDate: finalData.DATA.lcExpiryDate,
                    modeOfShipment: finalData.DATA.modeOfShipment,
                    beneficiaryId: finalData.DATA.beneficiaryId,
                    beneficiaryAddress: finalData.DATA.beneficiaryAddress,
                    lcType: finalData.DATA.lcType,
                    lcCurrency: finalData.DATA.lcCurrency,
                    lcAmount: finalData.DATA.lcAmount,
                    lcAmountTemp: finalData.DATA.lcAmount,
                    lcIssueDate: finalData.DATA.lcIssueDate,
                    lcExpiryPlace: finalData.DATA.lcExpiryPlace,
                    latestShipmentDate: finalData.DATA.latestShipmentDate,
                    liabilityReversalDate: finalData.DATA.liabilityReversalDate,
                    advisingBankID: finalData.DATA.advisingBankID,
                    applicantBank: finalData.DATA.applicantBank,
                    applicantBankAddress: finalData.DATA.applicantBankAddress,
                    advisingBankAddress: finalData.DATA.advisingBankAddress,
                    formofDocumentaryCredit: finalData.DATA.formofDocumentaryCredit,
                    documentaryCreditNumber: finalData.DATA.documentaryCreditNumber,
                    availableWithBy: finalData.DATA.availableWithBy,
                    forTransportationTo: finalData.DATA.forTransportationTo,
                    descriptionOfGoodsAndOrServices: finalData.DATA.descriptionOfGoodsAndOrServices,
                    additionalConditions: finalData.DATA.additionalConditions,
                    periodForPresentation: finalData.DATA.periodForPresentation,
                    advisingThroughBank: finalData.DATA.advisingThroughBank,
                    transshipment: finalData.DATA.transshipment,
                    portofLoading: finalData.DATA.portofLoading,
                    maximumCreditAmount: finalData.DATA.maximumCreditAmount,
                    draftsAt: finalData.DATA.draftsAt,
                    partialShipments: finalData.DATA.partialShipments,
                    senderToReceiverInformation: finalData.DATA.senderToReceiverInformation,
                    charges: finalData.DATA.charges,
                    confirmationInstructions: finalData.DATA.confirmationInstructions,
                    sequenceOfTotal: finalData.DATA.sequenceOfTotal,
                    documentsRequired: finalData.DATA.documentsRequired,
                    draftsAtSight: finalData.DATA.draftsAtSight,
                    draftsAtUsance: finalData.DATA.draftsAtUsance,
                    shipmentPeriodSight: finalData.DATA.shipmentPeriodSight,
                    shipmentPeriodUsance: finalData.DATA.shipmentPeriodUsance,
                    percentageSight: finalData.DATA.percentageSight,
                    percentageUsance: finalData.DATA.percentageUsance,
                    lcAmountSight: finalData.DATA.lcAmountSight,
                    lcAmountUsance: finalData.DATA.lcAmountUsance,
                    ibanNumber: finalData.DATA.ibanNumber,
                    incoTerms: finalData.DATA.incoTerms,
                    bills: [{
                        billNo: $scope.billform.billNumb,
                        billAmount: parseInt($scope.billform.billamount),
                        currencyType: $scope.billform.billcurrency,
                        billDate: new Date($scope.billform.billdate).toLocaleDateString(),
                    }]
                };
                console.log("BILL without forming json ", bill);

                const createBillEndpoint = apiBaseURL + "/lodge-bill/" + $scope.LCRequestId;
                $http.post(createBillEndpoint, angular.toJson(bill)).then(
                    function (result) {
                        // success callback
                        console.log("INSIDE bill post SUCCESS FUNCTION", bill);

                        displayMessage(result);
                            shareid.tab = 2;
                         $location.path("/employeeHome");

                    },  
                    function (result) {
                        // failure callback
                        console.log("INSIDE ERROR FUNCTION");
                        displayMessage(result);
                    });
            });
        };

        $scope.cancel = () => {
            $location.path("/employeeHome");
        }

        
        $scope.disableBillButton = () => {
            // console.log("inside disable bill function   ",$scope.billform.billamount,$scope.billform.billdate,$scope.billform.billcurrency,"disableBillButton",disableBillButton);
            if ($scope.billform.billamount == '' || $scope.billform.billdate == '' || $scope.billform.billcurrency != '' || $scope.lastOutStandingAmount == 0) {
                return true;
            } else {
                return false;
            }
        }
        $scope.disableVerify = (disableVerify) => {
            console.log("inside disableVerify");
            console.log("disableVerify", disableVerify);
            return true;

        }


        displayMessage = (message) => {
            console.log("message in display message--->", message);
            //$rootScope.messageStatus = message.status;
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

    };
})

app.directive('uploadFiles', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFile", {
                        file: files[i]
                    });
                }
            });
        }
    };
});
