# grackle
Translate framework with ICU support

## Example

```javascript
const tr = require('grackle');

// learn languages with default namespace
tr.learn({
  en: {
    OK: 'OK',
    NUM_PHOTOS: '{numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}'
  },
  'zh-CN': {
    OK: '确定',
    NUM_PHOTOS: '{numPhotos, plural, =0 {没有照片} other {# 张照片}}'
  }
});

// learn languages for login namespace
tr.learn({
  en: {
    OK: 'Login'
  }
}, 'login');

// learn languages for payment namespace
tr.learn({
  en: {
    OK: 'Pay',
    PAY_OK: 'Pay now',
    CANCEL: 'Cancel'
  }
}, 'payment');

// set current locale
tr.setLocale('en');

// ICU Message syntax http://userguide.icu-project.org/formatparse/messages
tr('NUM_PHOTOS', { numPhotos: 1 }); // one photo

// translate with different namespaces
tr('OK', 'login'); // Login
tr('OK', 'payment'); // Pay

// translate with no-exist namespace, use defaults
tr('OK', 'error'); // OK

// translate without, use defaults
tr('OK'); // OK

// translate string[], find first, latest string as default
tr(['PAY_OK', 'OK']); // Pay now
tr(['PAY_OK', 'OK'], 'payment'); // Pay now
tr(['PAY_OK', 'OK'], 'login'); // Pay now

// LOGIN_OK is not exist, use OK as default
tr(['LOGIN_OK', 'OK'], 'login'); // Login

// CANCEL is not in default namespaces, but in payment namespace
tr('CANCEL'); // Cancel
tr('CANCEL', 'login'); // Cancel
tr('CANCEL', 'payment'); // Cancel

// Not found, input as result
tr('Not found'); // Not found
```

## Contribute
[Maichong Software](http://maichong.io)

[Liang Xingchen](https://github.com/liangxingchen)

## License

This project is licensed under the terms of the MIT license
