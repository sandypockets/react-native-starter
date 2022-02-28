import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { GlobalStyles } from "../lib/constants";
import { useUser } from "../lib/UserContext";
import { supabase } from "../lib/initSupabase";

export default function CreateToDo({ navigation }) {
  const [newTaskText, setNewTaskText] = useState('')
  const [newToDoData, setNewToDoData] = useState({})
  const { user } = useUser()

  const addTodo = async (taskText) => {
    const task = taskText.trim()
    if (task.length) {
      const { data, error } = await supabase
        .from('todos')
        .insert({ task, user_id: user.id })
        .single()
      if (error) console.log(error.message)
      else {
        setNewTaskText('')
        setNewToDoData(data)
      }
    }
  }

  return (
    <View style={[GlobalStyles.verticallySpaced, { marginTop: 20, marginBottom: 50, marginHorizontal: 10 }]}>
      <Text style={GlobalStyles.subHeaderText}>
        Create a new To Do
      </Text>
      <TextInput
        label="New todo"
        left={ <TextInput.Icon name="view-list" /> }
        onChangeText={(text) => setNewTaskText(text)}
        value={newTaskText}
        mode="outlined"
      />
      <Button
        mode="contained"
        style={{ height: 50, paddingTop: 7, marginTop: 10 }}
        onPress={() => {
          addTodo(newTaskText).then(() => {
            return navigation.navigate("To Do", {
              newToDoData: newToDoData.id
            })
          }).catch((err) => console.log(err))
        }}
      >
        Add
      </Button>
    </View>
  )
}