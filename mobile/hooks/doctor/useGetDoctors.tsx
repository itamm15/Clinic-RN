import axios from "axios";
import { useEffect, useState } from "react";

export function useGetDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDoctors();
  }, [])

  async function fetchDoctors() {
    const doctors = await axios.get("http://localhost:5183/api/doctor/");

    setDoctors(doctors.data);
    setLoading(false);
  }

  return { doctors, loading };
}
