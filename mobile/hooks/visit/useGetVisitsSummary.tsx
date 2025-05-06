import axios from "axios";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useGetVisitsSummary() {
  const [visitsSummary, setVisitsSummary] = useState<VisitSummaryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVisitsSummary = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5183/api/visit/weekly-summary");
    setVisitsSummary(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchVisitsSummary();
    }, [])
  );

  return { visitsSummary, loading, refetch: fetchVisitsSummary };
}
