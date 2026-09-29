import { demoUsers } from "@/lib/demo-data";
const ROLE_SESSION_KEY = "hospital_user_role";
const validRoles = ["receptionist", "doctor", "billing"];
export function getCurrentRole() {
    if (typeof window === "undefined") {
        return null;
    }
    const value = window.sessionStorage.getItem(ROLE_SESSION_KEY);
    return value && validRoles.includes(value) ? value : null;
}
export function signInDemo(email, password, role) {
    const user = demoUsers.find((entry) => entry.role === role &&
        entry.email.toLowerCase() === email.trim().toLowerCase() &&
        entry.password === password);
    if (!user) {
        return false;
    }
    window.sessionStorage.setItem(ROLE_SESSION_KEY, user.role);
    return true;
}
export function signOutDemo() {
    window.sessionStorage.removeItem(ROLE_SESSION_KEY);
}
