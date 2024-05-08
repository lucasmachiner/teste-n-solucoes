import { useCallback, useEffect, useState } from "react"
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View, Dimensions } from "react-native"
import { Input } from "../../components/Input"
import { theme } from "../../styles/theme"
import { ArrowIcon } from "../../assets/icons/Arrow"
import { NavigationProp } from "@react-navigation/native"
import { EyeIcon } from "../../assets/icons/Eye"
import { EyeOffIcon } from "../../assets/icons/EyeOff"
import Geolocation from '@react-native-community/geolocation';
import { UserLocationIcon } from "../../assets/icons/UserLocation"
import Geocoder from 'react-native-geocoding';
import { GetCEP } from "../../service/CEP"
import { Button } from "../../components/Button"
import { GetDataStorage, SetItemStorage } from "../../functions/storage"
import DocumentPicker from 'react-native-document-picker';

const ScreenHeight = Dimensions.get("screen").height;

interface Props {
  navigation: NavigationProp<any>
}

interface Endereco {
  numero: string
  logradouro: string
  bairro: string
  cidade: string
  estado: string
  pais: string
  cep: string,
  complemento: string
}

interface RegisterUser {
  nomeCompleto: string,
  email: string,
  senha: string,
  endereco: Endereco,
  foto: string,
  anexo: string
}

export const Register = ({ navigation }: Props) => {

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<RegisterUser>({} as RegisterUser);

  const [currentLocation, setCurrentLocation] = useState<any>(null);

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => Alert.alert("Error", error.message),
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    )
  }

  useEffect(() => {
    if (currentLocation?.latitude && currentLocation?.longitude) {
      Geocoder.from({ latitude: currentLocation.latitude, longitude: currentLocation.longitude })
        .then(json => {
          let numero = json.results[0].address_components[0]?.long_name;
          let logradouro = json.results[0].address_components[1]?.long_name;
          let bairro = json.results[0].address_components[2]?.long_name;
          let cidade = json.results[0].address_components[3]?.long_name;
          let estado = json.results[0].address_components[4]?.short_name;
          let pais = json.results[0].address_components[5]?.long_name;
          let cep = json.results[0].address_components[6]?.long_name;
          setData({
            ...data,
            endereco: {
              ...data.endereco,
              numero: numero,
              logradouro: logradouro,
              bairro: bairro,
              cidade: cidade,
              estado: estado,
              pais: pais,
              cep: cep
            }
          })
        })
        .catch(error => {
          Alert.alert("Error", error)
          console.warn(error)
        });
    }
  }, [currentLocation])

  useEffect(() => {
    if (data?.endereco?.cep?.length === 8) {
      GetCEP(data?.endereco?.cep)
        .then((resp) => {
          setData({
            ...data,
            endereco: {
              ...data.endereco,
              numero: resp?.numero,
              logradouro: resp?.logradouro,
              bairro: resp?.bairro,
              cidade: resp?.localidade,
              estado: resp?.uf,
              cep: resp?.cep
            }
          })
        })
        .catch((e) => {
          console.log("error GetCep", e);
          Alert.alert("Error", e)
        })
    }

  }, [data?.endereco?.cep])

  useEffect(() => {
    GetDataStorage("photo")
      .then((resp) => {
        const photo = resp;
        setData({
          ...data,
          foto: photo
        })
      })
  }, [])


  const selectDoc = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles]
      });
      setData({
        ...data,
        anexo: response.uri
      })

      SetItemStorage({ key: "file", value: response.uri })

    } catch (err) {
      console.log("Error File", err);
    }
  }

  function validate(email: string) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    return !reg.test(email as string);
  }

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: theme.background
      }}
    >
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderBottomWidth: 0.3,
        borderColor: theme.grayLightFont,
        padding: 12,
        marginBottom: 16
      }}>

        <TouchableOpacity
          style={{
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
        <Text
          style={{
            fontSize: 24,
            color: theme.blackFont
          }}
        >Registrar-se</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{
            paddingHorizontal: 12,
            maxHeight: ScreenHeight - 130,
            paddingBottom: 20
          }}
        >
          <View style={{ gap: 8 }}>
            <Input
              placeholder="Nome Completo"
            />
            <Input
              placeholder="Email"
              validate={validate(data.email)}
              onChangeText={(value) => setData({
                ...data,
                email: value
              })}
            />

          </View>
          {/* Senha e Confimar senha */}
          <View
            style={{ paddingVertical: 12 }}
          >
            <View
              style={{
                alignItems: "flex-end",

              }}
            >
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  width: 30,
                  height: 30
                }}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </TouchableOpacity>
            </View>
            <View style={{ gap: 6 }}>
              <Input
                placeholder="Senha"
                secureTextEntry={!showPassword}
              />
              <Input
                placeholder="Confirmar Senha"
                secureTextEntry={!showPassword}
              />
            </View>
          </View>
          {/* ENDEREÇO */}
          <View style={{ gap: 6 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 16, color: theme.blackFont, paddingBottom: 8 }}>Endereço</Text>
              <TouchableOpacity
                onPress={() => getCurrentLocation()}
              >
                <UserLocationIcon />
              </TouchableOpacity>
            </View>
            <Input
              placeholder="CEP"
              value={data?.endereco?.cep}
              onChangeText={(value) => {
                setData({
                  ...data,
                  endereco: { ...data.endereco, cep: value }
                })
              }}
            />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={{ width: "70%" }}>
                <Input
                  placeholder="Loagradouro"
                  value={data?.endereco?.logradouro}

                />
              </View>
              <View style={{ width: "28%" }}>
                <Input
                  placeholder="Número"
                  value={data?.endereco?.numero}
                />
              </View>
            </View>
            <Input
              placeholder="Bairro"
              value={data?.endereco?.bairro}
            />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={{ width: "70%" }}>
                <Input
                  placeholder="Cidade"
                  value={data?.endereco?.cidade}
                />
              </View>
              <View style={{ width: "28%" }}>
                <Input
                  placeholder="Estado"
                  value={data?.endereco?.estado}
                />
              </View>
            </View>
            <Input
              placeholder="Completo"
              value={data?.endereco?.complemento}
              onChangeText={(value) => {
                setData({
                  ...data,
                  endereco: { ...data.endereco, complemento: value }
                })
              }}
            />
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
            paddingVertical: 12
          }}
          >
            <TouchableOpacity style={{
              flexDirection: "row",
              padding: 8,
              backgroundColor: theme.green,
              borderRadius: 8,
              justifyContent: "space-between",
              width: "48%"
            }}
              onPress={() => navigation.navigate("Camera")}
            >
              <Text style={{
                color: theme.white,
                fontWeight: 600,
                textAlignVertical: "center",
                textAlign: "center",
                flex: 1
              }}>
                Tirar Self
              </Text>
              {data?.foto && (
                <Image
                  height={40}
                  width={40}
                  source={{ uri: data?.foto }}
                  style={{
                    borderRadius: 8
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={{
              flexDirection: "row",
              padding: 8,
              backgroundColor: theme.greenLight,
              borderRadius: 8,
              justifyContent: "space-between",
              width: "48%"
            }}
              onPress={() => selectDoc()}
            >
              <Text style={{
                color: theme.white,
                fontWeight: 600,
                textAlignVertical: "center",
                textAlign: "center",
                flex: 1
              }}>
                Anexar
              </Text>
              {data?.anexo && (
                <Image
                  height={40}
                  width={40}

                  source={{ uri: "file:///data/user/0/com.testensolucoes/cache/Camera/444dfc2b-0b78-4dc6-884d-ed3cefc8eb5d.jpg" }}
                  style={{
                    borderRadius: 8
                  }}
                />
              )}
            </TouchableOpacity>
          </View>

          <Button
            styleButton={{
              backgroundColor: theme.blue,
              borderRadius: 8,
              padding: 18

            }}

            title="Registrar-se"
          />

        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  )
} 