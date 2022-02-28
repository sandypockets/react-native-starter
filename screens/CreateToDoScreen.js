import { View } from 'react-native'
import { useState } from "react";
import { supabase } from "../lib/initSupabase";
import { useUser } from "../lib/UserContext";
import CreateToDo from "../components/CreateToDo";

export default function CreateToDoScreen({ route, navigation }) {


  return (
    <View>
      <CreateToDo navigation={navigation} />
    </View>
  )
}