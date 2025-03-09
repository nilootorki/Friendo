import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import * as Contacts from "expo-contacts";
import axios from "axios";
import { useRoute } from "@react-navigation/native";


const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState({});
  const route = useRoute();
  const { username, password, email } = route.params;

  useEffect(() => {
    const loadContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();
        if (data.length > 0) setContacts(data);
      } else {
        alert("Permission to access contacts was denied");
      }
    };

    loadContacts();
  }, []);

  const handleSelectContact = (contact) => {
    // If already selected, deselect it
    if (selectedContacts[contact.name]) {
      const updatedContacts = { ...selectedContacts };
      delete updatedContacts[contact.name];
      setSelectedContacts(updatedContacts);
      return;
    }

    // Otherwise, show gender selection
    Alert.alert(
      `Select Gender for ${contact.name}`,
      "Choose gender:",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Male", onPress: () => saveContact(contact.name, "Male") },
        { text: "Female", onPress: () => saveContact(contact.name, "Female") },
      ],
      { cancelable: true }
    );
  };

  const saveContact = (name, gender) => {
    setSelectedContacts((prev) => ({
      ...prev,
      [name]: gender,
    }));
  };

  const confirmSelection = async () => {
    const selectedList = Object.entries(selectedContacts).map(([name, gender]) => ({
      name,
      gender
    }));
    if (selectedList.length === 0) {
      Alert.alert(
        "No Contacts Selected",
        "Please select at least one contact."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://172.20.10.2:8000/upload_contacts/",
        {username, password, email, contacts: selectedList}, // Data payload (body)
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      Alert.alert("Response from Server", response.data.message);
    } catch (error) {
      console.error("Error sending data:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Could not send data to the server.");
    };
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectContact(item)}
            style={{
              padding: 15,
              marginVertical: 5,
              backgroundColor: selectedContacts[item.name] ? "#4CAF50" : "#ddd",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              {item.name}{" "}
              {selectedContacts[item.name]
                ? `(${selectedContacts[item.name]})`
                : ""}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={confirmSelection}
        style={{
          backgroundColor: "#007BFF",
          padding: 15,
          marginTop: 20,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
          Confirm Selection
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactsList;
