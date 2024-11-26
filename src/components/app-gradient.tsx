import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text,View } from "react-native";

const AppGradient = ({
    children,
    colors,
    title,
}: {
    children: any;
    colors: readonly [string, string, ...string[]];
    title: string;
}) => {
    return (
        <LinearGradient colors={colors} className="flex-1">
            <SafeAreaView className="mx-3 h-full">
                <View className='bg-red flex flex-row'>
                    <View>
                        <Link href='/'>
                            <Text className='w-10 flex-1 text-4xl font-bold'> {'<'} </Text>   
                        </Link>
                    </View>
                    <View className='w-3/4 flex-initial'>
                        <Text className='mb-3 mt-1 pl-2 text-left text-3xl font-bold'>
                            {title}
                        </Text>
                    </View>
                </View>
                <View className="pb-16">
                    {children}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default AppGradient;
