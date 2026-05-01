export interface TimelineItem {
  phase: string;
  title: string;
  icon: string;
  date: string;
  desc: string;
  details: string;
}

export interface WizardStep {
  step: number;
  title: string;
  icon: string;
  content: string;
}

export const getTimelineData = (lang: 'en' | 'hi' = 'en'): TimelineItem[] => {
  if (lang === 'hi') {
    return [
      {
        phase: "1",
        title: "चुनाव की घोषणा",
        icon: "📢",
        date: "चुनाव से ~2 महीने पहले",
        desc: "भारत का चुनाव आयोग (ECI) चुनाव की तारीखों, चरणों और आचार संहिता लागू होने की घोषणा करता है।",
        details: "• आदर्श आचार संहिता (MCC) तुरंत लागू हो जाती है\n• सरकार नई नीति घोषणाएँ नहीं कर सकती\n• सभी राजनीतिक दलों को नियमों का पालन करना होता है"
      },
      {
        phase: "2",
        title: "नामांकन प्रक्रिया",
        icon: "📋",
        date: "अधिसूचना के 7-10 दिन बाद",
        desc: "उम्मीदवार नामांकन पत्र दाखिल करते हैं, जिनकी जाँच और छानबीन की जाती है।",
        details: "• उम्मीदवार को ₹25,000 (सामान्य) या ₹12,500 (SC/ST) जमानत राशि जमा करनी होती है\n• नामांकन पत्रों की जाँच अधिकारियों द्वारा की जाती है\n• उम्मीदवार निर्धारित तिथि तक नाम वापस ले सकते हैं"
      },
      {
        phase: "3",
        title: "चुनाव प्रचार",
        icon: "📣",
        date: "~2-3 सप्ताह",
        desc: "राजनीतिक दल और उम्मीदवार रैलियों, मीडिया और डोर-टू-डोर प्रचार के माध्यम से मतदाताओं तक पहुँचते हैं।",
        details: "• मतदान से 48 घंटे पहले प्रचार बंद हो जाता है\n• चुनाव खर्च सीमा: लोकसभा ₹95 लाख, विधानसभा ₹40 लाख\n• पेड न्यूज़ और मतदाताओं को प्रलोभन देना प्रतिबंधित है"
      },
      {
        phase: "4",
        title: "मतदान दिवस",
        icon: "🗳️",
        date: "निर्धारित तिथि",
        desc: "मतदाता ईवीएम (इलेक्ट्रॉनिक वोटिंग मशीन) और वीवीपैट के माध्यम से अपना वोट डालते हैं।",
        details: "• मतदान सुबह 7 बजे से शाम 6 बजे तक\n• मतदाता पहचान पत्र या 12 अनुमोदित पहचान दस्तावेज़ आवश्यक\n• मतदान के बाद बाएँ हाथ की तर्जनी पर स्याही लगाई जाती है\n• NOTA (इनमें से कोई नहीं) विकल्प उपलब्ध है"
      },
      {
        phase: "5",
        title: "मतगणना",
        icon: "📊",
        date: "मतदान के कुछ दिन बाद",
        desc: "ईवीएम में दर्ज वोटों की गिनती कड़ी सुरक्षा में की जाती है।",
        details: "• पोस्टल बैलट की गिनती पहले होती है\n• ईवीएम राउंड में खोली जाती हैं\n• VVPAT स्लिप की रैंडम जाँच (5 मशीनें प्रति विधानसभा)"
      },
      {
        phase: "6",
        title: "परिणाम घोषणा",
        icon: "🏆",
        date: "मतगणना दिवस",
        desc: "ECI आधिकारिक परिणाम घोषित करता है और विजयी उम्मीदवारों को प्रमाणपत्र जारी किए जाते हैं।",
        details: "• सबसे अधिक मत पाने वाला उम्मीदवार विजयी होता है (FPTP प्रणाली)\n• 16 दिनों के भीतर सरकार का गठन होना चाहिए\n• चुनाव याचिकाएँ उच्च न्यायालय में दायर की जा सकती हैं"
      }
    ];
  }

  return [
    {
      phase: "1",
      title: "Election Announcement",
      icon: "📢",
      date: "~2 months before election",
      desc: "The Election Commission of India (ECI) announces election dates, phases, and the Model Code of Conduct comes into effect.",
      details: "• Model Code of Conduct (MCC) kicks in immediately\n• Government cannot announce new policies or schemes\n• All political parties must follow strict guidelines"
    },
    {
      phase: "2",
      title: "Nomination Process",
      icon: "📋",
      date: "7–10 days after notification",
      desc: "Candidates file nomination papers which are scrutinised by returning officers.",
      details: "• Candidates deposit ₹25,000 (General) or ₹12,500 (SC/ST) as security\n• Nomination papers are verified by officials\n• Candidates can withdraw by the last date of withdrawal"
    },
    {
      phase: "3",
      title: "Election Campaign",
      icon: "📣",
      date: "~2–3 weeks",
      desc: "Parties and candidates reach out to voters through rallies, media, and door-to-door canvassing.",
      details: "• Campaigning stops 48 hours before polling\n• Spending limits: ₹95 lakh (Lok Sabha), ₹40 lakh (Assembly)\n• Paid news and voter inducement are prohibited"
    },
    {
      phase: "4",
      title: "Polling Day",
      icon: "🗳️",
      date: "Scheduled date(s)",
      desc: "Voters cast their ballot using EVMs (Electronic Voting Machines) with VVPAT verification.",
      details: "• Polling hours: 7 AM to 6 PM\n• Voter ID or any of 12 approved identity documents required\n• Indelible ink is applied on the left index finger\n• NOTA (None of the Above) option available"
    },
    {
      phase: "5",
      title: "Vote Counting",
      icon: "📊",
      date: "A few days after polling",
      desc: "Votes recorded in EVMs are counted under strict security in designated counting centres.",
      details: "• Postal ballots are counted first\n• EVMs are opened round by round\n• Random VVPAT slip verification (5 machines per Assembly segment)"
    },
    {
      phase: "6",
      title: "Results & Government Formation",
      icon: "🏆",
      date: "Counting day",
      desc: "ECI declares official results and certificates of election are issued to winning candidates.",
      details: "• Candidate with the most votes wins (FPTP system)\n• Government must be formed within 16 days\n• Election petitions can be filed in High Court"
    }
  ];
};

export const getWizardSteps = (lang: 'en' | 'hi' = 'en'): WizardStep[] => {
  if (lang === 'hi') {
    return [
      {
        step: 1,
        title: "मतदाता पंजीकरण",
        icon: "📝",
        content: "**कौन पंजीकरण करा सकता है?**\n\n• भारत का कोई भी नागरिक जिसकी आयु 18 वर्ष या अधिक हो\n• आप ऑनलाइन (voters.eci.gov.in) या BLO के माध्यम से आवेदन कर सकते हैं\n\n**आवश्यक दस्तावेज़:**\n• आयु प्रमाण (जन्म प्रमाणपत्र, 10वीं मार्कशीट)\n• पते का प्रमाण (आधार, राशन कार्ड, पासपोर्ट)\n• पासपोर्ट साइज़ फोटो\n\n**प्रक्रिया:**\n1. Form 6 भरें (नए पंजीकरण के लिए)\n2. दस्तावेज़ संलग्न करें\n3. BLO सत्यापन\n4. EPIC (वोटर आईडी कार्ड) प्राप्त करें"
      },
      {
        step: 2,
        title: "नामांकन प्रक्रिया",
        icon: "📋",
        content: "**उम्मीदवार बनने के लिए:**\n\n• लोकसभा के लिए न्यूनतम आयु: 25 वर्ष\n• राज्यसभा के लिए: 30 वर्ष\n• भारत के किसी भी संसदीय निर्वाचन क्षेत्र से चुनाव लड़ सकते हैं\n\n**जमानत राशि:**\n• सामान्य: ₹25,000\n• SC/ST: ₹12,500\n• कुल वैध मतों का 1/6 भाग न मिलने पर जमानत ज़ब्त\n\n**नामांकन चरण:**\n1. पार्टी/निर्दलीय के रूप में नामांकन दाखिल करें\n2. चुनाव अधिकारी द्वारा जाँच\n3. नाम वापसी की अंतिम तिथि तक वापसी संभव"
      },
      {
        step: 3,
        title: "चुनाव प्रचार",
        icon: "📣",
        content: "**प्रचार नियम:**\n\n• मतदान से 48 घंटे पहले प्रचार बंद (शांति काल)\n• धर्म, जाति या सांप्रदायिक भावनाओं की अपील प्रतिबंधित\n• प्रत्येक पार्टी को ECI द्वारा निर्धारित चुनाव चिन्ह दिया जाता है\n\n**अनुमत प्रचार:**\n• सार्वजनिक रैलियाँ और सभाएँ\n• डोर-टू-डोर प्रचार\n• सोशल मीडिया (पूर्व-प्रमाणित)\n• प्रिंट और इलेक्ट्रॉनिक मीडिया विज्ञापन"
      },
      {
        step: 4,
        title: "मतदान दिवस",
        icon: "🗳️",
        content: "**मतदान कैसे करें:**\n\n1. अपना मतदान केंद्र खोजें (voter helpline app या 1950 पर कॉल)\n2. पहचान पत्र लेकर जाएँ\n3. मतदाता सूची में नाम सत्यापित करें\n4. बाएँ हाथ की तर्जनी पर अमिट स्याही लगेगी\n5. EVM पर अपने उम्मीदवार का बटन दबाएँ\n6. VVPAT पर्ची से अपना वोट सत्यापित करें\n\n**विशेष सुविधाएँ:**\n• दिव्यांग मतदाताओं के लिए रैंप और सहायता\n• 80+ वर्ष के बुज़ुर्गों के लिए पोस्टल बैलट\n• सेना के जवानों के लिए सर्विस वोटिंग"
      },
      {
        step: 5,
        title: "मतगणना",
        icon: "📊",
        content: "**मतगणना प्रक्रिया:**\n\n1. ईवीएम को मजबूत कमरे से बाहर लाया जाता है\n2. सबसे पहले डाक मतपत्रों की गिनती\n3. ईवीएम की गिनती राउंड में होती है\n4. एजेंट और उम्मीदवार निगरानी करते हैं\n5. VVPAT सत्यापन (5 मशीनें प्रति विधानसभा)\n\n**सुरक्षा उपाय:**\n• CCTV निगरानी\n• तीन स्तरीय सुरक्षा\n• ईवीएम में कोई इंटरनेट कनेक्शन नहीं"
      },
      {
        step: 6,
        title: "परिणाम और सरकार गठन",
        icon: "🏆",
        content: "**परिणाम:**\n\n• सबसे अधिक मत पाने वाला उम्मीदवार विजयी\n• ECI आधिकारिक परिणाम घोषित करता है\n• results.eci.gov.in पर लाइव अपडेट\n\n**सरकार गठन:**\n• बहुमत दल/गठबंधन सरकार बनाता है\n• लोकसभा में 272+ सीटें = बहुमत\n• राज्यपाल/राष्ट्रपति मंत्रिपरिषद की शपथ दिलाते हैं"
      }
    ];
  }

  return [
    {
      step: 1,
      title: "Voter Registration",
      icon: "📝",
      content: "**Who can register?**\n\n• Any Indian citizen aged 18 years or above\n• Apply online at voters.eci.gov.in or through BLO (Booth Level Officer)\n\n**Documents needed:**\n• Age proof (Birth certificate, Class 10 marksheet)\n• Address proof (Aadhaar, Ration card, Passport)\n• Passport-size photograph\n\n**Process:**\n1. Fill Form 6 (for new registration)\n2. Attach supporting documents\n3. BLO verification at your address\n4. Receive EPIC (Voter ID Card)"
    },
    {
      step: 2,
      title: "Nomination Process",
      icon: "📋",
      content: "**To become a candidate:**\n\n• Minimum age: 25 years (Lok Sabha), 30 years (Rajya Sabha)\n• Can contest from any parliamentary constituency in India\n\n**Security deposit:**\n• General: ₹25,000\n• SC/ST: ₹12,500\n• Forfeited if candidate doesn't get 1/6th of total valid votes\n\n**Nomination steps:**\n1. File nomination as party or independent candidate\n2. Scrutiny by returning officer\n3. Withdrawal allowed until last date"
    },
    {
      step: 3,
      title: "Election Campaign",
      icon: "📣",
      content: "**Campaign rules:**\n\n• Campaigning stops 48 hours before polling (silence period)\n• Appeals on religion, caste, or communal sentiments are banned\n• Each party gets a symbol allotted by ECI\n\n**Allowed campaigning:**\n• Public rallies and meetings\n• Door-to-door canvassing\n• Social media (pre-certified)\n• Print and electronic media ads"
    },
    {
      step: 4,
      title: "Polling Day",
      icon: "🗳️",
      content: "**How to vote:**\n\n1. Find your polling booth (Voter Helpline app or call 1950)\n2. Carry your ID proof\n3. Get verified at the voters' list\n4. Indelible ink is applied on your left index finger\n5. Press the EVM button next to your candidate\n6. Verify your vote on the VVPAT slip\n\n**Special provisions:**\n• Ramps and assistance for voters with disabilities\n• Postal ballot for electors aged 80+\n• Service voting for armed forces personnel"
    },
    {
      step: 5,
      title: "Vote Counting",
      icon: "📊",
      content: "**Counting process:**\n\n1. EVMs brought out from strongrooms\n2. Postal ballots counted first\n3. EVM counting in rounds\n4. Agents and candidates observe the process\n5. VVPAT verification (5 machines per Assembly segment)\n\n**Security measures:**\n• CCTV surveillance\n• Three-tier security\n• No internet connectivity in EVMs"
    },
    {
      step: 6,
      title: "Results & Government Formation",
      icon: "🏆",
      content: "**Results:**\n\n• Candidate with the most votes wins (FPTP)\n• ECI declares the official results\n• Live updates on results.eci.gov.in\n\n**Government formation:**\n• Majority party/coalition forms the government\n• 272+ seats in Lok Sabha = Majority\n• Governor/President administers oath to the council of ministers"
    }
  ];
};
