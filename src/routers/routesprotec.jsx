import { Layout } from "@/layout/Layout"
import { Outlet } from "react-router-dom"



const Routesprotec = () => {
    return (
        <>
            <Layout>
                <Outlet/>

            </Layout>

        </>
    )
}

export default Routesprotec
