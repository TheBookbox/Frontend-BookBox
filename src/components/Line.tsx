interface LineProps {
    className?: string
}

export function Line(props: LineProps){
    return (
        <span className={`block m-auto w-[80%] h-[0.1px] bg-[#1C2738] mt-5 mb-5 max-w-[400px] ${props.className}`}></span>
    )
}