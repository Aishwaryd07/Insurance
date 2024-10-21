import  { useState } from 'react';
import { IconButton, Stack, Tooltip } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { LinkComponent } from '../styles/StyledComponents';
import { pinkishWhite } from '../../constants/colors';
import { useLogoutMutation } from '../../redux/api/user';
import { resAndNavigate } from '../../utils/features';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userNotExist } from '../../redux/reducers/userReducer';
import { AdminPanelSettings, Fingerprint, Home, Logout } from '@mui/icons-material';

const Header = ({user}) => {
   const navigate=useNavigate()
   const dispatch=useDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const [logout]=useLogoutMutation()

    const logoutHandler=async()=>{
        const res=await logout()
        dispatch(userNotExist(null));
        resAndNavigate(res,navigate,"/")
    }

    return (
        <Stack
            sx={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                height: "4rem",
                gap: "2rem",
                padding: "1rem",
                backgroundColor: pinkishWhite,
                margin: "0",
                position: "relative"
            }}
        >
            <LinkComponent to="/" >
            <Tooltip title={"Home"}>
                    <IconButton >
                        <Home />
                    </IconButton >
                </Tooltip>
            </LinkComponent>
            {user?.role === "admin" && (
                <LinkComponent to="/admin" >
                    <Tooltip title={"Admin Panel"}>
                    <IconButton>
                        <AdminPanelSettings />
                    </IconButton>
                </Tooltip>
                </LinkComponent>
            )}
            {
                user ?
                <LinkComponent to="/login" onClick={logoutHandler}>
                <Tooltip title={"LogOut"}>
                    <IconButton>
                        <Logout />
                    </IconButton>
                </Tooltip>
            </LinkComponent>
            :
            <LinkComponent to="/login" >
                <Tooltip title={"Login"}>
                    <IconButton >
                        <Fingerprint color='secondary'/>
                    </IconButton>
                </Tooltip>
            </LinkComponent>
            }
            
            <IconButton onClick={() => setIsOpen(prev => !prev)} 
                sx={{
                    backgroundColor:"white",
                    padding:"0.4rem"
                }}
            >
                <PersonIcon />
            </IconButton>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        right: "0",
                        backgroundColor: "white",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "4px",
                        zIndex: 1000, 
                        padding: "1rem"
                    }}
                >
                    <Stack gap={"1rem"}>
                        <LinkComponent to="/profile" onClick={() => setIsOpen(prev => !prev)}>
                            Profile
                        </LinkComponent>
                        <LinkComponent to="/my/application" onClick={() => setIsOpen(prev => !prev)}>
                            My Applications
                        </LinkComponent>
                    </Stack>
                </div>
            )}
        </Stack>
    );
}

export default Header;
