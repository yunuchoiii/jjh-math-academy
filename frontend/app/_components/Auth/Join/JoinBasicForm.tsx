import { JoinPayload } from "@/app/(route)/auth/join/type/page";
import { userService } from "@/app/_service/user";
import { Dispatch, SetStateAction } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import TextField from "../../Input/TextField";
import { useToast } from "../../Toast/ToastProvider";

interface JoinBasicFormProps {
  register: UseFormRegister<JoinPayload>;
  errors: FieldErrors<JoinPayload>;
  watch: UseFormWatch<JoinPayload>;
  isEmailChecked: boolean
  setIsEmailChecked: Dispatch<SetStateAction<boolean>>
}

const JoinBasicForm = ({ register, errors, watch, isEmailChecked, setIsEmailChecked }: JoinBasicFormProps) => {
  const password = watch("password");
  const {addToast} = useToast();

  const checkEmail = async () => {
    if (watch("email") === "") {
      addToast({
        message: "이메일을 입력해주세요.",
        type: "error",
      });
      return;
    }
    try {
      const response = await userService.checkEmail(watch("email"));
      addToast({
        message: response.message,
        type: "success",
      });
      setIsEmailChecked(true);
    } catch (error) {
      console.error(error);
      addToast({
        message: "이미 존재하는 이메일입니다.",
        type: "error",
      });
    }
  }

  return (
    <div>
      <TextField
        label="이메일" 
        placeholder="이메일을 입력해주세요." 
        inputType="email" 
        register={register('email', { required: true })} 
        error={errors.email}
        buttonLabel="중복 확인"
        onButtonClick={() => checkEmail()}
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
        label="이름" 
        placeholder="이름을 입력해주세요." 
        inputType="text" 
        register={register('username', { required: true })} 
        error={errors.username}
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