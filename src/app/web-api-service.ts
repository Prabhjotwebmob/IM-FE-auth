import { Injectable } from '@angular/core';
import { HttpService } from '../../../libs/services/http-service';

@Injectable({
    providedIn: "root"
})
export class WebApiService {

    constructor(private _http: HttpService) { }

    urlPassedApi(url, data) {
        return this._http.post(url, data).toPromise();
    }

    captchaVerify(data) {
        return this._http.post('/api/auth/captcha', data).toPromise();
    }

    forgetPassword(data) {
        return this._http.post(`/api/auth/forgetPassword`, data).toPromise();
    }

    login(data) {
        return this._http.post(`/api/auth/login`, data).toPromise();
    }

    authenticate2fa(data) {
        return this._http.post('/api/auth/2fa', data).toPromise();
    }

    getLoginDetails(data) {
        return this._http.post('/api/moneyMatch/users/2faApplication', data).toPromise();
    }

    getUsersForClientLevelControl(data) {
        return this._http.post('/api/admin/clientLevelControl', data).toPromise();
    }

    getCompaniesForCompanyLevelControl(data) {
        return this._http.post('/api/admin/companyLevelControl', data).toPromise();
    }

    getCompanyDetail(data) {
        return this._http.post('/api/admin/getCompanyDetails', data).toPromise();
    }

    getAuthorsList(params = {}) {
        return this._http.get('/api/admin/get-authors', params).toPromise();
    }

    logoutClient(payload = {}) {
        return this._http.post('/api/auth/logoutClient', payload).toPromise();
    }

    safeMode(data) {
        return this._http.post('/api/auth/safe-mode', data).toPromise();
    }

    changePassword(data) {
        return this._http.post('/api/auth/changePassword', data).toPromise();
    }
}
