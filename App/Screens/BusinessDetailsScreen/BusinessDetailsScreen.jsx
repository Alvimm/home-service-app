import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    param && setBusiness(param.business);
  }, [param]);

  const onMessageBtnClick = () => {
    Linking.openURL('mailto:'+business?.email+"?subject=I am looking for your Service&body=Hi There,")
  }
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'91%'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtnContainer}
        >
          <Ionicons name="arrow-back-outline" size={30} color={Colors.WHITE} />
        </TouchableOpacity>
        <Image
          source={{ uri: param?.business?.images[0]?.url }}
          style={{ width: '100%', height: 300 }}
        />
        <View style={styles.infoContainer}>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>
            {business?.name}
          </Text>
          <View style={styles.subContainer}>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                color: Colors.PRIMARY,
                fontSize: 20,
              }}
            >
              {business?.contactPerson} 🌟
            </Text>
            <Text
              style={{
                color: Colors.PRIMARY,
                backgroundColor: Colors.PRIMARY_LIGHT,
                fontFamily: 'outfit',
                padding: 5,
                borderRadius: 5,
                fontSize: 14,
              }}
            >
              {business?.category?.name}
            </Text>
          </View>
          <Text
            style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }}
          >
            <Ionicons
              name="ios-location-sharp"
              size={25}
              color={Colors.PRIMARY}
            />
            {business?.address}
          </Text>
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Colors.GRAY,
              marginTop: 20,
              marginBottom: 20,
            }}
          ></View>
          <BusinessAboutMe business={business} />
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Colors.GRAY,
              marginTop: 20,
              marginBottom: 20,
            }}
          ></View>
          <BusinessPhotos business={business} />
        </View>
      </ScrollView>
      <View style={{display: 'flex', flexDirection:'row', margin: 8, gap:8}}>
        <TouchableOpacity style={styles.messageBtn} onPress={()=>onMessageBtnClick()}><Text style={{textAlign:'center', fontFamily:'outfit-medium', color:Colors.PRIMARY, fontSize:18}}>Message</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bookingBtn}><Text style={{textAlign:'center', fontFamily:'outfit-medium', color:Colors.WHITE, fontSize:18}} onPress={()=>setShowModal(true)}>Book now</Text></TouchableOpacity>
      </View>
      <Modal animationType='slide' visible={showModal}>
        <BookingModal businessId={business.id} hideModal={()=> setShowModal(false)}/>
      </Modal>  
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 20,
    marginTop:30
  },
  messageBtn:{
    padding:15,
    backgroundColor:Colors.WHITE,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    flex:1,
  },
  bookingBtn:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    flex:1,
  }});
