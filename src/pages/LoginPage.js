import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "url(https://i.redd.it/avemy1r6mcb81.png)",
        backgroundColor: "grey",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "white"
    },
}))

const LoginPage = ({ theme }) => {
    const [authKey, setAuthKey] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const style = useStyles({ theme })

    const handleSubmit = e => {
        e.preventDefault();
        login({ key: authKey }).catch(() =>
            notify('Invalid auth key')
        );
    };

    return (
        <form onSubmit={handleSubmit} className={style.root}>
            Submit auth key:
            <TextField
                name="Authentication key"
                type="password"
                value={authKey}
                onChange={e => setAuthKey(e.target.value)}
            />
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </form>
    );
};

export default LoginPage;