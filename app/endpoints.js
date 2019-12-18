// @flow

export default {
  auth: {
    issueQR: 'https://plink.tech/qrcode_authentications/',
    confirmQR: (slug: string) =>
      `wss://plink.tech/wss/qr_code_authentication/${slug}/`
  }
};
