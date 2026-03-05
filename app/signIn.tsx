import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function App() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginCheck = async () => {
    if (!email || !password) {
      alert("Please enter a valid email and password");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user.uid);
      router.push('/(tabs)');
    } catch (error: any) {
      alert(error.message);
    }
  }
  
  const loginPage = () => {
    router.push('/');
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: 200, height: 200, resizeMode: 'contain' }}
      />

      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry
      />
      <View style={{width:'75%'}}>
        <Button title="Create Account" onPress={loginCheck} color="#00ad90"/>
      </View>
      <View style={{width:'75%', borderColor:'#00061d'}}>
        <Button title="Login to existing account" onPress={loginPage} color="#091858"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#091858",
    color: "#ffffff",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    backgroundColor: "#091858",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#00ad90",
    color: '#fff',
    width: '75%'
  },
});