import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { GetDataStorage } from './src/functions/storage';
import { RoutesAuth, RoutesNotAuth } from './src/routes';
import { theme } from './src/styles/theme';
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyB25DOF2IO7boq2zm4olonlkziGDAEC6Uc");

function App(): React.JSX.Element {
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    GetDataStorage("authSession")
      .then((resp) => {
        setSession(resp)
      })
      .catch((e) => console.log("Error App GetDataStorage", e))
      .finally(() => { setLoading(false) })
  }, [])

  return (
    <NavigationContainer>
      {loading ? (
        <View style={{
          height: "100%",
          width: "100%",
          backgroundColor: theme.green
        }} />
      ) :
        session != null ? <RoutesAuth /> : <RoutesNotAuth />
      }
    </NavigationContainer>
  );
}


export default App;
