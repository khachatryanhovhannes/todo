import { Link } from "react-router-dom";
import styles from "./SearchResult.module.css"



export default function SearchResult({ searchResults }) {
    return searchResults.map(task => {
        return (
            <Link to={`task/${task.id}`} className={styles.singleSearchResult}>
                <h3> {task.title.length >= 20 ? task.title.slice(0, 30).concat("...") : task.title}</h3>
                <p>{task.description.length >= 20 ? task.description.slice(0, 30).concat("...") : task.description}</p>
            </Link>
        )
    })
}