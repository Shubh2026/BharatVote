export interface FAQItem {
  en_question: string;
  en_answer: string;
  hi_question: string;
  hi_answer: string;
}

export const faqData: FAQItem[] = [
  {
    en_question: "How do I check if my name is in the voter list?",
    en_answer: "You can check your name in the electoral roll by visiting 'voters.eci.gov.in' and using the 'Search in Electoral Roll' feature. You can search by your EPIC number, mobile number, or personal details.",
    hi_question: "मैं कैसे जांचूं कि मेरा नाम मतदाता सूची में है?",
    hi_answer: "आप 'voters.eci.gov.in' पर जाकर और 'मतदाता सूची में खोजें' सुविधा का उपयोग करके मतदाता सूची में अपना नाम देख सकते हैं। आप अपने एपिक (EPIC) नंबर, मोबाइल नंबर या व्यक्तिगत विवरण द्वारा खोज सकते हैं।"
  },
  {
    en_question: "What is an EPIC number?",
    en_answer: "EPIC stands for Electors Photo Identity Card number. It is a unique 10-digit alphanumeric ID printed on your Voter ID card issued by the Election Commission of India.",
    hi_question: "एपिक (EPIC) नंबर क्या है?",
    hi_answer: "एपिक का मतलब मतदाता फोटो पहचान पत्र संख्या है। यह भारत चुनाव आयोग द्वारा जारी आपके मतदाता पहचान पत्र पर मुद्रित एक अद्वितीय 10-अंकीय अल्फ़ान्यूमेरिक आईडी है।"
  },
  {
    en_question: "Can I vote if I don't have my physical Voter ID card?",
    en_answer: "Yes, you can vote even without a physical Voter ID card, provided your name is in the voter list. You will need to carry any one of the 12 alternative photo identity documents like Aadhaar Card, PAN Card, Driving License, or Passport.",
    hi_question: "क्या मैं भौतिक मतदाता पहचान पत्र न होने पर भी मतदान कर सकता हूँ?",
    hi_answer: "हाँ, आप भौतिक मतदाता पहचान पत्र के बिना भी मतदान कर सकते हैं, बशर्ते आपका नाम मतदाता सूची में हो। आपको आधार कार्ड, पैन कार्ड, ड्राइविंग लाइसेंस या पासपोर्ट जैसे 12 वैकल्पिक फोटो पहचान दस्तावेजों में से कोई भी एक ले जाना होगा।"
  }
];
