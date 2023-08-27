import Navbar from "../../componenets/navBar/NavBar"
import styles from "./NoFound.module.css"

export default function NoFound(){
    return(
        <>
        {/* <Navbar /> */}
        <div className={styles.noFound}>
            <h1>Page is not faund</h1>
        </div>
        </>
    )
}