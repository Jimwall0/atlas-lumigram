import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const placeholderUsers = [
  { id: "1", username: "alex_dev" },
  { id: "2", username: "sam_codes" },
  { id: "3", username: "jordan_ui" },
  { id: "4", username: "taylor_react" },
  { id: "5", username: "morgan_ts" },
];

export default function AddFriendsScreen() {
  const [search, setSearch] = useState("");

  const filteredUsers = placeholderUsers.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddFriend = (username: string) => {
    alert(`Friend request sent to ${username}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Friends</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />

      {/* User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.username}>{item.username}</Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddFriend(item.username)}
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