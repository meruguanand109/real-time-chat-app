import React, { useState, useEffect } from "react";
import { firestore, auth } from "./firebase/firebaseConfig";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "") {
      await addDoc(collection(firestore, "messages"), {
        text: newMessage,
        user: user.displayName,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default Chat;
