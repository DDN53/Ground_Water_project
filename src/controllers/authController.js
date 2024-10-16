const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Buffer = require("buffer/").Buffer;
const User = require("../models/UserData");
const ApiUser = require("../models/ApiUser");
const EmployeeDetails = require("../models/EmployeeDetails");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const login = async (req, res, next) => {
  const { username, password } = req.body;
  const userName = username;

  try {
    const user = await User.findOne({
      where: {
        userName: userName,
      },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const accessToken = jwt.sign(
          {
            userId: user.id,
            userName: user.userName,
            role: user.role,
            mode: "LOCAL",
          },
          process.env.JWT_SECRETKEY,
          { expiresIn: "24h" }
        );

        return res.status(200).json({
          userName: user.userName,
          role: user.role,
          token: accessToken,
        });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    }

    await validateUser(req, res, next);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function validateUser(req, res, next) {
  try {
    const apiUrl = "https://billing.waterboard.lk/hrm/ValidateUser";
    const requestBody = req.body;

    const response = await axios.post(apiUrl, requestBody);
    console.log(response);

    const savedUserData = await saveUserToDatabase(req.body.username);

    const tokenPayload = {
      userId: savedUserData.userId,
      userName: savedUserData.userName,
      role: savedUserData.role,
      mode: "API",
    };

    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRETKEY, {
      expiresIn: "24h",
    });

    res.status(response.status).json({
      userName: savedUserData.userName,
      role: savedUserData.role,
      token: accessToken,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function saveUserToDatabase(userName) {
  try {
    if (!userName) {
      throw new Error("User name is required");
    }

    // Check if the user already exists in the database
    const existingUser = await ApiUser.findOne({
      where: {
        userName: userName,
      },
    });

    if (existingUser) {
      // User already exists, retrieve and return user details
      return {
        userId: existingUser.userId,
        userName: existingUser.userName,
        role: existingUser.role,
      };
    }

    // User does not exist, generate a new UUID for userId
    const userIdValue = uuidv4();

    // Save the user to the database
    const [savedUser] = await ApiUser.upsert(
      { userId: userIdValue, userName },
      { returning: true }
    );

    return {
      userId: savedUser.userId,
      userName: savedUser.userName,
      role: savedUser.role,
    };
  } catch (error) {
    console.error("Error saving user to the database:", error.message);
    throw error;
  }
}

const saveEmployeeDetailsToDatabase = async (employeeDetails) => {
  try {
    const empIdValue = 1;
    const [savedEmployee] = await EmployeeDetails.upsert(
      { empId: empIdValue, ...employeeDetails },
      { returning: true }
    );

    return savedEmployee;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      console.error("Validation error:", error.errors);
      throw new Error("Validation error");
    } else {
      console.error(
        "Error saving employee details to the database:",
        error.message
      );
      throw error;
    }
  }
};

const getEmployeeDetails = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const payloadBase64 = token.split(".")[1];
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
      "utf-8"
    );
    const decodedToken = JSON.parse(decodedPayload);

    const loginData = decodedToken.nameid;

    const response = await axios.get(
      "https://billing.waterboard.lk/hrm/GetEmployee",
      {
        data: {
          locId: 0,
          ccid: 0,
          userName: "2010801",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const employeeDetails = response.data;

    await saveEmployeeDetailsToDatabase(employeeDetails);
    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from the API:", error.message);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  getEmployeeDetails,
};
