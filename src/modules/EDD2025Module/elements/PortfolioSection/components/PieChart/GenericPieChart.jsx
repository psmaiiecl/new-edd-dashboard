import { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import PieChart from "./PieChart";
import { AuthContext } from "../../../../../../context/AuthContext"; //para manejar el token
//import "./index.css";
const GenericPieChart = ({
  subtitle,
  serviceUrl,
  keyPath,
  dataMapper,
  colors = [],
  height = 400,
  showLegend = true,
}) => {
  const { getToken } = useContext(AuthContext); // Usando el contexto para obtener el token
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    console.log("usando efecto");

    async function fetchData() {
      try {
        const token = await getToken(); // Obtener el token
        const filters = {
          convocatoria: { value: "2025" }, // Ajusta según tu filtro
          estado: { value: "activo" }, // Ajusta segl estado
          nivel: { value: "básico" }, // Ajusta según el nivel
          suspension: { value: "no" }, // Ajusta según la suspensión
        };

        // Usar el token y los filtros como en el ejemplo
        const body = new FormData();
        body.append("convocatoria", filters.convocatoria.value);
        body.append("estado", filters.estado.value);
        body.append("nivel", filters.nivel.value);
        body.append("suspension", filters.suspension.value);

        // Ajustamos la URL para evitar la concatenación incorrecta
        // const URL = `${import.meta.env.VITE_BASE_URL}${serviceUrl}`;

        const response = await axios.post(serviceUrl, body, {
          headers: { t: token },
        });

        // Procesar los datos recibidos ("Respuesta completa:", data) ("Datos anidados keyPath:", nested) ('Datos recibidos:', data);
        const data = response.data;
        const nested = keyPath
          .split(".")
          .reduce((obj, key) => obj?.[key], data);
        const mapped = dataMapper(nested);
        //console.log("mapper", mapped);

        setChartData(mapped);
      } catch (error) {
        console.error(`Error fetching data from ${serviceUrl}`, error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PieChart
      subtitle={subtitle}
      chartData={chartData}
      colors={colors}
      height={height}
      showLegend={showLegend}
    />
  );
};

export default GenericPieChart;
