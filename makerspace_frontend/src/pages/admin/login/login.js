import './login.css';
import Layout from '../layout/layout';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function Login(props){
    return(
        <Layout>
            <div className="container flex flex_ver flex_center_all">
                <div>
                    <Box component="form" noValidate autoComplete="off" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>   
                        <div>
                            <TextField id="username" label="username" variant="outlined" required size="small" />
                        </div>
                        <div>
                            <TextField id="password" label="password" variant="outlined" type="password" required size="small" />
                        </div>
                        <Button variant="contained">Login</Button>
                    </Box>
                </div>
            </div>
        </Layout>
    );
}
export default Login;