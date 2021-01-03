import { API } from 'homebridge';

import { PLATFORM_NAME } from './settings';
import { ExampleHomebridgePlatform } from './platform'; 

export = (api: API) => {

  /*var exportTypes = {
    Accessory: homebridge.hap.Accessory,
    Service: homebridge.hap.Service,
    Characteristic: homebridge.hap.Characteristic,
    uuid: homebridge.hap.uuid,
  };

   GPIORGBLEDStripAccessory.init(exportTypes);*/

   api.registerPlatform(PLATFORM_NAME, ExampleHomebridgePlatform);
};
