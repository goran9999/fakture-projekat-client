import styles from './Sidebar.module.css'

interface Props {
    children: JSX.Element
}

const Sidebar = (props: Props) => {
    return (
        <div className={styles.sidebar}>
            {props.children}
        </div>
    )
}

export default Sidebar
