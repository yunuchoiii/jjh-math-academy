import { JoinPayload } from "@/app/(route)/auth/join/form/page";
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

  const checkEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (watch("email") === "") {
      addToast({
        message: "이메일을 입력해주세요.",
        type: "error",
      });
      setIsEmailChecked(false);
      return;
    }
    if (validateEmail(watch("email")) !== true) {
      addToast({
        message: validateEmail(watch("email")) as string,
        type: "error",
      });
      setIsEmailChecked(false);
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
      setIsEmailChecked(false);
    }
  }

  const validateEmail = (value: string) => {
    if (value === "") {
      return "이메일을 입력해주세요.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "유효한 이메일 형식을 입력해주세요.";
    }
    return true;
  }

  const validatePassword = (value: string) => {
    if (value === "") {
      return "비밀번호를 입력해주세요.";
    }
    if (value.length < 8) {
      return "비밀번호는 8글자 이상이어야 합니다.";
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(value)) {
      return "비밀번호에는 특수문자가 하나 이상 포함되어야 합니다.";
    }
    return true;
  }

  return (
    <div>
      <TextField
        label="이메일" 
        placeholder="이메일을 입력해주세요." 
        inputType="email" 
        register={register('email', { 
          required: "이메일을 입력해주세요.",
          validate: validateEmail
        })} 
        error={errors.email}
        buttonLabel="중복 확인"
        buttonProps={{
          title: "이메일 중복 확인",
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => checkEmail(e),
          className: "bg-green-1 text-white shadow-2 px-3 py-2 rounded-[8px] whitespace-nowrap ml-2 max-w-[100px]"
        }}
      />
      <TextField 
        label="비밀번호" 
        placeholder="비밀번호를 입력해주세요." 
        inputType="password" 
        register={register('password', { 
          required: "비밀번호를 입력해주세요.",
          validate: validatePassword
        })} 
        error={errors.password}
      />
      <TextField 
        label="비밀번호 확인" 
        placeholder="비밀번호를 입력해주세요." 
        inputType="password" 
        register={register("confirmPassword", { 
          required: "비밀번호 확인을 입력해주세요.",
          validate: value => value === password || "비밀번호가 일치하지 않습니다."
        })} 
        error={errors.confirmPassword}
      />
      <TextField 
        label="이름" 
        placeholder="이름을 입력해주세요." 
        inputType="text" 
        register={register('username', { required: "이름을 입력해주세요." })} 
        error={errors.username}
      />
      <TextField 
        label="전화번호" 
        placeholder="전화번호를 입력해주세요." 
        inputType="tel" 
        register={register('phoneNumber', { required: "전화번호를 입력해주세요." })} 
        error={errors.phoneNumber}
      />
    </div>
  );
};

export default JoinBasicForm;