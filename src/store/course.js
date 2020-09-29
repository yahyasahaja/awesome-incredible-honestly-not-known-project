import { observable, action } from "mobx";

class CourseClass {
  @observable postgraduate = [
    {
      _id: "1",
      title: "Full Stack Web Development",
      start: "11 Oct, 2019",
      duration: "9 Months",
      description:
        "Begin your journey with the Post Graduate Program in Full Stack Web Development, in collaboration with Caltech CTME, and get an understanding of what lies ahead in your journey and how to get the maximum benefit out of this course. Kick-start your journey with the preparatory courses and the 'Getting Started' bundle.",
      learningpath: [
        {
          order: 1,
          title:
            "PG FSD - Phase-1: Implement OOPS using JAVA with Data Structures and Beyond",
          description:
            "Revisit the basics of Software Development with this introductory phase of our Full Stack Web Development Post Graduate Program. Learn Agile and Scrum methodologies to deliver projects on time, and understand the building blocks of Java data structures and their application in object-oriented programming. Develop a comprehensive understanding of Git to manage version control systems, and Maven to manage project dependencies.",
        },
        {
          order: 2,
          title: "PG FSD - Phase-2: Become a back-end expert",
          description:
            "Learn all aspects of back-end technologies by acquiring in-depth skills of SQL, Java servlets, and the relational database ORM with Hibernate. Learn to connect databases with JDBC and gain an understanding of RESTful web services.",
        },
        {
          order: 3,
          title: "PG FSD - Phase-3: Implement Frameworks the DevOps way",
          description:
            "Develop advanced UI skills with HTML and CSS, and build 3-tier applications with practical front-end features using the Spring framework, Angular, JUnit5, and SoapUI. You will also learn how to deploy continuous integration and automation using Jenkins.",
        },
        {
          order: 4,
          title:
            "PG FSD - Phase-4: Develop a Web Application using frontend stack",
          description:
            "Create industry-standard applications and websites using the front-end stack technologies such as HTML, CSS, JavaScript, and Angular. Employ a range of data types to handle your applications efficiently using MongoDB.",
        },
        {
          order: 5,
          title: "PG FSD - Phase-5: Testing in a DevOps Lifecycle",
          description:
            "Gain a comprehensive understanding of automation testing and integration with Selenium WebDriver. Learn how to create seamless development and production environments using containerization with a widely used tool—Docker, and manage your applications on the Amazon S3 server.",
        },
        {
          order: 6,
          title: "PG FSD - Full Stack Web Development Capstone Project",
          description:
            "The Full Stack Web Development Capstone project will introduce you to real-world applications. You will be given a choice among industries such as e-commerce, food delivery, entertainment, and healthcare. You will work on an original problem from scratch and learn how to apply your skills in a full stack bootcamp format. The Capstone project helps create a portfolio that will speak for your skills to a broad audience, including prospective employers.",
        },
      ],
    },
    {
      _id: "2",
      title: "Cloud Computing",
      start: "20 Sep, 2020",
      duration: "12 Months",
      description:
        "Get started with the Post Graduate Program in Cloud Computing in collaboration with Caltech CTME and explore everything about the program. Kickstart your Cloud journey with our preparatory courses: Introduction to Cloud Computing, AWS Technical Essentials, Microsoft Azure Fundamentals",
      learningpath: [
        {
          order: 1,
          title: "PG CC - Microsoft Certified Azure Administrator: AZ:104",
          description:
            "Simplilearn’s Azure Administrator training provides you with a deep understanding of the entire administrative lifecycle in Azure environment. This Azure course shows you how to maintain services related to computing, storage, network, and security. Enhance your Azure Administrator skills and prepare to ace the AZ-104 Azure Administrator exam.",
        },
        {
          order: 2,
          title:
            "PG CC - Microsoft Certified Azure Developer Associate: AZ:204",
          description:
            "This Azure Developer Certification training aligns with the latest (2020) edition of Azure Developer Certified Associate exam AZ-204. AZ-204 is the updated version of the existing exam for the Microsoft Azure Developer Associate: AZ-203. This exam verifies your ability to select, develop, and implement Azure Cloud technology solutions.",
        },
        {
          order: 3,
          title: "PG CC - Microsoft Azure Architect Technologies: AZ:303",
          description:
            "The Microsoft Azure Architect Technologies AZ-303 online training course prepares you for a career as a certified Azure Cloud Solutions Architect. You will learn how to manage Azure resources, configure and deploy virtual machines, and master Azure Cognitive Services solutions as you become familiar with the Azure platform.",
        },
        {
          order: 4,
          title: "PG CC - Microsoft Azure Architect Design: AZ:304",
          description:
            "This Azure training course covers the more advanced activities on the Azure platform, such as managing Azure resources, configuring and deploying virtual machines and networks, mastering Azure AD, and securing data. You will also learn how to identify data storage options, integrate SaaS service on Azure, author deployments, and more.",
        },
        {
          order: 5,
          title: "PG CC - AWS Solutions Architect SAA C02",
          description:
            "This AWS Solutions Architect Certification training will enable you to design, plan, and scale AWS implementations utilizing over 70 Cloud Computing services. The course is aligned with the latest AWS exam featuring Amazon designated best practices.",
        },
        {
          order: 6,
          title: "PG CC - AWS Developer Associate",
          description:
            "Simplilearn’s AWS Developer Associate training builds upon the skills learned from the AWS Technical Essentials course. This course will teach you how to write code and design scalable applications, implement application security and testing, and develop expertise with key AWS components such as S3, DynamoDB, Elastic Beanstalk, and CloudFormation.",
        },
        {
          order: 7,
          title: "PG CC - AWS Sysops Associate",
          description:
            "This AWS SysOps training is a prerequisite to the DevOps Engineer Certification. You will learn how to migrate on-premise applications to AWS, control the flow of data to and from AWS, master the AWS management console, implement operational cost controls, and enhances your ability to leverage AWS resources and services efficiently.",
        },
        {
          order: 8,
          title: "PG CC - Cloud Computing Capstone Project",
          description:
            "This Cloud Computing Capstone project will give you an opportunity to implement the skills you learned throughout this program. Through dedicated mentoring sessions, you’ll learn how to solve a real-world, industry-aligned Cloud problem. The project is the final step in the learning path and will enable you to showcase your expertise in Cloud Computing to future employers.",
        },
      ],
    },
    {
      _id: "3",
      title: "DevOps",
      start: "20 Sep, 2020",
      duration: "9 Months",
      description:
        "Get started with the Post Graduate Program in DevOps in collaboration with Caltech CTME and explore everything about the program. Kickstart your DevOps journey with our preparatory courses: Linux Training, Programming Refresher, Agile Scrum Foundation, Agile Scrum Master.",
      learningpath: [
        {
          order: 1,
          title: "PG DO - DevOps Certification Training",
          description:
            "Simplilearn’s DevOps Certification Training Course will enable you to prepare you for a career in DevOps, a fast-growing field that bridges the gap between software developers and operations professionals. Learn the DevOps tools and methodologies, and excel for your next role as a DevOps practitioner.",
        },
        {
          order: 2,
          title: "PG DO - Git and GitHub Training",
          description:
            "Learn the basics of Git—a version control system (VCS), and understand how to set up Git in your system, list the three-stage workflow in Git, create branches and track files, create a repository in Git, GitHub and more.",
        },
        {
          order: 3,
          title: "PG DO - CI/CD Pipeline with Jenkins",
          description:
            "This CI/CD Pipelines with Jenkins Certification Training course will help you learn server automation, continuous integration, build pipelines and configuration tools, automated testing and code quality improvement, and distributed system in Jenkins through intensive, hands-on practice assignments.",
        },
        {
          order: 4,
          title:
            "PG DO - Configuration Management with Chef, Puppet and Ansible",
          description:
            "Configuration management is one of the most important stages in the DevOps pipeline. This course provides an in-depth understanding of the concepts of Chef, Puppet, and Ansible. The DevOps lifecycle is a collection of engineering practices providing a systematic way to manage all of the entities required for efficient deployment.",
        },
        {
          order: 5,
          title: "PG DO - Docker Certified Associate Certification Training",
          description:
            "This hands-on Docker certification training course is aligned with the Docker Certified Associate (DCA) examination. You will learn core Docker technologies such as Docker Hub, Docker Compose, Docker Swarm, Dockerfile, Docker Containers, Docker Engine, Docker Images, Docker Network, Docker Daemon, and Docker Storage.",
        },
        {
          order: 6,
          title: "PG DO - Certified Kubernetes Administrator Training",
          description:
            "Kubernetes is one of the most popular container orchestration tools available. The Certified Kubernetes Administrator Training, founded by the Cloud Native Computing Foundation (CNCF), will enhance your Kubernetes skills and give you credibility in the field while preparing you for the CKA exam.",
        },
        {
          order: 7,
          title: "PG DO - DevOps on AWS",
          description:
            "Simplilearn’s DevOps on AWS course is structured to build your understanding of both technologies using the advanced skills on CodeBuild, CodeDeploy, and CodePipeline to automate continuous delivery and continuous integration for your application.",
        },
        {
          order: 8,
          title: "PG DO - DevOps Capstone Project",
          description:
            "This DevOps capstone project will give you an opportunity to implement the skills you learned throughout this program. Through dedicated mentoring sessions, you’ll learn how to solve a real-world, industry-aligned problem. This project is the final step in the learning path and will enable you to showcase your expertise in DevOps to future employers.",
        },
      ],
    },
    {
      _id: "4",
      title: "Data Engineering",
      start: "07 Nov, 2020",
      duration: "8 Months",
      description:
        "Get started with the Post Graduate Program in Data Engineering in partnership with Purdue University and explore everything about the program. Kick-start your journey with the preparatory courses on data engineering with Scala and Hadoop, and big data for data engineering.",
      learningpath: [
        {
          order: 1,
          title: "PG DE - Big Data Hadoop and Spark Developer",
          description:
            "Gain insights into how to improve business productivity by processing large volumes of data and extracting valuable information from them.",
        },
        {
          order: 2,
          title: "PG DE - AWS Tech Essentials",
          description:
            "Learn how to navigate the AWS management console, understand AWS security measures, storage, and database options, and gain expertise in web services like RDS and EBS.",
        },
        {
          order: 3,
          title: "PG DE - Big Data on AWS",
          description:
            "Become familiar with the Amazon Web Services (AWS) cloud platform, including Kinesis Analytics, and AWS big data storage, processing, analysis, visualization, and security services.",
        },
        {
          order: 4,
          title: "PG DE - Azure Fundamentals",
          description:
            "Learn to create the most common Azure services, including virtual machines, web apps, SQL databases. Learn about the features of Azure Active Directory and the methods of integrating the cloud service with on-premises Active Directory.",
        },
        {
          order: 5,
          title: "PG DE - Azure Data Engineer",
          description:
            "Implement data solutions, manage and develop data processing; and monitor and optimize data solutions using the following Azure services: Azure Cosmos DB, Azure SQL Database, Azure Synapse Analytics, Azure Data Lake Storage, Azure Data Factory, Azure Stream Analytics, Azure Databricks, and Azure Blob storage.",
        },
        {
          order: 6,
          title: "PG DE - Data Engineer Capstone",
          description:
            "Showcase your new data engineering skills with a hands-on, industry-relevant Capstone project which brings everything you learned in the program together into one portfolio-worthy example. You can choose to work on projects in ecommerce, BFSI, or video sharing to make your practice more relevant.",
        },
      ],
    },
    {
      _id: "5",
      title: "AI and Machine Learning",
      start: "26 Sep, 2020",
      duration: "12 Months",
      description:
        "Get started with the Post Graduate Program in AI and Machine Learning in partnership with Purdue University and explore everything about the program. Kickstart your AI journey with the preparatory courses on Statistics and Programming.",
      learningpath: [
        {
          order: 1,
          title: "PG AI - Python for Data Science",
          description:
            "Kickstart your learning by getting an understanding of Python language and libraries, writing the scripts using the Jupyter-based lab environment.",
        },
        {
          order: 2,
          title: "PG AI - Data Science with Python",
          description:
            "Elevate your Python skills to a new level with this interactive, hands-on course and establish your mastery of Data Science and analytics techniques using Python programming.",
        },
        {
          order: 3,
          title: "PG AI - Machine Learning",
          description:
            "Master Machine Learning techniques, including supervised and unsupervised learning and hands-on modeling rounding out your Data Science education.",
        },
        {
          order: 4,
          title: "PG AI - Deep Learning with Tensorflow and Keras",
          description:
            "Master the concepts of Deep Learning to build artificial neural networks and traverse layers of data abstraction and get a solid understanding of Deep Learning using TensorFlow and Keras.",
        },
        {
          order: 5,
          title: "PG AI - Advanced Deep Learning and Computer Vision",
          description:
            "Advance your skills with real applications of computer vision, Generative- Adversarial Networks (GANs), distributed parallel computing with GPUs and deployment of deep learning models on cloud.",
        },
        {
          order: 6,
          title: "PG AI - Natural Language Processing and Speech Recognition",
          description:
            "Understand the concepts of NLP, feature engineering, natural language generation, automated speech recognition, speech to text conversion, text to speech conversion, and voice-assistance devices (including building Alexa skills).",
        },
        {
          order: 7,
          title: "PG AI - Reinforcement Learning",
          description:
            "You will learn how to solve reinforcement learning problems with a variety of strategies, using Python and TensorFlow and and use different algorithms to solve problems.",
        },
        {
          order: 8,
          title: "PG AI - AI and Machine Learning Capstone Project",
          description:
            "Culminate your new AI-ML skills with a hands-on, industry-relevant capstone project bringing together every course into one portfolio-worthy capstone.",
        },
      ],
    },
    {
      _id: "6",
      title: "Data Science",
      start: "03 Oct, 2020",
      duration: "12 Months",
      description:
        "Get started with the Post Graduate Program in Data Science in partnership with Purdue University and explore everything about the program. Kickstart your Data Science journey with the preparatory courses on Statistics and Programming.",
      learningpath: [
        {
          order: 1,
          title: "PG DS - R Programming for Data Science",
          description:
            "Discover R Programming with this introductory course. Learn how to write R code, utilize R data structures, and create your own functions.",
        },
        {
          order: 2,
          title: "PG DS - Data Science with R",
          description:
            "The most in-demand open-source technology is R Programming. Learn how this programming language unlocks the power of Data Science with hands-on experience and real-world applications.",
        },
        {
          order: 3,
          title: "PG DS - Python for Data Science",
          description:
            "Kickstart your learning of Python for Data Science with this introductory course and familiarize yourself with programming, tastefully crafted by IBM.",
        },
        {
          order: 4,
          title: "PG DS - Data Science with Python",
          description:
            "Elevate your Python skills to a new level with this interactive, hands-on course and establish your mastery of Data Science and analytics techniques using Python programming.",
        },
        {
          order: 5,
          title: "PG DS - Machine Learning",
          description:
            "Master Machine Learning techniques, including supervised and unsupervised learning and hands-on modeling rounding out your Data Science education.",
        },
        {
          order: 6,
          title: "PG DS - Natural Language Processing",
          description:
            "Understand the fundamentals of Natural Language Processing using the most popular library; Python’s Natural Language Toolkit (NLTK).",
        },
        {
          order: 7,
          title: "PG DS - Tableau Training",
          description:
            "This course in Tableau Desktop 10 training will help you gain a variety of skills in the powerful platform including building visualizations, organizing data, and designing dashboards.",
        },
        {
          order: 8,
          title: "PG DS - Data Science Capstone",
          description:
            "Culminate your new Data Science skills with a hands-on, industry-relevant capstone project bringing together every course into one portfolio-worthy capstone.",
        },
      ],
    },
  ];

  @observable master = [
    {
      _id: "1",
      title: "Cloud Architect",
      course: "11 Courses",
      duration: "12 Months",
      detail: [
        "31 tools & Rigorous curriculum",
        "Master's certificate",
        "Certification Aligned with Google Cloud & 2 more",
      ],
      description:
        "Simplilearn’s Cloud Architect Master’s Program will build your AWS, Microsoft Azure and Google Cloud Platform expertise from the ground up. You’ll learn to master the architectural principles and services of the top cloud platforms, design and deploy highly scalable, fault-tolerant applications and develop skills to transform yourself into an AWS, Azure cloud and GCP architect.",
      learningpath: [
        {
          order: 1,
          title: "AWS Solutions Architect",
          description:
            "The AWS certification training is designed to help you gain an in-depth understanding of Amazon Web Services (AWS) architectural principles and services such as IAM, VPC, EC2, EBS and more. The course is aligned with the latest exam announced by AWS, and you will learn how to design and scale AWS Cloud implementations with best practices recommended by Amazon. AWS certified solutions architects command average salaries of $129,000 per year, so get started in this exciting field today.",
        },
        {
          order: 2,
          title: "AWS SysOps Associate",
          description:
            "Get hands-on exposure to the highly scalable Amazon Web Services (AWS) cloud platform with the AWS SysOps Associate certification training program. This course will help you attain valuable technical expertise in deploying, managing, and operating fault-tolerant systems on AWS.",
        },
        {
          order: 3,
          title: "Microsoft Azure Fundamentals",
          description:
            "Simplilearn’s Microsoft Azure Fundamentals Training Course will familiarize you with the main principles of cloud computing and how they have been implemented in Microsoft Azure. This course will get you up to speed on Azure services, security, privacy, compliance, trust, pricing, and support.",
        },
        {
          order: 4,
          title: "Microsoft Certified: Azure Administrator Associate AZ:104",
          description:
            "Become a part of the Azure revolution with our Microsoft Certified Azure Administrator Associate training course. Aligned with the 2020 edition of Exam AZ-104 Microsoft Azure Administrator, this course is best suited for professionals wishing to be successful as an Azure Administrator.",
        },
        {
          order: 5,
          title: "Microsoft Azure Architect Technologies: AZ:303",
          description:
            "This Microsoft Azure certification training will establish you as an expert Azure Solutions Architect and help you ace the AZ-303: Azure Architect Technologies Exam. You will learn to deploy and configure infrastructure, implement workloads and security, create and deploy apps, and develop for the cloud and Azure storage.",
        },
        {
          order: 6,
          title: "Microsoft Azure Architect Design: AZ-304",
          description:
            "This Microsoft Azure certification training establishes you as an expert Azure Solutions Architect and helps you ace the AZ-304 exam. You will learn how to determine workload requirements, design for identity and security, architect data platform, create continuity, migration, and API integration.",
        },
        {
          order: 7,
          title: "Google Cloud Platform Architect Training",
          description:
            "Simplilearn's Google Cloud Platform (GCP) Architect certification program will empower you with the skills needed to advance your career in cloud architecture and become a certified Google Professional Cloud Architect. The course covers IAM, Networking, cloud storage, and much more.",
        },
      ],
    },
    {
      _id: "2",
      title: "Lean Six Sigma Expert",
      course: "6 Courses",
      duration: "12 Months",
      detail: ["Rigorous curriculum", "Master's certificate"],
      description:
        "The Lean Six Sigma Expert Masters Program is designed to help you master two important management methodologies – Lean and Six Sigma – that have been brought together to accelerate business improvement. Fast track your career with this course that will give you the management qualities businesses look for and become the go-to professional for quality management projects.",
      learningpath: [
        {
          order: 1,
          title: "Lean Management",
          description:
            "Learn the concepts and principles of Lean management in this training course, where you’ll learn how to streamline your processes and drive the best value for your business. This Lean Management Certification course is crafted by industry experts and is ideal for quality management professionals.",
        },
        {
          order: 2,
          title: "Certified Lean Six Sigma Green Belt",
          description:
            "The Lean Six Sigma Green Belt Certification program is the second stage in the Lean Six Sigma Masters program. You’ll learn the core principles of Lean Six Sigma, how to implement quality projects and applications, and how to use the Minitab tool for effective statistical analysis. The course is aligned to IASSC exam, integrates lean and DMAIC methodologies using case studies and real-life examples, and will give you the skills to empower your organization for continuous improvement.",
        },
        {
          order: 3,
          title: "Minitab®",
          description:
            "This course ensures that you learn the practical applications of the latest version of the statistical tool, Minitab® 17 and excel at the tools used by both Lean Six Sigma Green Belt and Black Belt professionals. The course covers 9 case studies in the domains of Healthcare, IT and IT Services, and Manufacturing, and each case study describes a problem and its solution using Minitab® 17.",
        },
        {
          order: 4,
          title: "Certified Lean Six Sigma Black Belt",
          description:
            "The Lean Six Sigma Black Belt training is the most exclusive certification for the Lean Six Sigma quality management methodology. This Six Sigma Black Belt certification course is the final stage of the Masters program that will position you as an expert in implementing Lean, Design for Six Sigma (DFSS), Six Sigma Define, Measure, Analyze, Improve and Control (DMAIC) and Total Productive Maintenance (TPM). Join this exclusive worldwide group of 4000 certified Lean Six Sigma Black Belts today.",
        },
      ],
    },
    {
      _id: "3",
      title: "Cyber Security Expert",
      course: "7 Courses",
      duration: "12 Months",
      detail: ["Rigorous curriculum", "Master's certificate"],
      description:
        "The Cyber Security Expert Master’s Program will equip you with the skills needed to become an expert in this rapidly growing domain. You will learn comprehensive approaches to protecting your infrastructure, including securing data and information, running risk analysis and mitigation, architecting cloud-based security, achieving compliance and much more with this best-in-class program.",
      learningpath: [
        {
          order: 1,
          title: "Introduction to Cyber Security",
          description:
            "Simplilearn’s Introduction to Cyber Security course for beginners is designed to give you a foundational look at today’s cybersecurity landscape and provide you with the tools to evaluate and manage security protocols in information processing systems.",
        },
        {
          order: 2,
          title: "CompTIA Security+ 501",
          description:
            "CompTIA Security+ is a globally trusted certification that validates foundational, vendor-neutral IT security knowledge and skills. As a benchmark for best practices in IT security, this certification training covers the essential principles of network security and risk management.",
        },
        {
          order: 3,
          title: "CEH (v10)- Certified Ethical Hacker",
          description:
            "This Certified Ethical Hacker-Version 10 (earlier CEHv9) course will train you on the advanced step-by-step methodologies that hackers actually use, such as writing virus codes, and reverse engineering, so you can better protect corporate infrastructure from data breaches. This ethical hacking course will help you master advanced network packet analysis and advanced system penetration testing techniques to build your network security skill-set and beat hackers at their own game.",
        },
        {
          order: 4,
          title: "CISM®",
          description:
            "CISM (Certified Information Security Manager) is a key certification for information security professionals who manage, design, oversee, and assess enterprise information security. This CISM certification course, closely aligned with ISACA's best practices, helps you learn about IT security systems.",
        },
        {
          order: 5,
          title: "CISSP® Training",
          description:
            "The Certified Information Systems Security Professional (CISSP) certification is considered the gold standard in the field of information security. This CISSP training is aligned with (ISC)² CBK 2018 requirements and will train you to become an information assurance professional who defines all aspects of IT security, including architecture, design, management, and controls. Most IT security positions require or prefer a CISSP certification, so get started with your CISSP training today.",
        },
        {
          order: 6,
          title: "Certified Cloud Security Professional",
          description:
            "The Certified Cloud Security Professional (CCSP) training course is the leading certification by (ISC)² and will teach you to negate security threats to your cloud storage by understanding information security risks and strategies to maintain data security. Covering the six sections of the Official (ISC)² CCSP Common Body of Knowledge (CBK®), this course will help you pass the exam obtaining your CCSP.",
        },
      ],
    },
    {
      _id: "4",
      title: "Software Engineer Masters Program",
      course: "12 Courses",
      duration: "15 Months",
      detail: ["12 tools & Rigorous curriculum", "Master's certificate"],
      description:
        "Do you want to have an edge over others in the extremely demanding field of software engineering? You’ve come to the right place! Simplilearn’s Software Engineering Masters program will train you to gain expertise on different levels of Software Engineering, Programming, Frontend, Backend, DevOps tools, Cloud, and then Agile.",
      learningpath: [
        {
          order: 1,
          title: "C Programming",
          description:
            "Are you looking to learn programming but not sure how and where to start? Simplilearn’s C Programming Language online course provides beginners with easy-to-follow instructions and an arsenal of resources to make them fluent in C language methodologies such as variables, data types, loops, arrays, etc.",
        },
        {
          order: 2,
          title: "Java Certification Training",
          description:
            "If you’re looking to master web application development for virtually any computing platform, this Java Certification Training Course is for you. Our all-in-one Java training will give you a firm foundation in Java, the mostly used programming language in all spheres of software development. You’ll learn the advanced concepts of Core Java 8 and Java EE, Hibernate and Spring frameworks, JDBC architecture, JUnite and SOA as you build your skills to become an expert in Java programming.",
        },
        {
          order: 3,
          title: "MongoDB Developer and Administrator",
          description:
            "More businesses are using MongoDB development services, the most popular NoSQL database, to handle their increasing data storage and handling demands. The MongoDB certification course equips you with the skills required to become a MongoDB Developer.",
        },
        {
          order: 4,
          title: "Node.js Training",
          description:
            "Are you a developer looking to build scalable web applications at lightning speed? Simplilearn’s Node JS training enables you to build network applications quickly and efficiently using JavaScript. The course helps you gain an in-depth knowledge of concepts such as Express.js, Node Packet Manager (npm), shrink-wrap, NPM Vet, asynchronous programming, REST, Express.js with MongoDB, SQLite CRUD operations, and more.",
        },
        {
          order: 5,
          title: "Angular Training",
          description:
            "The Angular course enables you to master front-end web development with Angular. It helps you gain in-depth knowledge of concepts such as TypeScript, Bootstrap Grid System, Dependency Injections, SPA (Single Page Application), Directives, Forms, Pipes, Promises, Observables, and understand the testing of the Angular class.",
        },
        {
          order: 6,
          title: "AWS Solutions Architect",
          description:
            "The AWS certification training is designed to help you gain an in-depth understanding of Amazon Web Services (AWS) architectural principles and services such as IAM, VPC, EC2, EBS and more. The course is aligned with the latest exam announced by AWS, and you will learn how to design and scale AWS Cloud implementations with best practices recommended by Amazon. AWS certified solutions architects command average salaries of $129,000 per year, so get started in this exciting field today.",
        },
        {
          order: 7,
          title: "DevOps Certification Training",
          description:
            "Simplilearn’s DevOps Certification Training Course will enable you to prepare you for a career in DevOps, a fast-growing field that bridges the gap between software developers and operations professionals. Learn the DevOps tools and methodologies with this online DevOps certification training and excel for your next role as a DevOps practitioner.",
        },
      ],
    },
    {
      _id: "5",
      title: "ITIL® Lifecycle Expert Program",
      course: "6 Courses",
      duration: "12 Months",
      detail: ["Rigorous curriculum", "Master's certificate"],
      description:
        "The ITIL® Lifecycle Expert program will enable you to master all 5 phases of the IT service management lifecycle. You’ll learn to align IT strategy with business vision, manage the service delivery process across the lifecycle and develop capabilities to ensure a smooth transition of new services into operations. Boost your salary by 40% over non certified peers with this expert course.",
      learningpath: [
        {
          order: 1,
          title: "ITIL® Intermediate CSI",
          description:
            "The ITIL® Intermediate Continual Service Improvement (CSI) certification is one of the key qualifications in ITIL Expert training. It also serves as a free-standing qualification to establish your expertise in continual service improvement and enhance your IT service management career opportunities.",
        },
        {
          order: 2,
          title: "ITIL® Intermediate SD",
          description:
            "This ITIL® Intermediate Service Design (SD) course is one of the key qualifications in the ITIL Service Lifecycle category, designed to expose you to the architectures, processes, policies, and documentation of IT service management. You’ll learn about best practices in the design of IT services.",
        },
        {
          order: 3,
          title: "ITIL® Intermediate SO",
          description:
            "This ITIL® Intermediate Service Operation (SO) training course is one of the key qualifications within ITIL Service Lifecycle training and proves your ability to enable responsive, stable, and repeatable IT service delivery. The ITIL framework sets internationally recognized benchmarks for IT professionals.",
        },
        {
          order: 4,
          title: "ITIL® Intermediate SS",
          description:
            "The ITIL® Intermediate Service Strategy (SS) certification establishes your ability to effectively plan, design, develop, and implement IT service management. This course is one of the key qualifications in ITIL Expert training but also serves as a free-standing qualification.",
        },
        {
          order: 5,
          title: "ITIL® Intermediate ST",
          description:
            "ITIL® Intermediate ST Certification qualifies you for the ITIL Service Lifecycle training that will help you become an expert. This certification will validate your knowledge of process elements, practice components, and management techniques to build, test, and implement products and services.",
        },
        {
          order: 6,
          title: "ITIL® Managing across the Lifecycle (MALC)",
          description:
            "This ITIL® Managing Across the Lifecycle (MALC) course, the final module within the ITIL Service Lifecycle training, establishes your ability to integrate service management processes across the full range of IT practices. It tests your knowledge of the key content topics of the ITIL publication.",
        },
      ],
    },
    {
      _id: "6",
      title: "Automation Testing Masters Program",
      course: "6 Courses",
      duration: "12 Months",
      detail: ["8 tools & 1 Industry Projects", "Master's certificate"],
      description:
        "This program will advance your career as an automation test engineer. You’ll learn top skills demanded in the industry, including GIT, Selenium, Jenkins, and JMeter to apply engineering to software development processes and build quality products.",
      learningpath: [
        {
          order: 1,
          title:
            "Phase-1: Implement software development and database fundamentals through agile",
          description:
            "Brush up on your knowledge of software development fundamentals; agile and scrum methodologies; Java and data structures; GIT to manage version control systems; SQL to maintain databases; and software testing to write test cases.",
        },
        {
          order: 2,
          title:
            "Phase-2: Get started with Functional Testing, TDD, and DevOps integration",
          description:
            "Familiarize yourself with automation testing technologies through tools like Jenkins, TestNg, Maven, JUnit 5, and Gherkin.",
        },
        {
          order: 3,
          title:
            "Phase-3: Test and monitor your applications through Non-functional and API Testing",
          description:
            "This phase will enable you to create a test plan, run test cases, analyze them, perform test execution, and monitor application performance using JMeter and Postman.",
        },
        {
          order: 4,
          title: "Phase-4: Learn mobile automation and cloud testing",
          description:
            "Automate your mobile automation test cases with Appium and deploy those in the cloud and DevOps environments using AWS and Docker.",
        },
        {
          order: 5,
          title: "Automation Test Engineer Capstone",
          description:
            "Automation test engineer Capstone project provides you with hands-on working experience — the objective being to develop the entire application from scratch, deploy it into a pseudo-production environment, and successfully test it.",
        },
      ],
    },
  ];

  @action findPostGraduateById(_id) {
    const data = this.postgraduate.filter(item => {
      return item._id === _id;
    })[0];
    return data;
  }

  @action findMasterById(_id) {
    const data = this.master.filter(item => {
      return item._id === _id;
    })[0];
    return data;
  }
}

const CourseStore = new CourseClass();
export default CourseStore;
