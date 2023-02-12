import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

const {width} = Dimensions.get('window');

const PickPhotoBottomSheet = ({refRBSheet}) => {
  const onPressHandle = type => {
    refRBSheet.current.close(type);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => onPressHandle('camera')}>
        <IconButton icon="camera" iconColor="white" size={20} />
        <Text style={styles.itemTitle}>Select From Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => onPressHandle('gallery')}>
        <IconButton icon="sd" iconColor="white" size={20} />
        <Text style={styles.itemTitle}>Select From Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickPhotoBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#041234',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 10,
    marginBottom: 15,
  },

  itemTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.05,
  },
});
