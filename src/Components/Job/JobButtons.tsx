import { Button, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
}

const JobButtons = ({ jobId }: JobButtonsProps) => {
  return (
    <div className="job-buttons">
      <Grid container justifyContent={"space-around"} alignItems={"center"}>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Button color="neutralSecondary" variant="outlined">
              No Thanks
            </Button>
          </ThemeProvider>
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Button color="neutralPrimary" variant="contained">
              I'll Take It
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </div>
  );
};

export default JobButtons;
