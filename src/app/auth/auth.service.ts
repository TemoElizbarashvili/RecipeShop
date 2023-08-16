import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.mode";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService { 
    user = new BehaviorSubject<User>(null);
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB05DSoFEAWizi_cbt2EsnbjzK6y-yTe9w', {
            email: email,
            password: password,
            returnSecureToken: true
        }
        )
        .pipe(catchError(this.handleError), tap( responseData => {
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));

    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB05DSoFEAWizi_cbt2EsnbjzK6y-yTe9w', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),  tap( responseData => {
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));
    }

    autoLogin() {
        const userData: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }
 
    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenTimer) {
            clearTimeout(this.tokenTimer);
        }
        this.tokenTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenTimer = setTimeout( () => {
            this.logout();
        } ,expirationDuration)
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!'
        if (!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
               errorMessage = 'This email already exsists!'
               break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists!'
                break;
            case 'IVALID_PASSWORD':
                errorMessage = 'Password is not correct!'
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId:string,  token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}