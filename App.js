import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    padding: 5,
  }  
});

const data = [
  { text: 'text1' },
  { text: 'text2' },
  { text: 'text3' }
];

class App extends Component {

  handleItemPress = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <View>

        </View>
      </View>
    );
  }
}

export default App;