import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { db, auth } from "@/firebase"; // adjust path
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "groupChats", "globalChat", "messages"), {
        text: message,
        senderId: auth.currentUser?.uid,
        senderName: auth.currentUser?.displayName || "Anonymous",
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "groupChats", "globalChat", "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Global Chat</Text>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.senderId === auth.currentUser?.uid && { backgroundColor: "#00ad90" }]}>
            <Text style={styles.username}>{item.senderName || item.senderId}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#091858",
  },
  header: {
    padding: 20,
    backgroundColor: "#0b1a3d",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  messageList: {
    padding: 16,
  },
  messageBubble: {
    backgroundColor: "#0b1a3d",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  username: {
    fontWeight: "bold",
    color: "#00ad90",
    marginBottom: 4,
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#0b1a3d",
    backgroundColor: "#091858",
  },
  input: {
    flex: 1,
    backgroundColor: "#0b1a3d",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#fff",
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#00ad90",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});