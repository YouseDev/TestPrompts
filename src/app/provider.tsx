"use client"

import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Tajawal } from "next/font/google"

export const customFont = Tajawal({
    weight: ["400", "500", "700", "800"],
    subsets: ["arabic"],
})
const theme = extendTheme({
    fonts: {
        heading: ` ${customFont.style.fontFamily}`,
        body: ` ${customFont.style.fontFamily}`,
    },
})

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
