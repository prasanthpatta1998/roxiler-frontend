import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import './components.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = ({ data, month }) => {

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Generate colors based on data length
    const generateColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(getRandomColor());
        }
        return colors;
    };

    const colors = generateColors(data.length);

    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                label: '# of Items',
                data: data.map(item => item.count),
                backgroundColor: colors.map(color => `${color}33`), 
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='piedashboard'>
            <div>
                <h1 className='h1'>Pie chart statitics of {parseInt(month) + 1} month!</h1>
            </div>
            <div className='pie'>
                <Pie data={chartData} />
            </div>
        </div>
    );
};


export default Piechart