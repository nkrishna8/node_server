const speakeasy = require('speakeasy');
const QRcode = require('qrcode');

const generateQRcode = async () => {
    const data = speakeasy.generateSecret({ name: 'GeeksfoGeeks' });
    console.log(data);
    let secret = data.base32;
    const qrcode = await QRcode.toDataURL(data.otpauth_url);

    return {secret,qrcode};
}

const verifyOtp = async (token,secret) => speakeasy.totp.verify({secret,token, encoding:'base32'});



// generateQRcode();


module.exports = { generateQRcode, verifyOtp };