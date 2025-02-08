"use client"

import IconButton from "@/app/_components/Button/IconButton";
import useUser from "@/app/_hooks/useUser";
import { IParent, IStudent, ITeacher, IUser } from "@/app/_service/user";

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
  const {user, userInfoByType} = useUser();

  const cardClass = "bg-[#F3F3F3] rounded-[30px] py-[30px] px-[40px]";

  if (!user) return null;

  return <div className="relative">
    <div className="grid grid-cols-12 gap-[30px]">
      <div className={`col-span-2 aspect-square flex items-center justify-center`}>
          <div className="w-full h-full bg-green-3 rounded-full flex items-center justify-center p-[20%]">
            <img 
              src={UserTypeMap[user?.userType as keyof typeof UserTypeMap].icon} 
              alt={UserTypeMap[user?.userType as keyof typeof UserTypeMap].title} 
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
    </div>
    {user?.userType === "teacher" && (userInfoByType as ITeacher)?.isAdmin &&
      <div className="fixed bottom-7 right-7 md:bottom-10 md:right-10">
        <IconButton title="관리자 페이지" link={`/admin`} tooltipPosition="top">
          <i className="fas fa-cog"></i>
        </IconButton>
      </div>
    }
  </div>;
};

export default MyPage;
