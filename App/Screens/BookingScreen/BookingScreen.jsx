import { View, Text, FlatList } from 'react-native'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import BusinessListItem from './../BusinessListByCategoryScreen/BusinessListItem'

export default function BookingScreen() {
  const {user}= useUser()
  const [bookingList, setBookingList] = useState([])

  useEffect(() => {
    user && getUserBookings()
  }
  , [user])
  const getUserBookings = () => {
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then((resp) => {
      setBookingList(resp.bookings)
    })
  }
  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily: 'outfit-medium', fontSize:26}}> My Bookings</Text>
      <View>
        <FlatList data={bookingList} renderItem={({item,index}) =>(
          <BusinessListItem business={item?.businessList} booking={item}/>
        )}/>
      </View>
    </View>
  )
}