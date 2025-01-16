export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  category: 'Core Team' | 'Sub-Team Members';
  department?: string;
}

export interface TeamYear {
  year: string;
  teamPhoto: string;
  members: TeamMember[];
}

export const teamData: TeamYear[] = [
  {
    year: '2024-25',
    teamPhoto: '/team-photos/2024-25/team.jpg',
    members: [
      // Core Team
      {
        name: 'Aishwarya B S',
        role: 'Lead',
        avatar: '/avatars/aishwarya.jpg',
        category: 'Core Team'
      },
      {
        name: 'Shivam Sharma',
        role: 'Tech Lead',
        avatar: '/avatars/shivam.jpg',
        category: 'Core Team'
      },
      {
        name: 'Sidharth Sreejil',
        role: 'ML and Android Lead',
        avatar: '/avatars/sidharth.jpg',
        category: 'Core Team'
      },
      {
        name: 'Pooja Sriram',
        role: 'Design Lead',
        avatar: '/avatars/pooja.jpg',
        category: 'Core Team'
      },
      {
        name: 'Sohan E',
        role: 'Content Lead',
        avatar: '/avatars/sohan.jpg',
        category: 'Core Team'
      },
      {
        name: 'Imaad Wani',
        role: 'Community and Social Media Lead',
        avatar: '/avatars/imaad.jpg',
        category: 'Core Team'
      },

      // Tech Members
      {
        name: 'Karan Adam',
        role: 'Tech Member',
        avatar: '/avatars/karan.jpg',
        category: 'Sub-Team Members',
        department: 'Tech'
      },
      {
        name: 'Sumith B H',
        role: 'Tech Member',
        avatar: '/avatars/sumith.jpg',
        category: 'Sub-Team Members',
        department: 'Tech'
      },
      {
        name: 'Faiz Mohammed Zameer',
        role: 'Tech Member',
        avatar: '/avatars/faiz.jpg',
        category: 'Sub-Team Members',
        department: 'Tech'
      },
      {
        name: 'Ashish Ramesh',
        role: 'Tech Member',
        avatar: '/avatars/ashish.jpg',
        category: 'Sub-Team Members',
        department: 'Tech'
      },

      // ML and Android Members
      {
        name: 'Heerath Bhat',
        role: 'ML and Android Member',
        avatar: '/avatars/heerath.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },
      {
        name: 'Vatsala Budur',
        role: 'ML and Android Member',
        avatar: '/avatars/vatsala.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },
      {
        name: 'Viresh Hubballi',
        role: 'ML and Android Member',
        avatar: '/avatars/viresh.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },
      {
        name: 'Sangameshwar Linganabandi',
        role: 'ML and Android Member',
        avatar: '/avatars/sangameshwar.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },
      {
        name: 'Varun Panyam',
        role: 'ML and Android Member',
        avatar: '/avatars/varun.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },

      // Design Members
      {
        name: 'Nithin M',
        role: 'Design Member',
        avatar: '/avatars/nithin.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Purnesh GC',
        role: 'Design Member',
        avatar: '/avatars/purnesh.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Narayanan Sreeraman',
        role: 'Design Member',
        avatar: '/avatars/narayanan.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Samarth HV',
        role: 'Design Member',
        avatar: '/avatars/samarth.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },

      // Content Members
      {
        name: 'C Sai Krishna',
        role: 'Content Member',
        avatar: '/avatars/saikrishna.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Malvika',
        role: 'Content Member',
        avatar: '/avatars/malvika.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Ankitha Bhat',
        role: 'Content Member',
        avatar: '/avatars/ankitha.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },

      // Community and Social Media Members
      {
        name: 'R Yuvraj',
        role: 'Community and Social Media Member',
        avatar: '/avatars/yuvraj.jpg',
        category: 'Sub-Team Members',
        department: 'Community and Social Media'
      },
      {
        name: 'Reethika Shree H',
        role: 'Community and Social Media Member',
        avatar: '/avatars/reethika.jpg',
        category: 'Sub-Team Members',
        department: 'Community and Social Media'
      },
      {
        name: 'Greeshma D J',
        role: 'Community and Social Media Member',
        avatar: '/avatars/greeshma.jpg',
        category: 'Sub-Team Members',
        department: 'Community and Social Media'
      },
      {
        name: 'Deekshitha Shetty',
        role: 'Community and Social Media Member',
        avatar: '/avatars/deekshitha.jpg',
        category: 'Sub-Team Members',
        department: 'Community and Social Media'
      }
    ]
  },
  {
    year: '2023-24',
    teamPhoto: '/team-photos/2023-24/team.jpg',
    members: [
      // Core Team
      {
        name: 'Aishwarya B S',
        role: 'Lead',
        avatar: '/avatars/aishwarya.jpg',
        category: 'Core Team'
      },
      {
        name: 'Shivam Sharma',
        role: 'Tech Lead',
        avatar: '/avatars/shivam.jpg',
        category: 'Core Team'
      },
      {
        name: 'Sidharth Sreejil',
        role: 'ML and Android Lead',
        avatar: '/avatars/sidharth.jpg',
        category: 'Core Team'
      },
      {
        name: 'Pooja Sriram',
        role: 'Design Lead',
        avatar: '/avatars/pooja.jpg',
        category: 'Core Team'
      },
      {
        name: 'Sohan E',
        role: 'Content Lead',
        avatar: '/avatars/sohan.jpg',
        category: 'Core Team'
      },
      {
        name: 'Imaad Wani',
        role: 'Community and Social Media Lead',
        avatar: '/avatars/imaad.jpg',
        category: 'Core Team'
      },

      // Tech Members
      {
        name: 'Karan Adam',
        role: 'Tech Member',
        avatar: '/avatars/karan.jpg',
        category: 'Sub-Team Members',
        department: 'Tech'
      },
      {
        name: 'Sumith B H',
        role: 'Tech Member',
        avatar: '/avatars/sumith.jpg',
        category: 'Sub-Team Members',
        department: 'Tech'
      },
      {
        name: 'Faiz Mohammed Zameer',
        role: 'Tech Member',
        avatar: '/avatars/faiz.jpg',
        category: 'Sub-Team Members',
        department: 'Tech'
      },
      {
        name: 'Ashish Ramesh',
        role: 'Tech Member',
        avatar: '/avatars/ashish.jpg',
        category: 'Sub-Team Members',
        department: 'Tech'
      },

      // ML and Android Members
      {
        name: 'Heerath Bhat',
        role: 'ML and Android Member',
        avatar: '/avatars/heerath.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },
      {
        name: 'Vatsala Budur',
        role: 'ML and Android Member',
        avatar: '/avatars/vatsala.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },
      {
        name: 'Viresh Hubballi',
        role: 'ML and Android Member',
        avatar: '/avatars/viresh.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },
      {
        name: 'Sangameshwar Linganabandi',
        role: 'ML and Android Member',
        avatar: '/avatars/sangameshwar.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },
      {
        name: 'Varun Panyam',
        role: 'ML and Android Member',
        avatar: '/avatars/varun.jpg',
        category: 'Sub-Team Members',
        department: 'ML and Android'
      },

      // Design Members
      {
        name: 'Nithin M',
        role: 'Design Member',
        avatar: '/avatars/nithin.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Purnesh GC',
        role: 'Design Member',
        avatar: '/avatars/purnesh.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Narayanan Sreeraman',
        role: 'Design Member',
        avatar: '/avatars/narayanan.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Samarth HV',
        role: 'Design Member',
        avatar: '/avatars/samarth.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },

      // Content Members
      {
        name: 'C Sai Krishna',
        role: 'Content Member',
        avatar: '/avatars/saikrishna.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Malvika',
        role: 'Content Member',
        avatar: '/avatars/malvika.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Ankitha Bhat',
        role: 'Content Member',
        avatar: '/avatars/ankitha.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },

      // Community and Social Media Members
      {
        name: 'R Yuvraj',
        role: 'Community and Social Media Member',
        avatar: '/avatars/yuvraj.jpg',
        category: 'Sub-Team Members',
        department: 'Community and Social Media'
      },
      {
        name: 'Reethika Shree H',
        role: 'Community and Social Media Member',
        avatar: '/avatars/reethika.jpg',
        category: 'Sub-Team Members',
        department: 'Community and Social Media'
      },
      {
        name: 'Greeshma D J',
        role: 'Community and Social Media Member',
        avatar: '/avatars/greeshma.jpg',
        category: 'Sub-Team Members',
        department: 'Community and Social Media'
      },
      {
        name: 'Deekshitha Shetty',
        role: 'Community and Social Media Member',
        avatar: '/avatars/deekshitha.jpg',
        category: 'Sub-Team Members',
        department: 'Community and Social Media'
      }
    ]
  },
  // Add 2025-26 team data here when available
];
