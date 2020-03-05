/**
 * @author TapasVashi
 */
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../custom-validator/must-match.validator';

@Injectable()
export class RegistrationPresenter {

    // Declared userDetailForm formgroup
    public userDetailForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    /**
     * Form group userDetailForm to return.
     */
    addUserDetail(): FormGroup {
        return this.userDetailForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
        }, {
                validator: MustMatch('password', 'confirmPassword')
            });
    }
}
