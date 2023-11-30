import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TrainingModule() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
            Step 1.
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>Read the 1000 True Fans article</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="text.secondary">
          As you read the article jot down any ideas that stand our. List any actions you might take as a result of reading the article. What do you think of the concepts presented? Do you think it's possible to connect with 1000 true fans over time? Pick a number that seems reasonable to start with. Right on a piece of paper - I so excited to find my number of true fans, I'm starting today. Post your paper in a place that you'll see frequently. (fridge or bathroom mirror) Next head over to the discord and share your thoughts, notes and if you enjoyed completing chapter one.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>Step 2.</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Create a list of actions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Review your notes from Part 1. Did you list any actions to take? Create a list now, starting with 10 things you can do to find or connect to your true fans. Here's 3 examples to get you started:  1. share a post on social media about your art process. 2. make a list of people who have expressed interest in your work. 3. describe your perfect fan: what do they look like? Why do they enjoy your art? How did they find your art? Once you've completed you list rewrite it in order of easiest to hardest to complete. Do the first thing on your list today.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Step 3.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
