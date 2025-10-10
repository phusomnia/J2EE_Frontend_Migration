import { queryClient, useMutation, useQuery } from "@/stores/QueryStore";

export function usePosts()
{
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await fetch('https://68da961123ebc87faa30a81f.mockapi.io/api/v1/posts');
            const data = await response.json();

            if (data.length < 30) {
                throw new Error('Too few posts: must be at least 30');
            }

            return data;
        },
        retry: false
    }, queryClient)
}