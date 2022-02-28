import { useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "../lib/constants";
import { Button, Text } from 'react-native-paper';
import TodoList from "../components/ToDoList";
import { supabase } from "../lib/initSupabase";

export default function ToDoListScreen({ navigation, route }) {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: false })
    if (error) console.log('error', error)
    else setTodos(todos)
  }

  useEffect(() => {
    fetchTodos()
  }, [route])

  return (
    <View style={GlobalStyles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginBottom: 20
      }}>
        <Text style={GlobalStyles.headerText}>To Do List</Text>
        <Button
          onPress={() => navigation.navigate('CreateToDo')}
          mode="contained"
          style={{ width: 75, height: 38, marginTop: 20 }}
        >
          New
        </Button>
      </View>
      {todos && <TodoList navigation={navigation} todos={todos} setTodos={setTodos} fetchTodos={fetchTodos} />}
      <StatusBar style="auto" />
    </View>
  );
}
