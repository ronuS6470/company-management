import { Subject } from 'rxjs';

import { OverlayRef } from '@angular/cdk/overlay';

import { TemplateRef, Type } from '@angular/core';

export class MyOverlayRef {
  afterClosed$ = new Subject();

  constructor(
    public overlay: OverlayRef,
    public data // pass data to modal i.e. FormData
  ) {
    overlay.backdropClick().subscribe(() => this._close(null));
  }

  close(data?) {
    this._close(data);
  }

  private _close(data) {
    this.overlay.dispose();
    this.afterClosed$.next(data);

    this.afterClosed$.complete();
  }
}
