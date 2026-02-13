import React, { createContext, Component } from "react";

let firebaseAuth = null;
try {
  // firebase.js does a guarded init; require it if present
  // eslint-disable-next-line global-require
  const mod = require("../firebase");
  firebaseAuth = mod && mod.firebaseAuth ? mod.firebaseAuth : null;
} catch (e) {
  firebaseAuth = null;
}

const AuthContext = createContext();

class AuthProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    if (firebaseAuth) {
      try {
        const { onAuthStateChanged } = require("firebase/auth");
        onAuthStateChanged(firebaseAuth, (u) => {
          if (u) {
            const user = { name: u.email ? u.email.split("@")[0] : "user", email: u.email };
            this.setState({ user });
            try {
              localStorage.setItem("akash_user", JSON.stringify(user));
            } catch (e) {}
          } else {
            this.setState({ user: null });
          }
        });
        return;
      } catch (e) {
        // fallback to local
      }
    }

    try {
      const raw = localStorage.getItem("akash_user");
      const user = raw ? JSON.parse(raw) : null;
      if (user && user.email) this.setState({ user });
    } catch (e) {
      // ignore
    }
  }

  signup = async ({ name, email, password }) => {
    if (firebaseAuth) {
      try {
        const { createUserWithEmailAndPassword } = require("firebase/auth");
        const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const u = res.user;
        const user = { name: name || (u.email ? u.email.split("@")[0] : "user"), email: u.email };
        this.setState({ user });
        return { ok: true, user };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    }

    // Fallback mock
    const user = { name: name || email.split("@")[0], email };
    try {
      localStorage.setItem("akash_user", JSON.stringify(user));
      this.setState({ user });
      return { ok: true, user };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  login = async ({ email, password }) => {
    if (firebaseAuth) {
      try {
        const { signInWithEmailAndPassword } = require("firebase/auth");
        const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const u = res.user;
        const user = { name: u.email ? u.email.split("@")[0] : "user", email: u.email };
        this.setState({ user });
        return { ok: true, user };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    }

    // Mock login: succeed if any email provided
    if (!email) return { ok: false, error: "Email required" };
    const user = { name: email.split("@")[0], email };
    try {
      localStorage.setItem("akash_user", JSON.stringify(user));
      this.setState({ user });
      return { ok: true, user };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  logout = async () => {
    if (firebaseAuth) {
      try {
        const { signOut } = require("firebase/auth");
        await signOut(firebaseAuth);
      } catch (e) {
        // ignore
      }
    }
    try {
      localStorage.removeItem("akash_user");
    } catch (e) {}
    this.setState({ user: null });
  };

  render() {
    const value = {
      user: this.state.user,
      signup: this.signup,
      login: this.login,
      logout: this.logout,
      firebaseEnabled: !!firebaseAuth,
    };
    return <AuthContext.Provider value={value}>{this.props.children}</AuthContext.Provider>;
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
