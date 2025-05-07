import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { DocumentType } from "@/constants/types/DocumentType";

export function useGetDocuments() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDocuments = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:5183/api/document");
    setDocuments(res.data);
    setLoading(false);
  };

  useFocusEffect(useCallback(() => { fetchDocuments(); }, []));

  return { documents, loading };
}
