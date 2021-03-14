import styles from "../styles/components/Register.module.css";
import { Button, TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";

function Register({ registerLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [is6digits, setIs6digits] = useState(true);
  const [error, setError] = useState(false);

  const { setIsLogged, setUser } = useContext(LoginContext);

  async function submitHandler(e) {
    e.preventDefault();

    if (password === confirmPassword) {
      setIsPasswordMatch(false);
      if (password.length < 6) {
        setIs6digits(false);
        console.log(is6digits);
      } else {
        setIs6digits(true);
        const response = await fetch("/api/register", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setUser(data.user);
          setIsLogged(true);
        } else {
          setError(true);
        }
      }
    } else {
      setIsPasswordMatch(true);
    }
  }
  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      {isPasswordMatch && (
        <p style={{ marginBottom: "20px", color: "red" }}>
          password do not match
        </p>
      )}
      {error && (
        <p style={{ marginBottom: "20px", color: "red" }}>
          user already exists
        </p>
      )}
      {!is6digits && (
        <p style={{ marginBottom: "20px", color: "red" }}>
          password must be more than 6 digits
        </p>
      )}

      <form onSubmit={submitHandler}>
        <TextField
          type="name"
          className={styles.registerInput}
          label="Username"
          variant="outlined"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          className={styles.registerInput}
          label="Password"
          variant="outlined"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          className={styles.registerInput}
          label="Confirm Password"
          variant="outlined"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          className={styles.registerButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
      <button className={styles.registerLoginButton} onClick={registerLogin}>
        Login?
      </button>
    </div>
  );
}

export default Register;
