import CustomInput from "components/CustomInput.vue";
import CustomSelect from "components/CustomSelect.vue";
import { collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "boot/firebaseConnection";


import {
  requiredValidator,
  phoneValidator,
  nameValidator,
  dateValidator,
  pastDateValidator,
} from "utils/validators";
import { createInputFields, createTableColumns } from "models/functions";
import { emailValidator } from "src/utils/validators";

const model = [
  {
    component: CustomInput,
    model: "last_name",
    attrs: {
      label: "Last Name",
      rules: [requiredValidator, nameValidator],
    },
    col: 6,
  },
  {
    component: CustomInput,
    model: "first_name",
    attrs: {
      label: "First Name",
      rules: [requiredValidator, nameValidator],
    },
    col: 6,
  },
  {
    component: CustomInput,
    model: "middle_name",
    attrs: {
      label: "Middle Name",
      rules: [nameValidator],
    },
    col: 6,
  },
  {
    component: CustomSelect,
    model: "suffix_name",
    attrs: {
      label: "Suffix Name",
      options: ["Jr.", "Sr.", "I", "II", "III", "IV", "V"],
    },
    col: 6,
  },
  {
    component: CustomSelect,
    model: "sex",
    attrs: {
      label: "Sex",
      options: [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
      ],
      rules: [requiredValidator],
      emitValue: true,
      mapOptions: true,
    },
    col: 6,
    format: (val) => (val === "M" ? "Male" : "Female"),
  },
  {
    component: CustomInput,
    model: "birth_date",
    attrs: {
      label: "Date of Birth",
      mask: "####-##-##",
      rules: [requiredValidator, dateValidator, pastDateValidator],
      placeholder: "YYYY-MM-DD",
    },
    col: 6,
    format: (val) => (val ? new Date(val).toDateString() : ""),
  },
  {
    component: CustomInput,
    model: "contact",
    attrs: {
      label: "Contact Number",
      mask: "###########",
      rules: [requiredValidator, phoneValidator],
      placeholder: "09123456789",
    },
    col: 6,
  },
  {
    component: CustomInput,
    model: "email",
    attrs: {
      label: "Email Address",
      rules: [emailValidator],
    },
    col: 6,
  },
];

export const createFields = (overrides = []) => createInputFields(model, overrides);

export const createColumns = () => createTableColumns(model);

export const getPatients = async () => {
  const querySnapshot = await getDocs(collection(db, "patients"));

  let patients = [];
  querySnapshot.forEach((doc) => {
    patients.push({ ...doc.data(), id: doc.id });
  });

  return patients;
};

export const createPatient = async (data) => {
  const docRef = await addDoc(collection(db, "patients"), data);

  return docRef.id
};

export const updatePatient = async (id, data) => {
  await setDoc(doc(db, "patients", id), data);

  return id
};

export const deletePatient = async (id, data) => {
  await deleteDoc(doc(db, "patients", id));

  return id
};
