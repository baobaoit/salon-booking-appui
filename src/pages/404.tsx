export const NotFoundPage: React.FC = () => {
    return (
        <div
            className="w-full h-screen text-center relative"
            style={{
                backgroundBlendMode: "screen",
                background: "linear-gradient(90deg, #6B15D3 0%, #6E4CF8 100.31%)",
            }}>
            <div
                className="w-full h-full px-32 flex justify-between flex-col py-16"
            >
                <div>
                    <div className="font-bold text-[250px] leading-[250px] text-white">404</div>
                    <div className="text-white font-medium text-[57px] leading-[60px]">Page not found</div>
                    <div className="text-[30px] text-white leading-[45px] mt-[50px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna.</div>
                </div>
                <div className="flex justify-center mt-8">
                    <img src="/images/img_holder.jpg" alt="logo" />
                </div>
            </div>
            <div
                className="absolute top-0 left-0 w-screen h-screen"
                style={{
                    background: "url(/images/bg_404.png) no-repeat center",
                    mixBlendMode: "screen",
                    backgroundSize: "cover",
                }}
            />
            <div className="absolute top-0 left-0 w-screen h-screen">
                <img src="/images/dot.png" alt="404" className="w-full h-full" />
            </div>
        </div>
    )
}