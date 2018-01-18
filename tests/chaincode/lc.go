package main

import (
	"errors"
	"fmt"
	"strings"
	"time"
	"strconv"
	"encoding/json"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

var LCID = "LCID"
var BGID = "BGID"

var logger = shim.NewLogger("mylogger")

type SimpleChaincode struct {
}

type LetterOfCredit struct {
	LcId                                string `json:"lcId"`
	LcRequestNumber                     string `json:"lcRequestNumber"`
	ImportSightPmtLCType_t1             string `json:"importSightPmtLCType_t1"`
	ApplicantID_t1                      string `json:"applicantID_t1"`
	ApplicantAddress_t1                 string `json:"applicantAddress_t1"`
	LCCurrency_t1                       string `json:"lCCurrency_t1"`
	LCAmount_t1                         string `json:"lCAmount_t1"`
	CreditTolerance_t1                  string `json:"creditTolerance_t1"`
	DebitTolerance_t1                   string `json:"debitTolerance_t1"`
	LCIssueDate_t1                      string `json:"lCIssueDate_t1"`
	ShipmentDate_t1                     string `json:"shipmentDate_t1"`
	LCExpiryDate_t1                     string `json:"lCExpiryDate_t1"`
	LiablityReversalDate_t1             string `json:"liablityReversalDate_t1"`
	PresentationDays_t1                 string `json:"presentationDays_t1"`
	LCExpiryPlace_t1                    string `json:"lCExpiryPlace_t1"`
	Placeofexpiry_t1                    string `json:"placeofexpiry_t1"`
	IncoTerms_t1                        string `json:"incoTerms_t1"`
	ModeOfShipment_t1                   string `json:"modeOfShipment_t1"`
	LimitReference_t1                   string `json:"limitReference_t1"`
	AutoExpiry_t1                       string `json:"autoExpiry_t1"`
	OtherOfficer_t1                     string `json:"otherOfficer_t1"`
	AccountOfficer_t1                   string `json:"accountOfficer_t1"`
	PortfolioApplicant_t1               string `json:"portfolioApplicant_t1"`
	PortfolioBeneficiary_t1             string `json:"portfolioBeneficiary_t1"`
	BeneficiaryID_t2                    string `json:"beneficiaryID_t2"`
	AdvisingThroughBank_t2              string `json:"advisingThroughBank_t2"`
	BeneficiaryAddress_t2               string `json:"beneficiaryAddress_t2"`
	AdvisingBankAddress_t2              string `json:"advisingBankAddress_t2"`
	AvailableWithBankID_t2              string `json:"availableWithBankID_t2"`
	AdvisingBankID_t2                   string `json:"advisingBankID_t2"`
	ReimbusingBank_t2                   string `json:"reimbusingBank_t2"`
	ChargesFrom_t3                      string `json:"chargesFrom_t3"`
	ChargeDefaultAcct_t3                string `json:"chargeDefaultAcct_t3"`
	ChargeCode_t3                       string `json:"chargeCode_t3"`
	PartyCharged_t3                     string `json:"partyCharged_t3"`
	ChargeDebitAcct_t3                  string `json:"chargeDebitAcct_t3"`
	ChargeCurrency_t3                   string `json:"chargeCurrency_t3"`
	ChargeExchangeRate_t3               string `json:"chargeExchangeRate_t3"`
	WaiveCharges_t3                     string `json:"waiveCharges_t3"`
	ChargeAmount_t3                     string `json:"chargeAmount_t3"`
	AmortiseCharges_t3                  string `json:"amortiseCharges_t3"`
	ChargeStatus_t3                     string `json:"chargeStatus_t3"`
	TaxCurrency_t3                      string `json:"taxCurrency_t3"`
	CommissionCode_t4                   string `json:"commissionCode_t4"`
	CommissionParty_t4                  string `json:"commissionParty_t4"`
	CommissionFrequency_t4              string `json:"commissionFrequency_t4"`
	CommissionRate_t4                   string `json:"commissionRate_t4"`
	AccrualParam_t4                     string `json:"accrualParam_t4"`
	CommissionAmount_t4                 string `json:"commissionAmount_t4"`
	FixedCommissionAmount_t4            string `json:"fixedCommissionAmount_t4"`
	CommissionAccount_t4                string `json:"commissionAccount_t4"`
	CommissionExchangeRate_t4           string `json:"commissionExchangeRate_t4"`
	CommissionClaimed_t4                string `json:"commissionClaimed_t4"`
	BackForward_t4                      string `json:"backForward_t4"`
	ReturnCommission_t4                 string `json:"returnCommission_t4"`
	SLRefTranche_t5                     string `json:"sLRefTranche_t5"`
	ProductType_t5                      string `json:"productType_t5"`
	BaseCcyRate_t5                      string `json:"baseCcyRate_t5"`
	Participator_t5                     string `json:"participator_t5"`
	PartShare_t5                        string `json:"partShare_t5"`
	PartAmount_t5                       string `json:"partAmount_t5"`
	SyndicateCharge_t5                  string `json:"syndicateCharge_t5"`
	OwnPartAmt_t5                       string `json:"ownPartAmt_t5"`
	BankToBankInfo_t5                   string `json:"bankToBankInfo_t5"`
	MT799Message_t5                     string `json:"mT799Message_t5"`
	MarginRequired_t6                   string `json:"marginRequired_t6"`
	MarginCalcBase_t6                   string `json:"marginCalcBase_t6"`
	MarginPercent_t6                    string `json:"marginPercent_t6"`
	MarginDebitAccount_t6               string `json:"marginDebitAccount_t6"`
	MarginAmount_t6                     string `json:"marginAmount_t6"`
	MarginExchangeRate_t6               string `json:"marginExchangeRate_t6"`
	MarginCreditAcct_t6                 string `json:"marginCreditAcct_t6"`
	LimitwithProvision_t6               string `json:"limitwithProvision_t6"`
	DrawingType_1_t7                    string `json:"drawingType_1_t7"`
	PaymentPercent_1_t7                 string `json:"paymentPercent_1_t7"`
	PaymentPortion_1_t7                 string `json:"paymentPortion_1_t7"`
	Acpt_timeBand_1_t7                  string `json:"acpt_timeBand_1_t7"`
	AddCoveredAmt_1_t7                  string `json:"addCoveredAmt_1_t7"`
	PortLimitRef_1_t7                   string `json:"portLimitRef_1_t7"`
	PortionOverdrawn_1_t7               string `json:"portionOverdrawn_1_t7"`
	RevolvingType_t7                    string `json:"revolvingType_t7"`
	NoofRevolutions_t7                  string `json:"noofRevolutions_t7"`
	RevolvingFqy_t7                     string `json:"revolvingFqy_t7"`
	LimitforRevolving_t7                string `json:"limitforRevolving_t7"`
	Cur_Revol_Liab_t7                   string `json:"cur_Revol_Liab_t7"`
	DocumentId_t8                       string `json:"documentId_t8"`
	DocumentsCode_1_t8                  string `json:"documentsCode_1_t8"`
	ADocumentsText_1_t8                 string `json:"aDocumentsText_1_t8"`
	ADocumentsRequired_t8               string `json:"aDocumentsRequired_t8"`
	AAdditionalConditions_1_t8          string `json:"aAdditionalConditions_1_t8"`
	MT700_1_20Docy_CreditNumber         string `json:"mT700_1_20Docy_CreditNumber"`
	MT700_1_23ReferencetoPreAdvice      string `json:"mT700_1_23ReferencetoPreAdvice"`
	MT700_1_31CDateofIssue              string `json:"mT700_1_31CDateofIssue"`
	MT700_1_40EApplicableRuleCodes      string `json:"mT700_1_40EApplicableRuleCodes"`
	MT700_1_31DDateofExpiry             string `json:"mT700_1_31DDateofExpiry"`
	MT700_1_31DPlaceofExpiry            string `json:"mT700_1_31DPlaceofExpiry"`
	MT700_1_51aADApplicantBank_1        string `json:"mT700_1_51aADApplicantBank_1"`
	MT700_1_50Applicant_1               string `json:"mT700_1_50Applicant_1"`
	MT700_1_59Beneficiary_1             string `json:"mT700_1_59Beneficiary_1"`
	MT700_1_32BCurrencyCode_Amount      string `json:"mT700_1_32BCurrencyCode_Amount"`
	MT700_1_39APercentgCrAmtTolerance   int    `json:"mT700_1_39APercentgCrAmtTolerance"`
	MT700_1_39APercentgDrAmtTolerance   int    `json:"mT700_1_39APercentgDrAmtTolerance"`
	MT700_1_39BMaximumCreditAmt         int    `json:"mT700_1_39BMaximumCreditAmt"`
	MT700_1_39CAddlAmountsCovered_1     int    `json:"mT700_1_39CAddlAmountsCovered_1"`
	MT700_1_41aAAvailableWith           string `json:"mT700_1_41aAAvailableWith"`
	MT700_1_41aDAvailablewith_1         string `json:"mT700_1_41aDAvailablewith_1"`
	MT700_1_AvailableBy                 string `json:"mT700_1_AvailableBy"`
	MT700_1_42CDraftsat_1               string `json:"mT700_1_42CDraftsat_1"`
	MT700_1_42aADraweeID                string `json:"mT700_1_42aADraweeID"`
	MT700_1_42aDDraweeName_1            string `json:"mT700_1_42aDDraweeName_1"`
	MT700_1_42MMixedPaymentDetails_1    string `json:"mT700_1_42MMixedPaymentDetails_1"`
	MT700_1_42PDeferredPaymentDetails_1 string `json:"mT700_1_42PDeferredPaymentDetails_1"`
	MT700_1_43PPartialShipments         string `json:"mT700_1_43PPartialShipments"`
	MT700_1_43TTranshipment             string `json:"mT700_1_43TTranshipment"`
	MT700_1_44APlaceofTakinginCharge    string `json:"mT700_1_44APlaceofTakinginCharge"`
	MT700_1_44EPortofLoading            string `json:"mT700_1_44EPortofLoading"`
	MT700_1_44FPortofDischarge          string `json:"mT700_1_44FPortofDischarge"`
	MT700_1_44BFinalDestination         string `json:"mT700_1_44BFinalDestination"`
	MT700_1_44CLatestDateofShipment     string `json:"mT700_1_44CLatestDateofShipment"`
	MT700_1_44DShipmentPeriod_1         string `json:"mT700_1_44DShipmentPeriod_1"`
	MT700_1_45ADescriptionofGoods       string `json:"mT700_1_45ADescriptionofGoods"`
	MT700_1_46ADocumentsRequiredCode_1  string `json:"mT700_1_46ADocumentsRequiredCode_1"`
	MT700_1_46ADocumentsRequired_1      string `json:"mT700_1_46ADocumentsRequired_1"`
	MT700_1_46ADocumentsRequired        string `json:"mT700_1_46ADocumentsRequired"`
	MT700_1_47AAdditionalConditions_1   string `json:"mT700_1_47AAdditionalConditions_1"`
	MT700_1_47AAdditionalConditions     string `json:"mT700_1_47AAdditionalConditions"`
	MT700_1_71BCharges                  int    `json:"mT700_1_71BCharges"`
	MT700_1_48PeriodforPresentation     string `json:"mT700_1_48PeriodforPresentation"`
	MT700_1_49ConfirmationInstructions  string `json:"mT700_1_49ConfirmationInstructions"`
	MT700_1_53aAReimbursingBank         string `json:"mT700_1_53aAReimbursingBank"`
	MT700_1_53aDReimbursingBank_1       string `json:"mT700_1_53aDReimbursingBank_1"`
	MT700_1_78InstructionstotheBank     string `json:"mT700_1_78InstructionstotheBank"`
	MT700_1_57aAAdviseThroughBank       string `json:"mT700_1_57aAAdviseThroughBank"`
	MT700_1_57aDAdviseThroughBank_1     string `json:"mT700_1_57aDAdviseThroughBank_1"`
	MT700_1_72SendertoReceiverInfo_1    string `json:"mT700_1_72SendertoReceiverInfo_1"`
	MT740_MT740SenttoBankId             string `json:"mT740_MT740SenttoBankId"`
	MT740_MT740SenttoBankName           string `json:"mT740_MT740SenttoBankName"`
	MT740_SendMT740withLC               string `json:"mT740_SendMT740withLC"`
	MT740_20Docy_CreditNumber           string `json:"mT740_20Docy_CreditNumber"`
	MT740_25AccountIdentification       string `json:"mT740_25AccountIdentification"`
	MT740_31DDateofExpiry               string `json:"mT740_31DDateofExpiry"`
	MT740_31DPlaceofExpiry              string `json:"mT740_31DPlaceofExpiry"`
	MT740_58aADNegotiatingBank_1        string `json:"mT740_58aADNegotiatingBank_1"`
	MT740_59Beneficiary                 string `json:"mT740_59Beneficiary"`
	MT740_59Beneficiary_1               string `json:"mT740_59Beneficiary_1"`
	MT740_32BLCCurrency                 string `json:"mT740_32BLCCurrency"`
	MT740_39ACreditTolerance            string `json:"mT740_39ACreditTolerance"`
	MT740_39ADebitTolerance             string `json:"mT740_39ADebitTolerance"`
	MT740_39BMaximumCreditAmt           int    `json:"mT740_39BMaximumCreditAmt"`
	MT740_39CAddlAmountsCovered_1       int    `json:"mT740_39CAddlAmountsCovered_1"`
	MT740_40FApplicableRuleCodes        string `json:"mT740_40FApplicableRuleCodes"`
	MT740_41aAAvailableWith             string `json:"mT740_41aAAvailableWith"`
	MT740_41aDAvailablewith_1           string `json:"mT740_41aDAvailablewith_1"`
	MT740_42CDraftsat_1                 string `json:"mT740_42CDraftsat_1"`
	MT740_42aADrawee                    string `json:"mT740_42aADrawee"`
	MT740_42aDDrawee_1                  string `json:"mT740_42aDDrawee_1"`
	MT740_42MMixedPaymentDetails_1      string `json:"mT740_42MMixedPaymentDetails_1"`
	MT740_42PDeferredPaymentDetails_1   string `json:"mT740_42PDeferredPaymentDetails_1"`
	MT740_71AReimbursingBankCharges     string `json:"mT740_71AReimbursingBankCharges"`
	MT740_71BOtherCharges_1             int    `json:"mT740_71BOtherCharges_1"`
	MT740_72SendertoReceiverInfo_1      string `json:"mT740_72SendertoReceiverInfo_1"`
	//AdvisingBankRef      				string `json:"lcAmendAdvisingBankRef"`
	Status                              string `json:"status"`
	TransactionId                       string `json:"transactionId"`
	AmendArray                      	[]AmendLetterOfCreditDetails `json:"amendArray"`
	LcNumberOfAmendments            	int     `json:"lcNumberOfAmendments"`
	Bill                            	[]Bills	`json:"billArray"`
	AmendmentDetails     string `json:"amendmentDetails"`	
}

type Bills struct {
	BillNo           string `json:"billNo"`
	BillAmount       int    `json:"billAmount"`
	CurrencyType     string `json:"currencyType"`
	BillDate         string `json:"billDate"`
	LcOutstandingAmt int    `json:"lcOutstandingAmt"`
}

type AmendLetterOfCreditDetails struct {
	LcId                 string `json:"lcId"`
	LcAmendReqId         string `json:"lcAmendReqId"`
	LCAmount_t1          string `json:"lCAmount_t1"`
	//AdvisingBankRef      string `json:"lcAmendAdvisingBankRef"`
	//ModeOfShipment_t1    string `json:"modeOfShipment_t1"`
	LCExpiryDate_t1      string `json:"lCExpiryDate_t1"`
	LCExpiryPlace_t1     string `json:"lCExpiryPlace_t1"`
	Status               string `json:"status"`
	LcNumberOfAmendments int    `json:"lcNumberOfAmendments"`
	AmendmentDetails     string `json:"amendmentDetails"`	
}

type errorMessages struct{
	FieldName      string `json:"fieldName"`
	ErrMsg         string `json:"errMsg"`
}

type storeImage struct{
DocID				string        `json:"docID"`
DocType 			string        `json:"docType"`
DocContent 		   	string        `json:"docContent"`
LcId           		string        `json:"lcId"`
}

type BankGuarantee struct {
BgNumber_t1    		 		string 	`json:"bgNumber_t1"` 
BgReqId    		 			string 	`json:"bgReqId"`  
GuaranteeRef_t1     		string 	`json:"guaranteeRef_t1"`
IssuedOnBehalfOf_t1     	string 	`json:"issuedOnBehalfOf_t1"` 
Currency_t1     			string 	`json:"currency_t1"` 
DealDate_t1     			string 	`json:"dealDate_t1"`
ExpiryDate_t1     			string 	`json:"expiryDate_t1"` 
BeneficiaryId_t1     		string 	`json:"beneficiaryId_t1"` 
BeneficiaryNoncust_1_t1     string 	`json:"beneficiaryNoncust_1_t1"` 
TermsNconditions_1_t1     	string 	`json:"termsNconditions_1_t1"` 
EventsProcessing_t1     	string 	`json:"eventsProcessing_t1"` 
LiquidationMode_t1     		string 	`json:"liquidationMode_t1"` 
CustomersReference_t1     	string	`json:"customersReference_t1"` 
Amount_t1     				string	`json:"amount_t1"` 
StartDate_t1     			string	`json:"startDate_t1"` 
MaturityDate_t1     		string	`json:"maturityDate_t1"` 
LimitReference_t1     		string	`json:"limitReference_t1"` 
Autoexpiry_t1     			string	`json:"autoexpiry_t1"` 

ChargeDate_1_t2     		string `json:"chargeDate_1_t2"` 
ChargeCurrency_1_t2     	string `json:"chargeCurrency_1_t2"` 
ChargeDebitAccount_1_t2     string `json:"chargeDebitAccount_1_t2"` 
ChargeCode_1_1_t2     		string `json:"chargeCode_1_1_t2"` 
ChargeAmount_1_1_t2     	string `json:"chargeAmount_1_1_t2"` 

CommissionPayType_t3     	string `json:"commissionPayType_t3"` 
InterestCalcBasis_t3     	string `json:"interestCalcBasis_t3"` 
Commrate_t3     			string `json:"commrate_t3"` 
CommFrequency_t3     		string `json:"commFrequency_t3"` 
FixedAmount_t3     			string `json:"fixedAmount_t3"` 
CommissionClaimed_t3     	string `json:"commissionClaimed_t3"` 
CommissionDate_1_t3     	string `json:"commissionDate_1_t3"` 
CommDebitAcct_1_t3     		string `json:"commDebitAcct_1_t3"` 
RateChange_t3     			string `json:"rateChange_t3"` 
NewRate_t3     				string `json:"newRate_t3"` 
AccrualPattern_t3     		string `json:"accrualPattern_t3"` 
CurrentRate_t3     			string `json:"currentRate_t3"` 
CommSpread_t3     			string `json:"commSpread_t3"` 
CommissionAmount_1_t3     	string `json:"commissionAmount_1_t3"` 
ConversionRate_1_t3     	string `json:"conversionRate_1_t3"` 
ReturnCommission_t3     	string `json:"returnCommission_t3"` 
EffectiveDate_t3     		string `json:"effectiveDate_t3"` 

TakeMargin_t4     			string `json:"takeMargin_t4"` 
MarginPercent_t4     		string `json:"marginPercent_t4"` 
MarginAmount_t4     		string `json:"marginAmount_t4"` 
MarginReleaseDate_t4     	string `json:"marginReleaseDate_t4"` 
MarginDebitAcct_t4    		string `json:"marginDebitAcct_t4"` 
ProvisionExchangeRate_t4    string `json:"provisionExchangeRate_t4"` 
MarginCreditAcct_t4     	string `json:"marginCreditAcct_t4"` 
MarginReleaseAcct_t4     	string `json:"marginReleaseAcct_t4"`

SlTrancheReference_t5     	string `json:"slTrancheReference_t5"` 
ProductType_t5     			string `json:"productType_t5"` 
SlLinkdate_t5     			string `json:"slLinkdate_t5"` 
IssuingBank_t5     			string `json:"issuingBank_t5"` 
ParticipantId_1_t5     		string `json:"participantId_1_t5"` 
ParticipationAmt_1_t5     	string `json:"participationAmt_1_t5"` 
NetPrinAmt_t5     			string `json:"netPrinAmt_t5"` 

ReceivingBankId_t6     		string `json:"receivingBankId_t6"`
ReceivingBankAddress_1_t6   string `json:"receivingBankAddress_1_t6"` 
UpdateCorrBankLimit_t6     	string `json:"updateCorrBankLimit_t6"` 
TransactionReferenceNo20_t6 string `json:"transactionReferenceNo20_t6"` 
FurtherIdentification23_t6  string `json:"furtherIdentification23_t6"` 
Date30_t6     				string `json:"date30_t6"` 
DetailsOfGuarantee77c_1_t6  string `json:"detailsOfGuarantee77c_1_t6"` 
SenderToReceiverInfo72_t6   string `json:"senderToReceiverInfo72_t6"` 
ApplicableRule_t6     		string `json:"applicableRule_t6"` 
Narrative_t6     			string `json:"narrative_t6"` 

Status                      string `json:"status"`
TransactionId               string `json:"transactionId"`
BgAmendArray                []AmendBankGuaranteeDetails `json:"bgAmendArray"`
BgNumberOfAmendments      	int     `json:"bgNumberOfAmendments"`
}

type AmendBankGuaranteeDetails struct {
	BgNumber_t1             string `json:"bgNumber_t1"`
	BgAmendReqId         	string `json:"bgAmendReqId"`
	Amount_t1      			string `json:"amount_t1"`
	TermsNconditions_1_t1   string `json:"termsNconditions_1_t1"`
	ExpiryDate_t1           string `json:"expiryDate_t1"`
	Status               	string `json:"status"`
	BgNumberOfAmendments 	int    `json:"bgNumberOfAmendments"`
}

func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	var err error

	var empty []string
	jsonAsBytes, _ := json.Marshal(empty)
	err = stub.PutState(LCID, jsonAsBytes)
	err = stub.PutState(BGID, jsonAsBytes)
	if err != nil {
		return nil, err
	}

	return nil, nil

}

func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	if function == "OpenLetterOfCredit" {
		// creates an entity from its state
		return t.OpenLetterOfCredit(stub, args)
	}
	if function == "OpenBankGuarantee" {
		// creates an entity from its state
		return t.OpenBankGuarantee(stub, args)
	}
	if function == "UpdateStatus" {
		// updates an entity from its state
		return t.UpdateStatus(stub, args)
	}
	if function == "BGApprove" {
		// updates an entity from its state
		return t.BGApprove(stub, args)
	}
	if function == "VerifyBill" {
		return t.VerifyBill(stub, args)
		//updates the status as Bills uploaded
	}
	if function == "LodgeBill" {
		// creates an entity from its state
		return t.LodgeBill(stub, args)
	}
	if function == "AmendLetterOfCredit" {
		// updates a record based on lcId
		return t.AmendLetterOfCredit(stub, args)
	}
	if function == "AmendBankGuarantee" {
		// updates a record based on lcId
		return t.AmendBankGuarantee(stub, args)
	}
	if function == "UpdateTransactionId" {
		// updates an entity from its state
		return t.UpdateTransactionId(stub, args)
	}
	if function == "UpdateBgTransactionId" {
		// updates an entity from its state
		return t.UpdateBgTransactionId(stub, args)
	}
	if function == "storeImageDetial" {
		// updates an image from its state
		return t.storeImageDetial(stub, args)
	}
	return nil, nil
}

func (t *SimpleChaincode) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	if function == "GetLcById" {
		// creates an entity from its state
		return t.GetLcById(stub, args)
	}
	if function == "GetAllLC" {
		// creates an entity from its state
		return t.GetAllLC(stub, args)
	}
	if function == "GetCustomerBasedRecords" {
		// creates an entity from its state
		return t.GetCustomerBasedRecords(stub, args)
	}
	if function == "Validation" {
		// creates an entity from its state
		return t.Validation(stub, args)
	}
	if function == "BGValidation" {
		// creates an entity from its state
		return t.BGValidation(stub, args)
	}	
	if function == "GetImageDetialById" {
		// creates an image from its state
		return t.GetImageDetialById(stub, args)
	}
	if function == "GetCustomerBasedBgRecords" {
		// creates an entity from its state
		return t.GetCustomerBasedBgRecords(stub, args)
	}
	if function == "GetBgById" {
		// creates an entity from its state
		return t.GetBgById(stub, args)
	}
	if function == "GetAllBG" {
		// creates an entity from its state
		return t.GetAllBG(stub, args)
	}
	return nil, nil
}

func (t *SimpleChaincode) GetCustomerBasedRecords(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering GetCustomerBasedRecords")

	var jsonRespAll string
	var data []byte
	var IDs []string
	var LcArrayAsBytes []byte
	var customerName = args[0]

	IDAsBytes, err := stub.GetState(LCID)
	if err != nil {
		//return fail, errors.New("Failed to get math index")
	}
	json.Unmarshal(IDAsBytes, &IDs)
	fmt.Println("IDAsBytes :", IDs)

	for i := range IDs {
		fmt.Println("IDs :", IDs[i])
		var ID = IDs[i]
		LcArrayAsBytes, err = stub.GetState(ID)
		if err != nil {
			fmt.Println("error in fetching record")
			//return fail, errors.New("Failed to get ")
		}

		res := LetterOfCredit{}
		json.Unmarshal(LcArrayAsBytes, &res)
		fmt.Println("customerName   " + customerName)
		fmt.Println("res   ", res)
		if (res.ApplicantID_t1 == customerName) || (res.BeneficiaryID_t2 == customerName) {
			//fmt.Println("res data:", res)
			s1, _ := json.Marshal(res)

			jsonRespAll = jsonRespAll + string(s1)
			fmt.Println("jsonRespAll   " + jsonRespAll)

			data = []byte(jsonRespAll)
		}
	}
	fmt.Println("outside for loop data   ", data)
	return data, nil

}

func (t *SimpleChaincode) OpenLetterOfCredit(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering OpenLetterOfCredit")

	if len(args) < 2 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected atleast two arguments for letter of credit creation")
	}

	var lcId = args[0]
	var lcInput = args[1]

	//storing the Lc IDs

	LCIDAsBytes, err := stub.GetState(LCID)
	if err != nil {
		return nil, errors.New("Failed to get Student IDs")
	}

	var LCIDs []string
	json.Unmarshal(LCIDAsBytes, &LCIDs)
	fmt.Println("LCIDs  ", LCIDs)

	//store and append the index to LCIDs

	LCIDs = append(LCIDs, args[0])
	fmt.Println("LCIDs array: ", LCIDs)

	LCIdArrayAsBytes, _ := json.Marshal(LCIDs)
	err = stub.PutState(LCID, LCIdArrayAsBytes)

	//END

	locObj := LetterOfCredit{}
	err = json.Unmarshal([]byte(lcInput), &locObj)
	fmt.Println("locObj object====>  ", locObj)

	s1, _ := json.Marshal(locObj)

	err = stub.PutState(lcId, []byte(s1))
	if err != nil {
		logger.Error("Could not save letter of credit to ledger", err)
		return nil, err
	}

	var customEvent = "{eventType: 'Letter of credit', description:" + lcId + "' Successfully created'}"
	err = stub.SetEvent("evtSender", []byte(customEvent))
	if err != nil {
		return nil, err
	}
	logger.Info("Successfully requested a Letter of credit")

	return nil, nil

}

func (t *SimpleChaincode) GetLcById(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering GetLcById")

	if len(args) < 1 {
		logger.Error("Invalid number of arguments")
		return nil, errors.New("Missing LC ID")
	}

	var lcId = args[0]
	bytes, err := stub.GetState(lcId)
	if err != nil {
		logger.Error("Could not fetch letter of credit with id "+lcId+" from ledger", err)
		return nil, err
	}
	return bytes, nil
}

func (t *SimpleChaincode) GetAllLC(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering GetAllLC")

	var jsonRespAll string
	var data []byte
	var IDs []string
	var LcArrayAsBytes []byte

	IDAsBytes, err := stub.GetState(LCID)
	if err != nil {
		//return fail, errors.New("Failed to get math index")
	}
	json.Unmarshal(IDAsBytes, &IDs)
	fmt.Println("IDAsBytes :", IDs)

	for i := range IDs {
		fmt.Println("IDs :", IDs[i])
		var ID = IDs[i]
		LcArrayAsBytes, err = stub.GetState(ID)
		if err != nil {
			fmt.Println("error in fetching record")
			//return fail, errors.New("Failed to get ")
		}

		res := LetterOfCredit{}
		json.Unmarshal(LcArrayAsBytes, &res)
		//fmt.Println("res data:", res)
		s1, _ := json.Marshal(res)

		jsonRespAll = jsonRespAll + string(s1)
		fmt.Println("jsonRespAll   " + jsonRespAll)

		data = []byte(jsonRespAll)

	}
	return data, nil

}

func (t *SimpleChaincode) UpdateStatus(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering UpdateStatus")
	if len(args) < 2 {
		logger.Error("Invalid number of arguments")
		return nil, errors.New("Missing LC ID")
	}

	var lcid = args[0]
	var status = args[1]
	bytes, err := stub.GetState(lcid)
	if err != nil {
		logger.Error("Could not fetch letter of credit with id "+lcid+" from ledger", err)
		return nil, err
	}
	loc := LetterOfCredit{}
	json.Unmarshal(bytes, &loc)
	fmt.Println("loc data:", loc)
	loc.Status = status
	fmt.Println("loc data after status change:", loc)
	s2, _ := json.Marshal(loc)

	err = stub.PutState(lcid, s2)
	if err != nil {
		logger.Error("Could not save letter of credit to ledger", err)
		return nil, err
	}

	return nil, nil
}

func (t *SimpleChaincode) AmendLetterOfCredit(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering UpdateLetterOfCredit")

	if len(args) < 2 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected atleast two arguments for loan application update")
	}

	var lcId = args[0]
	var amendDetails = []byte(args[1])
	fmt.Println("amended data from UI====>  ", args[1])

	lcAmendBytes, err := stub.GetState(lcId)
	if err != nil {
		logger.Error("Could not fetch LC from ledger for amending", err)
		return nil, err
	}

	amendObj := AmendLetterOfCreditDetails{}

	err = json.Unmarshal(amendDetails, &amendObj)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")
	fmt.Println("amendDetails====>  ", amendDetails)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")
	fmt.Println("amended object====>  ", amendObj)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")
	amendLoc := LetterOfCredit{}
	err = json.Unmarshal(lcAmendBytes, &amendLoc)

	amendObjOld := AmendLetterOfCreditDetails{}
	amendObjOld.LcId = amendLoc.LcId
	amendObjOld.LcAmendReqId = amendLoc.LcRequestNumber
	amendObjOld.LCAmount_t1 = amendLoc.LCAmount_t1
	amendObjOld.AmendmentDetails = amendLoc.AmendmentDetails
	//amendObjOld.ModeOfShipment_t1 = amendLoc.ModeOfShipment_t1
	amendObjOld.LCExpiryDate_t1 = amendLoc.LCExpiryDate_t1	
	amendObjOld.LCExpiryPlace_t1 = amendLoc.LCExpiryPlace_t1	
	amendObjOld.LcNumberOfAmendments = amendLoc.LcNumberOfAmendments
	amendObjOld.Status = amendLoc.Status

	amendLoc.LCAmount_t1 = amendObj.LCAmount_t1
	//amendLoc.ModeOfShipment_t1 = amendObj.ModeOfShipment_t1
	amendLoc.LCExpiryDate_t1 = amendObj.LCExpiryDate_t1
	amendLoc.LCExpiryPlace_t1 = amendObj.LCExpiryPlace_t1
	amendLoc.LcId = amendObj.LcId
	amendLoc.LcRequestNumber = amendObj.LcAmendReqId
	amendLoc.AmendmentDetails = amendObj.AmendmentDetails
	

	fmt.Println("amended details main, array ====>  ", amendLoc.LCAmount_t1, amendObjOld.LCAmount_t1)
	//  if(amendObj.LcId != ""){
	amendLoc.AmendArray = append(amendLoc.AmendArray, amendObjOld)
	amendLoc.LcNumberOfAmendments = amendLoc.LcNumberOfAmendments+1
	//   }

	amendLoc.Status = "AMENDED"

	fmt.Println("amended details====>  ", amendLoc.LCAmount_t1)

	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")
	fmt.Println("after forming state to store amendLoc====>  ", amendLoc)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")

	lABytes, err := json.Marshal(&amendLoc)
	if err != nil {
		logger.Error("Could not marshal loan application post update", err)
		return nil, err
	}

	err = stub.PutState(lcId, lABytes)
	if err != nil {
		logger.Error("Could not save loan application post update", err)
		return nil, err
	}

	/*var customEvent = "{eventType: 'loanApplicationUpdate', description:" + loanApplicationId + "' Successfully updated status'}"
	err = stub.SetEvent("evtSender", []byte(customEvent))
	if err != nil {
		return nil, err
	}*/

	//t.UpdateStatus(lcId, "AMENDED")
	//res := t.UpdateStatus(lcId, "AMENDED")

	logger.Info("Successfully amended lc application")
	return nil, nil

}

func (t *SimpleChaincode) VerifyBill(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Updating lc status from Beneficiary Bank end")
	if len(args) < 1 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected atleast two arguments for document upload")
	}
	var lcId = args[0]

	fmt.Printf("verify bill arguements=============>>>>", args[0])
	lcIdAsBytes, err := stub.GetState(lcId)
	logger.Debug("bill IN UPLOAD DOC ***********")
	lcRec := LetterOfCredit{}
	json.Unmarshal(lcIdAsBytes, &lcRec)
	logger.Debug("lcRec  ", lcRec)
	lcRec.Status = "DOCUMENT VERIFIED"
	LCIdArrayAsBytes, _ := json.Marshal(lcRec)
	err = stub.PutState(lcId, LCIdArrayAsBytes)
	if err != nil {
		logger.Error("Could not save status to ledger", err)
		return nil, err
	}
	return nil, nil
}

func (t *SimpleChaincode) LodgeBill(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {

	logger.Debug("Entering LodgeBill")
	if len(args) < 2 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected atleast two arguments for bills creation")
	}
	var lcId = args[0]
	var bill = args[1]

	fmt.Printf("arguements in chaincode==============>>>>", args[0], args[1])

	logger.Debug("bill==========>  ", bill)
	lcIdAsBytes, err := stub.GetState(lcId)
	if err != nil {
		return nil, errors.New("Failed to get LC with the given ID")
	}

	lcRec := LetterOfCredit{}
	json.Unmarshal(lcIdAsBytes, &lcRec)
	logger.Debug("lcRec  ", lcRec)

	latestBill := Bills{}
	err = json.Unmarshal([]byte(bill), &latestBill)
	if err != nil {
	logger.Debug("ERROR IN LODGE BILL IS  ",err)
	}
	logger.Debug("Latest Bill at line 742...", latestBill)

	logger.Debug("Before bills-outstanding logic")
	lcAmount,err := strconv.Atoi(lcRec.LCAmount_t1)
	if latestBill.BillAmount <= lcAmount {
		fmt.Printf("Entered bills-outstanding logic.....")

		if len(lcRec.Bill) == 0 {
			logger.Debug("My first bill...", lcRec.Bill)
			latestBill.LcOutstandingAmt = lcAmount - latestBill.BillAmount
			lcRec.Bill = append(lcRec.Bill, latestBill)
			logger.Debug("Latest Bill...", latestBill)
			logger.Debug("Lc record and amount", lcAmount, latestBill.BillAmount)
		} else if latestBill.BillAmount <= lcRec.Bill[len(lcRec.Bill)-1].LcOutstandingAmt {
			latestBill.LcOutstandingAmt = lcRec.Bill[len(lcRec.Bill)-1].LcOutstandingAmt - latestBill.BillAmount
			lcRec.Bill = append(lcRec.Bill, latestBill)
		}

		if latestBill.LcOutstandingAmt == 0 {
			logger.Debug("Entering LodgeBill - Cleared bill")
			lcRec.Status = "BILL LODGED"
		} else {
			logger.Debug("Entering LodgeBill - bill NOT Cleared")
			lcRec.Status = "BILL PARTIALLY LODGED"
		}
		LCIdArrayAsBytes, _ := json.Marshal(lcRec)
		err = stub.PutState(lcId, LCIdArrayAsBytes)
		if err != nil {
			logger.Error("Could not save bills to ledger", err)
			return nil, err
		}
	}
	return nil, nil
}

func (t *SimpleChaincode) Validation(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering Validation")
	var err error
	
	var errormessages string
	
	if len(args) < 1 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected one argument for letter of credit creation")
	}

	//var lcId = args[0]
	var lcInput = args[0]

	locObj := LetterOfCredit{}
	err = json.Unmarshal([]byte(lcInput), &locObj)
	fmt.Println("locObj object in validation====>  ", locObj)
	
	fmt.Println("locObj.LcIssueDate object in validation====>  ", locObj.LCIssueDate_t1 )
	
	//Expiry Date validation start
	issueDate, err := time.Parse("01/02/2006",locObj.LCIssueDate_t1 )
	//issueDateInc := issueDate.AddDate(1,0,0)
	//fmt.Println("issueDateInc",issueDateInc)
	
	expiryDate, err := time.Parse("01/02/2006",locObj.LCExpiryDate_t1 )
	fmt.Println("expiryDate  ",expiryDate)
	// if expiryDate.Before(issueDateInc) && expiryDate.After(issueDate){
	if expiryDate.After(issueDate){
        locObj.LCExpiryDate_t1 = locObj.LCExpiryDate_t1
    } else {	
	
	msg := errorMessages{FieldName:"LCExpiryDate_t1",ErrMsg:"LC Expiry date should be greater than issue date"}
	msgbytes, _ := json.Marshal(msg)
	errormessages = errormessages + string(msgbytes)//append(errormessages,msg1)	
	//return []byte(errormessages),nil
    }
	//end
	// validation on shipment date
	shipmentDate,err := time.Parse("01/02/2006",locObj.ShipmentDate_t1 )
	//expDatedec := expiryDate.AddDate(0,0,-21)
	//fmt.Println("expDatedec",expDatedec)
	if shipmentDate.Before(expiryDate) || shipmentDate.Equal(expiryDate){
	locObj.ShipmentDate_t1 = locObj.ShipmentDate_t1
	}else{
	msg1 := errorMessages{FieldName:"ShipmentDate_t1",ErrMsg:"Latest shipment Date should be less than or equal to the LC Expiry date"}	
	msgbytes1, _ := json.Marshal(msg1)
	errormessages = errormessages + string(msgbytes1)
	}
	
	commissionFreqDate,err := time.Parse("01/02/2006",locObj.CommissionFrequency_t4 )
	//expDatedec := expiryDate.AddDate(0,0,-21)
	fmt.Println("commissionFreqDate",commissionFreqDate)
	if locObj.CommissionFrequency_t4 != "" {
	fmt.Println("locObj.CommissionFrequency_t4 !",locObj.CommissionFrequency_t4 )
	//strings.Contains("seafood", "foo")
	if strings.Contains(locObj.CommissionFrequency_t4,"M"){
		if strings.Contains(locObj.CommissionFrequency_t4,"TWMTH"){
			msg1 := errorMessages{FieldName:"CommissionFrequency_t4",ErrMsg:"Commission Frequency should be Monthly"}	
			msgbytes1, _ := json.Marshal(msg1)
			errormessages = errormessages + string(msgbytes1)
		}else{
			locObj.CommissionFrequency_t4 = locObj.CommissionFrequency_t4
		}
	}else{
	msg1 := errorMessages{FieldName:"CommissionFrequency_t4",ErrMsg:"Commission Frequency should be Monthly"}	
	msgbytes1, _ := json.Marshal(msg1)
	errormessages = errormessages + string(msgbytes1)
	}
	}
	
	//end	
	

	var customEvent = "{eventType: 'Letter of credit', description:" + locObj.LcId + "' Successfully created'}"
	err = stub.SetEvent("evtSender", []byte(customEvent))
	if err != nil {
		return nil, err
	}
	logger.Info("Successfully requested a Letter of credit")
	
if errormessages != ""{
	return []byte(errormessages),nil
	}else {
	s1, _ := json.Marshal(locObj)
	return []byte(s1), nil

	}

}
func (t *SimpleChaincode) BGValidation(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering BG Validation")
	var err error
	
	var errormessages string
	
	if len(args) < 1 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected one argument for letter of credit creation")
	}

	//var lcId = args[0]
	var bgInput = args[0]

	bgObj := BankGuarantee{}
	err = json.Unmarshal([]byte(bgInput), &bgObj)
	fmt.Println("bgObj object in validation====>  ", bgObj)
	
	fmt.Println("bgObj.StartDate_t1 object in validation====>  ", bgObj.StartDate_t1 )
	
	//Expiry Date validation start
	startDate, err := time.Parse("01/02/2006",bgObj.StartDate_t1 )
	//dealDateInc := dealDate.AddDate(1,0,0)
	//fmt.Println("dealDateInc",dealDateInc)
	
	expiryDate, err := time.Parse("01/02/2006",bgObj.ExpiryDate_t1 )
	fmt.Println("expiryDate  ",expiryDate)
	 if expiryDate.After(startDate){
        bgObj.ExpiryDate_t1 = bgObj.ExpiryDate_t1
    } else {	
	
	msg := errorMessages{FieldName:"ExpiryDate_t1",ErrMsg:"BG Expiry date should be greater than start date"}
	msgbytes, _ := json.Marshal(msg)
	errormessages = errormessages + string(msgbytes)//append(errormessages,msg1)	
	//return []byte(errormessages),nil
    }
	//end
	// validation on maturity date
	maturityDate,err := time.Parse("01/02/2006",bgObj.MaturityDate_t1 )	
	if maturityDate.After(startDate){
	bgObj.MaturityDate_t1 = bgObj.MaturityDate_t1
	}else{
	msg := errorMessages{FieldName:"MaturityDate_t1",ErrMsg:"Maturity date should be greater than start date"}
	msgbytes, _ := json.Marshal(msg)
	errormessages = errormessages + string(msgbytes)//append(errormessages,msg1)	
	//bgObj.MaturityDate_t1 = bgObj.ExpiryDate_t1
	}
	//end	

	//strt	
	
	
	if bgObj.CommFrequency_t3 != "" {
	
	commissionFreqDate, err := time.Parse("01/02/2006",bgObj.CommFrequency_t3 )
	fmt.Println("commissionFreqDate  ",commissionFreqDate)
	if err != nil {
		return nil, err
	}
	 if commissionFreqDate.After(startDate){
        bgObj.CommFrequency_t3 = bgObj.CommFrequency_t3
    } else {	
	
	msg := errorMessages{FieldName:"CommFrequency_t3",ErrMsg:"BG CommissionFrequency date should be greater than start date"}
	msgbytes, _ := json.Marshal(msg)
	errormessages = errormessages + string(msgbytes)//append(errormessages,msg1)	
	//return []byte(errormessages),nil
    } 
	}
	//end

	var customEvent = "{eventType: 'Letter of credit', description:" + bgObj.BgNumber_t1 + "' Successfully created'}"
	err = stub.SetEvent("evtSender", []byte(customEvent))
	if err != nil {
		return nil, err
	}
	logger.Info("Successfully requested a Letter of credit")
	
if errormessages != ""{
	return []byte(errormessages),nil
	}else {
	s1, _ := json.Marshal(bgObj)
	return []byte(s1), nil

	}

}


func (t *SimpleChaincode) UpdateTransactionId(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering UpdateTransactionId")
	if len(args) < 2 {
		logger.Error("Invalid number of arguments")
		return nil, errors.New("Missing LC ID")
	}

	var lcid = args[0]
	var TransId = args[1]
	bytes, err := stub.GetState(lcid)
	if err != nil {
		logger.Error("Could not fetch letter of credit with id "+lcid+" from ledger", err)
		return nil, err
	}
	loc := LetterOfCredit{}
	json.Unmarshal(bytes, &loc)
	fmt.Println("loc data:", loc)
	loc.TransactionId = TransId
	fmt.Println("loc data after TransId change:", loc)
	s2, _ := json.Marshal(loc)

	err = stub.PutState(lcid, s2)
	if err != nil {
		logger.Error("Could not save letter of credit to ledger", err)
		return nil, err
	}

	return nil, nil
}

func (t *SimpleChaincode) UpdateBgTransactionId(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering UpdateBgTransactionId")
	if len(args) < 2 {
		logger.Error("Invalid number of arguments")
		return nil, errors.New("Missing LC ID")
	}

	var bgid = args[0]
	var TransId = args[1]
	bytes, err := stub.GetState(bgid)
	if err != nil {
		logger.Error("Could not fetch letter of credit with id "+bgid+" from ledger", err)
		return nil, err
	}
	bog := BankGuarantee{}
	json.Unmarshal(bytes, &bog)
	fmt.Println("bog data:", bog)
	bog.TransactionId = TransId
	fmt.Println("bog data after TransId change:", bog)
	s2, _ := json.Marshal(bog)

	err = stub.PutState(bgid, s2)
	if err != nil {
		logger.Error("Could not save letter of credit to ledger", err)
		return nil, err
	}

	return nil, nil
}


  func (t *SimpleChaincode) storeImageDetial(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering storeImageDetial")

	if len(args) < 2 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected atleast two arguments for loan application update")
	}

	var lcId = args[0]
	fmt.Println("amended data from UI====>  ",args[1])

	
    storeImageDetialValue := storeImage{}
	json.Unmarshal([]byte(args[1]), &storeImageDetialValue) 
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")

	fmt.Println("amended object====>  ",storeImageDetialValue)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")

	ImageAsBytes, err := json.Marshal(&storeImageDetialValue)
	if err != nil {
		logger.Error("Could not marshal loan application post update", err)
		return nil, err
	}

	err = stub.PutState(lcId, ImageAsBytes)
	if err != nil {
		logger.Error("Could not save ImageAsBytes", err)
		return nil, err
	}

	logger.Info("Successfully saved Image")
	return nil, nil
}

func (t *SimpleChaincode) GetImageDetialById(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering GetImageDetialById")

	if len(args) < 1 {
		logger.Error("Invalid number of arguments")
		return nil, errors.New("Missing Image ID")
	}

	var imgID = args[0]
	bytes, err := stub.GetState(imgID)
	if err != nil {
		logger.Error("Could not fetch letter of credit with id "+imgID+" from ledger", err)
		return nil, err
	}
	return bytes, nil
}

func (t *SimpleChaincode) OpenBankGuarantee(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering Bank Guarantee")

	if len(args) < 2 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected atleast two arguments for letter of credit creation")
	}

	var bgId = args[0]
	var bgInput = args[1]
	logger.Info("bog Arguements ~~~~~~~~~~~>>>>>",args[1])
	logger.Info("arguements in chaincode=================>>>", bgId, bgInput)

	//storing the Lc IDs

	BGIDAsBytes, err := stub.GetState(BGID)
	if err != nil {
		return nil, errors.New("Failed to get BG IDs")
	}

	var BGIDs []string
	json.Unmarshal(BGIDAsBytes, &BGIDs)
	fmt.Println("BGIDs  ", BGIDs)

	//store and append the index to BGIDs

	BGIDs = append(BGIDs, args[0])
	fmt.Println("BGIDs array: ", BGIDs)

	BGIdArrayAsBytes, _ := json.Marshal(BGIDs)
	err = stub.PutState(BGID, BGIdArrayAsBytes)

	//END

	bogObj := BankGuarantee{}
	err = json.Unmarshal([]byte(bgInput), &bogObj)
	fmt.Println("bogObj object====>  ", bogObj)

	s1, _ := json.Marshal(bogObj)

	err = stub.PutState(bgId, []byte(s1))
	if err != nil {
		logger.Error("Could not save bank guarantee to ledger", err)
		return nil, err
	}

	var customEvent = "{eventType: 'Bank Guarantee', description:" + bgId + "' Successfully created'}"
	err = stub.SetEvent("evtSender", []byte(customEvent))
	if err != nil {
		return nil, err
	}
	logger.Info("Successfully requested a Bank Gauarantee")

	return nil, nil

}

func (t *SimpleChaincode) BGApprove(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering BG Approval Status")
	if len(args) < 2 {
		logger.Error("Invalid number of arguments")
		return nil, errors.New("Missing BG ID")
	}

	var bgId = args[0]
	var status = args[1]
	logger.Info("BG ID and status**************",bgId,"status",status,"args[0]",args[0],"args[1]",args[1])
	bytes, err := stub.GetState(bgId)
	if err != nil {
		logger.Error("Could not fetch BG Approve with id "+bgId+" from ledger", err)
		return nil, err
	}
	bog := BankGuarantee{}
	json.Unmarshal(bytes, &bog)
	fmt.Println("bog data:***************", bog)
	bog.Status = status
	fmt.Println("BOG data after status change:*************", bog)
	s2, _ := json.Marshal(bog)

	err = stub.PutState(bgId, s2)
	if err != nil {
		logger.Error("Could not save Bank Guarantee to ledger", err)
		return nil, err
	}

	return nil, nil
}

func (t *SimpleChaincode) AmendBankGuarantee(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering BankGuarantee Amend")

	if len(args) < 2 {
		logger.Error("Invalid number of args")
		return nil, errors.New("Expected atleast two arguments for bank guarantee")
	}

	var bgId = args[0]
	var bgAmendDetails = []byte(args[1])
	fmt.Println("amended data from UI====>  ", args[1])

	bgAmendBytes, err := stub.GetState(bgId)
	if err != nil {
		logger.Error("Could not fetch BG from ledger for amending", err)
		return nil, err
	}

	bgAmendObj := AmendBankGuaranteeDetails{}

	err = json.Unmarshal(bgAmendDetails, &bgAmendObj)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")
	fmt.Println("bgAmendDetails====>  ", bgAmendDetails)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")
	fmt.Println("amended object====>  ", bgAmendObj)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")
	amendBog := BankGuarantee{}
	err = json.Unmarshal(bgAmendBytes, &amendBog)

	bgAmendObjOld := AmendBankGuaranteeDetails{}
	bgAmendObjOld.BgNumber_t1 = amendBog.BgNumber_t1
	bgAmendObjOld.BgAmendReqId = amendBog.BgReqId
	bgAmendObjOld.Amount_t1 = amendBog.Amount_t1
	bgAmendObjOld.ExpiryDate_t1 = amendBog.ExpiryDate_t1
	bgAmendObjOld.TermsNconditions_1_t1 = amendBog.TermsNconditions_1_t1
	bgAmendObjOld.BgNumberOfAmendments = amendBog.BgNumberOfAmendments+1
	bgAmendObjOld.Status = amendBog.Status

	amendBog.Amount_t1 = bgAmendObj.Amount_t1
	amendBog.TermsNconditions_1_t1 = bgAmendObj.TermsNconditions_1_t1
	amendBog.ExpiryDate_t1 = bgAmendObj.ExpiryDate_t1
	amendBog.BgNumber_t1 = bgAmendObj.BgNumber_t1
	amendBog.BgReqId = bgAmendObj.BgAmendReqId

	fmt.Println("amended details main, array ====>  ", amendBog.Amount_t1, bgAmendObjOld.Amount_t1)
	amendBog.BgAmendArray = append(amendBog.BgAmendArray, bgAmendObjOld)
	amendBog.BgNumberOfAmendments = len(amendBog.BgAmendArray)

	amendBog.Status = "AMENDED"

	fmt.Println("amended details====>  ", amendBog.Amount_t1)

	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")
	fmt.Println("after forming state to store amendBog====>  ", amendBog)
	fmt.Println("====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ====>  ")

	bABytes, err := json.Marshal(&amendBog)
	if err != nil {
		logger.Error("Could not marshal bg post update", err)
		return nil, err
	}

	err = stub.PutState(bgId, bABytes)
	if err != nil {
		logger.Error("Could not save bg details post update", err)
		return nil, err
	}

	logger.Info("Successfully amended bg application")
	return nil, nil
}

func (t *SimpleChaincode) GetCustomerBasedBgRecords(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering GetCustomerBasedBgRecords")

	var bgjsonRespAll string
	var bgdata []byte
	var BGIDs []string
	var BgArrayAsBytes []byte
	var customerName = args[0]

	BGIDAsBytes, err := stub.GetState(BGID)
	if err != nil {
		//return fail, errors.New("Failed to get math index")
	}
	json.Unmarshal(BGIDAsBytes, &BGIDs)
	fmt.Println("BGIDAsBytes :", BGIDs)

	for i := range BGIDs {
		fmt.Println("BGIDs :", BGIDs[i])
		var ID = BGIDs[i]
		BgArrayAsBytes, err = stub.GetState(ID)
		if err != nil {
			fmt.Println("error in fetching record")
			//return fail, errors.New("Failed to get ")
		}

		res := BankGuarantee{}
		json.Unmarshal(BgArrayAsBytes, &res)
		fmt.Println("customerName   " + customerName)
		fmt.Println("res   ", res)
		if (res.IssuedOnBehalfOf_t1 == customerName) || (res.BeneficiaryId_t1 == customerName) {
			//fmt.Println("res data:", res)
			s1, _ := json.Marshal(res)

			bgjsonRespAll = bgjsonRespAll + string(s1)
			fmt.Println("bgjsonRespAll   " + bgjsonRespAll)

			bgdata = []byte(bgjsonRespAll)
		}
	}
	fmt.Println("outside for loop data   ", bgdata)
	logger.Debug("Exiting GetCustomerBasedBgRecords")
	return bgdata, nil

}

func (t *SimpleChaincode) GetBgById(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering GetBgById")

	if len(args) < 1 {
		logger.Error("Invalid number of arguments")
		return nil, errors.New("Missing BG ID")
	}

	var bgId = args[0]
	bytes, err := stub.GetState(bgId)
	if err != nil {
		logger.Error("Could not fetch letter of credit with id "+bgId+" from ledger", err)
		return nil, err
	}
	return bytes, nil
}

func (t *SimpleChaincode) GetAllBG(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	logger.Debug("Entering GetAllBG")

	var bgjsonRespAll string
	var bgdata []byte
	var bgIDs []string
	var BgArrayAsBytes []byte

	BGIDAsBytes, err := stub.GetState(BGID)
	if err != nil {
		//return fail, errors.New("Failed to get math index")
	}
	json.Unmarshal(BGIDAsBytes, &bgIDs)
	fmt.Println("BGIDAsBytes :", bgIDs)

	for i := range bgIDs {
		fmt.Println("bgIDs :", bgIDs[i])
		var ID = bgIDs[i]
		BgArrayAsBytes, err = stub.GetState(ID)
		if err != nil {
			fmt.Println("error in fetching record")
			//return fail, errors.New("Failed to get ")
		}

		res := BankGuarantee{}
		json.Unmarshal(BgArrayAsBytes, &res)
		//fmt.Println("res data:", res)
		s1, _ := json.Marshal(res)

		bgjsonRespAll = bgjsonRespAll + string(s1)
		fmt.Println("bgjsonRespAll   " + bgjsonRespAll)

		bgdata = []byte(bgjsonRespAll)

	}
	return bgdata, nil

}

func main() {
	err := shim.Start(new(SimpleChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}
