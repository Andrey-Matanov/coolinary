import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../utils/firebaseConfig";
import { Container, Box, Typography, TextField, Button, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            marginRight: theme.spacing(1),
        },
    },
}));

const PasswordReset = () => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        }
    };

    const sendResetEmail = (event) => {
        setError(null);
        event.preventDefault();
        auth.sendPasswordResetEmail(email)
            .then(() => {
                toast.success("Писбмо со сбросом пароля отправлено вам на почту!");
            })
            .catch(() => {
                setError("Error resetting password");
            });
    };

    return (
        <Container maxWidth="xs">
            <Box>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Box my={2}>
                            <Typography variant="h5">Сброс пароля</Typography>
                        </Box>
                        {error !== null && (
                            <Box my={1}>
                                <Typography variant="body2" color="error">
                                    {error}
                                </Typography>
                            </Box>
                        )}
                        <Box mb={2}>
                            <TextField
                                name="userEmail"
                                type="email"
                                label="Ваш email"
                                onChange={onChangeHandler}
                                value={email}
                            ></TextField>
                        </Box>
                        <Box mb={2} className={classes.root}>
                            <Button variant="contained" onClick={sendResetEmail}>
                                Отправить
                            </Button>
                            <Button variant="contained">
                                <Link href="/login">Назад</Link>
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
        // <div>
        //     <h1>Reset your Password</h1>
        //     <div>
        //         <form>
        //             {emailHasBeenSent && <div>An email has been sent to you!</div>}
        //             {error !== null && <div>{error}</div>}
        //             <label htmlFor="userEmail">Email:</label>
        //             <input
        //                 type="email"
        //                 name="userEmail"
        //                 id="userEmail"
        //                 value={email}
        //                 placeholder="Input your email"
        //                 onChange={onChangeHandler}
        //             />
        //             <button onClick={sendResetEmail}>Send me a reset link</button>
        //         </form>
        //         <Link href="/login">&larr; Назад на страницу авторизации</Link>
        //     </div>
        // </div>
    );
};

export default PasswordReset;
