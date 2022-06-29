import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

type Props = {
  name: string;
  isOnline: Boolean;
};
const Test: React.FC<Props> = ({name, isOnline}) => {
  const [data] = useState<Item>();
  useEffect(() => {
    console.log('========1', data?.AutoID);
  }, [data]);
  return (
    <View>
      <Text>{name}</Text>
      <Text>{isOnline ? '在线' : '离线'}</Text>
    </View>
  );
};

export default connect(({isOnline}: DefaultRootState) => ({isOnline}))(Test);
