import axios from "axios";
import { useState } from "react";

const Publish = ({ userToken }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [condition, setConditon] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [city, setCity] = useState("");
    const [file, setFile] = useState();
    console.log(userToken);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const formData = new FormData();

            formData.append("title", title);
            formData.append("picture", file);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("brand", brand);
            formData.append("condition", condition);
            formData.append("color", color);
            formData.append("size", size);
            formData.append("city", city);

            const response = await axios.post(
                "https://app-vinted.herokuapp.com//offer/publish",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="publish">
            <h1>Vends ton article</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Photo :</span>
                    <input
                        type="file"
                        onChange={(event) => {
                            setFile(event.target.files[0]);
                        }}
                    />
                </div>
                <div>
                    <span>Titre :</span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Décris ton article :</span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Prix :</span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setPrice(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Marque :</span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setBrand(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>État :</span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setConditon(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Couleur :</span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setColor(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Taille :</span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setSize(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Localisation :</span>
                    <input
                        type="text"
                        onChange={(event) => {
                            setCity(event.target.value);
                        }}
                    />
                </div>
                <button type="submit">Publiez</button>
            </form>
        </div>
    );
};

export default Publish;
