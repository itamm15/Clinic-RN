import axios from "axios";
import { useEffect, useState } from "react";

export function useGetPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPatients();
  }, [])

  async function fetchPatients() {
    const patients = await axios.get("http://localhost:5183/api/patient/");

    setPatients(patients.data);
    setLoading(false);
  }

  return { patients, loading };
}
