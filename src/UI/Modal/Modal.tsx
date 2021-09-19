import ReactDOM from "react-dom";
import styles from './Modal.module.css'


const Backdrop: React.FC<{ onZatvori: () => void }> = (props) => {
    return (
        <div onClick={props.onZatvori} className={styles.backdrop} />
    )
}



const ModalOverlay: React.FC = props => {

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');

const Modal: React.FC<{ onZatvori: () => void }> = (props) => {

    return (
        <>
            {portalElement && ReactDOM.createPortal(<Backdrop onZatvori={props.onZatvori} />, portalElement)}
            {portalElement && ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    )

}
export default Modal;