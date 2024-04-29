import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  IconButton,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";
import { startConversation } from "../../api/chat";
import ChatIcon from "@mui/icons-material/Chat";

export const ClaimItem = ({ claim }) => {
  const handleChat = () => {
    startConversation({ text: "", receiver: claim.donation.donated_by.email })
      .then((response) => console.log(response))
      .catch((error) => console.error(error.message));
  };

  return (
    <>
      <Accordion style={{ border: "1.5px solid #f55951" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Grid item xs={7}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ mr: 1 }}>{claim.donation.item}</Typography>
              <Chip label={claim.donation.category} variant="outlined" />
              <Stack direction="row" alignItems="center">
                <PlaceIcon sx={{ fontSize: 19 }} />
                <Typography sx={{ fontSize: 15, mt: 0.3 }}>Austin</Typography>
              </Stack>
            </Stack>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <IconButton color="primary.main" size="small" onClick={handleChat}>
            <ChatIcon />
          </IconButton>
        </AccordionActions>
      </Accordion>
    </>
  );
};
