export interface StateInfo {
  id: string;
  en_name: string;
  hi_name: string;
  voters: number;
  constituencies: number;
  last_poll: string;
}

export const statesData: StateInfo[] = [
  { id: "UP", en_name: "Uttar Pradesh", hi_name: "उत्तर प्रदेश", voters: 150000000, constituencies: 80, last_poll: "2024" },
  { id: "MH", en_name: "Maharashtra", hi_name: "महाराष्ट्र", voters: 90000000, constituencies: 48, last_poll: "2024" },
  { id: "WB", en_name: "West Bengal", hi_name: "पश्चिम बंगाल", voters: 70000000, constituencies: 42, last_poll: "2024" },
  { id: "BR", en_name: "Bihar", hi_name: "बिहार", voters: 72000000, constituencies: 40, last_poll: "2024" },
  { id: "TN", en_name: "Tamil Nadu", hi_name: "तमिलनाडु", voters: 61000000, constituencies: 39, last_poll: "2024" },
  { id: "MP", en_name: "Madhya Pradesh", hi_name: "मध्य प्रदेश", voters: 54000000, constituencies: 29, last_poll: "2024" },
  { id: "KA", en_name: "Karnataka", hi_name: "कर्नाटक", voters: 51000000, constituencies: 28, last_poll: "2024" },
  { id: "DL", en_name: "NCT of Delhi", hi_name: "दिल्ली", voters: 14000000, constituencies: 7, last_poll: "2024" },
  { id: "GJ", en_name: "Gujarat", hi_name: "गुजरात", voters: 49000000, constituencies: 26, last_poll: "2024" },
  { id: "RJ", en_name: "Rajasthan", hi_name: "राजस्थान", voters: 52000000, constituencies: 25, last_poll: "2024" },
];

export const getStatesData = () => statesData;
