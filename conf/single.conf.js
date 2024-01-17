const { TEST_SCRIPT, TARGET_ENV, BUILD_NAME, LT_TUNNEL } = require('./base.conf');

const config = {
  commandCapabilities: {
    build: `${TARGET_ENV}; Smoke Tests - ${BUILD_NAME}; ${TEST_SCRIPT}`, //Build name
    tunnel: LT_TUNNEL // Make it true to run the localhost through tunnel
  },
  multiCapabilities: [

    {
      // platformName: 'Windows 10', // OS name
      // browserName: 'Chrome',
      // version: 'latest',
      // resolution: '1920x1080',
      // visual: false, // To take step by step screenshot
      // network: true, // To capture network Logs
      // console: true, // To capture console logs.
      // terminal: true,
      // 'lambda:userFiles': ['invrs-logo.png', 'download.jpg'],
      // unhandledPromptBehavior: 'accept',
      // selenium_version: '4.4.0'
      "browserName": "Chrome",
	"browserVersion": "100",
	"LT:Options": {
		"username": "mfaiz",
		"accessKey": "ssDP4uaMAjxHbOLkNjIKajHIn8Nk7kF2KZC0fFttKBELwBGDiG",
		"platformName": "Windows 10",
		"project": "Untitled",
		"selenium_version": "4.1.2",
		"w3c": true
	}
     
    },

  ]
};

let capabilities = [];
// Code to support common capabilities
config.multiCapabilities.forEach(function (caps) {
  const tempCaps = JSON.parse(JSON.stringify(config.commandCapabilities));
  for (let i in caps) tempCaps[i] = caps[i];
  capabilities.push(tempCaps);
});

module.exports = {
  capabilities
};