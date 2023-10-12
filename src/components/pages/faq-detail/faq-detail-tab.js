import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
//import { Block } from '@mui/icons-material';

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
          <Tab label="What is an NFT?" {...a11yProps(0)} />
          <Tab label="What is a blockchain?" {...a11yProps(1)} />
          <Tab
            label="What are Proof of Work (PoW) and Proof of Stake (PoS) blockchains?"
            {...a11yProps(2)}
          />
          <Tab label="How can I contact kryptomerch?" {...a11yProps(3)} />
          <Tab label="What is a wallet? Do I need one?" {...a11yProps(4)} />
          <Tab
            label="Where should I start looking for a good wallet?"
            {...a11yProps(5)}
          />
          <Tab label="What are gas fees on Kadena?" {...a11yProps(6)} />
          <Tab label="What does an NFT cost?" {...a11yProps(7)} />
          <Tab label="How can I make a Kryptomerch NFT?" {...a11yProps(8)} />
          <Tab label="How do I buy a Kryptomerch NFT?" {...a11yProps(9)} />
          <Tab
            label="Can I pay with a credit card on Kryptomerch?"
            {...a11yProps(10)}
          />
          <Tab
            label="In comparison to competing NFT marketplaces, what sets Kryptomerch apart?"
            {...a11yProps(11)}
          />
          <Tab label="What are Kryptomerch's fees?" {...a11yProps(12)} />
          <Tab
            label="Which blockchains does Kryptomerch support?"
            {...a11yProps(13)}
          />
          <Tab
            label="I want this yellow badge too! How do I get verified?"
            {...a11yProps(14)}
          />
          <Tab
            label="Will I be entitled to royalties on secondary sales of my NFTs if I mint them on Kryptomerch?"
            {...a11yProps(15)}
          />
          <Tab label="How do I gift an NFT to someone?" {...a11yProps(16)} />
          <Tab
            label="Can I hide NFTsfrom my Kryptomerch profile?"
            {...a11yProps(17)}
          />
          <Tab
            label="NFTs apparently harm the environment. Your thoughts?"
            {...a11yProps(18)}
          />
          <Tab
            label="My verification request was rejected. Can I reapply?"
            {...a11yProps(19)}
          />
          <Tab
            label="I bought an NFT from someone, but I think I was scammed. What happened?"
            {...a11yProps(20)}
          />
          <Tab
            label="Is connecting my wallet toKryptomerch secure?"
            {...a11yProps(21)}
          />
          <Tab
            label="I think I minted duplicate NFTs. Is that even possible?"
            {...a11yProps(22)}
          />
          <Tab label="Kryptomerch removed my NFT. Why?" {...a11yProps(23)} />
        </Tabs>
      </div>
      <div className="tabPanalRight">
        <TabPanel value={value} index={0}>
          <h2 className="bold">What is an NFT?</h2>
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
          <h2 className="bold">What is a blockchain?</h2>
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
          <h2 className="bold">
            What are Proof of Work (PoW) and Proof of Stake (PoS) blockchains?
          </h2>
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
          <h2 className="bold">How can I contact kryptomerch?</h2>
          <p>
            You can contact us using the contact button found at the bottom of
            the page.Please fill out the form with the detailed description of
            the issue you’re facing, we pinky promise to get back to you asap.
            Meanwhile you can find more help at our Discord, Telegram and
            Twitter spaces.{" "}
          </p>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <h2 className="bold">What is a wallet? Do I need one?</h2>
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
          <h2 className="bold">
            {" "}
            Where should I start looking for a good wallet?
          </h2>
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
          <h2 className="bold">What are gas fees on Kadena??</h2>
          <p>
            Gas fees on Kadena are very minimal for fast transactions and they
            will always be cheap thanks to its multi-chain protocol that allows
            for more chains to be added to meet rising demand of the blockchain.
            It is also the most efficient POW consensus in terms of Electricity
            utilization. You can find more info on Kadena.io
          </p>
        </TabPanel>
        <TabPanel value={value} index={7}>
          <h2 className="bold">Why is the What does an NFT cost?</h2>
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
          <h2 className="bold">How can I make a Kryptomerch NFT?</h2>
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
          <h2 className="bold">How do I buy a Kryptomerch NFT?</h2>
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

        <TabPanel value={value} index={10}>
          <h2 className="bold">Can I pay with a credit card on Kryptomerch?</h2>
          <p>
            Yes, definetly.We accept credit card payments for fixed price
            listings and Merchandising protocol. We do not accept credit card
            for auctions.
          </p>
        </TabPanel>

        <TabPanel value={value} index={11}>
          <h2 className="bold">
            In comparison to competing NFT marketplaces, what sets Kryptomerch
            apart?
          </h2>
          <p>
            Oh my goodness, Kryptomerch isn't the only online marketplace
            available? What year did that take place in? Nah, just joking. To
            the contrary, consider these Kryptomerch benefits: <br />
            <br />
            NFT based merchandising. No NFT Marketplace provides real world
            utility for your NFTs. Imagine wearing your favorite NFT on your
            choice of Merchandise. Isn't that cool?
            <br />
            <br />
            Also, Low cost to you whatsoever! We offer a Low-cost alternative to
            the other exchanges that need you to pay for all minting fees.
            <br />
            Not all markets are compatible with more than one blockchain. Since
            those NFTs exist on other chains, you can't access them.Use a credit
            card if you choose, as not everyone is ready to dive headfirst into
            the cryptocurrency market. You can use your credit card to buy
            things on Kryptomerch just as you would at any other online
            retailer.
            <br />
            Sure, we can discuss this until the cows come home. For More info,
            please read about us.
          </p>
        </TabPanel>

        <TabPanel value={value} index={12}>
          <h2 className="bold">What are Kryptomerch's fees?</h2>
          <p>
            Kryptomerch takes 1% on the buyer side and 1% on the seller side
            from every sale happening on the marketplace. Lowest on Kadena.
            That’s it.
          </p>
        </TabPanel>
        <TabPanel value={value} index={13}>
          <h2 className="bold">Which blockchains does Kryptomerch support?</h2>
          <p>
            Kryptomerch is a multichain marketplace, meaning you can buy, mint
            and sell NFTs on multiple blockchains.
            <br />
            <br />
            More specifically, that means you can choose which audience you want
            to reach, the carbon footprint you’re comfortable with and the fees
            you want to pay.
            <br />
            <br />
            The Web3 space has no bounds, so neither do we.
            <br />
            <br />
            Kryptomerch currently supports Kadena with more blockchains like
            Ethereum, Polygon, Solana, Flow and Tezos to be integrated in the
            near future.
            <br />
            <br />
            You can switch between the supported blockchains under the “Explore”
            tab on Kryptomerch.io. When you mint your (first) NFT, you need to
            choose which blockchain it’s on.
            <br />
            <br />
            Important note: Once you’ve minted an NFT on one blockchain, you
            can’t move it to another. You can mint the same artwork on multiple
            blockchains by creating multiple NFTs.
          </p>
        </TabPanel>

        <TabPanel value={value} index={14}>
          <h2 className="bold">
            I want this yellow badge too! How do I get verified?
          </h2>
          <p>
            We’d love to have you join the fam!Unlike social media, you don’t
            need hundreds of thousands of followers to get verified. All you
            need is a profile, basically. So if you’ve always envied celebrities
            with checkmarks on social media, now’s your time to get some of that
            clout!
            <br />
            <br />
            To apply for verification and swag up your Kryptomerch profile with
            the badge, please see this typeform.
            <br />
            <br />
            In case you forget to include something in your application and it
            gets rejected, don’t worry! You can reapply at any moment.
          </p>
        </TabPanel>
        <TabPanel value={value} index={15}>
          <h2 className="bold">
            Will I be entitled to royalties on secondary sales of my NFTs if I
            mint them on Kryptomerch?
          </h2>
          <p>
            Yes! We won't make you sign up for secondary royalties unless you
            want to, but making money off of every resale is a great opportunity
            for artists. When you mint your NFT as a creator, you have the
            ability to select the royalties that you will receive. After that,
            every time one of your NFTs is sold, a predetermined amount of the
            sale price—typically between 5 and 10 percent—will be put into your
            wallet.
            <br />
            <br />
            It's always a good sensation to get out of bed and find new money in
            your wallet.
            <br />
            <br />
            I’ve already minted my collection on another marketplace. Can I
            relist it on Kryptomerch to get royalties on secondary sales?Yes,
            we’ve got you covered! You can list your existing collection on
            Kryptomerch.io and add custom royalties for multiple addresses.
            <br />
            <br />
            Please refer to this blog post for a detailed instruction on how to
            do that.
          </p>
        </TabPanel>
        <TabPanel value={value} index={16}>
          <h2 className="bold">How do I gift an NFT to someone??</h2>
          <p>
            Want to make your friend, par tner or family smile with an NFT
            gift?Awesome!
            <br />
            <br />
            You can transfer any NFT by clicking "Transfer" on its page.We
            support NFT gifting on Kadena.
            <br />
            <br />
            Simply paste the Kadena wallet address of the address you want to
            send on the NFT page, please make sure to check the address, we will
            not be able to recover your assets sent to a wrong address.
          </p>
        </TabPanel>
        <TabPanel value={value} index={17}>
          <h2 className="bold">Can I hide NFTsfrom my Kryptomerch profile?</h2>
          <p>
            Without a doubt. You have the right to keep as many skeletons (or
            apes) as you want in your closet.
            <br />
            <br />
            Go to your profile, find the NFT you want to hide, and click the
            ellipsis [...] in the upper right corner of its card. Then choose
            'Hide from owned.
            <br />
            <br />
            'Voila! That NFT is now displayed under the 'Hidden' tap, which only
            you can see. You are free to republish it whenever you want.
            <br />
            <br />
            Important: Hiding an NFT on Rarible only hides it on Rarible; the
            NFT will still be visible in a block explorer or other marketplace.
          </p>
        </TabPanel>
        <TabPanel value={value} index={18}>
          <h2 className="bold">
            NFTs apparently harm the environment. Your thoughts?
          </h2>
          <p>
            Ethereum and other proof-of-work blockchains consume a lot of
            energy. However, Kadena is the only POW blockchain that consumes
            energy like proof of stake.
          </p>
        </TabPanel>
        <TabPanel value={value} index={19}>
          <h2 className="bold">
            My verification request was rejected. Can I reapply?
          </h2>
          <p>
            If you’re on Kryptomerch, you’re obviously an awesome, real human
            being. If you got rejected, you probably just forgot something in
            your application.
            <br />
            <br />
            So if you were rejected, you can reapply!
            <br />
            <br />
            That said, there are a few reasons why we reject verification
            requests. If you’re missing one of the requirements, you can’t get
            the checkmark.
            <br />
            <br />
            If we wrongfully rejected you (or you forgot something), find the
            special link in your email that lets you edit your application and
            resubmit.
            <br />
            <br />
            The most important requirements for verification are:
            <br />
            <br />
            Active social media links that display your digital
            artworkWork-in-progress images, taken prior to the completion of
            your NFTA biography
            <br />
            Once you’re ready to resubmit, hit Save Edits—And we’re sure you’ll
            have that badge in no time
          </p>
        </TabPanel>
        <TabPanel value={value} index={20}>
          <h2 className="bold">
            I bought an NFT from someone, but I think I was scammed. What
            happened?
          </h2>
          <p>
            One of the best things about web3 is that anyone can transact with
            anyone else anonymously. Unfortunately, that also applies to
            scammers.
            <br />
            <br />
            While we immediately ban any confirmed scammers from our platform,
            web3 is permissionless. So the best way you can keep yourself from
            getting scammed is doing your due diligence and research on anyone
            you buy or trade NFTs with.
          </p>
        </TabPanel>
        <TabPanel value={value} index={21}>
          <h2 className="bold">
            Is connecting my wallet toKryptomerch secure?
          </h2>
          <p>
            Just like your physical wallet, your crypto wallet is secure as long
            as you don't compromise it.You only give Kryptomerch permission to
            "see the addresses of your approved accounts" when you link your
            wallet, so we can't take anything out.Any transaction that costs you
            money will require a confirmation pop-up.But what about other
            websites? Guidelines:Hacking crypto wallets is difficult. Most
            "hacks" are essentially mistakes: The owner visited a harmful site
            or granted a scammer access to their wallet.Bad actors sometimes DM
            you from a phoney support account to get the 12-word seed phrase.
            NEVER say this. Writing it down keeps it offline.We're on the
            cutting edge of technology and telling you to write. Only you can
            protect your wallet, therefore here are some tips:Do not Share
            private keys, seed phrases, and wallet passwords.Safely store your
            private keys in a validated digital vault.Verify every transaction
            and only connect your wallet to trusted websites/apps.
          </p>
        </TabPanel>
        <TabPanel value={value} index={22}>
          <h2 className="bold">
            I think I minted duplicate NFTs. Is that even possible?
          </h2>
          <p>
            What’s better than an NFT? 2 NFTs! But you don't always want to mint
            2 NFTs of the same artwork. Unfortunately, it can happen by
            accident.For instance, if you take a break between sessions and
            allow your browser to time out at the wrong moment, you might mint
            duplicates.Another way to get duplicates is to submit another NFT
            while your first one is still in the queue.The best way to prevent
            double minting is to be patient while your transaction is pending
            and wait for it to confirm before doing anything else.The good news:
            if your transaction is still pending, you may be able to use this
            link to cancel it.
          </p>
        </TabPanel>
        <TabPanel value={value} index={23}>
          <h2 className="bold">Kryptomerch removed my NFT. Why?</h2>
          <p>
            NFTs are decentralised and stored on the blockchain forever, thus
            it's odd to see one disappear from our platform.Kryptomerch can't
            erase anything from your wallet or blockchain. You still own your
            NFTs.Kryptomerch may have them. We can delist collections, goods,
            and accounts that break community guidelines, copyright laws, or
            other laws.Yo u m a y h a ve r e c e i ve d t h e n o t i f i c a t
            i o n " T h i s i t e m h a s b e e n withdrawn from public access"
            if you can't see your NFT on Kryptomerch. Your art or account has
            been blocked and/or blacklisted.A digital asset breaches
            Kryptomerch's copyright laws, regulations, or community norms. We
            eliminate suspected copyright infringement, fraud, money laundering,
            and other violations of (inter-)national laws or our TOS.Removing
            harmful things keeps Kryptomerch amazing for everyone. Once we
            delete an NFT or profile, we review each copyright dispute and legal
            concern – even if you recently bought a blacklisted NFT.
          </p>
        </TabPanel>
      </div>
    </div>
  );
}
