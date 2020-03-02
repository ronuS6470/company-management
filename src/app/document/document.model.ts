import { DatePipe, Time } from '@angular/common';

/** model class for Document */
export class Document {

    documentName: string;
    ownerName: string;
    created : DatePipe;
    modified : string;
    activity: string;

}
