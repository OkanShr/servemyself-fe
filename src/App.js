import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import { PrivateRoute } from "./pages/PrivateRoute";
import { useSelector } from "react-redux";
import { UserPage } from "./pages/UserPage/UserPage";
import { ScanTableCode } from "./pages/UserPage/ScanTableCode";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { AdminCraftMenu} from "./pages/AdminPage/AdminCraftMenu";

import { SuperAdminHomePage } from "./pages/SuperAdminPage/SuperAdminHomePage";
import { SuperAdminUserMenu } from "./pages/SuperAdminPage/SuperAdminUserMenu";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { PasswordResetPage } from "./pages/PasswordResetPage/PasswordResetPage";
import { MenuWaitersTray } from "./pages/UserPage/MenuWaitersTray";
import { AdminOrderMenu } from "./pages/AdminPage/AdminOrderMenu";
import { GenerateQR } from "./pages/AdminPage/GenerateQR";
import {ReadQR} from "./pages/AdminPage/ReadQR"
import { HistoryPage } from "./pages/UserPage/HistoryPage";
import { UserHomePage } from "./pages/UserPage/UserHomePage";


function App() {
  const loginDetails = useSelector((state) => state.auth.value);

  const pagesByRole = {
    USER: <UserHomePage />,
    ADMIN: <AdminPage />,
    SUPER_ADMIN: <SuperAdminHomePage />,
  };

  return (
    <div>
      
      <Routes>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={pagesByRole[loginDetails.user.role]} />
          
          <Route path="/superadmin/usermanager" element={<SuperAdminUserMenu/>} />
          
          <Route path="/menu/scantablecode" element={<ScanTableCode/>}/>
          <Route path="/menu/waiterstray" element={<MenuWaitersTray/>}/>
          <Route path="/menu/usermenu" element ={<UserPage/>}/>
          <Route path="/user/history" element ={<HistoryPage/>}/>
          <Route path="/userhomepage" element ={<UserHomePage/>}/>


          <Route path="/admin/ordermenu" element={<AdminOrderMenu/>}/>
          <Route path="/admin/craftmenu" element={<AdminCraftMenu/>} />
          <Route path="/admin/qrgenerator" element={<GenerateQR/>}/>
          <Route path="/admin/qrreader" element={<ReadQR/>}/>

        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
      </Routes>
    </div>
  );
}

export default App;
