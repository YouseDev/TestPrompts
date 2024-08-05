import Providers from "./provider"

export const metadata = {
    title: "أختبر برمبت | Prompt test",
    description: "أختبر برمبت بسهولة",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ar" dir="ltr">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
