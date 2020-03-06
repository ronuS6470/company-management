import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @author amit
 */
@Injectable()
export class CompanyFilterPresenter {
    constructor(
        private fb: FormBuilder,
    ) { }

    /**
     * Form Builder
     */
    public buildForm(): FormGroup {
        return this.fb.group({
            companySite: new FormControl('', Validators.pattern(
                '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)([a-zA-Z]+)(?:\.)*'
            )),
            // tslint:disable-next-line: quotemark
            clientName: new FormControl('', Validators.pattern("[a-zA-Z]+(?:(?:\. |[' ])[a-zA-Z]+)*")),
            contactNumber: new FormControl('', Validators.pattern('[0-9]*')),
            location: new FormControl(''),
            email: new FormControl(''),
        });
    }
}
