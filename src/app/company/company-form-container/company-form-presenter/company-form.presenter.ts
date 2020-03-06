
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Company } from '../../company.model';

/**
 * @author Kiran Tandel
 */

@Injectable()

export class CompanyFormPresenter {

    public companyForm: FormGroup; //company form
    public companyDetail: Company; // company detail to add|update

    constructor(private formBuilder: FormBuilder) { }

    /**
     * creates a company form
     */
    public buildCompanyForm(): FormGroup {
        return this.companyForm = this.formBuilder.group({
            clientName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z]+(?:(?:\. |[' ])[a-zA-Z]+)*")]],
            companySite: ['', [Validators.required, Validators.maxLength(30),
            Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]],
            clientType: ['supplier', Validators.required],
            businessType: ['', Validators.required],
            contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
            location: ['', [Validators.required, Validators.maxLength(20)]],
            email: ['', [Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}')]],
            contactPersonName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
            designation: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
            contactPersonMobile: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
            attachment: ['', Validators.required]
        });
    }

    /**
     * add company data
     */
    public addCompany(): void {
        this.companyDetail = new Company();
        this.companyDetail = this.companyForm.value;
    }

    /**
   * update company data
   */
    public updateCompany(): void {
        this.companyDetail = this.companyForm.value;
    }
}
