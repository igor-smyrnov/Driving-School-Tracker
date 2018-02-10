import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styles: []
})
export class LoginPageComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private auth: AuthService) {
    }

    public ngOnInit(): void {
        this.buildForm();
    }

    public login(formData): void {
        this.auth.emailLogin(formData)
            .then(
                (error) => console.log(error)
            )
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
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
