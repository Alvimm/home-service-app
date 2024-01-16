import { View, Text, FlatList } from 'react-native'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import BusinessListItem from './../BusinessListByCategoryScreen/BusinessListItem'

export default function BookingScreen() {
  const { user } = useUser()
  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    user && getUserBookings()
  }
    , [user])
  const getUserBookings = () => {
    setLoading(true)
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then((resp) => {
      setBookingList(resp.bookings)
      setLoading(false)
    })
  }
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 26 }}> My Bookings</Text>
      <View style={{ marginTop: 20 }}>
          <FlatList showsVerticalScrollIndicator={false} data={bookingList} onRefresh={() => getUserBookings()} refreshing={loading} renderItem={({ item, index }) => (
            <BusinessListItem business={item?.businessList} booking={item} />
          )} />
      </View>
    </View>
  )
}