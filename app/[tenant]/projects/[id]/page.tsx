export default async function ProjectDetailPage ({ params }:{ params: {id: string, tenant: string} }){
    const {id, tenant} = await params
    return(
        <>
            <h2>Project Detail of tenant {tenant}: {id}</h2>
        </>
    );
} 