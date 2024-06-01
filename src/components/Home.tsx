import { Typography, Box, Paper, Link } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { styled, useMediaQuery, useTheme } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

const MyPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
}));

function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      flexDirection={matches ? "column" : "row"}
      justifyContent="center"
      gap={2}
      alignItems="center"
      height="100vh"
    >
      <Link href="/create" underline="none">
        <MyPaper square={false} elevation={5}>
          <SportsSoccerIcon sx={{ mt: 2 }} />
          <Typography variant="h5" component="div">
            Crear Partido
          </Typography>
        </MyPaper>
      </Link>
      <Link href="/matches" underline="none">
        <MyPaper square={false} elevation={5}>
          <SearchIcon sx={{ mt: 2 }} />
          <Typography variant="h5" component="div">
            Buscar Partidos
          </Typography>
        </MyPaper>
      </Link>
    </Box>
  );
}

export default Home;
