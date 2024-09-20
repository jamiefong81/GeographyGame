import Axios from 'axios';

async function getNameforCode(code) {
    const uri = "https://restcountries.com/v3.1/alpha/" + code;
    const response = await Axios.get(uri);
    const countryName = response.data[0].name.common;
    return countryName;
}

async function countryFlags() {
    const countryCodes = [
        "AD", "AE", "AF", "AG", "AI", "AK", "AL", "AM", "AN", "AO", "AQ", "AR", "AS", "AT",
        "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BM",
        "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG",
        "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE",
        "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ",
        "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GG", "GH", "GI", "GL", "GM", "GN",
        "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU",
        "ID", "IE", "IL", "IM", "IN", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE",
        "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK",
        "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML",
        "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA",
        "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE",
        "PF", "PG", "PH", "PK", "PL", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO",
        "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SK", "SL", "SM",
        "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ",
        "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY",
        "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM",
        "ZW"
    ];

    const countryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    const correctCountryName = await getNameforCode(countryCode);
    
    let answersArr = []; 
    for (let i = 0; i < 3; i++) {
        const curCountrycode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
        const curCountryName = await getNameforCode(curCountrycode);
        answersArr[i] = curCountryName;
    }

    const correctAnswerPosition = Math.floor(Math.random() * 4);
    answersArr.splice(correctAnswerPosition, 0, correctCountryName);
    return [countryCode, correctCountryName, answersArr];
}

export default countryFlags;