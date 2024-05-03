import React, { useState } from "react";
import {artedge_backend} from "../../../declarations/artedge_backend";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InfinitySpin } from 'react-loader-spinner';

// let actor = artedge_backend;

export default function TrainingModule({ addPoints }) {

  // need to rewrite points system and deliver training steps as a list that I iterate
  const [expanded, setExpanded] = useState(false);

  const handleChecked = (event) => {
    addPoints(11);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <FormGroup>
        <Accordion expanded={expanded === 'panelIntro'} onChange={handleChange('panelIntro')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panelIntrobh-content"
            id="panelIntrobh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Intro
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>1000 True Fans</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography color="text.secondary">
          Here's a summary of "1,000 True Fans" by Kevin Kelly in 10 points:
          </Typography>
          <Typography color="text.secondary">
          <br></br>1. <strong>Key Concept:</strong> The idea revolves around the concept that to sustain a creative career or business, you don't need millions of fans; rather, you just need a dedicated community of 1,000 true fans.
          </Typography>
          <Typography color="text.secondary">
          2. <strong>True Fans Defined:</strong> True fans are individuals who are deeply passionate about your work. They are willing to buy everything you produce and can be considered the core support for your creative endeavors.
          </Typography>
          <Typography color="text.secondary">
          3. <strong>Financial Foundation:</strong> Kelly argues that these 1,000 true fans can provide a solid financial foundation for an artist or creator. If each fan contributes a modest amount annually, it can add up to a sustainable income.
          </Typography>
          <Typography color="text.secondary">
          4. <strong>Direct Connection:</strong> In the age of the internet, creators have the ability to connect directly with their fans. This direct relationship eliminates the need for middlemen, allowing creators to retain a higher percentage of their earnings.
          </Typography>
          <Typography color="text.secondary">
          5. <strong>Niche Markets:</strong> Creators should focus on catering to niche markets. Instead of trying to appeal to the masses, finding a smaller, dedicated audience allows for deeper connections and sustained support.
          </Typography>
          <Typography color="text.secondary">
          6. <strong>Diversification of Offerings:</strong> Offering a variety of products, services, or experiences helps in engaging and satisfying the diverse needs and preferences of true fans. This could include merchandise, exclusive content, or special events.
          </Typography>
          <Typography color="text.secondary">
          7. <strong>Communication and Engagement:</strong> Regular and meaningful communication with true fans is crucial. Social media, newsletters, and other platforms enable creators to keep their audience informed and involved.
          </Typography>
          <Typography color="text.secondary">
          8. <strong>Fan Empowerment:</strong> Encouraging true fans to become advocates and share their enthusiasm can help expand the community. Word-of-mouth promotion is powerful in niche markets.
          </Typography>
          <Typography color="text.secondary">
          9. <strong>Evolution and Adaptation:</strong> As both the creator and the audience evolve, it's essential for creators to adapt and adjust their offerings to maintain the interest and support of their true fans.
          </Typography>
          <Typography color="text.secondary">
          10. <strong>Long-Term Sustainability:</strong> Building a relationship with 1,000 true fans is a long-term strategy. It requires patience, consistency, and a genuine commitment to delivering value to the community.
          </Typography>
          <Typography color="text.secondary">
          <br></br>Remember, the key takeaway is that, in the digital age, success doesn't necessarily mean reaching millions. A dedicated and engaged community of true fans can sustain and propel a creator's career.
          </Typography>
          <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed this Intro" />
        </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 1.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>Key Concept</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              The idea revolves around the concept that to sustain a creative career or business, you don't need millions of fans; rather, you just need a dedicated community of 1,000 true fans.
            </Typography>
            <Typography color="text.secondary">
            <strong>Begin by reading the article and taking notes:</strong>
            <br></br><Link href="https://kk.org/thetechnium/1000-true-fans/" target="_blank">https://kk.org/thetechnium/1000-true-fans/</Link>
            <br></br>As you read the article jot down any ideas that stand our. List any actions you might take as a result of reading the article. What do you think of the concepts presented? Do you think it's possible to connect with 1000 true fans over time? Pick a number that seems reasonable to start with. Right on a piece of paper - I'm so excited to find my number of true fans, I'm starting today. Post your paper in a place that you'll see frequently like the fridge or bathroom mirror. Next head over to the discord and share your thoughts, notes and if you enjoyed completing Step 1.
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 1." />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 2.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              True Fans Defined
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
            True fans are individuals who are deeply passionate about your work. They are willing to buy everything you produce and can be considered the core support for your creative endeavors.
            </Typography>
            <Typography color="text.secondary">
            Review your notes from Part 1. Did you list any actions to take? Create a list now, starting with 10 things you can do to find or connect to your true fans. Here's 3 examples to get you started:  1. share a post on social media about your art process. 2. make a list of people who have expressed interest in your work. 3. describe your perfect fan: what do they look like? Why do they enjoy your art? How did they find your art? Once you've completed you list rewrite it in order of easiest to hardest to complete. Do the first thing on your list today.
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 2." />
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
            Step 3.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Financial Foundation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
            Kelly argues that these 1,000 true fans can provide a solid financial foundation for an artist or creator. If each fan contributes a modest amount annually, it can add up to a sustainable income.
            </Typography>
            <Typography color="text.secondary">
            Do you think you can find 1000 true fans? How many do you already have?  Write down the names of any individuals you know that are already your true fans. What can you sell to your true fans over the course of the year that equals at least $100? This can be one product or multiple things. If you can sell more than $100 a year to your each true fan write down that number and what you are offering them.
            </Typography>
            <Typography color="text.secondary">
            Imagine for a moment you yourself, are your true fan. What things do you like and purchase. What do you search for and why would you buy your art? If you think of any reasons why you wouldn't buy your art - write that down also. Save the list of would not buy reasons for later use. Write at least three additional things you like about the art you create.
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 3." />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 4.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Direct Connection
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              In the age of the internet, creators have the ability to connect directly with their fans. This direct relationship eliminates the need for middlemen, allowing creators to retain a higher percentage of their earnings.
            </Typography>
            <Typography color="text.secondary">
              In what ways do you connect with your audience? Next to the names on your list of fans from Step 3, add the connections. How do you, or will you communicate with them? Via email, social media, websites, in person, through daily conversations, and other ways? List the ways you have to accept payment. Add or update your preferred method of payment in your account settings.  How quickly can you connect to 20 additional fans online or in person? Share you wins with a friend. 
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 4." />
          </AccordionDetails>
        </Accordion>      
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 5.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Niche Markets
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
            Creators should focus on catering to niche markets. Instead of trying to appeal to the masses, finding a smaller, dedicated audience allows for deeper connections and sustained support.
            </Typography>
            <Typography color="text.secondary">
            Imagine your true fan lives in a remote location and doesn't have access to Big City items and relies on the internet for information and entertainment. How might they find your art online - what would they be looking for? 
            </Typography>
            <Typography color="text.secondary">
            Take some time to write a detailed description of your work including why you do it. Add a few phrases to your artist statement in the profile section. Turn that detailed description into keywords or searches phrases your true fan might use while pursuing their interests. What are some additional related searches that lead to your art. You can include subject matter, type of art, colors, medium, your location, and anything having to do with your art. What is unique about your work that makes it stand out from another artist of the same medium?
            </Typography>
            <Typography color="text.secondary">
            How will you find your true fans? Where do they live and what hashtags do they follow and use. What do they look like? What's their age range and where do they hang out? Write 3 things they like your art. How are you going to find them, or better yet - how are they going to find you? Via use social media marketing, traditional websites, email marketing, advertising ads?
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 5." />
          </AccordionDetails>
        </Accordion>      
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 6.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Diversification of Offerings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
            Offering a variety of products, services, or experiences helps in engaging and satisfying the diverse needs and preferences of true fans. This could include merchandise, exclusive content, or special events.
            </Typography>
            <Typography color="text.secondary">
            What will you sell to your true fans over the course of the year that equals at least $100? This can be one product or multiple things. If you can sell more than $100 a year to your true fans write down what you want to sell and exactly what that would be. It could be merchandise or a product, an original work or a reproduction, something commissioned or a limited edition series. You could offer a service or simply request a donation to support your ongoing practice or creating. Revisit the ways you accept payment. Can you add another payment method to your list?
            <br />What things excite your true fans what would they be excited to receive from you?
            </Typography>
            <Typography color="text.secondary">
            Write down the math equation how many dollars do you need to make a year divide that by 100 and that's how many true fans you need to find.
            <br />75000 / 100 = 750 true fans
            <br />75000 / 75 = 1000 true fans
            <br />75000 / 200 = 375 true fans
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 6." />
          </AccordionDetails>
        </Accordion>      
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7bh-content"
            id="panel7bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 7.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Communication and Engagement
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
            Regular and meaningful communication with true fans is crucial. Social media, newsletters, and other platforms enable creators to keep their audience informed and involved.
            </Typography>
            <Typography color="text.secondary">
            Write down three steps you can do today to connect with your true fans. Here are some examples: 1. Posting work on social media 2. updating your profile to include keywords for your art. 3. Starting an email list specifically for connecting with your true fans. 4. Talking to your friends and strangers you meet, about your art.
            <br />Write down the social media platform you like best that you're going to use to connect with your fans. Create at least one piece of content and post it today, and a second draft to post tomorrow. There's tips and tricks for each social media platform. Choose one and do a quick Google search for basic hacks. We'll get more detailed on social media in another training module.
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 7." />
          </AccordionDetails>
        </Accordion>      
        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8bh-content"
            id="panel8bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 8.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Fan Empowerment
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography color="text.secondary">
          Encouraging true fans to become advocates and share their enthusiasm can help expand the community. Word-of-mouth promotion is powerful in niche markets.
          </Typography>
          <Typography color="text.secondary">
          Do you already have a fan that tells other people about your work? This would be a true fan - write their name down on your list then reach out to them. Ask them to join Art Edge as a patron and supporter of your work. Interview them about their life and preferences then ask them if they would like to contribute by sharing your work with others via social media or word of mouth. Let them know how important it is to you - to get their input on your art. Asking others for input on you work creates enrollment and buy-in. The more people that want to support you the larger your marketing team of true fans will be. Over time this increases your reach exponentially.
          </Typography>
          <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 8." />
          </AccordionDetails>
        </Accordion>      
        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9bh-content"
            id="panel9bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 9.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Evolution and Adaptation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
            As both the creator and the audience evolve, it's essential for creators to adapt and adjust their offerings to maintain the interest and support of their true fans.
            </Typography>
            <Typography color="text.secondary">
            Choose three images to create an NFT. Invite your fans to the website to see your NFT. Engage with them about it. Tell them about your 1000 true fans training and ask them if they want to support you here on this platform then tell them all the ways they can do that.
            </Typography>
            <Typography color="text.secondary">
            Is there something that you've been wanting that would help move your practice forward? Is there something you'd like to make that you haven't been able to make because you need additional funding for? Do you just need money to survive? Write down three things that you would like to have provided by your true fans. This can be anything just write it down. Next decide which one is the most important to you right now. Would it also be important to your fans? If so write down why it's important to you and your fans. This may be a good subject for a crowd funding campaign. Make some additional notes if you're ready to move forward with your idea now go for it! Otherwise save these notes for later and continue to develop your fan base so when you are ready to do crowdfunding you'll have a group of people to support you. In the mean time use all your channels to start talking about this future project. Imagine how it will evolve over time.
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 9." />
          </AccordionDetails>
        </Accordion>      
        <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10bh-content"
            id="panel10bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Step 10.
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Long-Term Sustainability
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              Building a relationship with 1,000 true fans is a long-term strategy. It requires patience, consistency, and a genuine commitment to delivering value to the community.
            </Typography>
            <Typography color="text.secondary">
              Write down all the ways your art is beneficial to your audience. Expand upon last lessons list of ideas for future projects. Make a list of all the dream projects you would like to do. Include as many projects as you can think of that would be enjoyable for you. Prioritize them in order of importance and create a timeframe for them. Add something to each of the following catagories:
              <br />Next week, Next Month, Next quarter, in 6 months, in a year, in 3 years, in 5 years. These are all things to share with your true fans. That should give you some ideas to keep your fans enganged over time. It's okay if they don't all get created, the fun is in the creating! Your ideas might spawn something in others, and inspire others to their own greatness. 
            </Typography>
            <Typography color="text.secondary">
              Plan to devote an hour a day to the process of finding your 1000 true fans. Try it yourself first for a minimum of 30 days. If at the end of 30 days you want to turn the job over to an assistant you will have more insight into what your fans need. Pass that info along to the person you hire to help with your outreach.
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed Step 10." />
          </AccordionDetails>
        </Accordion>       
        <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel11bh-content"
            id="panel11bh-header"
          >
            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
              Finale
            </Typography>
            <Typography sx={{ color: 'text.primary' }}>
              Congratulations you made it!
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              Remember, the key takeaway is that, in the digital age, success doesn't necessarily mean reaching millions. A dedicated and engaged community of true fans can sustain and propel a creator's career. Making a living doing what you love is the goal! Move in that direction today. Invite your true fans to support you here on Art Egde by registering and liking you profile.
            </Typography>
            <FormControlLabel control={<Checkbox onClick={handleChecked}/>} label="Check the box when you've completed the Finale." />
          </AccordionDetails>
        </Accordion>
      </FormGroup>
    </div>
  );
}
