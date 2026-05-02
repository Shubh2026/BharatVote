export interface StateInfo {
  lok_sabha: number | string;
  assembly: number | string;
  capital: string;
  last_assembly: string;
  ceo_website: string;
  note: string;
}

export const getStatesList = (): string[] => [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const stateData: Record<string, { en: StateInfo; hi: StateInfo }> = {
  "Andhra Pradesh": {
    en: { lok_sabha: 25, assembly: 175, capital: "Amaravati", last_assembly: "2024", ceo_website: "ceoandhra.nic.in", note: "Simultaneous Lok Sabha and Assembly elections held in 2024." },
    hi: { lok_sabha: 25, assembly: 175, capital: "अमरावती", last_assembly: "2024", ceo_website: "ceoandhra.nic.in", note: "2024 में लोकसभा और विधानसभा चुनाव एक साथ हुए।" }
  },
  "Bihar": {
    en: { lok_sabha: 40, assembly: 243, capital: "Patna", last_assembly: "2020", ceo_website: "ceobihar.nic.in", note: "One of the states with the highest number of Assembly seats." },
    hi: { lok_sabha: 40, assembly: 243, capital: "पटना", last_assembly: "2020", ceo_website: "ceobihar.nic.in", note: "सबसे अधिक विधानसभा सीटों वाले राज्यों में से एक।" }
  },
  "Delhi": {
    en: { lok_sabha: 7, assembly: 70, capital: "New Delhi", last_assembly: "2025", ceo_website: "ceodelhi.gov.in", note: "Delhi has a unique status as a UT with its own legislative assembly." },
    hi: { lok_sabha: 7, assembly: 70, capital: "नई दिल्ली", last_assembly: "2025", ceo_website: "ceodelhi.gov.in", note: "दिल्ली की अपनी विधानसभा के साथ एक अनूठा केंद्र शासित प्रदेश का दर्जा है।" }
  },
  "Gujarat": {
    en: { lok_sabha: 26, assembly: 182, capital: "Gandhinagar", last_assembly: "2022", ceo_website: "ceo.gujarat.gov.in", note: "Known for high voter turnout in recent elections." },
    hi: { lok_sabha: 26, assembly: 182, capital: "गांधीनगर", last_assembly: "2022", ceo_website: "ceo.gujarat.gov.in", note: "हाल के चुनावों में उच्च मतदान प्रतिशत के लिए जाना जाता है।" }
  },
  "Karnataka": {
    en: { lok_sabha: 28, assembly: 224, capital: "Bengaluru", last_assembly: "2023", ceo_website: "ceokarnataka.kar.nic.in", note: "Key battleground state in South India." },
    hi: { lok_sabha: 28, assembly: 224, capital: "बेंगलुरु", last_assembly: "2023", ceo_website: "ceokarnataka.kar.nic.in", note: "दक्षिण भारत का प्रमुख चुनावी राज्य।" }
  },
  "Kerala": {
    en: { lok_sabha: 20, assembly: 140, capital: "Thiruvananthapuram", last_assembly: "2021", ceo_website: "ceo.kerala.gov.in", note: "Consistently records one of the highest literacy and voter turnout rates." },
    hi: { lok_sabha: 20, assembly: 140, capital: "तिरुवनंतपुरम", last_assembly: "2021", ceo_website: "ceo.kerala.gov.in", note: "सबसे अधिक साक्षरता और मतदान प्रतिशत वाले राज्यों में शामिल।" }
  },
  "Madhya Pradesh": {
    en: { lok_sabha: 29, assembly: 230, capital: "Bhopal", last_assembly: "2023", ceo_website: "ceomadhyapradesh.nic.in", note: "Known as the 'Heart of India', a crucial state in national elections." },
    hi: { lok_sabha: 29, assembly: 230, capital: "भोपाल", last_assembly: "2023", ceo_website: "ceomadhyapradesh.nic.in", note: "'भारत का दिल' के रूप में जाना जाने वाला, राष्ट्रीय चुनावों में महत्वपूर्ण राज्य।" }
  },
  "Maharashtra": {
    en: { lok_sabha: 48, assembly: 288, capital: "Mumbai", last_assembly: "2024", ceo_website: "ceo.maharashtra.gov.in", note: "Has the most Lok Sabha seats of any state." },
    hi: { lok_sabha: 48, assembly: 288, capital: "मुंबई", last_assembly: "2024", ceo_website: "ceo.maharashtra.gov.in", note: "किसी भी राज्य में सबसे अधिक लोकसभा सीटें।" }
  },
  "Punjab": {
    en: { lok_sabha: 13, assembly: 117, capital: "Chandigarh", last_assembly: "2022", ceo_website: "ceopunjab.gov.in", note: "Shares its capital Chandigarh with Haryana." },
    hi: { lok_sabha: 13, assembly: 117, capital: "चंडीगढ़", last_assembly: "2022", ceo_website: "ceopunjab.gov.in", note: "अपनी राजधानी चंडीगढ़ को हरियाणा के साथ साझा करता है।" }
  },
  "Rajasthan": {
    en: { lok_sabha: 25, assembly: 200, capital: "Jaipur", last_assembly: "2023", ceo_website: "ceorajasthan.nic.in", note: "Known for its pattern of alternating governments every election." },
    hi: { lok_sabha: 25, assembly: 200, capital: "जयपुर", last_assembly: "2023", ceo_website: "ceorajasthan.nic.in", note: "हर चुनाव में सरकार बदलने की परंपरा के लिए जाना जाता है।" }
  },
  "Tamil Nadu": {
    en: { lok_sabha: 39, assembly: 234, capital: "Chennai", last_assembly: "2021", ceo_website: "elections.tn.gov.in", note: "State with a strong tradition of regional parties." },
    hi: { lok_sabha: 39, assembly: 234, capital: "चेन्नई", last_assembly: "2021", ceo_website: "elections.tn.gov.in", note: "क्षेत्रीय दलों की मजबूत परंपरा वाला राज्य।" }
  },
  "Uttar Pradesh": {
    en: { lok_sabha: 80, assembly: 403, capital: "Lucknow", last_assembly: "2022", ceo_website: "ceoup.nic.in", note: "Largest state by Lok Sabha seats (80) — most influential in national politics." },
    hi: { lok_sabha: 80, assembly: 403, capital: "लखनऊ", last_assembly: "2022", ceo_website: "ceoup.nic.in", note: "लोकसभा सीटों (80) के हिसाब से सबसे बड़ा राज्य — राष्ट्रीय राजनीति में सबसे प्रभावशाली।" }
  },
  "West Bengal": {
    en: { lok_sabha: 42, assembly: 294, capital: "Kolkata", last_assembly: "2021", ceo_website: "ceowestbengal.nic.in", note: "Elections are often held in multiple phases due to security considerations." },
    hi: { lok_sabha: 42, assembly: 294, capital: "कोलकाता", last_assembly: "2021", ceo_website: "ceowestbengal.nic.in", note: "सुरक्षा कारणों से चुनाव अक्सर कई चरणों में होते हैं।" }
  }
};

export const getStateInfo = (state: string, lang: 'en' | 'hi' = 'en'): StateInfo => {
  const info = stateData[state];
  if (!info) {
    if (lang === 'hi') {
      return { lok_sabha: "—", assembly: "—", capital: "—", last_assembly: "—", ceo_website: "eci.gov.in", note: "विस्तृत जानकारी जल्द उपलब्ध होगी। कृपया eci.gov.in पर जाएँ।" };
    }
    return { lok_sabha: "—", assembly: "—", capital: "—", last_assembly: "—", ceo_website: "eci.gov.in", note: "Detailed info coming soon. Please visit eci.gov.in." };
  }
  return info[lang];
};
