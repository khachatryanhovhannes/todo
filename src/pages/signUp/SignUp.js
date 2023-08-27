import { Link } from "react-router-dom"
import styles from "./SignUp.module.css"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router';
import { useRegisterNewUserMutation } from '../../redux/API/userAPI'


export default function SignUp() {
    const [sumbitRegisterData,] = useRegisterNewUserMutation();
    const navigate = useNavigate();

    const [newUserObj, setNewUserObj] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        tasksIds: [],
    })

    // const [errorObj, setErrorObj] = useState({
    //     name: false,
    //     surname: false,
    //     email: false,
    //     password: false,
    //     repeatPassword: false,
    // })
    const [nameErr, setNameErr] = useState(false)
    const [surnameErr, setSurnameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const [repasswordErr, setRepasswordErr] = useState(false)

    const [repeatPassword, setRepeatPassword] = useState('')


    function validateData() {
        const { name, surname, email, password, tasksIds } = newUserObj;
        let validateDataAnswer = 0;
        if (!name) {
            setNameErr(true)
        }
        else {
            setNameErr(false)
            validateDataAnswer++
        }

        if (!surname) {
            setSurnameErr(true)
        }
        else {
            setSurnameErr(false)
            validateDataAnswer++
        }

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

        if (password !== repeatPassword) {
            setRepasswordErr(true)
        }
        else {
            setRepasswordErr(false)
            validateDataAnswer++
        }
        if(validateDataAnswer >= 4){
            handleAddUser()
        }
        return
    }


    function handleInputChanges(event) {
        setNewUserObj({ ...newUserObj, [event.target.name]: event.target.value })
    }

    function handleAddUser() {
        const { name, surname, email, password, tasksIds } = newUserObj;

        sumbitRegisterData({ email, password })
            .then((res => {
                if (res.error) throw new Error('Registration field !!!');
                if (res.data.token) {
                    navigate('/signin')
                }
            }))
            .catch((err) => console.log(err))

        return;
    }

    return (
        <div className={styles.signUp}>
            <h3>Sign in for use Todo Project</h3>
            <p>If you have accout go to <Link to={'/signIn'}>Sign In</Link></p>
            <form>
                <label htmlFor="name">Name</label>
                <input id="name"
                    name="name"
                    type="text"
                    placeholder="John"
                    value={newUserObj.name}
                    onChange={(evt) => {
                        handleInputChanges(evt)
                    }}
                />
                <div className={nameErr?styles.errs:styles.errstext}>Uncorrect name</div>
                <label htmlFor="surname">Surname</label>
                <input id="surname"
                    name="surname"
                    type="text"
                    placeholder="Smeet"
                    value={newUserObj.surname}
                    onChange={(evt) => {
                        handleInputChanges(evt)
                    }}
                />
                <div className={surnameErr?styles.errs:styles.errstext}>Uncorrect surname</div>

                <label htmlFor="email">Email</label>
                <input id="email"
                    name="email"
                    type="email"
                    value={newUserObj.email}
                    placeholder="xxxxxxxxx@xxxx.xxx"
                    onChange={(evt) => {
                        handleInputChanges(evt)
                    }}
                />
                <div className={emailErr?styles.errs:styles.errstext}>Uncorrect email</div>

                <label htmlFor="password">Password</label>
                <input id="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                    value={newUserObj.password}
                    onChange={(evt) => {
                        handleInputChanges(evt)
                    }}
                />
                <div className={passwordErr?styles.errs:styles.errstext}>Uncorrect password</div>
                <label htmlFor="repassword">Repeat Password</label>
                <input id="repassword"
                    type="password"
                    placeholder="**********"
                    value={repeatPassword}
                    onChange={(evt) => {
                        handleInputChanges(evt)
                        setRepeatPassword(evt.target.value)
                    }}
                />
                <div className={repasswordErr?styles.errs:styles.errstext}>Uncorrect reapeat password</div>
                <div className={styles.submit}>
                    <input type="submit"
                        value="Sign up"
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