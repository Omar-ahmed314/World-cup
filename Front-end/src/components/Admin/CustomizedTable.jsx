import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { config } from '../../config';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function MembersTable() {
  const [users, setUsers] = useState();
  const [deleteState, setDeleteState] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const deleteUser = async (userID) => {
    try {
      const response = await axiosPrivate.delete(`${config.url}/user/${userID}`);
      setUsers(users.filter(user => user.userID !== userID))
      setDeleteState(true);
    } catch (error) {

    }
  }

  useEffect(() => {
    const handleEffect = async () => {
      const response = await axiosPrivate.get(`${config.url}/user`)
      setUsers(response?.data)
    }
    handleEffect();
  }, [])

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align='right'>First Name</StyledTableCell>
            <StyledTableCell align='right'>Last Name</StyledTableCell>
            <StyledTableCell align='right'>Username</StyledTableCell>
            <StyledTableCell align='right'>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <StyledTableRow key={user.userID}>
              <StyledTableCell component="th" scope="row">
                {user.email}
              </StyledTableCell>
              <StyledTableCell align="right">{user.firstName}</StyledTableCell>
              <StyledTableCell align="right">{user.lastName}</StyledTableCell>
              <StyledTableCell align="right">{user.userName}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label="delete" size="small" onClick={() => deleteUser(user.userID)}>
                  <DeleteOutlinedIcon/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Snackbar open={deleteState} autoHideDuration={4000} onClose={() => setDeleteState(false)}>
    <Alert
      severity="success"
      variant="filled"
      sx={{ width: '100%' }}
    >
      User Deleted Successfully
    </Alert>
  </Snackbar>
  </>
  );
}


export function WaitingTable() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const userApprove = async (userID) => {
    try {
      const response = await axiosPrivate.put(`${config.url}/user-approve`, {userID})
      setPendingUsers(pendingUsers.filter(user => user.userID !== userID))
      setSnackBarOpen(true);
    } catch (error) {

    }
  }

  useEffect(() => {
    const handleEffect = async () => {
      const response = await axiosPrivate.get(`${config.url}/user`)
      const filteredUsers = response?.data.filter(user => !user?.roleApproved)
      setPendingUsers(filteredUsers)
    }
    handleEffect();
  }, [])

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align='right'>First Name</StyledTableCell>
            <StyledTableCell align='right'>Last Name</StyledTableCell>
            <StyledTableCell align='right'>Username</StyledTableCell>
            <StyledTableCell align='right'>State</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingUsers.map((user) => (
            <StyledTableRow key={user.userID}>
              <StyledTableCell component="th" scope="row">
                {user.email}
              </StyledTableCell>
              <StyledTableCell align="right">{user.firstName}</StyledTableCell>
              <StyledTableCell align="right">{user.lastName}</StyledTableCell>
              <StyledTableCell align="right">{user.userName}</StyledTableCell>
              <StyledTableCell align="right">
                  <Button variant="contained" color="success" style={{borderRadius: '20px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }} onClick={() => userApprove(user.userID)}>
                    Approve
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={() => setSnackBarOpen(false)}>
    <Alert
      severity="success"
      variant="filled"
      sx={{ width: '100%' }}
    >
      User is Approved Successfully
    </Alert>
  </Snackbar>
  </>
  );
}
