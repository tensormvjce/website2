export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
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
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQFWY2j5mqLOGQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722917947782?e=1744243200&v=beta&t=0zKXH96Y3weJIixjYCi_22OKw4GbyILyWBfswkYu1jA',
        linkedin: 'https://www.linkedin.com/in/vayunv7/',
        category: 'Core Team'
      },
      {
        name: 'Bahulika',
        role: 'Vice Lead',
        photo: 'https://github.com/user-attachments/assets/373ea9ff-f387-4c12-b649-9099c98fd33d',
        linkedin: 'https://www.linkedin.com/in/j-bahulika-8b8237207',
        category: 'Core Team'
      },

      // Technical Team
      {
        name: 'Chandana',
        role: 'Technical Lead',
        photo: 'https://github.com/user-attachments/assets/7ace1c31-119b-4a81-91bd-cba4c55bbf17',
        linkedin: 'https://linkedin.com/in/alapati-mani-chandana/',
        category: 'Core Team',
        department: 'Technical'
      },
      {
        name: 'Rakshitha',
        role: 'Technical Sub-Lead',
        photo: 'https://github.com/user-attachments/assets/e9a92d4c-ebda-4a5c-aac4-f63790df271c',
        linkedin: 'https://www.linkedin.com/in/rakshitha-p-j-0262612ab',
        category: 'Core Team',
        department: 'Technical'
      },

      // Design Team
      {
        name: 'Swetha',
        role: 'Design Lead',
        photo: 'https://github.com/user-attachments/assets/d84c212e-5871-4014-9de1-51a0e65c0aaf',
        linkedin: 'https://www.linkedin.com/in/swetha-sasidharan-3b7147212',
        category: 'Core Team',
        department: 'Design'
      },
      {
        name: 'Angel Susan',
        role: 'Design Sub-Lead',
        photo: 'https://github.com/user-attachments/assets/dcec25ef-fea6-417f-b306-9bdbbed77ac0',
        linkedin: '',
        category: 'Core Team',
        department: 'Design'
      },

      // Content Team
      {
        name: 'Ishaan',
        role: 'Content Lead',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQGMoiqYxlLjPw/profile-displayphoto-shrink_400_400/B56ZQRlQn5GsAg-/0/1735461768477?e=1744243200&v=beta&t=WWaaAPGAVDwTmC4erhQGkIESiVn9HUQijHUnLq88JNk',
        linkedin: 'https://www.linkedin.com/in/ishaan-s-773a9a220',
        category: 'Core Team',
        department: 'Content'
      },

      // Media Team
      {
        name: 'Gunashekar',
        role: 'Media Lead',
        photo: 'https://i.postimg.cc/Jh9XhyJN/Whats-App-Image-2025-04-09-at-22-33-37-b43909fd.jpg',
        linkedin: 'https://www.linkedin.com/in/gunashekarnaidu',
        category: 'Core Team',
        department: 'Media'
      },

      // Technical Team Members
      {
        name: 'Likith Yadav',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/0cc512c1-bad9-4a74-b3f5-00907b863dc4',
        linkedin: 'https://www.linkedin.com/in/likithyadavgn/',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Yusha',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQHTzBVD38cS_w/profile-displayphoto-shrink_400_400/B56ZOSO4GeGsAk-/0/1733325194494?e=1744243200&v=beta&t=zoG90sRPFjjxa85beK5Ooglep4XcQngYkEORoannzqc',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'DIYA R V',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/dfa51dc9-4161-4d9c-8d54-a212d74a078c',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Jashwanth Naidu',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/07fa9d84-2d6b-4dce-942b-d74bcd3d47bc',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Joshua Royar',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/155966e5-50df-4b05-835e-0f880a35a7b8',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Mohammad Sahif Beary',
        role: 'Member',
        photo: '',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Shravik',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/a559c9b5-84a2-4a9a-9240-9f7917dda376',
        linkedin: 'https://www.linkedin.com/in/shravik',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Harshith G Reddy',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/bdb48b83-5d38-4180-bf3e-34bb2cd2cc00',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Piratla Ankit Rama Datt',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D4E03AQFYkh7otrbvEw/profile-displayphoto-shrink_200_200/B4EZPA.w1_H0Ak-/0/1734109500473?e=2147483647&v=beta&t=JlTUgFtyO1BcdvggcbL5Ui0xN_k5Rh2PVxCxQ-ACfV0',
        linkedin: 'https://www.linkedin.com/in/piratla-ankit-rama-datt-302a6b333/',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Sathwik',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/f8146e88-30a4-455a-af60-b174d8d541f6',
        linkedin: 'https://www.linkedin.com/in/sathwik-shetty-572b39314',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Divyey',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/976231f9-2f68-49d2-a54a-9df14c02935a',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Aaghaaz Khan',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQGdE7oGmU8KRw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718446071474?e=1744243200&v=beta&t=cabvt8a6veY3sJ1fk0jHG2IDV8CxAQvGgs-7BPB2PQw',
        linkedin: 'https://www.linkedin.com/in/aaghaaz-khan-778b372a8',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Preetika kour',
        role: 'Member',
        photo: '/avatars/default.jpg',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Rishi Anand',
        role: 'Member',
        photo: '/avatars/default.jpg',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Srikar T',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/4dfccada-0f7c-4df6-bc20-e44e46d435f3',
        linkedin: 'https://www.linkedin.com/in/srikar-t-118581286/',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Sankeerth S banagar',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/afa402c0-ed58-4af8-8d81-f0f132e5114d',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Amrutha Sindhu',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/321deeb6-4c61-4488-a10b-e19c96e28615',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      // Design Team Members
      {
        name: 'Judit',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQH1bquWyMYucQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725685430396?e=1744243200&v=beta&t=0trwCBwkbZ6CY8-O7A3y38LOvoTRPXcJUTqFYzrGD8U',
        linkedin: 'https://www.linkedin.com/in/juditteresabenzy',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Ashwin',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D4E03AQHQNZpZ-YbUmg/profile-displayphoto-shrink_400_400/B4EZPih25MGwAk-/0/1734672349026?e=1744243200&v=beta&t=jNQ2u_CduB9b2KQHqh7OWAfXK5JMR7YC5clu6sullpI',
        linkedin: 'https://www.linkedin.com/in/ashwin-kumar-v-093661302',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Krishnapriya',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/fbe0b01a-bb44-4bae-be75-387ebeb79f0d',
        linkedin: 'https://www.linkedin.com/in/krishna-priya-36334b2b8',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Suhana',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/c73d071f-7e5e-4a5d-99c4-bff1493b05f3',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Samanvitha R K',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQHBaOpZaMZaMQ/profile-displayphoto-shrink_400_400/B56ZQ2vcElH0Ag-/0/1736085193709?e=1744243200&v=beta&t=GFO4tge4VdXbqijZX_oDm5iUPqhGMIGHMCaJGm-0P2A',
        linkedin: 'https://www.linkedin.com/in/samanvitha-r-k-892b51290/',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Bharath Sai Karnati',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQFkMbqHo-22aA/profile-displayphoto-shrink_400_400/B56ZOsz5keG4Ak-/0/1733771107309?e=1744243200&v=beta&t=kBXjKnQdxtPFlHpnQHH2xJV9LUcd9WKfFCqiT5fGXfU',
        linkedin: 'https://www.linkedin.com/in/bharathsj3026',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Gouthami B',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/a3376f9e-73c2-470d-9d91-190d42ac0739',
        linkedin: 'https://www.linkedin.com/in/gouthami-b-476193318',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Z syed zuhaib ahmed',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/9ff1dbff-db71-4608-a7d6-b6a96a75511f',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Om Babu Singh',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/54d9c8f9-6079-424d-b4ad-d2f6c049e20c',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Design'
      },

      // Content Team Members
      {
        name: 'Angelin gia',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQE81h4krdgsng/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727438134179?e=1744243200&v=beta&t=2gyv2at4gOt5XIzGRtz9ZMUqvtd7Lr3mZAoETAfMFhg',
        linkedin: 'https://www.linkedin.com/in/gia-victor-40493032a',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Vanshika jain',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQHZsVNU2-dJQA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690277603957?e=1744243200&v=beta&t=H8touRm1wvwlZ0_vGyMD_3IJnHHWH7Dzg_B26iQXjxg',
        linkedin: 'https://www.linkedin.com/in/vanshika-jain-b97334285',
        category: 'Sub-Team Members',
        department: 'Content'
      },
      {
        name: 'Sanjit Kumaar S',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/cab1488f-334f-4047-bfc0-c345d96cb1c3',
        linkedin: 'https://www.linkedin.com/in/sanjit-ss-b76985228',
        category: 'Sub-Team Members',
        department: 'Content'
      },

      // Media Team Members
      {
        name: 'Bhavesh',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/f73aabb7-d2b4-421a-8fcd-2ba2139f54c1',
        linkedin: 'https://www.linkedin.com/in/bhavesh-chhabria-21630433b',
        category: 'Sub-Team Members',
        department: 'Media'
      },
      {
        name: 'Prasanna Rajendran',
        role: 'Member',
        photo: '',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Media'
      },
      {
        name: 'Kaviya S',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D4E03AQHfv94uILvFhw/profile-displayphoto-shrink_400_400/B4EZR.jLZEHMAg-/0/1737289939785?e=1744243200&v=beta&t=ht2LcSssLRvHpZDbO9POD2qVSRK8PdBEmhi51T4AHDE',
        linkedin: 'https://www.linkedin.com/in/kaviya-sendhil-009681347',
        category: 'Sub-Team Members',
        department: 'Media'
      },
      {
        name: 'Surabhi M R',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQGGcdbNDhgXmA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731924641621?e=1745452800&v=beta&t=OcbHjRhaya5btsowBqFkC8l_x_gBOFX2WUMW0NgqW_c',
        linkedin: 'https://www.linkedin.com/in/surabhi-m-r-baab98312/',
        category: 'Sub-Team Members',
        department: 'Media'
      },
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
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQFWY2j5mqLOGQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722917947782?e=1744243200&v=beta&t=0zKXH96Y3weJIixjYCi_22OKw4GbyILyWBfswkYu1jA',
        linkedin: 'https://www.linkedin.com/in/vayunv7/',
        category: 'Core Team'
      },
      {
        name: 'Bahulika',
        role: 'Vice Lead',
        photo: 'https://github.com/user-attachments/assets/373ea9ff-f387-4c12-b649-9099c98fd33d',
        linkedin: 'https://www.linkedin.com/in/j-bahulika-8b8237207',
        category: 'Core Team'
      },
      {
        name: 'Chandana',
        role: 'Technical Lead',
        photo: 'https://github.com/user-attachments/assets/7ace1c31-119b-4a81-91bd-cba4c55bbf17',
        linkedin: 'https://linkedin.com/in/alapati-mani-chandana/',
        category: 'Core Team',
        department: 'Technical'
      },
      {
        name: 'Rakshitha',
        role: 'Technical Sub-Lead',
        photo: 'https://github.com/user-attachments/assets/e9a92d4c-ebda-4a5c-aac4-f63790df271c',
        linkedin: 'https://www.linkedin.com/in/rakshitha-p-j-0262612ab',
        category: 'Core Team',
        department: 'Technical'
      },
      {
        name: 'Swetha',
        role: 'Design Lead',
        photo: 'https://github.com/user-attachments/assets/d84c212e-5871-4014-9de1-51a0e65c0aaf',
        linkedin: 'https://www.linkedin.com/in/swetha-sasidharan-3b7147212',
        category: 'Core Team',
        department: 'Design'
      },
      {
        name: 'Angel Susan',
        role: 'Design Sub-Lead',
        photo: 'https://github.com/user-attachments/assets/dcec25ef-fea6-417f-b306-9bdbbed77ac0',
        linkedin: '',
        category: 'Core Team',
        department: 'Design'
      },
      {
        name: 'Ishaan',
        role: 'Content Lead',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQGMoiqYxlLjPw/profile-displayphoto-shrink_400_400/B56ZQRlQn5GsAg-/0/1735461768477?e=1744243200&v=beta&t=WWaaAPGAVDwTmC4erhQGkIESiVn9HUQijHUnLq88JNk',
        linkedin: 'https://www.linkedin.com/in/ishaan-s-773a9a220',
        category: 'Core Team',
        department: 'Content'
      },
      {
        name: 'Gunashekar',
        role: 'Media Lead',
        photo: 'https://i.postimg.cc/Jh9XhyJN/Whats-App-Image-2025-04-09-at-22-33-37-b43909fd.jpg',
        linkedin: 'https://www.linkedin.com/in/gunashekarnaidu',
        category: 'Core Team',
        department: 'Media'
      },


      // Sub-Team Members
      // Technical Team Members
      {
        name: 'Jashwanth Naidu',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/07fa9d84-2d6b-4dce-942b-d74bcd3d47bc',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },
      {
        name: 'Divyey',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/976231f9-2f68-49d2-a54a-9df14c02935a',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Technical'
      },

      // Design Team Members
      {
        name: 'Judit',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQH1bquWyMYucQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725685430396?e=1744243200&v=beta&t=0trwCBwkbZ6CY8-O7A3y38LOvoTRPXcJUTqFYzrGD8U',
        linkedin: 'https://www.linkedin.com/in/juditteresabenzy',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Likith Yadav',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/0cc512c1-bad9-4a74-b3f5-00907b863dc4',
        linkedin: 'https://www.linkedin.com/in/likithyadavgn/',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Ashwin',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D4E03AQHQNZpZ-YbUmg/profile-displayphoto-shrink_400_400/B4EZPih25MGwAk-/0/1734672349026?e=1744243200&v=beta&t=jNQ2u_CduB9b2KQHqh7OWAfXK5JMR7YC5clu6sullpI',
        linkedin: 'https://www.linkedin.com/in/ashwin-kumar-v-093661302',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Krishnapriya',
        role: 'Member',
        photo: 'https://github.com/user-attachments/assets/fbe0b01a-bb44-4bae-be75-387ebeb79f0d',
        linkedin: 'https://www.linkedin.com/in/krishna-priya-36334b2b8',
        category: 'Sub-Team Members',
        department: 'Design'
      },
      {
        name: 'Yusha',
        role: 'Member',
        photo: 'https://media.licdn.com/dms/image/v2/D5603AQHTzBVD38cS_w/profile-displayphoto-shrink_400_400/B56ZOSO4GeGsAk-/0/1733325194494?e=1744243200&v=beta&t=zoG90sRPFjjxa85beK5Ooglep4XcQngYkEORoannzqc',
        linkedin: '',
        category: 'Sub-Team Members',
        department: 'Design'
      }
    ]
  },
  // Add 2025-26 team data here when available
];
