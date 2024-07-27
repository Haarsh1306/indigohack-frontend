import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate('/signin')
        }
    }, [])
    return (
        <div>
            From Dashboard
        </div>
    )
}