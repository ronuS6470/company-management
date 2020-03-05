/**
 * Author : Bhargav Baleja
 */

import { InjectionToken} from '@angular/core';

//Creating an injector token for passing data to overlay 
export const DOCUMENT_DETAILS = new InjectionToken<{}>('DOCUMENT_DETAILS');