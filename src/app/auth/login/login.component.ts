import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    test: Date = new Date();
    errors: any = [];
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() { }

    login(loginForm: NgForm) {
        console.log(loginForm.value);

        this.authService.login(loginForm.value).subscribe(
            (token) => {
                this.router.navigate(["/products"]);
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                this.errors = err.error.errors;
            }
        );
        console.log(loginForm.value);
    }
}
