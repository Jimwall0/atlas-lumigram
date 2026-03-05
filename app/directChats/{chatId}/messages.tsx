import React, { useState, useEffect, useRef } from "react";
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
import { db, auth } from "@/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useSearchParams } from "expo-router";

export default function DirectMessageScreen() {
  const { chatId } = useSearchParams(); // chatId from router
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Load messages in real-time
  useEffect(() => {
    if (!chatId) return;

    const messagesQuery = query(
      collection(db, "directChats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(loadedMessages);

      // Auto-scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Send a new message
  const handleSend = async () => {
    if (!messageText.trim() || !chatId) return;

    try {
      await addDoc(collection(db, "directChats", chatId, "messages"), {
        text: messageText,
        senderId: auth.currentUser?.uid,
        senderName: auth.currentUser?.displayName || "Anonymous",
        timestamp: serverTimestamp(),
      });
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Render each message bubble
  const renderMessage = ({ item }: { item: any }) => {
    const isMine = item.senderId === auth.currentUser?.uid;
    return (
      <View
        style={[
          styles.messageBubble,
          isMine ? styles.myMessage : styles.theirMessage,
        ]}
      >
        {!isMine && <Text style={styles.username}>{item.senderName}</Text>}
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
          value={messageText}
          onChangeText={setMessageText}
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
  messageList: {
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#00ad90",
    alignSelf: "flex-end",
  },
  theirMessage: {
    backgroundColor: "#0b1a3d",
    alignSelf: "flex-start",
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
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