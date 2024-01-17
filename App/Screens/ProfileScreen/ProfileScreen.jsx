import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useClerk, useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'


export default function ProfileScreen() {
  const navigation = useNavigation()
  const { user } = useUser()
  const { signOut } = useClerk()
  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
      pressEvent: () => navigation.navigate('homeScreen')
    },
    {
      id: 2,
      name: 'My Bookings',
      icon: 'bookmark-sharp',
      pressEvent: () => navigation.navigate('bookingScreen')
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: 'mail',
      pressEvent: () => Linking.openURL(`mailto:${process.env.EXPO_PUBLIC_EMAIL}`)
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'log-out',
      pressEvent: () => signOut()
    }
  ]
  return (
    <View>
      <View style={{ padding: 20, paddingTop: 60, backgroundColor: Colors.PRIMARY, }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, color: Colors.WHITE }}>Profile</Text>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Image source={{ uri: user.imageUrl }} style={{ width: 100, height: 100, borderRadius: 99 }} />
          <Text style={{ fontSize: 26, marginTop: 8, fontFamily: 'outfit-medium', color: Colors.WHITE }}>{user.fullName}</Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontFamily: 'outfit-medium', color: Colors.WHITE }}>{user?.primaryEmailAddress.emailAddress}</Text>
        </View>
      </View>
      <View style={{paddingTop:60}}>
        <FlatList data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={item.pressEvent} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40, paddingHorizontal:80 }}>
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{ fontSize: 20, fontFamily: 'outfit' }}>{item.name}</Text>
            </TouchableOpacity>)}
        />
      </View>
    </View>
  )
}