import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  HomeTabs: {name: string; userToken: any} | undefined;
  SignIn: undefined;
  Test: {name: string; number: Number} | undefined;
  Splash: undefined;
};

export interface HomeTabsProps {
  navigation: StackNavigationProp<RootStackParamList, 'HomeTabs'>;
  route: RouteProp<RootStackParamList, 'HomeTabs'>;
}
export interface TestProps {
  navigation: StackNavigationProp<RootStackParamList, 'Test'>;
  route: RouteProp<RootStackParamList, 'Test'>;
}
export interface RootProps {
  navigation: StackNavigationProp<RootStackParamList, 'SignIn' | 'Splash'>;
  route: RouteProp<RootStackParamList, 'SignIn' | 'Splash'>;
}

export type TestParamList = {
  Feed: {title: string} | undefined;
  Messages: {msg: string} | undefined;
};

export declare type FeedProps = {
  navigation: StackNavigationProp<TestParamList, 'Feed'>;
  route: RouteProp<TestParamList, 'Feed'>;
  count: number;
  dispatch: any;
};
// [extraProps: string]: any
export declare type MessagesProps = StackScreenProps<TestParamList, 'Messages'>;

export type TabParamList = {
  HomeScreen: {title: string} | undefined;
  Profile: {msg: string};
  Settings: {title: string} | undefined;
};
export interface HomeScreenProps {
  navigation: BottomTabNavigationProp<TabParamList, 'HomeScreen'>;
  route: RouteProp<TabParamList, 'HomeScreen'>;
  count: any;
}

export interface SettingsProps {
  // navigation: BottomTabNavigationProp<TabParamList, 'Settings'>;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Settings'>,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<TabParamList, 'Settings'>;
}

/* type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Settings'>,
  StackNavigationProp<RootStackParamList>
>; */
// export interface

export type ProfileParamList = {
  HomeScreen: {title: string} | undefined;
  Profile: {msg: string};
  Settings: {title: string} | undefined;
};
export interface ProfileProps {
  // navigation: BottomTabNavigationProp<ProfileParamList, 'Profile'>;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Profile'>,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<ProfileParamList, 'Profile'>;
}
