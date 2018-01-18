app.factory('shareid', function () {
    return {
        ID: ''
    };
    return {
        lcIDnew: ''
    };
    return {
        lcApproveID: ''
    };
    return {
        thisNode: ''
    };
    return {
        AmendID: ''
    };
    return {
        bgOpenID: ''
    };
    return {
        BgAmendID: ''
    };
	return {
        bgAmendAcceptID: ''
    };	
	return {
        bgAmendAcceptReqID: ''
    };
    return {
        AmendReqID: ''
    };
    return {
        bgApproveAmendID: ''
    };
	return {
        bgAmendViewId: ''
    };	
	return {
        noOfAmendments: ''
    };
	return {
        bgAmendAcceptViewId: ''
    };
    return {
        lcID: ''
    };
    return {
        tab: '0'
    };
    return {
        lcRequestNumber: ''
    };
    return {
        curr: []
    };
    return {
        mapOfscope: ''
    };
    return {
        dps1: ''
    };
    return {
        dps2: ''
    };
    return {
        dps3: ''
    };
    return {
        dps4: ''
    };
    return {
        bgReqID: ''
    };
    return {
        bgOpenViewID: ''
    };
    
});


 
app.controller('employeeHomeController', function ($scope, $interval, $rootScope, $http, $location, $cookies, $cookieStore, rootValues,shareidCustomer ,shareid) {
    $scope.tab  = shareid.tab; 
    // shareid.tab=0; 

    var tick = function () {
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);

    $scope.CurrentDate = new Date();


    if ($cookieStore.get('employee')) {

        ////console.log("rootValues in employee",rootValues.data1);
        $scope.message = 'Letter of Credit';
        $scope.username = $cookieStore.get('employee');

        $scope.tab = 0;
        $scope.Tab = function () {
            if (shareid.tab == '0') {
                $scope.tab = 0;

            } else {
                $scope.tab = shareid.tab;
            }
        };
        $scope.Tab();



        $scope.setTab = function (newTab) {
            $scope.tab = newTab;
            //console.log("tab in setTab", $scope.tab);
        };
        $scope.logout = function () {

            $cookieStore.remove('employee');
            $location.path("/customer");
            $cookieStore.put('tab', shareid.tab = 0);
        };

        $scope.Documents = function (ID) {

            shareid.ID = ID;
            ////console.log("ID in home page  ",ID,shareid.ID);
            $location.path("/Documents");
        }
        $scope.isSet = function (tabNum) {
            return $scope.tab === tabNum;
        };

        const nodePort = $location.port();
        const apiBaseURL = "http://" + window.__env.apiUrl + ":" + nodePort + "";
        // $rootScope.apiBaseURL = apiBaseURL;

        $http.get(apiBaseURL + "/lcRequestID").then(function (response) {
            shareid.lcIDnew = response.data;
            ////console.log("lcIDnew",shareid.lcIDnew);
        })


        $http.get(apiBaseURL + "/lcreq").then(function (response) {
            $scope.loc = response.data;
            ////console.log("response.data",response.data);
            ////console.log("$scope.loc",$scope.loc);
			
        })

		
		
		$scope.TodoCtrl = function () {

    var currentDate = new Date();
	var utc = currentDate.toJSON().slice(0,10).replace(/-/g,'/');
	//console.log("utc",utc);
	//console.log("currentDate",currentDate);
    
		
		 $http.get(apiBaseURL + "/lc-orders").then(function (response) {
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
					
					//console.log("inside if loop");
					n++;
					//console.log("count of n",n);
					
					
				}
				//console.log("value of n ouside of the loop",n);
				
				$scope.count1 = n;
				
				//console.log("Scope.count",$scope.count1);
				
				

				
			}
            
            ////console.log("lcID in customer home page===>",response.data);
        });


    
    //$scope.weekDays = days;
}



$scope.TodoCtrlbg = function () {

    var currentDate = new Date();
	var utc = currentDate.toJSON().slice(0,10).replace(/-/g,'/');
	//console.log("utc",utc);
	console.log("currentDate",currentDate);
    
		
		 $http.get(apiBaseURL + "/bg-orders").then(function (response) {
            $scope.resp1 = response.data;
            console.log('response data for bg',$scope.resp1);
			$scope.count2 = response.data.length;
			console.log("Count",$scope.count2);
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
				
				console.log("Inside for loop");
				console.log("x value",x);
				//console.log("x resp",$scope.resp[x]);
				
				var bgExpiryDate = new Date($scope.resp1[x].expiryDate_t1);
				
				//var bgExpiryDate = new Date($scope.resp1[0].expiryDate_t1);
				console.log("BG EXPIRYDATE",bgExpiryDate,"    ",StartDate1,"     ",StartDate1);
				console.log(bgExpiryDate > StartDate1,"   ",bgExpiryDate < EndDate1);
				if(bgExpiryDate >=StartDate1 && bgExpiryDate <=EndDate1) {
					
					console.log("inside if loop");
					n++;
					console.log("count of n",n);
					
					
				}
				console.log("value of n ouside of the loop",n);
				
				$scope.count4 = n;
				
				console.log("Scope.count",$scope.count4);
				
				

				
			}
            
            ////console.log("lcID in customer home page===>",response.data);
        });


    
    //$scope.weekDays = days;
}




        /*      $scope.getLCs = () => $http.get(apiBaseURL + "/lcreq")
                            .then((response) => $scope.locRenamed = Object.keys(response.data)
                            .map((key) => response.data[key])
                            .reverse());
              var locObjList = $scope.getLCs();
            //  $scope.loc = locObjList.$$state.value;
              
              ////console.log("all lcs",$scope.getLCs(),locObjList.$$state.value);
              */
        ///Display default data for employee view
        //Start
        $scope.locempDefaultdata = (locobj) => {

            var defaultdata = locobj;
            ////console.log("amend object default",defaultdata.lcAmount);
            $scope.amendAmountval = defaultdata.lcAmount;
            $scope.lcAmendAdvisingBankRefval = defaultdata.advisingBankID;
            $scope.amendModeOfShipmentval = defaultdata.modeOfShipment;
            $scope.lcAmendExpiryDateval = defaultdata.lcExpiryDate;
            $scope.lcAmendExpiryPlaceval = defaultdata.lcExpiryPlace;

        }

        $scope.bgempDefaultdata = (bgobj) => {

            var bgdefaultdata = bgobj;
            $scope.bgamendAmountval = bgdefaultdata.principalAmount;
            $scope.bgAmendExpiryDateval = bgdefaultdata.expiryDate;
            $scope.bgTermsAndConditions = bgdefaultdata.termsAndConditions;

        }
        //End
        /*  $scope.getProcessedLCs = () => $http.get(apiBaseURL + "/lc-orders")
                     .then((response) => $scope.loc1 = Object.keys(response.data)
                     .map((key) => response.data[key].state.data)
                     .reverse());
          $scope.getProcessedLCs();*/

        $http.get(apiBaseURL + "/lc-orders").then(function (response) {
            //console.log("RESPONSE OF LC ORDERS===>", response);
            loc1 = response.data;
            $scope.loc1 = response.data;
            //console.log("data for charts", $scope.loc1);

            $scope.islcExpiryDate = function (loc1) {

                ////console.log("hi am inside charts function",loc1);
                //return loc1[0].lcExpiryDate === "8/10/201";
                //$scope.valDate =$scope.loc1[0].lcExpiryDate
                //return $scope.loc1[0].lcExpiryDate;
                $scope.x = 0;
                $scope.count = 0;
                $scope.lcAmt = 0;
                $scope.curr = [];
                $scope.mapOfMonths = new Map();
                $scope.mapOfAmt = new Map();
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                ////console.log("dates",firstDay,lastDay);

                //$scope.dps = [{label: "USA", y: 5}, {label: "INR", y: 6}, {label: "AUD", y: 4}, {label: "JPY", y: 7}];
                $scope.dps = []
                $scope.dpsAmt = []

                while ($scope.x < $scope.loc1.length) {

                    ////console.log("Expiry date",$scope.loc1[$scope.x].lCExpiryDate_t1);
                    var Issuedate = $scope.loc1[$scope.x].lCIssueDate_t1;
                    ////console.log("LC Issue Date",Issuedate);
                    var expDate = $scope.loc1[$scope.x].lCExpiryDate_t1;
                    ////console.log("expdate",expDate); 
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    var currency = $scope.loc1[$scope.x].lCCurrency_t1;
                    ////console.log("loc in while",$scope.loc1[$scope.x]);
                    ////console.log("LC in while",$scope.loc1[$scope.x].lCAmount_t1);

                    $scope.currency = null
                    $scope.frequency = null
                    $scope.prevAmt = null

                    var newdate1 = new Date(expDate);
                    var newdate = new Date(Issuedate);
                    var date1 = new Date();
                    ////console.log("dates after conversion",newdate);
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                    ////console.log("date1",date1);
                    $scope.thisMonth = months[date1.getMonth()];
                    $scope.thisYear = newdate.getFullYear();;
                    ////console.log("this Year",$rootScope.thisYear);
                    ////console.log("Current Month",$rootScope.thisMonth);
                    ////console.log("dates after conversion",newdate);
                    ////console.log("Firstday",firstDay);
                    ////console.log("LatDay",lastDay);

                    if (newdate >= firstDay && newdate <= lastDay) {
                        ////console.log("Data for charts loc1",$scope.loc1[$scope.x]);
                        ////console.log("LC AMONUT",$scope.lcAmount_t1);
                        // $scope.count++;
                        $scope.lcAmt = parseInt($scope.loc1[$scope.x].lCAmount_t1);
                        ////console.log("Amonut in if",$scope.lcAmt);
                        //$scope.curr[$scope.x] = $scope.loc1[$scope.x].lcCurrency;
                        $scope.currency = $scope.loc1[$scope.x].lCCurrency_t1;

                        ////console.log("Currency in  ",$scope.x ,"is ",$scope.currency+"");

                        if ($scope.mapOfMonths.has($scope.currency) && $scope.mapOfAmt.has($scope.currency)) {
                            ////console.log("Iam inside if map loop");

                            $scope.frequency = $scope.mapOfMonths.get($scope.currency);
                            $scope.mapOfMonths.set($scope.currency, $scope.frequency + 1);

                            $scope.prevAmt = $scope.mapOfAmt.get($scope.currency);
                            $scope.mapOfAmt.set($scope.currency, $scope.prevAmt + $scope.lcAmt);
                        } else {
                            $scope.mapOfMonths.set($scope.currency, 1)
                            $scope.mapOfAmt.set($scope.currency, $scope.lcAmt)
                        }

                        /* shareid.mapOfscope = $scope.mapOfMonths;
						   ////console.log("Map of months----->shareid",shareid.mapOfscope);
						   shareid.curr=$scope.curr;
						  
						    ////console.log(" inside if loop",$scope.sum,$scope.count);
							 */

                    }
                    $scope.x++;
                    /* ////console.log("x",$scope.x);*/
                    //.log("shareid.curr------->",shareid.curr); 




                }
                ////console.log("DPS inside ",$scope.dps);

                function buildDataPoints(value, key, map) {
                    $scope.dps.push({
                        label: key,
                        y: value
                    });
                    // dps.push({label: key,y: value});
                    ////console.log("DPS for key ",key,"is ",$scope.dps);					   
                }

                function buildDataPointsAmt(value, key, map) {
                    $scope.dpsAmt.push({
                        label: key,
                        y: value
                    });
                    // dps.push({label: key,y: value});
                    ////console.log("DPS for key ",key,"is ",$scope.dps);					   
                }

                shareid.dps1 = $scope.dps;
                shareid.dps2 = $scope.dpsAmt;
                ////console.log("Total Currency",$scope.dps);
                ////console.log("Total Amount",$scope.dpsAmt);


                $scope.mapOfMonths.forEach(buildDataPoints);
                $scope.mapOfAmt.forEach(buildDataPointsAmt);


                ////console.log("The Map is ",$scope.mapOfMonths);
                ////console.log("its size is ",$scope.mapOfMonths.size);
                //////console.log("The dps length is ",$scope.dps.length);
                //////console.log("The Map content ",$scope.mapOfMonths.get("USD"));
            };
             $scope.islcExpiryDate();

            ////console.log("DPS outside ",shareid.dps1);
            ////console.log("The Ext scope map is ",shareid.mapOfscope);
            var arr = shareid.currencies;





            ////console.log("Currency in shareid.curr ouside loop",shareid.curr);
            //////console.log("Arrays in graphs",shareid.curr[0]);
            ////console.log("LC-ORDERS amendArray ==---=>",response.data[0].amendArray);


            ////console.log("length response.data ==---=>",response.data.length);


            //});

            ////console.log("Type",typeof(shareid.curr));
            /* $scope.currencies = []; */
            $scope.currencies = shareid.curr;


            ////console.log("XVALUE =====",shareid.mapOfscope);


            ////console.log("XVALUE AFTER PUSH =====",shareid.mapOfscope);
            ////console.log("The Ext scope map is =========",shareid.mapOfscope);

            ////console.log("Dps----",typeof $scope.dps);
            ////console.log("sharedid.dps1",shareid.dps1);
            ////console.log("sharedid.dps2",shareid.dps2);
            //////console.log("Type",typeof(shareid.dps2));

            var label = "No.of LC's Opened in" + " " + $scope.thisMonth + " " + $scope.thisYear;

            ////console.log("This Month",$rootScope.thisMonth,$rootScope.thisYear);	

            $scope.chart = new CanvasJS.Chart("chartContainer1", {

                theme: 'theme1',
                title: {
                    /* text: "Number of LC's opened during September 2017" */
                    text: label,
                    fontSize: 15,
                },
                axisY: {
                    title: "Number of LC's",
                    labelFontSize: 16,
                },
                axisX: {
                    labelFontSize: 16,
                },
                dataPointMaxWidth: 40,
                data: [{
                    type: "column",
                    /* dataPoints: [
				   { label: $scope.currencies, y:10},
				   { label: shareid.curr, y:15} ,
                     /* { label: "USD", y: 15 },
                     { label: "EUR", y: 10 },
                     { label: "GBP", y: 7 }, */
                    //] */
                    dataPoints: shareid.dps1
                }]
            });

            $scope.chart.render();

            var label1 = "Value of LC opened in" + " " + $scope.thisMonth + " " + $scope.thisYear;
            $scope.chart = new CanvasJS.Chart("chartContainer2", {
                theme: 'theme1',
                title: {
                    text: label1,
                    fontSize: 15,
                },
                axisY: {
                    title: "Amount",
                    labelFontSize: 16,
                },
                axisX: {
                    labelFontSize: 16,
                },
                dataPointMaxWidth: 40,
                data: [{
                    type: "column",
                    dataPoints: shareid.dps2
                }]
            });
            $scope.chart.render();
            

            

        });


        $scope.openLc = (ID) => {
            $location.path("/lcOpen");
            shareid.ID = ID;
            $scope.ID = shareid.ID;
            // $rootScope.ID = $scope.ID;
            ////console.log("ID in home page  ",$scope.ID);
        }
        $scope.lcReqView = function (lcRequestNumber) {
            ////console.log("lcRequestNumber",lcRequestNumber);
            shareid.lcRequestNumber = lcRequestNumber;
            $location.path("/lcReqView");
        };

        ////////////////////////////////open BG starts//////////////
        $scope.getBGs = () =>$http.get(apiBaseURL + "/bg-req").then(function (response) {
            ////console.log("RESPONSE OF BG ORDERS===>",response.data);
            $scope.openbgs = response.data;
        });

        $scope.getBGs();

        // $scope.getBGs = () => $http.get(apiBaseURL + "/bg-req")
        //     .then((response) => $scope.openbgs = Object.keys(response.data)
        //         .map((key) => response.data[key])
        //         .reverse());
        //  $scope.getBGs = () => $http.get(apiBaseURL + "/get-customer-bg/"+$scope.username)
        //                             .then((response) => $scope.openbgs = Object.keys(response.data)
        //                             .map((key) => response.data[key])
        //                             .reverse());

        //$rootScope.bgRequestID = response.data.bgID;


        //                    $scope.getBGs1 = () => $http.get(apiBaseURL + "bg-req-empname/"+$scope.username)
        //                             .then(function(response){
        //                             $scope.bgs1 = response.data;
        //                             ////console.log("BGS OBJECT  ",$scope.bgs1);
        //                             });
        
        //const v1 = $scope.getBGs();
        ////console.log("openbgs set bankguarantee ",v1);


        $scope.getallBGs = () =>$http.get(apiBaseURL + "/bg-orders").then(function (response) {
            ////console.log("RESPONSE OF BG ORDERS===>",response.data);
            $scope.hyperAllBG = response.data;
			$scope.bog1 = response.data;
			//console.log("DATA FOR BG CHARTS",$scope.bog1);
			
			$scope.isbgExpiryDate = function (bog1) {

                ////console.log("hi am inside charts function",loc1);
                //return loc1[0].lcExpiryDate === "8/10/201";
                //$scope.valDate =$scope.loc1[0].lcExpiryDate
                //return $scope.loc1[0].lcExpiryDate;
                $scope.x1 = 0;
                $scope.count1 = 0;
                $scope.bgAmt = 0;
                $scope.curr1 = [];
                $scope.mapOfMonths1 = new Map();
                $scope.mapOfAmt1 = new Map();
                var date3 = new Date();
                var firstDay1 = new Date(date3.getFullYear(), date3.getMonth(), 1);
                var lastDay1 = new Date(date3.getFullYear(), date3.getMonth() + 1, 0);
                ////console.log("dates",firstDay,lastDay);

                //$scope.dps = [{label: "USA", y: 5}, {label: "INR", y: 6}, {label: "AUD", y: 4}, {label: "JPY", y: 7}];
                $scope.dps3 = []
                $scope.dpsAmt1 = []

                while ($scope.x1 < $scope.bog1.length) {

                    ////console.log("Expiry date",$scope.loc1[$scope.x].lCExpiryDate_t1);
                    var Startdate = $scope.bog1[$scope.x1].startDate_t1;
                    //console.log("BG START DATE",Startdate);
                    //var expDate1 = $scope.bog1[$scope.x1].lCExpiryDate_t1;
                    ////console.log("expdate",expDate); 
                    var date3 = new Date();
                    var firstDay1 = new Date(date3.getFullYear(), date3.getMonth(), 1);
                    var lastDay1 = new Date(date3.getFullYear(), date3.getMonth() + 1, 0);
                    var currency1 = $scope.bog1[$scope.x1].currency_t1;
                    //console.log("BG CURRENCY",currency1);
                    ////console.log("LC in while",$scope.loc1[$scope.x].lCAmount_t1);

                    $scope.currency1 = null
                    $scope.frequency1 = null
                    $scope.prevAmt1 = null

                    //var newdate1 = new Date(expDate1);
                    var newdate = new Date(Startdate);
                    var date1 = new Date();
                    ////console.log("dates after conversion",newdate);
                    var months1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                    ////console.log("date1",date1);
                    $scope.thisMonth = months1[date1.getMonth()];
                    $scope.thisYear = newdate.getFullYear();;
                    ////console.log("this Year",$rootScope.thisYear);
                    ////console.log("Current Month",$rootScope.thisMonth);
                    ////console.log("dates after conversion",newdate);
                    ////console.log("Firstday",firstDay);
                    ////console.log("LatDay",lastDay);

                    if (newdate >= firstDay1 && newdate <= lastDay1) {
                        ////console.log("Data for charts loc1",$scope.loc1[$scope.x]);
                        ////console.log("LC AMONUT",$scope.lcAmount_t1);
                        // $scope.count++;
                        $scope.bgAmt = parseInt($scope.bog1[$scope.x1].amount_t1);
                        ////console.log("Amonut in if",$scope.lcAmt);
                        //$scope.curr[$scope.x] = $scope.loc1[$scope.x].lcCurrency;
                        $scope.currency1 = $scope.bog1[$scope.x1].currency_t1;

                        ////console.log("Currency in  ",$scope.x ,"is ",$scope.currency+"");

                        if ($scope.mapOfMonths1.has($scope.currency1) && $scope.mapOfAmt1.has($scope.currency1)) {
                            ////console.log("Iam inside if map loop");

                            $scope.frequency1 = $scope.mapOfMonths1.get($scope.currency1);
                            $scope.mapOfMonths1.set($scope.currency1, $scope.frequency1 + 1);

                            $scope.prevAmt1 = $scope.mapOfAmt.get($scope.currency1);
                            $scope.mapOfAmt1.set($scope.currency1, $scope.prevAmt1 + $scope.bgAmt);
                        } else {
                            $scope.mapOfMonths1.set($scope.currency1, 1)
                            $scope.mapOfAmt1.set($scope.currency1, $scope.bgAmt)
                        }

                        /* shareid.mapOfscope = $scope.mapOfMonths;
                                                                                             ////console.log("Map of months----->shareid",shareid.mapOfscope);
                                                                                             shareid.curr=$scope.curr;
                                                                                           
                                                                                              ////console.log(" inside if loop",$scope.sum,$scope.count);
                                                                                                         */

                    }
                    $scope.x1++;
                    /* ////console.log("x",$scope.x);*/
                    //.log("shareid.curr------->",shareid.curr); 




                }
                ////console.log("DPS inside ",$scope.dps);

                function buildDataPoints(value, key, map) {
                    $scope.dps3.push({
                        label: key,
                        y: value
                    });
                    // dps.push({label: key,y: value});
                    ////console.log("DPS for key ",key,"is ",$scope.dps);                                                                        
                }

                function buildDataPointsAmt(value, key, map) {
                    $scope.dpsAmt1.push({
                        label: key,
                        y: value
                    });
                    // dps.push({label: key,y: value});
                    ////console.log("DPS for key ",key,"is ",$scope.dps);                                                                        
                }

                shareid.dps3 = $scope.dps3;
                shareid.dps4 = $scope.dpsAmt1;
                ////console.log("Total Currency",$scope.dps);
                ////console.log("Total Amount",$scope.dpsAmt);


                $scope.mapOfMonths1.forEach(buildDataPoints);
                $scope.mapOfAmt1.forEach(buildDataPointsAmt);


                //console.log("The Map is ",$scope.mapOfMonths1);
                ////console.log("its size is ",$scope.mapOfMonths.size);
                //////console.log("The dps length is ",$scope.dps.length);
                //////console.log("The Map content ",$scope.mapOfMonths.get("USD"));
            };
             $scope.isbgExpiryDate();

            //console.log("DPS outside ",shareid.dps3);
            ////console.log("The Ext scope map is ",shareid.mapOfscope);
            var arr1 = shareid.currencies;





            ////console.log("Currency in shareid.curr ouside loop",shareid.curr);
            //////console.log("Arrays in graphs",shareid.curr[0]);
            ////console.log("LC-ORDERS amendArray ==---=>",response.data[0].amendArray);


            ////console.log("length response.data ==---=>",response.data.length);


            //});

            ////console.log("Type",typeof(shareid.curr));
            /* $scope.currencies = []; */
            $scope.currencies1 = shareid.curr;


            ////console.log("XVALUE =====",shareid.mapOfscope);


            ////console.log("XVALUE AFTER PUSH =====",shareid.mapOfscope);
            ////console.log("The Ext scope map is =========",shareid.mapOfscope);

            ////console.log("Dps----",typeof $scope.dps);
            ////console.log("sharedid.dps1",shareid.dps1);
            ////console.log("sharedid.dps2",shareid.dps2);
            //////console.log("Type",typeof(shareid.dps2));

            
            label3 = "No.of BG's Opened in" + " " + $scope.thisMonth + " " + $scope.thisYear;
            $scope.chart = new CanvasJS.Chart("chartContainer3", {
                theme: 'theme1',
                title: {
                    //text: "Number of BG's opened in August 2017"
                    text: label3,
                    fontSize: 15,

                },
                axisY: {
                    title: "Number of BG's",
                   labelFontSize: 16,
                },
                axisX: {
                    labelFontSize: 16,
                },
                dataPointMaxWidth: 40,
                data: [{
                    type: "column",
                    dataPoints: shareid.dps3
                }]
            });

            $scope.chart.render();

            label4 = "Value of BG's opened in" + " " + $scope.thisMonth + " " + $scope.thisYear;
            $scope.chart = new CanvasJS.Chart("chartContainer4", {
                theme: 'theme1',
                title: {
                    //text: "Value of BG's opened in August 2017"
                    text: label4,
                    fontSize: 15,
                },
                axisY: {
                    title: "Amount",
                    labelFontSize: 16,
                },
                axisX: {
                    labelFontSize: 16,
                },
                dataPointMaxWidth: 40,
                data: [{
                    type: "column",
                    dataPoints: shareid.dps4
                }]
            });

            $scope.chart.render();
		
        });
        $scope.getallBGs();
        ////console.log("$scope.hyperAllBG===>",$scope.hyperAllBG);





        //const v = $scope.getBGs();
        ////console.log("val bg",v);
        ////console.log("test",$scope.getBGs1);

        $scope.openBG = (bgOpenID) => {
            shareid.bgOpenID = bgOpenID;
            $location.path("/bgOpen");
            ////console.log("ID in BgOpen  ",bgOpenID);
        }

        $scope.approveBG = (bgApproveID) => {
            shareid.bgApproveID = bgApproveID;
            $location.path("/bgApprove");
            ////console.log("ID in BG approve  ",bgApproveID);
        }


        $scope.approveAmendedBG = (bgApproveAmendID) => {

            shareid.bgApproveAmendID = bgApproveAmendID;
            //console.log("ID in BG amend approve  ",shareid.bgApproveAmendID);
            $location.path("/bgApproveAmend");
        }




        $scope.disableBGApproveBn = (bog) => {
//            //console.log("bog  here:scope.node",$scope.thisNode, bog);
            if (bog.beneficiaryNoncust_1_t1 != $scope.thisNode && bog.status == "ISSUED") {
                return false;
            } else {
                return true;
            }
        }

        $scope.OpenLcView = (lcID) => {
            //console.log("lcID in OpenLcView=====>", lcID);
            shareid.lcID = lcID;
            $location.path("/openLCView");
        }

        $scope.lcAmendReqView=function(lcAmendRequestNumber){
            //console.log("lcAmendRequestNumber",lcAmendRequestNumber);
            shareid.lcAmendRequestNumber=lcAmendRequestNumber;
            $location.path("/lcAmendReqView");
          }; 

		
		//bg amend view
			$scope.bgAmendReqView = function (bgAmendViewId){
				//console.log("bgAmendViewId",bgAmendViewId);
				shareid.bgAmendViewId = bgAmendViewId;
				$location.path("/bgAmendReqView");
			};

        ////////////////////////////////open BG ends//////////////

        //start
        $scope.getAmendedLCs = () => $http.get(apiBaseURL + "/lcamendreq")
            .then((response) => $scope.locamend = Object.keys(response.data)
                .map((key) => response.data[key])
                .reverse());
        $scope.getAmendedLCs();
        //end
        $scope.getAmendedBGs = () => $http.get(apiBaseURL + "/bgamendreq")
            .then((response) => $scope.bogamend = Object.keys(response.data)
                .map((key) => response.data[key])
                .reverse());
        $scope.getAmendedBGs();

        //start here
        $scope.amendAccept = (AmendID, AmendReqID) => {
            shareid.LC_Amend_ID = AmendID;
            shareid.LC_AmendReq_ID = AmendReqID;
            ////console.log("AmendID in home page  ",AmendID,AmendReqID);
            $location.path("/lcAmendAccept");
        }
        $scope.BGamendAccept = (bgAmendID, bgAmendReqID) => {
            shareid.bgAmendAcceptID = bgAmendID;
            shareid.bgAmendAcceptReqID = bgAmendReqID;
            //console.log("AmendID in home page  ",bgAmendID,bgAmendReqID);
            $location.path("/bgAcceptAmend");
        }

        //end here

        //start here
        $scope.approveAmendedLC = (AmendID) => {
            //$rootScope.AmendID = AmendID;
            ////console.log("amendId test",AmendID);
            shareid.AmendID = AmendID;
            //$rootScope.AmendReqID = AmendReqID;
            //////console.log("AmendID in home page  ",AmendID);
            ////console.log("AmendID in emp home page  ",AmendID,shareid.AmendID);
            $location.path("/lcAmendApprove");
        }
        //end here


        $scope.approveLc = (ApproveID) => {
            $location.path("/lcApprove");
            shareid.lcApproveID = ApproveID;
            //$rootScope.ApproveID = ApproveID;
            ////console.log("lcApproveID in employee page  ",shareid.lcApproveID,ApproveID);
        }

        $http.get(apiBaseURL + "/lcRequestID").then(function (response) {
            $rootScope.temp = response.data;
            ////console.log('temp',$rootScope.temp);
            $scope.lcRequestID = response.data;
            ////console.log("lcID in customer home page===>",response.data);
        });

        $scope.getMyLegalName = () => $http.get(apiBaseURL + "/me").then(function (response) {
			//console.log("response /me", response.data);
            $scope.thisNode = response.data;
			
            shareid.thisNode = $scope.thisNode;
           
        });
		$scope.getMyLegalName();
        $scope.getMyLegalName1 = () => $http.get(apiBaseURL + "/meID").then(function (response) {
			//console.log("response /meID", response);
            $scope.thisNodeID = response.data;
			//$scope.thisNode = response.data;
        });
        $scope.getMyLegalName1();


        //================================================================================================================================
        // Below is the logic for displaying the amended lc records based on the version number
        //================================================================================================================================

        //Start

        $scope.numberofamendval = null;

        $scope.empamendList = function (id, amendId) {
            //console.log("empamendList 	id", id, "amendId", amendId);
            shareid.selectedVersionID = id;

            $scope.numberofamendval = id;
            const getObj = apiBaseURL + "/employee-lc-orders/" + amendId;
            $http.get(getObj).then(function (response) {
                //console.log("//console getObj before", getObj);
                var finalData = response.data;
                // var len=finalData[0].lcNumberOfAmendment;
                var len = finalData.DATA.LcNumberOfAmendments;
                ////console.log(" finalData************",finalData,);


                var idVal = parseInt(id);

                ////console.log("length",len);
                ////console.log("idVal",idVal);
                ////console.log(" finalData.DATA.amendArray[idVal].lcAmendAmount",finalData.DATA.amendArray[0].lcAmendAmount);


                if (idVal == len) {
                    ////console.log("inside if========>:finalData.DATA.lcAmount",finalData.DATA);

                    $scope.newLCAmount_t1 = finalData.DATA.lCAmount_t1;
                    $scope.newLCExpiryDate_t1 = finalData.DATA.lCExpiryDate_t1;
                    $scope.newLCExpiryPlace_t1 = finalData.DATA.lCExpiryPlace_t1;
                    // ////console.log("amendAmountval",amendAmountval);
                    //$scope.numberOfAmendmentval=finalData[0].lcorder.lcNumberOfAmendment;
                    //$scope.lcAmendAdvisingBankRefval=finalData.DATA.advisingBankID;
                    //$scope.amendModeOfShipmentval=finalData.DATA.modeOfShipment;

                    //$scope.amendmentDetailsval=finalData[0].lcorder.lcAmendmentDetails;

                    ////console.log("id last:",idVal,"length",len)
                } else {

                    ////console.log("inside else",finalData.DATA.amendArray[idVal].lcAmendAmount);
                    $scope.newLCAmount_t1 = finalData.DATA.amendArray[idVal].lCAmount_t1;
                    $scope.newLCExpiryDate_t1 = finalData.DATA.amendArray[idVal].lCExpiryDate_t1;
                    $scope.newLCExpiryPlace_t1 = finalData.DATA.amendArray[idVal].lCExpiryPlace_t1;
                    //$scope.numberOfAmendmentval=finalData[0].lcorder.amendData[idVal].numberOfAmendment;
                    // $scope.lcAmendAdvisingBankRefval=finalData.DATA.amendArray[idVal].lcAmendAdvisingBankRef;
                    //$scope.lcAmendAdvisingBankRefval=finalData.DATA.advisingBankID;
                    //$scope.amendModeOfShipmentval=finalData.DATA.amendArray[idVal].amendModeOfShipment;

                    //$scope.amendmentDetailsval=finalData[0].lcorder.amendData[idVal].amendmentDetails;
                    ////console.log("id others:",idVal,"length",len)
                }


            });
        }

        $scope.empamendListNew = function (rec) {
            //console.log("entering in to the empamendListNew", rec);
            if (rec) {
                //console.log("entering in to the empamendListNew if case");
                const getObj = apiBaseURL + "/employee-lc-orders/" + rec.lcAmendId;
                $http.get(getObj).then(function (response) {

                    ////console.log("//console getObj before empamendListNew", response);
                    var finalData = response.data;
                    var len = finalData.DATA.lcNumberOfAmendments;
                    shareid.selectedVersionID = len;
                    //var idVal= parseInt(id);
                });
            }
            $scope.OpenLcView(rec.lcAmendId);
        }
        /*for reference amendarray fields
        		amendmentDetails
        		lCAmount_t1
        		lCExpiryDate_t1
        		lCExpiryPlace_t1
        		lcAmendReqId
        		lcId
        		lcNumberOfAmendments
        		status			  
        	*/

        $scope.empmyvar = false;


        //bgrequest and bgOpened view page starts
        $scope.bgReqView = function (bgReqID) {
            //console.log("bgReqID", bgReqID);
            shareid.bgReqID = bgReqID;
            $location.path("/bgRequestView");
        };

        $scope.bgOpenView = function (bgOpenViewID) {
            //console.log("bgOpened ID:", bgOpenViewID);
            shareid.bgOpenViewID = bgOpenViewID;
            $location.path("/bgOpenedView");
        };
        //bgrequest and  bgopened view page ends 

        $scope.historyemp = (amendId) => {

            $scope.empmyvar = true;

            const getObj = apiBaseURL + "/employee-lc-orders/" + amendId;

            $http.get(getObj).then(function (response) {

                var finalData = response.data;
                var len = finalData.DATA.LcNumberOfAmendments;

                if ($scope.numberofamendval != null) {
                    var idVal = parseInt($scope.numberofamendval);
                    ////console.log("length",len);
                    ////console.log("idVal",idVal);



                    if (idVal == len) {


                        $scope.amendAmountval = finalData.DATA.lcAmount;
                        //$scope.numberOfAmendmentval=finalData[0].lcorder.lcNumberOfAmendment;
                        //  $scope.lcAmendAdvisingBankRefval=finalData.lcorder.advisingBankID;
                        // $scope.amendModeOfShipmentval=finalData.DATA.modeOfShipment;
                        $scope.lcAmendExpiryDateval = finalData.DATA.lcExpiryDate;
                        $scope.lcAmendExpiryPlaceval = finalData.DATA.lcExpiryPlace;
                        //$scope.amendmentDetailsval=finalData[0].lcorder.lcAmendmentDetails;

                        ////console.log("id last:",idVal,"length",len)
                    } else {
                        $scope.amendAmountval = finalData.DATA.amendArray[idVal].lcAmendAmount;
                        //$scope.numberOfAmendmentval=finalData[0].lcorder.amendData[idVal].numberOfAmendment;
                        //$scope.lcAmendAdvisingBankRefval=finalData.lcorder.amendData[idVal].lcAmendAdvisingBankRef;
                        //$scope.lcAmendAdvisingBankRefval=finalData.lcorder.advisingBankID;
                        //$scope.amendModeOfShipmentval=finalData.DATA.amendArray[idVal].amendModeOfShipment;
                        $scope.lcAmendExpiryDateval = finalData.DATA.amendArray[idVal].lcAmendExpiryDate;
                        $scope.lcAmendExpiryPlaceval = finalData.DATA.amendArray[idVal].lcAmendExpiryPlace;
                        //$scope.amendmentDetailsval=finalData[0].lcorder.amendData[idVal].amendmentDetails;
                        ////console.log("id others:",idVal,"length",len)
                    }
                }

            });

        }

        /////////////history of amend BG/////

       /*  $scope.bgnumberofamendval = null;
        $scope.empamendBGList = function (id, amendId) {

            ////console.log("bg amendid ===>",amendId);
            ////console.log("bg no.of amend ===>",id);

            $scope.bgnumberofamendval = id
            const getObj = apiBaseURL + "/employee-bg-orders/" + amendId;
            $http.get(getObj).then(function (response) {
                ////console.log("inside history====>", response);

                var finalData = response.data.DATA;
                var len = finalData.bgNumberOfAmendments;

                var idVal = parseInt(id);
                ////console.log("length",len);
                ////console.log("idVal",idVal);



                if (idVal == len) {

                    $scope.bgamendAmountval = finalData.principalAmount;

                    $scope.bgAmendExpiryDateval = finalData.expiryDate;
                    $scope.bgTermsAndConditions = finalData.termsAndConditions;


                    ////console.log("id last:",idVal,"length",len)
                } else {

                    $scope.bgamendAmountval = finalData.bgAmendArray[idVal].principalAmount;

                    $scope.bgAmendExpiryDateval = finalData.bgAmendArray[idVal].expiryDate;
                    $scope.bgTermsAndConditions = finalData.bgAmendArray[idVal].termsAndConditions;
                }


            });
        } */

        //History method


        $scope.empbgmyvar = false;

        $scope.bgAmendAcceptView = (id,amendId) => {
			
			//console.log("bg no.of amend ===>",id);
			shareid.noOfAmendments = id;
			shareid.bgAmendAcceptViewId = amendId;
			//console.log("bg amendId ===>",amendId);
			$location.path("/bgAmendAcceptView");		
        }





        ////////END////////////////////////////

        // End

        //disable part start here

        $scope.disableButton1 = (loc) => {

            $http.get(apiBaseURL + "/bank/bankAddress/" + loc.advisingBankID_t2).then(function (response) {

                ////console.log("before approve====>",response.data[0].bankname,$scope.thisNode);
                //|| loc.status == "APPROVED" || loc.status == "AMEND_APPROVED"
                if (response.data[0].bankname != $scope.thisNode && loc.status == "OPENED" || loc.status == "BILL PARTIALLY LODGED" || loc.status == "BILL LODGED") {
                    //////console.log("DAAATAAA====>",loc.advisingBankID,$scope.thisNode)
                    return true;
                } else if (loc.status == "AMENDED" || loc.status == "APPROVED" || loc.status == "AMEND APPROVED" || loc.status == "DOCUMENT VERIFIED") {
                    return true;
                } else {
                    return false;
                }
            });
        }
        $scope.disableAmendButton1 = (loc) => {
			
           // $http.get(apiBaseURL + "/bank/bankAddress/" + loc.advisingBankID_t2).then(function (response) {
            //console.log("inside the disableAmendButton",loc.status, $scope.thisNodeID, loc.advisingBankID_t2);
            //console.log("inside the disableAmendButton",loc);
			//if (response.data[0].bankname !
            if (loc.advisingBankID_t2 != $scope.thisNodeID || loc.status == "APPROVED" || loc.status == "AMEND APPROVED" || loc.status == "BILL LODGED" || loc.status == "DOCUMENT VERIFIED" || loc.status == "BILL PARTIALLY LODGED" || loc.status == "AMENDED") {

			if((loc.advisingBankID_t2 != $scope.thisNodeID) && (loc.status == "ACCEPTED")) {
                    		//console.log("INSIDE if beneficiarybank ACCEPTED case");
                    return true;
            }
			
		/*	if((loc.advisingBankID_t2 == $scope.thisNodeID) && (loc.status == "AMENDED")) {
                    		//console.log("INSIDE if beneficiarybank AMENDED case");
                    return false;
            }
			*/
//            if (loc.advisingBankID != $scope.thisNode || loc.status == "APPROVED" || loc.status == "AMEND APPROVED" || loc.status == "OPENED" || loc.status == "BILL LODGED" || loc.status == "DOCUMENT VERIFIED" || loc.status == "BILL PARTIALLY LODGED" || loc.status == "AMENDED") {
                //	 //console.log("inside the disableAmendButton inside if case", loc.status, "returning true");
                //return true;
                return false;
            }
            /*                      else if(loc.status == "OPENED"){
                                     return true;
                                  }*/
            else {
                 if (loc.status == "OPENED") {
                    		//console.log("INSIDE if beneficiarybank OPENED case");
                    return true;
                }
                 else if (loc.status == "ACCEPTED") {
                    		//console.log("INSIDE if beneficiarybank ACCEPTED else case");
                    return false;
                }
                //   //console.log("inside the disableAmendButton inside else case", loc.status, "returning false"); 
                // return false;
                return true;
            }
          //  });
        }
		
		/////////////////////////////////////////////////////////////////////////////
        $scope.disableButton = (loc) => {
                if (loc.advisingBankID_t2 == $scope.thisNodeID)
				{
					if(loc.status == "OPENED"|| loc.status == "BILL PARTIALLY LODGED" || loc.status == "BILL LODGED")
					{
						return true;
					}
				    else if(loc.status == "APPROVED")
					{
						return false;
					}
				    else
					{
						return true;
					}
				}
				else if (loc.advisingBankID_t2 != $scope.thisNodeID)
				{
					if(loc.status == "OPENED")
					{
						return false;
					}
					else if(loc.status == "APPROVED")
					{
						return true;
					}
					else
					{
						return true;
					}
				}
        }
		
		
		$scope.disableAmendButton = (loc) => {
                if (loc.advisingBankID_t2 == $scope.thisNodeID)
				{
					////console.log("Amend button al=pplicant bank");
					if(loc.status == "AMENDED"|| loc.status == "BILL PARTIALLY LODGED" || loc.status == "BILL LODGED")
					{
						////console.log("Amend button al=pplicant bank AMENDED");
						return true;
					}
				    else if(loc.status == "AMEND APPROVED")
					{
						////console.log("Amend button al=pplicant bank AMEND APPROVED");
						return false;
					}
				    else
					{
						////console.log("Amend button al=pplicant bank else");
						return true;
					}
				}
				else if (loc.advisingBankID_t2 != $scope.thisNodeID)
				{
					////console.log("Amend button beneficiary bank");
					if(loc.status == "AMENDED")
					{
						////console.log("Amend button beneficiary bank AMENDED");
						return false;
					}
					else if(loc.status == "AMEND APPROVED")
					{
						////console.log("Amend button beneficiary bank AMEND APPROVED");
						return true;
					}
				    else
					{
						////console.log("Amend button beneficiary bank else case");
						return true;
					}
				}
        }
		///////////////////////////////////////////////////////////////////////////////
		
        $scope.disableDocumentButton = (loc) => {
       //    //console.log("loc status==>",loc.status,"advisingBankID==>",loc.advisingBankID_t2,"thisNode==>",$scope.thisNodeID);
        //    $http.get(apiBaseURL + "/bank/bankAddress/" + loc.advisingBankID_t2).then(function (response) {
				
           // if (response.data[0].bankname  != $scope.thisNode) {
           if (loc.advisingBankID_t2 != $scope.thisNodeID) {
		 //  //console.log("INSIDE applicantbank");
                if (loc.status == "BILL LODGED" || loc.status == "BILL PARTIALLY LODGED" || loc.status == "DOCUMENT UPLOADED" || loc.status == "APPROVED") {
                    //	//console.log("INSIDE if applicantbank",loc.status);
                    return false;
                } else if (loc.status == "APPROVED") {
                    //  //console.log("INSIDE else applicantbank ",loc.status);
                    return true;

                }
            } else {
            //     //console.log("INSIDE beneficiarybank");
                if (loc.status != "BILL LODGED" || loc.status != "BILL PARTIALLY LODGED" || loc.status != "DOCUMENT UPLOADED") {
                    //		//console.log("INSIDE if beneficiarybank");
                    return false;
                }
                ////console.log("inside else beneficiarybank");
                return false;
            }
         //   });
        }

        $scope.disableBgAmendButton = (bog) => {

            //////console.log("hi came here:bog",bog);

            //|| loc.status == "APPROVED" || loc.status == "AMEND_APPROVED"
            if (bog.beneficiaryBank != $scope.thisNode || bog.status == "APPROVED" || bog.status == "AMEND APPROVED") {
                return true;
            } else if (bog.status == "OPENED") {
                return true;
            } else {
                return false;
            }

        }
		$scope.disableBgAmendApproveButton = (bog) => {

            if (bog.beneficiaryNoncust_1_t1 != $scope.thisNode && bog.status == "AMENDED") {
                return false;
            } else {
                return true;
            }

        }

        /* $scope.chart = new CanvasJS.Chart("chartContainer3", {
            theme: 'theme1',
            title:{
                text: "Number of BG's opened in August 2017"
            },
            axisY: {
                title: "Number of BG's",
                labelFontSize: 16,
            },
            axisX: {
                labelFontSize: 16,
            },
            data: [
                {
                  type: "column",
                    dataPoints: [
                      { label: "USD", y: 10 },
                      { label: "EUR", y: 12 },
                      { label: "GBP", y: 8 },
                    ]
                }
            ]
        });

        $scope.chart.render();
        $scope.chart = new CanvasJS.Chart("chartContainer4", {
                theme: 'theme1',
                title:{
                    text: "Value of BG's opened in August 2017"
                },
                axisY: {
                    title: "Amount",
                    labelFontSize: 16,
                },
                axisX: {
                    labelFontSize: 16,
                },
                data: [
                    {
                      type: "column",
                        dataPoints: [
                          { label: "USD", y: 7300000 },
                          { label: "EUR", y: 10500000 },
                          { label: "GBP", y: 3000000 },
                        ]
                    }
                ]
            });

            $scope.chart.render();
 */
        $scope.chart = new CanvasJS.Chart("chartContainer5", {
            theme: 'theme1',
            title: {
                text: "Commission earned from LC's/BG's"
            },
            axisY: {
                title: "Amount",
                labelFontSize: 16,
            },
            axisX: {
                labelFontSize: 16,
            },
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "{y} - #percent %",
                yValueFormatString: "#0.#,,. Million",
                legendText: "{indexLabel}",
                dataPoints: [{
                        y: 4181563,
                        indexLabel: "LC's"
                    },
                    {
                        y: 2175498,
                        indexLabel: "BG's"
                    },

                ]
            }]
        });

        $scope.chart.render();







        $scope.changeChartType = function (chartType) {
            $scope.chart.options.data[0].type = chartType;
            $scope.chart.render(); //re-render the chart to display the new layout
        }


        ///////////////////////////charts end/

    } else {
        $location.path("/customer");
    }
});
