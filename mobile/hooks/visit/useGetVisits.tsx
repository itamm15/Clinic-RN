import axios from "axios";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useGetVisits() {
  const [visits, setVisits] = useState<VisitDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVisits = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5183/api/visit/");
    setVisits(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchVisits();
    }, [])
  );

  return { visits, loading, refetch: fetchVisits };
}
