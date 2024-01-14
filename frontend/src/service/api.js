import axios from "axios";

const backendUrl = "http://localhost:5000";

export const onSubmitDetails = async (data) => {
    try {
        const response = await axios.post(`${backendUrl}/api/workouts`, data, {
            headers: {
                'Content-Type': "application/json",
                'Authorization' : `Bearer ${user.token}`
            }
        });
        return response;
    } catch (err) {
        console.log("Error at post request", err.message);
    }
}

