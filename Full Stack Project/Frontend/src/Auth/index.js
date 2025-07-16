

const Auth = {
    isAuthenticated : false,
    login(cb) {
        this.isAuthenticated = true;
        sessionStorage.setItem("isAuthenticated", "true");
        setTimeout(cb, 100);
    },
    logout(cb) {
        this.isAuthenticated = false;
        sessionStorage.removeItem("isAuthenticated")
        setTimeout(cb, 100);
    },
    isAuthenticatedUser() {
        return sessionStorage.getItem("isAuthenticated") === "true";
    }
};

export default Auth;