import ClassInfo from "@/app/_components/Info/ClassInfo";
import Title from "@/app/_components/Title/Title";
import { IMathProgram, infoService } from "@/app/_service/info";

const Section = ({title, children}:{title:string, children:React.ReactNode}) => {
  return <div className="mb-20">
    <div className="text-xl font-bold NanumSquare mb-[30px]">{title}</div>
    <div className="grid grid-cols-12 gap-[30px]">
      {children}
    </div>
  </div>
}

const ClassInfoPage = async () => {
  const classes = await infoService.getPrograms();
  const commonMathClasses = classes.filter((classInfo: IMathProgram) => classInfo.category === "common_math");
  const advancedMathClasses = classes.filter((classInfo: IMathProgram) => classInfo.category === "advanced_math");

  return (
    <div>
      <Title title="수업시간 및 수업료" color="#41B580"/>
      <Section title="교과 수학">
        {commonMathClasses.map((classInfo: IMathProgram) => (
          <ClassInfo key={`${classInfo.category}-${classInfo.id}`} classInfo={classInfo} />
        ))}
      </Section>
      <Section title="심화 수학">
        {advancedMathClasses.map((classInfo: IMathProgram) => (
          <ClassInfo key={`${classInfo.category}-${classInfo.id}`} classInfo={classInfo} />
        ))}
      </Section>
    </div>
  );
}

export default ClassInfoPage;