import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import MemberShip from '../components/tables/MemberShip';
import Newsletter from '../components/sections/Newsletter';

const memberShips = [
  {
    name: 'Power',
    options: [
      {
        title: 'Membership cost',
        key: 'cost',
        type: 'String',
        value: '2 ETH'
      },
      {
        title: 'Availability',
        key: 'availability',
        type: 'Number',
        value: 1000
      },
      {
        title: 'Artwork',
        key: 'artwork',
        type: 'Boolean',
        value: true
      },
      {
        title: 'Voting',
        key: 'voting',
        type: 'String',
        value: '1 vote per token'
      },
      {
        title: 'Events & Pop-ups(physical & virtual)',
        key: 'events',
        type: 'String',
        value: 'Can bring up to 2 guests per token.'
      },
      {
        title: 'Boat Size',
        key: 'boat_size',
        type: 'String',
        value: 'Access to charter exclusive VIP yachts 36ft -50ft'
      },
      {
        title: 'Additional Benefits',
        key: 'benefits',
        type: 'String',
        value: ''
      },
      {
        title: 'Access to future partnership benefits',
        key: 'future',
        type: 'String',
        value: 'Coming Soon'
      }
    ]
  },
  {
    name: 'Yacht',
    options: [
      {
        title: 'Membership cost',
        key: 'cost',
        type: 'String',
        value: '4 ETH'
      },
      {
        title: 'Availability',
        key: 'availability',
        type: 'Number',
        value: 1000
      },
      {
        title: 'Artwork',
        key: 'artwork',
        type: 'Boolean',
        value: true
      },
      {
        title: 'Voting',
        key: 'voting',
        type: 'String',
        value: '2 vote per token'
      },
      {
        title: 'Events & Pop-ups(physical & virtual)',
        key: 'events',
        type: 'String',
        value: 'Can bring up to 4 guests per token.'
      },
      {
        title: 'Boat Size',
        key: 'boat_size',
        type: 'String',
        value: 'Charter exclusive VIP yachts 50ft-60ft'
      },
      {
        title: 'Additional Benefits',
        key: 'benefits',
        type: 'String',
        value: 'Access to exclusive travel experiences'
      },
      {
        title: 'Access to future partnership benefits',
        key: 'future',
        type: 'String',
        value: 'Coming Soon'
      }
    ]
  },
  {
    name: 'Prestige',
    options: [
      {
        title: 'Membership cost',
        key: 'cost',
        type: 'String',
        value: '6 ETH'
      },
      {
        title: 'Availability',
        key: 'availability',
        type: 'Number',
        value: 1000
      },
      {
        title: 'Artwork',
        key: 'artwork',
        type: 'Boolean',
        value: true
      },
      {
        title: 'Voting',
        key: 'voting',
        type: 'String',
        value: '3 vote per token'
      },
      {
        title: 'Events & Pop-ups(physical & virtual)',
        key: 'events',
        type: 'String',
        value: 'Can bring up to 6 guests per token.'
      },
      {
        title: 'Boat Size',
        key: 'boat_size',
        type: 'String',
        value: 'Charter exclusive VIP yachts 60ft-70ftt'
      },
      {
        title: 'Additional Benefits',
        key: 'benefits',
        type: 'String',
        value: 'Access to exclusive travel experiences'
      },
      {
        title: 'Access to future partnership benefits',
        key: 'future',
        type: 'String',
        value: 'Coming Soon'
      }
    ]
  }
];

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>FATHOM YACHT CLUB - Fathom Yacht Club</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className="sm:pt-20">
        <section className="bg-background-light pt-20 sm:my-1 pb-36">
          <div className="container">
            <div className="block sm:flex items-center">
              <div className="w-full sm:w-1/2 pr-2 pl-2 mb-28 sm:mb-0 sm:pl-0 sm:pr-12">
                <h1 className="text-primary font-semibold font-muli text-6xl py-4 mb-4">NFT Yacht Club</h1>
                <p className="text-black text-xl font-light py-2 mb-8 leading-9">Fathom Yacht Club is one of the first decentralized Yacht and Social Clubs where membership is purchased through an NFT “token.” The token holder will have access to various social and VIP experiences in digital and physical spaces.</p>

                <button className="uppercase bg-gradient-to-br from-background-primary to-background-secondary text-17px text-white py-3 px-9 rounded-full font-pop font-semibold">Coming Soon</button>
              </div>
              <div className="w-full sm:w-1/2 sm:pl-2">
                <Image src="/images/hero-banner.jpg" className="w-full h-full" width={1600} height={1067} />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full min-h-96 yacht-section-1"></section>

        <section className="container py-28 w-4/5">
          <h2 className="text-primary text-6xl py-8 mb-4 text-center font-muli font-light">Exclusive Membership</h2>

          <p className="pb-4 text-xl font-robo font-light mb-4 leading-9">Unlike traditional yacht clubs and social organizations that rely heavily on the proximity of its members in relation to a physical location of the club, Fathom Yacht Club will be a global community of thousands of forward thinking, like minded, individuals that will have the opportunity to meet regularly through our digital and virtual platforms and also have physical access to various real world experiences such as social events, parties, flotillas, and access to use of real world boats and yachts 35’ to 75’ and larger.</p>

          <h3 className="text-3xl text-primary font-abel font-medium py-4">Creating Value for Our Members</h3>
          <p className="text-xl font-robo font-light leading-9">Fathom Yacht Club NFT membership becomes an asset to the token holder that can be sold, transferred, or leased to others on the secondary market. By utilizing NFT’s, FYC can create a member-driven community to provide unique experiences for token holders. In addition, NFTs create an opportunity that allows FYC to deliver exceptional and dynamic offerings well into the future.  </p>

          <h3 className="text-3xl text-primary font-abel font-medium py-4">FYC’s Commitment to Ocean Conservation</h3>
          <p className="text-xl font-robo font-light leading-9">FYC recognizes the importance of protecting the world’s oceans. Therefore, FYC has committed to donating 10% of all royalties that FYC receives annually to a charity dedicated to ocean conservation.</p>
        </section>

        <section className="w-full min-h-96 yacht-section-2 mt-8"></section>

        <section className="container py-28 w-4/5">
          <h2 className="text-primary text-5xl font-muli font-medium text-center py-8">Membership Tokens</h2>

          <MemberShip memberShips={memberShips} />
        </section>

        <section>
          <Newsletter />
        </section>
      </main>
    </React.Fragment>
  );
};
