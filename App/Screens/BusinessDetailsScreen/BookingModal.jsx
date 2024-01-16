import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import { useEffect, useState } from 'react';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import { format } from "date-fns";


export default function BookingModal({businessId, hideModal }) {
  const [selectedDate, setSelectedDate] = useState();
  const [timeList, setTimeList] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const [note, setNote] = useState()
  const {user} = useUser()

  useEffect(() => {
    getTime()
  }, [])

  const getTime = () => {
    const timeList = []
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      })
      timeList.push({
        time: i + ':30 AM'
      })
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ':00 PM'
      })
      timeList.push({
        time: i + ':30 PM'
      })
    }
    setTimeList(timeList)
  }

  const createNewBooking = () => {
    if(!selectedDate || !selectedTime){
      ToastAndroid.show('Please Select Date and Time', ToastAndroid.LONG)
      return
    }
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      time: selectedTime,
      date: format(new Date(selectedDate), 'dd-MMM-yyyy'),
      note: note,
      businessId:businessId
    }
    GlobalApi.createBooking(data).then(resp => {
      ToastAndroid.show('Booking Created Successfully', ToastAndroid.LONG)
      hideModal()
    })
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => hideModal()}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>
            Booking
          </Text>
        </View>

        <Heading text={'Select Date'} />
        <View style={styles.calenderContainer}>
          <CalendarPicker onDateChange={setSelectedDate} textStyle={{ fontFamily: 'outfit-medium' }} width={340} minDate={Date.now()} todayBackgroundColor={Colors.BLACK} selectedDayColor={Colors.PRIMARY} selectedDayTextColor={Colors.WHITE} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Heading text={'Select Time Slot'} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={
              ({ item, index }) => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setSelectedTime(item.time)}>
                  <Text style={[selectedTime == item.time ? styles.selectedTime : styles.unSelectedTime]}>{item.time}</Text>
                </TouchableOpacity>
              )
            } />
        </View>
        <View style={{ marginTop: 20 }}>
          <Heading text={'Any Suggestion Note'} />
          <TextInput placeholder='Note' numberOfLines={4} multiline={true} style={styles.noteTextArea} onChange={(text) => setNote(text)} />
        </View>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={()=> createNewBooking()}>
          <Text style={styles.confirmBtn}>Confirm & Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: 'top',
    padding: 20,
    fontSize: 16,
    fontFamily: 'outfit',
    borderColor: Colors.PRIMARY,
  },
  confirmBtn: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 18,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 10,
    borderRadius: 99,
    elevation: 2,
  },
})