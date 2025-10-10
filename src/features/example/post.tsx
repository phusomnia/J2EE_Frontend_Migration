import React, {useEffect, useState} from "react";
import Footer from "@/components/footer";
import { usePosts } from "./usePosts"

export default function Posts() {
    const [count, setCount] = useState(0);
    
    const { data, isLoading, isError, error, isFetching, refetch } = usePosts();

    if(isLoading) return <>Loading...</>
    if (isError) {
        return (
        <div>
            <p>Error: {error.message}</p>
            <button onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? 'Retrying...' : 'Retry'}
            </button>
        </div>
        );
    }

    return <>
        <div>{count}</div>
        <button onClick={() => {
            setCount(c => c + 1)
        }}>Click</button>
        <h1>Main Page</h1>

        {data && data.map((e: any) => (
            <div key={e.id}>
                {e.content}
            </div>
        ))}

        <Footer/>
    </>
}
