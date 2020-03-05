import { DatePipe, Time } from '@angular/common';

/** model class for Document */
export class Document {

    documentName: string;
    ownerName: string;
    createdDate : Date;
    updatedDate :Date;
    modified : string;
    activity: string;
    id: number;
    checked: boolean;

}
