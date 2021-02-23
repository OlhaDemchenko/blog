import { Formik, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { MainLayout } from "../../components/main-layout/main-layout";
import { newPost } from "../../store/post.actions";
import styles from "./new-post.module.scss";

export interface NewPostFormData {
  title: string;
  body: string;
}

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  body: yup
    .string()
    .min(15, "Common tell me more! The Body should be 15 characters length...")
    .required("Body is required"),
});

export default function NewPost() {
  const dispatch = useDispatch();
  const handleSubmitForm = (
    values: NewPostFormData,
    { resetForm }: FormikHelpers<NewPostFormData>
  ) => {
    dispatch(newPost(values));
    resetForm();
  };

  return (
    <MainLayout title="New Post">
      <h1>Here you can create a new post</h1>
      <Formik
        initialValues={{
          title: "",
          body: "",
        }}
        onSubmit={handleSubmitForm}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ values, isValid, dirty, errors, touched, handleSubmit }) => {
          const isSubmitDisabled = !dirty || !isValid;
          const handleFormSubmit = () => handleSubmit();

          return (
            <form className={styles.form}>
              <label htmlFor="title" className={styles.label}>
                Title
              </label>
              <Field
                id="title"
                name="title"
                placeholder="Post title"
                className={styles.input}
              />
              {errors.title && touched.title && (
                <p className={styles.error}>{errors.title}</p>
              )}

              <label htmlFor="body" className={styles.label}>
                Body
              </label>
              <Field
                as="textarea"
                rows="5"
                cols="33"
                id="body"
                name="body"
                placeholder="Write here anything you want"
                className={styles.input}
              />
              {errors.body && touched.body && (
                <p className={styles.error}>{errors.body}</p>
              )}

              <button
                onClick={handleFormSubmit}
                disabled={isSubmitDisabled}
                className={styles.submit}
              >
                Submit
              </button>
            </form>
          );
        }}
      </Formik>
    </MainLayout>
  );
}
