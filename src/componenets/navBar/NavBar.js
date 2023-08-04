import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

export default function Navbar(){
    return(
        <nav className={styles.navBar}>
            <Link to={'/'}>HOME</Link>
            <Link to={'/about'}>ABOUT</Link>
        </nav>
    )
}