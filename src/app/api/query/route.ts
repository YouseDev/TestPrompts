import { NextResponse } from "next/server"

const modelEndpoint = "meta-llama/Meta-Llama-3.1-70B-Instruct"

// Ensure the API key is defined
if (!process.env.API_KEY) {
    throw new Error(
        "Missing Hugging Face API key in environment variables env.local make sure name is API_KEY",
    )
}

export async function POST(request: Request) {
    try {
        const { input } = await request.json()

        // Perform any processing or save the input to a database here
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${modelEndpoint}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: `${input}`,
                }),
            },
        )

        if (!response.ok) {
            const error = await response.json()
            console.error("Error from Hugging Face API:", error)
            return NextResponse.json(
                {
                    error: "Failed to fetch from Hugging Face API",
                    details: error,
                },
                { status: response.status },
            )
        }

        const data = await response.json()

        return NextResponse.json({ message: "successful", output: data })
    } catch (error) {
        console.error("Error processing request:", error)
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 },
        )
    }
}
