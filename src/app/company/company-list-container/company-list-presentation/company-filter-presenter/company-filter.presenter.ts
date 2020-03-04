import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @author amit
 */
@Injectable()
export class CompanyFilterPresenter {

    // form group instance
    public form: FormGroup;
    constructor(
        private fb: FormBuilder,
    ) { }

    /**
     * Form Builder
     */
    public buildForm(): void {
        this.form = this.fb.group({
            companyName: new FormControl('', Validators.pattern('[a-zA-Z]*')),
            clientName: new FormControl('', Validators.pattern('[a-zA-Z]*')),
            contactNumber: new FormControl('', Validators.pattern('[0-9]*')),
            location: new FormControl(''),
            email: new FormControl(''),
        });
    }
}
