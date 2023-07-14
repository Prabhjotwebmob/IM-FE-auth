
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from '../../../../../libs/services/toaster.service';
import { RolesAndPermissionsService } from '../../../../../libs/services/roles-and-permissions.service';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { loginSuccess } from '../../../../../libs/store/actions/auth.actions';
import { WebApiService } from 'src/app/web-api-service';
declare let Futurae: any;
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  toasterMessage = {
    unauthorisedAccess: "Unauthorized access. Please login again.",
    enableCurrency: "Please enable a currency.",
    uploadOnlyXlsxFile: "Please upload only .xls and .xlsx files.",
    validRatesUpdated: "Valid rates updated successfully.",
    enterRequiredData: "Please enter the required and valid data.",
    amountGreaterThanZero: "Amount should be greater than 0.",
    updatingYourRates: "We are updating your rates.",
    blankFile: "Blank file not acceptable.",
    enterAmount: "Please enter the amount.",
    enterMarketIndicativeRate: "Please enter the market indicative rate.",
    enterValidAmount: "Please enter a valid amount.",
    enterValidMinAmount: "Please enter a valid minimum amount.",
    enterReference: "Please enter the reference.",
    rateShouldBeLessThan: "The rate should be less than 100 and greater than -100 and upto 3 decimal points.",
    enterRate: "Please enter the rate.",
    maximumLengthAmount: "Maximum amount length 999999999999.999.",
    selectValueDate: "Please select a Value Date.",
    selectMaturitydate: "Please select a Maturity Date.",
    valueDateGreaterThanEqualToday: "Value date must be greater than or equal to today.",
    valueDateGreaterThanEqualPreviousMaturity: "Value date must be greater than or equal to previous maturity date.",
    maturityDateGreaterThanEqualPreviousMaturity: "Maturity date must be greater than or equal to previous maturity date.",
    maturityGreaterThenValueDate: "Maturity date must be greater than Value date.",
    valueDateCannotGreaterThanMaturity: "Value date cannot be greater than Maturity date.",
    valueAndMaturitydateDifferent: "Value date and Maturity date should be different.",
    enterValidRate: "Please enter a valid rate.",
    counterAndinitialRateDifferent: "Counter rate and Initiate rate should be different.",
    cannotGreaterThanOriginalAmount: "Your input amount can't be greater than original amount.",
    selectAgreement: "Please select the agreement.",
    selectTerm: "Please select a term.",
    selectEntity: "Please select an entity.",
    cantSendRequestToMoreThanTen: "You can't send request to more than ten counter parties.",
    selectRequestTimeout: "Please select the request timeout.",
    selectRequestType: "Please select the request type.",
    selectBidOffer: "Please select Bid/Offer.",
    invalidRate: "Invalid rate.",
    amountCannotExceed: "Amount cannot exceed 10 lacs.",
    selectQuote: "Please select a Quote.",
    noRecordFound: "No record found.",
    enterValidValue: "Please enter a valid value.",
    enterNews: "Please Enter News.",
    enterValidDate: "Please enter the valid date.",
    enterHolidayName: "Please enter the holiday name.",
    selectHolidayDate: "Please select the holiday date.",
    holidayCannotUpdatedWithPreviousDate: "Holiday cannot be added/updated on/with the previous date.",
    successfullyRead: "Successfully read !!",
    logoutSuccessfully: "Logout Successfully.",
    enterValidDataExcept: "Please enter valid data except for the % sign.",
    enterValidEmail: "Please enter a valid email.",
    safeModeActivated: "Safe mode activated.",
    safeModeDeactivated: "Safe mode deactivated.",
    settingAvailableInMmTab: "This setting only available in the money match tab.",
    cannotMakeItLive: "Sorry, due to holiday on this term you can't make it live.",
    primaryAndSecondaryEmailsShouldDiff: "Primary and secondary emails should be different.",
    enterValidPassword: "Please enter a valid password.",
    passwordHasBeenChangedLoginAgain: "Your password has been changed successfully. Your session has ended for security validation. Please log in again using your new password.",
    selectCorrectFileFormat: "Please select correct file format.",
    // fileUploadSizeError: `File size should not be greater than ${commonUploadFileSize.MB} MB.`,
    fileUploaded: "File uploaded successfully.",
    enterValidMessage: "Please enter a valid message.",
    somethingWentWrongTryAgain: "Something went wrong, please try again.",
    settingsUpdatedSuccessfully: "Settings updated successfully.",
    tradeRemovedSuccessfully: "Trade removed successfully.",
    enterDifferentRateForCounter: "Please enter different rate for counter.",
    notificationSoundChanged: "Notification sound has been changed successfully.",
    notificationPopupAlertSettingChanged: "Notification popup alert settings updated successfully.",
    selectOption: "Please select the option.",
    allFieldsMandatory: "All fields are mandatory.",
    enterValidData: "Please enter the valid data.",
    expectedProfitNotValid: "Expt. profit not valid. Valid format is '99,999,999,999.99'.",
    makeAppropriateSettings: "Please make appropriate settings.",
    selectAtLeastOneCurrency: "Please select at least one currency to be enabled.",
    activeCurrencyListCannotBeEmpty: "The active currency list cannot be empty.",
    errorWhileUpdatingSortedCurrency: "Error while updating sorted currencies.",
    enterValidCreditAmount: "Please enter a valid credit amount.",
    somethingWentWrong: "Something went wrong.",
    cannotTakeThisAction: "You cannot take this action.",
    requestStatusChanged: "The status of this request is changed.",
    selectOptionForReject: "Please select an option for reject.",
    enterRejectReason: "Please enter the reject reason.",
    counterpartyDoesNotPermitFreeText: "This counterparty does not permit free text messaging.",
    enterFeedback: "Please enter the feedback.",
    feedbackMaximumCharacter: "Feedback can have maximum 100 characters.",
    contactMeUrgently: "Contact me urgently, there has been an error on this trade.",
    inputAmountCannotBeGreaterthanFirstCounterAmount: "Your input amount can not be greater than first counter amount.",
    inputAmountCannotBeGreaterthanOriginalAmount: "Your input amount can not be greater than original amount.",
    inputAmountCannotBeEqualToOriginalAmount: "Your input amount can not be equal to original amount.",
    selectRollPrincipalOnlyOrPlusProfit: "Please select Roll Principal Only or Roll Principal + Profit.",
    selectRollPrincipalOnlyOrPlusInterest: "Please select Roll Principal Only or Roll Principal + Interest.",
    enterNotional: "Please enter the notional.",
    enterValidNotional: "Please enter a valid notional.",
    selectOneOptionFromNotional: "Please select one option from notional.",
    enterDifferebtAmountForCounter: "Please enter different amount for counter.",
    rejectSuccessfully: "Rejected successfully.",
    noTradeToExport: "No trades to export.",
    enterCancellationReason: "Please enter your cancellation reason.",
    updateMessageError: "Error while updating message.",
    amountShouldBeLessThenInitialAmount: "Counter Amount should not be greater than Initial Amount.",
    termsConditionsAccepted: "Terms and Conditions accepted successfully.",
    termsConditionsRejected: "Terms and Conditions rejected successfully.",
    commodityNotSelected: "A commodity selection is required to proceed.",
    invalidFileDownloadTemplate: "Invalid file! Please download the template file and try again to upload prices with correct format.",
    currencyBoxClosed: 'Autofill Currency box closed.',
    requestAlreadyCounteredByOtherUser: 'This request has already been countered by another user.',
    submittedSuccessfully: 'Submitted successfully.',
    passwordErrorStartsWithDollar: 'Password can not start with $.',
    safeModeError: 'Error while updating safe mode settings.',
    fetchingTermsError: 'Error while fetching terms for selected currency.',
    unsubscribeError: 'Error while unsubscribing mail.',
    requiredInfoMissing: 'Required information is missing.',
    urlError: 'Please enter the valid link.',
    viewOnlyUser: 'You are not authorized to upload data.',
    addCategoryError: 'Please add the category first.',
    invalidDescription: 'Please enter the valid description.',
    catergoryError: 'This name of tab is already existed in the thought exchange. Please try another category.',
    confirmRecommendedSettings: 'Please confirm if you want to go with recommended settings.',
    actionAlreadyTaken: 'Action has already been taken on this by you or someone else from your company.',
    pushNotificationError: 'You will not get any push notifications with your current browser settings, please update them if you want push notifications.',
    errorWhileUpdatingToken: 'Error while updating firebase token.',
    fileExtensionError: 'Please upload the file with extension .pdf, .xls, .xlsx.',
    investAmount: 'Invest amount is required.',
    timeoutError: 'Timeout is required.',
    redemptionMessage: 'Remaining amount is less than the minimum amount.',
    minAmountRequired: 'Minimum amount is required.',
    noticePeriodRequired: 'Notice period is required.',
    investmentAmountRequired: 'Investment amount is required.',
    investAmountGreaterThanZero: 'Investment amount should be greater than zero',
    investAmountGreaterThanOrEqualMinAmount: 'Investment amount should be equal or greater than minimum invested amount.',
    fileDeleted: 'File deleted successfully.',
    zeroNoticePeriodNotAllowed: "Notice period can not be zero.",
    pricesDidnotUpload: "Sorry, you can't upload prices in disabled currencies, please enable them first.",
    dealOnlyInGBP: 'This counter party can deal only in GBP currency. To deal with this counter party you must enable GBP currency.',
    pleaseSelectValidSsi: 'Please select valid SSI.',
    fillDescriptionOrUploadFile: 'Please fill the description or upload the file.',
    fillAllTheDetails: 'Please fill all the details.',
    collateralDataFetched: 'Collateral data fetched successfully.',
    selectVideo: "Please select video.",
    titleRequired: "Please provide title of the video.",
    videoUploadSuccess: "Video uploaded Successfully.",
    videoAllowed: "Please select video.",
    negativeNoticePeriodNotAllowed: "Negative notice period is not allowed.",
    selectFilterName: "Please select the filter name.",
    addFilter: "Please add filter first and then save the filter.",
    redeemShouldBeGreaterThanOne: "Redeem Amount should be greater than or equal to 1.",
    selectTenor: "Please select tenor.",
    reviewMutualSettings: "Please review mutual settings.",
    validValueToFetch: "Please enter valid value to fetch.",
    selectPurchaseDate: "Please select a purchased date.",
    enterEvergreenDays: "Please enter evergreen days.",
    selectCurrency: "Please select a currency.",
    selectRepurchasedDate: "Please select a repurchased date.",
    enterValidTripletOfDays: "Please enter valid triplet of days.",
    enterValidEnteriesForCollaterals: "Enter valid enteries for collaterals.",
    marketPriceShouldBeGreaterThanZero: "Market price should be greater than zero.",
    enteraRate: "Please enter a rate.",
    selectLeastOneGoodToTradeCounterParty: "Please select at least one good to trade counter party.",
    noCollateralFoundWithThisCurrency: "No collateral found with this currency.",
    frequencyOfResetShouldBeGreaterThanZero: "Frequency of reset should be greater than zero.",
    enterValidCallableType: "Please enter valid callable type.",
    enterTemplateName: "Please enter template name.",
    currencyMandatoryField: "Currency is a mandatory field.",
    enterDesiredCashAmountToDistribute: "Enter desired cash amount to distribute.",
    cashSettlementAmountCannotBeGreaterThanOriginalAmount: "Desired cash settlement amount cannot be greater than original amount.",
    enterRateForCounter: "Enter rate for counter.",
    initialAndCounterRateNotSame: "Initial rate and counter rate cannot be same.",
    initialAndCounterAmountCannotBeSame: "Initial amount and counter amount cannot be same.",
    counterAmountCannotBeGreaterThanOriginalAmount: "Counter amount cannot be greater than original amount.",
    newCounterAndLastCounterRateCannotBeSame: "New counter rate and last countered rate cannot be same.",
    noCollateralFound: "No collateral found.",
    notionalAmountCannotBeGreaterThanBalance: "Nominal amount cannot be greater than Collateral's balance.",
    nominalCannotBeGreaterThanAvailableNominal: "Nominal amount cannot be greater than available nominal amount.",
    settledAmountNotGreaterSettlementAmount: "Settled amount cannot be greater than Settlement Amount.",
    requestCreatedSuccessfully: "Request created successfully.",
    youCantProceed: "Sorry! You can't proceed",
    videoFileSizeShouldNotBeMoreThan: "File size should be less than 50 MB.",
    cmEquityReference: "CM Equity Reference is required.",
    minimumAmountLessThenOriginal: "Minimum investment amount should be less than or equal to the original amount",
    errorWhileUploadingFile: "Error while uploading file.",
    selectAtLeastOneCollateral: "Please select at least one collateral.",
    gridHiddenSuccessfully: "Grid hidden successfully.",
    currencyNotAvail: "Sorry, this currency is not available on the Eiger system.",
    bankOrClientNotSelcted: "Please select a bank and client.",
    currencyNotAvailForFqx: "Sorry, this currency is not available on the FQX system.",
    clientActionNotSelected: "Please select a client action.",
    selectUnit: "Please select Unit.",
    uploadFile: "Please upload the file.",
    fileAlreadyExist: "File already exist.",
    fileLimitUptoFive: "You can only upload up to five files.",
    selectCorrectFormatWithExtetion: "Please select correct file format(.pdf,.doc,.docx,.xlsx,.csv).",
    // fileUploadSizeLimitTenMBError: `Files size should not be greater than ${commonUploadFileSize.TENMB} MB.`,
    notPermitToDeleteFile: "You are not permitted to delete the file for this user",
    tokenNotfound: "Token not found.",
    youDontHavePermissionToAnyMarket: "You don't have permission to any market.",
    youDontHavePermissionToReadTPDetails: "You don't have permission to read the trading partner's details.",
    pleaseSelectTradingPartner: "Please select trading partner.",
    pleaseFillAllDetails: "Please fill filter name, and select excluded list and selected list.",
    pleaseCreateFilter: "Please create filter.",
    selectFilter: "Please select a filter.",
    transactionReferenceRequired: "Transaction reference is required for this client.",
    buildErrorPageReload: "There might some cache issue, Please reload your page.",
    pleaseAddNameForFilter: "Please add name for filter.",
    pleaseSelectListForFilter: "Please select excluded list and selected list."
  }
  token$: Observable<String>;
  platformConstant = {
    INSTIMATCH: 'Instimatch'
  };
  public mainService = {
    displaySvgCaptcha: false,
    refreshCaptcha: false,
    reCaptchaKey: "ST:RECAPTCHA_SIG:t9302zo9gzrswdkwxdnwk",
    captchaImg: false
  }
  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.login();
    }
  }
  @ViewChild('ErrorMessagePopUpButton', { static: true }) ErrorMessagePopUpButton: ElementRef;
  @ViewChild('userLogOutModalButton') userLogOutModalButton: ElementRef;
  waitingForResponse: boolean = false;
  signinForm: FormGroup;
  iframe_show = false;
  userName: string = '';
  currentYear: number;
  showPassword: boolean = false;
  captchaRecallId: any = null;
  firebaseToken: string = '';
  userAuthService = {
    platform: {
      host: 'Instimatch',
      supportLine: 'supportLine',
      shortName: '',
      supportEmail: ''
    },
    companyDetails: {
      showMMF: true
    },
    user: {
      isAdmin: 'Y',
      noticeAccountType: true,
      rightsOfMmCaptain: {
        isCaptain: true
      }
    }
  }

  constructor(
    private store: Store<{ auth: String }>,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private webApiService: WebApiService,
    private toastrService: ToastrService,
    private rolesAndPermissionsService: RolesAndPermissionsService,
    // private angularFireMessaging: AngularFireMessaging,
  ) {
    history.pushState(null, null, '/');
    window.onpopstate = function () { };
  }

  ngOnInit() {
    this.ngxSpinnerService.hide();
    this.rolesAndPermissionsService.setRolesAndPermissions({});
    $('.modal.show').modal('hide');
    $('.modal-backdrop').remove();
    this.currentYear = (new Date()).getFullYear();
    // this.userAuthService.clearSessionStorage();
    this.waitingForResponse = false;
    this.signinForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      captchaResult: [null, Validators.compose([Validators.required])],
    });
    if (sessionStorage.getItem('userName') != null) {
      this.userName = sessionStorage.getItem('userName');
    }
    this.getFirebaseToken();
    this.getCaptchaFromService();
  }

  ngOnDestroy() {
    this.mainService.refreshCaptcha = true;
    this.mainService.displaySvgCaptcha = false;
    this.captchaRecallId && clearTimeout(this.captchaRecallId);
  }

  focusOut(event, controlName) {
    event.target.value = event.target.value?.trim() || '';
    this.signinForm.get(controlName).setValue(event.target.value);
  }

  getFirebaseToken() {
    // this.angularFireMessaging.requestToken.subscribe((token) => {
    //   this.firebaseToken = token;
    // }, (err) => {
    //   console.error("check", err);
    // });
  }

  async login() {
    try {
      console.log("step1")
      if (this.waitingForResponse) return;
      if (this.mainService.displaySvgCaptcha) {
        this.signinForm.get('captchaResult').markAsTouched();
      }
      const form_data = this.signinForm.value;
      console.log("step1")
      if (!form_data.username || !form_data.password || (this.mainService.displaySvgCaptcha && !form_data.captchaResult)) {
        return this.toastrService.show(this.toasterMessage.allFieldsMandatory, 'Error');
      }
      this.waitingForResponse = true;
      this.ngxSpinnerService.show();
      console.log("step1")
      let payLoad = {
        username: form_data['username'],
        password: btoa(form_data['password'].trim()),
        location: 'application',
        captcha: ''
      };
      console.log("step1")
      if (this.mainService.displaySvgCaptcha) {
        payLoad['captcha'] = (form_data['captchaResult']).trim();
      } else {
        payLoad['captcha'] = this.mainService.reCaptchaKey;
      }
      payLoad = { "username": "parveen1", "password": "V3BhZG1pbjEyMyM=", "location": "application", "captcha": "ST:RECAPTCHA_SIG:8uwxltu69fx7wjmoymxr8a" }
      console.log('payLoad', payLoad)
      const response = await this.webApiService.login(payLoad);
      console.log('response', response)
      sessionStorage.setItem('show_ticker_tape', JSON.stringify(true));
      // this.userAuthService.setShowAccessCompanies(response['showAccessCompanies']);
      // this.userAuthService.setAccessCompanies(response['accessCompanies']);
      // this.userAuthService.setGroupName(response['groupName']);
      // this.userAuthService.setUserDetails(response['userDetails']);
      if (response['showAccessCompanies']) {
        sessionStorage.setItem('signature', response['signature']);
        sessionStorage.setItem('mfa_enabled', JSON.stringify(response['mfa_enabled']));
        this.ngxSpinnerService.hide();
        return this.router.navigate(['/select-entity'], {
          queryParams: {
            firebaseToken: this.firebaseToken
          }
        });
      } else {
        // this.userAuthService.setDefaultCompanyAccessId(response['defaultCompanyAccessId']);
      }
      if (response['signature']) {
        if (response["mfa_enabled"]) {
          this.ngxSpinnerService.hide();
          sessionStorage.setItem("futuraeIframe", "true");
          this.iframe_show = true;
          Futurae.init({
            host: 'api.futurae.com',
            sig_request: response['signature'],
            submit_callback: async (sig_form) => {
              let sig_res = $(sig_form).find("input").val();
              const payLoad = {
                sig_response: sig_res,
                mfa: true
              }
              this.authenticateUser(payLoad);
            }
          });
        } else {
          const payLoad = {
            sig_response: response['signature'],
            mfa: false
          }
          this.authenticateUser(payLoad);
        }
      } else {
        this.waitingForResponse = false;
        this.toastrService.show('Please try again.', 'Error');
        this.ngxSpinnerService.hide();
      }
    } catch (error) {
      console.log(error)
      this.router.navigateByUrl('/web/money-market/GBP')
      this.waitingForResponse = false;
      this.ngxSpinnerService.hide();
      if (this.mainService.displaySvgCaptcha) {
        this.signinForm.get('captchaResult').setValue(null);
        this.signinForm.get('captchaResult').markAsUntouched();
      }
      this.getCaptchaFromService();
      this.toastrService.show(error?.error?.message || error?.message || this.toasterMessage.somethingWentWrong, 'Error');
      if (error?.error?.status == 2) {
        this.ErrorMessagePopUpButton.nativeElement.click();
      }
    }
  }

  async authenticateUser({ sig_response, mfa }) {
    try {
      const response = await this.webApiService.authenticate2fa({ sig_response: sig_response, location: 'application', mfa: mfa });
      sessionStorage.removeItem('futuraeIframe');
      sessionStorage.setItem("mfaDone", "true");
      this.getLoginDetails(response);
    } catch (error) {
      this.waitingForResponse = false;
      this.ngxSpinnerService.hide();
      this.toastrService.show(error?.error?.message || error?.message || this.toasterMessage.somethingWentWrong, 'Error');
    }
  }

  async getLoginDetails(response) {
    try {
      const payload = {
        firebaseWebToken: this.firebaseToken
      }
      sessionStorage.setItem('user', JSON.stringify({ token: response['token'] }))
      const _response = await this.webApiService.getLoginDetails(payload);
      const rolesAndPermissions = {
        permissions: response?.permissions,
        productAccess: response?.productAccess,
        roles: response?.roles,
      }
      this.rolesAndPermissionsService.setRolesAndPermissions({ ...rolesAndPermissions });
      _response['token'] = response['token'];
      // this.userAuthService.setupSessionStorageData(_response);
    } catch (error) {
      this.waitingForResponse = false;
      this.ngxSpinnerService.hide();
      // this.userAuthService.clearSessionStorage();
      this.toastrService.show(error?.error?.message || error?.message || this.toasterMessage.somethingWentWrong, 'Error');
    }
  }

  async getCaptchaFromService() {
    console.log(this.mainService.displaySvgCaptcha)
    if (this.mainService.displaySvgCaptcha) {
      this.signinForm.get('captchaResult').setValue('');
    }
    // await this.mainService.getCaptcha();
    this.captchaRecallId = setTimeout(() => {
      console.log(this.router.url)
      if (this.router.url === '/') {
        this.mainService.refreshCaptcha = true;
        this.mainService.reCaptchaKey = null;
        this.getCaptchaFromService();
      } else {
        this.captchaRecallId && clearTimeout(this.captchaRecallId);
      }
    }, 540000);
  }


  setToken() {
    this.store.dispatch(loginSuccess({ token: "myToken", redirect: true }));
    // this.router.navigateByUrl('/web/money-market')
    this.login();
  }
}