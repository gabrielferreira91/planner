import { createContext, useContext } from "react"

import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

type Variants = "primary" | "secondary"

type ButtonProps = TouchableOpacityProps & {
    variant?: Variants
    isLoading?: boolean
}

const ThemeContext = createContext<{ variants?: Variants }>({})


function Button({ variant = "primary", children, isLoading, ...rest}: ButtonProps) {
    return <TouchableOpacity
        className={clsx(
            "w-full h-11 flex-row items-center justify-center rounded-lg gap-2",
            {
               "bg-lime-400": variant === "primary",
               "bg-zinc-800": variant === "secondary",
            }
        )}
        activeOpacity={0.7}
        disabled={isLoading}
        {...rest}>
            <ThemeContext.Provider value={{ variant }}>
                { isLoading ? <ActivityIndicator />: children}
            </ThemeContext.Provider>
    </TouchableOpacity>
}

function Title({ children }: TextProps) {
    const { variant } = useContext(ThemeContext)
    return <Text>{children}</Text>
}

Button.Title = Title

export { Button }