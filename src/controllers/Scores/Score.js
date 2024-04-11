import { User } from '../../models/User.model.js';

async function calculateScores(req, res) {
    try {
        const { formData, userDetails } = req.body;
        const { name, id } = userDetails;
        
        // Get the current date and format it as YYYY-MM
        const currentDate = new Date();
        const month = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`.padStart(2, '0');

        // Extract scores from formData
        const userScores = Object.values(formData).map(score => parseInt(score));

        // Define score categories and their associated topic IDs
        const scoreCategories = {
            compassionSatisfaction: ['01', '02', '03', '04', '30'],
            distraction: ['10', '11', '44'],
            stress: ['17', '18', '19', '20'],
            fatigue: ['21', '22', '23'],
            burnout: ['26', '27', '28', '29'],
            workload: ['05', '06', '07', '08'],
            drugRelatedAwareness: ['12', '13', '40', '41'],
            wardRelatedFactors: ['33', '34', '35'],
            dutyShift: ['16', '45'],
            prescriptionRelatedFactor: ['31', '42', '43'],
            patientIdentificationFactor: ['36', '37'],
            staffRelatedFactor: ['09', '14', '15', '32'],
            familyIssues: ['24', '25'],
            emergencySituation: ['38', '39']
        };

        // Define mappings for user-friendly names
        const nameMappings = {
            compassionSatisfaction: 'Compassion Satisfaction',
            distraction: 'Distraction',
            stress: 'Stress',
            fatigue: 'Fatigue',
            burnout: 'Burnout',
            workload: 'Workload',
            drugRelatedAwareness: 'Drug Related Awareness',
            wardRelatedFactors: 'Ward Related Factors',
            dutyShift: 'Duty Shift',
            prescriptionRelatedFactor: 'Prescription Related Factor',
            patientIdentificationFactor: 'Patient Identification Factor',
            staffRelatedFactor: 'Staff Related Factor',
            familyIssues: 'Family Issues',
            emergencySituation: 'Emergency Situation'
        };

        // Calculate scores for each category
        const calculatedScores = [];
        for (let category in scoreCategories) {
            const topics = scoreCategories[category];
            const categoryScore = topics.reduce((total, topic) => {
                const topicIndex = parseInt(topic) - 1; // Adjust for zero-based indexing
                return total + userScores[topicIndex];
            }, 0);
            calculatedScores.push({ value: categoryScore, name: nameMappings[category] });
        }

        // Send the response with calculated scores
        return res.json({ id, name, month, scores: calculatedScores });
    } catch (error) {
        console.error("Error calculating scores:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export { calculateScores };