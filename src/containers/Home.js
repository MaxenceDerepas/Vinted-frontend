import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ setDisplayLogin, userToken }) => {
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(true);

    const clickLink = () => {
        if (!userToken) {
            setDisplayLogin(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://lereacteur-vinted-api.herokuapp.com/offers"
                );
                setData(response.data);
                setIsloading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return isLoading ? (
        <span>downloading...</span>
    ) : (
        <div className="home">
            <div className="hero">
                <img
                    src="https://images.vinted.net/thumbs/2560x1441/02_00dd6_SgR2EVpgQrUk7j7v8TXPcUCs.jpeg?1610973139-f1517a21aace0bfdeef1a15fed7e9c24d18c66db"
                    alt="vinted-hero"
                />
                <div>
                    <p>Prêts à faire du tri dans vos placards ?</p>
                    <Link
                        onClick={clickLink}
                        to={userToken ? "/offer/publish" : "/"}
                        className="vendre"
                    >
                        Commencer à vendre
                    </Link>
                </div>
            </div>
            <div className="offers">
                {data.offers.map((elem, index) => {
                    return (
                        <Link
                            to={`/offer/${elem._id}`}
                            key={elem._id}
                            className="home-offer"
                        >
                            <div>
                                <div>{elem.owner.account.username}</div>
                                <div>
                                    <img
                                        src={elem.product_image.secure_url}
                                        alt="article"
                                    />
                                </div>
                                <div>{elem.product_price} €</div>
                                <div></div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
