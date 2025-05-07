export type PrescriptionDto = {
  id: number;
  description: string;
  issuedAt: string;
  patient: Patient;
  doctor: Doctor;
};
