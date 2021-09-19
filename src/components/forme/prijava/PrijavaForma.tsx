import { useHistory } from "react-router";
import useValidation from "../../../hooks/use-validation";

interface Props {
    onUspesnaPrijava: () => void
}

const PrijavaForma = ({ onUspesnaPrijava }: Props) => {

    const history = useHistory()
    let formaValidna = false;

    // const [matBroj, setMatBroj] = useState('');

    const { upisanaVrednost: sifra, imaGreske: sifraPogresna, vrednostValidna: sifraValidna, vrednostPromenjena: promeniSifru,
        fokusUklonjen: sifrafokusUklonjen }
        = useValidation(value => {
            return value.trim().length !== 0
        });

    const { upisanaVrednost: email, imaGreske: emailPogresan, vrednostValidna: emailValidan, vrednostPromenjena: promeniEmail,
        fokusUklonjen: emailFokusUklonjen }
        = useValidation(value => {
            return value.trim().length !== 0
        });

    if (sifraValidna && emailValidan) {
        formaValidna = true;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, sifra: sifra })
            })

            const resJson = await response.json();

            if (!response.ok) {
                console.log(resJson.message);
            } else {
                onUspesnaPrijava()
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <form onSubmit={handleSubmit}>

            {/* <div className='form-element'>
                <label htmlFor="matBroj">Maticni broj *</label>
                <input id='matBroj' value={matBroj} onChange={(e) => setMatBroj(e.target.value)} />
            </div> */}

            <div className='form-element'>
                <label htmlFor="email">E-mail *</label>
                <input id='email' value={email} onBlur={emailFokusUklonjen} onChange={(e) => promeniEmail(e.target.value)} />
                {(emailPogresan) && <p style={{ color: 'red', marginTop: '10px' }}>Email je obavezan</p>}
            </div>

            <div className='form-element'>
                <label htmlFor="sifra">Sifra *</label>
                <input id='sifra' type='password' onBlur={sifrafokusUklonjen} value={sifra} onChange={(e) => promeniSifru(e.target.value)} />
                {(sifraPogresna) && <p style={{ color: 'red', marginTop: '10px' }}>Sifra je obavezna</p>}

            </div>

            <button type='submit' disabled={!formaValidna}>Prijavi se</button>
            <p>Nemate nalog? <span style={{ cursor: 'pointer' }} onClick={() => history.replace('/registracija')}>Napravite novi</span></p>
        </form>
    )
}

export default PrijavaForma
