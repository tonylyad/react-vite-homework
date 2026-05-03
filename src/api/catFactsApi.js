import axios from "axios";

const API_URL = 'https://catfact.ninja/facts';

export async function getCatFacts(params) {
    const response = await axios.get(API_URL, {timeout: 5000});

    return response.data.data;
}