import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const { user, isLoading } = useUser();
  const navigation = useNavigation()
  return (
    user && (
      <View style={styles.container}>
        <View style={styles.profileMainContainer}>
          <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('profile')}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text style={{ color: Colors.WHITE, fontFamily: 'outfit' }}>Welcome,</Text>
              <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-medium' }}>
                {user?.fullName}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('booking')}>
            <FontAwesome name="bookmark-o" size={27} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput placeholder='Search' style={styles.textInput} />
          <FontAwesome name="search" style={styles.searchBtn} size={24} color={Colors.PRIMARY} />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 70,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: '85%',
    fontSize: 16,
    fontFamily: 'outfit'
  },
  searchBarContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  searchBtn: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 8,
  }
});
