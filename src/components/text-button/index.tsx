import { Button } from "@mui/material"
import { FC, useEffect, useState } from "react"

interface ITextButton{
    children: React.ReactNode
    onClick: () => void
    isActive?:boolean
}
interface ITextStyle {
    color: string,
    borderBottom?: number,
    borderColor?: string
}
const TextButton:FC<ITextButton> = (props) => {
    const { children, isActive, onClick } = props

    const [styleText, setStyleText] = useState<ITextStyle>({
        color: "white" ,
    })
    useEffect(() => {
        if (isActive) {
            setStyleText((prev) => ({
                ...prev,
                borderBottom: 2,
                borderColor: "white" 
            }))
        }
    },[])
    return (
        <Button sx={styleText} variant="text" onClick={onClick}>
            { children}
        </Button>
    )
}

export default TextButton