import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthService {


    constructor(private http: HttpClient) {

    }

    // getProducts(): Observable<any> {
    //     // return products;
    //     return this.http.get('/api/v1/products');
    // }

    // findById(productId: string): Observable<any> {
    //     // return products[productId];
    //     return this.http.get('/api/v1/products/' + productId);
    // }

}