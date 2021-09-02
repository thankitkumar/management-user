import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white"
  },
  adduserColor: {
    backgroundColor: green[400],
    color: "white"
  },

});

const Edit = () => {
  const classes = useStyles();
  const { _id } = useParams();
  const history = useHistory();
  const [users, setUsers] = useState({
    first_name: "",
    last_name: "",
    pwd: "",
    username: "",
    email: ""
  });
  useEffect(() => {
    async function getAllUsers() {
        try {
            const users = await axios.get("http://15.207.229.231:8000/machstatz/${_id}")
            setUsers(users.data);
            
        } catch (error) {
            console.log("Something is Wrong");
        }
    }
    getAllUsers();
}, [_id])
console.log(users.email);

  function onTextFieldChange(e) {
    setUsers({
      ...users,
      [e.target.name]: e.target.value
    })
  }

  async function onFormSubmit(e) {
    e.preventDefault()
    try {
      await axios.put(`http://15.207.229.231:8000/machstatz/get_all_users`, users)
      history.push("/")
    } catch (error) {
      console.log("Something is Wrong");
    }
  }
  function handleClick() {
    history.push("/")
  }
  return (
    <>
      <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
        <Typography variant="h2">User Management || machstatz</Typography>
      </Box>

      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.adduserColor} mb={2}>
            <Typography variant="h4">Edit User</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={_id} disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="first_name" name="first_name" variant="outlined" required fullWidth id="first_name" label="First Name" value={users.first_name} onChange={e => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="last_name" name="last_name" variant="outlined" required fullWidth id="last_name" label="Last Name" value={users.last_name} onChange={e => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="username" name="username" variant="outlined" required fullWidth id="username" label="Username" value={users.username} onChange={e => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={users.email} onChange={e => onTextFieldChange(e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="pwd" name="pwd" variant="outlined" required fullWidth id="pwd" label="Password" value={users.pwd} onChange={e => onTextFieldChange(e)} />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
          </Box>
        </Grid>
      </Grid >
    </>
  )
}

export default Edit