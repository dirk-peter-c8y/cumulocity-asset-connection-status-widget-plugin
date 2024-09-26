import { ISource } from '@c8y/client';

export const AssetConnectionAvailabilityStatus = {
  maintenance: 'MAINTENANCE',
  available: 'AVAILABLE',
  unavailable: 'UNAVAILABLE',
  unknown: 'UNKNOWN'
}
export type AssetConnectionAvailabilityStatus =
  (typeof AssetConnectionAvailabilityStatus)[keyof typeof AssetConnectionAvailabilityStatus];

export const AssetConnectionConnectionStatus = {
  maintenance: 'MAINTENANCE',
  connected: 'CONNECTED',
  unavailable: 'DISCONNECTED',
  unknown: 'UNKNOWN',
};
export type AssetConnectionConnectionStatus =
  (typeof AssetConnectionConnectionStatus)[keyof typeof AssetConnectionConnectionStatus];

export interface AssetConnectionStatusWidgetConfiguration {
  device: ISource;
  forcedAvailability?: AssetConnectionAvailabilityStatus;
  forcedConnection?: AssetConnectionConnectionStatus;
}
