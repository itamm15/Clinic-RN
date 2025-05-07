import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { PrescriptionDto } from "@/constants/types/PrescriptionDto";

export function useGetPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPrescriptions = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5183/api/prescription/");
    setPrescriptions(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPrescriptions();
    }, [])
  );

  return { prescriptions, loading };
}
