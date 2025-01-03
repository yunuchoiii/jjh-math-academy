import { UserSavePayload } from "@/app/_service/user";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import TextField from "../../Input/TextField";

interface JoinBasicFormProps {
  register: UseFormRegister<UserSavePayload>;
  errors: FieldErrors<UserSavePayload>;
  watch: UseFormWatch<UserSavePayload>;
}

const JoinBasicForm = ({ register, errors, watch }: JoinBasicFormProps) => {
  const password = watch("password");

  return (
    <div>
      <TextField 
        label="이름" 
        placeholder="이름을 입력해주세요." 
        inputType="text" 
        register={register('username', { required: true })} 
        error={errors.username}
      />
      <TextField 
        label="이메일" 
        placeholder="이메일을 입력해주세요." 
        inputType="email" 
        register={register('email', { required: true })} 
        error={errors.email}
      />
      <TextField 
        label="비밀번호" 
        placeholder="비밀번호를 입력해주세요." 
        inputType="password" 
        register={register('password', { required: true })} 
        error={errors.password}
      />
      <TextField 
        label="비밀번호 확인" 
        placeholder="비밀번호를 입력해주세요." 
        inputType="password" 
        register={register("confirmPassword", { 
          required: true,
          validate: value => value === password || "비밀번호가 일치하지 않습니다."
        })} 
        error={errors.confirmPassword}
      />
      <TextField 
        label="전화번호" 
        placeholder="전화번호를 입력해주세요." 
        inputType="tel" 
        register={register('phoneNumber', { required: true })} 
        error={errors.phoneNumber}
      />
    </div>
  );
};

export default JoinBasicForm;