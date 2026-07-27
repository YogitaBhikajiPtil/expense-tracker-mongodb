const Sib = require("sib-api-v3-sdk");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey =process.env.BREVO_API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    await tranEmailApi.sendTransacEmail({
      sender: { email: "patilyogita0303@gmail.com" },
      to: [{ email }],
      subject: "Password Reset Request",
      textContent: "This is a dummy reset password email.",
    });

    res.status(200).json({ message: "Reset email sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
};