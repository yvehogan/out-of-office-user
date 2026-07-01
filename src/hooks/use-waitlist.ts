import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { WaitlistPayload } from "@/lib/types";
import { createWaitlistEntry } from "@/lib/api/services/waitlist.service";

/**
 * Submit a waitlist entry.
 */
export function useCreateWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { payload: WaitlistPayload }) =>
      createWaitlistEntry(payload),
  });
}
