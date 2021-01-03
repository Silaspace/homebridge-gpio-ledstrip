// Homebridge imports and exports

import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Int16,
  Logging,
  Service
} from "homebridge";

let hap: HAP;

export = (api: API) => {
  hap = api.hap;
  api.registerAccessory("Ledstrip", Ledstrip);
};


// Pigpio 

const Gpio = require('pigpio').Gpio;

const red = new Gpio(23, {mode: Gpio.OUTPUT});
const green = new Gpio(24, {mode: Gpio.OUTPUT});
const blue = new Gpio(25, {mode: Gpio.OUTPUT});

function hsvtorgb(h:number, s:number, v:number) {
  let r, g, b, i, f, p, q, t;

  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    default: r = 0, g = 0, b = 0; break;
  }

  return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}

function writepwm(h:number, s:number, v:number){

  let r, g, b = hsvtorgb(h/360, s/100, v/100);

  red.pwmWrite(r);
  green.pwmWrite(g);
  blue.pwmWrite(b);
}


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
        
        writepwm(0, 100, 100);
        
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