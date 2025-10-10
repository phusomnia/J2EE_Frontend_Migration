import { queryClient, QueryClientProvider } from "@/stores/QueryStore";

export default function QueryProvider({ children }: any) {
    return <>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </>
}