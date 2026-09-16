import { queryOptions } from "@tanstack/react-query";
import { getSchedule } from "./schedule.functions";

export const scheduleQueryOptions = queryOptions({
  queryKey: ["schedule"],
  queryFn: () => getSchedule(),
  staleTime: 60_000,
});

export type { ScheduleEvent } from "./schedule.functions";
