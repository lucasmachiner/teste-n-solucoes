import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screen/Home";
import { Login } from "../screen/Login";
import { Register } from "../screen/Register";
import { Camera } from "../components/Camera";

const Stack = createNativeStackNavigator();

const RoutesNotAuth = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ header: () => null }}
      />
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ header: () => null }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ presentation: 'transparentModal', header: () => null }}>
        <Stack.Screen
          options={{ animation: 'slide_from_bottom' }}
          name="Camera"
          component={Camera}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
export default RoutesNotAuth;