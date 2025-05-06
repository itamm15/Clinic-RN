import axios from "axios";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useGetVisitsDailySummary(date: string) {
  const [visitsDailySummary, setVisitsDailySummary] = useState<VisitDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVisitsDailySummary = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5183/api/visit/daily-summary", {
      params: { date },
    });
    setVisitsDailySummary(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchVisitsDailySummary();
    }, [date])
  );

  return { visitsDailySummary, loading, refetch: fetchVisitsDailySummary };
}
