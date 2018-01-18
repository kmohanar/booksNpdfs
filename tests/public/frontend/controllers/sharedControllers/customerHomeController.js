        app.service('rootValues', function () {
          var data1 = {};
          this.save = function (data1) {
            this.data1 = data1;
          }
          this.getData1 = function () {
            return data1;
          }

          var _Id = {

            name: "test",
            surname: "doe",
            node: "192.168.22.1",

            id: ""
          }

          return {
            id: _Id

          }
        });
        app.factory('shareidCustomer', function () {

          return {
            thisNode: ''
          };
          return {
            BgAmendID: ''
          };
          return {
            tab: '0'
          };
          return {
            lcRequestNumber: ''
          };
		  return {
            lcID: ''
          };
          return {
            bgOpenViewID: ''
          };
	  return {
            bgAmendViewId: ''
          };
          return {
            lcAmendRequestNumber: ''
          };
          

        });

        app.controller('customerHomeController', function ($timeout, $scope, $rootScope, $http, $location, $cookies, $cookieStore, shareid, $anchorScroll, rootValues, shareidCustomer, $interval, shareCustomerDetails) {
          $scope.tab = shareidCustomer.tab;
          //shareidCustomer.tab=0;        
          window.onbeforeunload = function (event) {
            //handles page reload ,as refreshing does not reload t24 part again.
            return 'why would you do that???';
          }

          console.log("tab in customer page", shareidCustomer.tab);




          //$scope.updateDiv();

          $scope.gaugeOptions = {
            bindingOptions: {
              value: "value"
            },
            scale: {
              startValue: 0,
              endValue: 100,
              tickInterval: 10
            },
            rangeContainer: {
              ranges: [{
                  startValue: 0,
                  endValue: 35,
                  color: "#FF0000"
                },
                {
                  startValue: 35,
                  endValue: 70,
                  color: "#0000FF"
                },
                {
                  startValue: 70,
                  endValue: 100,
                  color: "#00FF00"
                }
              ]
            }
          };

          $scope.selectBoxOptions = {
            width: 150,
            displayExpr: "name",
            dataSource: $scope.accList,
            value: $scope.val,
            onValueChanged: function (e) {
              var value = e.value;
              $scope.value = $scope.val;
            }
          };

          $scope.chartCalculate = function (minVal, maxVal) {

			console.log("minVal & maxVal",minVal,maxVal);
			$scope.minimum = minVal;
			$scope.maximum = maxVal;

            if ($scope.minimum > $scope.maximum) {
				console.log("maxVal",maxVal);
				console.log("minVal",minVal);
              alert("maximum value should be greater than minimum. Reenter the values!!")
            } else {

              console.log("accountForm.accountSelected", $scope.accountForm.accountSelected);
              for (var i = 0; i < $scope.accDetails.length; i++) {
                console.log("$scope.accDetails[i]['ns2:ACC'][0]", $scope.accDetails[i]['ns2:ACC'][0]);
                if ($scope.accDetails[i]['ns2:ACC'][0] == $scope.accountForm.accountSelected) {
                  console.log("$scope.accDetails[i]['ns2:ACC'][0]", $scope.accDetails[i]['ns2:ACC'][0], $scope.accountForm.accountSelected);
                  $scope.BalanceOfSelectedAccount = $scope.accDetails[i]['ns2:ONLINEACTUALBAL'][0];
                }
              }
              $scope.amt = $scope.BalanceOfSelectedAccount;
              var  x = $scope.amt;
              var  y = x.replace(/\,/g, "");
              var  z = parseFloat(y);
              var  amount = Math.round(y);


              if (amount < minVal ) {
                console.log("in 35", "$scope.amt:", $scope.amt, "minValue:", minVal, "maxValue:", maxVal);
                alert('Your Account balance amount is below the mininmum limit !!!!');
                $scope.val = 35;
                $scope.color = '#FF0000';
              } else if (amount > maxVal ) {
                console.log("in 100", "$scope.amt:", $scope.amt, "minValue:", minVal, "maxValue:", maxVal);
                alert('Your Account balance amount is above the Maximum limit !!!!');
                $scope.val = 100;
                $scope.color = '#00FF00';
              } else if (amount > minVal && amount < maxVal) {
                console.log("in 70", "$scope.amt:", $scope.amt, "minValue:", minVal, "maxValue:", maxVal);
                alert('Your Account balance amount is in good limits !!!!');
                $scope.val = 70;
                $scope.color = '#0000FF';
              }



              console.log("min max", minVal, maxVal);
              // $scope.val=(minValue/maxValue)*100;
              console.log("value ==", $scope.val);


              console.log("value", $scope.val);
              /* var geometry = {
              startAngle: 180,
              endAngle: 0
            },
            scale = {
              startValue: 0,
              endValue: 100,
              tickInterval: 10,
              label: {
                customizeText: function (arg) {
                  return '' ;
                }
              }
            };
			
			
			
			$scope.gauge = {
						rangebarIndicator: {
							geometry: geometry,
							scale: scale,
							value: $scope.val,
							valueIndicator: {
								type: "rangebar",
								color: $scope.color
							}
						}
					};
 */


              $scope.value = $scope.val;
              //$scope.subvalues = [dataSource[0].min, dataSource[0].max];


              /* 
		    $scope.updateDiv = function () {
							console.log("inside updateDiv");
							$( "#rangebar" ).load(window.location.href + "#rangebar" );
					}
					
					$scope.updateDiv();  */

              //		 $timeout($scope.updateDiv, 50000); 
              //$timeout($scope.chartCalculate, 3000);
              /* $timeout(function () { 
    }, 5000);
		$scope.tab = 1; */
            }
          };
          var tick1 = function () {
            $scope.clock1 = Date.now();
          }
          tick1();
          $interval(tick1, 1000);
          $scope.CurrentDate = new Date();

          if ($cookieStore.get('customer')) {
            $scope.message = 'Letter of Credit';
            $scope.username = $cookieStore.get('customer');
            const nodePort = $location.port();
            const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";
            //  $rootScope.apiBaseURL = apiBaseURL;
            //$scope.tab = 0;


            $scope.Tab = function () {
              if (shareidCustomer.tab == '') {
                $scope.tab = 0;

              } else {
                $scope.tab = shareidCustomer.tab;
              }
            };
            $scope.Tab();

            $scope.setTab = function (newTab) {
              $scope.tab = newTab;
            };


            $scope.isSet = function (tabNum) {
              return $scope.tab === tabNum;
            };


            $http.get(apiBaseURL + "/lcRequestID").then(function (response) {
              console.log("asdas", response);
              // rootValues.id =response.data;
              rootValues.data1 = response.data;
              console.log("$scope.id", rootValues.data1);
            })



            $scope.amendLc = (AmendID) => {

			  shareidCustomer.LC_AmendID = AmendID;
              console.log("shareidCustomer.LC_AmendID", shareidCustomer.LC_AmendID);
              console.log("lc2222id", AmendID);
              // $location.path("/lcAmend");
              $http.get(apiBaseURL + "/api/GetLcById/" + AmendID).then(function (response) {
                console.log("INSIDE SUCCESS FUNCTION");
                const StatusFromDB = response.data;
                const statusvalue = response.data.status;  //LcNumberOfAmendments status
                console.log("status from api===>", StatusFromDB);

                if (statusvalue == 'AmendRequested')

                {
                  console.log("response.data.status", response.data.status);
                  console.log("inside status if");
                  //return false;
                  alert("LC Amend Request is in progress");
                  $location.path("/customerHome");
                  //alert("hi");
                  /*$scope.status = function(){

                  return false;
                  }*/
                } else {
				  shareidCustomer.oldRec = response.data;
                  console.log("inside status else",shareidCustomer.oldRec);
                  $location.path("/lcAmend");
                  //return true;

                }
              });
            };

$scope.empamendListNew=function(rec){
	console.log("entering in to the empamendListNew",rec);
	if(rec)
	{
		console.log("entering in to the empamendListNew if case");
		const getObj = apiBaseURL + "/employee-lc-orders/"+rec.lcAmendId;
        $http.get(getObj).then(function(response){
			
			console.log("//console getObj before empamendListNew",response);
			var finalData = response.data;
			var len=finalData.DATA.lcNumberOfAmendments;
			shareid.selectedVersionID = len;
			//var idVal= parseInt(id);
        });	
	}
	$scope.CustOpenLcView(rec.lcAmendId);	
}
			

            //-------------------------------------------------------End----------------------------------------------------------------------------------
            //bg amend start

            $scope.amendBG = (AmendID) => {
              console.log("shareidCustomer", shareidCustomer);
              shareidCustomer.BgAmendID = AmendID;
              console.log("bgid", AmendID);
              console.log("apibase URL ", apiBaseURL);
              $http.get(apiBaseURL + "/api/GetBgById/" + AmendID).then(function (response) {
                console.log("INSIDE SUCCESS FUNCTION", response);
                const BgRecord = response.data;
                const statusvalue = response.data.status;
                console.log("status from api===>", BgRecord);


                //if(response.data.status = 'AmendRequested')
                if (statusvalue == 'AMEND REQUESTED') {
                  console.log("response.data.status", response.data.status);
                  console.log("inside status if");
                  //return false;
                  alert("BG Amend Request is in progress");
                  $location.path("/customerHome");
                  //alert("hi");
                  /*$scope.status = function(){

                  return false;
                  }*/
                } else {
                  console.log("inside status else");
                  $location.path("/bgAmend");
                  //return true;

                }
              });

            };

            //end

            //-------------------------------------------------------End----------------------------------------------------------------------------------
            $scope.logout = function () {

              $cookieStore.remove('customer');
              $location.path("/customer");
              var cust = $cookieStore.get('customer');
              console.log("customer  ", cust);
              $cookieStore.put('tab', shareidCustomer.tab = 0);
            };
			
			//////////////////LISTING CUSTOMER RELATED REQUESTS/////////////////////
			
			$http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
                  console.log("inside mail", response);
                  const custID1 = response.data[0].customerid;
                  console.log("custID1:", custID1);

					$http.get(apiBaseURL + "/get-customer-lc/" +custID1).then(function (response) {
					  console.log("RESPONSE OF LC ORDERS===>", response);
					 $scope.loc = response.data;
					  console.log("$scope.loc", $scope.loc);
					  console.log("LC-ORDERS===>", response.data[0]);
					});
					
					$http.get(apiBaseURL + "/get-customer-amendlc/" +custID1).then(function (response) {
					  console.log("RESPONSE OF LC ORDERS===>", response);
					 $scope.locamend = response.data;
					  console.log("$scope.locamend", $scope.locamend);
					  console.log("LC AMEND RECORDS===>", response.data[0]);
					});
                });
			
					
			/////////////////END///////////////////////////////////
			
			
			

            /* $http.get(apiBaseURL + "/lcreq").then(function(response){
              $scope.loc =response.data;
              console.log("response.data",response.data);
              console.log("$scope.loc",$scope.loc);
              }) */
            // $scope.getLCs = () => $http.get(apiBaseURL + "/get-customer-lc/" + $scope.username)
            //   .then((response) => $scope.loc = Object.keys(response.data)
            //     .map((key) => response.data[key])
            //     .reverse());
            // $scope.getLCs();

            //Logic for displaying default data
            //Start
$scope.CustOpenLcView = (lcID) => {
	shareidCustomer.lcID = lcID;
	console.log("lcID in CustOpenLcView=====>",lcID);
	$location.path("/openLCView");
}
            $scope.loccusDefaultdata = (locobj) => {

              var defaultdata = locobj;
              console.log("defaultdata", defaultdata)
              $scope.amendAmountval = defaultdata.lcAmount;
              $scope.amendModeOfShipmentval = defaultdata.modeOfShipment;
              $scope.lcAmendExpiryDateval = defaultdata.lcExpiryDate;
              $scope.lcAmendExpiryPlaceval = defaultdata.lcExpiryPlace;
              $scope.lcAmendAdvisingBankRefval = defaultdata.advisingBankID;



            }

            $scope.bgcusDefaultdata = (bgobj) => {

              var bgdefaultdata = bgobj;
              $scope.bgamendAmountval = bgdefaultdata.principalAmount;
              $scope.bgAmendExpiryDateval = bgdefaultdata.expiryDate;
              $scope.bgTermsAndConditions = bgdefaultdata.termsAndConditions;

            }
            //End

            console.log("shareCustomerDetails.cusDet", shareCustomerDetails.cusDet);

            $http.post(apiBaseURL + "/getAccountDetails/" + shareCustomerDetails.cusDet).then(function (response) {
              $scope.accDetails = response.data;

              $scope.accList = [];
              //$scope.accBalanceList = [];

              for (var j = 0; j < $scope.accDetails.length; j++) {
                console.log('accDetails', $scope.accDetails[j]);
                console.log("$scope.accDetails[j]['ns2:TYPE'][j]", $scope.accDetails[j]['ns2:TYPE'][0]);

                if ($scope.accDetails[j]['ns2:TYPE'][0] == "Current Account" || $scope.accDetails[j]['ns2:TYPE'][0] == "Savings Account") {
                  console.log("inside if of pushing account details", $scope.accDetails[j]['ns2:ACCTNAME'][0]);
                  $scope.accList.push($scope.accDetails[j]['ns2:ACC'][0]);

                  //$scope.accBalanceList.push($scope.accDetails[j]['ns2:ONLINEACTUALBAL'][0]);
                }
                console.log("accList", $scope.accList);
              };
              console.log("accList outside", $scope.accList);
              shareidCustomer.accDetails = $scope.accDetails;
              console.log("$scope.accDetails outside loop", $scope.accDetails);

            })

            //////////////////////////////////////////////////////start getting bg list of customer///////////////////////////////////////////////////////////////////
            $http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
                  console.log("inside mail", response);
                  const custID1 = response.data[0].customerid;
                  console.log("custID1:", custID1);

						$http.get(apiBaseURL + "/get-customer-bg/" +custID1).then(function (response) {
						  console.log("RESPONSE OF BG ORDERS===>", response);
						 $scope.bgs = response.data;
						  console.log("$scope.bgs", $scope.bgs);
						  console.log("BG-ORDERS===>", response.data[0]);
						});
						
						$http.get(apiBaseURL + "/get-customer-amendbg/" +custID1).then(function (response) {
						  console.log("RESPONSE OF AMEND BG RECORDS===>", response);
						 $scope.bogamend = response.data;
						  console.log("$scope.bogamend", $scope.bogamend);
						  console.log("BG AMEND RECORDS===>", response.data[0]);
						});
                });
			
			/*$scope.getBGs = () => $http.get(apiBaseURL + "/get-customer-bg/" + $scope.username)
              .then((response) => $scope.bgs = Object.keys(response.data)
                .map((key) => response.data[key])
                .reverse());

             $scope.getBGs1 = () => $http.get(apiBaseURL + "/bg-req-custname/"+$scope.username)
                    .then(function(response){
                    $scope.bgs1 = response.data;
                    console.log("BGS OBJECT  ",$scope.bgs1);
                    }); */
            //$scope.getBGs();
            //            console.log("BGS OBJECT  ", $scope.bgs);

            // const v = $scope.getBGs();
            // console.log("val bg", v);
            // console.log("test", $scope.getBGs1);


            // $scope.getProcessedBGs = () => $http.get(apiBaseURL + "/customer-bg-orders/" + $scope.username)
            //   .then((response) => $scope.bog1 = Object.keys(response.data)
            //     .map((key) => response.data[key])
            //     .reverse());
            // $scope.getProcessedBGs();

            

 
            //////////////////////////////////////////////////////end getting bg list of customer///////////////////////////////////////////////////////////////////

            //start
            $scope.lcAmendReqView=function(lcAmendRequestNumber){
              console.log("lcAmendRequestNumber",lcAmendRequestNumber);
              shareidCustomer.lcAmendRequestNumber=lcAmendRequestNumber;
              $location.path("/lcAmendReqView");
            }; 

            /* $scope.getAmendedLCs = () => $http.get(apiBaseURL + "/lcamendreq")
              .then((response) => $scope.locamend = Object.keys(response.data)
                .map((key) => response.data[key])
                .reverse());
            $scope.getAmendedLCs(); */
            //end

            /* $scope.getAmendedBGs = () => $http.get(apiBaseURL + "/bgamendreq")
              .then((response) => $scope.bogamend = Object.keys(response.data)
                .map((key) => response.data[key])
                .reverse());
            $scope.getAmendedBGs(); */

    /*        $http.get(apiBaseURL + "/lc-orders").then(function (response) {
              console.log("RESPONSE OF LC ORDERS===>", response);
              $scope.loc1 = response.data;
              console.log("LC-ORDERS===>", response.data[0]);
            });*/
			
			//new function to display only customer based records
			console.log("bfore calling $scope.username", $scope.username);
			
			
			
			$scope.TodoCtrllc = function () {

    var currentDate = new Date();
	var utc = currentDate.toJSON().slice(0,10).replace(/-/g,'/');
	//console.log("utc",utc);
	//console.log("currentDate",currentDate);
    
		
		  $http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
                  console.log("inside mail", response);
				  console.log("ME=====",$scope.username);
                  const custID = response.data[0].customerid;
                  console.log("custID:", custID);

            $http.get(apiBaseURL + "/customer-lc-orders/" +custID).then(function (response) {
             
              $scope.cusrec = response.data;
			  //console.log("Customer based records",$scope.cusrec);
			  
            
            $scope.resp = response.data;
            //console.log('response data',$scope.resp);
			$scope.count = response.data.length;
			//console.log("Count",$scope.count);
			//console.log("lcexpiry date",$scope.resp[0].lCExpiryDate_t1);
							var start = start || 0;
//console.log("start",start);
    var today = new Date();
    var day = today.getDay() - start;
	 var day1 = today.getDay()
	 //console.log("day1",day1);
    var date = today.getDate() - day;
	//console.log("date",date);

        // Grabbing Start/End Dates
    var StartDate = new Date(today.setDate(date+1));
    var EndDate = new Date(today.setDate(date + 7));
	
	//console.log("Start Date",StartDate);
	//console.log("End DATE",EndDate);
	//var x=0;
	var n=0;
	$scope.count1 = n;
	//console.log("Global value of n",n);
			for(x=0; x<=$scope.count-1; x++) {
				
				//console.log("Inside for loop");
				//console.log("x value",x);
				//console.log("x resp",$scope.resp[x]);
				
				var lcExpiryDate = new Date($scope.resp[x].lCExpiryDate_t1);
				//console.log("LC EXPIRYDATE",lcExpiryDate,"    ",StartDate,"     ",StartDate);
				//console.log(lcExpiryDate > StartDate,"   ",lcExpiryDate < EndDate);
				if(lcExpiryDate >=StartDate && lcExpiryDate <=EndDate) {
					
					//console.log("inside if loop lc");
					n++;
					//console.log("count of n",n);
					
					
				}
				console.log("value of n ouside of the loop",n);
				
				$scope.count1 = n;
				
				//console.log("Scope.count",$scope.count1);
				
				

				
			}
            
            ////console.log("lcID in customer home page===>",response.data);
        
});
                });

    
   
}


$scope.TodoCtrlcustbg = function () {

    var currentDate = new Date();
	var utc = currentDate.toJSON().slice(0,10).replace(/-/g,'/');
	//console.log("utc",utc);
	console.log("currentDate",currentDate);
    
		
		 $http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
                  console.log("inside mail", response);
				  console.log("ME=====",$scope.username);
                  const custID = response.data[0].customerid;
                  console.log("custID:", custID);

            $http.get(apiBaseURL + "/customer-bg-orders/" +custID).then(function (response) {
             
              $scope.cusrec = response.data;
			  console.log("Customer based  BG records",$scope.cusrec);
			  
            $scope.resp1 = response.data;
            console.log('response data for bg',$scope.resp1);
			$scope.count2 = response.data.length;
			//console.log("Count",$scope.count2);
			//console.log("BGExpiry date",$scope.resp[0].expiryDate_t1);
							var start = start || 0;
//console.log("start",start);
    var today = new Date();
    var day = today.getDay() - start;
	 var day1 = today.getDay()
	 console.log("day1",day1);
    var date = today.getDate() - day;
	console.log("date",date);

        // Grabbing Start/End Dates
    var StartDate1 = new Date(today.setDate(date+1));
    var EndDate1 = new Date(today.setDate(date + 7));
	var bgExpirydate = $scope.resp1.expiryDate_t1;
	
	console.log("Start Date",StartDate1);
	console.log("End DATE",EndDate1);
	//console.log("BG EXPIRY DATE",$scope.resp1.expiryDate_t1);
	
	var n=0;
	
		$scope.count4 = n;
		for(x=0; x<=$scope.count2-1; x++) {
				
				console.log("Inside for BG loop");
				console.log("x value",x);
				//console.log("x resp",$scope.resp[x]);
				
				var bgExpiryDate = new Date($scope.resp1[x].expiryDate_t1);
				
				//var bgExpiryDate = new Date($scope.resp1[0].expiryDate_t1);
				console.log("BG EXPIRYDATE",bgExpiryDate,"    ",StartDate1,"     ",StartDate1);
				console.log(bgExpiryDate > StartDate1,"   ",bgExpiryDate < EndDate1);
				if(bgExpiryDate >=StartDate1 && bgExpiryDate <=EndDate1) {
					
					console.log("inside if BG loop");
					n++;
					console.log("count of n",n);
					
					
				}
				console.log("value of n ouside of the loop",n);
				
				$scope.count4 = n;
				
				console.log("Scope.count bg",$scope.count4);
				
				

				
			}
            
            ////console.log("lcID in customer home page===>",response.data);
        });
		});


    
    //$scope.weekDays = days;
}


			
			
			
			
			
                $http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
                  console.log("inside mail", response);
				  console.log("ME=====",$scope.username);
                  const custID = response.data[0].customerid;
                  console.log("custID:", custID);

            $http.get(apiBaseURL + "/customer-lc-orders/" +custID).then(function (response) {
             
              $scope.cusrec = response.data;
			  console.log("Customer based records",$scope.cusrec);
			  
            });
                });
				
				 $http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
                  console.log("inside mail", response);
                  const custID1 = response.data[0].customerid;
                  console.log("custID1:", custID1);

            $http.get(apiBaseURL + "/customer-bg-orders/" +custID1).then(function (response) {
              console.log("RESPONSE OF BG ORDERS===>", response);
              $scope.bog1 = response.data;
			  console.log("$scope.bog1", $scope.bog1);
              console.log("BG-ORDERS===>", response.data[0]);
            });
                });

               /* $scope.getCustomerLCs = () => $http.get(apiBaseURL + "/customer-lc-orders/" +$scope.username)
                                .then((response) => $scope.loc1 = Object.keys(response.data)
                                .map((key) => response.data[key])
                                .reverse());*/
                     // $scope.getCustomerLCs();
			
//Kumar comment - to restrict displaying all the transactions to all - ends - 20171218




            /*
                $scope.getProcessedLCs = () => $http.get(apiBaseURL + "/customer-lc-orders/" +$scope.username)
                                .then((response) => $scope.loc1 = Object.keys(response.data)
                                .map((key) => response.data[key])
                                .reverse());
                      $scope.getProcessedLCs();*/

            $http.get(apiBaseURL + "/me").then(function (response) {
              $scope.thisNode = response.data;
              shareidCustomer.thisNode = $scope.thisNode;
              //$rootScope.thisNode=response.data;

              console.log("me===>", response.data, shareidCustomer.thisNode);

            });
            //////////////////////////////////////////////for email sending begins//////////////////////////////////////
            $http.get(apiBaseURL + "/lcRequestID").then(function (response) {

              console.log("lcRequestID===>", response.data);
              //$rootScope.lcRequestID = response.data.lcRequestID;



              //                $scope.showHide=()=>{

              /////hide the modal starts///////////////////////
              $scope.IsHidden = true;
              $scope.emailForm = {};
              $scope.getMail = (iban, forID) => {

                console.log("hidden now", iban);

                /////////////applicant mail id starts//////////
                $scope.username = $cookieStore.get('customer');
                $http.get(apiBaseURL + "/customer/detail/id/" + $scope.username).then(function (response) {
                  console.log("inside mail", response);
                  const fromEmail = response.data[0].email;
                  console.log("from Mail:", fromEmail);
                  $scope.emailForm.fromEmail = fromEmail;

                });
                /////////////applicant mail id ends//////////
                /////////////beneficiary mail id starts//////
                //$rootScope.iban = iban;
                $http.get(apiBaseURL + "/customer/detail/" + iban).then(function (response) {
                  console.log("OTHER BANK", response);
                  const toMail = response.data[0].email;
                  console.log("beneficiary Obj: ", apiBaseURL + "/customer/detail/" + iban);
                  console.log("tomail: ", toMail, toMail);
                  $scope.emailForm.toEmail = toMail;
                  $scope.emailForm.subject = "Requesting amendments for " + forID;

                });
                /////////////beneficiary mail id ends//////
              }
              $scope.showHide = function () {
                console.log("inhidden!:)")
                //If DIV is hidden it will be visible and vice versa.
                $scope.IsHidden = $scope.IsHidden ? false : true;
              }
              $scope.send = function () {

                console.log("test email data from UI", $scope.emailForm.subject, $scope.emailForm.mailbody);
                const email = {
                  from: $scope.emailForm.fromEmail,
                  to: $scope.emailForm.toEmail,
                  subject: $scope.emailForm.subject,
                  msg: $scope.emailForm.mailbody
                };
                console.log("email Obj", angular.toJson(email));
                const emailCreate = apiBaseURL + "/email-for-amend";
                $http.post(emailCreate, angular.toJson(email)).then(function (result) {
                  console.log("success", angular.toJson(email));
                });
                $scope.IsHidden = true;
              }
              $scope.cancel = () => {
                $scope.IsHidden = true;
                $location.path("/customerHome");
              }
              console.log("lcRequestID in customer home page===>", rootValues.data1);
            });
            ///////////////////////////////////////////////for email sending ends//////////////////////////////////////

            //for versions and history/////////////////////
            // $scope.getLength = () => $http.get(apiBaseURL + "customer-lc-orders/"+$scope.username)
            //                            .then(function(response){
            //                            var finalData = response.data;
            //                            console.log("length in func "+ finalData);
            //                        $scope.versionLength = finalData[0].lcorder.amendData.length;
            //                        console.log("domg ",finalData[0].lcorder.amendData.length);
            //                            });
            //              $scope.getLength();
            //

            //================================================================================================================================
            // Below is the logic for displaying the amended lc records based on the version number
            //================================================================================================================================

            //Start

            $scope.numberofamendval = null;

            $scope.amendList = function (id, amendId) {

              $scope.numberofamendval = id;

              //selecting the version id kumar start
              shareid.selectedVersionID = id;
              //selecting the version id kumar end

              const getObj = apiBaseURL + "/employee-lc-orders/" + amendId;
              console.log("getObj before", getObj);
              $http.get(getObj).then(function (response) {
                console.log("getObj after", getObj);
                var finalData = response.data;
                console.log("finalData************", finalData);
                var len = finalData.DATA.LcNumberOfAmendments;
                //$scope.templength=finalData.DATA.LcNumberOfAmendments
                var idVal = parseInt(id);
                console.log("length", len);
                console.log("idVal", idVal);



                if (idVal == len) { //Initial
             //     console.log("in if >>", finalData.DATA, );

             //     $scope.amendAmountval = finalData.DATA.lcAmount;
             //     console.log("inside idval -1", finalData.DATA.lcAmount)
                  //$scope.numberOfAmendmentval=finalData[0].lcorder.lcNumberOfAmendment;
                  // $scope.lcAmendAdvisingBankRefval=finalData.DATA.lcAmendAdvisingBankRef;
                  //$scope.lcAmendAdvisingBankRefval = finalData.DATA.advisingBankID;
                  //$scope.amendModeOfShipmentval = finalData.DATA.modeOfShipment;
                //  $scope.lcAmendExpiryDateval = finalData.DATA.lcExpiryDate;
               //   $scope.lcAmendExpiryPlaceval = finalData.DATA.lcExpiryPlace;
                  //$scope.amendmentDetailsval=finalData[0].lcorder.lcAmendmentDetails;

                 // console.log("id last:", idVal, "length", len)
                } else {
                 // $scope.amendAmountval = finalData.DATA.amendArray[idVal].lcAmendAmount;
                  //$scope.numberOfAmendmentval=finalData[0].lcorder.amendData[idVal].numberOfAmendment;
                  //  $scope.lcAmendAdvisingBankRefval=finalData.DATA.amendArray[idVal].lcAmendAdvisingBankRef;
                 // $scope.lcAmendAdvisingBankRefval = finalData.DATA.advisingBankID;
                 // $scope.amendModeOfShipmentval = finalData.DATA.amendArray[idVal].amendModeOfShipment;
                //  $scope.lcAmendExpiryDateval = finalData.DATA.amendArray[idVal].lcAmendExpiryDate;
                //  $scope.lcAmendExpiryPlaceval = finalData.DATA.amendArray[idVal].lcAmendExpiryPlace;
                  //$scope.amendmentDetailsval=finalData[0].lcorder.amendData[idVal].amendmentDetails;
              //    console.log("id others:", idVal, "length", len)
                }
              });
            }
            $scope.myvar = false;

            $scope.historycus = (amendId) => {

              $scope.myvar = true;

              const getObj = apiBaseURL + "/employee-lc-orders/" + amendId;

              $http.get(getObj).then(function (response) {

                var finalData = response.data;
                var len = finalData.DATA.LcNumberOfAmendments;

                if ($scope.numberofamendval != null) {
                  var idVal = parseInt($scope.numberofamendval);
                  console.log("length", len);
                  console.log("idVal", idVal);


                  if (idVal == len) {
                    console.log("in if 2nd", finalData.DATA);

                    $scope.amendAmountval = finalData.DATA.lcAmount;
                    //$scope.numberOfAmendmentval=finalData[0].lcorder.lcNumberOfAmendment;
                    $scope.lcAmendAdvisingBankRefval = finalData.DATA.advisingBankID;
                    $scope.amendModeOfShipmentval = finalData.DATA.modeOfShipment;
                    $scope.lcAmendExpiryDateval = finalData.DATA.lcExpiryDate;
                    $scope.lcAmendExpiryPlaceval = finalData.DATA.lcExpiryPlace;
                    //$scope.amendmentDetailsval=finalData[0].lcorder.lcAmendmentDetails;

                    console.log("id last:", idVal, "length", len)
                  } else {
                    console.log("in else 2nd", finalData.DATA);
                    $scope.amendAmountval = finalData.DATA.amendArray[idVal].lcAmendAmount;
                    //$scope.numberOfAmendmentval=finalData[0].lcorder.amendData[idVal].numberOfAmendment;
                    // $scope.lcAmendAdvisingBankRefval=finalData.DATA.amendArray[idVal].lcAmendAdvisingBankRef;
                    $scope.lcAmendAdvisingBankRefval = finalData.DATA.advisingBankID;
                    $scope.amendModeOfShipmentval = finalData.DATA.amendArray[idVal].amendModeOfShipment;
                    $scope.lcAmendExpiryDateval = finalData.DATA.amendArray[idVal].lcAmendExpiryDate;
                    $scope.lcAmendExpiryPlaceval = finalData.DATA.amendArray[idVal].lcAmendExpiryPlace;
                    //$scope.amendmentDetailsval=finalData[0].lcorder.amendData[idVal].amendmentDetails;
                    console.log("id others:", idVal, "length", len)
                  }
                }

              });

            }

            // /////////////////Bg Amend Button Disable////////////////////////////////
            
             $scope.disableBgAmendButton=(bog)=>{
            
            // console.log("beneficiaryBank",bog,shareidCustomer.thisNode);
            
            
                 if(bog.beneficiaryNoncust_1_t1 ==  shareidCustomer.thisNode && (bog.status == "Accepted" || bog.status == "AMEND_APPROVED" )){
                    return false;
                 }else{
					 return true;
				 }
             }
            
            
            // //////////////////End////////////////////////////////


            /////////////////////////BG amend history/////////////////
            //START


            $scope.amendBGList = function (id, amendId) {

              console.log("bg amendid ===>", amendId);
              console.log("bg no.of amend ===>", id);

              $scope.bgnumberofamendval = id
              const getObj = apiBaseURL + "/employee-bg-orders/" + amendId;
              $http.get(getObj).then(function (response) {

                var finalData = response.data.DATA;
                console.log("finalData in amendlist=====>>>>>", finalData);
                var len = finalData.bgNumberOfAmendments;

                var idVal = parseInt(id);
                console.log("length", len);
                console.log("idVal", idVal);



                if (idVal == len) {
                  console.log("finalData in amend list if part=====>>>>>", finalData);
                  $scope.bgamendAmountval = finalData.principalAmount;

                  $scope.bgAmendExpiryDateval = finalData.expiryDate;
                  $scope.bgTermsAndConditions = finalData.termsAndConditions;


                  console.log("id last:", idVal, "length", len)
                } else {
                  console.log("finalData in amendlist else part=====>>>>>", finalData);
                  $scope.bgamendAmountval = finalData.bgAmendArray[idVal].principalAmount;
                  $scope.bgAmendExpiryDateval = finalData.bgAmendArray[idVal].expiryDate;
                  $scope.bgTermsAndConditions = finalData.bgAmendArray[idVal].termsAndConditions;
                }


              });
            }

            //lcrequest view page starts
            $scope.lcReqView=function(lcRequestNumber){
              console.log("lcRequestNumber",lcRequestNumber);
              shareidCustomer.lcRequestNumber=lcRequestNumber;
              $location.path("/lcReqView");
            };
            //lcrequest view page ends


            //bgrequest view and bgOpened view page starts
            $scope.bgReqView=function(bgReqID){
              console.log("bgReqID",bgReqID);
              shareidCustomer.bgReqID = bgReqID;
              $location.path("/bgRequestView");
            };

            $scope.bgOpenView = function (bgOpenViewID) {
              console.log("bgOpened ID:", bgOpenViewID);
              shareidCustomer.bgOpenViewID = bgOpenViewID;
              $location.path("/bgOpenedView");
          };
            //bgrequest view and bgOpened view page ends 
	//bg amend view
			$scope.bgAmendReqView = function (bgAmendViewId){
				console.log("bgAmendViewId",bgAmendViewId);
				shareidCustomer.bgAmendViewId = bgAmendViewId;
				$location.path("/bgAmendReqView");
			};
            //History method


            $scope.bgmyvar = false;

            $scope.bghistorycus = (amendId) => {

              $scope.bgmyvar = true;

              const getObj = apiBaseURL + "/employee-bg-orders/" + amendId;

              $http.get(getObj).then(function (response) {

                var finalData = response.data.DATA;
                console.log("finalData in history=====>>>>>", finalData);
                var len = finalData.bgNumberOfAmendments;

                if ($scope.bgnumberofamendval != null) {
                  var idVal = parseInt($scope.bgnumberofamendval);
                  console.log("length", len);
                  console.log("idVal", idVal);


                  if (idVal == len) {
                    console.log("finalData in history if part=====>>>>>", finalData);
                    $scope.bgamendAmountval = finalData.principalAmount;

                    $scope.bgAmendExpiryDateval = finalData.expiryDate;
                    $scope.bgTermsAndConditions = finalData.termsAndConditions;
                    console.log("finalData.bgorder if case", finalData, "gap", finalData.bgorder);

                  } else {
                    console.log("else part finalData.bgAmendData[idVal-1].principalAmount", finalData, "gap", finalData.bgAmendArray[idVal]);
                    $scope.bgamendAmountval = finalData.bgAmendArray[idVal].principalAmount;
                    $scope.bgAmendExpiryDateval = finalData.bgAmendArray[idVal].expiryDate;
                    $scope.bgTermsAndConditions = finalData.bgAmendArray[idVal].termsAndConditions;
                  }
                }

              });

            }
            //


            //END
            ////////////////////scroll down controller on landing page starts//////////////////////
            $scope.gotoBottom = function () {
              $location.hash('bottom');
              $anchorScroll();
            };
            ////////////////////scroll down controller on landing page ends////////////////////////

          } else {

            console.log("Inside else statement ----->");
            $location.path("/customer");
          }
        });
        //////////////message controller////////////////////////////////////////////////////
        app.controller('messageCtrl', function ($uibModalInstance, message) {
          const modalInstanceTwo = this;
          modalInstanceTwo.message = message.data;
          console.log("message inside messageCtrl  ", modalInstanceTwo.message);
        });
        //////////////message controller////////////////////////////////////////////////////
