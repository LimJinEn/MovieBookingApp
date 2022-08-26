import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

//import AppToken from '../../Helper/AppToken';

export const AuthContext = createContext();

//getvalue from login or signup
export const AuthProvider = ({children}) => {
  // const [user, setUser]= useState(null);

  // return(
  //     <AuthContext.Provider value={{user, setUser, login:async (email, password)=>{
  //         try{
  //             await auth().signInWithEmailAndPassword(email,password);

  //         } catch(e){
  //             console.log(e);
  //         }
  //     },
  //     register: async(email,password)=>{
  //         try{
  //             await auth().createUserWithEmailAndPassword(email,password);
  //         }catch(e)
  //         {console.log(e);

  //         }
  //     },
  //     logout: async () =>{
  //     try{
  //         await auth().signOut();
  //     }catch(e)
  //     {console.log(e);}
  // },
  //         }}>
  //         {children}
  //     </AuthContext.Provider>
  // );
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  //this.appToken = new AppToken();
  // this.onSubmit = this.onSubmit.bind(this);
  const [notMatch, setNotMatch] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    // let url = 'http://10.0.2.2:3001/users/login';
    // fetch(url, {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw Error('Error ' + response.status);
    //     }
    //     return response.json();

    //   })
    //   .then(async data => {
    //     if (data.error) {
    //         setNotMatch(true);
    //     //   this.setState({ notMatch: true })
    //     }else{
    //       await this.appToken.saveToken(data.token);

    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    axios
      .post('http://10.0.2.2:3001/users/login', {email, password})
      .then(res => {
        console.log(res.data);
        let userInfo = res.data;
        setUserInfo(userInfo);
        setUserToken(userInfo.token);
        AsyncStorage.setItem('userToken', userInfo.token);
        ///
        // await this.appToken.saveToken(data.token);
      })
      .catch(e => {
        console.log('Login error ${e}');
      });
    // setUserToken('ddsfafadf');
    // axios.post({$})
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
    // this.appToken.deleteToken();
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log('isLogged in error ${e}');
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
