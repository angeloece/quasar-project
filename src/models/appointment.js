import CustomInput from "components/CustomInput.vue";
import CustomSelect from "components/CustomSelect.vue";
import { requiredValidator, dateValidator } from "utils/validators";
import { createInputFields, createTableColumns } from "models/functions";
import { collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "src/boot/firebaseConnection";

const model = [
  {
    component: CustomSelect,
    model: "patient_id",
    attrs: {
      label: "Patient",
      rules: [requiredValidator],
      emitValue: true,
      mapOptions: true,
    },
    col: 12,
    field: (row) => row.patient,
    format: (val) => `${val.last_name} ${val.first_name}`,
  },
  {
    component: CustomInput,
    model: "schedule",
    attrs: {
      label: "Schedule",
      mask: "####-##-##",
      rules: [requiredValidator, dateValidator],
      placeholder: "YYYY-MM-DD",
    },
    col: 12,
    format: (val) => (val ? new Date(val).toDateString() : ""),
  },
  {
    component: CustomSelect,
    model: "service_id",
    attrs: {
      label: "Service",
      rules: [requiredValidator],
      emitValue: true,
      mapOptions: true,
    },
    col: 12,
    field: (row) => row.service.label,
  },
];

export const createFields = (overrides = []) => createInputFields(model, overrides);

export const createColumns = () => createTableColumns(model);

export const getAppointments = async () => {
  const querySnapshot = await getDocs(collection(db, "appointments"));

  let appointments = [];
  querySnapshot.forEach((doc) => {
    appointments.push({ ...doc.data(), id: doc.id });
  });

  return appointments;
};

export const createAppointment = async (data) => {
  const docRef = await addDoc(collection(db, "appointments"), data);

  return docRef.id
};

export const updateAppointment = async (id, data) => {
  await setDoc(doc(db, "appointments", id), data);

  return id
};

export const deleteAppointment = async (id, data) => {
  await deleteDoc(doc(db, "appointments", id));

  return id
};
