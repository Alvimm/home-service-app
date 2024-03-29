import { createStackNavigator } from '@react-navigation/stack'
import BookingScreen from '../Screens/BookingScreen/BookingScreen'
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen'

const Stack = createStackNavigator()

export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions ={{headerShown: false}}>
      <Stack.Screen name="bookingScreen" component={BookingScreen} />
      <Stack.Screen name="business-detail" component={BusinessDetailsScreen} />
    </Stack.Navigator>
  )
}