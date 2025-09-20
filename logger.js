const axios = require("axios");

// Base URL of the evaluation service
const BASE_URL = "http://20.244.56.144/evaluation-service";

/**
 * STEP 1: Register and fetch a fresh token
 */
async function getToken() {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      companyName: "Afford",
      ownerName: "Prateek Jain",
      rollNo: "220102186",
      ownerEmail: "1000018101@dit.edu.in",

      // Required fields from error message
      email: "jainprateek2004@gmail.com",
      name: "Prateek Jain",
      mobileNo: "9027549849",          // <-- put your real mobile number
      githubUsername: "prateekjain0007",  // <-- replace with your GitHub username
      accessCode: "Skmnew"             // <-- from your JWT payload
    });

    // Return the access token
    return response.data.access_token;
  } catch (err) {
    console.error("❌ Failed to fetch token:", err.response ? err.response.data : err.message);
    throw err;
  }
}

/**
 * STEP 2: Use the token to send logs
 */
async function Log(stack, level, pkg, message) {
  try {
    const token = await getToken(); // always fetch a fresh token

    const response = await axios.post(
      `${BASE_URL}/logs`,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Log created successfully:", response.data);
  } catch (err) {
    console.error("❌ Error from API:", err.response ? err.response.data : err.message);
  }
}

/**
 * STEP 3: Run some test logs
 */
async function runExamples() {
  console.log("Running logging examples...");

  await Log("backend", "info", "auth-service", "User login successful");
  await Log("frontend", "error", "dashboard", "Failed to load chart data");
  await Log("backend", "fatal", "payment-service", "Database connection lost");
}

// Run the examples
runExamples();

module.exports = { Log };
