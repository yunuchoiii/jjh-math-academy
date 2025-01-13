import { infoService, ITuition } from "@/app/_service/info";
import styles from "./Info.module.css";

const TuitionsTable = async () => {
  const tuitions = await infoService.getTuitions() as ITuition[];

  const elementaryTuitions = tuitions.filter((tuition) => tuition.level === "elementary");
  const middleTuitions = tuitions.filter((tuition) => tuition.level === "middle");

  return <div className={`col-span-12`}>
    <table className={`${styles.tuitionTable} ${styles.desktop} w-full text-center hidden md:table`}>
      <thead className="h-16">
        <tr>
          <th className="bg-[#f3f3f3]">교습 과정</th>
          {elementaryTuitions.map((tuition) => (
            <th key={tuition.classLevel} className="bg-yellow-4">{tuition.classLevel}</th>
          ))}
          {middleTuitions.map((tuition) => (
            <th key={tuition.classLevel} className="bg-green-4">{tuition.classLevel}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="h-[100px] break-words">
          <td className="bg-[#f3f3f3]">월 교습 시간</td>
          {elementaryTuitions.map((tuition) => (
            <td key={tuition.monthlyHours}>{tuition.monthlyHours}</td>
          ))}
          {middleTuitions.map((tuition) => (
            <td key={tuition.monthlyHours}>{tuition.monthlyHours}</td>
          ))}
        </tr>
        <tr className="h-[80px] break-words">
          <td className="bg-[#f3f3f3]">월 교습비</td>
          {elementaryTuitions.map((tuition) => (
            <td key={tuition.monthlyFee}>{tuition.monthlyFee.toString().slice(0, -4)}만원</td>
          ))}
          {middleTuitions.map((tuition) => (
            <td key={tuition.monthlyFee}>{tuition.monthlyFee.toString().slice(0, -4)}만원</td>
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
          <tr key={tuition.classLevel}>
            <td style={{backgroundColor: tuition.level === "elementary" ? "#FFECA8" : "#CDE4BC"}}>{tuition.classLevel}</td>
            <td width={"40%"}>{tuition.monthlyHours}</td>
            <td>{tuition.monthlyFee.toString().slice(0, -4)}만원</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-5 text-sm text-[#666]">
      * 1개월 이내 교습비 징수 : 1/3 경과 전, 1/2 경과 전으로 구분 반환. 1/2 경과 후 미반환
    </div>
  </div>
}

export default TuitionsTable;
