import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Login from "./components/Login";
import SignUp from "./components/SIgnUp";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes, faSearch);

function App() {
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displaySignUp, setDisplaySignUp] = useState(false);
    const [alert, setAlert] = useState(false);
    const [userToken, setUserToken] = useState(
        Cookies.get("userToken" || null)
    );

    const closeSignUp = () => {
        setDisplaySignUp(false);
        setAlert(false);
    };

    const closeLogin = () => {
        setDisplayLogin(false);
    };

    const setUser = (token) => {
        if (token) {
            Cookies.set("userToken", token, { expires: 1 });
            setUserToken(token);
            console.log(userToken);
        } else {
            Cookies.remove("userToken");
            setUserToken(null);
        }
    };

    return (
        <div className="App">
            <Router>
                <Header
                    userToken={userToken}
                    setUser={setUser}
                    setDisplayLogin={setDisplayLogin}
                    setDisplaySignUp={setDisplaySignUp}
                />
                <Login
                    closeLogin={closeLogin}
                    displayLogin={displayLogin}
                    setUser={setUser}
                />
                <SignUp
                    closeSignUp={closeSignUp}
                    displaySignUp={displaySignUp}
                    alert={alert}
                    setAlert={setAlert}
                    setUser={setUser}
                />
                <Switch>
                    <Route path="/offer/publish">
                        <Publish userToken={userToken} />
                    </Route>
                    <Route path="/offer/:id">
                        <Offer
                            userToken={userToken}
                            setDisplayLogin={setDisplayLogin}
                        />
                    </Route>
                    <Route path="/Payment">
                        <Payment />
                    </Route>
                    <Route path="/">
                        <Home
                            setDisplayLogin={setDisplayLogin}
                            userToken={userToken}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
