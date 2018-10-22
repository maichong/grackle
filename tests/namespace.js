const test = require('tape');
const tr = require('..').create();

tr.learn({
  en: {
    OK: 'OK',
    DIALOG_CANCEL: 'Close',
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
    PAY_OK: 'Pay now',
    OK: 'Pay',
    CANCEL: 'Cancel'
  }
}, 'payment');

// set current locale
tr.setLocale('en');

test('test namespaces', function (t) {
  t.equal(tr('OK', 'login'), 'Login');
  t.equal(tr('OK', 'payment'), 'Pay');
  t.equal(tr('OK'), 'OK');
  t.equal(tr('OK', 'error'), 'OK');
  t.equal(tr('CANCEL', 'login'), 'Cancel');
  t.equal(tr('CANCEL', 'payment'), 'Cancel');
  t.equal(tr('CANCEL', 'error'), 'Cancel');
  t.equal(tr('CANCEL'), 'Cancel');
  t.equal(tr('DIALOG_CANCEL'), 'Close');
  t.equal(tr(['DIALOG_CANCEL', 'CANCEL']), 'Close');
  t.equal(tr(['DIALOG_CANCEL', 'CANCEL'], 'login'), 'Close');
  t.equal(tr('PAY_OK'), 'Pay now');
  t.equal(tr(['PAY_OK', 'OK']), 'Pay now');
  t.equal(tr(['PAY_OK', 'OK'], 'login'), 'Pay now');
  t.equal(tr(['DIALOG_OK', 'OK'], 'login'), 'Login');
  t.equal(tr(['DIALOG_OK', 'LOGIN_OK'], 'login'), 'LOGIN_OK');
  tr.setLocale('zh-CN');
  t.equal(tr('OK', 'login'), '确定');
  t.equal(tr('OK', 'payment'), '确定');
  t.equal(tr('OK', 'error'), '确定');
  t.equal(tr('OK'), '确定');
  t.equal(tr('CANCEL', 'login'), 'CANCEL');
  t.equal(tr('CANCEL', 'payment'), 'CANCEL');
  t.equal(tr('CANCEL', 'error'), 'CANCEL');
  t.equal(tr('CANCEL'), 'CANCEL');
  t.end();
});
