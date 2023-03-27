import * as MobileDetect from 'mobile-detect';
export declare class Device {
    /**
     * The viewport of an iPad Pro 12" is 1024 x 1366
     */
    static maxTabletWidth: number;
    /**
     * Expose original library for full usage if needed.
     */
    static mobileDetect: MobileDetect;
    /**
     * MobileDetect.is shortcut
     * @param value
     */
    static is(value: string): boolean;
    /**
     * Checks if ontouchstart is present in the browser.
     * This is usually present only on touchscreen devices such phones, tables
     * but also some PCs, so this is not an exact "mobile" device detection.
     */
    static isTouchScreen(): boolean;
    /**
     * Returns true is the device is mobile. Seems working well on iPhones.
     * ⚠️ iPad returns null by default, user has to explicitly request mobile version of the page.
     * * TODO: test on Android phone device
     */
    static isPhone(): boolean;
    /**
     * Consider as tablet if the device is not mobile and has touch screen
     * and is smaller or equal to the maximal tablet width*
     * ⚠️ iPad returns null by default, user has to explicitly request mobile version of the page.
     * TODO: test on Android phone device
     */
    static isTablet(): boolean;
    /**
     * True if touchscreen is no available BUT
     * very tricky when Touchscreen PC...
     * Consider as PC if touchscreen and width is bigger than maximal tablet width*
     */
    static isDesktop(): boolean;
    static isAndroid(): boolean;
    static isIOs(): boolean;
    static addBodyClasses(): void;
}
