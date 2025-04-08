import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Validate password
    const passwordValidations = [];

    if (password.length < 6) {
      passwordValidations.push("Passwords must be at least 6 characters.");
    }
    if (!/[^\w]/.test(password)) {
      passwordValidations.push("Passwords must have at least one non-alphanumeric character.");
    }
    if (!/\d/.test(password)) {
      passwordValidations.push("Passwords must have at least one digit ('0'-'9').");
    }
    if (!/[a-z]/.test(password)) {
      passwordValidations.push("Passwords must have at least one lowercase ('a'-'z').");
    }
    if (!/[A-Z]/.test(password)) {
      passwordValidations.push("Passwords must have at least one uppercase ('A'-'Z').");
    }
    if (!/(.)\1/.test(password)) {
      passwordValidations.push("Passwords must use at least 1 different character.");
    }

    if (passwordValidations.length > 0) {
      setMessage(passwordValidations.join('\n'));
      return;
    }

    // Data to send in the POST request
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://localhost:7121/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful
        setMessage(`Registration successful: ${data.message}`);
      } else {
        // If registration fails
        if (data.errors.DuplicateUserName) setMessage("Username already exists");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

return (
    <div>
        <h2>Register</h2>
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
            <button type="submit">Register</button>
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

export default Register;