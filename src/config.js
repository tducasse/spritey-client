const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "spritey-upload",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL:
      process.env.NODE_ENV === "production"
        ? "https://24pjv4vvf0.execute-api.us-east-1.amazonaws.com/dev"
        : "http://localhost:3001/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_nhOgozc41",
    APP_CLIENT_ID: "qo0tjb97drpi1r3o5tbvhkl48",
    IDENTITY_POOL_ID: "us-east-1:6b44a0b4-f2ab-475d-b641-1994acbf06f5",
  },
};

export default config;
