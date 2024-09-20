import Axios from 'axios';

async function getQuestion() {
    const uri = "https://opentdb.com/api.php?amount=10&category=22";
    const rawData = await Axios.get(uri);
    console.log(rawData.data.results[0]); // Remember to delete
    return rawData.data.results;
}

export default getQuestion;