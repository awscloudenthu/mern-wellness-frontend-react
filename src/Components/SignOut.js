import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "./AuthService";

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            currentUser.signOut();
            console.log("User signed out successfully");
        }
        // Redirect to the sign-in page
        navigate("/signin");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">You have been signed out</h2>
                <p className="text-center mb-4">You have successfully logged out. Please sign in again to continue.</p>
                <div className="d-flex justify-content-center">
                    <button onClick={handleSignOut} className="btn btn-primary w-50">Sign In Again</button>
                </div>
            </div>
        </div>
    );
};

export default SignOut;
