import { Link, useLocation } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useSelector } from "react-redux"
import { signOut } from "../../utils/utils"

export default function Navbar() {
    const checkedTasks = useSelector((state) => state.taskReducer.checkedTasks)
    const userProfile = useSelector((state) => state.taskReducer.userProfile)
    const location = useLocation().pathname
    return (
        <header className={styles.header}>
            <nav className={styles.navBar}>
                <Link to={!checkedTasks.length ? '/' : null}>HOME</Link>
                <Link to={!checkedTasks.length ? '/about' : null}>ABOUT</Link>
            </nav>
            <div>
                {(location != '/signIn' && location != '/signUp' && !localStorage.getItem('token')) ? 
                <Link className={styles.signIn} to={'/signIn'}>Sign in</Link>:null}


               {localStorage.getItem('token') && <Link className={styles.signIn} to={'/signIn'} onClick={signOut}>Sign out</Link>}
            </div>
        </header>
    )


}