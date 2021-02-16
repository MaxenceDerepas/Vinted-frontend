import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Offer = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

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
                        <div>
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
                    <Link>
                        <button className="acheter">Acheter</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default Offer;
