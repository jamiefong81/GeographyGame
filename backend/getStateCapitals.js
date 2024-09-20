import fs from 'fs';
import { parse } from 'csv-parse';

function getStateCapitals() {
    const path = "./stateCapitals.csv";

    // fs.createReadStream(path)
    //     .pipe(parse({ columns: true }))
    //     .on('data', row => {
    //         stateCapitalList.push(row);
    //     })
    //     .on('end', () => {
    //         resolve(stateCapitalList);
    //     });
    
    // console.log(stateCapitalList);

    const data = fs.readFileSync(path, 'utf8');
    const stateCapitalsList = data.split('\n').map(row => row.split(',').map(cell => cell.trim()));
    return stateCapitalsList;
}

export default getStateCapitals;