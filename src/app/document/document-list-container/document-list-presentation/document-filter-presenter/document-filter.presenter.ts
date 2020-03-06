import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @author Dhruvit Makadia
 */

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
            // tslint:disable-next-line: quotemark
            ownerName: new FormControl('', Validators.pattern("[a-zA-Z]+(?:(?:\. |[' ])[a-zA-Z]+)*")),
            activity: new FormControl(''),
            createdDate: new FormControl('')
        });
    }
}
