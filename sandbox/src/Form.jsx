import { useState } from "react";

function Form() {
    const [imie, setImie] = useState("");
    const [email, setEmail] = useState("");
    const [wiadomosc, setWiadomosc] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Wysłano dane: ", { imie, email, wiadomosc });
        //tutaj dodaj wysłanie fetch
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-amber-900 shadow-lg w-2/3 h-4/5"
        >
            <h2 className="text-2x1 font-bold mb-6 text-center">Formularz</h2>
            <input
                type="text"
                value={imie}
                onChange={(e) => setImie(e.target.value)}
                className="w-full px-4 py-2 rounded bg-amber-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Wpisz swoje imię"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-amber-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Twój e-mail"
            />
            <textarea
                value={wiadomosc}
                onChange={(e) => setWiadomosc(e.target.value)}
                className="w-full px-4 py-2 rounded bg-amber-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                rows="4"
                placeholder="Co chcesz napisać?"
            ></textarea>
            <button
        type="submit"
        className="bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded w-full mt-4"
      >
        Wyślij
      </button>
        </form>
    );
}
export default Form;
