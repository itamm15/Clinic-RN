import axios from "axios";
import { useEffect, useState } from "react";

export function useGetVisitsDailySummary(date: string) {
  const [visitsDailySummary, setVisitsDailySummary] = useState<VisitDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // clear previous state
    setVisitsDailySummary([]);
    setLoading(true);

    // refetch
    fetchVisitsDailySummary();
  }, [date]);

  async function fetchVisitsDailySummary() {
    const visits = await axios.get("http://localhost:5183/api/visit/daily-summary", { params: { date: date } });

    setVisitsDailySummary(visits.data);
    setLoading(false);
  }

  return { visitsDailySummary, loading };
}
