import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

type ScreenName = string;

export const navigationRef = React.createRef<NavigationContainerRef>();

export const isReadyRef = React.createRef();

export function navigate(name: ScreenName, params: {} = {}) {
  navigationRef.current?.navigate(name, params);
}
