import { Link } from "react-router-dom"

const SifarnikPage = () => {
    return (
        <div>
            <button>Hello</button>
            <Link style={{ color: 'black' }} to='/sifarnik/dodaj-kupca'>Dodaj kupca</Link>
        </div>
    )
}

export default SifarnikPage