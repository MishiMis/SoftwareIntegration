import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { supabase } from "../../Js/database/supabaseClient";

ChartJS.register(ArcElement, Tooltip, Legend);

const ActividadesLeft = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('activities')
                    .select('idTipo, tipoActividad(nombre)');
                
                if (error) throw error;

                const groupedData = data.reduce((acc, item) => {
                    const { idTipo, tipoActividad } = item;
                    acc[idTipo] = acc[idTipo] || { nombre: tipoActividad?.nombre || "Desconocido", cantidad: 0 };
                    acc[idTipo].cantidad += 1;
                    return acc;
                }, {});

                const labels = Object.values(groupedData).map(item => item.nombre);
                const values = Object.values(groupedData).map(item => item.cantidad);

                setChartData({
                    labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                        },
                    ],
                });
            } catch (err) {
                console.error('Error fetching data:', err.message);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Distribución de Tipos de Actividades</h2>
            <div className="flex justify-center items-center">
                <div className="relative w-full h-full" style={{ maxWidth: "400px", maxHeight: "400px" }}>
                    {chartData ? (
                        <Pie 
                            data={chartData}
                            options={{
                                maintainAspectRatio: false,  // Mantiene el gráfico flexible
                                responsive: true,           // Hace el gráfico responsivo
                                plugins: {
                                    legend: {
                                        position: 'right', // Leyenda a la derecha
                                        labels: {
                                            boxWidth: 15, // Tamaño de las cajas
                                            font: {
                                                size: 12, // Tamaño de la fuente
                                                family: 'Arial, sans-serif', // Fuente de la leyenda
                                            },
                                        },
                                    },
                                },
                            }}
                            width={100}
                            height={100}
                        />
                    ) : (
                        <p>Cargando datos...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActividadesLeft;
