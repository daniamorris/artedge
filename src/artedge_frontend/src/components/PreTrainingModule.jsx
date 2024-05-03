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

let actor = artedge_backend;

export default function PreTrainingModule(props) {
  const [expanded, setExpanded] = useState(false);


  const handleChecked = (event) => {
    // addPs();
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function addPs(){
    if (props.proid == ""){
      console.log("user has not created a profile yet");
    } else {
     const proid = parseInt(props.proid);
     console.log(props.proid);
     let uppoints = await actor.inc100();
     let points = await actor.read();
     console.log("Increment by 100 points are now at: " + uppoints + " Does that match my points? " + points);
     let storepoints = await actor.addPoints(proid,points);
    };

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
        </AccordionDetails>
        </Accordion>
      </FormGroup>
    </div>
  );
}
