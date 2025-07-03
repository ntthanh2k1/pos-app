import { Field, FieldRequiredIndicator, Input } from "@chakra-ui/react";

const TextInput = ({ label, required, ...res }: any) => {
  return (
    <Field.Root mb="3">
      <Field.Label>
        {label} {required && <FieldRequiredIndicator />}
      </Field.Label>
      <Input {...res} />
    </Field.Root>
  );
};

export default TextInput;
