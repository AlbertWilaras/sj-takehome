import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { acceptJob, rejectJob } from "../../api";
import { useState } from "react";

const theme = createTheme({
  palette: {
    neutralPrimary: {
      main: "#000000",
      contrastText: "#fff",
    },
    neutralSecondary: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutralPrimary: Palette["primary"];
    neutralSecondary: Palette["secondary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutralPrimary?: PaletteOptions["primary"];
    neutralSecondary?: PaletteOptions["secondary"];
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutralPrimary: true;
    neutralSecondary: true;
  }
}

interface JobButtonsProps {
  jobId: string;
  showNext: () => void;
}

const JobButtons = ({ jobId, showNext }: JobButtonsProps) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleAccept = async () => {
    const data = await acceptJob(jobId);
    if (!data.success) {
      setErrorMessage(data.message);
      setHasError(true);
    } else {
      showNext();
    }
  };

  const handleReject = async () => {
    const data = await rejectJob(jobId);
    if (!data.success) {
      setErrorMessage(data.message);
      setHasError(true);
    } else {
      showNext();
    }
  };

  return (
    <div className="job-buttons">
      <Snackbar
        open={hasError}
        autoHideDuration={6000}
        onClose={() => setHasError(false)}
      >
        <Alert
          onClose={() => setHasError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Grid container justifyContent={"space-around"} alignItems={"center"}>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Button
              color="neutralSecondary"
              variant="outlined"
              onClick={handleReject}
            >
              No Thanks
            </Button>
          </ThemeProvider>
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Button
              color="neutralPrimary"
              variant="contained"
              onClick={handleAccept}
            >
              I'll Take It
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </div>
  );
};

export default JobButtons;
