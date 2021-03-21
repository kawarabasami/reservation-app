import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from "moment";
import { Router } from "@angular/router";

const jwt = new JwtHelperService();

class DecodedToken {
    userId: string = '';
    username: string = '';
    exp: number = 0;
}

@Injectable()
export class AuthService {

    private decodedToken: any;
    constructor(private http: HttpClient, private router: Router) {
        // 
        const appMeta = localStorage.getItem('app-meta');
        if (appMeta != null) {
            this.decodedToken = JSON.parse(appMeta);
        } else {
            this.decodedToken = new DecodedToken();
        }
    }

    getToken() {
        return localStorage.getItem('app-auth');
    }

    isAuthenticated() {
        // トークンの有効期限を過ぎていない場合trueを返す
        // moment():日時を扱いやすくするためのライブラリ
        return moment().isBefore(moment.unix(this.decodedToken.exp));
    }


    register(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/register', userData);
    }

    login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/login', userData).pipe(map((token) => {
            // pipeを使い、login時のトークンを自動的にlocalStorage側で保持するようにする
            // (auth.serviceを利用するcomponent側でtokenを扱わなくて済むようにする)

            if (typeof (token) == 'string') {
                const decodedToken = jwt.decodeToken(token);
                localStorage.setItem('app-auth', token);
                localStorage.setItem('app-meta', JSON.stringify(decodedToken));
                this.decodedToken = decodedToken;
            }
            return token;
        }));
    }

    logout() {
        // トークン情報を削除する
        localStorage.removeItem('app-auth');
        localStorage.removeItem('app-meta');
        this.decodedToken = new DecodedToken();
        this.router.navigate(["/login"]);
    }
}