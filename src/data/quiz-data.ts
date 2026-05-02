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
    }
  ];
};

export const quizQuestions = getQuizQuestions('en');
