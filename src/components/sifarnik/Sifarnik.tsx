import Kupac from "../../models/kupac"

interface Props {
    kupci: Kupac[]
}

const Sifarnik = ({ kupci }: Props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Mat. broj</th>
                    <th>PIB</th>
                    <th>Naziv</th>
                    <th>E-mail</th>
                    <th>Telefon</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {kupci.map((k) =>
                    <tr key={k.maticniBroj}>
                        <td>{k.maticniBroj}</td>
                        <td>{k.pib || '/'}</td>
                        <td>{k.naziv}</td>
                        <td>{k.email}</td>
                        <td>{k.telefon}</td>
                        <td><button>Izmeni</button></td>
                    </tr>
                )}
            </tbody>

        </table>
    )
}

export default Sifarnik
