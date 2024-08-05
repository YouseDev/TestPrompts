"use client"

import {
    Box,
    Button,
    Text,
    Heading,
    VStack,
    Spinner,
    Textarea,
    Divider,
    HStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { SearchIcon } from "@chakra-ui/icons"

const Home = () => {
    const [input, setInput] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const [respons, setRespons] = useState("")

    const handleSubmit = async () => {
        setIsDisabled(true)
        const r = await sendInputToApi(input)
        setRespons(r.output[0].generated_text)
        setIsDisabled(false)
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bg="gray.100"
        >
            <VStack w="800px" mt="12" spacing={16}>
                <Heading fontWeight={"bold"} size="3xl">
                    أختبر برمبت
                </Heading>

                <VStack
                    spacing={16}
                    justifyContent={"center"}
                    p="8"
                    w="100%"
                    bg="white"
                    boxShadow={"md"}
                    borderRadius={"lg"}
                >
                    <Textarea
                        minH="300px"
                        name="movieSearch"
                        isDisabled={isDisabled}
                        mt="8"
                        boxShadow={"md"}
                        colorScheme="cyan"
                        w="100%"
                        size="lg"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="وش بخاطرك؟"
                        p="8"
                        fontSize="lg"
                        _placeholder={{ fontSize: "24px", color: "gray.500" }}
                        _focus={{
                            outline: "cyan",
                            boxShadow: "lg",
                            border: "1px solid ",
                            borderColor: "cyan.100",
                        }}
                        sx={{ pt: 8, fontSize: "26px", fontWeight: "500" }} // Ensures font size for the text inside the input
                    ></Textarea>
                    <Button
                        isDisabled={isDisabled}
                        colorScheme="cyan"
                        bg="cyan.300"
                        size="lg"
                        w="100%"
                        onClick={() => handleSubmit()}
                        maxW="38%"
                        minW="300px"
                        h="60px"
                        mb="2"
                        rightIcon={isDisabled ? undefined : <SearchIcon />}
                    >
                        {isDisabled ? (
                            <Spinner />
                        ) : (
                            <Text mt="1" fontSize="26px" fontWeight="700">
                                أرسل
                            </Text>
                        )}
                    </Button>
                    {respons && <Divider />}
                    {respons && (
                        <VStack>
                            <Text textAlign={"left"} w="100%">
                                Prompt:{" "}
                            </Text>
                            <Text
                                bg="blue.100"
                                p="2"
                                lineHeight={2}
                                borderRadius="md"
                                mt="6"
                                fontSize={18}
                                whiteSpace="pre-line"
                            >
                                {"(" + input + ")"}
                            </Text>
                        </VStack>
                    )}
                    {respons && (
                        <VStack>
                            <Text textAlign={"left"} w="100%">
                                Modle output:
                            </Text>
                            <Text
                                bg="green.100"
                                p="2"
                                lineHeight={2}
                                borderRadius="md"
                                mt="6"
                                fontSize={18}
                                whiteSpace="pre-line"
                            >
                                {"(" + respons + ")"}
                            </Text>
                        </VStack>
                    )}
                </VStack>
            </VStack>
        </Box>
    )
}

const sendInputToApi = async (inputValue: string): Promise<any> => {
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

    try {
        const response = await fetch("api/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: inputValue }),
        })

        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json()

        await delay(3000) // Wait for 3 seconds

        return data
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
    }
}

export default Home
