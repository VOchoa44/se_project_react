import { useCallback, useState } from "react";

export function useFormWithValidation(
  defaultValues = {},
  validationRules = {},
) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateField = useCallback(
    (name, value) => {
      if (validationRules[name]) {
        return validationRules[name](value);
      }
      return "";
    },
    [validationRules],
  );

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    const updatedValues = { ...values, [name]: value };

    setValues(updatedValues);

    const formIsValid = Object.keys(validationRules).every((fieldName) => {
      return !validateField(fieldName, updatedValues[fieldName]);
    });

    setIsValid(formIsValid);

    if (hasSubmitted) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = useCallback(
    (currentValues) => {
      const newErrors = {};
      let formIsValid = true;

      Object.keys(validationRules).forEach((fieldName) => {
        const error = validateField(fieldName, currentValues[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          formIsValid = false;
        }
      });

      setErrors(newErrors);
      setIsValid(formIsValid);
      return formIsValid;
    },
    [validateField],
  );

  const handleSubmit = useCallback(() => {
    setHasSubmitted(true);
    return validateForm(values);
  }, [values, validateForm]);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setHasSubmitted(false);
    },
    [],
  );

  return {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    handleSubmit,
    hasSubmitted,
  };
}
