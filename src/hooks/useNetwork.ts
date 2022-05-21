import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {useMount, useUpdateEffect} from 'ahooks';

/** 是否联网 */

export function useNetwork() {
  /** 已经包含了网络连接变化情况的监听事件 */
  const netInfo = useNetInfo({
    reachabilityUrl: 'http://authorization.dev.thundersdata.com/v2/api-docs',
    reachabilityTest: async (response: any) => response.status === 200,
    reachabilityLongTimeout: 30 * 1000, // 60s
    reachabilityShortTimeout: 3 * 1000, // 5s
    reachabilityRequestTimeout: 6 * 1000, // 15s
    reachabilityShouldRun: () => true,
  });

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
        console.log('网络状态', state);
      },
    );
  });
}
