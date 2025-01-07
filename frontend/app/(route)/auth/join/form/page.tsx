"use client"

import JoinBasicForm from '@/app/_components/Auth/Join/JoinBasicForm';
import JoinParentForm, { FormStudent } from '@/app/_components/Auth/Join/JoinParentForm';
import JoinStudentForm from '@/app/_components/Auth/Join/JoinStudentForm';
import Button from '@/app/_components/Button/Button';
import Title from '@/app/_components/Title/Title';
import { useToast } from '@/app/_components/Toast/ToastProvider';
import { ParentSavePayload, StudentSavePayload, UserSavePayload, userService } from '@/app/_service/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  searchParams: {
    userType?: string;
  };
}

export interface JoinPayload extends UserSavePayload, ParentSavePayload, StudentSavePayload {}

const JoinByUserType: FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const { addToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  // 이메일 중복 체크 여부
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  // 선택된 학생 (부모 회원가입 시 필요)
  const [selectedStudent, setSelectedStudent] = useState<FormStudent | null>(null); 

  // 유저 타입
  const userType: "student" | "parent" = searchParams.userType as "student" | "parent";
  
  // react-hook-form
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<JoinPayload>();

  // 회원가입 완료 후 이동
  const callback = () => {
    router.push(`/auth/join/complete?username=${watch("username")}`);
  }

  // 회원가입 실패 콜백
  const errorCallback = (error: AxiosError) => {
    addToast({
      type: "error",
      message: error.message || `회원가입에 실패했습니다.`,
    })
  }

  // 회원가입 제출
  const onSubmit = async(data: any) => {
    try {
      if (!isEmailChecked) {
        addToast({
          message: "이메일 중복 여부를 확인해주세요.",
          type: "error",
        });
        if (formRef.current) {
          const offsetTop = formRef.current.offsetTop;
          window.scrollTo({ top: offsetTop - 80, behavior: 'smooth' });
        }
        return;
      }
      if (userType === "parent" && !selectedStudent) {
        addToast({
          message: "학생(자녀)을 선택해주세요.",
          type: "error",
        });
        return;
      }
      const res = await userService.join({
        errorCallback,
        data: {
          username: data.username,
          password: data.password,
          email: data.email,
          phoneNumber: data.phoneNumber,
          userType: userType
        } as UserSavePayload,
        userType: "user"
      });
      if (res.userId) {
        if (userType === "parent") {
          const parentRes = await userService.join({
            errorCallback,
            data: {
              userId: res.userId,
              isActive: true
            } as ParentSavePayload,
            userType: userType
          });
          if (selectedStudent) {
            if (parentRes.parentId) {
              await userService.updateStudent({
                userId: selectedStudent.userId,
                data: {
                  parentId: parentRes.parentId
                } as StudentSavePayload,
                callback,
                errorCallback
              });
            }
          } else {
            callback();
          }
        } else if (userType === "student") {
          await userService.join({
            callback,
            errorCallback,
            data: {
              userId: res.userId,
              isActive: true,
              gradeLevel: data.gradeLevel,
              schoolName: data.schoolName
            } as StudentSavePayload,
            userType: userType
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='sm:w-1/2 w-full sm:min-w-[400px] mx-auto'>
      <Title title={`회원가입`} subtitle='조재현 수학학원 홈페이지에 오신 것을 환영합니다!'/>
      {userType === "parent" && (
        <div className='text-base font-bold text-gray-1 mb-5 NanumSquare bg-green-4 bg-opacity-50 rounded-2xl px-5 py-3 leading-relaxed'>
          잠깐! <b>학부모</b>님의 경우, <br/><b>학생(자녀)의 회원가입</b>을 먼저 진행해주세요.
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-[#f7f7f7] rounded-2xl px-5 pb-3 pt-4 mb-5'>
          <JoinBasicForm 
            register={register} 
            errors={errors} 
            watch={watch}
            isEmailChecked={isEmailChecked}
            setIsEmailChecked={setIsEmailChecked}
          />
          {userType === "student" && (
            <JoinStudentForm
              register={register}
              errors={errors}
              watch={watch}
            />
          )}
          {userType === "parent" && (
            <JoinParentForm
              setValue={setValue}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          )}
        </div>
        <Button
          color="green" 
          fullWidth 
          textSize="lg"
          type="submit"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default JoinByUserType;