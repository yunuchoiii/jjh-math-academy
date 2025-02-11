import { JoinPayload } from "@/app/(route)/auth/join/form/page";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import Select from "../../Input/Select";
import TextField from "../../Input/TextField";

interface JoinStudentFormProps {
  register: UseFormRegister<JoinPayload>;
  errors: FieldErrors<JoinPayload>;
  watch: UseFormWatch<JoinPayload>;
  setValue: UseFormSetValue<JoinPayload>;
}

const JoinStudentForm = ({ register, errors, watch, setValue }: JoinStudentFormProps) => {
  const gradeLevels = [
    { value: 1, label: '초등 1학년' },
    { value: 2, label: '초등 2학년' },
    { value: 3, label: '초등 3학년' },
    { value: 4, label: '초등 4학년' },
    { value: 5, label: '초등 5학년' },
    { value: 6, label: '초등 6학년' },
    { value: 7, label: '중학교 1학년' },
    { value: 8, label: '중학교 2학년' },
    { value: 9, label: '중학교 3학년' },
    { value: 10, label: '고등학교 1학년' },
    { value: 11, label: '고등학교 2학년' },
    { value: 12, label: '고등학교 3학년' },
  ];

  return (
    <div>
      <TextField 
        label="학교명" 
        placeholder="학교명을 입력해주세요 (ex. 상계중학교, 상계초등학교 등)" 
        inputType="text" 
        register={register('schoolName', { required: true })} 
        error={errors.schoolName}
      />
      <Select
        label="학년"
        options={gradeLevels}
        onChange={(value) => {
          setValue('gradeLevel', value);
        }}
        value={watch('gradeLevel')}
        error={errors.gradeLevel}
      />
    </div>
  );
};

export default JoinStudentForm;