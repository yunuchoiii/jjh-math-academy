import type { ITuition } from "@/app/_service/info";
import { TUITIONS } from "@/app/_constants/info";
import styles from "./Info.module.css";

const TuitionsTable = async () => {
  // NOTE: 현재는 API 대신 로컬 상수 기반으로 렌더링합니다.
  const tuitions = TUITIONS as ITuition[];

  const elementaryTuitions = tuitions.filter((tuition) => tuition.level === "elementary");
  const middleTuitions = tuitions.filter((tuition) => tuition.level === "middle");
  const highTuitions = tuitions.filter((tuition) => tuition.level === "high");

  return <div className={`col-span-12`}>
    <table className={`${styles.tuitionTable} ${styles.desktop} w-full text-center hidden md:table`}>
      <thead className="h-16">
        <tr>
          <th className="bg-[#f3f3f3]">교습 과정</th>
          {elementaryTuitions.map((tuition) => (
            <th key={`${tuition.id}-${tuition.classLevel}-pc`} className="bg-yellow-4">
              {tuition.classLevel}
            </th>
          ))}
          {middleTuitions.map((tuition) => (
            <th key={`${tuition.id}-${tuition.classLevel}-pc`} className="bg-green-4">
              {tuition.classLevel}
            </th>
          ))}
          {highTuitions.map((tuition) => (
            <th key={`${tuition.id}-${tuition.classLevel}-pc`} className="bg-blue-1">
              {tuition.classLevel}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="h-[100px] break-words">
          <td className="bg-[#f3f3f3]">월 교습 시간</td>
          {tuitions.map((tuition) => (
            <td key={`${tuition.id}-${tuition.monthlyHours}-pc`} className="break-words">
              {tuition.monthlyHours.split("×").map((item, index) => (
                <p key={item}><span className={`${index === 0 ? "hidden" : "inline"}`}>×</span> {item}</p>
              ))}
            </td>
          ))}
        </tr>
        <tr className="h-[80px] break-words">
          <td className="bg-[#f3f3f3]">월 교습비</td>
          {tuitions.map((tuition) => (
            <td key={`${tuition.id}-${tuition.monthlyFee}-pc`}>
              {tuition.monthlyFee.toString().slice(0, -4)}만원
            </td>
          ))}
        </tr>
      </tbody>
    </table>
    <table className={`${styles.tuitionTable} ${styles.mobile} w-full text-center table md:hidden`}>
      <thead className="h-10">
        <tr>
          <th>교습 과정</th>
          <th>월 교습 시간</th>
          <th>월 교습비</th>
        </tr>
      </thead>
      <tbody>
        {tuitions.map((tuition) => (
          <tr key={`${tuition.id}-${tuition.classLevel}-mobile`}>
            <td style={{backgroundColor: tuition.level === "elementary" ? "#FFECA8" : tuition.level === "middle" ? "#CDE4BC" : "#d6e3e4"}}>
              {tuition.classLevel}
            </td>
            <td width={"40%"}>
              {tuition.monthlyHours}
            </td>
            <td>
              {tuition.monthlyFee.toString().slice(0, -4)}만원
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex flex-col gap-2 mt-5 text-sm text-[#666]">
      <p>
        * 1개월 이내 교습비 징수 : 1/3 경과 전, 1/2 경과 전으로 구분 반환합니다. (1/2 경과 후 미반환)
      </p>
      <p>
        * 월 교습 시간은 4.2주 기준입니다.
      </p>
    </div>
  </div>
}

export default TuitionsTable;
