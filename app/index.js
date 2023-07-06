import { Redirect } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
  return (
    <Redirect  href='/home' />
  )
}

export default index
