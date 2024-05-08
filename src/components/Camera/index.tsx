import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CamIcon } from '../../assets/icons/Cam';
import { NavigationProp } from '@react-navigation/native';
import { SetItemStorage } from '../../functions/storage';
import { theme } from '../../styles/theme';
import { ArrowIcon } from '../../assets/icons/Arrow';
import { CamOffIcon } from '../../assets/icons/CamOff';

interface Props {
  navigation: NavigationProp<any>
}

export const Camera = ({ navigation }: Props) => {
  const [imageUri, setImageUri] = useState(null);

  const takePicture = async function (camera: any) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    setImageUri(data.uri)
    SetItemStorage({ key: "photo", value: data.uri })
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 999
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 25,
            backgroundColor: theme.white,
            width: 32,
            height: 32,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => navigation.goBack()}
        >
          <ArrowIcon
            width={28}
            heigth={28}
            fill={theme.green}
          />
        </TouchableOpacity>

      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 999,
          alignSelf: 'center',
          display: imageUri ? 'flex' : 'none'
        }}
      >
        <TouchableOpacity onPress={() => {
          setImageUri(null)
        }}
          style={styles.capture}>
          <CamOffIcon />
        </TouchableOpacity>
      </View>


      {imageUri ?
        <ImageBackground style={styles.preview} source={{ uri: imageUri }} />
        : (
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera }) => {
              return (
                <>
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {
                      takePicture(camera)
                    }}
                      style={styles.capture}>
                      <CamIcon />
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          </RNCamera>
        )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 16,
    alignSelf: 'center',
    margin: 20,
  },
});