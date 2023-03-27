"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
var MobileDetect = require("mobile-detect");
var md = new MobileDetect(window.navigator.userAgent);
var Device = exports.Device = /** @class */ (function () {
    function Device() {
    }
    /**
     * MobileDetect.is shortcut
     * @param value
     */
    Device.is = function (value) {
        return md.is(value);
    };
    /**
     * Checks if ontouchstart is present in the browser.
     * This is usually present only on touchscreen devices such phones, tables
     * but also some PCs, so this is not an exact "mobile" device detection.
     */
    Device.isTouchScreen = function () {
        return navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    };
    /**
     * Returns true is the device is mobile. Seems working well on iPhones.
     * ⚠️ iPad returns null by default, user has to explicitly request mobile version of the page.
     * * TODO: test on Android phone device
     */
    Device.isPhone = function () {
        return !!md.phone();
    };
    /**
     * Consider as tablet if the device is not mobile and has touch screen
     * and is smaller or equal to the maximal tablet width*
     * ⚠️ iPad returns null by default, user has to explicitly request mobile version of the page.
     * TODO: test on Android phone device
     */
    Device.isTablet = function () {
        return !!md.tablet()
            || (!Device.isPhone() && Device.isTouchScreen() && window.innerWidth <= Device.maxTabletWidth);
    };
    /**
     * True if touchscreen is no available BUT
     * very tricky when Touchscreen PC...
     * Consider as PC if touchscreen and width is bigger than maximal tablet width*
     */
    Device.isDesktop = function () {
        return !Device.isTouchScreen() || (!Device.isPhone() && !Device.isTablet());
    };
    Device.isAndroid = function () {
        return Device.is('AndroidOS');
    };
    Device.isIOs = function () {
        // is explicitly iOS
        return Device.is('iOS')
            // or is tablet and not android, in case of iPad which request desktop version by default
            || (Device.isTablet() && !Device.isAndroid());
    };
    Device.addBodyClasses = function () {
        if (Device.isTouchScreen()) {
            document.body.classList.add('touchscreen');
        }
        if (Device.isAndroid()) {
            document.body.classList.add('android');
        }
        if (Device.isIOs()) {
            document.body.classList.add('ios');
        }
        if (Device.isPhone()) {
            document.body.classList.add('phone');
        }
        if (Device.isTablet()) {
            document.body.classList.add('tablet');
        }
        if (Device.isDesktop()) {
            document.body.classList.add('desktop');
        }
    };
    /**
     * The viewport of an iPad Pro 12" is 1024 x 1366
     */
    Device.maxTabletWidth = 1366;
    /**
     * Expose original library for full usage if needed.
     */
    Device.mobileDetect = md;
    return Device;
}());
