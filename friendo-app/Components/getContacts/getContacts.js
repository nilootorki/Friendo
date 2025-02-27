import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

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

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Contacts List</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            {item.phoneNumbers?.map((phone, index) => (
              <Text key={index}>{phone.number}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default ContactsList;





