import * as MobileDetect from 'mobile-detect';

const md = new MobileDetect(window.navigator.userAgent);

export class Device {
  /**
   * The viewport of an iPad Pro 12" is 1024 x 1366
   */
  static maxTabletWidth = 1366;
  /**
   * Expose original library for full usage if needed.
   */
  static mobileDetect = md;

  /**
   * MobileDetect.is shortcut
   * @param value
   */
  static is(value: string): boolean {
    return md.is(value);
  }

  /**
   * Checks if ontouchstart is present in the browser.
   * This is usually present only on touchscreen devices such phones, tables
   * but also some PCs, so this is not an exact "mobile" device detection.
   */
  static isTouchScreen(): boolean {
    return navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  }

  /**
   * Returns true is the device is mobile. Seems working well on iPhones.
   * ⚠️ iPad returns null by default, user has to explicitly request mobile version of the page.
   * * TODO: test on Android phone device
   */
  static isPhone(): boolean {
    return !!md.phone();
  }

  /**
   * Consider as tablet if the device is not mobile and has touch screen
   * and is smaller or equal to the maximal tablet width*
   * ⚠️ iPad returns null by default, user has to explicitly request mobile version of the page.
   * TODO: test on Android phone device
   */
  static isTablet(): boolean {
    return !!md.tablet()
      || (!Device.isPhone() && Device.isTouchScreen() && window.innerWidth <= Device.maxTabletWidth);
  }

  /**
   * True if touchscreen is no available BUT
   * very tricky when Touchscreen PC...
   * Consider as PC if touchscreen and width is bigger than maximal tablet width*
   */
  static isDesktop() {
    return !Device.isTouchScreen() || (!Device.isPhone() && !Device.isTablet());
  }

  static isAndroid() {
    return Device.is('AndroidOS');
  }

  static isIOs(): boolean {
    // is explicitly iOS
    return Device.is('iOS')
      // or is tablet and not android, in case of iPad which request desktop version by default
      || (Device.isTablet() && !Device.isAndroid());
  }

  static addBodyClasses() {
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
  }
}
