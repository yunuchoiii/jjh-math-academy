"use client"

import JoinBasicForm from '@/app/_components/Auth/Join/JoinBasicForm';
import ReactiveButton from '@/app/_components/Button/ReactiveButton';
import Title from '@/app/_components/Title/Title';
import { UserSavePayload, userService } from '@/app/_service/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  searchParams: {
    userType?: string;
  };
}

const JoinByUserType: FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const userType: "student" | "parent" = searchParams.userType as "student" | "parent";
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<UserSavePayload>();

  const callback = () => {
    router.push("/auth/join/complete");
  }

  const errorCallback = (error: AxiosError) => {
    console.log(error);
    alert("회원가입에 실패했습니다.");
  }

  const onSubmit = async(data: UserSavePayload) => {
    try {
      const res = await userService.join({
        errorCallback,
        data: {
          ...data,
          userType: userType
        },
        userType: "user"
      });
      if (res.userId) {
        //TODO: parent, student 회원가입 추가
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className='sm:w-1/2 w-full sm:min-w-[400px] mx-auto'>
      <Title title={`회원가입 (${userType === "student" ? "학생" : "학부모"})`}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <JoinBasicForm register={register} errors={errors} watch={watch}/>
        <ReactiveButton props={{ type: "submit" }}>
          <div className='w-full h-12 flex items-center justify-center bg-green-1 rounded-2xl text-white NanumSquare text-lg font-bold'>
            회원가입
          </div>
        </ReactiveButton>
      </form>
    </div>
  );
};

export default JoinByUserType;