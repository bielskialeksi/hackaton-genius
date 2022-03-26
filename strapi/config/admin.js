module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2f5ac42493b0f0ba2fc6c807678baea0'),
  },
});
