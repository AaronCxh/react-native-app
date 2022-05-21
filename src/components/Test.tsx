import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

type Props = {
  name: string;
};
const Test: React.FC<Props> = ({name}) => {
  const [data, setData] = useState<Item>();
  useEffect(() => {
    console.log('========1', data?.AutoID);
  }, [data]);
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Test;
