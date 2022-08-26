import React, {useContext} from "react";
import {Text,View, TouchableOpacity,Image, SafeAreaView} from "react-native";
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';





const CustomDrawer =(props) => {
    const{logout}=useContext(AuthContext);
        return(

            <View style={{flex:1}}>
      <Image source = {require("../../assets/loginbackground.jpg")} style={{height:80, width:80, borderRadius:40, marginBottom:20, marginTop:30, marginLeft:20}} />
      <Text style={{ borderTopWidth:1, borderTopColor:'#ccc'}}></Text>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
                         
      {/*Top Large Image */}
     
            </DrawerContentScrollView>
   
      
            <View style={{padding:20, borderTopWidth:1, borderTopColor:'#ccc'}}>

               
                <TouchableOpacity onPress={()=>{logout()}} style={{paddingVertical:15}}>
                    <Ionicons name="log-out-outline" size={22}/>
                <Text>Logout</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    
}

export default CustomDrawer
