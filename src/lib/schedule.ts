import { queryOptions } from "@tanstack/react-query";
import { getSchedule, type ScheduleEvent } from "./schedule.functions";

export type { ScheduleEvent };

export const scheduleQueryOptions = queryOptions({
  queryKey: ["schedule"],
  queryFn: () => getSchedule(),
  staleTime: 60_000,
});
