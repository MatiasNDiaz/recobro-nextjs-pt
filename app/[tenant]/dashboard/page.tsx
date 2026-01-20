export default async function DashboardPage ({ params }:{ params: {tenant: string} }){
    const {tenant} = await params
    return(
        <>
            <h2>Dashboard of tenant: {tenant}</h2>
        </>
    );
} 