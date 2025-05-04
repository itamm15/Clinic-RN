import axios from "axios";
import { useEffect, useState } from "react";

export function useGetVisits() {
  const [visits, setVisits] = useState<VisitDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchVisits();
  }, [])

  async function fetchVisits() {
    const visits = await axios.get("http://localhost:5183/api/visit/");

    setVisits(visits.data);
    setLoading(false);
  }

  return { visits, loading };
}
