const SibApiV3Sdk = require("@sendinblue/client");
require("dotenv").config();

// var apiInstance = new SibApiV3Sdk.AccountApi()
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// Configure API key authorization: apiKey

apiInstance.setApiKey(
  SibApiV3Sdk.AccountApiApiKeys.apiKey,
  process.env.REACT_APP_API_KEY
);
// var defaultClient = SibApiV3Sdk.ApiClient.instance;

// // Configure API key authorization: api-key
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.API_KEY;

// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// CreateContact | Values to create a contact
const EmailerHelper = ({ content, receiver }) => {
  sendSmtpEmail = {
    sender: { email: "kryptomerch.io@gmail.com" },
    to: [
      {
        email: receiver,
        name: "Kryptomerch",
      },
    ],
    params: {
      name: "John",
      surname: "Doe",
    },
    subject: "test subject",
    textContent: content,
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
    },
    function (error) {
      console.error(error);
    }
  );
};

export default EmailerHelper;
