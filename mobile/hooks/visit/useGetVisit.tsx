import axios from "axios";
import { useEffect, useState } from "react";

export function useGetVisit(id: number) {
  const [visit, setVisit] = useState<VisitDto | null>({} as VisitDto);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // reset state
    setVisit(null)
    setLoading(true)

    // refetch
    fetchVisitById();
  }, [id]);

  async function fetchVisitById() {
    const response = await axios.get(`http://localhost:5183/api/visit/${id}`);
    setVisit(response.data);
    setLoading(false);
  }

  return { visit, loading };
}
