import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';

export default function BusinessAboutMe({business}) {
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    <View>
      <Heading text={'About me'} />
      <Text
        style={{
          fontFamily: 'outfit',
          lineHeight: 28,
          color: Colors.GRAY,
          fontSize: 16,
        }}
        numberOfLines={isReadMore ? 20 : 5}
      >
        {business.about}
      </Text>
      <TouchableOpacity
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          paddingRight: 7,
        }}
        onPress={() => setIsReadMore(!isReadMore)}
      >
        <Text
          style={{
            fontFamily: 'outfit',
            color: Colors.PRIMARY,
            fontSize: 16,
          }}
        >
          {isReadMore ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
