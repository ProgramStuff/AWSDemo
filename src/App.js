import React, { useState } from "react";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegister = (username, password) => {
    setUsers([...users, { username, password }]);
  };

  const handleLogin = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(username);
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div>
      <h1>Basic Register and Login</h1>
      {!isLoggedIn ? (
        <>
          <Register onRegister={handleRegister} />
          <Login onLogin={handleLogin} />
        </>
      ) : (
        <div>
          <h2>Welcome, {currentUser}!</h2>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
