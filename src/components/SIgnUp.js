import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = ({ closeSignUp, displaySignUp, alert, setAlert, setUser }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const history = useHistory();

    const closeModal = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
        closeSignUp();
    };

    const handleClick = async (event) => {
        event.preventDefault();

        if (password === confirmPassword) {
            try {
                const response = await axios.post(
                    "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                    {
                        username: username,
                        email: email,
                        phone: phone,
                        password: password,
                    }
                );
                if (response.data.token) {
                    setUser(response.data.token);
                    history.push("/");
                    closeSignUp();
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            setAlert(true);
        }
    };

    return (
        <section
            className="modal"
            style={{ display: displaySignUp ? "block" : "none" }}
        >
            <div>
                <FontAwesomeIcon icon="times" id="icon" onClick={closeModal} />
                <p className="title">SignUp</p>
                <form onSubmit={handleClick}>
                    <span>email: </span>
                    <input
                        type="email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                    />
                    <span>username: </span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        value={username}
                    />
                    <span>phone: </span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setPhone(event.target.value);
                        }}
                        value={phone}
                    />
                    <span>password:</span>
                    <input
                        type="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        value={password}
                    />
                    <span>confirm your password:</span>
                    <input
                        type="password"
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                        value={confirmPassword}
                    />
                    <button type="submit">SignUp</button>
                    {alert ? (
                        <p className="alert">
                            Vos mots de pass sont différents
                        </p>
                    ) : (
                        ""
                    )}
                </form>
            </div>
        </section>
    );
};

export default SignUp;
