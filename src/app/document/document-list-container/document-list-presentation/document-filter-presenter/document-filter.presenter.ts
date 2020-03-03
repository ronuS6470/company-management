import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Injectable()
export class DocumentFilterPresenter {

    constructor(
        private fb: FormBuilder
    ) { }

    /**
     * build form
     */
    buildForm(): FormGroup {
        return this.fb.group({
            documentName: new FormControl(''),
            ownerName: new FormControl(''),
            activity: new FormControl(''),
            created: new FormControl('')
        });
    }
}
