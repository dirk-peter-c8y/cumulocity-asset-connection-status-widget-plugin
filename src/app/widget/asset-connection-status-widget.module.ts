import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CoreModule,
  FormsModule,
  ManagedObjectRealtimeService,
  hookComponent,
} from '@c8y/ngx-components';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AssetConnectionStatusWidget } from './components/asset-connection-status-widget/asset-connection-status-widget.component';

@NgModule({
  imports: [CommonModule, CoreModule, RouterModule, FormsModule, TooltipModule],
  declarations: [AssetConnectionStatusWidget],
  providers: [
    ManagedObjectRealtimeService,
    hookComponent({
      id: 'asset-connection-status.widget',
      label: 'AssetConnectionStatusWidgetModule',
      description: '',
      component: AssetConnectionStatusWidget,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      previewImage: require('./assets/preview.png'),
      data: {
        settings: {
          noNewWidgets: false,
          ng1: {
            options: {
              noDeviceTarget: false,
              groupsSelectable: false,
            },
          },
        },
      },
    }),
  ],
})
export class AssetConnectionStatusWidgetModule {}
