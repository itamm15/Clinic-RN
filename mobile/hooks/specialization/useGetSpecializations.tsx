import axios from "axios";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useGetSpecializations() {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSpecializations = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5183/api/specialization/");
    setSpecializations(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchSpecializations();
    }, [])
  );

  return { specializations, loading, refetch: fetchSpecializations };
}
