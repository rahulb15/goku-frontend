import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const params = useParams();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(parseInt(params.id));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="tabsOuter">
      <div className="tabsNavLeft">
        <h4>Articles in this section</h4>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className="tabsNav"
        >
          <Tab label="What is a wallet?" {...a11yProps(0)} />
          <Tab label="Navigating Kryptomerch" {...a11yProps(1)} />
          <Tab label="What is a Non-Fungible Token (NFT)?" {...a11yProps(2)} />
          <Tab label="What is a crypto wallet?" {...a11yProps(3)} />
          <Tab
            label="What currencies can I use on Kryptomerch?"
            {...a11yProps(4)}
          />
          <Tab label="How do I purchase Kadena (KDA)?" {...a11yProps(5)} />
          <Tab label="What are service and creator fees?" {...a11yProps(6)} />
          <Tab label="How do I search for NFTs?" {...a11yProps(7)} />
          <Tab
            label="How do I log out of my Kryptomerch account or switch crypto wallets?"
            {...a11yProps(8)}
          />
          <Tab label="What if my wallet is not connecting?" {...a11yProps(9)} />
        </Tabs>
      </div>
      <div className="tabPanalRight">
        <TabPanel value={value} index={0}>
          <h2 className="bold">What is a wallet?</h2>
          <p>
            NFTs use blockchain technology to demonstrate ownership of a unique
            digital asset such as art, music, collectibles, videos, or anything
            else.
          </p>
          <p>
            NFT stands for non-fungible token. That sounds like an intimidating
            technical term (no more nerd talk, promise!). However, NFTs are
            purely digital certificates of authenticity.
          </p>
          <p>
            When you buy a physical painting, you can tell it's genuine because
            you can see the artist's signature on the canvas. Someone can
            photocopy the painting, but they do not own it; you do. Before NFTs,
            digital assets were analogous to photocopies:
          </p>
          <p>
            You can see who posted something, but you can't see who owns an
            Instagram post, Pinterest pin, or Reddit meme.
          </p>
          <p>
            NFTs function as a digital signature: They validate the ownership of
            digital assets such as art, collectibles, music, videos, in-game
            assets, and more. They document, in the same way that physical
            certificates do:
          </p>
          <p>
            Who created it?
            <br />
            When it was created?
            <br />
            Who bought it? (and when)
            <br />
            The selling price(s)?
            <br />
            Who owns it now?
            <br />
            (Technically, NFTs can contain any data that the creator desires,
            but the above are the most important.)
          </p>
          <p>
            All of this is public via a blockchain, so anyone can trace each of
            your NFTs from the original creator all the way to your wallet—and
            verify its authenticity (even your friends who think you're crazy
            for buying a profile picture).
          </p>
          <p>
            However, owning digital assets is more than a "nice to have," a fun
            experience, or a digital stamp collection:
          </p>
          <p>
            Some NFTs grant access to exclusive communities, allow you to
            contribute to projects, and provide premium access to software
            products... We could go on and on about awesome features, but that
            list would be endless, and our writer needs to finish this before
            tomorrow's meeting. To be honest, because this technology is so new,
            we've probably just seen 4.20% of the possible applications.
          </p>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <h2 className="bold">Navigating Kryptomerch</h2>
          <p>
            A blockchain is a network of computers that track transactions in
            their network and generate a massive ledger of who owns what (and
            how much of it). That's a lot of beep boop action!
          </p>
          <p>
            So, if you ignore your well-meaning friends' advice and spend six
            figures on a CryptoPunk, computers all over the world confirm you as
            the NFT's new owner—and ensure it stays in your wallet..
          </p>
          <p>Blockchains that support NFTs include:</p>
          <p>Kadena, Ethereum, Polygon, Nervos, Solana...and many more</p>
          <p>
            Kryptomerch currently allows for the sale and purchase of digital
            assets on the Kadena blockchains, with more blockchains to be
            integrated soon.
          </p>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h2 className="bold">What is a Non-Fungible Token (NFT)?</h2>
          <p>
            Please bear with us as we briefly revisit some technical topics.
            Both of these methods, known as "consensus mechanisms," are used by
            blockchains to ensure the validity of transactions. The
            technological differences are substantial, but we promised not to
            bore you with the details; instead, let's focus on what really
            matters to you.
          </p>
          <p>The most significant real-world distinctions are:</p>
          <p>
            While Proof of Work ensures a completely decentralised and secure
            blockchain, it comes at a high cost in terms of energy usage and
            transaction speed due to its reliance on miners and their hardware
            to verify each block. Furthermore, it can cause substantial costs
            associated with trading or minting Ethereum-based NFTs. However
            Kadena is a completely different ball game. Know more here
            kryptomerch.io/Aboutus
          </p>
          <p>
            Since blocks are published by stakers, the PoS equivalent of miners,
            who lock up their funds in a smart contract, Proof of Stake
            blockchains typically offer cheaper costs and higher performance.
            These blockchains have a reduced carbon footprint and significantly
            lower energy requirements than their predecessors because to their
            increased efficiency and the elimination of costly, resource-hogging
            hardware.
          </p>
          <p>
            Proof of Work and Proof of Stake blockchains are identical in terms
            of the user experience and how digital assets are traded.
          </p>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h2 className="bold">What is a crypto wallet?</h2>
          <p>
            You can contact us using the contact button found at the bottom of
            the page.Please fill out the form with the detailed description of
            the issue you’re facing, we pinky promise to get back to you asap.
            Meanwhile you can find more help at our Discord, Telegram and
            Twitter spaces.{" "}
          </p>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <h2 className="bold">What currencies can I use on Kryptomerch?</h2>
          <p>
            Your physical wallet likely holds some sort of identification, some
            cash, and perhaps some photos of your loved ones (we'll ignore the
            three-year-old Times card with the $2.01 on it).
          </p>
          <p>
            A blockchain-based cryptocurrency wallet performs this function.
            Included are your "ID" (a lengthy string of numbers and letters),
            your cryptocurrency holdings, and any NFTs purchased with them. Some
            examples of wallet providers are Metamask (the most widely used and
            straightforward), X wallet, Chainweaver, and Wallet connect.
          </p>
          <p>
            If you lose access to your cryptocurrency or NFTs, you can retrieve
            them by using a "seed phrase," a string of words generated when you
            create your cryptocurrency wallet.
          </p>
          <p>
            DO NOT EVER REVEAL YOUR SEED PHRASE WITH ANYONE. If someone learns
            your seed phrase, they can use it to spend, send, or receive money
            from your wallet. No reputable person or organisation, including
            Kryptomerch support, will ever ask you for your seed phrase.
          </p>
          <p>
            When using Kryptomerchor any other platform that accepts
            cryptocurrencies or NFTs for payment, it is necessary to link a
            wallet in order to authenticate your identity.
          </p>
          <p>Kryptomerchsupports many different wallet connection methods.</p>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <h2 className="bold">How do I purchase Kadena (KDA)?</h2>
          <p>
            Since wallets are costless, it's up to the user to try out several
            services until they find one they prefer. A seed phrase allows you
            to transfer your wallet to a different service provider's app
          </p>
          <p>
            Both a mobile app and a browser extension, MetaMask is a popular
            choice for accessing the Ethereum blockchain. X wallet is one of the
            most accessible wallets on Kadena blockchain. The interface and
            navigation features of X Wallet are excellent. You may open a
            business account with Coinbase, a popular cryptocurrency wallet.
          </p>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <h2 className="bold">What are service and creator fees?</h2>
          <p>
            Gas fees on Kadena are very minimal for fast transactions and they
            will always be cheap thanks to its multi-chain protocol that allows
            for more chains to be added to meet rising demand of the blockchain.
            It is also the most efficient POW consensus in terms of Electricity
            utilization. You can find more info on Kadena.io
          </p>
        </TabPanel>
        <TabPanel value={value} index={7}>
          <h2 className="bold">How do I search for NFTs?</h2>
          <p>
            When you create an NFT, you "mint" it, which may require a network
            cost (none of this goes to Kryptomerch).
          </p>
          <p>
            Blockchain and minting option determine fees. Minting, purchasing,
            and selling require blockchain fees. Imagine roadtrip highways. Some
            are Free. Others have cheap or high tolls.
          </p>
          <p>New NFTs require two interactions:</p>
          <p>
            NFT-minting
            <br />
            Selling NFTs
          </p>
          <p>
            Ethereum, a prominent blockchain, has greater costs, while Kadena is
            cheaper. Most important is minting where your audience has their
            wallets, not fees. These are chain-specific.
          </p>
          <p>
            Or mint free! Our coders discovered out how to mint without paying,
            by launching on Kadena.
          </p>
          <p>
            If you activate "free minting," the buyer pays the fees. Fans buying
            your creations may be surprised by fees. Free minting adds your
            invention to Kryptomerch's collection, not yours. Launching a
            collection costs money.
          </p>
        </TabPanel>
        <TabPanel value={value} index={8}>
          <h2 className="bold">
            How do I log out of my Kryptomerch account or switch crypto wallets?
          </h2>
          <p>
            Kryptomerch makes NFTs in under 5 minutes (my best is 2:59). (Don't
            rush if you're not sure, though.)
          </p>
          <p>
            Start by clicking Create on Kryptomerch homepage. We delist stolen
            work, so listing stuff you don't own wastes gas and money.
          </p>
          <p>You're here to make NFTs, right?</p>
          <p>Configure the NFT:</p>
          <p>Choose where to mint your NFT.</p>
          <p>
            Choose a single- or multiple-edition NFT. Single creates a unique
            piece; Multiple creates a series.
          </p>
          <p>
            File upload. PNG, GIF, WEBP, MP4 or MP3 are acceptable. Under 100
            megabytes.
          </p>
          <p>
            Organize your NFTs. You can use the default collection or create
            your own to help fans find your work.
          </p>
          <p>Give your painting a catchy title and description to sell it.</p>
          <p>Choose from fixed-price, open, and timed sales.</p>
          <p>
            Choose secondary sale royalties (you receive these fees based on the
            total sale price each time your NFT sells).
          </p>
          <p>Optional: Add secret connections, vector files, etc.</p>
          <p>Free Minting skips gas expenses (if you want to).</p>
          <p>
            Click "Create item," sign your wallet, and your work is on
            Kryptomerch!
          </p>
        </TabPanel>
        <TabPanel value={value} index={9}>
          <h2 className="bold">What if my wallet is not connecting?</h2>
          <p>
            You can't resist an NFT? Here's how:Click the desired item. The page
            lists information: Owners, creator, history.
            <br />
            <br />
            If the NFT has a fixed price, click "Buy" like an online store. You
            can pay using bitcoin (you'll need some for the right blockchain) or
            a credit card.
            <br />
            <br />
            Click "Place a bid," follow the procedures, and hope you win.
            Auctions don't accept credit cards.
            <br />
            If you're not sure what to buy, visit Kryptomerch's Explore area.
            <br />
            <br />
            We recommend buying from verified users with a yellow checkmark.
            These are verified creators.
          </p>
        </TabPanel>
      </div>
    </div>
  );
}
