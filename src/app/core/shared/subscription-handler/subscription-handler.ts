export class SubscriptionHandler {
  private subscriptions: any[] = [];

  public add(subscription: any): void {
    this.subscriptions.push(subscription);
  }

  public unsubscribe(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
