import React from 'react';
import {View, Text, Appearance, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useMemoizedFn, useMount, useSafeState} from 'ahooks';
import {useNetwork} from './hooks/useNetwork';

export default function App() {
  const [theme, setTheme] = useSafeState(Appearance.getColorScheme());
  const themeChange = useMemoizedFn(() => {
    setTheme(Appearance.getColorScheme());
  });

  useMount(() => {
    Appearance.addChangeListener(themeChange);
    return () => Appearance.removeChangeListener(themeChange);
  });
  useNetwork();
  const onReady = () => {
    console.log('ready123');
  };
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer onReady={onReady}>
        <View>
          <Text>
            {theme}====={colorScheme}123
          </Text>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
