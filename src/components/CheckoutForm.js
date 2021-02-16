import axios from "axios";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = (idUser) => {
    console.log(idUser);
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const cardElements = elements.getElement(CardElement);
            const stripeResponse = await stripe.createToken(cardElements, {
                name: idUser.idUser,
            });

            const stripeToken = stripeResponse.token.id;

            const response = await axios.post("http://localhost:3001/payment", {
                stripeToken: stripeToken,
            });
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
