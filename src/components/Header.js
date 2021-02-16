import logo from "../assets/images/logo-vinted.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Header = ({ userToken, setUser, setDisplayLogin, setDisplaySignUp }) => {
    const history = useHistory();

    const handleClick = () => {
        setUser(null);
        history.push("/");
    };

    return (
        <header>
            <div>
                <img src={logo} alt="logo-vinted" />
                <div className="icon">
                    <FontAwesomeIcon icon="search" />
                </div>
                <input type="text" placeholder="Rechercher des articles" />
                {userToken ? (
                    <button onClick={handleClick}>Se déconnecter</button>
                ) : (
                    <>
                        <button onClick={setDisplayLogin}>Se connecter</button>
                        <button onClick={setDisplaySignUp}>S'inscrire</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
