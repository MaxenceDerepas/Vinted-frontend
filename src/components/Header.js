import logo from "../assets/images/logo-vinted.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ userToken, setUser, setDisplayLogin, setDisplaySignUp }) => {
    return (
        <header>
            <div>
                <img src={logo} alt="" />
                <div className="icon">
                    <FontAwesomeIcon icon="search" />
                </div>
                <input type="text" placeholder="Rechercher des articles" />
                {userToken ? (
                    <button onClick={() => setUser(null)}>
                        Se déconnecter
                    </button>
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
