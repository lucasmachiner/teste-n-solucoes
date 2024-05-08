import AsyncStorage from '@react-native-async-storage/async-storage';

interface SetItemStorageProps {
  key: string,
  value: any
}

export async function SetItemStorage({ key, value }: SetItemStorageProps) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("Error setItem", e);
  }
};



export async function GetDataStorage(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error getItem", e);
  }
};