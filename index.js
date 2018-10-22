var IntlMessageFormat = require('intl-messageformat');

function create() {
  var namespaces = {
    _defaults: {},
    _all: {}
  };

  var formaters = {};

  /**
   * 
   * @param {Object} object 
   * @param {string} prop 
   */
  function get(object, prop) {
    if (object && object.hasOwnProperty(prop)) {
      return object[prop];
    }
  }

  function getTemplate(messages, locale, message) {
    var template = get(messages, message);
    if (template) return template;
    if (namespaces._all[locale]) {
      template = get(namespaces._all[locale], message);
    }
    return template;
  }

  /**
   * translate message
   * @param {string|string[]} message
   * @param {string} [namespace]
   * @param {Object} [values]
   * @param {Object} [formats]
   */
  function t(message, namespace, values, formats) {
    if (namespace && typeof namespace === 'object') {
      // 没有设置 namespace 但设置了 values
      formats = values;
      values = namespace;
      namespace = '';
    }
    var locales = namespaces[namespace] || namespaces._all;
    var locale = t.getLocale();
    if (!locale) {
      if (Array.isArray(message)) {
        return message[message.length - 1];
      }
      return message;
    }
    var messages = get(locales, locale) || get(namespaces._all, locale);
    var template;
    if (Array.isArray(message)) {
      var msg;
      for (var i in message) {
        msg = message[i];
        template = getTemplate(messages, locale, msg);
        if (template) break;
      }
      if (!template) return msg;
    } else {
      template = getTemplate(messages, locale, message);
      if (!template) return message;
    }
    if (!values) return template;
    var formater = get(formaters, template);
    if (!formater) {
      formater = new IntlMessageFormat(template, locale, formats);
      formaters[template] = formater;
    }
    return formater.format(values);
  }

  function setNamespace(langs, namespace, isDefault) {
    for (var locale in langs) {
      if (!namespaces[namespace]) {
        namespaces[namespace] = {};
      }
      if (!namespaces[namespace][locale]) {
        namespaces[namespace][locale] = {};
      }
      if (!namespaces._defaults[locale]) {
        namespaces._defaults[locale] = {};
      }
      var messages = namespaces[namespace][locale];
      var defaultMessages = namespaces._defaults[locale];
      var lang = langs[locale];
      for (var key in lang) {
        if (isDefault) {
          defaultMessages[key] = lang[key];
        } else if (defaultMessages.hasOwnProperty(key) && messages.hasOwnProperty(key)) {
          continue;
        }
        messages[key] = lang[key];
      }
    }
  }

  /**
   * learn (set) languages
   * @param {Object} langs languages group
   * @param {string} [namespace] namespace name
   */
  t.learn = function (langs, namespace) {
    setNamespace(langs, '_all', !namespace);
    if (namespace) {
      setNamespace(langs, namespace, false);
    }
  };

  /**
   * Set current locale
   * @param {string} locale locale name
   */
  t.setLocale = function (locale) {
    t._locale = locale;
  };

  /**
   * Get current locale
   * @returns {string}
   */
  t.getLocale = function () {
    if (t._locale) return t._locale;
    for (var locale in namespaces._all) {
      return locale;
    }
    return '';
  };

  t.create = create;

  return t;
}

module.exports = create();
