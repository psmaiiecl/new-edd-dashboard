import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildValidationModuleChart(data){
    const noIncome = data.sin_ingreso ? data.sin_ingreso : 0;
	  //const withIncome = data.con_ingreso ? data.con_ingreso : 0;
	  const validated = data.validado ? data.validado : 0;
	  const notValidated = data.no_validado ? data.no_validado : 0;
	  const total = data.total ? data.total : 0;

      return{
        ...MODULE_CHART_SETUP,
        series:[
            {
                ...MODULE_CHART_SETUP.series[0],
                data:[
                    {
                        name:'Sin ingreso', 
                        y: noIncome,
                        color: '#5ec3c2',
                        drilldown: {
                          categories: [
                            'Sin ingreso',
                          ],
                          data: [
                            (noIncome / total) * 100,
                          ]
                        }
                      },
                      {
                        name: 'No validado',
                        y: notValidated,
                        color: '#434348',
                        drilldown: {
                            categories: [
                                'No validado',
                            ],
                            data: [
                                (notValidated / total) * 100,
                            ]
                        }
                    },
                    {
                        name: 'Validado',
                        y:validated,
                        color: '#c4ffff',
                        drilldown: {
                          categories: [
                              'Validado',
                            ],
                            data: [
                                (validated / total) * 100,
                            ]
                        }
                      },
                ]
            }
        ]
      }
}