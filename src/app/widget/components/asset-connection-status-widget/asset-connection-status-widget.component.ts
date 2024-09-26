import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { ManagedObjectRealtimeService } from '@c8y/ngx-components';
import { Subscription } from 'rxjs';
import { AssetConnectionStatusWidgetConfiguration } from '../../models/asset-connection-status-widget.model';

@Component({
  selector: 'c8y-asset-connection-status-widget',
  templateUrl: './asset-connection-status-widget.component.html',
  styleUrl: './asset-connection-status-widget.component.scss',
})
export class AssetConnectionStatusWidget implements OnInit, OnDestroy {
  @Input() config: AssetConnectionStatusWidgetConfiguration;

  lastUpdated: string;
  loading = true;
  asset?: IManagedObject;
  isDev = false;

  private subscription: Subscription;

  constructor(
    private inventoryService: InventoryService,
    private managedObjectRealtimeService: ManagedObjectRealtimeService
  ) {
    this.isDev = window.location.search.indexOf('dev=true') >= 0;
  }

  async ngOnInit(): Promise<void> {
    if (this.isDev) console.log('ngOnInit', this.config);
    this.loading = true;

    await this.fetchAsset();
    this.setupManagedObjectSubscription();

    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private setupManagedObjectSubscription() {
    this.subscription = this.managedObjectRealtimeService
      .onUpdate$(this.config.device.id)
      .subscribe((mo) => this.handleManagedObjectUpdate(mo));
  }

  private async fetchAsset(): Promise<void> {
    const response = await this.inventoryService.detail(this.config.device.id);

    this.handleManagedObjectUpdate(response.data);
  }

  private handleManagedObjectUpdate(mo: IManagedObject): void {
    if (this.isDev) console.log('[ACSW.C] MO', mo);

    if (!mo) return;

    const lastMessage =
      mo.c8y_Availability?.lastMessage || new Date().toISOString();
    if (this.config.forcedAvailability) {
      mo.c8y_Availability = {
        status: this.config.forcedAvailability,
        lastMessage,
      };
    }
    if (this.config.forcedConnection)
      mo.c8y_Connection = { status: this.config.forcedConnection };

    this.asset = mo;
  }
}
