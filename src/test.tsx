import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, Button, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import GotoButton from './normal';
import {FeedProps, MessagesProps, TestParamList, TestProps} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import {store} from './store/configureStore';
import {connect} from 'react-redux';

const Stack = createStackNavigator<TestParamList>();

function Feed({navigation, route, count}: FeedProps) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#6a51ae'}]}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
      <Text>
        Feed======{route.params?.title}
        {count}
      </Text>
      <Button
        title="Messages"
        onPress={() => {
          navigation.navigate('Messages', {msg: '发送请求'});
        }}
      />
      <Button
        title="back"
        onPress={() => {
          // navigation.goBack();
          navigation.navigate('Messages');
        }}
      />
    </SafeAreaView>
  );
}
function Messages({navigation, route}: MessagesProps) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" /> */}
      <Text>Messages{route.params?.msg}</Text>
      <Button
        title="back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <GotoButton screenName="Feed" />
      <Button
        title="getState"
        onPress={() => {
          console.log(store.getState());
        }}
      />
    </SafeAreaView>
  );
}
let FeedContainer = connect((state: any) => ({count: state.count}))(Feed);

const Test: React.FC<TestProps> = (props) => {
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
  const {route} = props;
  const [] = useState('123');
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
  const [] = useState(null);

  useFocusEffect(
    useCallback(() => {
      Alert.alert('focused');
      return () => {
        Alert.alert('unfocused');
      };
    }, []),
  );

  // const ThemeContext = useContext(aContext);
  // const {text, test} = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedContainer}
        initialParams={{title: route.params?.name}}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: 'tomato'},
        }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        initialParams={{
          msg: '发送消息',
        }}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
    </Stack.Navigator>
    // <View style={styles.greeting}>
    //   <Text style={styles.colors} selectable>
    //     {test},{text},{ThemeContext.text}
    //   </Text>
    //   <Button
    //     title="Go to Details... again"
    //     onPress={() => navigation.navigate('home')}
    //   />
    //   <Button
    //     title="Update the title"
    //     onPress={() => navigation.setOptions({title: 'Updated!'})}
    //   />
    // </View>
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
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Test;
