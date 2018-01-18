var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
var parseJson = require('parse-json');

var routes = require('./routes/index');
var users = require('./routes/users');
var dishrouter = require('./routes/dishrouter');
var promorouter = require('./routes/promorouter');
var leaderrouter = require('./routes/leaderrouter');
//var customerRouter=require('./routes/customerRouter');
//var employeeRouter=require('./routes/employeeRouter');
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
//  var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var fs = require('fs');


var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var smtpPool = require('nodemailer-smtp-pool');

var transporter = nodemailer.createTransport(
	smtpPool({
		host: 'localhost',
		port: 1025,
		ignoreTLS: true
	})
);


var betabank = express();
betabank.use(cors());



//for handling bigger files
var jsonParser = bodyParser.json({
	limit: 1024 * 1024 * 20,
	type: 'application/json'
});
var urlencodedParser = bodyParser.urlencoded({
	extended: true,
	limit: 1024 * 1024 * 20,
	type: 'application/x-www-form-urlencoding'
})

betabank.use(jsonParser);
betabank.use(urlencodedParser);

var inf;
betabank.use(morgan('dev'));
betabank.use(bodyParser.urlencoded({
	'extended': 'true'
})); // parse application/x-www-form-urlencoded
betabank.use(bodyParser.json()); // parse application/json
betabank.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json


var Ibc1 = require('ibm-blockchain-js'); //rest based SDK for ibm blockchain
var ibc = new Ibc1();



try {
	//this hard coded list is intentionaly left here, feel free to use it when initially starting out
	//please create your own network when you are up and running
	var manual = JSON.parse(fs.readFileSync('mycreds_docker_compose.json', 'utf8'));
	//var manual = JSON.parse(fs.readFileSync('mycreds.json', 'utf8'));
	//var manual = JSON.parse(fs.readFileSync('testcreds.json', 'utf8'));
	//var manual = JSON.parse(fs.readFileSync('mycreds_bluemix.json', 'utf8'));
	var peers = manual.credentials.peers;
	//console.log('loading hardcoded peers',peers);
	var users = null; //users are only found if security is on
	if (manual.credentials.users) users = manual.credentials.users;
	//console.log('loading hardcoded users',users);
} catch (e) {
	//console.log('Error - could not find hardcoded peers/users, this is okay if running in bluemix');
}




// view engine setup
betabank.set('views', path.join(__dirname, 'views'));
betabank.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//alfabank.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
betabank.use(logger('dev'));
betabank.use(bodyParser.json());
betabank.use(bodyParser.urlencoded({
	extended: false
}));
betabank.use(cookieParser());
betabank.use(express.static(path.join(__dirname, 'public')));

var mysql = require('mysql');
var shareddb = mysql.createPool({
connectionLimit: 150000,
host: 'localhost',
user: 'root',
password: 'admin',
database: 'shareddb'
});



var beneficiarybank = mysql.createPool({
connectionLimit: 150000,
host: 'localhost',
user: 'root',
password: 'admin',
database: 'beneficiarybank'
});



var applicantbank = mysql.createPool({
connectionLimit: 150000,
host: 'localhost',
user: 'root',
password: 'admin',
database: 'applicantbank'
});



var chaincode = null;
var ccdeployed = null;
var parseval = null;


var options = {
	network: {
		peers: [

{
"api_host": "192.168.99.100", //replace with your hostname or ip of a peer                                        //replace with your https port (optional, omit if n/a)
"api_port": 8050,        //replace with your http port
"type": "peer",
"id": "jdpe"             //unique id of peer
}
],                                                                                                                                                                                                                                                                             //lets only use the first peer! since we really don't need any more than 1
users: [

			{
				"enrollId": "alice",
				"enrollSecret": "CMS10pEQlB16"
			}
		],
		//dump the whole thing, sdk will parse for a good one
		options: {
			quiet: true, //detailed debug messages on/off true/false
			tls: false, //should app to peer communication use tls?
			maxRetry: 1 //how many times should we retry register before giving up
		},
	},
	chaincode: {
		//zip_url: 'https://github.com/ibm-blockchain/marbles/archive/v2.0.zip',
		//subdirectroy name of chaincode after unzipped
		//git_url: 'http://gopkg.in/ibm-blockchain/marbles.v2/chaincode',                                                                                         //GO get http url

		git_url: 'https://github.com/bminchal/chain1/blob/master/git_code/',
		zip_url: 'https://github.com/bminchal/chain1/archive/master.zip',
		//unzip_dir: 'marbles-2.0/chaincode',
		unzip_dir: '/chain1-master/git_code/',

		deployed_name: 'fcbc3b0ebe0ef7fb2dbf4c88544ed81019c355b28ccda2dab74688371b4328eebd826e5d5156f092dfbabbb2b4d195d42242d8410c6b8d51ac185e021d1b575a',


		//hashed cc name from prev deployment, comment me out to always deploy, uncomment me when its already deployed to skip deploying again
		//deployed_name: '16e655c0fce6a9882896d3d6d11f7dcd4f45027fd4764004440ff1e61340910a9d67685c4bb723272a497f3cf428e6cf6b009618612220e1471e03b6c0aa76cb'
	}
};

// ---- Fire off SDK ---- //



//// Post method /////

// create todo and send back all todos after creation
//sdk will populate this var in time, lets give it high scope by creating it here
ibc.load(options, function (err, cc) { //parse/load chaincode, response has chaincode functions!
	if (err != null) {
		//console.log("options===>",options);

		//console.log('! looks like an error loading the chaincode or network, app will fail\n', err);
	} else {
		chaincode = cc;



		// ---- To Deploy or Not to Deploy ---- //
		if (!cc.details.deployed_name || cc.details.deployed_name === '') { //yes, go deploy
			cc.deploy('init', ['99'], {
				delay_ms: 30000
			}, function (e) { //delay_ms is milliseconds to wait after deploy for conatiner to start, 50sec recommended
				check_if_deployed(e, 1);
			});
		} else { //no, already deployed
			//console.log('chaincode summary file indicates chaincode has been previously deployed');
			check_if_deployed(null, 1);
		}
	}
});


//loop here, check if chaincode is up and running or not

function check_if_deployed(e, attempt) {
	if (e) {
		cb_deployed(e); //looks like an error pass it along
	}

	cb_deployed(null);


}


function cb_deployed(e) {
	if (e != null) {
		//look at tutorial_part1.md in the trouble shooting section for help
		//console.log('! looks like a deploy error, holding off on the starting the socket\n', e);
	} else {
		console.log('------------------------------------------ Service Up ------------------------------------------');

		ccdeployed = "deployed";

	}


}


betabank.post('/lc-validate', function (req, res) {
	var loc = req.body;
	//console.log("TEXT FROM UI", loc);
	var input = JSON.stringify(loc);
	chaincode.query.Validation([input], function (err, resp) {
		if (resp != null) {
			//console.log("resp ===>",resp);
			var sTemp = "";
			var aObjs = [];
			var stop = 0;
			for (var i = 0; i < resp.length; ++i) {
				sTemp += resp[i];

				if (resp[i] == "{") {
					stop++;
				}
				if (resp[i] == "}") {
					stop--;
				}
				if ((resp[i] == "}") && (stop == 0)) {
					aObjs.push(JSON.parse(sTemp));
					sTemp = "";
				}
			}
			res.json(aObjs);
		}
	});

	return res;
});

betabank.post('/bg-validate', function (req, res) {
	var bg = req.body;
	console.log("TEXT FROM UI", bg);
	var input = JSON.stringify(bg);
	//console.log("TEXT FROM UI", );
	chaincode.query.BGValidation([input], function (err, resp) {		
		if (resp != null) {
				console.log("resp ===>",resp);
			var sTemp = "";
			var aObjs = [];
			var stop = 0;
			for (var i = 0; i < resp.length; ++i) {
				sTemp += resp[i];

				if (resp[i] == "{") {
					stop++;
				}
				if (resp[i] == "}") {
					stop--;
				}
				if ((resp[i] == "}") && (stop == 0)) {
					aObjs.push(JSON.parse(sTemp));
					sTemp = "";
				}
			}				
			res.json(aObjs);
		}
	});	

	return res;	
});

/* betabank.post('/lc-open', function (req, res) {


	var loc = req.body;
	//console.log("TEXT FROM UI",loc);

	var ID = loc.lcId;
	var LCID = loc.lcId;
	var LCREQ = loc.lcRequestNumber;
	//console.log("LCID",LCID);
	//console.log("LCREQ",loc.lcreqid);


	beneficiarybank.query("UPDATE letterofcredit SET status ='OPENED' WHERE lcRequestNumber = ?", [LCREQ], function (err, result) {  
		if (err) throw err;


		//console.log('updated of record:', result);


	});


	var input = JSON.stringify(loc);
	chaincode.invoke.OpenLetterOfCredit([ID, input]);
	var response = res.end(ID + " has been Opened successfully");

	var fromId = "admin@" + loc.applicantBank.toLowerCase() + ".com";
	var  to =   {
		"one": loc.applicantCustomer.toLowerCase() + "@mail.com",
		"two": "admin@" + loc.advisingBankID.toLowerCase() + ".com",
		"three": loc.beneficiaryId.toLowerCase() + "@mail.com"
	}; 
	var stat = "Requesting for LC Status - opened";
	var msg = "Hi,\n I have opened for LC. Kindly process. " + loc.lcId + " is opened";

	sendEmail(fromId, to, stat, msg);


	return response;


	/* chaincode.invoke.OpenLetterOfCredit([ID, input],function(err, resp){
	//console.log("RESPONSE  ",resp);
	var response = res.end(toString(resp));
	//console.log("response",resp);
	//var response = res.end("LC-ID",ID ,"CREATED SUCCESSFULY");
	return response;
	});



}); */


betabank.post('/lc-open', function (req, res) {


	var loc = req.body;
	//console.log("TEXT FROM UI", loc);

	var ID = loc.lcId;
	//console.log("loc object",loc);
	var LCREQ = loc.lcRequestNumber;





	var reqId = loc.lcRequestNumber;

	var applicantID = loc.applicantID_t1;
	var beneficiaryID = loc.beneficiaryID_t2;
	var lcCurrency = loc.lCCurrency_t1;
	var lcAmount = loc.lCAmount_t1;
	var lcExpirydate = loc.lCExpiryDate_t1;

	var date = require('date-and-time');

	var moment = require('moment');

	var date = '21/01/2015';
	var d = new Date(date.split("/").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	var newdate = yy + "/" + mm + "/" + dd;
	var dateFormat = require('dateformat');
	var newdate = lcExpirydate.split('/');

	var newDateString = newdate[2] + newdate[0] + newdate[1];
	console.log("newDateString", newDateString);


	var lcIsuueDate = loc.lCIssueDate_t1;
	console.log("LCISSUE DATE", lcIsuueDate);
	var newdate1 = lcIsuueDate.split('/');
	var newDateString1 = newdate1[2] + newdate1[0] + newdate1[1];
	console.log("lcIssueDate", newDateString1);

	var lcExpiryplace = loc.lCExpiryPlace_t1;
	var advisingBankId = loc.advisingBankID_t2;
	var availableBankcust = loc.availableWithBankID_t2;
	var lcType = loc.importSightPmtLCType_t1;

	var shipmentDate = loc.shipmentDate_t1;
	var liablilityReversaldate = loc.liablityReversalDate_t1;
	var limitReference = loc.limitReference_t1;
	var autoExpiry = loc.autoExpiry_t1;
	var availableBy = loc.mT700_1_AvailableBy;
	var accountOfficer = loc.accountOfficer_t1;
	var otherOfficer = loc.otherOfficer_t1
	var incoTerms = loc.incoTerms_t1;
	var presentationDays = loc.presentationDays_t1;
	var autoExpiry = loc.autoExpiry_t1;
	var chargesFrom = loc.chargesFrom_t3;
	var limitProvision = loc.limitwithProvision_t6;
	var modeOfShipment = loc.modeOfShipment_t1;

	var chargeAccount = loc.chargeDefaultAcct_t3;
	var chargeCode = loc.chargeCode_t3;
	var chargeDebitAccount = loc.chargeDebitAcct_t3;
	var chargeCurrency = loc.chargeCurrency_t3;
	var chargeExchgRate = loc.chargeExchangeRate_t3;
	var chargeStatus = loc.chargeStatus_t3;
	var chargeAmount = loc.chargeAmount_t3;
	var waiveCharges = loc.waiveCharges_t3;

	var commissionCode = loc.commissionCode_t4;
	var commissionParty = loc.commissionParty_t4;
	var commissionFreq = loc.commissionFrequency_t4;
	var commissionRate = loc.commissionRate_t4;
	var accrualParam = loc.accrualParam_t4;
	var fixedCommissionAmt = loc.fixedCommissionAmount_t4;
	var commissionAccount = loc.commissionAccount_t4;
	var commissionExchgRate = loc.commissionExchangeRate_t4;
	var commissionClaimed = loc.commissionClaimed_t4;
	var returnCommission = loc.returnCommission_t4;
	var commissionParty = loc.commissionParty_t4;

	var slRefTranche = loc.sLRefTranche_t5;
	var productType = loc.productType_t5;
	var basicCcyRate = loc.baseCcyRate_t5;
	var participator = loc.participator_t5;
	var partShare = loc.partShare_t5
	var partAmt = loc.partAmount_t5;
	var syndicateCharge = loc.syndicateCharge_t5;
	var ownPartAmt = loc.ownPartAmt_t5;
	var bankTobankInfo = loc.bankToBankInfo_t5;

	var documentsCode = loc.documentsCode_1_t8;
	var documentsText = loc.aDocumentsText_1_t8;
	var adocumentsReq = loc.aDocumentsRequired_t8;
	var percentageDraft = '12';
	var percentageAmt = '12';



	var appRuleCodes = 'UCP LATEST VERSION';

	console.log("Request Id ", reqId, applicantID, beneficiaryID, lcCurrency, lcAmount, lcExpirydate, lcExpiryplace, advisingBankId, availableBankcust, chargesFrom, chargeAccount, chargeCode, chargeDebitAccount, chargeCurrency, chargeExchgRate, chargeAmount, waiveCharges);
	console.log("ChargesAccount", chargeDebitAccount);
	console.log("Commission Fields", commissionCode, commissionParty, commissionFreq, commissionRate, accrualParam, fixedCommissionAmt, commissionAccount, commissionExchgRate, commissionClaimed, returnCommission);
	console.log("Payment Fields", slRefTranche, productType, basicCcyRate, participator, partShare, partAmt, syndicateCharge, ownPartAmt, bankTobankInfo);
	console.log("Documents Fields", documentsCode, documentsText, adocumentsReq);


	//rsj = require('rsj');
	var requestHeaders = {
		'cache-control': 'no-cache',
		//'soapaction': 'addRoom',
		'content-type': undefined
	};
	var test, finalData;
	//var requestBody ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tes="http://temenos.com/TestLC" xmlns:let="http://temenos.com/LETTEROFCREDITIMPSIGHTWEB"><soapenv:Header/> <soapenv:Body><tes:CreateSightPaymentImportLC><WebRequestCommon><company>GB0010001</company><password>123123</password><userName>INPUTT</userName></WebRequestCommon><OfsFunction><activityName/><assignReason/><dueDate/><extProcess/><extProcessID/><gtsControl/><messageId/><noOfAuth/><owner/><replace/><startDate/><user/></OfsFunction><LETTEROFCREDITIMPSIGHTWEBType   id=""><let:LCTYPE>'+lcType+'</let:LCTYPE><let:APPLICANTCUSTNO>'+applicantID+'</let:APPLICANTCUSTNO><let:gAPPLICANT g="'+applicantID+'"/><let:BENEFICIARYCUSTNO>'+beneficiaryID+'</let:BENEFICIARYCUSTNO><let:gBENEFICIARY g="'+beneficiaryID+'"/><let:ADVISINGBKCUSTNO>'+advisingBankId+'</let:ADVISINGBKCUSTNO><let:gADVISINGBK g="'+advisingBankId+'"/><let:LCCURRENCY>'+lcCurrency+'</let:LCCURRENCY><let:LCAMOUNT>'+lcAmount+'</let:LCAMOUNT><let:EXPIRYDATE>'+newDateString+'</let:EXPIRYDATE><let:EXPIRYPLACE>'+lcExpiryplace+'</let:EXPIRYPLACE><let:AVAILWITHCUSTNO>"'+availableBankcust+'"</let:AVAILWITHCUSTNO><let:gAVAILABLEWITH g="'+availableBankcust+'"/><let:gOTHEROFFICER g="100"/><let:ADVICEEXPIRYDATE>'+newDateString+'</let:ADVICEEXPIRYDATE></LETTEROFCREDITIMPSIGHTWEBType  ></tes:CreateSightPaymentImportLC></soapenv:Body></soapenv:Envelope>'


	var requestBody = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:imp="http://temenos.com/ImportLC" xmlns:let="http://temenos.com/LETTEROFCREDITIMPSIGHT1"><soapenv:Header/><soapenv:Body><imp:ImportSightLC><!--Optional:--><WebRequestCommon><!--Optional:--><company>GB0010001</company><password>123123</password><userName>AUTHOR</userName></WebRequestCommon><!--Optional:--><OfsFunction><!--Optional:--><activityName></activityName><!--Optional:--><assignReason></assignReason><!--Optional:--><dueDate></dueDate><!--Optional:--><extProcess></extProcess><!--Optional:--><extProcessID></extProcessID><!--Optional:--><gtsControl></gtsControl><!--Optional:--><messageId></messageId><!--Optional:--><noOfAuth></noOfAuth><!--Optional:--><owner></owner><!--Optional:--><replace></replace><!--Optional:--><startDate></startDate><!--Optional:--><user></user></OfsFunction><!--Optional:--><LETTEROFCREDITIMPSIGHT1Type id=""><!--Optional:--><let:LCTYPE>' + lcType + '</let:LCTYPE><!--Optional:--><let:APPLICANTCUSTNO>' + applicantID + '</let:APPLICANTCUSTNO><!--Optional:--><let:gAPPLICANT g="' + applicantID + '"><!--Zero or more repetitions:--><let:APPLICANT>' + applicantID + '</let:APPLICANT></let:gAPPLICANT><!--Optional:--><let:BENEFICIARYCUSTNO>' + beneficiaryID + '</let:BENEFICIARYCUSTNO><!--Optional:--><let:ADVISINGBKCUSTNO>' + advisingBankId + '</let:ADVISINGBKCUSTNO><!--Optional:--><let:CHARGESACCOUNT>' + chargeDebitAccount + '</let:CHARGESACCOUNT><!--Optional:--><let:LCCURRENCY>' + lcCurrency + '</let:LCCURRENCY><!--Optional:--><let:LCAMOUNT>' + lcAmount + '</let:LCAMOUNT><!--Optional:--><let:ISSUEDATE>' + newDateString1 + '</let:ISSUEDATE><!--Optional:--><let:EXPIRYDATE>' + newDateString + '</let:EXPIRYDATE><!--Optional:--><let:EXPIRYPLACE>' + lcExpiryplace + '</let:EXPIRYPLACE><!--Optional:--><let:PERCENTAGEDRAMT>12</let:PERCENTAGEDRAMT><!--Optional:--><let:PERCENTAGECRAMT>12</let:PERCENTAGECRAMT><!--Optional:--><let:AVAILWITHCUSTNO>' + availableBankcust + '</let:AVAILWITHCUSTNO><!--Optional:--><let:PORTLIMREF></let:PORTLIMREF><!--Optional:--><let:LATESTSHIPMENT></let:LATESTSHIPMENT><!--Optional:--><let:gDOCUMENTCODE g="1"><!--Zero or more repetitions:--><let:mDOCUMENTCODE m="11"><!--Optional:--><let:DOCUMENTCODE>' + documentsCode + '</let:DOCUMENTCODE><!--Optional:--><let:sgDOCUMENTTXT sg="1"><!--Zero or more repetitions:--><let:DOCUMENTTXT>' + documentsText + '</let:DOCUMENTTXT></let:sgDOCUMENTTXT></let:mDOCUMENTCODE></let:gDOCUMENTCODE><!--Optional:--><let:CHARGESFROM>' + chargesFrom + '</let:CHARGESFROM><!--Optional:--><let:ACCOUNTOFFICER>' + accountOfficer + '</let:ACCOUNTOFFICER><!--Optional:--><let:gOTHEROFFICER g="2"><!--Zero or more repetitions:--><let:OTHEROFFICER>' + otherOfficer + '</let:OTHEROFFICER></let:gOTHEROFFICER><!--Optional:--><let:WAIVECHARGES>' + waiveCharges + '</let:WAIVECHARGES><!--Optional:--><let:gCHARGECODE g="1"><!--Zero or more repetitions:--><let:mCHARGECODE m="1"><!--Optional:--><let:CHARGECODE>' + chargeCode + '</let:CHARGECODE><!--Optional:--><let:CHARGECURRENCY>' + chargeCurrency + '</let:CHARGECURRENCY><!--Optional:--><let:CHARGEXCHG>' + chargeExchgRate + '</let:CHARGEXCHG><!--Optional:--><let:CHARGEAMOUNT>' + chargeAmount + '</let:CHARGEAMOUNT><!--Optional:--><let:CHARGESTATUS>' + chargeStatus + '</let:CHARGESTATUS></let:mCHARGECODE></let:gCHARGECODE><!--Optional:--><let:gDOCUMENTSREQ g="1"><!--Zero or more repetitions:--><let:DOCUMENTSREQ>' + adocumentsReq + '</let:DOCUMENTSREQ></let:gDOCUMENTSREQ><!--Optional:--><let:OLDLCNUMBER></let:OLDLCNUMBER><!--Optional:--><let:PROVISAMOUNT></let:PROVISAMOUNT><!--Optional:--><let:PORTNOBEN></let:PORTNOBEN><!--Optional:--><let:PORTNOAPPISS></let:PORTNOAPPISS><!--Optional:--><let:ADVICEEXPIRYDATE></let:ADVICEEXPIRYDATE><!--Optional:--><let:APPLRULECODES>' + appRuleCodes + '</let:APPLRULECODES><!--Optional:--><let:INCOTERMS>' + incoTerms + '</let:INCOTERMS><!--Optional:--><let:SLREFTRANCHE></let:SLREFTRANCHE><!--Optional:--><let:PRODUCTTYPE></let:PRODUCTTYPE><!--Optional:--><let:BASECCYRATE></let:BASECCYRATE><!--Optional:--><let:PARTSHARE></let:PARTSHARE><!--Optional:--><let:OWNPARTAMOUNT></let:OWNPARTAMOUNT><!--Optional:--><let:SYNDICATECHARGE></let:SYNDICATECHARGE><!--Optional:--><let:PRESENTATIONDAYS>' + presentationDays + '</let:PRESENTATIONDAYS><!--Optional:--><let:AUTOEXPIRY>' + autoExpiry + '</let:AUTOEXPIRY><!--Optional:--><let:COMMCODE>' + commissionCode + '</let:COMMCODE><!--Optional:--><let:COMMFREQUENCY>' + commissionFreq + '</let:COMMFREQUENCY><!--Optional:--><let:COMMRATE>' + commissionRate + '</let:COMMRATE><!--Optional:--><let:ACCRUALPARAM>' + accrualParam + '</let:ACCRUALPARAM><!--Optional:--><let:COMMACCOUNT></let:COMMACCOUNT><!--Optional:--><let:COMMEXCHRATE>' + commissionExchgRate + '</let:COMMEXCHRATE><!--Optional:--><let:COMMCLAIMED>' + commissionClaimed + '</let:COMMCLAIMED><!--Optional:--><let:COMMAMOUNT>' + fixedCommissionAmt + '</let:COMMAMOUNT><!--Optional:--><let:RETURNCOMM>' + returnCommission + '</let:RETURNCOMM><!--Optional:--><let:COMMPARTYCHG>' + commissionParty + '</let:COMMPARTYCHG><!--Optional:--><let:MODEOFSHIPMENT>SEA</let:MODEOFSHIPMENT><!--Optional:--><let:gINBKTOBK g="1"><!--Zero or more repetitions:--><let:INBKTOBK>' + bankTobankInfo + '</let:INBKTOBK></let:gINBKTOBK><!--Optional:--><let:TransType></let:TransType></LETTEROFCREDITIMPSIGHT1Type></imp:ImportSightLC></soapenv:Body></soapenv:Envelope>';


	console.log("REQUESTBODY", requestBody);




	/* var requestBody = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:imp="http://temenos.com/ImportLC" xmlns:let="http://temenos.com/LETTEROFCREDITIMPSIGHT1"><soapenv:Header/><soapenv:Body><imp:ImportSightLC><!--Optional:--><WebRequestCommon><!--Optional:--><company>GB0010001</company><password>123123</password><userName>AUTHOR</userName></WebRequestCommon><!--Optional:--><OfsFunction><!--Optional:--><activityName></activityName><!--Optional:--><assignReason></assignReason><!--Optional:--><dueDate></dueDate><!--Optional:--><extProcess></extProcess><!--Optional:--><extProcessID></extProcessID><!--Optional:--><gtsControl></gtsControl><!--Optional:--><messageId></messageId><!--Optional:--><noOfAuth></noOfAuth><!--Optional:--><owner></owner><!--Optional:--><replace></replace><!--Optional:--><startDate></startDate><!--Optional:--><user></user></OfsFunction><!--Optional:--><LETTEROFCREDITIMPSIGHT1Type id=""><!--Optional:--><let:LCTYPE>'+lcType+'</let:LCTYPE><!--Optional:--><let:APPLICANTCUSTNO>'+applicantID+'</let:APPLICANTCUSTNO><!--Optional:--><let:gAPPLICANT g="'+applicantID+'"><!--Zero or more repetitions:--><let:APPLICANT>'+applicantID+'</let:APPLICANT></let:gAPPLICANT><!--Optional:--><let:BENEFICIARYCUSTNO>'+beneficiaryID+'</let:BENEFICIARYCUSTNO><!--Optional:--><let:ADVISINGBKCUSTNO>'+advisingBankId+'</let:ADVISINGBKCUSTNO><!--Optional:--><let:CHARGESACCOUNT>'+chargeDebitAccount+'</let:CHARGESACCOUNT><!--Optional:--><let:LCCURRENCY>'+lcCurrency+'</let:LCCURRENCY><!--Optional:--><let:LCAMOUNT>'+lcAmount+'</let:LCAMOUNT><!--Optional:--><let:ISSUEDATE>'+newDateString1+'</let:ISSUEDATE><!--Optional:--><let:EXPIRYDATE>'+newDateString+'</let:EXPIRYDATE><!--Optional:--><let:EXPIRYPLACE>'+lcExpiryplace+'</let:EXPIRYPLACE><!--Optional:--><let:PERCENTAGEDRAMT>12</let:PERCENTAGEDRAMT><!--Optional:--><let:PERCENTAGECRAMT>12</let:PERCENTAGECRAMT><!--Optional:--><let:AVAILWITHCUSTNO>'+availableBankcust+'</let:AVAILWITHCUSTNO><!--Optional:--><let:PORTLIMREF></let:PORTLIMREF><!--Optional:--><let:LATESTSHIPMENT></let:LATESTSHIPMENT><!--Optional:--><let:gDOCUMENTCODE g="1"><!--Zero or more repetitions:--><let:mDOCUMENTCODE m="11"><!--Optional:--><let:DOCUMENTCODE>1</let:DOCUMENTCODE><!--Optional:--><let:sgDOCUMENTTXT sg="1"><!--Zero or more repetitions:--><let:DOCUMENTTXT>TEXT</let:DOCUMENTTXT></let:sgDOCUMENTTXT></let:mDOCUMENTCODE></let:gDOCUMENTCODE><!--Optional:--><let:CHARGESFROM>'+chargesFrom+'</let:CHARGESFROM><!--Optional:--><let:ACCOUNTOFFICER>1</let:ACCOUNTOFFICER><!--Optional:--><let:gOTHEROFFICER g="2"><!--Zero or more repetitions:--><let:OTHEROFFICER>2</let:OTHEROFFICER></let:gOTHEROFFICER><!--Optional:--><let:WAIVECHARGES>'+waiveCharges+'</let:WAIVECHARGES><!--Optional:--><let:gCHARGECODE g=""><!--Zero or more repetitions:--><let:mCHARGECODE m=""><!--Optional:--><let:CHARGECODE>'+chargeCode+'</let:CHARGECODE><!--Optional:--><let:CHARGECURRENCY>'+chargeCurrency+'</let:CHARGECURRENCY><!--Optional:--><let:CHARGEXCHG>'+chargeExchgRate+'</let:CHARGEXCHG><!--Optional:--><let:CHARGEAMOUNT>'+chargeAmount+'</let:CHARGEAMOUNT><!--Optional:--><let:CHARGESTATUS>'+chargeStatus+'</let:CHARGESTATUS></let:mCHARGECODE></let:gCHARGECODE><!--Optional:--><let:gDOCUMENTSREQ g="1"><!--Zero or more repetitions:--><let:DOCUMENTSREQ>YES</let:DOCUMENTSREQ></let:gDOCUMENTSREQ><!--Optional:--><let:OLDLCNUMBER></let:OLDLCNUMBER><!--Optional:--><let:PROVISAMOUNT></let:PROVISAMOUNT><!--Optional:--><let:PORTNOBEN></let:PORTNOBEN><!--Optional:--><let:PORTNOAPPISS></let:PORTNOAPPISS><!--Optional:--><let:ADVICEEXPIRYDATE></let:ADVICEEXPIRYDATE><!--Optional:--><let:APPLRULECODES>'+appRuleCodes+'</let:APPLRULECODES><!--Optional:--><let:INCOTERMS>'+incoTerms+'</let:INCOTERMS><!--Optional:--><let:SLREFTRANCHE></let:SLREFTRANCHE><!--Optional:--><let:PRODUCTTYPE></let:PRODUCTTYPE><!--Optional:--><let:BASECCYRATE></let:BASECCYRATE><!--Optional:--><let:PARTSHARE></let:PARTSHARE><!--Optional:--><let:OWNPARTAMOUNT></let:OWNPARTAMOUNT><!--Optional:--><let:SYNDICATECHARGE></let:SYNDICATECHARGE><!--Optional:--><let:PRESENTATIONDAYS>'+presentationDays+'</let:PRESENTATIONDAYS><!--Optional:--><let:AUTOEXPIRY>'+autoExpiry+'</let:AUTOEXPIRY><!--Optional:--><let:COMMCODE>'+commissionCode+'</let:COMMCODE><!--Optional:--><let:COMMFREQUENCY></let:COMMFREQUENCY><!--Optional:--><let:COMMRATE>'+commissionRate+'</let:COMMRATE><!--Optional:--><let:ACCRUALPARAM>'+accrualParam+'</let:ACCRUALPARAM><!--Optional:--><let:COMMACCOUNT></let:COMMACCOUNT><!--Optional:--><let:COMMEXCHRATE>'+commissionExchgRate+'</let:COMMEXCHRATE><!--Optional:--><let:COMMCLAIMED>'+commissionClaimed+'</let:COMMCLAIMED><!--Optional:--><let:COMMAMOUNT>'+fixedCommissionAmt+'</let:COMMAMOUNT><!--Optional:--><let:RETURNCOMM>'+returnCommission+'</let:RETURNCOMM><!--Optional:--><let:COMMPARTYCHG>'+commissionParty+'</let:COMMPARTYCHG><!--Optional:--><let:MODEOFSHIPMENT>'+modeOfShipment+'</let:MODEOFSHIPMENT><!--Optional:--><let:gINBKTOBK g="1"><!--Zero or more repetitions:--><let:INBKTOBK>'+bankTobankInfo+'</let:INBKTOBK></let:gINBKTOBK><!--Optional:--><let:TransType></let:TransType></LETTEROFCREDITIMPSIGHT1Type></imp:ImportSightLC></soapenv:Body></soapenv:Envelope>';
	console.log("REQUESTBODY",requestBody); */

	var requestOptions = {
		'method': 'POST',
		'url': 'http://52.18.174.96:8080/ImportLC/services',
		'qs': {
			'wsdl': ''
		},
		'headers': requestHeaders,
		'body': requestBody,
		'timeout': 5000
	};

	request(requestOptions, function (error, response, body) {

		var parseString = require('xml2js').parseString;
		var xml = body;
		parseString(xml, function (err, result) {
			//console.log("result",result);
			var test1 = JSON.stringify(result);
			console.log("reslut for t24111111-----", test1);
			test = JSON.parse(test1);
			console.log("TEST  ", test);


			finalData = test['S:Envelope']['S:Body'][0]['ns12:ImportSightLCResponse'][0]['Status'];
			console.log("Final Data", finalData);
			const TransactionID = finalData[0]['transactionId'][0];
			console.log("TransactionID", TransactionID);
			loc.TransactionId = TransactionID;
			const errorMSg = finalData[0]['successIndicator'][0];
			console.log("errorMSg===========>>>>", errorMSg);

			if (errorMSg == 'T24Error') {
				errorMessages = finalData[0]['messages'][0];
				//console.log("error messages====>>>>>",test['S:Envelope']['S:Body'][0]['ns4:BgIssueResponse'][0]['Status'][0]);
				return res.end(errorMessages + " Change the Field Value");

			} else {


				chaincode.invoke.UpdateTransactionId([ID, TransactionID]);

				var input = JSON.stringify(loc);
				console.log("input after TransactionID is added" + input);


				chaincode.invoke.OpenLetterOfCredit([ID, input]);
				beneficiarybank.query("UPDATE letterofcredit SET status ='OPENED' WHERE lcRequestNumber = ?", [LCREQ], function (err, result) {  
					if (err) throw err;
				});

				var response = res.end(ID + " has been Opened successfully and the T24 transaction address is " + TransactionID);
				return response;
			}

		});
	})

});

betabank.post('/bg-open', function (req, res) {
	
		var bog = req.body;
		//console.log("TEXT FROM UI======================>>>>>>>>>>>>>>>>>>>",bog);
	
		var ID = bog.bgNumber_t1;
		var BGID = bog.bgNumber_t1;
		var BGREQ = bog.bgReqId;
	
		var issuedOnBehalfOf_t1 = bog.issuedOnBehalfOf_t1;
		var issued;
	
		if (issuedOnBehalfOf_t1 == "JOHN") {
			issued = 100600;
		}
	
		if (issuedOnBehalfOf_t1 == "GRUNDY") {
			issued = 100266;
		}
	
		var currency_t1 = bog.currency_t1;
		var amount_t1 = bog.amount_t1;
	
		var dealDate_t1 = bog.dealDate_t1;
	
		var date = require('date-and-time');
		var moment = require('moment');
	
		var date = '21/01/2015';
		var d = new Date(date.split("/").reverse().join("-"));
		var dd = d.getDate();
		var mm = d.getMonth() + 1;
		var yy = d.getFullYear();
		var newdate = yy + "/" + mm + "/" + dd;
		var dateFormat = require('dateformat');
		//var newDealdate = dealDate_t1.split('/');
	
		//var newDealDateString=newDealdate[2]+newDealdate[0]+newDealdate[1];
		//console.log("newDealDateString",newDealDateString);
	
		var maturityDate_t1 = bog.maturityDate_t1;
		var Maturitydate = maturityDate_t1.split('/');
		var newMaturityDate_t1 = Maturitydate[2] + Maturitydate[0] + Maturitydate[1];
	
		var accrualPattern_t3 = bog.accrualPattern_t3;
	
		var startDate_t1 = bog.startDate_t1;
		var Startdate = startDate_t1.split('/');
		var newStartDate_t1 = Startdate[2] + Startdate[0] + Startdate[1];
	
		var chargeDate_1_t2 = bog.chargeDate_1_t2;
		if (chargeDate_1_t2 == '') {
			var newChargeDate_t2 = chargeDate_1_t2;
		} else {
			var Chargedate = chargeDate_1_t2.split('/');
			var newChargeDate_t2 = Chargedate[2] + Chargedate[0] + Chargedate[1];
		}
		var chargeCurrency_1_t2 = bog.chargeCurrency_1_t2;
		var chargeDebitAccount_1_t2 = bog.chargeDebitAccount_1_t2;
		var chargeCode_1_1_t2 = bog.chargeCode_1_1_t2;
		var chargeAmount_1_1_t2 = bog.chargeAmount_1_1_t2;
		var beneficiaryNoncust_1_t1 = bog.beneficiaryNoncust_1_t1;
		var guaranteeRef_t1 = bog.guaranteeRef_t1;
	
		var expiryDate_t1 = bog.expiryDate_t1;
		var Expirydate = expiryDate_t1.split('/');
		var newExpiryDate_t1 = Expirydate[2] + Expirydate[0] + Expirydate[1];
	
		var beneficiaryId_t1 = bog.beneficiaryId_t1;
		var termsNconditions_1_t1 = bog.termsNconditions_1_t1;
		var eventsProcessing_t1 = bog.eventsProcessing_t1;
		var liquidationMode_t1 = bog.liquidationMode_t1;
		var customersReference_t1 = bog.customersReference_t1;
		var limitReference_t1 = bog.limitReference_t1;
		var autoexpiry_t1 = bog.autoexpiry_t1;
		var commissionPayType_t3 = bog.commissionPayType_t3;
		var interestCalcBasis_t3 = bog.interestCalcBasis_t3;
		var commrate_t3 = bog.commrate_t3;
		var commFrequency_t3 = bog.commFrequency_t3;
		var fixedAmount_t3 = bog.fixedAmount_t3;
		var commissionClaimed_t3 = bog.commissionClaimed_t3;
	
		var commissionDate_1_t3 = bog.commissionDate_1_t3;
		if (commissionDate_1_t3 == '') {
			var newCommissionDate_t3 = commissionDate_1_t3;
		} else {
			var Commissiondate = commissionDate_1_t3.split('/');
			var newCommissionDate_t3 = Commissiondate[2] + Commissiondate[0] + Commissiondate[1];
		}
		var commDebitAcct_1_t3 = bog.commDebitAcct_1_t3;
		var rateChange_t3 = bog.rateChange_t3;
		var newRate_t3 = bog.newRate_t3;
		var accrualPattern_t3 = bog.accrualPattern_t3;
		var currentRate_t3 = bog.currentRate_t3;
		var commSpread_t3 = bog.commSpread_t3;
		var commissionAmount_1_t3 = bog.commissionAmount_1_t3;
		var conversionRate_1_t3 = bog.conversionRate_1_t3;
		var returnCommission_t3 = bog.returnCommission_t3;
	
		var effectiveDate_t3 = bog.effectiveDate_t3;
		if (effectiveDate_t3 == '') {
			var newEffectiveDate_t3 = effectiveDate_t3;
		} else {
			var Effectivedate = effectiveDate_t3.split('/');
			var newEffectiveDate_t3 = Effectivedate[2] + Effectivedate[0] + Effectivedate[1];
		}
		var takeMargin_t4 = bog.takeMargin_t4;
		var marginPercent_t4 = bog.marginPercent_t4;
		var marginAmount_t4 = bog.marginAmount_t4;
	
		var marginReleaseDate_t4 = bog.marginReleaseDate_t4;
		if (marginReleaseDate_t4 == '') {
			var newMarginReleaseDate_t4 = marginReleaseDate_t4;
		} else {
			var MarginReleasedate = marginReleaseDate_t4.split('/');
			var newMarginReleaseDate_t4 = MarginReleasedate[2] + MarginReleasedate[0] + MarginReleasedate[1];
		}
		var marginDebitAcct_t4 = bog.marginDebitAcct_t4;
		var provisionExchangeRate_t4 = bog.provisionExchangeRate_t4;
		var marginCreditAcct_t4 = bog.marginCreditAcct_t4;
		var marginReleaseAcct_t4 = bog.marginReleaseAcct_t4;
	
		var slTrancheReference_t5 = bog.slTrancheReference_t5;
		var productType_t5 = bog.productType_t5;
	
		var slLinkdate_t5 = bog.slLinkdate_t5;
		if (slLinkdate_t5 == '') {
			var newSLLinkDate_t5 = slLinkdate_t5;
		} else {
			var SLLinkdate = slLinkdate_t5.split('/');
			var newSLLinkDate_t5 = SLLinkdate[2] + SLLinkdate[0] + SLLinkdate[1];
		}
		var issuingBank_t5 = bog.issuingBank_t5;
		var participantId_1_t5 = bog.participantId_1_t5;
		var participationAmt_1_t5 = bog.participationAmt_1_t5;
		var netPrinAmt_t5 = bog.netPrinAmt_t5;
		var receivingBankId_t6 = bog.receivingBankId_t6;
		var receivingBankAddress_1_t6 = bog.receivingBankAddress_1_t6;
		var updateCorrBankLimit_t6 = bog.updateCorrBankLimit_t6;
		var transactionReferenceNo20_t6 = bog.transactionReferenceNo20_t6;
		var furtherIdentification23_t6 = bog.furtherIdentification23_t6;
	
		var date30_t6 = bog.date30_t6;
		if (date30_t6 == '') {
			var newDate30Date_t6 = date30_t6;
		} else {
			var Date30date = date30_t6.split('/');
			var newDate30Date_t6 = Date30date[2] + Date30date[0] + Date30date[1];
		}
	
		var detailsOfGuarantee77c_1_t6 = bog.detailsOfGuarantee77c_1_t6;
		var senderToReceiverInfo72_t6 = bog.senderToReceiverInfo72_t6;
		var applicableRule_t6 = bog.applicableRule_t6;
		var narrative_t6 = bog.narrative_t6;
	
	
	
		beneficiarybank.query("UPDATE bankguarantee SET status ='ISSUED' WHERE bgReqID = ?", [BGREQ], function (err, result) {  
			if (err) throw err;
	
	
			////console.log('updated of record:', result);
	
		});
	
		
	
		var requestHeaders = {
			'cache-control': 'no-cache',
			//'soapaction': 'addRoom',
			'content-type': undefined
		};
		var data, test, finalData;
		var requestBody = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bgis="http://temenos.com/BgIssue" xmlns:mdd="http://temenos.com/MDDEALGTISS1"><soapenv:Header/><soapenv:Body><bgis:BgIssue><!--Optional:--><WebRequestCommon><!--Optional:--><company>GB0010001</company><password>123123</password><userName>INPUTT</userName></WebRequestCommon><!--Optional:--><OfsFunction><!--Optional:--><activityName></activityName><!--Optional:--><assignReason></assignReason><!--Optional:--><dueDate></dueDate><!--Optional:--><extProcess></extProcess><!--Optional:--><extProcessID></extProcessID><!--Optional:--><gtsControl></gtsControl><!--Optional:--><messageId></messageId><!--Optional:--><noOfAuth></noOfAuth><!--Optional:--><owner></owner><!--Optional:--><replace></replace><!--Optional:--><startDate></startDate><!--Optional:--><user></user></OfsFunction><!--Optional:--><MDDEALGTISS1Type id=""><!--Optional:--><mdd:CUSTOMER>' + issued + '</mdd:CUSTOMER><!--Optional:--><mdd:CURRENCY>' + currency_t1 + '</mdd:CURRENCY><!--Optional:--><mdd:PRINCIPALAMOUNT>' + amount_t1 + '</mdd:PRINCIPALAMOUNT><!--Optional:--><mdd:DEALDATE></mdd:DEALDATE><!--Optional:--><mdd:VALUEDATE>' + newStartDate_t1 + '</mdd:VALUEDATE><!--Optional:--><mdd:MATURITYDATE>' + newMaturityDate_t1 + '</mdd:MATURITYDATE><!--Optional:--><mdd:CONTRACTTYPE></mdd:CONTRACTTYPE><!--Optional:--><mdd:DEALSUBTYPE></mdd:DEALSUBTYPE><!--Optional:--><mdd:CATEGORY></mdd:CATEGORY><!--Optional:--><mdd:LIMITREFERENCE>' + limitReference_t1 + '</mdd:LIMITREFERENCE><!--Optional:--><mdd:gCHARGEDATE g="1"><!--Zero or more repetitions:--><mdd:mCHARGEDATE m="1"><!--Optional:--><mdd:CHARGEDATE>' + newChargeDate_t2 + '</mdd:CHARGEDATE><!--Optional:--><mdd:CHARGECURR>' + chargeCurrency_1_t2 + '</mdd:CHARGECURR><!--Optional:--><mdd:CHARGEACCOUNT>' + chargeDebitAccount_1_t2 + '</mdd:CHARGEACCOUNT><!--Optional:--><mdd:sgCHARGECODE sg="1"><!--Zero or more repetitions:--><mdd:CHARGECODE s="1"><!--Optional:--><mdd:CHARGECODE>' + chargeCode_1_1_t2 + '</mdd:CHARGECODE><!--Optional:--><mdd:CHARGEAMT>' + chargeAmount_1_1_t2 + '</mdd:CHARGEAMT></mdd:CHARGECODE></mdd:sgCHARGECODE></mdd:mCHARGEDATE></mdd:gCHARGEDATE><!--Optional:--><mdd:gBENEFCUST1 g="1"><!--Zero or more repetitions:--><mdd:BENEFCUST1>' + beneficiaryId_t1 + '</mdd:BENEFCUST1></mdd:gBENEFCUST1><!--Optional:--><mdd:REFERENCE2>' + customersReference_t1 + '</mdd:REFERENCE2><!--Optional:--><mdd:gTEXT1 g="1"><!--Zero or more repetitions:--><mdd:TEXT1>TEST</mdd:TEXT1></mdd:gTEXT1><!--Optional:--><mdd:gBENADDRESS g="1"><!--Zero or more repetitions:--><mdd:BENADDRESS>' + beneficiaryNoncust_1_t1 + '</mdd:BENADDRESS></mdd:gBENADDRESS><!--Optional:--><mdd:CSNPAYMENTTYPE>' + commissionPayType_t3 + '</mdd:CSNPAYMENTTYPE><!--Optional:--><mdd:ACCRUALPARAM>' + accrualPattern_t3 + '</mdd:ACCRUALPARAM><!--Optional:--><mdd:INTERESTBASIS>' + interestCalcBasis_t3 + '</mdd:INTERESTBASIS><!--Optional:--><mdd:CSNRATE>' + commrate_t3 + '</mdd:CSNRATE><!--Optional:--><mdd:CSNSPREAD>' + commSpread_t3 + '</mdd:CSNSPREAD><!--Optional:--><mdd:CURRENTRATE>' + currentRate_t3 + '</mdd:CURRENTRATE><!--Optional:--><mdd:FIXEDAMOUNT>' + fixedAmount_t3 + '</mdd:FIXEDAMOUNT><!--Optional:--><mdd:CSNFREQUENCY>' + commFrequency_t3 + '</mdd:CSNFREQUENCY><!--Optional:--><mdd:gCSNDATE g="1"><!--Zero or more repetitions:--><mdd:mCSNDATE m="1"><!--Optional:--><mdd:CSNDATE>' + newCommissionDate_t3 + '</mdd:CSNDATE><!--Optional:--><mdd:CSNAMOUNT>' + commissionAmount_1_t3 + '</mdd:CSNAMOUNT><!--Optional:--><mdd:CSNACCOUNT>' + commDebitAcct_1_t3 + '</mdd:CSNACCOUNT><!--Optional:--><mdd:CONVERSIONRATE>' + conversionRate_1_t3 + '</mdd:CONVERSIONRATE></mdd:mCSNDATE></mdd:gCSNDATE><!--Optional:--><mdd:ISSUECUSTOMER>' + issuingBank_t5 + '</mdd:ISSUECUSTOMER><!--Optional:--><mdd:gPARTICIPANT g="1"><!--Zero or more repetitions:--><mdd:mPARTICIPANT m="1"><!--Optional:--><mdd:PARTICIPANT>' + participantId_1_t5 + '</mdd:PARTICIPANT><!--Optional:--><mdd:AMTPARTICIPATE>' + participationAmt_1_t5 + '</mdd:AMTPARTICIPATE></mdd:mPARTICIPANT></mdd:gPARTICIPANT><!--Optional:--><mdd:NETPRINAMOUNT>' + netPrinAmt_t5 + '</mdd:NETPRINAMOUNT><!--Optional:--><mdd:PROVISION>' + takeMargin_t4 + '</mdd:PROVISION><!--Optional:--><mdd:PROVDRACCOUNT>' + marginDebitAcct_t4 + '</mdd:PROVDRACCOUNT><!--Optional:--><mdd:PROVPERCENT>' + marginPercent_t4 + '</mdd:PROVPERCENT><!--Optional:--><mdd:PROVAMOUNT>' + marginAmount_t4 + '</mdd:PROVAMOUNT><!--Optional:--><mdd:PROVCRACCOUNT>' + marginCreditAcct_t4 + '</mdd:PROVCRACCOUNT><!--Optional:--><mdd:PROVRELDATE>' + newMarginReleaseDate_t4 + '</mdd:PROVRELDATE><!--Optional:--><mdd:PROVRELACCOUNT>' + marginReleaseAcct_t4 + '</mdd:PROVRELACCOUNT><!--Optional:--><mdd:AUTOEXPIRY>' + autoexpiry_t1 + '</mdd:AUTOEXPIRY><!--Optional:--><mdd:ALTERNATEID>' + guaranteeRef_t1 + '</mdd:ALTERNATEID><!--Optional:--><mdd:LIQUIDATIONMODE>' + liquidationMode_t1 + '</mdd:LIQUIDATIONMODE><!--Optional:--><mdd:EVENTSPROCESSING>' + eventsProcessing_t1 + '</mdd:EVENTSPROCESSING><!--Optional:--><mdd:SLREFTRANCHE>' + slTrancheReference_t5 + '</mdd:SLREFTRANCHE><!--Optional:--><mdd:SLPRODTYPE>' + productType_t5 + '</mdd:SLPRODTYPE><!--Optional:--><mdd:SLLINKDATE>' + newSLLinkDate_t5 + '</mdd:SLLINKDATE><!--Optional:--><mdd:RATECHANGE>' + rateChange_t3 + '</mdd:RATECHANGE><!--Optional:--><mdd:NEWCSNRATE>' + newRate_t3 + '</mdd:NEWCSNRATE><!--Optional:--><mdd:NEWRATEEFFDATE>' + newEffectiveDate_t3 + '</mdd:NEWRATEEFFDATE><!--Optional:--><mdd:RETURNCOMM>' + returnCommission_t3 + '</mdd:RETURNCOMM><!--Optional:--><mdd:ADVICEEXPIRYDATE>' + newExpiryDate_t1 + '</mdd:ADVICEEXPIRYDATE><!--Optional:--><mdd:PROVEXCHRATE>' + provisionExchangeRate_t4 + '</mdd:PROVEXCHRATE><!--Optional:--><mdd:CSNCLAIM>' + commissionClaimed_t3 + '</mdd:CSNCLAIM></MDDEALGTISS1Type></bgis:BgIssue></soapenv:Body></soapenv:Envelope>'
	
		console.log("requestBody====>>>", requestBody);
	
		var requestOptions = {
			'method': 'POST',
			'url': 'http://52.18.174.96:8080/BgIssue/services',
			'qs': {
				'wsdl': ''
			},
			'headers': requestHeaders,
			'body': requestBody,
			'timeout': 5000
		};
	
	
	
		request(requestOptions, function (error, response, body) {
	
			var parseString = require('xml2js').parseString;
			var xml = body;
	
			parseString(xml, function (err, result) {
				var test1 = JSON.stringify(result);
				console.log("test1----->>>>>>>", test1);
	
				test = JSON.parse(test1);
				console.log("test------>>>>>>>>", test);
	
	
				finalData = test['S:Envelope']['S:Body'][0]['ns4:BgIssueResponse'][0]['Status'];
				console.log("transactionId", finalData[0]['transactionId']);
				const TransactionID = finalData[0]['transactionId'][0];
				console.log("TransactionID", TransactionID);
				bog.TransactionId = TransactionID;
				//chaincode.invoke.UpdateBgTransactionId([ID, TransactionID]);
				var input = JSON.stringify(bog);
				console.log("input after TransactionID is added" + input);
				console.log("id after TransactionID is added" + ID);
	
	
	
				chaincode.invoke.OpenBankGuarantee([ID, input]);
	
				var response = res.end(ID + " has been Opened successfully and the T24 transaction address is " + TransactionID);
				return response;
	
			});
		})
	
	
	});



betabank.get('/api/GetLcById/:id', function (req, res) {

	idValue = req.params.id
	//console.log("idValue",idValue);
	chaincode.query.GetLcById([idValue], function (err, resp) {

		if (resp != null) {
			//console.log("resp ===>",resp);
			var parseval = JSON.parse(resp);
			//console.log("parseval ==>",parseval);
			var info = {
				"DATA": parseval
			};
			res.json(info);





		}
	});
});

betabank.get('/api/GetBgById/:id', function (req, res) {

	idValue = req.params.id
	console.log("idValue", idValue);
	chaincode.query.GetBgById([idValue], function (err, resp) {

		if (resp != null) {
			//console.log("resp ===>",resp);
			var parseval = JSON.parse(resp);
			//console.log("parseval ==>",parseval);
			var info = {
				"DATA": parseval
			};
			res.json(info);





		}
	});
});



betabank.get('/lc-orders', function (getreqang, getresang) {

	chaincode.query.GetAllLC([''], function (err, resp) {

		//console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");
		//console.log("resp.length ===>",resp.length);
		//					 console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");
		//					console.log("resp ===>",resp);
		//console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");

		/* 							                  console.log("resp[0] ===>",resp[0]);
		console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");
		console.log("resp[n-1] ===>",resp[resp.length-1]);
		console.log("resp[n-2] ===>",resp[resp.length-2]);
		console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");    */




		//console.log("resp ===>",resp);
		if (resp == null && resp == undefined)
		{ 
			console.log("inside if case");
			getresang.json({});
		}
		else{
			//console.log("resp ===>",resp);
			var sTemp = "";
			var aObjs = [];
			var stop = 0;
			for (var i = 0; i < resp.length; ++i) {
				sTemp += resp[i];

				if (resp[i] == "{") {
					stop++;
				}
				if (resp[i] == "}") {
					stop--;
				}
				if ((resp[i] == "}") && (stop == 0)) {
					aObjs.push(JSON.parse(sTemp));
					sTemp = "";
					//console.log("aObjs inside2222222222222222222222222222",aObjs);
				}
			}

			//console.log("aObjs", aObjs);
			getresang.json(aObjs);
			//getresang.send(parseval2);

		}
	});
});


betabank.get('/bg-orders', function (getreqang, getresang) {

	chaincode.query.GetAllBG([''], function (err, resp) {
		console.log("resp ===>",resp);
		//console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");
		//console.log("resp.length ===>",resp.length);
		//console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");

		//console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");

		/* 							                  console.log("resp[0] ===>",resp[0]);
		console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");
		console.log("resp[n-1] ===>",resp[resp.length-1]);
		console.log("resp[n-2] ===>",resp[resp.length-2]);
		console.log("resp.length ===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>===>");    */


		//console.log("resp ===>",resp);
		if (resp == null && resp == undefined)
		{ 
			console.log("inside if case");
			getresang.json({});
		}
		else{
			//	console.log("resp ===>",resp);
			var sTemp = "";
			var aObjs = [];
			var stop = 0;
			for (var i = 0; i < resp.length; ++i) {
				sTemp += resp[i];

				if (resp[i] == "{") {
					stop++;
				}
				if (resp[i] == "}") {
					stop--;
				}
				if ((resp[i] == "}") && (stop == 0)) {
					aObjs.push(JSON.parse(sTemp));
					sTemp = "";
					//console.log("aObjs inside2222222222222222222222222222",aObjs);
				}
			}

			//console.log("aObjs", aObjs);
			getresang.json(aObjs);
			//getresang.send(parseval2);

		}
	});
});



betabank.get('/customer-lc-orders/:custName', function (getreqang, getresang) {
	customerName = getreqang.params.custName
	chaincode.query.GetCustomerBasedRecords([customerName], function (err, resp) {
		//console.log("resp ===>",resp);
		if (resp == null && resp == undefined)
		{ 
			console.log("inside if case");
			getresang.json({});
		}
		else{
			//console.log("resp ===>",resp);
			var sTemp = "";
			var aObjs = [];
			var stop = 0;
			for (var i = 0; i < resp.length; ++i) {
				sTemp += resp[i];

				if (resp[i] == "{") {
					stop++;
				}
				if (resp[i] == "}") {
					stop--;
				}
				if ((resp[i] == "}") && (stop == 0)) {
					aObjs.push(JSON.parse(sTemp));
					sTemp = "";
					//console.log("aObjs inside2222222222222222222222222222",aObjs);
				}
			}

			//console.log("aObjs", aObjs);
			getresang.json(aObjs);
			//getresang.send(parseval2);

		}
	});
});

betabank.get('/customer-bg-orders/:custName', function (getreqang, getresang) {
	customerName = getreqang.params.custName
	chaincode.query.GetCustomerBasedBgRecords([customerName], function (err, resp) {
		//console.log("resp ===>",resp);
		if (resp == null && resp == undefined)
		{ 
			console.log("inside if case");
			getresang.json({});
		}
		else{
			//console.log("resp ===>",resp);
			var sTemp = "";
			var aObjs = [];
			var stop = 0;
			for (var i = 0; i < resp.length; ++i) {
				sTemp += resp[i];

				if (resp[i] == "{") {
					stop++;
				}
				if (resp[i] == "}") {
					stop--;
				}
				if ((resp[i] == "}") && (stop == 0)) {
					aObjs.push(JSON.parse(sTemp));
					sTemp = "";
				}
			}

			getresang.json(aObjs);


		}
	});
});




betabank.post('/lcamendreq', function (postreqang, postresang) {
	var uidata = postreqang.body;
	console.log("uidata-----------------------------", uidata)

	var amendRecord = [{
		"numberOfAmendment": uidata.LcNumberOfAmendments,
		"lcAmendAmount": uidata.lCAmount_t1,
		//"lcAmendAdvisingBankRef" : uidata.AdvisingBankRef,
		//"amendModeOfShipment" : uidata.ModeOfShipment_t1,
		"lcAmendAdvisingBankRef": "",
		"amendModeOfShipment": "",
		"lcAmendExpiryDate": uidata.LCExpiryDate_t1,
		"lcAmendExpiryPlace": uidata.LCExpiryPlace_t1,
		"amendmentDetails": uidata.AmendmentDetails,
		"status": uidata.Status,
		"lcAmendId": uidata.lcId,
		"lcAmendReqId": uidata.lcAmendReqId,
		"applicantID": uidata.applicantCustomer
	}];

	beneficiarybank.query('INSERT INTO letterofcreditamend SET ?', amendRecord, function (err, res) {
		if (err) throw err;
		var response = postresang.end(uidata.lcAmendReqId + " has been Requested successfully");

		var fromId = uidata.applicantCustomer.toLowerCase() + "@mail.com";
		var  to =   {
			"one": "admin@" + uidata.applicantBank.toLowerCase() + ".com",
			"two": "admin@" + uidata.advisingBankID.toLowerCase() + ".com",
			"three": uidata.beneficiaryId.toLowerCase() + "@mail.com"
		}; 
		var stat = "Requesting for amend the LC";
		var msg = "Hi,\n I have requested for amendment of LC. Kindly process the amendment for LD id. " + uidata.lcAmendId + " is requested";

		sendEmail(fromId, to, stat, msg);

		return response;
	});
});


betabank.post('/bgamendreq', function (postreqang, postresang) {
	var uidata = postreqang.body;
	console.log("uidata-----------------------------", uidata)
	var bgAmendRecord = [{
		"bgAmendId": uidata.bgAmendId,
		"bgAmendReqId": uidata.bgAmendReqId,
		"numberOfAmendment": uidata.numberOfAmendment,
		"bgAmendPrincipalAmount": uidata.bgAmendPrincipalAmount,
		"bgAmendExpiryDate": uidata.bgAmendExpiryDate,
		"bgTermsAndConditions": uidata.bgTermsAndConditions,
		"issuedOnBehalfOf":uidata.issuedOnBehalfOf_t1,
		"status": "AMEND REQUESTED"
	}];

	beneficiarybank.query('INSERT INTO bankguaranteeamend SET ?', bgAmendRecord, function (err, res) {
		if (err) throw err;
		var response = postresang.end(uidata.bgAmendReqId + " has been Requested successfully");

		var fromId = uidata.ApplicantCustomer.toLowerCase() + "@mail.com";
		var  to =   {
			"one": "admin@" + uidata.ApplicantBank.toLowerCase() + ".com",
			"two": "admin@" + uidata.BeneficiaryBank.toLowerCase() + ".com",
			"three": uidata.Beneficiary.toLowerCase() + "@mail.com"
		}; 
		var stat = "Requesting for amend the BG";
		var msg = "Hi,\n I have requested for amendment of BG. Kindly process the amendment for BG id. " + uidata.bgAmendId + " is requested";

		sendEmail(fromId, to, stat, msg);

		return response;
	});
});


betabank.get('/lcamendreq', function (req, res) {
	var queryString = "SELECT * FROM letterofcreditamend where status='AmendRequested' ";

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}
			//connection.release();
		});
	});
});

betabank.get('/bgamendreq', function (req, res) {
	var queryString = "SELECT * FROM bankguaranteeamend where status='AMEND REQUESTED'";

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}
			//connection.release();
		});
	});
});

betabank.get('/lcamendreq/:lcAmendReqId', function (req, res) {
	var param = req.params.lcAmendReqId;
	var queryString = 'select * from letterofcreditamend where lcAmendReqId=?';

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}
			//connection.release();
		});
	});
});

betabank.get('/bgamendreq/:bgAmendReqId', function (req, res) {
	var param = req.params.bgAmendReqId;
	var queryString = 'select * from bankguaranteeamend where bgAmendReqId=?';

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}
			//connection.release();
		});
	});
});




betabank.post('/lc-amend', function (req, res) {
	var loc = req.body;
	var ID = loc.lcId;
	var LCID = loc.lcId;
	var LCREQ = loc.lcAmendReqId;

	//console.log("loc OBJECT",loc);



	//	UPDATE  letterofcreditamend SET status='amended' , lcAmendId=? where lcAmendReqId=?
	beneficiarybank.query("UPDATE letterofcreditamend SET status ='AMENDED' WHERE lcAmendReqId  = ? AND lcAmendId=? ", [LCREQ, LCID], function (err, result) {
		if (err) throw err;
		//console.log('updated of record:', result);
	});


	var input = JSON.stringify(loc);
	//console.log("input OBJECT",input);
	chaincode.invoke.AmendLetterOfCredit([ID, input]);
	var response = res.end(ID + " has been Amended successfully");

	var fromId = "admin@" + loc.applicantBank.toLowerCase() + ".com";
	var  to =   {
		"one": loc.applicantCustomer.toLowerCase() + "@mail.com",
		"two": "admin@" + loc.advisingBankID.toLowerCase() + ".com",
		"three": loc.beneficiaryId.toLowerCase() + "@mail.com"
	}; 
	var stat = "Requesting for LC Status - Amended";
	var msg = "Hi,\n I have amended the LC. Kindly approve. " + loc.lcReqId + " is amended";

	sendEmail(fromId, to, stat, msg);

	return response;
});

betabank.post('/bg-amend', function (req, res) {
	var bog = req.body;
	console.log('request body============>>>>>', bog);

	var ID = bog.bgId;
	var BGID = bog.bgId;
	var BGREQ = bog.bgReqID + "-00" + bog.bgNumberOfAmendments;

	console.log('updated of record bgAmendReqId:', BGREQ);
	console.log('updated of record:bgAmendId', BGID);

	beneficiarybank.query("UPDATE bankguaranteeamend SET status ='AMENDED' WHERE bgAmendReqId = ? AND bgAmendId=? ", [BGREQ, BGID], function (err, result) {
		if (err) throw err;
		console.log('updated of record:', result);
	});


	var input = JSON.stringify(bog);
	//console.log("input OBJECT",input);
	chaincode.invoke.AmendBankGuarantee([ID, input]);
	var response = res.end(ID + " has been Amended successfully");

	var fromId = bog.applicantCustomer.toLowerCase() + "@mail.com";
	var  to =   {
		"one": "admin@" + bog.applicantBank.toLowerCase() + ".com",
		"two": "admin@" + bog.beneficiaryBank.toLowerCase() + ".com",
		"three": bog.beneficiary.toLowerCase() + "@mail.com"
	}; 
	var stat = "Requesting for BG Status - Amended";
	var msg = "Hi,\n I have amended the BG. Kindly approve. " + bog.bgReqID + " is amended";

	sendEmail(fromId, to, stat, msg);

	return response;
});


betabank.post('/lc-approve', function (getreqang, getresang) {
	var input = getreqang.body;

	//console.log("input   ",input);
	chaincode.invoke.UpdateStatus([input.lcId, input.status]);
	var response = getresang.end(input.lcId + " has been Approved successfully");

	var fromId = "admin@" + input.advisingBankID.toLowerCase() + ".com";
	var  to =   {
		"one": input.applicantCustomer.toLowerCase() + "@mail.com",
		"two": "admin@" + input.applicantBank.toLowerCase() + ".com",
		"three": input.beneficiaryId.toLowerCase() + "@mail.com"
	}; 
	var stat = "Requesting for LC Status - Approved";
	var msg = "Hi,\n I have approved for LC. Kindly process. " + input.lcId + " is Approved";

	sendEmail(fromId, to, stat, msg);

	return response;
});

betabank.post('/bg-approve', function(getreqang, getresang) {
var input = getreqang.body;
console.log("response of bg and bgid",input.bgNumber_t1,input.status);

	//console.log("input bg approveBG  ",input.bgId,input.status);
	chaincode.invoke.BGApprove([input.bgNumber_t1, input.status]);
	var response = getresang.send(input.bgNumber_t1 + " has been Approved successfully");

	// var fromId = "admin@"+input.advisingBankID.toLowerCase()+".com";
	//   var to = {"one":input.applicantCustomer.toLowerCase()+"@mail.com", "two" : "admin@"+input.applicantBank.toLowerCase()+".com", "three" : input.beneficiaryId.toLowerCase()+"@mail.com"}; 
	// var stat = "Requesting for BG Status - Approved";
	// var msg = "Hi,\n I have approved for BG. Kindly process. "+input.bgReqId+" is Approved";
	//
	//                       sendEmail(fromId, to, stat, msg);
	console.log("response bg approve", response);
	return response;
});

betabank.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});


betabank.get('/test', function (req, res) {

});

betabank.get('/me', function (req, res) {

	res.send("BETABank");

});

betabank.get('/meID', function (req, res) {
	res.send("100435");
});

betabank.get('/lcRequestID', function (req, res) {

	var hrTime = process.hrtime();
	var temp = hrTime[0] * 1000000 + hrTime[1] / 1000;
	////console.log(hrTime[0] * 1000000 + hrTime[1] / 1000)
	res.send(Math.floor(temp).toString());

});





betabank.get('/customer/:email', function (req, res) {
	var param = req.params.email;
	//console.log("email ",param);
	//test(param);
	var queryString = "SELECT * FROM CUSTOMER WHERE EMAIL=? AND bank='BETABank'";
	////console.log(queryString);

	shareddb.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			console.log("Login Customer ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}


		});
	});

});








betabank.get('/employee/:emailid', function (req, res) {
	var param = req.params.emailid;
	//console.log("URL ROUT ", param);



	var queryString = 'SELECT name FROM EMPLOYEE WHERE EMAIL=?';
	////console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			////console.log("Login EMPLOYEE ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

			//connection.release();
		});

	});
});




betabank.get('/customer/detail/id/:name', function (req, res) {
	var param = req.params.name;
	////console.log("name ", param);
	var queryString = 'SELECT * FROM CUSTOMER WHERE NAME=?';
	////console.log(queryString);
	shareddb.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			////console.log("Login EMPLOYEE ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

			//connection.release();
		});

	});

});



betabank.get('/othercustomer', function (req, res) {
	var queryString = 'SELECT * FROM CUSTOMER WHERE bank !=?';
	////console.log(queryString);
	var bank = 'BETABank';
	shareddb.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [bank], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			////console.log("Login EMPLOYEE ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

			//connection.release();
		});

	});


});

betabank.get('/customer/detail/:ibanValue', function (req, res) {
	var param = req.params.ibanValue;

	var queryString = 'SELECT * FROM CUSTOMER WHERE IBANNO=?';
	////console.log(queryString);

	shareddb.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("Login EMPLOYEE ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

			//connection.release();
		});

	});


});



betabank.get('/employee-lc-orders/:LCApprovalId', function (req, res) {
	idValue = req.params.LCApprovalId
	//console.log("idValue",idValue);
	chaincode.query.GetLcById([idValue], function (err, resp) {

		if (resp != null) {
			//console.log("resp ===>",resp);
			var parseval = JSON.parse(resp);
			//console.log("parseval ==>",parseval);
			var info = {
				"DATA": parseval
			};
			res.json(info);




		}
	});


});
betabank.get('/employee-bg-orders/:BGApprovalId', function (req, res) {
	idValue = req.params.BGApprovalId;
	//console.log("idValue",idValue);
	chaincode.query.GetBgById([idValue], function (err, resp) {

		if (resp != null) {
			////console.log("resp ===>",resp);
			var parseval = JSON.parse(resp);
			//console.log("parseval ==>",parseval);
			var info = {
				"DATA": parseval
			};
			res.json(info);




		}
	});


});

betabank.post('/lcreq', function (postreqang, postresang) {
	var inf = postreqang.body;
	var image = inf.documents;
	if(image)
	{
	var bitmap = new Buffer(image, 'base64');
	inf.documents = bitmap;
	}
	console.log("image image UI", image);

	var uidata = inf;

	//console.log("chaincode in uidata===>", uidata);

	var record = [{
		"lcRequestNumber": uidata.lcRequestNumber,
		"ImportSightPmtLCType_t1": uidata.ImportSightPmtLCType_t1,
		"ApplicantID_t1": uidata.ApplicantID_t1,
		"ApplicantAddress_t1": uidata.ApplicantAddress_t1,
		"LCCurrency_t1": uidata.LCCurrency_t1,
		"LCAmount_t1": uidata.LCAmount_t1,
		"CreditTolerance_t1": uidata.CreditTolerance_t1,
		"DebitTolerance_t1": uidata.DebitTolerance_t1,
		"LCIssueDate_t1": uidata.LCIssueDate_t1,
		"ShipmentDate_t1": uidata.ShipmentDate_t1,
		"LCExpiryDate_t1": uidata.LCExpiryDate_t1,
		"LiablityReversalDate_t1": uidata.LiablityReversalDate_t1,
		"PresentationDays_t1": uidata.PresentationDays_t1,
		"LCExpiryPlace_t1": uidata.LCExpiryPlace_t1,
		"placeofexpiry_t1": uidata.placeofexpiry_t1,
		"IncoTerms_t1": uidata.IncoTerms_t1,
		"ModeOfShipment_t1": uidata.ModeOfShipment_t1,
		"LimitReference_t1": uidata.LimitReference_t1,
		"AutoExpiry_t1": uidata.AutoExpiry_t1,
		"OtherOfficer_t1": uidata.OtherOfficer_t1,
		"AccountOfficer_t1": uidata.AccountOfficer_t1,
		"PortfolioApplicant_t1": uidata.PortfolioApplicant_t1,
		"PortfolioBeneficiary_t1": uidata.PortfolioBeneficiary_t1,
		"BeneficiaryID_t2": uidata.BeneficiaryID_t2,
		"AdvisingThroughBank_t2": uidata.AdvisingThroughBank_t2,
		"BeneficiaryAddress_t2": uidata.BeneficiaryAddress_t2,
		"AdvisingBankAddress_t2": uidata.AdvisingBankAddress_t2,
		"AvailableWithBankID_t2": uidata.AvailableWithBankID_t2,
		"AdvisingBankID_t2": uidata.AdvisingBankID_t2,
		"ReimbusingBank_t2": uidata.ReimbusingBank_t2,
		"ChargesFrom_t3": uidata.ChargesFrom_t3,
		"ChargeDefaultAcct_t3": uidata.ChargeDefaultAcct_t3,
		"ChargeCode_t3": uidata.ChargeCode_t3,
		"PartyCharged_t3": uidata.PartyCharged_t3,
		"ChargeDebitAcct_t3": uidata.ChargeDebitAcct_t3,
		"ChargeCurrency_t3": uidata.ChargeCurrency_t3,
		"ChargeExchangeRate_t3": uidata.ChargeExchangeRate_t3,
		"WaiveCharges_t3": uidata.WaiveCharges_t3,
		"ChargeAmount_t3": uidata.ChargeAmount_t3,
		"AmortiseCharges_t3": uidata.AmortiseCharges_t3,
		"ChargeStatus_t3": uidata.ChargeStatus_t3,
		"TaxCurrency_t3": uidata.TaxCurrency_t3,
		"CommissionCode_t4": uidata.CommissionCode_t4,
		"CommissionParty_t4": uidata.CommissionParty_t4,
		"CommissionFrequency_t4": uidata.CommissionFrequency_t4,
		"CommissionRate_t4": uidata.CommissionRate_t4,
		"AccrualParam_t4": uidata.AccrualParam_t4,
		"CommissionAmount_t4": uidata.CommissionAmount_t4,
		"FixedCommissionAmount_t4": uidata.FixedCommissionAmount_t4,
		"CommissionAccount_t4": uidata.CommissionAccount_t4,
		"CommissionExchangeRate_t4": uidata.CommissionExchangeRate_t4,
		"CommissionClaimed_t4": uidata.CommissionClaimed_t4,
		"BackForward_t4": uidata.BackForward_t4,
		"ReturnCommission_t4": uidata.ReturnCommission_t4,
		"SLRefTranche_t5": uidata.SLRefTranche_t5,
		"ProductType_t5": uidata.ProductType_t5,
		"BaseCcyRate_t5": uidata.BaseCcyRate_t5,
		"Participator_t5": uidata.Participator_t5,
		"PartShare_t5": uidata.PartShare_t5,
		"PartAmount_t5": uidata.PartAmount_t5,
		"SyndicateCharge_t5": uidata.SyndicateCharge_t5,
		"OwnPartAmt_t5": uidata.OwnPartAmt_t5,
		"BankToBankInfo_t5": uidata.BankToBankInfo_t5,
		"MT799Message_t5": uidata.MT799Message_t5,
		"MarginRequired_t6": uidata.MarginRequired_t6,
		"MarginCalcBase_t6": uidata.MarginCalcBase_t6,
		"MarginPercent_t6": uidata.MarginPercent_t6,
		"MarginDebitAccount_t6": uidata.MarginDebitAccount_t6,


		"MarginAmount_t6": uidata.MarginAmount_t6,
		"MarginExchangeRate_t6": uidata.MarginExchangeRate_t6,
		"MarginCreditAcct_t6": uidata.MarginCreditAcct_t6,
		// "MarginOutstanding_t6" : uidata.MarginOutstanding_t6 ,
		"LimitwithProvision_t6": uidata.LimitwithProvision_t6,
		"DrawingType_1_t7": uidata.DrawingType_1_t7,
		"PaymentPercent_1_t7": uidata.PaymentPercent_1_t7,
		"PaymentPortion_1_t7": uidata.PaymentPortion_1_t7,
		"Acpt_timeBand_1_t7": uidata.Acpt_timeBand_1_t7,
		"AddCoveredAmt_1_t7": uidata.AddCoveredAmt_1_t7,
		//"PortionNo_1_t7" : uidata.PortionNo_1_t7 ,
		//"DrawingAmt_1_t7" : uidata.DrawingAmt_1_t7 ,
		// "Prov.O/sAmount_1_t7" :uidata.Prov_O/sAmount_1_t7 ,
		// "Prov.AwaitAmt_1_t7" :uidata .Prov_AwaitAmt_1_t7 ,
		// "Liab.Port.Amt_1_t7" :uidata.Liab_Port_Amt_1_t7 ,
		//"LCYPort.Amt_1_t7" :uidata .LCYPort_Amt_1_t7 ,
		"PortLimitRef_1_t7": uidata.PortLimitRef_1_t7,
		"PortionOverdrawn_1_t7": uidata.PortionOverdrawn_1_t7,
		"RevolvingType_t7": uidata.RevolvingType_t7,
		"NoofRevolutions_t7": uidata.NoofRevolutions_t7,
		"RevolvingFqy_t7": uidata.RevolvingFqy_t7,
		"LimitforRevolving_t7": uidata.LimitforRevolving_t7,
		"Cur_Revol_Liab_t7": uidata.Cur_Revol_Liab_t7,
		"DocumentId_t8": uidata.DocumentId_t8,
		"DocumentsCode_1_t8": uidata.DocumentsCode_1_t8,
		"ADocumentsText_1_t8": uidata.ADocumentsText_1_t8,
		"ADocumentsRequired_t8": uidata.ADocumentsRequired_t8,
		"AAdditionalConditions_1_t8": uidata.AAdditionalConditions_1_t8,

		"MT700_1_20Docy_CreditNumber": uidata.MT700_1_20Docy_CreditNumber,
		"MT700_1_23ReferencetoPreAdvice": uidata.MT700_1_23ReferencetoPreAdvice,
		"MT700_1_31CDateofIssue": uidata.MT700_1_31CDateofIssue,
		"MT700_1_40EApplicableRuleCodes": uidata.MT700_1_40EApplicableRuleCodes,
		"MT700_1_ApplicableRuleDescription": uidata.MT700_1_ApplicableRuleDescription,
		"MT700_1_31DDateofExpiry": uidata.MT700_1_31DDateofExpiry,
		"MT700_1_31DPlaceofExpiry": uidata.MT700_1_31DPlaceofExpiry,
		"MT700_1_51aADApplicantBank_1": uidata.MT700_1_51aADApplicantBank_1,
		"MT700_1_50Applicant_1": uidata.MT700_1_50Applicant_1,
		//"MT700_1_50Applicant.2" : uidata.MT700_1_50Applicant_2,
		//"MT700_1_50Applicant.3" : uidata.MT700_1_50Applicant_3,
		"MT700_1_59Beneficiary_1": uidata.MT700_1_59Beneficiary_1,
		//"MT700_1_59Beneficiary.2" : uidata.MT700_1_59Beneficiary_2,
		//"MT700_1_59Beneficiary.3" : uidata.MT700_1_59Beneficiary_3,
		"MT700_1_32BCurrencyCode,Amount": uidata.MT700_1_32BCurrencyCode_Amount,
		"MT700_1_39APercentgCrAmtTolerance": uidata.MT700_1_39APercentgCrAmtTolerance,
		"MT700_1_39APercentgDrAmtTolerance": uidata.MT700_1_39APercentgDrAmtTolerance,
		"MT700_1_39BMaximumCreditAmt": uidata.MT700_1_39BMaximumCreditAmt,
		"MT700_1_39CAddlAmountsCovered_1": uidata.MT700_1_39CAddlAmountsCovered_1,
		"MT700_1_41aAAvailableWith": uidata.MT700_1_41aAAvailableWith,
		"MT700_1_41aDAvailablewith_1": uidata.MT700_1_41aDAvailablewith_1,
		"MT700_1_AvailableBy": uidata.MT700_1_AvailableBy,
		"MT700_1_42CDraftsat_1": uidata.MT700_1_42CDraftsat_1,
		"MT700_1_42aADraweeID": uidata.MT700_1_42aADraweeID,
		"MT700_1_42aDDraweeName_1": uidata.MT700_1_42aDDraweeName_1,
		"MT700_1_42MMixedPaymentDetails_1": uidata.MT700_1_42MMixedPaymentDetails_1,
		"MT700_1_42PDeferredPaymentDetails_1": uidata.MT700_1_42PDeferredPaymentDetails_1,
		"MT700_1_43PPartialShipments": uidata.MT700_1_43PPartialShipments,
		"MT700_1_43TTranshipment": uidata.MT700_1_43TTranshipment,
		"MT700_1_44APlaceofTakinginCharge": uidata.MT700_1_44APlaceofTakinginCharge,
		"MT700_1_44EPortofLoading": uidata.MT700_1_44EPortofLoading,
		"MT700_1_44FPortofDischarge": uidata.MT700_1_44FPortofDischarge,
		"MT700_1_44BFinalDestination": uidata.MT700_1_44BFinalDestination,
		"MT700_1_44CLatestDateofShipment": uidata.MT700_1_44CLatestDateofShipment,
		"MT700_1_44DShipmentPeriod_1": uidata.MT700_1_44DShipmentPeriod_1,
		"MT700_1_45ADescriptionofGoods": uidata.MT700_1_45ADescriptionofGoods,
		"MT700_1_46ADocumentsRequiredCode_1": uidata.MT700_1_46ADocumentsRequiredCode_1,
		"MT700_1_46ADocumentsRequired_1": uidata.MT700_1_46ADocumentsRequired_1,
		"MT700_1_46ADocumentsRequired": uidata.MT700_1_46ADocumentsRequired,
		"MT700_1_47AAdditionalConditions_1": uidata.MT700_1_47AAdditionalConditions_1,
		"MT700_1_47AAdditionalConditions": uidata.MT700_1_47AAdditionalConditions,
		"MT700_1_71BCharges": uidata.MT700_1_71BCharges,
		//"MT700_1_AllchargesoutsideUS" : uidata.MT700_1_AllchargesoutsideUS,
		//"MT700_1_arefortheaccountofbeneficiary" : uidata.MT700_1_arefortheaccountofbeneficiary,
		"MT700_1_48PeriodforPresentation": uidata.MT700_1_48PeriodforPresentation,
		"MT700_1_49ConfirmationInstructions": uidata.MT700_1_49ConfirmationInstructions,
		"MT700_1_53aAReimbursingBank": uidata.MT700_1_53aAReimbursingBank,
		"MT700_1_53aDReimbursingBank_1": uidata.MT700_1_53aDReimbursingBank_1,
		"MT700_1_78InstructionstotheBank": uidata.MT700_1_78InstructionstotheBank,
		"MT700_1_57aAAdviseThroughBank": uidata.MT700_1_57aAAdviseThroughBank,
		"MT700_1_57aDAdviseThroughBank_1": uidata.MT700_1_57aDAdviseThroughBank_1,
		"MT700_1_72SendertoReceiverInfo_1": uidata.MT700_1_72SendertoReceiverInfo_1,
		"MT740_MT740SenttoBankId": uidata.MT740_MT740SenttoBankId,
		"MT740_MT740SenttoBankName": uidata.MT740_MT740SenttoBankName,
		"MT740_SendMT740withLC": uidata.MT740_SendMT740withLC,
		"MT740_20Docy_CreditNumber": uidata.CreditNumber,
		"MT740_25AccountIdentification": uidata.MT740_25AccountIdentification,
		"MT740_31DDateofExpiry": uidata.MT740_31DDateofExpiry,
		"MT740_31DPlaceofExpiry": uidata.MT740_31DPlaceofExpiry,
		"MT740_58aADNegotiatingBank_1": uidata.MT740_58aADNegotiatingBank_1,
		"MT740_59Beneficiary": uidata.MT740_59Beneficiary,
		"MT740_59Beneficiary_1": uidata.MT740_59Beneficiary_1,
		"MT740_32BLCCurrency": uidata.MT740_32BLCCurrency,
		"MT740_39ACreditTolerance": uidata.MT740_39ACreditTolerance,
		"MT740_39ADebitTolerance": uidata.MT740_39ADebitTolerance,
		"MT740_39BMaximumCreditAmt": uidata.MT740_39BMaximumCreditAmt,
		"MT740_39CAddlAmountsCovered_1": uidata.MT740_39CAddlAmountsCovered_1,
		"MT740_40FApplicableRuleCodes": uidata.MT740_40FApplicableRuleCodes,
		"MT740_41aAAvailableWith": uidata.MT740_41aAAvailableWith,
		"MT740_41aDAvailablewith_1": uidata.MT740_41aDAvailablewith_1,
		"MT740_42CDraftsat_1": uidata.MT740_42CDraftsat_1,
		"MT740_42aADrawee": uidata.MT740_42aADrawee,
		"MT740_42aDDrawee_1": uidata.MT740_42aDDrawee_1,
		"MT740_42MMixedPaymentDetails_1": uidata.MT740_42MMixedPaymentDetails_1,
		"MT740_42PDeferredPaymentDetails_1": uidata.MT740_42PDeferredPaymentDetails_1,
		"MT740_71AReimbursingBankCharges": uidata.MT740_71AReimbursingBankCharges,
		"MT740_71BOtherCharges_1": uidata.MT740_71BOtherCharges_1,
		"MT740_72SendertoReceiverInfo_1": uidata.MT740_72SendertoReceiverInfo_1,
		"status": "requested",
	}];

	// console.log("chaincode in invoke===>",chaincode);

	beneficiarybank.query('INSERT INTO letterofcredit SET ?', inf, function (err, res) {
		if (err) throw err;
		/* var fromId = uidata.applicantCustomer.toLowerCase()+"@mail.com";
		var to = {"one":"admin@"+uidata.applicantBank.toLowerCase()+".com", "two" : "admin@"+uidata.advisingBankID.toLowerCase()+".com", "three" : uidata.beneficiaryId.toLowerCase()+"@mail.com"}; 
		//   to.one = uidata.applicantBank.toLowerCase()+"@mail.com";
		//           to.two = uidata.advisingBankID.toLowerCase()+"@mail.com";
		//           to.three = uidata.beneficiaryId.toLowerCase()+"@mail.com";
		var stat = "Requesting for LC Status - requested";
		var msg = "Hi,\n I have requested for LC. Kindly process. "+uidata.lcReqId+" is requested";

		sendEmail(fromId, to, stat, msg);
		//console.log('Last record insert id:', res.lcid);

		var response = postresang.end(uidata.lcReqId+" has been Requested successfully "); */
		//console.log("query string",inf);
		var response = postresang.end(uidata.lcRequestNumber + " has been Requested successfully ");
		return response;
	});
	
});


betabank.post('/bg-req', function (postreqang, postresang) {
	var inf = postreqang.body;
	////console.log("TEXT FROM UI",inf);
	var uidata = inf;
	////console.log("chaincode in uidata===>",uidata);

	var record = [{
		"bgReqID": uidata.bgReqID,
		"issuedOnBehalfOf": uidata.issuedOnBehalfOf,
		"currency": uidata.currency,
		"amount": uidata.amount,
		"dealDate": uidata.dealDate,
		"startDate": uidata.startDate,
		"expiryDate": uidata.expiryDate,
		"maturityDate": uidata.maturityDate,
		"beneficiaryBank": uidata.beneficiaryBank,
		"beneficiary": uidata.beneficiary,
		"termsAndConditions": uidata.termsAndConditions,
		"status": "Requested",

	}];

	// //console.log("chaincode in invoke===>",chaincode);

	beneficiarybank.query('INSERT INTO bankguarantee SET ?', record, function (err, res) {
		//console.log("response in bg>>>>>>>>>>>>>>>>>>>",res);
		if (err) throw err;
		var fromId = uidata.issuedOnBehalfOf.toLowerCase() + "@mail.com";
		var  to =   {
			//"one": "admin@" + uidata.applicantBank.toLowerCase() + ".com",
			"two": "admin@" + uidata.beneficiaryBank.toLowerCase() + ".com",
			"three": uidata.beneficiary.toLowerCase() + "@mail.com"
		}; 
		//   to.one = uidata.applicantBank.toLowerCase()+"@mail.com";
		//	to.two = uidata.advisingBankID.toLowerCase()+"@mail.com";
		//	to.three = uidata.beneficiaryId.toLowerCase()+"@mail.com";
		var stat = "Requesting for BG Status - requested";
		var msg = "Hi,\n I have requested for Bank Guarantee for" | uidata.bgReqID + "\n Kindly process. ";

		sendEmail(fromId, to, stat, msg);
		//	console.log('Last record insert id:', res.bgID);

		var response = postresang.end(uidata.bgReqID + " has been Requested successfully ");
		return response;


	});
});


betabank.get('/lcreq', function (req, res) {
	var queryString = "SELECT * FROM letterofcredit where status='requested' ";
	//console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("Login Customer ",rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;

			} else {
				res.send(rows);
				return
			}


			//connection.release();
		});
	});

});
///displaying all requested records of bankguarantee
betabank.get('/bg-req', function (req, res) {
	var queryString = "SELECT * FROM bankguarantee where status='Requested' ";
	console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("Login Customer ",rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;

			} else {
				res.send(rows);
				return
			}


			//connection.release();
		});
	});

});

//for individual req
betabank.get('/lcreq/:LCReqNumb', function (req, res) {
	var param = req.params.LCReqNumb;

	var queryString = 'select * from letterofcredit where lcRequestNumber=?';
	//console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("requested LC ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				if(rows[0].documents)
				{
					rows[0].documents = (rows[0].documents).toString('base64');
				}
				res.send(rows);
				return
			}

			//connection.release();
		});

	});


});

betabank.get('/customer/detail/custID/:ID', function (req, res) {
	var param = req.params.ID;
	//console.log("ID ", param);
	var queryString = 'SELECT * FROM CUSTOMER WHERE customerid=?';
	//console.log(queryString);
	shareddb.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("Login EMPLOYEE ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

			//connection.release();
		});

	});

});


betabank.get('/bank/otherBanks/:bankID', function (req, res) {
	var param = req.params.bankID;
	console.log("bankID ", param);
	var queryString = 'SELECT * FROM bank WHERE bankname!=?';
	console.log(queryString);
	shareddb.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("Login EMPLOYEE ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

			//connection.release();
		});

	});

});

betabank.get('/account/allDetail/', function (req, res) {

	var queryString = 'SELECT * FROM account';
	//console.log(queryString);
	shareddb.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("Login EMPLOYEE ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

			//connection.release();
		});
	});
});

//for individual bankguarantee req
betabank.get('/bg-req/:BGReqNumb', function (req, res) {
	var param = req.params.BGReqNumb;

	var queryString = 'select * from bankguarantee where bgReqID=?';
	////console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			////console.log("requested LC ", rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

			//connection.release();
		});

	});


});








betabank.get('/get-customer-lc/:name', function (req, res) {
	var param = req.params.name;


	var queryString = "select * from letterofcredit where status='requested' and Applicant=?";
						
	//console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			////console.log("LC VALUES ",rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;

			} else {
				res.send(rows);
				return
			}


			//connection.release();
		});
	});

});

betabank.get('/get-customer-amendlc/:name', function (req, res) {
	var param = req.params.name;
	console.log("customer based amend records---->", param);

	var queryString = "select * from letterofcreditamend where status='AmendRequested' and applicantID=?";
	console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("LC VALUES ",rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;

			} else {
				console.log("rows from request", rows);
				res.send(rows);
				return
			}


			//connection.release();
		});
	});

});

//get customer bank Guarantee
betabank.get('/get-customer-bg/:name', function (req, res) {
	var param = req.params.name;
	var queryString = "select * from bankguarantee where status='Requested' and issuedOnBehalfOf=?";
	////console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			////console.log("LC VALUES ",rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;

			} else {
				res.send(rows);
				return
			}
			//connection.release();
		});
	});

});

betabank.get('/get-customer-amendbg/:name', function (req, res) {
	var param = req.params.name;
	console.log("customer based amend records---->", param);

	var queryString = "select * from bankguaranteeamend where status='AMEND REQUESTED' and issuedOnBehalfOf=?";
	console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("LC VALUES ",rows);
			connection.release();
			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;

			} else {
				console.log("rows from request", rows);
				res.send(rows);
				return
			}


			//connection.release();
		});
	});

});

//lc-amend-req/{lcAmendId}"


betabank.get('/lc-amend-req/:lcAmendId', function (req, res) {
	var param = req.params.lcAmendId;

	var queryString = "select * from letterofcreditamend WHERE lcAmendId=? and status='AmendRequested'";
	//console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("LC VALUES ",rows);
			connection.release();
			if (rows.length <= 0) {
				//console.log("err ",err);
				res.send("FAILURE");
				return;

			} else {
				res.send(rows);
				return
			}


			//connection.release();
		});
	});







});

betabank.get('/bg-amend-req/:bgAmendId', function (req, res) {
	var param = req.params.bgAmendId;

	var queryString = "select * from bankguaranteeamend WHERE bgAmendId=? and status='AMEND REQUESTED'";
	//console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("LC VALUES ",rows);
			connection.release();
			if (rows.length <= 0) {
				console.log("err ", err);
				res.send("FAILURE");
				return;

			} else {
				res.send(rows);
				return
			}


			//connection.release();
		});
	});
});



betabank.post('/bg-amend-approve', function (req, res) {
	var bog = req.body;
	var ID = bog.bgNumber_t1;
	var status1 = bog.status;
	var BGREQ = bog.bgReqId;
	console.log("@@@@@@@@@@@@@@@@@@@@@@@AMEND_APPROVED@@@@@@@@@@@@@@@@@@@@@@@@@@@@", bog);




	/*  applicantBank.query("UPDATE letterofcreditamend SET status ='AMEND_APPROVED' WHERE lcreqid = ?", [LCREQ], function(err, result){
	if(err) throw err;
	//console.log('updated of record:', result);
	}); */




	var input = JSON.stringify(bog);
	chaincode.invoke.BGApprove([ID, status1]);
	var response = res.end(ID + " has been Amend-approved successfully");


	var fromId = bog.applicantCustomer.toLowerCase() + "@mail.com";
	var  to =   {
		"one": "admin@" + bog.applicantBank.toLowerCase() + ".com",
		"two": "admin@" + bog.applicantBank.toLowerCase() + ".com",
		"three": bog.beneficiary.toLowerCase() + "@mail.com"
	}; 
	var stat = "Requesting for BG Status - Amend Approved";
	var msg = "Hi,\n I have approved the amendment for BG" + bog.bgReqID;

	sendEmail(fromId, to, stat, msg);

	return response;
});




betabank.post('/lc-amend-approve', function (req, res) {
	var loc = req.body;
	var ID = loc.lcId;
	var status1 = loc.status;
	var LCREQ = loc.lcReqId;
	//console.log("@@@@@@@@@@@@@@@@@@@@@@@AMEND_APPROVED@@@@@@@@@@@@@@@@@@@@@@@@@@@@",status1);




	/*  applicantBank.query("UPDATE letterofcreditamend SET status ='AMEND_APPROVED' WHERE lcreqid = ?", [LCREQ], function(err, result){
	if(err) throw err;
	//console.log('updated of record:', result);
	}); */




	var input = JSON.stringify(loc);
	chaincode.invoke.UpdateStatus([ID, status1]);
	var response = res.end(ID + " has been Amend-approved successfully");


	var fromId = "admin@" + loc.advisingBankID.toLowerCase() + ".com";
	var  to =   {
		"one": loc.applicantCustomer.toLowerCase() + "@mail.com",
		"two": "admin@" + loc.applicantBank.toLowerCase() + ".com",
		"three": loc.beneficiaryId.toLowerCase() + "@mail.com"
	}; 
	var stat = "Requesting for LC Status - Amend Approved";
	var msg = "Hi,\n I have approved the amendment for LC" + loc.lcReqId;

	sendEmail(fromId, to, stat, msg);

	return response;
});

//Bill
betabank.post('/lc-docs-verify/:lcId', function (req, res) {

	//console.log("inside verify js file betabank=========================>>>>>>>>>>")

	var indexLc = req.params.lcId;
	//var lcRec = req.body;
	//console.log(" index -     - ",indexLc);
	////console.log(" lcRec -     - ",lcRec);
	//var input  = JSON.stringify(lcRec);
	chaincode.invoke.VerifyBill([indexLc]);
	var response = res.end("Verified Bill");
	return response;

});

//tws service///

betabank.post('/getAccountDetails/:customerId', function (req, res) {

	//chandana logic
	var cusId = req.params.customerId;
	var requestHeaders = {
		'cache-control': 'no-cache',
		//'soapaction': 'addRoom',
		'content-type': undefined
	};
	var data, test, finalData;
	var requestBody = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:read="http://temenos.com/ReadCust"><soapenv:Header/><soapenv:Body><read:Accountdetails><!--Optional:--><WebRequestCommon><!--Optional:--><company>GB0010001</company><password>123123</password><userName>INPUTT</userName></WebRequestCommon><!--Optional:--><TCIBACCTDETAILSType><!--Zero or more repetitions:--><enquiryInputCollection><!--Optional:--><columnName>CUSTOMER</columnName><!--Optional:--><criteriaValue>' + cusId + '</criteriaValue><!--Optional:--><operand>EQ</operand></enquiryInputCollection></TCIBACCTDETAILSType></read:Accountdetails></soapenv:Body></soapenv:Envelope>'


	var requestOptions = {
		'method': 'POST',
		'url': 'http://52.18.174.96:8080/ReadCust/services',
		'qs': {
			'wsdl': ''
		},
		'headers': requestHeaders,
		'body': requestBody,
		'timeout': 5000
	};


	request(requestOptions, function (error, response, body) {

		//console.log("Request",requestOptions);
		//console.log("Response",response.body);

		var parseString = require('xml2js').parseString;
		var xml = body;
		parseString(xml, function (err, result) {
			//console.log("result",result);
			//var data1 = JSON.stringify(result);
			data = JSON.stringify(result);
			console.log(JSON.stringify(result));
			test = JSON.parse(data);
			console.log("test", test);
			//console.log("test ================ >>>>>>>>>>>",test['S:Envelope']['S:Body'][0]['ns3:AccountdetailsResponse'][0].TCIBACCTDETAILSType[0]['ns2:gTCIBACCTDETAILSDetailType'][0]['ns2:mTCIBACCTDETAILSDetailType']);

			finalData = test['S:Envelope']['S:Body'][0]['ns3:AccountdetailsResponse'][0].TCIBACCTDETAILSType[0]['ns2:gTCIBACCTDETAILSDetailType'][0]['ns2:mTCIBACCTDETAILSDetailType'];

		});

		res.send(finalData);
		//return data;

	})

	//console.log("res",res);

	//end

});

////end/////
betabank.post('/lodge-bill/:lcId', function (req, res) {

	//console.log("inside bill lodge in js file=========================>>>>>>>>>>")

	var indexLc = req.params.lcId;
	var bill = req.body;
	//console.log(" index -     - ",indexLc);
	//console.log(" Bill -     - ",bill);
	var billAmount = bill.bills[0].billAmount;
	var billNo = bill.bills[0].billNo;

	var billLength = bill.bills.length;
	//console.log("length of bills=====>>>>>>>",billLength);


	//console.log("****** Bill No     - ",billNo);
	//console.log("Bill Amount - ",billAmount);
	var input = JSON.stringify(bill.bills[billLength - 1]);
	//console.log("json",input);
	chaincode.invoke.LodgeBill([indexLc, input]);

	var response = res.end(billNo + " has been Generated for " + indexLc);
	return response;
	//var response = postresang.end(uidata.lcAmendReqId+" has been Requested successfully");
	//var response = res.end("Created successfully");



});




betabank.post('/image-store', function (req, res) {
	var imgDetail = req.body;
	console.log("imgDetail FROM UI", imgDetail);
	console.log("imgDetail.docID", imgDetail.docID);

	var imgVal = JSON.stringify(imgDetail);
	chaincode.invoke.storeImageDetial([imgDetail.docID, imgVal]);

	var response = res.end("Image uploaded successfully");
	return response;

	//}); 
	//})

});

betabank.get('/api/GetImageDetialById/:id', function (req, res) {

	idValue = req.params.id
	console.log("idValue", idValue);
	chaincode.query.GetImageDetialById([idValue], function (err, resp) {

		if (resp != null) {
			console.log("resp ===>", resp);
			var parseval = JSON.parse(resp);
			console.log("parseval ==>", parseval);
			var info = {
				"DATA": parseval
			};
			res.json(info);
		}
	});
});






betabank.post('/documentTableUpdate', function (postreqang, postresang) {
	var uidata = postreqang.body;


	var image = uidata.IMAGE;
	var bitmap = new Buffer(image, 'base64');
	//fs.writeFileSync("images/example.jpg", bitmap);
	//console.log("bitmap",bitmap);

	var imageRecord = [{
		"ID": uidata.ID,
		//"IMAGE": fs.readFileSync(uidata.IMAGE),
		//"IMAGE": fs.readFileSync("z3.jpg"),
		"IMAGE": bitmap,
		"content": uidata.content,
		"docType": uidata.docType,
	}];

	console.log("imageRecord", imageRecord);


	beneficiarybank.query('INSERT INTO documents SET ?', imageRecord, function (err, res) {
		if (err) throw err;
		var response = postresang.end(uidata.ID + " has been Insertted to documents successfully");
		return response;
	});
});


betabank.get('/documentTableQuery/:ID', function (req, res) {
	var param = req.params.ID;

	var queryString = "select * from documents WHERE ID=?";
	//console.log(queryString);

	beneficiarybank.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString, [param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			//console.log("LC VALUES ",rows);
			connection.release();
			if (rows.length <= 0) {
				console.log("err ", err);
				res.send("FAILURE");
				return;

			} else {
				//console.log("rows[0].IMAGE",rows[0].IMAGE);

				rows[0].IMAGE = (rows[0].IMAGE).toString('base64');
				console.log("(rows[0].IMAGE).toString('base64')", (rows[0].IMAGE).toString('base64'));
				//fs.writeFileSync("images/example_download.jpg",rows[0].IMAGE);
				res.send(rows);
				return
			}


			//connection.release();
		});
	});
});



betabank.get('/getCharges/:chargecode', function (req, res) {
	var param=req.params.chargecode;
	var queryString = "SELECT * FROM chargecodes WHERE chargecode=?";
	
	// console.log("query string>>>>>>>>>>>>>>",queryString);


	shareddb.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			res.json({
				"code": 100,
				"status": "Error in connection database"
			});
			return;
		}
		connection.query(queryString,[param], function (err, rows, fields) {
			if (err) {
				res.send("FAILURE");
			}
			connection.release();

			if (rows.length <= 0) {
				res.send(" [ { Result: 'Failure' } ]");
				return;
			} else {
				res.send(rows);
				return
			}

		});
	});
});





function sendEmail(fromId, toId, subject, message) {
	currentToId = toId;
	//console.log('currentToId first', currentToId);
	//console.log('toId first', toId);
	if (currentToId.one) {
		toId = currentToId.one;
	}
	if (currentToId.one) {
		toId += "," + currentToId.two;
	}
	if (currentToId.one) {
		toId += "," + currentToId.three;
	}
	//console.log('currentToId : %s \n toId: %s', currentToId, toId);

	var mailOptions = {
		from: fromId, // sender address
		to: toId, // list of receivers
		subject: subject, // Subject line
		text: message //, // plaintext body
		// html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return //console.log(error);
		}
		//console.log('Message %s sent: %s', info.messageId, info.response);
	});

	return null;
}




betabank.post('/email-for-amend', function (postreqang, postresang) {
	var email = postreqang.body;
	//  var x = sendEmail("a@a.com", "b@b.com", "t1","message");


	var mailOptions = {
		from: email.from, // sender address
		to: email.to, // list of receivers
		subject: email.subject, // Subject line
		text: email.msg //, // plaintext body
		// html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
	};
	//console.log(" send sendMail",mailOptions);

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return //console.log(error);
		}
		//console.log('Message %s sent: %s', info.messageId, info.response);
	});

	postresang.send("An email for Amendment is sent");
});



var beta = betabank.listen(10007, function () {


});
var host = beta.address().address
var port1 = beta.address().port
//console.log("BETA BANK listening at http://%s:%s", host, port1)
