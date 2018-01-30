import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styles: []
})
export class LoginPageComponent implements OnInit {

    userForm: FormGroup;
    firebaseErrors: object;

    constructor(private fb: FormBuilder,
                private auth: AuthService) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    login(formData): void {
        this.auth.emailLogin(formData).then(
            (error) => this.firebaseErrors = error
        )
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            'email': ['', [
                Validators.required
            ]
            ],
            'password': ['', [
                Validators.required
            ]
            ],
        });
    }
}
