import {OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

export abstract class SafeSubscriptionComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected subscribe<T>(observable: Observable<T>, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void) {
    this.subscription.add(observable.subscribe(next, error, complete));
  }

}
