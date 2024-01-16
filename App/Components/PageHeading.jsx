import { View, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native';

export default function PageHeading({title}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>
        {title}
      </Text>
    </View>
  );
}
