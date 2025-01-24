import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
const URL = 'https://human-resource-management-website.onrender.com';
import {
    Chart as ChartJs,
    RadialLinearScale,
    PointElement,
    Filler,
    Tooltip,
    Legend,
    LineElement
} from "chart.js"
import { Radar } from "react-chartjs-2"

ChartJs.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)



const Radar_rank = (props) => {
const auth = localStorage.getItem("user");
const auth1 = JSON.parse(auth);
const [owner, setOwner] = useState({});
useEffect(() => {
axios.get(`${URL}/user/${auth1.user_id}`) 
 .then(result => {
    setOwner(result.data)
 })
 .catch(err => console.log(err))
},[])
    const data = {
        labels: ['Organizational Skill', 'Technical Skill', 'Idea Contribution', 'Communication Skill', 'Product Optimization'],
        datasets: [
            {
                label: 'You',
                data: [owner.stats === undefined ? auth1.stats.organizational_skill : owner.stats.organizational_skill,
                        owner.stats === undefined ? auth1.stats.techical_skill : owner.stats.techical_skill, 
                        owner.stats === undefined ? auth1.stats.idea_contribution : owner.stats.idea_contribution, 
                        owner.stats === undefined ? auth1.stats.communication_skill : owner.stats.communication_skill, 
                        owner.stats === undefined ? auth1.stats.product_optimization : owner.stats.product_optimization],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',

                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
            },
            {
                label: 'Your Competitor',
                data: [props.organizational_skill, props.techical_skill, props.idea_contribution, props.communication_skill, props.product_optimization],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3,
            }
        ]
    }
    
    const options = {
        scales: {
            r: {
                min: 0,
                ticks: {
                    stepsize: 10,
                    display: false,
                },
                angleLines: {
                    display: false // Disables the angle lines
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        
    }

    return <Radar data={data} options={options} height={500} width={600} />

}
Radar_rank.propTypes = {
    organizational_skill: PropTypes.number.isRequired,
    techical_skill: PropTypes.number.isRequired,
    idea_contribution: PropTypes.number.isRequired,
    communication_skill: PropTypes.number.isRequired,
    product_optimization: PropTypes.number.isRequired,
};

export default Radar_rank;
