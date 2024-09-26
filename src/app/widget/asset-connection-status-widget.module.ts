import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CoreModule,
  ManagedObjectRealtimeService,
  hookComponent,
} from '@c8y/ngx-components';
import { FormlyModule } from '@ngx-formly/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AssetConnectionStatusWidgetConfig } from './components/asset-connection-status-widget-config/asset-connection-status-widget-config.component';
import { AssetConnectionStatusWidget } from './components/asset-connection-status-widget/asset-connection-status-widget.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule,
    FormlyModule.forChild(),
    TooltipModule,
  ],
  declarations: [
    AssetConnectionStatusWidget,
    AssetConnectionStatusWidgetConfig,
  ],
  providers: [
    ManagedObjectRealtimeService,
    hookComponent({
      id: 'asset-connection-status.widget',
      label: 'Asset Connection Status',
      description: '',
      component: AssetConnectionStatusWidget,
      configComponent: AssetConnectionStatusWidgetConfig,
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
