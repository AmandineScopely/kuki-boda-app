//import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';

import { colors } from '@/components/ui';
//import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
//import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { HOME_ICONS_DATA, type HomeIconsType, LANGUAGE } from '@/constants/home-icons-data';


const getTabLabel = (slug: string, language: string): string => {
    const iconData = HOME_ICONS_DATA.find((item: HomeIconsType) => item.slug === slug) || { title_ES: '', title_FR: ''};
    return language === 'ES' ? iconData?.title_ES : iconData?.title_FR;
  };

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
                    tabBarLabel: getTabLabel(item.slug, LANGUAGE),
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
