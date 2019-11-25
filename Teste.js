import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';

type Props = {
  navigation: any,
};

const Example = (props: Props) => {
  const [data, setData] = useState(['1', '2', '3']);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch History when refresh is triggered
  useEffect(() => {
    (async () => {
      if (refreshing) {
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve(['1', '2', '3', '4', '5']);
          }, 3000);
        });
        setData(response);
        setRefreshing(false);
      }
    })();
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        data={data}
        keyExtractor={item => item}
        renderItem={({ item }) => <Text style={styles.text}>item</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  text: {
    width: '80%',
    borderWidth: 1,
    margin: 10,
  },
});

export default Example;
