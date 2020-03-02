import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Company } from '../../company.model';

@Injectable()
export class CompanyFormPresenter {

    companyForm: FormGroup;
    companyObj: Company;
    constructor(private formBuilder: FormBuilder) { }

    /**
     * creates a company form
     */
    public buildCompanyForm(): FormGroup {
        return this.companyForm = this.formBuilder.group({
            clientName: ['', Validators.required],
            clientType: ['', Validators.required],
            businessType: ['', Validators.required],
            contactNumber: ['', Validators.required],
            location: ['', Validators.required],
            email: ['', Validators.required],
            contactPersonName: ['', Validators.required],
            designation: ['', Validators.required],
            contactPersonMobile: ['', Validators.required],
            attachment: ['', Validators.required]
        });
    }

    /**
     * add company data
     */
    public addCompany(): void {
        debugger
        this.companyObj = new Company();
        this.companyObj = this.companyForm.value;
    }
}
