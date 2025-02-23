export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            Public Layout
            {children}
        </div>
    );
}
