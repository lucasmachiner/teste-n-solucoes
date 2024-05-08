import { View, TouchableOpacity } from "react-native"
import { Input } from "../../components/Input"
import { theme } from "../../styles/theme"
import { Button } from "../../components/Button"
import { ArrowIcon } from "../../assets/icons/Arrow"
import { NavigationProp } from "@react-navigation/native"
import { EyeIcon } from "../../assets/icons/Eye"
import { EyeOffIcon } from "../../assets/icons/EyeOff"
import { useState } from "react"

interface Props {
  navigation: NavigationProp<any>
}

export const Login = ({ navigation }: Props) => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <View style={{
      padding: 12,
      height: "100%",
      width: "100%",
      backgroundColor: theme.background
    }}>
      <TouchableOpacity
        style={{
          // padding: 4,
          borderRadius: 25,
          backgroundColor: theme.green,
          width: 32,
          height: 32,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => navigation.goBack()}
      >
        <ArrowIcon
          width={28}
          heigth={28}
          fill={theme.white}
        />
      </TouchableOpacity>

      <View style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        gap: 12
      }}>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value)
          }}

        />
        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#E7E9EE",
          borderRadius: 3,
        }}>
          <View style={{
            width: "90%"
          }}>
            <Input
              placeholder="Senha"
              onChangeText={() => { }}
              secureTextEntry={!showPassword}
            />
          </View>

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}

          </TouchableOpacity>
        </View>
        <Button
          title="Entrar"
        />
      </View>
    </View>
  )
}