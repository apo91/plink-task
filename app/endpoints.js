// @flow

export default {
  auth: {
    qrRequest: 'https://plink.tech/qrcode_authentications/',
    qrConfirmationTimeout: 60,
    qrConfirmation: (slug: string) =>
      `wss://plink.tech/wss/qr_code_authentication/${slug}/`
  }
};
