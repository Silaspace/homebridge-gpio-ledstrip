import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service
} from "homebridge";

let hap: HAP;

export = (api: API) => {
  hap = api.hap;
  api.registerAccessory("Ledstrip", Ledstrip);
};



class Ledstrip implements AccessoryPlugin {

  private readonly log: Logging;
  private readonly name: string;
  private readonly service: Service;
  private readonly informationService: Service;

  private state = false;



  constructor(log: Logging, config: AccessoryConfig, api: API) {
    
    this.log = log;
    this.name = config.name;
    this.service = new hap.Service.Lightbulb(this.name);

    this.service.getCharacteristic(hap.Characteristic.On)
      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {
        log.info("Current state of the switch was returned: " + (this.state? "ON": "OFF"));
        callback(undefined, this.state);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
        this.state = value as boolean;
        log.info("Switch state was set to: " + (this.state? "ON": "OFF"));
        callback();
      });

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, "Generic LED")
      .setCharacteristic(hap.Characteristic.Model, "Generic LED");

    log.info("Initialisation complete");
  }



  identify(): void {
    this.log("Identify");
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.service,
    ];
  }

}