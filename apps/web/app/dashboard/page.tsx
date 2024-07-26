"use client"
import { useRouter } from "next/navigation";
import { Landing } from "../../components/Landing"
import { useSession } from "next-auth/react";

const dashboard = () =>{
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    if(!session){
        router.push("/")
    }
    return (
        <div>
            <Landing></Landing>
        </div>
    )
} 

export default dashboard