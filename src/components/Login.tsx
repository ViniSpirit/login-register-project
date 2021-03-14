import styles from "../styles/components/Login.module.css"
import { Button, TextField } from "@material-ui/core"

import { useState, useContext } from "react"
import { LoginContext } from "../contexts/LoginContext"

function Login({ registerLogin }) {
  const { getLogin, isFail } = useContext(LoginContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function submitHandler(e) {
    e.preventDefault()
    getLogin(username, password)
  }
  return (
    <div className={styles.loginContainer}>
      <h1>Fazer Login</h1>
      {isFail && (
        <p style={{ marginBottom: "20px", color: "red" }}>
          username or password incorrect
        </p>
      )}
      <form onSubmit={submitHandler}>
        <TextField
          type="name"
          className={styles.loginInput}
          label="Username"
          variant="outlined"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          className={styles.loginInput}
          label="Password"
          variant="outlined"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={styles.loginButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
      <button className={styles.registerLoginButton} onClick={registerLogin}>
        Register?
      </button>
    </div>
  )
}

export default Login
