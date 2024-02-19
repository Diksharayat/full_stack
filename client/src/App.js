import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./component/Forms/Login";
import HomePage from "./component/HomePage/HomePage";
import Register from "./component/Forms/Register";
import AddTransaction from "./component/Forms/AddTransaction";
import Navbar from "./component/Navbar/Navbar";
import AccountDashboard from "./component/Dashboard/AccountDashboard";
import AccountDetails from "./component/Dashboard/AccountDetails";
import AddAccount from "./component/Forms/AddAccount";



function App() {
  
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      {/* path is called prop which is same as attribute. */}
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/add-transaction/:id" element={<AddTransaction/>}/>
    <Route path="/dashboard" element={<AccountDashboard/>}/>
    <Route path="/account-details/:accountID" element={<AccountDetails/>}/>
    <Route path="/dashboard/accounts/create" element={<AddAccount/>}/>
     
      </Routes> 
    
    </BrowserRouter>
  );
}

export default App;
