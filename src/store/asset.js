import { observable } from "mobx";

class AssetClass {
  @observable certification = [
    {
      title: "PMP® Certification",
      badge: "ADVANCED",
      rating: "4.20 (19665 Ratings)",
      learner: 63396,
    },
    {
      title: "Certified ScrumMaster® (CSM)",
      badge: "ADVANCED",
      rating: "4.20 (4947 Ratings)",
      learner: 13778,
    },
    {
      title: "Certified Lean Six Sigma Green Belt",
      badge: "FOUNDATIONAL",
      rating: "4.10 (4866 Ratings)",
      learner: 23082,
    },
    {
      title: "PRINCE2® Foundation",
      badge: "FOUNDATIONAL",
      rating: "4.20 (929 Ratings)",
      learner: 12296,
    },
    {
      title: "ITIL® 4 Foundation",
      badge: "FOUNDATIONAL",
      rating: "4.50 (5340 Ratings)",
      learner: 3375,
    },
    {
      title: "AWS Solutions Architect",
      badge: "ADVANCED",
      rating: "4.20 (2623 Ratings)",
      learner: 4925,
    },
    {
      title: "CEH (v10) - Certified Ethical Hacker",
      badge: "ADVANCED",
      rating: "4.50 (1309 Ratings)",
      learner: 1936,
    },
    {
      title: "Machine Learning",
      badge: "ADVANCED",
      rating: "4.40 (3648 Ratings)",
      learner: 9421,
    },
  ];

  @observable description = [
    {
      title: "Develop skills for real career growth",
      description:
        "Cutting-edge curriculum designed in guidance with industry and academia to develop job-ready skills",
    },
    {
      title:
        "Learn from experts active in their field, not out-of-touch trainers",
      description:
        "Leading practitioners who bring current best practices and case studies to sessions that fit into your work schedule.",
    },
    {
      title: "Learn by working on real-world problems",
      description:
        "Capstone projects involving real world data sets with virtual labs for hands-on learning",
    },
    {
      title: "Structured guidance ensuring learning never stops",
      description:
        "24x7 Learning support from mentors and a community of like-minded peers to resolve any conceptual doubts",
    },
  ];

  @observable offering = [
    "./sponsorship/amz.png",
    "./sponsorship/bosch.png",
    "./sponsorship/citi.png",
    "./sponsorship/dell.png",
    "./sponsorship/ge.png",
    "./sponsorship/kpmg.png",
    "./sponsorship/pepsico.png",
    "./sponsorship/vodafone.png",
    "./sponsorship/wpp.png",
  ];

  @observable achievement = [
    {
      src: "./achievement/2018-gold-winner.png",
      title: "2018 Gold Winner",
      description: "For Customer Service by Stevie Awards",
    },
    {
      src: "./achievement/2020-gold-winner.png",
      title: "2020 Gold Winner",
      description: "For Costumer Service by Stevie Awards",
    },
    {
      src: "./achievement/AGBA-2020-winner.png",
      title: "2020 Winner",
      description: "Innovations in Edtech by Aegis Graham Bell Award",
    },
    {
      src: "./achievement/2019_Top20.png",
      title: "2019 Winner",
      description: "Online Learning Library Training Industry",
    },
    {
      src: "./achievement/2020_Top20.png",
      title: "2020 Winner",
      description: "Online Learning Library Training Industry",
    },
  ];
}

const AssetStore = new AssetClass();
export default AssetStore;
