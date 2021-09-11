import { TipProizvoda } from '../../models/proizvod'

interface Props {
    sifraProizvoda: string
    nazivProizvoda: string
    tipProizvoda: TipProizvoda
    osnovnaCenaProizvoda: number
    pdvProizvoda: number
    kolicina: number
    onUkloniStavku: (sifraProizvoda: string) => void
}

const DodataStavkaItem = (props: Props) => {

    const { sifraProizvoda, nazivProizvoda, tipProizvoda, kolicina, osnovnaCenaProizvoda, pdvProizvoda } = props;

    const ukloniStavkuHandler = () => {
        props.onUkloniStavku(sifraProizvoda);
    }

    return (
        <tr>
            <td>{sifraProizvoda}</td>
            <td>{nazivProizvoda}</td>
            <td>{tipProizvoda}</td>
            <td>{kolicina}</td>
            <td>{osnovnaCenaProizvoda}</td>
            <td>{pdvProizvoda}</td>
            <td>{osnovnaCenaProizvoda * pdvProizvoda / 100}</td>
            <td>{(osnovnaCenaProizvoda + (osnovnaCenaProizvoda * pdvProizvoda) / 100) * kolicina}</td>
            <td>
                <button>Izmeni</button>
            </td>
            <td>
                <button onClick={ukloniStavkuHandler}>Ukloni</button>
            </td>
        </tr>
    )
}

export default DodataStavkaItem
