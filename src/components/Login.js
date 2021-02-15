import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ closeLogin, displayLogin, setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const closeModal = () => {
        setEmail("");
        setPassword("");
        closeLogin();
    };

    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                    email: email,
                    password: password,
                }
            );

            if (response.data.token) {
                setUser(response.data.token);
                history.push("/");
                closeModal();
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <section
            className="modal"
            style={{ display: displayLogin ? "block" : "none" }}
        >
            <div>
                <FontAwesomeIcon icon="times" id="icon" onClick={closeModal} />
                <p className="title">Login</p>
                <form onSubmit={handleClick}>
                    <span>email: </span>
                    <input
                        type="email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                    />
                    <span>password:</span>
                    <input
                        type="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        value={password}
                    />
                    <button type={"submit"}>Login</button>
                </form>
            </div>
        </section>
    );
};

export default Login;
