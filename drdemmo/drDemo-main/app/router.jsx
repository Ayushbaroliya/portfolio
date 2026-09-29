import { Navigate, Route, Routes } from "react-router-dom";
import { getCurrentRole } from "@/lib/auth";
import BillingDashboard from "./billing/page";
import DoctorDashboard from "./doctor/page";
import LoginPage from "./login/page";
import ReceptionistDashboard from "./receptionist/page";
function ProtectedRoute({ role, children }) {
    return getCurrentRole() === role ? children : <Navigate to="/login" replace/>;
}
export default function AppRouter() {
    return (<Routes>
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/billing" element={<ProtectedRoute role="billing"><BillingDashboard /></ProtectedRoute>}/>
      <Route path="/doctor" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>}/>
      <Route path="/receptionist" element={<ProtectedRoute role="receptionist"><ReceptionistDashboard /></ProtectedRoute>}/>
      <Route path="*" element={<Navigate to="/login" replace/>}/>
    </Routes>);
}
