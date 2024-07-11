import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/users";
import baseUrl from "../../service/service";

interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User | null;
  error?: string | null;
  message?: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

const initialState: UserState = {
  loading: false,
  isAuthenticated: false,
};

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LWV4cHJlc3NraXQtMTcxOTkwMzUxNDk5Ni5jbHVzdGVyLTNnNHNjeHQybmpkZDZ1b3ZrcXlmY2FiZ282LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyMDQyODk4MiwiZXhwIjoxNzIwNDMyNTgyfQ.IYd_81SMhx_e0JwHV3Y-SzAvNlqziYVHStNrmwkIU83pjk1uvAz3xeu_N1zsC8DSWOca-akKcwcAaW1WTu_JxVMG1Uu1uScOe7PvEV-H_yA_kNOUblFUgh4i7KIVOeeoeumwaRzqk3PlOC5bQJz_OUhqcDBrRbpZWXvQ3O_AmGjScf9J0wb8JH8VXt3KNnvDGK1XSMEgx3v59teBvgIeO-bJw5I5dq5QR0mxPUAO5Miz7qMgv0LaTIKv9ul_8uVrjHoLYacoa12t0vR7vGv1ImE8jvUeenvggc4QulYepVT591L7KvVVVQ7Y9XO0_JnvH5lGeYXDJ1rD6yJa_Nb0QQ";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/signin`,
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      return data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
      // Handle non-Axios errors here
      return rejectWithValue("An unknown error occurred");
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/signup`,
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      return data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
      // Handle non-Axios errors here
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// load user thunk
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/loaduser`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
      // Handle non-Axios errors here
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// logout user 
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/signout`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
      // Handle non-Axios errors here
      return rejectWithValue("An unknown error occurred");
    }
  }
);


// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async (formData: FormData, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: { "Content-Type": "multipart/form-data" },
//       };
//       const { data } = await axios.post(
//         `${baseUrl}/user/register`,
//         formData,
//         config
//       );
//       return data;
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         if (
//           error.response &&
//           error.response.data &&
//           error.response.data.message
//         ) {
//           return rejectWithValue(error.response.data.message);
//         }
//         return rejectWithValue("An unknown error occurred");
//       }
//       // Handle non-Axios errors here
//       return rejectWithValue("An unknown error occurred");
//     }
//   }
// );



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        clearError(state) {
            state.error = null;
          },
          clearMessage(state) {
            state.message = null;
          },
    },
    extraReducers(builder) {
        builder
        .addCase(loginUser.pending, (state) => {//for login
            state.loading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.message = action.payload.message || "Login successfully";
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as string;
          })

          .addCase(registerUser.pending, (state) => { //register user
            state.loading = true;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.message = action.payload.message || "Check your Email";
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || "an error occurd";
          })
    

          .addCase(loadUser.pending, (state) => {//load user
            state.loading = true;
          })
          .addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
          })
          .addCase(loadUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as string;
          })

          .addCase(logoutUser.pending, (state) => {//load user
            state.loading = true;
          })
          .addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as string;
          })
    
    },
})

export const {clearError,clearMessage} = userSlice.actions

export default userSlice.reducer;