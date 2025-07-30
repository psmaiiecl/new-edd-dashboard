import { useEffect, useState } from "react";
import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import { buildAvanceSemanalPortafolio } from "../../../RecordSchedulingSection/utils/generalTabUtils";

const AvanceSemanalChart = ({ title, rawData = null }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (rawData) {
      setData(
        buildAvanceSemanalPortafolio(rawData?.["portafolio-avance-semanal"])
      );
    }
  }, [rawData]);
  return <CustomColumnChart type={"STACK"} data={data} title={title} />;
};

export default AvanceSemanalChart;
