
function AvanceSemanalChart({ BarrasSemanal, containerId = "avance-semanal-portafolio" }) {

    const { data } = BarrasSemanal;

  useEffect(() => {
    Highcharts.setOptions({
      lang: { thousandsSep: "." }
    });
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      style: {
        color: "rgb(102, 102, 102)",
        fontSize: "15px",
        fontWeight: "bold",
      },
    },
    colors: ['#FF5880', '#FF8E53', '#FFD153', '#8FB8FF', '#65D9AB'],
    title: {
      text: "",
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#5157FF",
        fontSize: "35px",
      },
    },
    subtitle: {
      useHTML: true,
      text: "<b>Estado de Procesamiento de las SD Recepcionadas cada día</b>",
      align: "center",
      style: { fontSize: "15px", marginBottom: 10 },
    },
    xAxis: {
      type: "datetime",
      tickInterval: 24 * 3600 * 1000,
      min: Date.UTC(2024, 8, 9), // septiembre es 8 en JS (0-index)
      max: Date.UTC(2024, 11, 11),
      labels: {
        format: "{value:%d-%m-%Y}",
      },
    },
    yAxis: {
      visible: true,
      title: { text: "" },
      labels: { format: "{value}", style: { fontSize: "13px" } },
    },
    time: {
      timezone: "America/Santiago",
      useUTC: false,
    },
    tooltip: {
      // formatter: function () {
      //   const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      //   const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      //   const date = new Date(this.x);
      //   return ({<b>${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}</b><br/>Cantidad: ${Highcharts.numberFormat(this.y, 0, ',', '.')};
      // }
    },
    legend: { fontSize: "12px" },
    plotOptions: {
      bar: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
          style: { fontSize: "13px", color: "#333" },
        },
      },
    },
    series: emanal.data,
  };

  return (
   <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  )
}
