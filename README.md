# NEEDS UPDATING
This plugin does NOT currently function - It is a fork of (what I assume) is a plugin that is no longer maintained.
I'm currently in the process of trying to bring the plugin back to life, however it will take time to restore.
The 1.0.0 release will be the first working version with full functionality, but as of yet I have no timeline as to when this might happen.

Below is a checklist of all the issues I've found:
- Directory/file structure outdated (Fixed)
- Using old homebridge API's (Fixed)
- Unsupported dependancy pigpio 0.6.2

# homebridge-gpio-ledstrip
[RPi](https://www.raspberrypi.org) GPIO based LED Strip plugin for [Homebridge](https://github.com/nfarina/homebridge)

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-gpio-ledstrip
3. Update your configuration file. See sample config.json snippet below. 

# Configuration

Configuration sample:

 ```
    "accessories": [
      {
        "accessory": "GPIORGBLEDStrip",
        "name": "Kitchen Cabinet Strip",
        "redPin": 22,
        "greenPin": 27,
        "bluePin": 17
      }
    ]
```

Fields: 

* "accessory": Must always be "GPIORGBLEDStrip" (required)
* "name": Can be anything (required)
* "redPin": GPIO pin that is used to set red value (required)
* "greenPin": GPIO pin that is used to set green value (required)
* "bluePin": GPIO pin that is used to set blue value (required)
