/**
 * @author Dhruvit Makadia
 */
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class MyOverlayRef {
    // subject to get filter data
    public afterClosed$ = new Subject();

    constructor(
        // overlay reference
        public overlay: OverlayRef,
        // pass data to presentation
        public data: object
    ) { }

    /**
     * call another mathod
     * @param data filter data
     */
    public close(data?: object): void {
        this._close(data);
    }

    /**
     * close overlay and store data in subject
     */
    private _close(data: object): void {
        this.overlay.dispose();
        this.afterClosed$.next(data);

        this.afterClosed$.complete();
    }
}
