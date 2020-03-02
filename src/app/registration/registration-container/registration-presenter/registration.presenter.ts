import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class RegistrationPresenter {

    public userDetailForm: FormGroup;
    constructor(private fb: FormBuilder) {}

    addUserDetail(): FormGroup
    {
        return this.userDetailForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        })
    }
}