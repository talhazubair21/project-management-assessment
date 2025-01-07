import { QueryClient } from "@tanstack/react-query";

export const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
