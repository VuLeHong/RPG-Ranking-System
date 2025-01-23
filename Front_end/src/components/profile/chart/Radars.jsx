import { useEffect, useState } from 'react'
import {
	Chart as ChartJs,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
} from "chart.js"
import { Radar } from "react-chartjs-2"
import axios from 'axios';
const URL = 'https://rpg-ranking-system.onrender.com';
ChartJs.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
)

const Radars = () => {
	const auth = localStorage.getItem("user");
	const auth1 = JSON.parse(auth);
	const [owner, setOwner] = useState({});
	useEffect(() => {
    axios.get(`${URL}/user/${auth1._id}`) 
    .then(result => {
        setOwner(result)
    })
    .catch(err => console.log(err))
	},[])

	const data = {
		labels: [`Organizational Skill:${owner.stats === undefined ? auth1.stats.organizational_skill : owner.stats.organizational_skill}`, 
		`Technical Skill: ${owner.stats === undefined ? auth1.stats.techical_skill : owner.stats.techical_skill}`, 
		`Idea Contribution: ${owner.stats === undefined ? auth1.stats.idea_contribution : owner.stats.idea_contribution}`, 
		`Communication Skill: ${owner.stats === undefined ? auth1.stats.communication_skill : owner.stats.communication_skill}`, 
		`Product Optimization: ${owner.stats === undefined ? auth1.stats.product_optimization : owner.stats.product_optimization}`],
		datasets: [
			{
				label: "you",
				data: [owner.stats === undefined ? auth1.stats.organizational_skill : owner.stats.organizational_skill,
						owner.stats === undefined ? auth1.stats.techical_skill : owner.stats.techical_skill, 
						owner.stats === undefined ? auth1.stats.idea_contribution : owner.stats.idea_contribution, 
						owner.stats === undefined ? auth1.stats.communication_skill : owner.stats.communication_skill, 
						owner.stats === undefined ? auth1.stats.product_optimization : owner.stats.product_optimization],
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 3
			}
		]
	}

	const options = {
        scales: {
            r: {
				min: 0,
				// max: 
                ticks: {
					stepsize: 10,
                    display: false,
                },
                angleLines: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.5)" // Lighter color for angle lines
                },
                grid: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.2)" // Lighter color for grid lines
                },
                pointLabels: {
                    color: "white" // Brighter color for point labels
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        
    }



    return (
		<Radar options={options} height={300} width={400} data={data} />
    )
}

export default Radars