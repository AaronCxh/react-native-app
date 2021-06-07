/* 测试 */
import React, {
  useEffect,
  useState,
  useReducer,
  useMemo,
  useContext,
} from 'react';
import {Provider, connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef} from './RootNavigation';
import {View, Button, TextInput} from 'react-native';
import {CheckBox, Icon, Overlay, Text} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Test from './test';
import GotoButton from './normal';
import {
  RootStackParamList,
  TabParamList,
  ProfileProps,
  SettingsProps,
  HomeTabsProps,
} from './types';
import configureStore from './store/configureStore';
import {CounterContainer} from './containers';
const store = configureStore();

console.log('====store====', store.getState());

/* const unsubscribe = store.subscribe(() => {
  console.log('========subscribe', store.getState());
});

store.dispatch({type: 'INCREMENT'});

unsubscribe(); */

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const AuthContext = React.createContext({
  signIn: () => {},
  signOut: () => {},
  signUp: async () => {},
});

/* function Counter({value, onClick, initValue}: any) {
  useEffect(() => {
    onClick({type: 'INITREMENT', value: initValue});
  }, [initValue, onClick]);
  return (
    <>
      <Text>Count: {value}</Text>
      <View>
        <Button
          title="Increment"
          onPress={() => onClick({type: 'INCREMENT'})}
        />
        <Button
          title="Dercement"
          onPress={() => onClick({type: 'DECREMENT'})}
        />
      </View>
    </>
  );
}

const CounterContainer = connect(
  (state: any, ownProps: any) => ({
    value: state.count,
    initValue: ownProps.value,
  }),
  (dispatch) => {
    return {
      onClick: (action: any) => {
        dispatch(action);
      },
    };
  },
)(Counter); */

function HomeScreen() {
  const {signOut} = React.useContext(AuthContext);
  const {userToken} = useContext(TabContext);

  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <SafeAreaView>
      <Text>Signed in!userToken:{userToken}</Text>
      {/* <CounterContainer value={20} /> */}
      <CounterContainer />
      <Button title="Sign out" onPress={signOut} />
      <GotoButton screenName="Settings" />
      <Button
        title="按钮"
        onPress={() => {
          setVisible(!visible);
        }}
      />
      <CheckBox
        containerStyle={{
          padding: 0,
          margin: 0,
          marginLeft: 0,
        }}
        iconType="material"
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
        checkedColor="red"
        checked={checked}
        onPress={() => {
          setChecked(!checked);
        }}
      />
      <Icon name="3d-rotation" />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello from Overlay!</Text>
      </Overlay>
    </SafeAreaView>
  );
}

const TabContext = React.createContext({userToken: ''});
function HomeTabs({route}: HomeTabsProps) {
  return (
    <TabContext.Provider value={{userToken: route.params?.userToken}}>
      <Tab.Navigator
        screenOptions={({route}) => {
          return {
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';
              if (route.name === 'HomeScreen') {
                iconName = focused ? 'add' : 'add-circle';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'list' : 'list-circle-outline';
              } else {
                iconName = focused ? 'list' : 'list-circle-outline';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          };
        }}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          initialParams={{title: 'douBle'}}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{msg: 'dasd'}}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings!',
          }}
          initialParams={{
            title: 'Settings!',
          }}
        />
      </Tab.Navigator>
    </TabContext.Provider>
  );
}
function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({username, password})} />
    </View>
  );
}
function SettingsScreen({navigation, route}: SettingsProps) {
  console.log('SettingsScreen', route.params?.title);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
      <Text>Settings Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate('Test', {
            name: 'from SettingsScreen',
            number: 123,
          })
        }
      />
    </View>
  );
}

function ProfileScreen({navigation, route}: ProfileProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <FocusAwareStatusBar barStyle="dark-content" backgroundColor="red" /> */}
      <Text>Profile Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() =>
          navigation.navigate('Test', {name: 'from ProfileScreen', number: 123})
        }
      />
    </View>
  );
}

// const MyTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'rgb(255, 45, 85)',
//     background: 'rgb(0,0,0)',
//     text: 'rgb(255,255,255)',
//   },
// };

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {isLoading: true, isSignout: false, userToken: null},
  );
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {}
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => {
    return {
      signIn: async (data = {}) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        AsyncStorage.setItem('userToken', 'dummy-auth-token');
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => {
        AsyncStorage.removeItem('userToken');
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    };
  }, []);

  /*  */
  /* const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        console.log('initialUrl', initialUrl);
        if (Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem('stamp');
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };
    if (!isReady) {
      restoreState();
    }
  }, [isReady]);
  if (!isReady) {
    return <ActivityIndicator />;
  } */
  // const routeNameRef = React.useRef();
  // const navigationRef = React.useRef();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#ffffff" /> */}
        <NavigationContainer ref={navigationRef}>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
              {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Splash" component={SplashScreen} />
              ) : state.userToken == null ? (
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{
                    title: 'Sign in',
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
              ) : (
                <Stack.Screen
                  name="HomeTabs"
                  component={HomeTabs}
                  initialParams={{name: 'Home', userToken: state.userToken}}
                  options={{headerShown: false}}
                />
              )}
              <Stack.Screen name="Test" initialParams={{}} component={Test} />
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
