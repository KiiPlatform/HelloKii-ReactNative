var kii = require('./KiiSDK.js').create();
kii.Kii.initializeWithSite("___APPID___", "___APPKEY___", kii.KiiSite.US);
module.exports = {
  kii: kii
}
