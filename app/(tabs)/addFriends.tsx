import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "@/firebase";
import { collection, onSnapshot, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function AddFriendsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const loadedUsers = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.id !== auth.currentUser?.uid);
      setUsers(loadedUsers);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter(user =>
    (user.displayName || user.email).toLowerCase().includes(search.toLowerCase())
  );

  const handleAddFriend = async (friendId: string) => {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) return;

    const chatId = [currentUserId, friendId].sort().join("_");
    const chatRef = doc(db, "directChats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [currentUserId, friendId],
        lastMessage: "",
        timestamp: serverTimestamp(),
      });
    }

    router.push(`/directMessage/${chatId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Friends</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.username}>{item.displayName || item.email}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddFriend(item.id)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#091858",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#0b1a3d",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 16,
  },
  userRow: {
    backgroundColor: "#0b1a3d",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#00ad90",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});