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
        name: 'Vayun',
        role: 'Club Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team'
      },
      {
        name: 'Bahulika',
        role: 'Vice Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team'
      },

      // Technical Team
      {
        name: 'Chandana',
        role: 'Technical Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Technical'
      },
      {
        name: 'Rakshitha',
        role: 'Technical Sub-Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Technical'
      },

      // Design Team
      {
        name: 'Swetha',
        role: 'Design Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Design'
      },
      {
        name: 'Angel Susan',
        role: 'Design Sub-Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Design'
      },

      // Content Team
      {
        name: 'Ishaan',
        role: 'Content Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Content'
      },

      // Media Team
      {
        name: 'Gunashekar',
        role: 'Media Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Media'
      },
      {
        name: 'Bikram',
        role: 'Media Sub-Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Media'
      },

      // Technical Team Members
      {
        name: 'Divyey',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Jashwanth Naidu',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Joshua Royar',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Mohammad Sahif Beary',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Shravik',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Harshith G Reddy',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Piratla Ankit Rama Datt',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Sathwik',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Aaghaaz Khan',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Preetika kour',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Rishi Anand',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Srikar T',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Sankeerth S banagar',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },

      // Design Team Members
      {
        name: 'Judit',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Ashwin',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Krishnapriya',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Likith Yadav',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Yusha',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Suhana',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Samanvitha R K',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Bharath Sai Karnati',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Gouthami B',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Z syed zuhaib ahmed',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Om Babu Singh',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },

      // Content Team Members
      {
        name: 'Gurbashish Sena Nayak',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Angelin gia',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Vanshika jain',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Sanjit Kumaar S',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },

      // Media Team Members
      {
        name: 'Bhavesh',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Media'
      },
      {
        name: 'Prasanna Rajendran',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Media'
      },
      {
        name: 'Kaviya S',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Media'
      }
    ]
  },
  {
    year: '2023-24',
    teamPhoto: '/team-photos/2023-24/team.jpg',
    members: [
      // Core Team
      {
        name: 'Vayun',
        role: 'Club Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team'
      },
      {
        name: 'Bahulika',
        role: 'Vice Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team'
      },

      // Technical Team
      {
        name: 'Chandana',
        role: 'Technical Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Technical'
      },
      {
        name: 'Rakshitha',
        role: 'Technical Sub-Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Technical'
      },

      // Design Team
      {
        name: 'Swetha',
        role: 'Design Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Design'
      },
      {
        name: 'Angel Susan',
        role: 'Design Sub-Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Design'
      },

      // Content Team
      {
        name: 'Ishaan',
        role: 'Content Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Content'
      },

      // Media Team
      {
        name: 'Gunashekar',
        role: 'Media Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Media'
      },
      {
        name: 'Bikram',
        role: 'Media Sub-Lead',
        avatar: '/avatars/default.jpg',
        category: 'Core Team',
        department: 'Media'
      },

      // Technical Team Members
      {
        name: 'Divyey',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Jashwanth Naidu',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Joshua Royar',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Mohammad Sahif Beary',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Shravik',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Harshith G Reddy',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Piratla Ankit Rama Datt',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Sathwik',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Aaghaaz Khan',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Preetika kour',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Rishi Anand',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Srikar T',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Sankeerth S banagar',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Technical'
      },

      // Design Team Members
      {
        name: 'Judit',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Ashwin',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Krishnapriya',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Likith Yadav',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Yusha',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Suhana',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Samanvitha R K',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Bharath Sai Karnati',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Gouthami B',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Z syed zuhaib ahmed',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Om Babu Singh',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Design'
      },

      // Content Team Members
      {
        name: 'Gurbashish Sena Nayak',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Angelin gia',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Vanshika jain',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Sanjit Kumaar S',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Content'
      },

      // Media Team Members
      {
        name: 'Bhavesh',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Media'
      },
      {
        name: 'Prasanna Rajendran',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Media'
      },
      {
        name: 'Kaviya S',
        role: 'Member',
        avatar: '/avatars/default.jpg',
        category: 'Sub-Team Members',
        department: 'Media'
      }
    ]
  },
  // Add 2025-26 team data here when available
];
