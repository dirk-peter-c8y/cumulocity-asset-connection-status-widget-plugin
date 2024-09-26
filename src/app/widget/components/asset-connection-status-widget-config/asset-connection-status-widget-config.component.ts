import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  AssetConnectionAvailabilityStatus,
  AssetConnectionConnectionStatus,
  AssetConnectionStatusWidgetConfiguration,
} from '../../models/asset-connection-status-widget.model';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'c8y-asset-connection-status-widget-config',
  template: '<formly-form [form]="form" [fields]="fields" [model]="config"></formly-form>',
})
export class AssetConnectionStatusWidgetConfig {
  @Input() config: AssetConnectionStatusWidgetConfiguration;

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  isDev = false;

  private availabilityStatus = this.getFieldOptionsFromModel(
    AssetConnectionAvailabilityStatus
  );
  private connectionStatus = this.getFieldOptionsFromModel(
    AssetConnectionConnectionStatus
  );

  constructor() {
    this.isDev = window.location.search.indexOf('dev=true') >= 0;

    if (this.isDev) console.log('constructor', this.config);

    this.fields = [
      {
        fieldGroup: [
          {
            key: 'forcedAvailability',
            type: 'select',
            props: {
              label: 'Forced Availability Status',
              options: this.availabilityStatus,
            },
          },
          {
            key: 'forcedConnection',
            type: 'select',
            props: {
              label: 'Forced Availability Status',
              options: this.connectionStatus,
            },
          },
        ],
      },
    ];
  }

  private getFieldOptionsFromModel<T>(model: T): SelectOption[] {
    const options: SelectOption[] = [];
    const keys = Object.keys(model);

    keys.forEach((key) => {
      options.push({ label: key, value: model[key] });
    });

    return options;
  }
}
