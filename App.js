import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  const [data, setData] = useState({});
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    _toggle();

    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    const temp = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
    setSubscription(temp);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  let { x, y, z } = data;
  return (
    <View style={styles.sensor}>
      <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View>
        <TouchableOpacity onPress={_toggle}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
});

