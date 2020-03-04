/**
 * @author Dhruvit Makadia
 */
import { Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';

export class MyOverlayRef {
    afterClosed$ = new Subject();

    constructor(
        // overlay reference
        public overlay: OverlayRef,
        // pass data to presentation
        public data
    ) { }

    /**
     * call another mathod
     * @param data filter data
     */
    public close(data?): void {
        this._close(data);
    }

    /**
     * close overlay and store data in subject
     */
    private _close(data): void {
        this.overlay.dispose();
        this.afterClosed$.next(data);

        this.afterClosed$.complete();
    }
}
