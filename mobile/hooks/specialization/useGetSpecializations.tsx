import axios from "axios";
import { useEffect, useState } from "react";

export function useGetSpecializations() {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSpecializations();
  }, [])

  async function fetchSpecializations() {
    const specializations = await axios.get("http://localhost:5183/api/specialization/");

    setSpecializations(specializations.data);
    setLoading(false);
  }

  return { specializations, loading };
}
