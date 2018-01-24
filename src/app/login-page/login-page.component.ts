import {Component, OnInit} from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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

        this.userForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any): void {
        if (!this.userForm) {
            return;
        }
        const form = this.userForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'email': '',
        'password': ''
    };

    validationMessages = {
        'email': {
            'required': 'Email is required.'
        },
        'password': {
            'required': 'Password is required.'
        }
    };
}
