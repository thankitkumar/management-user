import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import List from "../users/List";
import axios from "axios";
import { useState } from "react";
const useStyles = makeStyles({
    headingColor: {
        backgroundColor: deepPurple[400],
        color: "white"
    },
    root: {
        minWidth: 275,
    },
    adduserColor: {
        backgroundColor: green[400],
        color: "white"
    },
})

const Home = () => {
    const classes = useStyles();
    const [users, setUsers] = useState({
        fist_name: "",
        last_name: "",
        pwd: "",
        username: "",
        email: ""
    });
    const [status, setStatus] = useState();

    function onTextFieldChange(e) {
        setUsers({
            ...users,
            [e.target.name]: e.target.value
        })
    
    }

    async function onFormSubmit(e) {
        e.preventDefault()
        if (users.email === e.target.value || users.username ===e.target.value){
            alert("provided email or username is already exist");
        }else{
        try {
            await axios.post(`http://15.207.229.231:8000/machstatz/add_new_user`, users)
            setStatus(true);
        } catch (error) {
            console.log("Something is Wrong");
        }
    }

    }
    if (status) {
        return <Home />
    }
    return (
        <>

            <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
                <Typography variant="h2">User Management || machstatz</Typography>
            </Box>
            <Grid container justify="center" spacing={4}>
                <Grid item md={6} xs={12}>
                    <Box textAlign="center" p={2} className={classes.adduserColor} mb={2}>
                        <Typography variant="h4">Add User</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField autoComplete="fist_name" name="fist_name" variant="outlined" required fullWidth id="fist_name" label="First Name" onChange={e => onTextFieldChange(e)}
                                />
                            </Grid>
                             <Grid item xs={12}>
                                <TextField autoComplete="last_name" name="last_name" variant="outlined" required fullWidth id="last_name" label="Last Name" onChange={e => onTextFieldChange(e)}
                                />
                            </Grid>
                             <Grid item xs={12}>
                                <TextField autoComplete="username" name="username" variant="outlined" required fullWidth id="username" label="Username" onChange={e => onTextFieldChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" onChange={e => onTextFieldChange(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="pwd" name="pwd" variant="outlined" required fullWidth id="pwd" label="Password" onChange={e => onTextFieldChange(e)} />
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
                        </Box>
                    </form>
                </Grid>

                <Grid item md={6} xs={12}>
                    <List />
                </Grid>
            </Grid>

        </>
    )
}

export default Home