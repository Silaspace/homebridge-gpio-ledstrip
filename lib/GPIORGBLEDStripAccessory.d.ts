export default class GPIORGBLEDStripAccessory {
    private log;
    private name;
    private ledStripSvc;
    private bled;
    private gled;
    private rled;
    private addService;
    private getService;
    private services;
    private uuid_base;
    static init(exportTypes: any): void;
    constructor(log: any, config: any);
    getServices(): any;
    private resetState;
    private updateRGB;
    private isOn;
    private brightness;
    private hue;
    private saturation;
}
