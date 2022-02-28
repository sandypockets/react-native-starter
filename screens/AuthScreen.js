// noinspection JSValidateTypes
import { useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper';
import { GlobalStyles } from '../lib/constants'
import { supabase } from '../lib/initSupabase'

export default function AuthScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUpLoading, setSignUpLoading] = useState(Boolean(false))
  const [signInLoading, setSignInLoading] = useState(Boolean(false))
  const [numOfLoginAttempts, setNumOfLoginAttempts] = useState(Number(0))

  const handleLogin = async (type, email, password) => {
    type === 'LOGIN' ? setSignInLoading(true) : setSignUpLoading(true)
    const { error, user } =
      type === 'LOGIN'
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password })
    if (!error && !user) Alert.alert('Check your email for the login link!')
    if (error) {
      Alert.alert(error.message)
      setSignInLoading(false)
      setSignUpLoading(false)
      setNumOfLoginAttempts(numOfLoginAttempts + 1)
    }
  }

  const resetPassword = async (userEmail) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(userEmail)
    if (data) Alert.alert("Password Reset", "Please check your email for a reset link.")
    if (error) {
      Alert.alert(`That's an error`, error.message)
      console.log(error)
    }
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={{ marginHorizontal: 5 }}>
        <Text style={GlobalStyles.headerText}>React Native Starter</Text>
        <Text style={{ marginBottom: 15 }}>A minimal To Do List app to help bootstrap React Native + Supabase projects, fast.</Text>
        <Text style={GlobalStyles.subHeaderText}>Login or create a new account</Text>
      </View>
      <View style={GlobalStyles.verticallySpaced}>
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="hello@example.com"
          left={<TextInput.Icon name="email" />}
        />
      </View>
      <View style={GlobalStyles.verticallySpaced}>
        <TextInput
          label="Password"
          mode="outlined"
          left={<TextInput.Icon name="lock" />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <View style={[GlobalStyles.verticallySpaced, { marginTop: 20 }]}>
        <Button
          mode="contained"
          disabled={signInLoading}
          loading={signInLoading}
          onPress={() => handleLogin('LOGIN', email, password)}
        >
          Sign in
        </Button>
      </View>
      <View style={GlobalStyles.verticallySpaced}>
        <Button
          mode="contained"
          disabled={signUpLoading}
          loading={signUpLoading}
          onPress={() => handleLogin('SIGNUP', email, password)}
        >
          Sign up
        </Button>
      </View>
      {numOfLoginAttempts > 0 && (
        <View style={[GlobalStyles.verticallySpaced, { marginTop: 25 }]}>
          <Button
            mode="contained"
            disabled={signUpLoading}
            loading={signUpLoading}
            onPress={() => resetPassword(email)}
          >
            Forgot your password?
          </Button>
        </View>
      )}
    </View>
  )
}