import { Box, Paper, Stack } from '@mui/material'
import { LinkComponent } from '../../components/styles/StyledComponents'

const AdminHome = () => {
  return (
    <div
    style={{
        height:"calc(100vh - 4rem)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    }}
    >
        <Paper>
        <Stack
        sx={{
            gap:"2rem",
            padding:"4rem",
            // backgroundColor:"rgba(108, 117, 163,0.2)",
            border:"1px solid black",
            
            "& > div":{
                cursor:"pointer",
            }
        }}
        >
            <Box>
                <LinkComponent to={"/admin/insuarance/new"}>
                    Create New Insuarance
                </LinkComponent>
            </Box>
            <Box>
                <LinkComponent to={"/admin/insuarance/view"}>
                    View Insuarance
                </LinkComponent>
            </Box>
            <Box>
                <LinkComponent to={"/admin/applications"}>
                    Applications
                </LinkComponent>
            </Box>
            <Box>
                <LinkComponent to={"/admin/feedbacks"}>
                    Feedbacks
                </LinkComponent>
            </Box>
        </Stack>
        </Paper>
        
    </div>
  )
}

export default AdminHome