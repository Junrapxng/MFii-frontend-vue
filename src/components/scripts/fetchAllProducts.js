import axios from 'axios';



export async function fetchProducts() {
    
  const result = {
    info: null,
    images: null,
    error: null,
  };

  try {
    const [api1Response, api2Response] = await Promise.all([
      axios.get(`${import.meta.env.VITE_APP_PRODUCTSAPIKEY}/plant`),
      axios.get(`${import.meta.env.VITE_APP_PRODUCTSAPIKEY}/todos`),
    ]);

    if (api1Response.status === 200 && api2Response.status === 200) {
      result.info = api1Response.data;
      result.images = api2Response.data;
    } else {
      result.error = new Error("One or both API responses are not OK");
      console.error(
        "API responses:",
        api1Response.status,
        api2Response.status
      );
    }
  } catch (error) {
    result.error = error;
    console.error("Error fetching data:", error);
  }

  return result;
}
