// import { useEffect, useState } from "react";
// import { DEPENDENCY_LIST } from "../../../data/DependencyList";
// import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
// import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
// import { mappers } from "../../../utils/mapSpecs";
// import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL.JS";
// import {
//   buildAvanceDiario,
//   buildDocentesInscritos,
// } from "../../../utils/utils";

export function useTabGeneral() {
  // const customFetch = useCustomFetch();
  // const [selectedFilter, setSelectedFilter] = useState(DEPENDENCY_LIST[0]);

  // const [charts, setCharts] = useState({
  //   docentes_sugeridos: null,
  //   docentes_agregados: null,
  //   docentes_inscritos: null,
  //   avance_diario: null,
  // });

  // useEffect(() => {
  //   customFetch({
  //     route:
  //       BASE_API_URL_2026 +
  //       "/inscripcion/tab-general/data?dependencia=" +
  //       selectedFilter.value,
  //     shouldCache: true,
  //     method: "GET",
  //   }).then((res) => {
  //     const { data } = res;
  //     setCharts((prev) => ({
  //       ...prev,
  //       docentes_sugeridos: mapPieData(
  //         data.inscripcion_docentes,
  //         mappers.docentes_sugeridos,
  //       ),
  //       docentes_agregados: mapPieData(
  //         data.inscripcion_docentes,
  //         mappers.docentes_agregados,
  //       ),
  //       docentes_inscritos: buildDocentesInscritos(data.inscripcion_docentes),
  //       avance_diario: buildAvanceDiario(
  //         data.avance_diario.avance_2026,
  //         data.avance_diario.avance_2025,
  //       ),
  //     }));
  //     // setAvanceDiario(buildAvanceDiario(data.avance_diario));
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedFilter]);

  // return {
  //   selectedFilter,
  //   setSelectedFilter,
  //   charts,
  // };
}

//ANTES: 320 Lineas
