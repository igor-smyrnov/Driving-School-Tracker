import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styles: []
})
export class LoginPageComponent implements OnInit {
    public userForm: FormGroup;
    public firebaseErrors: object;

    constructor(private fb: FormBuilder,
                private auth: AuthService) {
    }

    public ngOnInit(): void {
        this.buildForm();
    }

    public login(formData): void {
        this.auth.emailLogin(formData).then(
            (error) => this.firebaseErrors = error
        )
    }

    private buildForm(): void {
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
