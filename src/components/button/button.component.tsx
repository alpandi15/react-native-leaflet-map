import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

interface ButtonComponentProps extends ButtonProps {
    size?: 'sm' | 'md'
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({children, mode = 'contained', size = 'md', contentStyle, ...props}) => {
    return (
        <Button
            mode={mode}
            contentStyle={[
                style.button,
                contentStyle,
                size ? style[size] : null,
            ]}
            {...props}
        >
            {children}
        </Button>
    );
};

const style = StyleSheet.create({
    button: {},
    md: {height: 50},
    sm: {height: 40},
});

export default ButtonComponent;
