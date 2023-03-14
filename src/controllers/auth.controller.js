const httpStatus = require("http-status");
const { catchAsync } = require("../utils/catchAsync");
const { authService, tokenService } = require("../services");

module.exports.register = catchAsync(async (req, res) => {
    const createUser = await authService.addCustomer(req.body);
    res.status(httpStatus.OK).json({ success: true , createUser});
});


// module.exports.login = catchAsync(async (req, res) => {
//     const findUser = await authService.login(req.body);
//     res.status(httpStatus.OK).json({ success: true, findUser });
// });

module.exports.login = catchAsync(async (req, res) => {
    let user;

    if (req.body.email)
        user = await authService.login(req.body);
   
    const tokens = await tokenService.generateAuthToken(user);
   
    
    res.status(httpStatus.OK).cookie('accessToken', tokens.access.token, {
        expires: tokens.access.expires, 
        secure: false, 
        httpOnly: true,
      }).json({ user, success: true});
});