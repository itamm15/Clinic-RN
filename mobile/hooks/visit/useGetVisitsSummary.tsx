import axios from "axios";
import { useEffect, useState } from "react";

export function useGetVisitsSummary() {
  const [visitsSummary, setVisitsSummary] = useState<VisitSummaryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchVisitsSummary();
  }, [])

  async function fetchVisitsSummary() {
    const visits = await axios.get("http://localhost:5183/api/visit/weekly-summary");

    setVisitsSummary(visits.data);
    setLoading(false);
  }

  return { visitsSummary, loading };
}
