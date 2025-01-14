import ClassInfo from "@/app/_components/Info/ClassInfo";
import TuitionsTable from "@/app/_components/Info/TuitionsTable";
import Title from "@/app/_components/Title/Title";
import { IMathProgram, infoService } from "@/app/_service/info";

const Section = ({title, children}:{title:string, children:React.ReactNode}) => {
  return <section className="mb-20">
    <div className="text-xl font-bold NanumSquare mb-[30px] text-center sm:text-left">{title}</div>
    <div className="grid grid-cols-12 gap-[30px]">
      {children}
    </div>
  </section>
}

const ClassInfoPage = async () => {
  const classes = await infoService.getPrograms();
  const commonMathClasses = classes.filter((classInfo: IMathProgram) => classInfo.category === "common_math");
  const advancedMathClasses = classes.filter((classInfo: IMathProgram) => classInfo.category === "advanced_math");

  return (
    <div>
      <Title title="수업시간 및 수업료" color="green"/>
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
      <Section title="수업료 안내">
        <TuitionsTable/>
        <div className="col-span-12 bg-[#F2F7F8] rounded-tr-[30px] rounded-bl-[30px] md:rounded-tr-[60px] md:rounded-bl-[60px] py-[20px] px-[30px] mt-5 md:py-[45px] md:px-[70px]">
          <div className="md:text-xl text-base font-bold text-blue-2">
            조재현 수학 학원은 수업시간이 긴 편입니다.
          </div>
          <div className="md:text-base text-sm md:mt-5 mt-2.5 flex flex-col gap-2">
            <div>
              <b>초등 수학은 월 1134~2520분</b>, <b>중등 수학은 월 2520분</b>의 정규수업을 하고 이에 더해 <b>각종 보충 수업</b>까지 진행하고 있습니다.
            </div>
            <div>
              서울특별시 북부교육지원청의 교습소 수업료 책정 기준보다 낮을 정도로 <b>수업 시간에 비해 수업료가 저렴하게 책정</b>되어 있습니다.
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default ClassInfoPage;