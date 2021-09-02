import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    userListColor: {
        backgroundColor: orange[400],
        color: "white"
    },
    tableHeadCell: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    root: {
        minWidth: 275,
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.9)',
},
})

const List = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getAllUsers() {
            try {
                const users = await axios.get("http://15.207.229.231:8000/machstatz/get_all_users")
                // console.log(users.data);
                setUsers(users.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
        getAllUsers();
    }, [])

    const handleDelete = async email => {
        await axios.delete(`http://15.207.229.231:8000/machstatz/delete_existing_user`);
        var newusers = users.filter((item) => {
            // console.log(item);
            return item.email !== email;
        })
        setUsers(newusers);
    }

    return (
        <>

            <Box textAlign="center" p={2} className={classes.userListColor}>
                <Typography variant="h4">Users List</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {
                            users.map((users, i) => {
                                return (
                                    <Card className={classes.root}>
                                        <TableRow key={i}>
                                            <TableCell align="center">{i + 1}</TableCell>
                                            <TableCell align="center"><Avatar>{users.fist_name}</Avatar></TableCell>
                                            <TableCell align="center">{users.fist_name} {users.last_name}</TableCell>
                                            
                                            <TableCell align="center">
                                                <Tooltip title="Edit">
                                                    <IconButton><Link to={`/edit/${users._id.$oid}`}><EditIcon /></Link></IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDelete(users.email)}><DeleteIcon color="secondary" /></IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    </Card>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default List
