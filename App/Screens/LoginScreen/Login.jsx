import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import React from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ alignItems: 'center', marginTop:30 }}>
      <Image
        source={require('./../../../assets/images/login.png')}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 27,
            color: Colors.WHITE,
            textAlign: 'center',
            fontFamily:'outfit',
          }}
        >
          Let's find
          <Text style={{  fontFamily:'outfit-bold' }}>
            {' '}
            professional cleaning and repair{' '}
          </Text>
          service
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: Colors.WHITE,
            textAlign: 'center',
            marginTop: 20,
             fontFamily:'outfit',
          }}
        >
          Best app to find services near you which delivery you a professional
          services
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text
            style={{ textAlign:'center', color: Colors.PRIMARY, fontSize: 17,  fontFamily:'outfit-medium'  }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 40,
  },
});
