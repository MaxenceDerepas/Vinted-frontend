import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = ({ price, title, idUser }) => {
    const protect = (price / 10).toFixed(2);
    const shippingFees = ((price * 2) / 10).toFixed(2);
    const total = price + Number(protect) + Number(shippingFees);

    return (
        <section className="payment">
            <div>
                <h2>Resumé de la commande</h2>
                <div className="payment-price">
                    <div>
                        <p>Comande</p>
                        <p>Frais protection acheteurs</p>
                        <p>Frais de port</p>
                    </div>
                    <div>
                        <p>{price} €</p>
                        <p>{protect} €</p>
                        <p>{shippingFees} €</p>
                    </div>
                </div>
                <div className="total">
                    <p>Total</p>
                    <p>{total} €</p>
                </div>
                <p className="last-step">
                    Il ne vous reste plus qu'un étape pour vous offrir
                    <span style={{ fontWeight: "bold", color: "#901D05" }}>
                        {" "}
                        {title}
                    </span>
                    . Vous allez payer{" "}
                    <span style={{ fontWeight: "bold", color: "#901D05" }}>
                        {" "}
                        {total} €
                    </span>{" "}
                    (frais de protection et frais de port inclus).
                </p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm idUser={idUser} price={price} title={title} />
                </Elements>
            </div>
        </section>
    );
};

export default Payment;
