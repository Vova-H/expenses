import React from 'react';
import {
    Text,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
} from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    variant?: 'primary' | 'outline';
};

const CustomButton: React.FC<Props> = ({
                                           title,
                                           onPress,
                                           loading = false,
                                           disabled = false,
                                           style,
                                           variant = 'primary',
                                       }) => {
    const isOutline = variant === 'outline';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                isOutline ? styles.outline : styles.primary,
                (disabled || loading) && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={isOutline ? '#007AFF' : '#fff'}/>
            ) : (
                <Text style={[styles.text, isOutline && styles.outlineText]}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    primary: {
        backgroundColor: '#007AFF',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    outlineText: {
        color: '#007AFF',
    },
});

export default CustomButton;
