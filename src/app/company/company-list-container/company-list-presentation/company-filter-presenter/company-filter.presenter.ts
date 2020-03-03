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
            companyName: new FormControl('', Validators.required),
            clientName: new FormControl('', Validators.required),
            contactNumber: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
        });
    }
}
