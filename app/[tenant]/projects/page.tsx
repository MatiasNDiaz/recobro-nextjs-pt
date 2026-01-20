export default async function ProjectsPage ({ params }:{ params: {tenant: string} }){
    const {tenant} = await params
    return(
        <>
            <h2>Projects of tenant: {tenant}</h2>
        </>
    );
} 