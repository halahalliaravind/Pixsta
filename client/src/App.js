import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar'
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Signup from './screens/Signup'
import CreatPost from './screens/CreatPost'
import UserProfile from './screens/UserProfile'
import SubscribedUserPost from './screens/SubscribeUser'
import {reducer,initialState}  from './reducer/userReducer'
import Reset from './screens/Reset'
import NewPassword from './screens/Newpassword'

export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(typeof(user))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
        if(!history.location.pathname.startsWith('/reset'))
             history.push('/signin')
      }
  },[])
  return(
    <Switch>
      <Route exact path="/">
          <Home />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/creatpost">
            <CreatPost />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/profile/:userid">
            <UserProfile />
          </Route>
          <Route path="/myfollowingpost">
            <SubscribedUserPost />
          </Route>
          <Route exact path="/reset">
            <Reset />
          </Route>
          <Route path="/reset/:token">
            <NewPassword />
          </Route>
      </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
        <Navbar />
        <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
