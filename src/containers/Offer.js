import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const Offer = ({
    setPrice,
    setTitle,
    setIdUser,
    userToken,
    setDisplayLogin,
}) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();
    const handleClick = () => {
        if (!userToken) {
            setDisplayLogin(true);
        } else {
            setPrice(data.product_price);
            setTitle(data.product_name);
            setIdUser(data.owner._id);
            history.push("/Payment");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
                );
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [id]);

    return isLoading ? (
        <span>downloading...</span>
    ) : (
        <section className="offer">
            <div>
                <img src={data.product_image.secure_url} alt="product_photo" />
            </div>

            <div className="description">
                <p>{data.product_price} €</p>

                {data.product_details.map((elem, index) => {
                    const keys = Object.keys(elem);

                    return (
                        <div key={index}>
                            <div className="key">
                                <span>{keys[0]}</span>
                            </div>
                            <div className="value">
                                <span>{elem[keys[0]]}</span>
                            </div>
                        </div>
                    );
                })}
                <div>
                    <p>{data.product_name}</p>
                    <p>{data.product_description}</p>
                    <section className="avatar">
                        {data.owner.account.avatar ? (
                            <img
                                src={data.owner.account.avatar.secure_url}
                                alt=""
                            />
                        ) : (
                            <p></p>
                        )}
                        <span>{data.owner.account.username}</span>
                    </section>

                    <button onClick={handleClick} className="acheter">
                        Acheter
                    </button>
                </div>
            </div>
        </section>
    );
};
export default Offer;
