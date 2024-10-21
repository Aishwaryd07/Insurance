import  { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy } from 'react'
import {Toaster} from "react-hot-toast"
// Components
import Header from './components/shared/Header'
import Loader from './components/shared/Loader'
import { useGetMyProfileQuery } from './redux/api/user'
import { useDispatch, useSelector } from 'react-redux'
import { userExist } from './redux/reducers/userReducer'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
const Home = lazy(() => import("./pages/Home"))
const Profile = lazy(() => import("./pages/Profile"))
const Login = lazy(() => import("./pages/Login"))
const FarmerApplication = lazy(() => import("./pages/FarmerApplication"))
const MyApplications = lazy(() => import("./pages/MyApplications"))

// Admin Pages
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"))
const AllInsu = lazy(() => import("./pages/Admin/AllInsu"))
const Applications = lazy(() => import("./pages/Admin/AdminApplications"))
const CreateIns = lazy(() => import("./pages/Admin/CreateIns"))
const Feedbacks = lazy(() => import("./pages/Admin/Feedbacks"))
const AdminApplicationDetails = lazy(() => import("./pages/Admin/AdminApplicationDetails"))



const App = () => {
  const {user,isLoading}=useSelector((state)=>state.userReducer);
  const dispatch=useDispatch();
  const { data } = useGetMyProfileQuery();
  useEffect(()=>{
    if(data?.user){
      dispatch(userExist(data.user))
    }else{
      dispatch(userExist(null))
    }
  },[dispatch,data])

  return (
    <Router>
      <Header user={user}/>

      <Suspense fallback={<Loader />}>
        {
          !isLoading && (
            <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute isAuthenticated={user} />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/apply/:id' element={<FarmerApplication />} />
                <Route path='/my/application' element={<MyApplications />} />
          </Route>
          

          {/* Admin Pages */}
          <Route element={<ProtectedRoute isAuthenticated={user} adminOnly={true} isAdmin={user?.role=="admin"}/>}>
                <Route path='/admin' element={<AdminHome />} />
                <Route path='/admin/insuarance/new' element={<CreateIns />} />
                <Route path='/admin/insuarance/view' element={<AllInsu />} />
                <Route path='/admin/applications' element={<Applications />} />
                <Route path='/admin/application/:id' element={<AdminApplicationDetails />} />
                <Route path='/admin/feedbacks' element={<Feedbacks />} />
                <Route path='/admin/feedbacks' element={<Feedbacks />} />
          </Route>
          


        </Routes>
          )
        }
      </Suspense>
      <Toaster position='bottom-center' />
    </Router>
  )
}

export default App