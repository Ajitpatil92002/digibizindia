interface RootLayoutProps {
    children: React.ReactNode;
}

export default function layout({ children }: RootLayoutProps) {
    return <>
        <div className="main">
            <div className="gradient" />
        </div>
        {children}
    </>;
}