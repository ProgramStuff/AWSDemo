import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validations = [];

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      validations.push("Please enter a valid email address.");
    }

    // Password validation
    if (!password) {
      validations.push("Please enter a password.");
    }

    if (validations.length > 0) {
      setMessage(validations.join('\n'));
      return;
    }

    // Data to send in the POST request
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://localhost:7121/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful
        console.log("Login Successful");
      } else {
        // If registration fails
        setMessage("Email or password is incorrect.")
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && (
            <ul>
                {message.split("\n").map((msg, index) => (
                    <li className="errorMsg" key={index}>{msg}</li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default Login;