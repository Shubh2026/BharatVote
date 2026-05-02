export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const getQuizQuestions = (lang: 'en' | 'hi' = 'en'): QuizQuestion[] => {
  if (lang === 'hi') {
    return [
      {
        q: "भारत के चुनाव आयोग की स्थापना कब हुई?",
        options: ["1947", "1950", "1952", "1960"],
        answer: 1,
        explanation: "भारत का चुनाव आयोग 25 जनवरी 1950 को स्थापित किया गया था।"
      },
      {
        q: "भारत में मतदान की न्यूनतम आयु क्या है?",
        options: ["16 वर्ष", "18 वर्ष", "21 वर्ष", "25 वर्ष"],
        answer: 1,
        explanation: "61वें संविधान संशोधन (1988) द्वारा मतदान की आयु 21 से घटाकर 18 वर्ष की गई।"
      },
      {
        q: "EVM का पूर्ण रूप क्या है?",
        options: ["Electronic Voting Machine", "Electric Vote Maker", "Election Verification Module", "Electronic Vote Manager"],
        answer: 0,
        explanation: "EVM = Electronic Voting Machine, जिसका उपयोग 2004 से सभी चुनावों में होता है।"
      },
      {
        q: "NOTA का क्या अर्थ है?",
        options: ["Not On The Agenda", "None Of The Above", "National Organization for Transparency", "New Option To Apply"],
        answer: 1,
        explanation: "NOTA (None Of The Above) 2013 में सर्वोच्च न्यायालय के आदेश से शुरू हुआ।"
      },
      {
        q: "लोकसभा में कुल कितनी सीटें हैं?",
        options: ["500", "543", "550", "600"],
        answer: 1,
        explanation: "लोकसभा में 543 निर्वाचित सदस्य होते हैं।"
      },
      {
        q: "लोकसभा चुनाव लड़ने के लिए न्यूनतम आयु क्या है?",
        options: ["18 वर्ष", "21 वर्ष", "25 वर्ष", "30 वर्ष"],
        answer: 2,
        explanation: "लोकसभा के लिए न्यूनतम आयु 25 वर्ष और राज्यसभा के लिए 30 वर्ष है।"
      },
      {
        q: "MCC का पूर्ण रूप क्या है?",
        options: ["Model Code of Conduct", "Ministry of Central Command", "Main Campaign Committee", "Municipal Code of Compliance"],
        answer: 0,
        explanation: "आदर्श आचार संहिता (MCC) चुनाव घोषणा के साथ लागू होती है।"
      },
      {
        q: "VVPAT किसके लिए उपयोग होता है?",
        options: ["वोट गिनने", "वोट सत्यापित करने", "उम्मीदवार पंजीकरण", "मतदाता सूची बनाने"],
        answer: 1,
        explanation: "VVPAT (Voter Verifiable Paper Audit Trail) मतदाता को अपना वोट सत्यापित करने देता है।"
      },
      {
        q: "भारत में पहला आम चुनाव कब हुआ?",
        options: ["1947", "1950", "1951-52", "1957"],
        answer: 2,
        explanation: "भारत का पहला आम चुनाव 1951-52 में हुआ, जिसमें 17.3 करोड़ मतदाता थे।"
      },
      {
        q: "चुनाव प्रचार मतदान से कितने घंटे पहले बंद होता है?",
        options: ["24 घंटे", "36 घंटे", "48 घंटे", "72 घंटे"],
        answer: 2,
        explanation: "मतदान से 48 घंटे पहले प्रचार बंद हो जाता है, इसे 'शांति काल' कहते हैं।"
      }
    ];
  }

  return [
    {
      q: "When was the Election Commission of India established?",
      options: ["1947", "1950", "1952", "1960"],
      answer: 1,
      explanation: "The ECI was established on 25th January 1950, now celebrated as National Voters' Day."
    },
    {
      q: "What is the minimum voting age in India?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      answer: 1,
      explanation: "The 61st Amendment Act (1988) lowered the voting age from 21 to 18 years."
    },
    {
      q: "What does EVM stand for?",
      options: ["Electronic Voting Machine", "Electric Vote Maker", "Election Verification Module", "Electronic Vote Manager"],
      answer: 0,
      explanation: "EVMs have been used in all elections since 2004, replacing paper ballots."
    },
    {
      q: "What does NOTA stand for?",
      options: ["Not On The Agenda", "None Of The Above", "National Organization for Transparency", "New Option To Apply"],
      answer: 1,
      explanation: "NOTA was introduced in 2013 following a Supreme Court directive."
    },
    {
      q: "How many seats are there in the Lok Sabha?",
      options: ["500", "543", "550", "600"],
      answer: 1,
      explanation: "The Lok Sabha has 543 elected members representing parliamentary constituencies."
    },
    {
      q: "What is the minimum age to contest Lok Sabha elections?",
      options: ["18 years", "21 years", "25 years", "30 years"],
      answer: 2,
      explanation: "Minimum age is 25 for Lok Sabha and 30 for Rajya Sabha."
    },
    {
      q: "What does MCC stand for?",
      options: ["Model Code of Conduct", "Ministry of Central Command", "Main Campaign Committee", "Municipal Code of Compliance"],
      answer: 0,
      explanation: "The MCC comes into force the moment elections are announced by the ECI."
    },
    {
      q: "What is VVPAT used for?",
      options: ["Counting votes", "Verifying votes", "Registering candidates", "Creating voter lists"],
      answer: 1,
      explanation: "VVPAT (Voter Verifiable Paper Audit Trail) lets voters verify their vote was recorded correctly."
    },
    {
      q: "When was the first general election held in India?",
      options: ["1947", "1950", "1951-52", "1957"],
      answer: 2,
      explanation: "India's first general election was held in 1951-52 with 17.3 crore eligible voters."
    },
    {
      q: "How many hours before polling does campaigning stop?",
      options: ["24 hours", "36 hours", "48 hours", "72 hours"],
      answer: 2,
      explanation: "Campaigning must stop 48 hours before polling, known as the 'silence period'."
    }
  ];
};
