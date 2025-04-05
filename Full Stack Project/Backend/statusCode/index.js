
const statusCode = {
    OK: 200,
    USER_CREATED:201,
    EMAIL_DELETED:204,
    EMAIL_NOT_SENDED:403,
    USER_NOT_FOUND:404,
    INVALID_USER:405,
    INVALID_OTP: 406,
    TOKEN_EXPIRED:407,
    ALREADY_USER_EXISTS:409,
    OTP_EXPIRED:410,
    LOGIN_FAILED:411,
    MISSMATCH_EMAIL:412,
    MISSING_TOKEN:413,
    NOT_SUPER_ADMIN:414,
    NO_USER_FOUND:415,
    MISSING_FIELDVALUES:422,
    INVALID_USER_DETAILS:400,
    INVALID_TOKEN:401,
    SERVER_ERROR:500
};

const statusMessage = {
    200:'Success',
    201:'Your Account Was Created',
    204:'The Email Account Was Deleted No Further Content Available',
    400:'Incorrect User Details. Please try again',
    401:'Oops! Something went wrong with your session. Please login again',
    403:'We could not send the OTP. Check your internet connection and try again',
    404:'The email address you entered does not exist. Please check and try again',
    405:'Login unsuccessfully! Please try again later',
    406:"Hmm... that OTP isn't correct Double-check and try again",
    407:'Your session has expired. Please log in again',
    409:'Hey! It looks like you already have an account. Try logging in instead',
    410:"Time's up! Your OTP has expired. Request a new OTP to continue",
    411:'Login failed. Please try again later',
    412:'Invalid session. Please re-authenticate with the correct email',
    413:'Authentication required. Please log in to continue',
    414:'You do not have access',
    415:'No users found with the specified role',
    422:'is required',
    500:'Request failed due to a server error try again later',
};

export const status = {
    statusCode,
    statusMessage,
}