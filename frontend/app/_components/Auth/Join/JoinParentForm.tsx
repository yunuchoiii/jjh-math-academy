import { JoinPayload } from "@/app/(route)/auth/join/type/page";
import { IStudent, userService } from "@/app/_service/user";
import { getGradeLevel } from "@/app/_utils";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import TextField from "../../Input/TextField";
import { useToast } from "../../Toast/ToastProvider";

interface JoinParentFormProps {
  setValue: UseFormSetValue<JoinPayload>
  selectedStudent: FormStudent | null;
  setSelectedStudent: (student: FormStudent | null) => void;
}

export interface FormStudent extends IStudent {
  username: string;
  email: string;
}

const JoinParentForm = ({ setValue, selectedStudent, setSelectedStudent }: JoinParentFormProps) => {
  const {addToast} = useToast();

  const [studentList, setStudentList] = useState<FormStudent[]>([]);

  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    if (selectedStudent) {
      setStudentName(selectedStudent.username);
    }
  }, [selectedStudent]);

  useEffect(() => {
    const fetchStudentList = async () => {
      const studentList = await userService.getStudentList();
      setStudentList(studentList.data);
    };
    fetchStudentList();
  }, []);

  const handleStudentSearch = (name: string) => {
    setStudentName(name);
  };

  return (
    <div>
      <TextField 
        label="학생(자녀) 이름" 
        placeholder="학생(자녀) 이름을 입력해주세요" 
        inputType="text"
        onChange={handleStudentSearch}
        buttonLabel="학생 찾기"
        buttonProps={{
          title: "학생 찾기",
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            const student = studentList.find(student => student.username === studentName);
            if (student) {
              setSelectedStudent(student);
            } else if (studentName === "") {
              addToast({
                message: "학생 이름을 입력해주세요.",
                type: "error",
              });
            } else {
              addToast({
                message: "학생을 찾을 수 없습니다. 학생 회원가입 후 이용해주세요.",
                type: "error",
              });
            }
          },
        }}
      />
      {selectedStudent && (
        <div className="flex-1 h-10 px-3 -mt-2 flex items-center rounded-[8px] bg-white text-green-1 shadow-2">
          <div>{selectedStudent.username} ({selectedStudent.schoolName} {getGradeLevel(selectedStudent.gradeLevel)})</div>
        </div>
      )}
    </div>
  );
};

export default JoinParentForm;