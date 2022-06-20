const User = require('./routes/auth');
const Subscribe = require('./routes/subscribe');
module.exports = {
    '/api/auth/register': User.signup,
    '/api/auth/login': User.login,

    '/api/subscribe/create-subscription': Subscribe.create_subscription,
    '/api/subscribe/cancel-subscription': Subscribe.cancelSub,
    '/api/subscribe/get-subscription/{subcriptionid}': Subscribe.get_subscription,
    '/api/subscribe/get-subscriptions': Subscribe.get_all_subscription,
    
    
};
