import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Examination } from "@/constants/types/ExaminationType";

export function useGetExaminations() {
  const [examinations, setExaminations] = useState<Examination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExaminations = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5183/api/examination");
    setExaminations(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchExaminations();
    }, [])
  );

  return { examinations, loading };
}
