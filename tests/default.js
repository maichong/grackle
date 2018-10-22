const test = require('tape');
const tr = require('..');

tr.learn({
  en: {
    hello: 'Hello world',
    NUM_PHOTOS: '{numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}'
  },
  'zh-CN': {
    hello: '你好世界',
    NUM_PHOTOS: '{numPhotos, plural, =0 {没有照片} other {# 张照片}}'
  }
});

tr.setLocale('zh-CN')

test('test default instance', function (t) {
  t.equal(tr('hello'), '你好世界');
  t.end();
});

test('test ICU', function (t) {
  t.equal(tr('NUM_PHOTOS', { numPhotos: 0 }), '没有照片');
  t.equal(tr('NUM_PHOTOS', { numPhotos: 1 }), '1 张照片');
  t.equal(tr('NUM_PHOTOS', { numPhotos: 2 }), '2 张照片');
  tr.setLocale('en');
  t.equal(tr('NUM_PHOTOS', { numPhotos: 0 }), 'no photos');
  t.equal(tr('NUM_PHOTOS', { numPhotos: 1 }), 'one photo');
  t.equal(tr('NUM_PHOTOS', { numPhotos: 2 }), '2 photos');
  t.equal(tr('NUM_PHOTOS', 'module', { numPhotos: 2 }), '2 photos');
  t.end();
});
