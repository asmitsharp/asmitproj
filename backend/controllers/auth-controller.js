const otpSesrvice = require("../services/otp-service")
const hashService = require("../services/hash-service")
const userService = require("../services/user-service")
const tokenService = require("../services/token-service")
const UserDto = require("../dtos/user-dto")

class AuthController {
  async sendOtp(req, res) {
    //Otp Logic
    const { phone } = req.body
    if (!phone) {
      res.status(400).json({ message: "Phone field is required!" })
    }

    const otp = await otpSesrvice.generateOtp()

    // Hash

    const ttl = 1000 * 60 * 2 // time to leave 2 minutes
    const expires = Date.now() + ttl
    const data = `${phone}.${otp}.${expires}`
    const hash = hashService.hashOtp(data)

    // Send OTP

    try {
      //await otpSesrvice.sendBySms(phone, otp)
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "message sending failed" })
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All fields are require!" })
    }

    const [hashedOtp, expires] = hash.split(".")
    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP Expired!" })
    }
    const data = `${phone}.${otp}.${expires}`
    const isValid = otpSesrvice.verifyOtp(hashedOtp, data)
    if (!isValid) {
      res.status(400).json({ message: "Invalid OTP" })
    }

    let user
    // let accessToken
    // let refreshToken

    try {
      user = await userService.findUser({ phone })
      if (!user) {
        user = await userService.createUser({ phone })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Db Error" })
    }

    // Tokens
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    })

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })
    const userDto = new UserDto(user)
    res.json({ accessToken, user })
  }
}

module.exports = new AuthController()
