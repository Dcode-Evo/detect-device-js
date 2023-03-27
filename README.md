# Detect Device type in browser

Based on https://github.com/hgoebl/mobile-detect.js script, this script provides a different tablet detection and allows
to quickly add body classes with detected devices types.

## iPad detection

By default, iPad is configured to use Desktop user agent so we can not detect it as tablet or event mobile device just by reading
the userAgent string.
This script will combine several checks to "detect" iPads as tablet:
- device is touchscreen enabled
- device is not a phone
- device screen width is <= 1366px (biggest Pad Pro viewport)

NOTE: Unfortunately this check will consider touchscreen enable PCs as iPas if the window is <= 1366px.

## Static Methods

- `Device.isTouchScreen()`: true if device has touch screen support
- `Device.isPhone()`: true if device is a phone (apple or android)
- `Device.isTablet()`: true if device is a tablet (apple* or android)
- `Device.isDesktop()`: true if device is not touch screen enabled or is not phone nor tablet
- `Device.isAndroid()`: true if device is Android
- `Device.isIOs()`: true if device is iOS or is a non-android tablet

## Add body classes

Run `Device.addBodyClasses()` method to add classes to the body element, when matching checks are true:
- `touchscreen`
- `android`
- `ios`
- `phone`
- `tablet`
- `desktop`

The result may be a combination of several classes `phone ios touchscreen`, `desktop touchscreen`, `tablet android`, ...

## SCSS helpers

There are some SCSS mixins to quickly add CSS rules on elements we want to style depending on detected device.    
This avoids making additional JavaScript checks to display, hide or style HTML elements.

| SCSS                                                        | CSS                                                   |
|-------------------------------------------------------------|-------------------------------------------------------|
| `@include when-device-is("tablet", "phone", "ios"){...};`   | `body.tablet.phone.ios .element {...}`                |
| `@include when-device-is("notADeviceClass", "phone"){...};` | `body.phone .element {...}`                           |
| `@include when-device-is-not("android"){...};`              | `body:not(.android) .element {...}`                   |
| `@include hide-on-phone();`                                 | `body.phone .element { display: none !important; }`   |
| `@include hide-on-tablet();`                                | `body.tablet .element { display: none !important; }`  |
| `@include hide-on-desktop();`                               | `body.desktop .element { display: none !important; }` |

Classes provided to the mixing not figuring in the list of device classes wil be ignored:
```scss
 @include when-device-is("notADeviceClass", "phone"){};
```
```css
body.phone .element {}
```
