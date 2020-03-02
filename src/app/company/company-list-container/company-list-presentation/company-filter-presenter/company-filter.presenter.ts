import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    public buildForm(): void {
        this.form = this.fb.group({
            companyName: new FormControl(''),
            clientName: new FormControl(''),
            contactNumber: new FormControl(''),
            location: new FormControl(''),
            email: new FormControl('')
        });
    }
}
