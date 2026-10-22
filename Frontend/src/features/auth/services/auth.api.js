import axios from "axios";


const authApi = axios.create({
  // baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  baseURL:"/api/auth",
    withCredentials: true,
})

export async function registerApi({ email, fullname, contact, password, isSeller }) {
   try {
     const response = await authApi.post("/register", {
       email,
       fullname,
       contact,
       password,
       isSeller,
     });
     return response.data;
   } catch (error) {
     if (error.response) {
       // Logs the backend's validation error details
       console.error("Validation error details:", error.response.data);
     }
     throw error;
   }
}

export async function loginApi({ email, password }) {
  try {
    const response = await authApi.post("/login", {
      email,
      password
    })
    return response.data
  } catch (error) {
    if (error.response) {
      console.error("Validation error details: ",error.response.data)
    }
    throw error
  }
}

export async function getMe() {
  try {
    const response = await authApi.get("/getMe");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    }
    throw error;
  }
}

