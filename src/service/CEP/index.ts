export async function GetCEP(cep: string) {
  try {
    const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    if (data.ok) {
      return data.json();
    } else {
      throw Error;
    }
  } catch (e) {
    console.log(e)
  }
}