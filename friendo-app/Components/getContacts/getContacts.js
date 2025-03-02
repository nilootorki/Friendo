import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();

      if (data.length > 0) {
        setContacts(data);
      }
    } else {
      alert('Permission to access contacts was denied');
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const toggleSelection = (contact) => {
    if (selectedContacts.some((c) => c.id === contact.id)) {
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const confirmSelection = () => {
    Alert.alert(
      "Selected Contacts",
      selectedContacts.map((c) => c.name).join(", ") || "No contacts selected"
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelection(item)}
            style={{
              padding: 15,
              marginVertical: 5,
              backgroundColor: selectedContacts.some((c) => c.id === item.id)
                ? "#4CAF50"
                : "#ddd",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              {item.name}
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





