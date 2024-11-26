import React from "react";
import { type StyleProp, Text, TouchableOpacity, type ViewStyle } from "react-native";

interface BubbleProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containerStyles?: StyleProp<ViewStyle>;
}


const Bubble = ({
    onPress,
    title,
    textStyles = "",
    containerStyles = null,
}: BubbleProps) => {

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`absolute items-center justify-center rounded-full ${containerStyles}`}
            style={containerStyles}
            onPress={onPress}
        >
            <Text
                className={`${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Bubble;