module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
  isProduction: process.env.NODE_ENV === 'production',
  openAiApiKey: process.env.OPEN_AI_API_KEY,
  openAiOrgId: process.env.OPEN_AI_ORG_ID,
};
