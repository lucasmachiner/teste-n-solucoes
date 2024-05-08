import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User } from "../screen/User";

const Stack = createNativeStackNavigator();

const RoutesAuth = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          name="User"
          component={User}
          options={{ header: () => null }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default RoutesAuth;