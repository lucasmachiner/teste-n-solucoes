import { Image, Text, TouchableOpacity, View } from "react-native"
import { theme } from "../../styles/theme"
import Logo from "../../assets/image/nsolucoes_digital_logo.jpg"
import { Button } from "../../components/Button"
import { NavigationProp } from "@react-navigation/native"

interface Props {
  navigation: NavigationProp<any>
}

export const Home = ({ navigation }: Props) => {
  return (
    <View style={{
      width: "100%",
      height: "100%",
      flex: 1,
      backgroundColor: "#FFF",
    }}>
      <View style={{
        flex: 0.75,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
      }}>
        <Image
          height={100}
          width={100}
          source={Logo}
        />
        <Text style={{
          fontSize: 24,
          color: theme.blackFont,
          fontWeight: 600
        }}>
          TESTE DEV MOBILE
        </Text>
      </View>
      <View style={{
        flex: 0.25,
        backgroundColor: theme.green,
        elevation: 5,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        justifyContent: "space-between",
        padding: 16
      }}>
        <Text
          style={{
            fontSize: 26,
            color: theme.white,
            fontWeight: 700
          }}>Bem Vindo!</Text>

        <View style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          paddingVertical: 8,
          height: "100%",
          justifyContent: "center"
        }}>
          <Button
            title="Entrar"
            styleButton={{
              backgroundColor: theme.white,
              padding: 16,
              borderRadius: 25,
              width: "100%"
            }}
            styleTitle={{
              color: theme.green,
              fontWeight: 600,
              textAlign: "center",
              fontSize: 18
            }}
            onPress={() => navigation.navigate("Login")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{
              fontSize: 16,
              color: theme.white,
              fontWeight: 500,
              textDecorationLine: 'underline'
            }}>
              Cadastrar-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}