export const apiBaseURL =
  process.env.NODE_ENV === "production"
    ? "https://24pjv4vvf0.execute-api.us-east-1.amazonaws.com/dev"
    : "http://localhost:3001/dev";
