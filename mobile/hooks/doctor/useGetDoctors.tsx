import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function useGetDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDoctors = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5183/api/doctor/");
    setDoctors(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchDoctors();
    }, [])
  );

  return { doctors, loading };
}
