//tạo token và lưu trên cookie
export default (user, statusCode, res) => {
    //tạo thông báo JWT
    const token = user.getJwtToken()

    //chọn cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, options).json({
        token,
    })
}