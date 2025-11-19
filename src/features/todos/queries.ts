import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api";

export function useGetTodos() {
    return useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });
}