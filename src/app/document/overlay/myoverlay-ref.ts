/**
 * @author Dhruvit Makadia
 */
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class MyOverlayRef {
  afterClosed$ = new Subject();

  constructor(
    // overlay reference
    public overlay: OverlayRef,
    // pass data to presentation
    public data 
  ) {
    overlay.backdropClick().subscribe(() => this._close(null));
  }

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
