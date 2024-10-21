import {configureStore} from "@reduxjs/toolkit"
import userApi from "./api/user"
import policyApi from "./api/policy"
import userReducer from "./reducers/userReducer"
import applicationApi from "./api/application"

const store=configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [policyApi.reducerPath]:policyApi.reducer,
        [applicationApi.reducerPath]:applicationApi.reducer,

        [userReducer.name]:userReducer.reducer
    },

    middleware:(mid)=>([...mid(),userApi.middleware,policyApi.middleware,applicationApi.middleware])
})

export default store