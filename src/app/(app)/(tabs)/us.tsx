import { useRoute } from '@react-navigation/native';
import React from 'react';

import AppGradient from '@/components/app-gradient';
import { colors, View } from '@/components/ui';
import { HOME_ICONS_DATA, type HomeIconsType } from '@/constants/home-icons-data';

const Us = () => {
  const route = useRoute();
  const data: HomeIconsType = HOME_ICONS_DATA.filter(x => x.slug === route.name)[0];

  return (
    <View className='flex-1'>
        <AppGradient 
            colors={['#ffffff', `${colors.primary[100]}`, `${colors.secondary[900]}`]}
            title={data.title_ES}
        >
            <View className='h-full'>
               






            </View>
        </AppGradient>
    </View>
  )
};

export default Us;