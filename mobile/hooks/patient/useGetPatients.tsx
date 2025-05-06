import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";

export function useGetPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const fetchPatients = async () => {
        setLoading(true);
        const response = await axios.get("http://localhost:5183/api/patient/");
        setPatients(response.data);
        setLoading(false);
      };

      fetchPatients();
    }, [])
  );

  return { patients, loading };
}
