//import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';

import { colors } from '@/components/ui';
//import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
//import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { HOME_ICONS_DATA, type HomeIconsType } from '@/constants/home-icons-data';
import { translate, type TxKeyPath } from '@/lib';


const TabsLayout = () => {
    const hiddenTabbarButtons: string[] = ['dresscode', 'blog'];

  return (
    <Tabs 
        screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: colors.secondary[900],
            tabBarHideOnKeyboard: true,
        }}
    >

    {HOME_ICONS_DATA.map((item: HomeIconsType) => {
        const IconComponent = item.iconComponent;
        return (
            <Tabs.Screen
                key={item.slug}
                name={item.slug}
                options={{
                    tabBarLabel: translate("tabs." + item.slug as TxKeyPath),
                    tabBarIcon: ({ color }) => (
                        <IconComponent name={item.iconName} size={24} color={color} />
                    ),
                    href: hiddenTabbarButtons.includes(item.slug)?null:`/(tabs)/${item.slug}` // This hides the hiddenTabbarButtons buttons from the tab bar.
                }}
            />
        );
    })}

    </Tabs>
  )
};

export default TabsLayout;
