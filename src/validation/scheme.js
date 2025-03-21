import * as Yup from "yup";

const minWords = (min, message) => {
  return Yup.string().test("min-words", message, function (value) {
    if (!value) return true;
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount >= min;
  });
};

const AddNewTaskSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "სათაური უნდა იყოს 3 სიმბოლოზე მეტი")
    .max(255, "სათაური არის ძალიან გრძელი")
    .required("სათაური აუცილებელია"),

  description: minWords(4, "აღწერა უნდა შეიცავდეს მინიმუმ 4 სიტყვას").max(
    255,
    "აღწერა არის ძალიან გრძელი"
  ),

  priority: Yup.string()
    .oneOf(["მაღალი", "საშუალო", "დაბალი"], "არასწორი პრიორიტეტი")
    .required("პრიორიტეტი აუცილებელია"),

  status: Yup.string()
    .oneOf(
      ["დასაწყები", "პროგრესში", "მზად ტესტირებისთვის", "დასრულებული"],
      "არასწორი სტატუსი"
    )
    .required("სტატუსი აუცილებელია"),

  department: Yup.string().required("დეპარტამენტი აუცილებელია"),

  employee: Yup.string().required("პასუხისმგებელი თანამშრომელი აუცილებელია"),

  due_date: Yup.date()
    .min(
      new Date(new Date().setDate(new Date().getDate() + 0.95)),
      "დედლაინი არ უნდა იყოს 24 საათზე ნაკლებ დროში"
    )
    .required("დედლაინი აუცილებელია"),
});

export default AddNewTaskSchema;
