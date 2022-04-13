import React, { useState, useEffect } from "react";
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^[A-z][A-z0-9-_]{8,24}$/;
const REGISTER_URL = "/register/";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(USER_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data);
      setSuccess(true);
      setUsername("");
      setPassword("");
      navigate("/login", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <div className="app">
      <section className="form-container">
        {success ? (
          <>
            <h1>Success!</h1>
            <p>
              <Link to="/login">Sign In</Link>
            </p>
          </>
        ) : (
          <>
            <p
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <label htmlFor="username">
                    Username
                    <AiOutlineCheckCircle
                      className={validUsername ? "valid" : "hide"}
                    />
                    <FaRegTimesCircle
                      className={
                        validUsername || !username ? "hide" : "invalid"
                      }
                    />
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    aria-invalid={validUsername ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    required
                  />
                  <p
                    id="uidnote"
                    className={
                      usernameFocus && username && !validUsername
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <AiOutlineInfoCircle />
                    4 to 24 characters
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </div>
                <div className="input-container">
                  <label htmlFor="password">
                    Password
                    <AiOutlineCheckCircle
                      className={validPassword ? "valid" : "hide"}
                    />
                    <FaRegTimesCircle
                      className={
                        validPassword || !password ? "hide" : "invalid"
                      }
                    />
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    required
                  />
                  <p
                    id="pwdnote"
                    className={
                      passwordFocus && !validPassword
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <AiOutlineInfoCircle />
                    8 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </div>
                <div className="input-container">
                  <input
                    type="submit"
                    disabled={!validUsername || !validPassword ? true : false}
                    value="Register"
                  />
                </div>
                <p>
                  Already registered?
                  <br />
                  <span className="line">
                    <Link to="/login">Log In</Link>
                  </span>
                </p>
              </form>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Register;
