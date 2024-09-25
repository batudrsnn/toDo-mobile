import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState('Name');
  const [lastName, setLastName] = useState('Surname');
  const [isEditing, setIsEditing] = useState(false);
  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSaveName = () => {
    setFirstName(tempFirstName);
    setLastName(tempLastName);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profileSection}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        {/* Name Editing Section */}
        {isEditing ? (
          <View style={styles.nameEditSection}>
            <TextInput
              style={styles.nameInput}
              value={tempFirstName}
              onChangeText={setTempFirstName}
              placeholder="First Name"
            />
            <TextInput
              style={styles.nameInput}
              value={tempLastName}
              onChangeText={setTempLastName}
              placeholder="Last Name"
            />
            <TouchableOpacity onPress={handleSaveName} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.profileName}>{`${firstName} ${lastName}`}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Name</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Upload Profile Picture Button */}
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Profile Picture</Text>
      </TouchableOpacity>

      {/* Other Profile Information */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>User Info</Text>
        <Text style={styles.infoText}>Email: example@example.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#F2BF91',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  nameEditSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    fontSize: 18,
    marginRight: 10,
    paddingVertical: 5,
    width: 100,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#81E8F9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  infoSection: {
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});
