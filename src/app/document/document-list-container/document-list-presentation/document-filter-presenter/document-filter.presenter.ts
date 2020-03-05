/**
 * @author Dhruvit Makadia
 */
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class DocumentFilterPresenter {

    constructor(
        private fb: FormBuilder
    ) { }

    /**
     * build form
     */
    public buildForm(): FormGroup {
        return this.fb.group({
            documentName: new FormControl(''),
            ownerName: new FormControl('', Validators.pattern('[a-zA-Z ]*')),
            activity: new FormControl('', Validators.pattern('[a-zA-Z ]*')),
            createdDate: new FormControl('')
        });
    }
}
