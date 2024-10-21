import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import AdminPolicyCard from '../components/specific/AdminPolicyCard';
import { useMyApplicationsQuery } from '../redux/api/application';
import MyApplicationCard from '../components/specific/MyApplicationCard';


const MyApplications = () => {
    const {user}=useSelector((state)=>state.userReducer);
    const [applications, setApplications] = useState([]);
    const [status, setStatus] = useState("");


    const {data,isLoading,isError,error}=useMyApplicationsQuery({status,userId:user._id})

  useEffect(() => {
    if(data?.policies){
        setApplications(data.policies);
    }
  }, [data]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  if(isError){
    toast.error(error.data?.message || "Something went Wrong!")
  }

    return (
        <Box
        sx={{ padding: '2rem', maxWidth: '1200px', margin: 'auto', 

            height:"calc(100vh - 4rem)",
                overflowY:"auto",
                "&::-webkit-scrollbar":{
                  display:"none"
                },
                position:"relative"
          }}
        >
            <Typography variant="h4" gutterBottom  textAlign={"center"}>
                My Applications
            </Typography>

            <Box sx={{ 
                width: "200px",
                position:"absolute",
                top:20,
                right:0
                 }}
            >
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Staus"
          onChange={handleChange}
        >
          <MenuItem value={""}>All</MenuItem>
          <MenuItem value={"Processing"}>Processing</MenuItem>
          <MenuItem value={"Accepted"}>Accepted</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
        </Select>
      </FormControl>
            </Box>
            <Grid container spacing={3} >
                {
                !isLoading && 
                (
                    applications.length ==0 ?
                    <Typography width={"100%"} variant="h6" color="textSecondary" margin={"4rem"} textAlign={"center"}>
                        No Applications
                    </Typography>
                    :
                    applications.map((application, index) => {
                      const { name, email, phone, address, policyNumber, cropType, cropArea, region, coverageType, status } = application;
                    
                      return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <MyApplicationCard
                            name={name}
                            email={email}
                            phone={phone}
                            address={address}
                            policyNumber={policyNumber}
                            cropType={cropType}
                            cropArea={cropArea}
                            region={region}
                            coverageType={coverageType}
                            status={status}
                          />
                        </Grid>
                      );
                    })
                    
                )
                
                }
            </Grid>
        </Box>
    );
};

export default MyApplications;
