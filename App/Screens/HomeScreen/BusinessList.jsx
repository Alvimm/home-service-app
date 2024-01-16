import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Components/Heading';
import BusinessListItemSmall from './BusinessListItemSmall';

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = () => {
    GlobalApi.getBusinessList().then((resp) => {
      setBusinessList(resp?.businessLists);
    });
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Heading text={'Latest business'} isViewAll={true} />
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>(
          <View style={{marginRight: 10}}>
            <BusinessListItemSmall business={item} />          
          </View>
        )}
      />
    </View>
  );
}