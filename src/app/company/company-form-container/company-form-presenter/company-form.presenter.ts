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
            clientName: ['', [Validators.required,Validators.pattern("[a-zA-Z]+(?:(?:\. |[' ])[a-zA-Z]+)*")]],
            clientType: ['supplier', Validators.required],
            businessType: ['', Validators.required],
            contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
            location: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}')]],
            contactPersonName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
            designation: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
            contactPersonMobile: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
            attachment: ['',]
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

    /**
   * update company
   */
    public updateCompany(): void {
        debugger
        if (this.companyForm.valid) {
            this.companyObj = this.companyForm.value;
        }
    }
}
