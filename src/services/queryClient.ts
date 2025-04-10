import { showMutationError, showQueryError } from '@/core/utils/toast';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity, // Cached data stays fresh
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
            retry: 1,
            retryDelay: attempt => Math.pow(2, attempt) * 1000, // exponential backoff
            onError: (error, query) => {
                console.error(`[Query Error] ${query.queryHash}:`, error);
                showQueryError(error);
            },
        },
        mutations: {
            onError: (error, _variables, _context) => {
                console.error('[Mutation Error]:', error, _variables, _context);
                showMutationError(error);
            },
        },
    },
});
