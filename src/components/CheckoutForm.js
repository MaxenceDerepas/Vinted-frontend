import axios from "axios";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ userId, title, price }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const cardElements = elements.getElement(CardElement);
            const stripeResponse = await stripe.createToken(cardElements, {
                name: userId,
            });
            console.log(stripeResponse.token.id);
            const stripeToken = stripeResponse.token.id;

            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/payment",
                {
                    token: stripeToken,
                    title: title,
                    amount: price,
                }
            );
            if (response.status === 200) {
                setSucceeded(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="pay">
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit">Pay</button>
            </form>
            {succeeded && <span>Merci pour votre achat.</span>}
        </div>
    );
};

export default CheckoutForm;
