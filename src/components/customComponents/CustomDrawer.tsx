import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
const {width} = Dimensions.get('screen');

interface CustomDrawerProps extends DrawerContentComponentProps {
  }


const CustomDrawer: React.FC<CustomDrawerProps> = (props) => {
    const bgImgUrl = 'https://img.freepik.com/free-vector/waffles-with-strawberry-ice-cream-background_53876-97603.jpg?w=2000';
    const imgUrl = 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png';
  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground source={{ uri:bgImgUrl }} style={{height: 140}}>
        <Image source={{ uri: imgUrl }} style={styles.userImg} />
      </ImageBackground>
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: (width / 2 - 110),
    bottom: -110 / 2,
    borderWidth: 4,
  },
  drawerListWrapper: {
    marginTop: 65,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
});