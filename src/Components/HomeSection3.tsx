import React from "react";
import proveYourSkillIcon from "../Assets/proveYourSkillIcon.svg";
import multiplePeopleIcon from "../Assets/multiplePeopleIcon.png";
import robotIcon from "../Assets/robotIcon.png";
import iCardIcon from "../Assets/iCardIcon.png";

interface advantagesOfAiChallengesInt {
  title: string;
  description: string;
  icon: string;
}

type advantagesOfAiChallenges = advantagesOfAiChallengesInt[];

const advantagesOfAIChallengesData: advantagesOfAiChallenges = [
  {
    title: "Prove your skills",
    description: `Gain substantial experience by solving real-world problems and pit against others 
      to come up with innovative solutions.`,
    icon: proveYourSkillIcon,
  },
  {
    title: "Learn from community",
    description: `One can look and analyze the solutions submitted by the other Data Scientists in
     the community and learn from them.`,
    icon: multiplePeopleIcon,
  },
  {
    title: "Challenge yourself",
    description: `There is nothing for you to lose by participating in a challenge. 
    You can fail safe, learn out of the entire experience and bounce back harder.`,
    icon: robotIcon,
  },

  {
    title: "Earn recognition",
    description: `You will stand out from the crowd if you do well in AI challenges,
     it not only helps you shine in the community but also earns rewards.`,
    icon: iCardIcon,
  },
];

const HomeSection3 = () => {
  return (
    <div className="p-16 pb-14 h-max">
      <div className="home-section3-title  text-3xl font-semibold text-center">
        Why Participate in <span className="text-[#44924C]">AI Challenges?</span>
      </div>
      <div className="challenges-of-ai-cards-wrapper mt-16 px-[8.5rem]  flex flex-wrap justify-between  ">
        {advantagesOfAIChallengesData.map((item) => (
          <div
            className="challenges-of-ai-card bg-[#F8F9FD] flex items-center 
                          rounded-3xl px-6 py-10 mb-10 w-[34rem] h-[17rem]"
          >
            <div>
              <div className="challenges-of-ai-card-icon mb-2">
                <img src={item.icon} alt={item.title} />
              </div>
              <div className="challenges-of-ai-card-title mb-2">
                <div className="text-2xl font-semibold">{item.title}</div>
              </div>
              <div className="challenges-of-ai-card-desc mb-2">
                <div className="text-base text-[#64607D] ">{item.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSection3;
