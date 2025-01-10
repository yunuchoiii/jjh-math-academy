"use client"

import { IParent, IStudent, ITeacher, IUser, userService } from "@/app/_service/user";
import { userState } from "@/app/_stores/user";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const UserTypeMap = {
  teacher: {
    title: '선생님',
    icon: "/images/icons/teacher-svg.svg"
  },
  parent: {
    title: '학부모',
    icon: "/images/icons/family-svg.svg"
  },
  student: {
    title: '학생',
    icon: "/images/icons/book-svg.svg"
  }
}

const UserInfoCard = ({userInfo, additionalUserInfo}: {userInfo: IUser, additionalUserInfo: ITeacher | IParent | IStudent | null}) => {
  if (userInfo.userType === 'teacher') {
    return <div>
      <div>{}</div>
    </div>
  }
}

const MyPage = () => {
  const user = useRecoilValue(userState)
  
  const [additionalUserInfo, setAdditionalUserInfo] = useState<ITeacher | IParent | IStudent | null>(null)

  useEffect(() => {
    const getAdditionalUserInfo = async () => {
      switch (user?.userType) {
        case 'teacher':
          const teacherInfo = await userService.getTeacherInfo(user?.userId)
          setAdditionalUserInfo(teacherInfo)
          break
        case 'parent':
          const parentInfo = await userService.getParentInfo(user?.userId)
          setAdditionalUserInfo(parentInfo)
          break
        case 'student':
          const studentInfo = await userService.getStudentInfo(user?.userId)
          setAdditionalUserInfo(studentInfo)
          break
        default:
          break
      }
    }
    getAdditionalUserInfo()
  }, [user?.userType])

  const cardClass = "bg-[#F3F3F3] rounded-[30px] py-[30px] px-[40px]";

  if (!user) return null;

  return <div className="grid grid-cols-12 gap-[30px]">
    <div className={`col-span-2 aspect-square flex items-center justify-center`}>
        <div className="w-full h-full bg-green-3 rounded-full flex items-center justify-center p-[20%]">
          <img 
            src={UserTypeMap[user?.userType].icon} 
            alt={UserTypeMap[user?.userType].title} 
            className="w-full invert"
          />
        </div>
    </div>
    <div className={`${cardClass} col-span-10 flex`}>

      <div className="flex-1">

      </div>
    </div>
    <div className={`${cardClass} col-span-12`}>
      
    </div>
  </div>;
};

export default MyPage;
