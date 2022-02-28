// noinspection JSValidateTypes
import { useEffect } from 'react'
import { FlatList, View, StyleSheet, SafeAreaView } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import { supabase } from '../lib/initSupabase'
import { GlobalStyles } from '../lib/constants'
/** URL polyfill. Required for Supabase queries to work in React Native. */
import 'react-native-url-polyfill/auto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TodoList({ todos, setTodos, fetchTodos }) {
  useEffect(() => {
    fetchTodos()
  }, [])

  const toggleCompleted = async (id, is_complete) => {
    const { data, error } = await supabase
      .from('todos')
      .update({ is_complete: !is_complete })
      .eq('id', id)
      .single()
    if (error) console.log(error)
    else setTodos(todos.map((todo) => (todo.id === id ? data : todo)))
  }

  const deleteTodo = async (id) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
    if (error) console.log('error', error)
    else setTodos(todos.filter((todo) => todo.id !== Number(id)))
  }

  return (
    <View>
      <SafeAreaView style={GlobalStyles.verticallySpaced}>
        <FlatList
          scrollEnabled={true}
          data={todos}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item: todo, index }) => (
            <View style={[styles.row, index % 2 === 0 ? { backgroundColor: '#f7f0ff' } : { backgroundColor: 'white'}  ]}>
              <Checkbox.Item
                label={todo.task}
                status={todo.is_complete ? "checked" : "unchecked"}
                onPress={() => toggleCompleted(todo.id, todo.is_complete)}
                mode="android"
                position="leading"
              />
              <Button
                compact="true"
                onPress={() => deleteTodo(todo.id)}
                mode="text"
                style={{ paddingTop: 2, width: 80 }}
              >
                {/*Delete*/}
                <MaterialCommunityIcons name="trash-can" color={"#4C2F96"} size={25} />
              </Button>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
})