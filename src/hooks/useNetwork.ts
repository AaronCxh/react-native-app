import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {useMount, useUpdateEffect} from 'ahooks';
import {setNetwork} from '@/actions/utils';

/** 是否联网 */
export default function useNetwork() {
  const dispatch = useDispatch();
  /** 已经包含了网络连接变化情况的监听事件 */
  const netInfo = useNetInfo();
  /**
   * 当连接状态发生改变的时候
   */
  useUpdateEffect(() => {}, [netInfo.isConnected, netInfo.isInternetReachable]);
  /**
   * 一上来就先获取网络连接状态
   */
  useMount(() => {
    NetInfo.fetch().then(
      (state: {isConnected: any; isInternetReachable: any}) => {
        dispatch(setNetwork(state.isConnected));
        console.log('网络状态', state.isConnected);
      },
    );
  });
}
