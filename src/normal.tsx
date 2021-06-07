import React from 'react';
import {Button, ThemeProvider, colors} from 'react-native-elements';
import * as RootNavigation from './RootNavigation';
import {StyleSheet, View, Dimensions, Platform, PixelRatio} from 'react-native';
const px2dp = (px) => PixelRatio.roundToNearestPixel(px);
//获取屏幕大小
const {width, height} = Dimensions.get('window');
const ScreenWidth = Math.min(width, 540); //判断是否是 iphone Plus
//db数值转化
export function getPixel(num: number, designWidth = 375) {
  return (num * ScreenWidth) / designWidth;
}

type Props = {
  navigation?: any;
  screenName: any;
};
const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};
/* console.log(
  '===============',
  Platform.select({
    default: colors.platform.android,
    ios: colors.platform.ios,
  }),
); */
const GoToButton: React.FC<Props> = ({screenName}) => {
  return (
    <>
      <View style={styles.buttonGroup}>
        <ThemeProvider theme={theme}>
          <Button
            title={`Go to ${screenName}`}
            onPress={() => RootNavigation.navigate(screenName)}
          />
        </ThemeProvider>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: getPixel(100),
    height: 100,
  },
  button: {
    height: 70,
  },
});

export default GoToButton;
