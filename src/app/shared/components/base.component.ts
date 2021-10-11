import { OnDestroy, Directive } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  public ngDestroyed$ = new Subject();
  public subscriptions: Subscription[] = [];

  public ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
  public trackByIndex(index: number, item: any) {
    return index;
  }
  public trackById(index: number, item: any) {
    return item.id;
  }
}
