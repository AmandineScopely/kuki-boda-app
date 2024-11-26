import { router } from 'expo-router';
//import noviasImage from '../assets/motivo_floral.jpg'
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native'

import Bubble from '@/components/bubble';
import { colors, FocusAwareStatusBar, Text, View } from '@/components/ui';
//import colors from '@/constants/colors';
import { HOME_ICONS_DATA, type HomeIconsType, LANGUAGE } from '@/constants/home-icons-data';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const minRadius = 100;
const radius = windowWidth/3;
const minBubbleRadius = 30;
const bubbleRadius = windowWidth/10;

const bubblePosition = (i: number) => {
  let x = windowWidth/2 - Math.max(bubbleRadius, minBubbleRadius) + Math.round(Math.max(radius, minRadius) * Math.cos(i * 2 * Math.PI / HOME_ICONS_DATA.length));
  let y = windowHeight/2.5 - Math.max(bubbleRadius, minBubbleRadius) + Math.round(Math.max(radius, minRadius) * Math.sin(i * 2 * Math.PI / HOME_ICONS_DATA.length));
  return [x, y];
}

export default function App() {
  //const { data, isPending, isError } = usePosts();

  /*if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }*/

  //const user = auth.currentUser;

  const colorScheme: 'light' | 'dark' | undefined = useColorScheme().colorScheme;
  const styles = styling(colorScheme);

  return (
    <View className='flex-1'>
      <FocusAwareStatusBar />
      {/*<ImageBackground source={noviasImage} resizeMode='cover' className='flex-1'>*/}
          <SafeAreaView className='relative h-full text-center'>
            {/*<TouchableOpacity 
              className='justify-center m-auto' 
              onPress={(() => test(1, 'Lucía'))} // Remove attendee input
            >
              <Text>HELLOOOO</Text>
            </TouchableOpacity>*/}
            
            <View>
              {Object.entries(HOME_ICONS_DATA).map(([_, value]: [string, HomeIconsType]) => (
                <Bubble key={value.id} 
                containerStyles={styles[`bubble${value.id}`]}
                textStyles={colorScheme === 'dark' ? 'text-white' : 'text-black'}
                onPress={() => {
                  router.push(`/${value.slug}` as const); // Type assertion for TypeScript
                }}
                title={`${LANGUAGE === 'ES' ? value.title_ES : value.title_FR}`}
              />
               ))}
               <View style={styles.central}>
                <Text className='text-center text-lg font-bold'>
                  04-07-2026
                </Text>
                <Text className='px-3 text-center text-sm font-bold'>
                  La Selva del Camp
                </Text>
               </View>
            </View>
          </SafeAreaView>
      {/*</ImageBackground>*/}
    </View>
  )
}


const styling = (colorScheme: 'light' | 'dark' | undefined) => 
  StyleSheet.create(
    Object.assign({}, ...HOME_ICONS_DATA.map((x) => ({
      ['bubble'+x.id]: {
        position: 'absolute',
        left: bubblePosition(x.id)[0],
        top: bubblePosition(x.id)[1],
        height: bubbleRadius * 2,
        width: bubbleRadius * 2,
        minHeight: minBubbleRadius * 2,
        minWidth: minBubbleRadius * 2,
        backgroundColor: `${colorScheme === 'dark' ? colors.primary[900] : colors.primary[100]}`,
      }
    })), 
      {
        central: {
          position: 'absolute',
          left: windowWidth/2 - bubbleRadius * 1.5,
          top: windowHeight / 2.5 - bubbleRadius * 1.5,
          height: bubbleRadius * 2 * 1.5,
          width: bubbleRadius * 2 * 1.5,
          minHeight: minBubbleRadius * 2 * 1.5,
          minWidth: minBubbleRadius * 2 * 1.5,
          color: `${colorScheme === 'dark' ? 'white' : 'black'}`,
          backgroundColor: `${colorScheme === 'dark' ? 'black' : 'white'}`,
          borderRadius: 100,
          justifyContent: 'center',
        }
      }
    )
  );

