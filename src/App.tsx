import React, {useEffect} from 'react';
import {View, Text, Appearance, useColorScheme, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useMemoizedFn, useSafeState} from 'ahooks';
import {Test} from '@/components';
import {Provider} from 'react-redux';
import store from '@/store';

export default function App() {
  const [theme, setTheme] = useSafeState(Appearance.getColorScheme());
  const themeChange = useMemoizedFn(() => {
    setTheme(Appearance.getColorScheme());
  });

  useEffect(() => {
    console.log(123);
    Appearance.addChangeListener(themeChange);
    return () => Appearance.removeChangeListener(themeChange);
  });
  const onReady = () => {
    console.log('ready123');
  };
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer onReady={onReady}>
          <View>
            <Text>
              {theme}====={colorScheme}
            </Text>
            <Test name="asdas" />
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
