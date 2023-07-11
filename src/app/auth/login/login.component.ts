
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
// import { AngularFireMessaging } from '@angular/fire';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { loginSuccess } from '../../../../../IM-FE-libs/store/actions/auth.actions';
declare let Futurae: any;
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  token$: Observable<String>;
  platformConstant = {
    INSTIMATCH: 'Instimatch'
  };
  public mainService = {
    displaySvgCaptcha: false,
    captchaImg: false
  }
  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // if (event.key === "Enter" && !this.waitingForResponse && !(!this.mainService.displaySvgCaptcha && !this.mainService.reCaptchaKey)) {
    //   this.login();
    // }
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
    // private toastrService: ToastrService,
    // private angularFireMessaging: AngularFireMessaging,
  ) {
    history.pushState(null, null, '/');
    window.onpopstate = function () { };
  }

  ngOnInit() {
    this.ngxSpinnerService.hide();
    // this.rolesAndPermissionsService.setRolesAndPermissions({});
    // $('.modal.show').modal('hide');
    // $('.modal-backdrop').remove();
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
    // this.mainService.refreshCaptcha = true;
    // this.mainService.displaySvgCaptcha = false;
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
      // if (this.waitingForResponse) return;
      // if (this.mainService.displaySvgCaptcha) {
      //   this.signinForm.get('captchaResult').markAsTouched();
      // }
      // const form_data = this.signinForm.value;
      // if (!form_data.username || !form_data.password || (this.mainService.displaySvgCaptcha && !form_data.captchaResult)) {
      //   return this.toastrService.error(toasterMessage.allFieldsMandatory, 'Error');
      // }
      // this.waitingForResponse = true;
      // this.ngxSpinnerService.show();
      // let payLoad = {
      //   username: form_data['username'],
      //   password: btoa(form_data['password'].trim()),
      //   location: 'application'
      // };
      // if (this.mainService.displaySvgCaptcha) {
      //   payLoad['captcha'] = (form_data['captchaResult']).trim();
      // } else {
      //   payLoad['captcha'] = this.mainService.reCaptchaKey;
      // }
      // const response = await this.webApiService.login(payLoad);
      // sessionStorage.setItem('show_ticker_tape', JSON.stringify(true));
      // this.userAuthService.setShowAccessCompanies(response['showAccessCompanies']);
      // this.userAuthService.setAccessCompanies(response['accessCompanies']);
      // this.userAuthService.setGroupName(response['groupName']);
      // this.userAuthService.setUserDetails(response['userDetails']);
      // if (response['showAccessCompanies']) {
      //   sessionStorage.setItem('signature', response['signature']);
      //   sessionStorage.setItem('mfa_enabled', JSON.stringify(response['mfa_enabled']));
      //   this.ngxSpinnerService.hide();
      //   return this.router.navigate(['/select-entity'], {
      //     queryParams: {
      //       firebaseToken: this.firebaseToken
      //     }
      //   });
      // } else {
      //   this.userAuthService.setDefaultCompanyAccessId(response['defaultCompanyAccessId']);
      // }
      // if (response['signature']) {
      //   if (response["mfa_enabled"]) {
      //     this.ngxSpinnerService.hide();
      //     sessionStorage.setItem("futuraeIframe", "true");
      //     this.iframe_show = true;
      //     Futurae.init({
      //       host: 'api.futurae.com',
      //       sig_request: response['signature'],
      //       submit_callback: async (sig_form) => {
      //         let sig_res = $(sig_form).find("input").val();
      //         const payLoad = {
      //           sig_response: sig_res,
      //           mfa: true
      //         }
      //         this.authenticateUser(payLoad);
      //       }
      //     });
      //   } else {
      //     const payLoad = {
      //       sig_response: response['signature'],
      //       mfa: false
      //     }
      //     this.authenticateUser(payLoad);
      //   }
      // } else {
      //   this.waitingForResponse = false;
      //   this.toastrService.error('Please try again.', 'Error');
      //   this.ngxSpinnerService.hide();
      // }
    } catch (error) {
      // this.waitingForResponse = false;
      // this.ngxSpinnerService.hide();
      // if (this.mainService.displaySvgCaptcha) {
      //   this.signinForm.get('captchaResult').setValue(null);
      //   this.signinForm.get('captchaResult').markAsUntouched();
      // }
      // this.getCaptchaFromService();
      // this.toastrService.error(error?.error?.message || error?.message || toasterMessage.somethingWentWrong, 'Error');
      // if (error?.error?.status == 2) {
      //   this.ErrorMessagePopUpButton.nativeElement.click();
      // }
    }
  }

  async authenticateUser({ sig_response, mfa }) {
    try {
      // const response = await this.webApiService.authenticate2fa({ sig_response: sig_response, location: 'application', mfa: mfa });
      // sessionStorage.removeItem('futuraeIframe');
      // sessionStorage.setItem("mfaDone", "true");
      // this.getLoginDetails(response);
    } catch (error) {
      this.waitingForResponse = false;
      this.ngxSpinnerService.hide();
      // this.toastrService.error(error?.error?.message || error?.message || toasterMessage.somethingWentWrong, 'Error');
    }
  }

  async getLoginDetails(response) {
    try {
      const payload = {
        firebaseWebToken: this.firebaseToken
      }
      sessionStorage.setItem('user', JSON.stringify({ token: response['token'] }))
      // const _response = await this.webApiService.getLoginDetails(payload);
      const rolesAndPermissions = {
        permissions: response?.permissions,
        productAccess: response?.productAccess,
        roles: response?.roles,
      }
      // this.rolesAndPermissionsService.setRolesAndPermissions({ ...rolesAndPermissions });
      // _response['token'] = response['token'];
      // this.userAuthService.setupSessionStorageData(_response);
    } catch (error) {
      this.waitingForResponse = false;
      this.ngxSpinnerService.hide();
      // this.userAuthService.clearSessionStorage();
      // this.toastrService.error(error?.error?.message || error?.message || toasterMessage.somethingWentWrong, 'Error');
    }
  }

  async getCaptchaFromService() {
    // if (this.mainService.displaySvgCaptcha) {
    //   this.signinForm.get('captchaResult').setValue('');
    // }
    // await this.mainService.getCaptcha();
    // this.captchaRecallId = setTimeout(() => {
    //   if (this.router.url === '/') {
    //     this.mainService.refreshCaptcha = true;
    //     this.mainService.reCaptchaKey = null;
    //     this.getCaptchaFromService();
    //   } else {
    //     this.captchaRecallId && clearTimeout(this.captchaRecallId);
    //   }
    // }, 540000);
  }


  setToken() {
    this.store.dispatch(loginSuccess({ token: "myToken", redirect: true }));
    this.router.navigateByUrl('/web/market')
  }
}