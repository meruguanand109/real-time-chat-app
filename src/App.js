import React from "react";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged explicitly
import Login from "./Login";
import Chat from "./Chat";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? <Chat user={user} /> : <Login />}
    </div>
  );
}

export default App;
