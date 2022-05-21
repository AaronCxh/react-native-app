import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  PermissionsAndroid,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {TestProps} from './types';
import SYImagePicker from 'react-native-syan-image-picker';

const {width} = Dimensions.get('window');

const Test: React.FC<TestProps> = (props) => {
  let [photos, setPhotos] = useState<any>([]);
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '申请读写手机存储权限',
          message:
            '一个很牛逼的应用想借用你的摄像头，' +
            '然后你就可以拍出酷炫的皂片啦。',
          buttonNeutral: '等会再问我',
          buttonNegative: '不行',
          buttonPositive: '好吧',
        },
      );
      console.log('=====', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('现在你获得摄像头权限了');
      } else {
        console.log('用户并不给你');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // const handleOpenImagePicker = () => {
  //   SYImagePicker.showImagePicker(
  //     {
  //       imageCount: 1,
  //       isRecordSelected: true,
  //       isCrop: true,
  //       showCropCircle: true,
  //       quality: 90,
  //       compress: true,
  //       enableBase64: false,
  //     },
  //     (err, photos) => {
  //       console.log('开启', err, photos);
  //       if (!err) {
  //         setPhotos(photos);
  //       } else {
  //         console.log(err);
  //       }
  //     },
  //   );
  // };

  /**
   * 使用方式sync/await
   * 相册参数暂时只支持默认参数中罗列的属性；
   * @returns {Promise<void>}
   */
  const handleAsyncSelectPhoto = async () => {
    // SYImagePicker.removeAllPhoto()
    try {
      const res = await SYImagePicker.asyncShowImagePicker({
        // allowPickingOriginalPhoto: true,
        isCrop: true,
        imageCount: 8,
        showSelectedIndex: false,
        isGif: true,
        enableBase64: true,
      });
      console.log('关闭', res);
      // 选择成功
      setPhotos([...photos, ...res]);
    } catch (err) {
      console.log(err);
      // 取消选择，err.message为"取消"
    }
  };

  // const handlePromiseSelectPhoto = () => {
  //   SYImagePicker.asyncShowImagePicker({imageCount: 3})
  //     .then((res) => {
  //       console.log(res);
  //       const arr = res.map((v) => {
  //         return v;
  //       });
  //       // 选择成功
  //       setPhotos([...photos, ...arr])
  //     })
  //     .catch((err) => {
  //       // 取消选择，err.message为"取消"
  //     });
  // };

  const handleLaunchCamera = async () => {
    await requestPermission();
    SYImagePicker.openCamera(
      {isCrop: true, showCropCircle: true, showCropFrame: false},
      (err, res) => {
        console.log(err, res);
        if (!err) {
          setPhotos([...photos, ...res]);
        }
      },
    );
  };

  // const handleDeleteCache = () => {
  //   SYImagePicker.deleteCache();
  // };

  // const handleOpenVideoPicker = () => {
  //   SYImagePicker.openVideoPicker(
  //     {allowPickingMultipleVideo: true},
  //     (err, res) => {
  //       console.log(err, res);
  //       if (!err) {
  //         let photos = [...photos];
  //         res.map((v) => {
  //           photos.push({...v, uri: v.coverUri});
  //         });
  //         setPhotos(photos)
  //       }
  //     },
  //   );
  // };
  /* useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (true) {
          console.log(2134564);
          return true;
        } else {
          Alert('123456');
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  ); */
  // const {route} = props;
  /* useEffect(() => {
    navigation.addListener('beforeRemove', (e: any) => {
      console.log(e.data.action);
      if (!hasUnsavedChanges) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          {text: 'Don`t leave', style: 'cancel', onPress: () => {}},
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });
  }, [navigation, hasUnsavedChanges]); */
  return (
    <View style={styles.greeting}>
      <View style={styles.scroll}>
        <Button title={'拍照'} onPress={handleLaunchCamera} />
        <Button title={'选择图片'} onPress={handleAsyncSelectPhoto} />
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.scroll}>
        {photos.map((photo, index) => {
          let source = {uri: photo.uri};
          if (photo.enableBase64) {
            source = {uri: photo.base64};
          }
          return (
            <Image
              key={`image-${index}`}
              style={styles.image}
              source={source}
              resizeMode={'contain'}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  colors: {
    color: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
  },
  btn: {
    backgroundColor: '#FDA549',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 22,
  },
  scroll: {
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  image: {
    margin: 10,
    width: (width - 80) / 3,
    height: (width - 80) / 3,
    backgroundColor: '#F0F0F0',
  },
});

export default Test;
