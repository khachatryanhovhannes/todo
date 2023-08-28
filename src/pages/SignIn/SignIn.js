import { Link } from "react-router-dom"
import styles from "./SignIn.module.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignInMutation } from "../../redux/API/userAPI"

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signIn] = useSignInMutation();
    const navigate = useNavigate();

    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem('token');

        if (token !== null) {
            navigate('/')
        }
    })


    function validateData() {
        let validateDataAnswer = 0
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailErr(true)
        }
        else {
            setEmailErr(false)
            validateDataAnswer++
        }
        if (!password) {
            setPasswordErr(true)
        }
        else {
            setPasswordErr(false)
            validateDataAnswer++
        }

        if (validateDataAnswer >= 2) {
            handleSignIn()
        }
        return
    }

    function handleSignIn() {
        signIn({ password })
            .then((res) => {
                console.log('rrrrrrrrrrrrrr===>>>', res)
                if (res.error) throw new Error('Sign in field !!!');
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token)
                    navigate('/');
                }
            })
    }

    return (
        <div className={styles.signIn}>
            <h3>Sign in for use Todo Project</h3>
            <p>If you have not accout go to <Link to={'/signUp'}>Sign up</Link></p>
            <form>
                <div className={(emailErr || passwordErr) ? styles.errShowM : styles.ErrHideM}>Uncorrect email or password</div>
                <label htmlFor="email">Email</label>
                <input id="email"
                    type="email"
                    placeholder="xxxxxxxxx@xxxx.xxx"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input id="password"
                    type="password"
                    placeholder="**********"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className={styles.submit}>
                    <input type="submit"
                        value="Sign in"
                        onClick={(evt) => {
                            evt.preventDefault()
                            validateData()
                        }}
                    />

                </div>
            </form>
        </div>
    )
}