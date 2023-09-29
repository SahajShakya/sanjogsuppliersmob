import React from 'react'
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform, View,TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';

const Topbar = () => {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
      };
    const logoUrl = 'https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg';
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer} style={styles.touchable}>
        <Icon
          name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          size={30}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: logoUrl }}
          style={styles.logo}
        />
      </View>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
      },
      touchable: {
        marginRight: 10,
      },
      icon: {

      },
      logoContainer: {
        flex: 0.6
      },
      logo: {
        width: 40,
        height: 40,
        marginVertical: 5,
        objectFit: 'scale-down'
      },
  });

export default Topbar