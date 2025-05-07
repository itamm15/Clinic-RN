import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";

export function useGetPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPayments = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5183/api/payment/");
    setPayments(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPayments();
    }, [])
  );

  return { payments, loading };
}
