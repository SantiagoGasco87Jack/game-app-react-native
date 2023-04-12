import React from 'react';
import { StyleSheet, View, Pressable, Image, Text } from 'react-native'

export default function ToolButton({ icon, label }) {
  
  let textlabel;
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Image source={icon} style={styles.image} />
        {label && <Text style={styles.label}>{label}</Text>}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 22,    
    color: '#F8BC04',
  },
})
